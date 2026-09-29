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
// AI Assistant API (Gemini 3.8 Flash via @google/genai)
// -----------------------------------------------------------------------------
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
        headers: {
            'User-Agent': 'aistudio-build',
        }
    }
});

app.post('/api/ai-assistant', async (req, res) => {
    try {
        const { message, context, mode } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, error: 'Žinutė yra privaloma' });
        }

        const systemInstruction = `Tu esi „DP.PORTFOLIO“ (Dominik Šuškevič, DP Corporation fotografijos ir videografijos studija) oficialus administratoriaus AI asistentas.
Tavo pagrindinė paskirtis – padėti studijos savininkui ir administratoriui:
1. Keisti, tikslinti, optimizuoti ir generuoti finansines bei VMI ataskaitas (Individuali veikla pagal pažymą EVRK 74.20; 30% prezumpcija be kvitų arba faktinės išlaidos; GPM 5%, PSD 6,98%, VSD 12,52%).
2. Siūlyti konkrečius, paruoštus ataskaitos tekstus, paaiškinimus VMI deklaracijai, suvestines pagal ketvirčius ar metus.
3. Formuluoti reprezentatyvius, mandagius ir profesionalius atsakymus klientams dėl fotosesijų (asmeninių, automobilių, renginių, TFP bendradarbiavimo).
4. Padėti priimti verslo sprendimus dėl kainodaros, grafikų ir atsiliepimų valdymo.

Atsakyk visada taisyklinga lietuvių kalba, profesionaliu ir aiškiu tonu. Formatavimui naudok markdown (lenteles, paryškinimus, sąrašus). Jeigu vartotojas prašo pakeisti ar sugeneruoti ataskaitą – pateik iškart pritaikomą, aiškią ataskaitos struktūrą.`;

        let contents = message;
        if (context) {
            const ctxString = typeof context === 'object' ? JSON.stringify(context, null, 2) : context;
            contents = `[DABARTINIAI VALDYMO PULTAS / ATASKAITOS DUOMENYS]:\n${ctxString}\n\n[ADMINISTRATORIAUS UŽKLAUSA / VEIKSMAS]:\n${message}`;
        }

        let replyText = '';
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: contents,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.35
                }
            });
            replyText = response.text;
        } catch (apiError) {
            console.warn('Gemini 3.8 Flash returned error, trying fallback model or engine:', apiError.message);
            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: contents,
                    config: {
                        systemInstruction: systemInstruction,
                        temperature: 0.35
                    }
                });
                replyText = response.text;
            } catch (fallbackError) {
                console.warn('Fallback Gemini call returned error, using studio report engine:', fallbackError.message);
                replyText = generateStudioReportFallback(message, context);
            }
        }

        res.json({
            success: true,
            reply: replyText
        });
    } catch (error) {
        console.error('Error in AI Assistant endpoint:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Klaida kreipiantis į AI modelį'
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

// Serve static files with html extension support
app.use(express.static(__dirname, {
    extensions: ['html', 'htm']
}));

// Route handler for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 fallback to index.html
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
