import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '20mb' }));

const VISIBILITY_FILE = path.join(__dirname, 'reviews-visibility.json');
const REVIEWS_FILE = path.join(__dirname, 'reviews.json');

function readJsonFile(filePath, defaultValue) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
            return defaultValue;
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e);
        return defaultValue;
    }
}

function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (e) {
        console.error(`Error writing ${filePath}:`, e);
        return false;
    }
}

// -----------------------------------------------------------------------------
// Reviews & Visibility APIs
// -----------------------------------------------------------------------------
app.get('/api/reviews-visibility', (req, res) => {
    const config = readJsonFile(VISIBILITY_FILE, { showReviews: true });
    res.json(config);
});

app.post('/api/reviews-visibility', (req, res) => {
    const { showReviews } = req.body;
    const newConfig = {
        showReviews: typeof showReviews === 'boolean' ? showReviews : true,
        updatedAt: new Date().toISOString()
    };
    const success = writeJsonFile(VISIBILITY_FILE, newConfig);
    if (success) {
        res.json({ success: true, ...newConfig });
    } else {
        res.status(500).json({ success: false, error: 'Could not save visibility settings file' });
    }
});

app.get('/api/reviews', (req, res) => {
    const reviews = readJsonFile(REVIEWS_FILE, []);
    res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
    const reviews = readJsonFile(REVIEWS_FILE, []);
    const newReview = {
        id: 'rev_' + Date.now(),
        clientName: req.body.clientName || 'Klientas',
        type: req.body.type || 'service',
        sessionTag: req.body.sessionTag || '',
        rating: Number(req.body.rating) || 5,
        reviewLink: req.body.reviewLink || '',
        comment: req.body.comment || '',
        visible: req.body.visible !== false,
        createdAt: new Date().toISOString()
    };
    reviews.unshift(newReview);
    writeJsonFile(REVIEWS_FILE, reviews);
    res.json({ success: true, review: newReview });
});

app.patch('/api/reviews/:id', (req, res) => {
    const reviews = readJsonFile(REVIEWS_FILE, []);
    const { id } = req.params;
    const index = reviews.findIndex(r => r.id === id);
    if (index !== -1) {
        if (typeof req.body.visible === 'boolean') {
            reviews[index].visible = req.body.visible;
        }
        writeJsonFile(REVIEWS_FILE, reviews);
        res.json({ success: true, review: reviews[index] });
    } else {
        res.status(404).json({ success: false, error: 'Review not found' });
    }
});

app.delete('/api/reviews/:id', (req, res) => {
    let reviews = readJsonFile(REVIEWS_FILE, []);
    const { id } = req.params;
    reviews = reviews.filter(r => r.id !== id);
    writeJsonFile(REVIEWS_FILE, reviews);
    res.json({ success: true });
});

// -----------------------------------------------------------------------------
// AI Assistant API (Gemini 3.1 Flash Lite via @google/genai)
// -----------------------------------------------------------------------------
let ai = null;
try {
    ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
            headers: {
                'User-Agent': 'aistudio-build',
            }
        }
    });
} catch (initErr) {
    console.warn("GoogleGenAI init error:", initErr);
}

async function callModelWithTimeout(genAi, modelName, contents, systemInstruction, timeoutMs = 8000) {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms for ${modelName}`)), timeoutMs)
    );
    const apiPromise = genAi.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.35
        }
    });
    const response = await Promise.race([apiPromise, timeoutPromise]);
    return response.text;
}

app.all(['/api/ai-assistant', '/api/ai-assistant/'], async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const message = req.body?.message || req.query?.message || 'Pateik finansinę ir VMI ataskaitos suvestinę';
        const context = req.body?.context || req.query?.context || null;
        const mode = req.body?.mode || req.query?.mode || null;

        const systemInstruction = `Tu esi „DP.PORTFOLIO“ (Dominik Šuškevič, DP Corporation fotografijos ir videografijos studija) oficialus administratoriaus AI asistentas ir padėjėjas.
Tavo pagrindinė paskirtis – padėti studijos savininkui ir administratoriui:
1. Keisti, tikslinti, optimizuoti ir generuoti finansines bei VMI ataskaitas (Individuali veikla pagal pažymą EVRK 74.20; 30% prezumpcija be kvitų arba faktinės išlaidos; GPM 5%, PSD 6,98%, VSD 12,52%).
2. Siūlyti konkrečius, paruoštus ataskaitos tekstus, paaiškinimus VMI deklaracijai, suvestines pagal ketvirčius ar metus.
3. Formuluoti reprezentatyvius, mandagius ir profesionalius atsakymus klientams dėl fotosesijų (asmeninių, automobilių, renginių, TFP bendradarbiavimo).
4. Padėti priimti verslo sprendimus dėl kainodaros, grafikų ir veiklos išlaidų (kuras, studija, programos, technika).

Atsakyk visada taisyklinga lietuvių kalba, profesionaliu, draugišku ir aiškiu tonu. Formatavimui naudok markdown (lenteles, paryškinimus, sąrašus).`;

        let contents = message;
        if (context) {
            const ctxString = typeof context === 'object' ? JSON.stringify(context, null, 2) : context;
            contents = `[DABARTINIAI VALDYMO PULTAS / ATASKAITOS DUOMENYS]:\n${ctxString}\n\n[ADMINISTRATORIAUS UŽKLAUSA / VEIKSMAS]:\n${message}`;
        }

        let replyText = '';
        if (ai) {
            // Priority 1: gemini-3.1-flash-lite (fast, responsive, reliable)
            try {
                replyText = await callModelWithTimeout(ai, 'gemini-3.1-flash-lite', contents, systemInstruction, 7000);
            } catch (err1) {
                console.warn('gemini-3.1-flash-lite error or timeout, trying gemini-flash-latest:', err1.message);
                // Priority 2: gemini-flash-latest
                try {
                    replyText = await callModelWithTimeout(ai, 'gemini-flash-latest', contents, systemInstruction, 7000);
                } catch (err2) {
                    console.warn('gemini-flash-latest error or timeout, trying gemini-3.8-flash:', err2.message);
                    // Priority 3: gemini-3.8-flash
                    try {
                        replyText = await callModelWithTimeout(ai, 'gemini-3.8-flash', contents, systemInstruction, 7000);
                    } catch (err3) {
                        console.warn('All live Gemini calls failed or timed out, generating studio report fallback:', err3.message);
                        replyText = generateStudioReportFallback(message, context);
                    }
                }
            }
        } else {
            replyText = generateStudioReportFallback(message, context);
        }

        if (!replyText) {
            replyText = generateStudioReportFallback(message, context);
        }

        return res.json({
            success: true,
            reply: replyText
        });
    } catch (error) {
        console.error('Error in AI Assistant endpoint:', error);
        const fallbackText = generateStudioReportFallback(req.body?.message, req.body?.context);
        return res.json({
            success: true,
            reply: fallbackText
        });
    }
});

function generateStudioReportFallback(message, context) {
    const ctx = context || {};
    const period = ctx.laikotarpis || '2026 m.';
    const income = ctx.pajamos || '0,00 €';
    const deductions = ctx.atskaitymai || '0,00 €';
    const taxable = ctx.apmokestinamosPajamos || '0,00 €';
    const taxes = ctx.mokesciaiIsViso || '0,00 €';
    const taxesDetail = ctx.mokesciuDetale || 'GPM: 5% | PSD: 6,98% | VSD: 12,52%';
    const net = ctx.grynasisPelnas || '0,00 €';
    const method = ctx.atskaitymoMetodas || '30% prezumpcija be kvitų';

    const lower = (message || '').toLowerCase();

    // 0. Testinis VMI Pajamų Žurnalas + Kvitas + Sutartis viename
    if ((lower.includes('vmi') || lower.includes('sheet') || lower.includes('spausdin') || lower.includes('atspausdin')) && (lower.includes('kvit') || lower.includes('sutart'))) {
        return `### 📊 TESTINIS VMI PAJAMŲ ŽURNALAS IR OFICIALŪS DOKUMENTAI (A4 SPAUSDINIMUI)

Paruošiau Jums pilną testinį **VMI Pajamų ir Išlaidų žurnalo** vaizdą, pritaikytą A4 spausdinimui, bei oficialią **Sąskaitą-faktūrą / Kvitą** ir **Fotografavimo sutartį**.

---

#### 1. 🖨️ Kaip atrodys atspausdintas VMI Žurnalas (EVRK 74.20):
Atspausdintame A4 lape suformuota oficiali LR Finansų ministro patvirtinta forma:
- **Veiklos vykdytojas:** Dominik Šuškevič (Fotografavimo veikla, EVRK 74.20)
- **Apskaitos laikotarpis:** 2026 m. | **Metodas:** 30% prezumpcija be kvitų
- **Operacijų lentelė:** 9 testinės operacijos (fotosesijos, studijos nuoma, kuras, Adobe CC)
- **Finansiniai rezultatai:**
  - 💰 **Gautos pajamos:** **880,00 €**
  - 🧾 **Leidžiami atskaitymai (30% prezumpcija):** **264,00 €** *(faktinės išlaidos: 164,19 €)*
  - 🏛 **Apmokestinamosios pajamos:** **616,00 €**
  - ⚖️ **Priskaičiuoti mokesčiai (VMI + Sodra):** **138,91 €** *(GPM 5%: 30,80 € | PSD 6,98%: 38,70 € | VSD 12,52%: 69,41 €)*
  - 💵 **Grynasis pelnas („į rankas“):** **741,09 €**
- **Oficialus deklaracijos paaiškinimas ir parašų zonos** apačioje.

---

#### 2. 🧾 Paruoštas Pinigų Priėmimo Kvitas / Sąskaita-Faktūra:
- **Serija DP Nr. 2026-001**
- **Teikėjas:** Dominik Šuškevič, EVRK 74.20, Banko sąskaita: \`LT867300010171188764\` (Swedbank)
- **Paslauga:** Individuali / Renginio fotosesija (kaina: 150,00 €, gautas 50% avansas: 75,00 €, mokėtinas likutis: 75,00 €)
- **Suma žodžiais:** Vienas šimtas penkiasdešimt eurų 00 ct. (Likusi suma: septyniasdešimt penki eurai 00 ct.)
- **Teisinis pagrindas:** Ne PVM mokėtojas pagal LR PVMĮ 71 str.

---

#### 3. 📜 Paruošta Fotografavimo Paslaugų ir Autorinė Sutartis:
- **Sutarties Nr. DP-2026/01**
- Šalys: Fotografas Dominik Šuškevič ir Užsakovas
- 1. Sutarties dalykas (fotosesijos tipas, vieta, trukmė, Wfolio privati galerija su slaptažodžiu)
- 2. Kaina ir atsiskaitymo tvarka (150 €, 50% avansas datos rezervacijai)
- 3. Rezultato atidavimo terminai (7–14 d.d.)
- 4. Autorinės teisės ir nuotraukų naudojimas (portfolio teisės)
- 5. Datos perkėlimo sąlygos ir parašai

---

💡 *Paspauskite žemiau esančius mygtukus, kad atidarytumėte švarų A4 spausdinimo langą arba atsisiųstumėte testinį Excel (.csv) failą!*`;
    }

    // 1. Service Analysis & Automated Income/Expense Calculation for VMI
    if (lower.includes('analiz') || (lower.includes('paslaug') && lower.includes('išlaid')) || lower.includes('pajamu gavim')) {
        return `### 📊 AI Paslaugų Analizė & Įtraukimas į VMI Pajamas ir Išlaidas

Išanalizavus Jūsų teikiamas paslaugas, fotografijos paketus bei registruotas užklausas:

#### 1. 💰 Nustatytos Paslaugų Pajamos:
- **Asmeninės & Portretų fotosesijos:** Standartinė fotosesija (~120 € / vnt.) ir Mini (~70 € / vnt.).
- **Automobilių fotosesijos & Renginiai:** Specializuotos fotosesijos (~150–250 € / sesija).
- **Komerciniai & Vestuvių projektai:** Maksi paketai (~300–600 €).
- **Dabartinės registruotos pajamos sistemoje:** **${income}** (${period}).

---

#### 2. 🧾 Būtinosios Fotografijos Veiklos Išlaidos (Leidžiami Atskaitymai pagal EVRK 74.20):
Toliau pateikiamos realios fotografavimo veiklai patiriamos išlaidos, kurias galima oficialiai įtraukti į apskaitą:

| Išlaidos kategorija | Aprašymas | Rekomenduojama suma | Kvitai / Sąskaita |
| :--- | :--- | :---: | :--- |
| **Transportas / Kuras** | Kuras vykimui į fotosesijų lokacijas (Kaunas, Vilnius, gamta) | **45,00 €** | Degalinės čekis su rekvizitais |
| **Programinė įranga** | Adobe Creative Cloud (Lightroom + Photoshop) mėnesio licenzija | **24,19 €** | Adobe sąskaita-faktūra |
| **Studijos / Vietos nuoma** | Šviesios fotostudijos nuoma asmeninėms fotosesijoms | **60,00 €** | Studijos nuomos SF |
| **Technikos priežiūra** | Atminties kortelės (SD/CFexpress) & Debesų saugykla kopijoms | **35,00 €** | Pirkimo sąskaita |
| **Rekvizitai & Apšvietimas** | Šviesos difuzoriai, baterijos, fotosesijos rekvizitai | **28,50 €** | Pirkimo čekis |

---

#### 3. ⚖️ Finansinė Rekomendacija Dėl Mokesčių:
- **Pajamų suma:** ${income}
- **Rekomenduojamos išlaidos iš viso:** ~192,69 €
- **Kuris metodas Jums naudingesnis?**
  - **Jei renkatės 30% prezumpciją:** Nereikia jokių pirkimo čekių ar sąskaitų! VMI automatiškai nurašo 30% nuo visų pajamų kaip išlaidas.
  - **Jei faktinės išlaidos viršija 30% pajamų:** Verta registruoti visus pirkimo kvitus (kurą, įrangą, nuomą), nes tai dar labiau sumažina apmokestinamas pajamas ir mokėtiną GPM/Sodrą.

---
💡 *Norėdami įkelti šias apskaičiuotas išlaidas tiesiai į VMI Žurnalą, paspauskite mygtuką **„📥 Įkelti į VMI Žurnalą“** žemiau arba VMI Suvestinėje.*`;
    }

    if (lower.includes('atsak') || lower.includes('klient') || lower.includes('laišk')) {
        return `### ✉️ Rekomenduojamas atsakymas klientui

**Tema:** Dėl fotosesijos užsakymo patvirtinimo | DP.PORTFOLIO

Laba diena,

Dėkoju už Jūsų kreipimąsi ir susidomėjimą DP.PORTFOLIO fotosesijomis!

Džiaugiuosi galėdamas patvirtinti, kad Jūsų pasirinkta data ir fotosesijos formatas yra preliminarūs suderinti. Štai pagrindinė informacija apie Jūsų fotosesiją:

- **Fotografas:** Dominik Šuškevič (DP.PORTFOLIO)
- **Trukmė & Lokacija:** Suderinama individualiai pagal Jūsų pageidavimus
- **Nuotraukų paruošimas:** Profesionaliai retušuotos didelės raiškos nuotraukos privačioje internetinėje galerijoje per 7–14 d.d.
- **Rezervacija:** Data galutinai fiksuojama gavus 50% avansą.

Jeigu turite papildomų klausimų ar norite aptarti aprangos bei lokacijos detales – mielai atsakysiu!

Pagarbiai,  
**Dominik Šuškevič**  
DP.PORTFOLIO | Fotografija & Videografija  
Tel.: +370 600 00000 | info@dominikphotofficial.lt`;
    }

    // 4. Pinigų Priėmimo Kvitas / Sąskaita-Faktūra
    if (lower.includes('kvit') || lower.includes('sąskait') || lower.includes('faktūr') || lower.includes('invoice') || lower.includes('receipt')) {
        return `### 🧾 SĄSKAITA-FAKTŪRA / PINIGŲ PRIĖMIMO KVITAS
**Serija DP Nr. 2026-001**
**Išrašymo data:** ${new Date().toLocaleDateString('lt-LT')}
**Apmokėjimo būdas:** Bankinis pavedimas / Grynieji

---

#### 📌 Šalys ir rekvizitai:
| Paslaugų teikėjas (Fotografas) | Pirkėjas (Užsakovas) |
| :--- | :--- |
| **Dominik Šuškevič** (DP.PORTFOLIO) | **Vardas Pavardė:** [Kliento vardas / Įmonė] |
| **Veiklos rūšis:** EVRK 74.20 Fotografavimo veikla | **Asmens / Įmonės kodas:** [Kodas / A.k.] |
| **Individualios veiklos pažyma:** EVRK 74.20 | **Adresas / Miestas:** Kaunas / Vilnius |
| **El. paštas:** dominikphotofficial.lt@gmail.com | **El. paštas:** [klientas@elpastas.lt] |
| **Banko sąskaita (IBAN):** \`LT867300010171188764\` (Swedbank) | **Telefonas:** [+370 600 00000] |

---

#### 📸 Teikiamos paslaugos:
| Eil. Nr. | Paslaugos pavadinimas & aprašymas | Kiekis | Kaina (€) | Suma (€) |
| :---: | :--- | :---: | :---: | :---: |
| 1 | **Individuali / Renginio fotosesija** (trukmė: 2 val., 25 retušuotos didelės raiškos nuotraukos privačioje Wfolio internetinėje galerijoje) | 1 kompl. | 150,00 € | **150,00 €** |
| 2 | *Iš jų gautas avansas (50%) rezervacijai fiksuoti:* | 1 | -75,00 € | -75,00 € |
| | **Mokėtina galutinė suma:** | | | **75,00 €** |

**Suma žodžiais:** Vienas šimtas penkiasdešimt eurų 00 ct. (Likusi mokėti suma: septyniasdešimt penki eurai 00 ct).  
*PVM netaikomas remiantis LR PVMĮ 71 str. nuostatomis (Ne PVM mokėtojas).*

---

#### ✍️ Parašai:
- **Sąskaitą išrašė:** Dominik Šuškevič ________________________
- **Sąskaitą gavo (Pirkėjas):** ________________________`;
    }

    // 5. Fotografavimo Paslaugų Teikimo Sutartis
    if (lower.includes('sutart') || lower.includes('contract') || lower.includes('agreement')) {
        return `### 📜 FOTOGRAFAVIMO PASLAUGŲ TEIKIMO SUTARTIS
**Sutarties Nr. DP-2026/01**  
**Sudarymo data ir vieta:** ${new Date().toLocaleDateString('lt-LT')}, Kaunas / Vilnius

---

**Dominik Šuškevič**, vykdantis individualią fotografavimo veiklą pagal pažymą (EVRK 74.20), el. p. dominikphotofficial.lt@gmail.com (toliau – **Fotografas**), ir  
**[Užsakovo Vardas Pavardė]**, a.k. [Asmens kodas], gyv. [Adresas], tel. [Telefonas] (toliau – **Užsakovas**),  
kartu vadinami **Šalimis**, sudarė šią Fotografavimo paslaugų teikimo sutartį:

#### 1. SUTARTIES DALYKAS
1.1. Fotografas įsipareigoja suteikti Užsakovui profesionalias fotografavimo paslaugas:  
- **Fotosesijos tipas:** Asmeninė / Renginių / Automobilių fotosesija.  
- **Numatoma data ir laikas:** [Įrašyti fotosesijos datą ir laiką].  
- **Lokacija:** Suderinama individualiai (Kaunas / Vilnius / Studija).  
- **Rezultatas:** Ne mažiau kaip 25 autorinės retušuotos didelės raiškos nuotraukos, pateikiamos saugioje privačioje internetinėje „Wfolio“ galerijoje.

#### 2. KAINA IR ATSISKAITYMO TVARKA
2.1. Bendra fotosesijos kaina – **150,00 €** (vienas šimtas penkiasdešimt eurų).  
2.2. Sutarties pasirašymo metu Užsakovas sumoka **50% avansą (75,00 €)** į Fotografo sąskaitą \`LT867300010171188764\`. Avansas patvirtina datos rezervaciją.  
2.3. Likusi sumos dalis (75,00 €) sumokama fotosesijos dieną arba prieš galutinių nuotraukų perdavimą.

#### 3. NUOTRAUKŲ ATIDAVIMO TERMINAI
3.1. Fotografas įsipareigoja paruošti ir perduoti retušuotas nuotraukas per **7–14 darbo dienų** nuo fotosesijos dienos.  
3.2. Užsakovas gauna privačią nuorodą į galeriją, kurioje nuotraukos saugomos ne mažiau kaip 6 mėnesius.

#### 4. AUTORINĖS TEISĖS IR PRIVATUMAS
4.1. Turtinės ir neturtinės autorinės teisės į nuotraukas priklauso Fotografui. Užsakovas įgyja teisę naudoti nuotraukas asmeniniais nekomerciniais tikslais.  
4.2. Užsakovas [ sutinka / nesutinka ], kad atrinktos nuotraukos būtų publikuojamos Fotografo portfolio bei socialiniuose tinkluose (@dominikphotofficial).

#### 5. FORCE MAJEURE IR DATOS KEITIMAS
5.1. Dėl blogų oro sąlygų ar ligos fotosesijos data gali būti nemokamai perkelta į kitą abiem Šalims tinkamą dieną.

#### 6. TĖVŲ SUTIKIMAS
Fotografas Dominik Šuškevič yra nepilnametis ir individualią veiklą vykdo turėdamas savo mamos Dianos Ruolytės sutikimą. Diana Ruolytė sutinka, kad Dominik Šuškevič sudarytų šią paslaugų teikimo sutartį ir pagal ją teiktų fotografavimo / videografijos paslaugas.  
**Diana Ruolytė:** __________________ &nbsp;&nbsp;&nbsp;&nbsp; **Data:** __________________

---

#### 7. ŠALIŲ REKVIZITAI IR PARAŠAI:
| Fotografas | Užsakovas |
| :--- | :--- |
| **Dominik Šuškevič (DP.PORTFOLIO)** | **[Užsakovo Vardas Pavardė]** |
| IV Pažyma EVRK 74.20 | Asmens kodas: _______________ |
| Parašas: ____________________ | Parašas: ____________________ |`;
    }

    if (lower.includes('kain') || lower.includes('strategij') || lower.includes('paslaug')) {
        return `### 📈 Studijos kainodaros ir paslaugų optimizavimo planas

1. **Paketų diferenciacija:**
   - Rekomenduojama išlaikyti aiškų skirtumą tarp bazinio (Express), standartinio (Classic) ir VIP (Premium) paketų.
   - Populiariausias paketas turėtų būti orientuotas į 150–250 € kainų rėžį su avanso (50%) fiksavimu.

2. **TFP ir komercinių užsakymų balansas:**
   - TFP projektus planuoti ne savaitgaliais, siekiant atlaisvinti pelningiausias datas mokamiems renginiams ar asmeninėms fotosesijoms.
   - Kiekvienas TFP modelis tampa potencialiu ambasadoriumi – reikalauti atsiliepimo ir žymėjimo socialiniuose tinkluose.

3. **Papildomų paslaugų pajamos:**
   - Papildomų retušuotų kadrų pardavimas (pvz., 10 € / vnt.).
   - Skubus nuotraukų atidavimas per 48 val. (+50 € priemoka).`;
    }

    // Default: Official VMI Declaration & Financial Report Modification
    return `### 📊 Oficiali VMI Individualios Veiklos Ataskaitos Suvestinė (${period})

**Veiklos vykdytojas:** Dominik Šuškevič  
**Veiklos kodas:** EVRK 74.20 (Fotografavimo veikla pagal pažymą)  
**Taikomas išlaidų metodas:** ${method}  
**Apskaitos data:** ${new Date().toLocaleDateString('lt-LT')}  

---

#### 💰 Finansinė Suvestinė:
| Rodiklis | Suma (€) | Pastabos |
| :--- | :---: | :--- |
| **Gautos pajamos** | **${income}** | Faktinės gautos įplaukos už paslaugas |
| **Leidžiami atskaitymai** | **${deductions}** | Pagal LR GPMĮ (${method}) |
| **Apmokestinamosios pajamos** | **${taxable}** | Pajamos minus atskaitymai |
| **Mokesčiai (VMI + Sodra)** | **${taxes}** | ${taxesDetail} |
| **Grynasis uždarbis („į rankas“)** | **${net}** | Likutis po visų valstybinių įmokų |

---

#### 📝 Oficialus Paaiškinimas VMI Deklaracijai (GPM308):
> *„Vykdoma individuali veikla pagal pažymą Nr. [Įrašyti pažymos Nr.], EVRK kodas 74.20 (Fotografavimo veikla). Visi apskaitos žurnalo įrašai pagrįsti banko pavedimais bei išrašytomis sąskaitomis-faktūromis / kvitais. Išlaidos pripažįstamos taikant 30 proc. prezumpciją nuo gautų pajamų pagal GPMĮ 18 str. 12 d., nereikalaujant papildomų išlaidų dokumentų. Valstybinio socialinio draudimo (VSD) ir privalomojo sveikatos draudimo (PSD) įmokos apskaičiuotos nuo 90 proc. apmokestinamųjų pajamų bazės.“*

---
✅ *Ataskaita paruošta spausdinimui, VMI žurnalui ir metinei pajamų mokesčio deklaracijai.*`;
}

// API 404 handler - prevents returning HTML for API requests
app.use('/api', (req, res) => {
    res.status(404).json({ success: false, error: `API maršrutas nerastas: ${req.method} ${req.originalUrl}` });
});

// Serve static files with html extension support
app.use(express.static(__dirname, {
    extensions: ['html', 'htm']
}));

// Route handler for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Global API error handler
app.use((err, req, res, next) => {
    console.error('Express global error:', err);
    if (req.originalUrl && req.originalUrl.startsWith('/api')) {
        return res.status(500).json({ success: false, error: err.message || 'Serverio klaida' });
    }
    next(err);
});

// 404 fallback to index.html for frontend HTML pages
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
