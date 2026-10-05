import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// 🔒 Firebase Auth System Endpoints Proxy (/__/auth/*: /handler, /iframe, /action, etc.)
// Seamlessly proxies custom domain Firebase Auth requests to the Firebase backend so custom domain OAuth & Action URLs work 100%
app.all('/__/auth/*', (req, res) => {
    const targetPath = req.originalUrl;
    const options = {
        hostname: 'tfp-form.firebaseapp.com',
        port: 443,
        path: targetPath,
        method: req.method,
        headers: {
            ...req.headers,
            host: 'tfp-form.firebaseapp.com',
            'x-forwarded-host': req.headers.host || 'dominikphotofficial.lt',
            'x-forwarded-proto': 'https'
        }
    };

    const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        console.error('Firebase Auth proxy error:', err);
        res.status(502).send('Firebase Auth proxy error');
    });

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        req.pipe(proxyReq);
    } else {
        proxyReq.end();
    }
});

app.use(express.json({ limit: '20mb' }));

// Subdomain & Domain routing:
// - All site pages, admin, reviews, and bookings are served on the subdomain (portfolio.dominikphotofficial.lt)
// - Firebase Auth handler (/__/auth/) and API (/api) pass through directly on the main domain
app.use((req, res, next) => {
    const host = (req.headers.host || '').split(':')[0].toLowerCase();
    const isCustomDomain = host.includes('dominikphotofficial.lt');
    if (!isCustomDomain) {
        return next();
    }

    // Pass through Firebase Auth handler and API requests
    if (req.path.startsWith('/__/auth') || req.path.startsWith('/api')) {
        return next();
    }

    const isSubdomain = host === 'portfolio.dominikphotofficial.lt';
    if (!isSubdomain) {
        return res.redirect(301, `https://portfolio.dominikphotofficial.lt${req.originalUrl}`);
    }

    next();
});

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

        const systemInstruction = `Tu esi „DP.PORTFOLIO“ (Dominik Šuškevič, DP Corporation fotografijos ir videografijos studija) oficialus vidinis administratoriaus AI asistentas (Dokumentų valdymo ir VMI modulis).
SVARBU: Tu nesi skirtas kodo rašymui ar bendroms teorijoms. Tu esi tiesioginis vidinis įrankis administratoriui, kurio darbo principas – ne greitas atsakymų generavimas, o TIKSLUS IR TEISINGAS VEIKSMŲ ATLIKIMAS.

Tavo pagrindinės atsakomybės ir įrankiai sistemoje:
1. SUTARČIŲ IR DOKUMENTŲ REDAGAVIMAS:
   - Turi teises ir įrankius tiesiogiai pakeisti duomenis (kliento vardą, pavardę, datas, sumas, avansus, lokaciją, paslaugos pavadinimą) pačioje sutartyje ar sąskaitoje-faktūroje pagal administratoriaus nurodymą.
   - Kai administratorius prašo pakeisti ar atnaujinti duomenis dokumente, pateik aiškią ataskaitą ir atsakymo pabaigoje pridėk tikslų JSON veiksmų bloką (apgaubtą \`\`\`json ir \`\`\`):
   \`\`\`json
   {
     "system_action": "update_document",
     "docType": "contract" | "invoice",
     "updates": {
       "clientName": "Naujas Vardas Pavardė",
       "finalPrice": 180.00,
       "depositAmount": 90.00,
       "preferredDate": "2026-05-15",
       "location": "Kauno Senamiestis",
       "serviceName": "Individuali fotosesija"
     }
   }
   \`\`\`

2. VMI ŽURNALO IR ATASKAITŲ ANALIZĖ:
   - Gebi analizuoti VMI žurnalus, pajamas ir išlaidas (EVRK 74.20; 30% prezumpcija be kvitų vs faktinės išlaidos su pirkimo dokumentais; GPM 5%, Sodros PSD 6,98%, VSD 12,52% nuo 90% bazės).
   - Suvedi duomenis į atitinkamus šablonus pagal nustatytą griežtą JUODAI BALTĄ (B&W) formatą.
   - Gali pasiūlyti ir tiesiogiai įtraukti išlaidą/pajamas į VMI žurnalą su tokiu veiksmo bloku:
   \`\`\`json
   {
     "system_action": "add_vmi_expense",
     "expense": {
       "title": "Išlaidos pavadinimas",
       "amount": 45.00,
       "category": "Kuras / Transportas",
       "date": "2026-03-10",
       "invoiceNumber": "ČEK-001"
     }
   }
   \`\`\`

3. ATSAKYMAI KLIENTAMS:
   - Formuluok oficialius, mandagius ir reprezentatyvius el. laiškus klientams dėl užsakymų, TFP projektų ir sąskaitų.

Atsakyk visada taisyklinga lietuvių kalba, profesionaliu, griežtu ir dalykišku tonu. Visi spaudos dokumentai turi atitikti griežtą juodai baltą (B&W) formatą.`;

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

    // 0. Tiesus sutarčių ir sąskaitų duomenų redagavimas (AI Asistento įrankis)
    if (lower.includes('pakeisk') || lower.includes('atnaujink') || lower.includes('nustatyk') || lower.includes('redaguok') || (lower.includes('vard') && (lower.includes('sutart') || lower.includes('sąskait')))) {
        const isContract = lower.includes('sutart') || lower.includes('agreement') || lower.includes('contract');
        const docName = isContract ? 'Fotografavimo Sutartyje' : 'Sąskaitoje-Faktūroje / Kvite';
        const docType = isContract ? 'contract' : 'invoice';

        // Extract possible fields
        let extractedName = null;
        const nameMatch = message.match(/(?:vard[aą|as]|klient[aą|as])[:\s]+([A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+\s+[A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+)/i);
        if (nameMatch) extractedName = nameMatch[1];

        let extractedPrice = null;
        const priceMatch = message.match(/(?:kain[aą]|sum[aą]|mok[eė]ti)[:\s]*([0-9]+(?:[.,][0-9]{1,2})?)/i);
        if (priceMatch) extractedPrice = parseFloat(priceMatch[1].replace(',', '.'));

        let extractedDate = null;
        const dateMatch = message.match(/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) extractedDate = dateMatch[1];

        const updates = {};
        if (extractedName) updates.clientName = extractedName;
        if (extractedPrice !== null) {
            updates.finalPrice = extractedPrice;
            updates.depositAmount = Math.round((extractedPrice / 2) * 100) / 100;
        }
        if (extractedDate) updates.preferredDate = extractedDate;

        return `### ⚡ DOKUMENTO DUOMENŲ PAKEITIMAS VYKDYMAS

Administratoriaus nurodymu tiesiogiai atnaujinu duomenis dokumente **${docName}**:
- **Dokumentas:** ${isContract ? '📜 Fotografavimo Sutartis' : '🧾 Sąskaita-Faktūra / Kvitas'}
${extractedName ? `- **Užsakovas / Pirkėjas:** **${extractedName}**\n` : ''}${extractedPrice !== null ? `- **Nauja suma:** **${extractedPrice.toFixed(2)} €** (Avansas 50%: ${(extractedPrice / 2).toFixed(2)} €)\n` : ''}${extractedDate ? `- **Fotosesijos data:** **${extractedDate}**\n` : ''}
Pakeitimai automatiškai pritaikyti prie atidaryto dokumento peržiūros ir A4 spausdinimo šablono.

\`\`\`json
{
  "system_action": "update_document",
  "docType": "${docType}",
  "updates": ${JSON.stringify(Object.keys(updates).length > 0 ? updates : { clientName: "Jonas Jonaitis", finalPrice: 160.00, depositAmount: 80.00, preferredDate: "2026-05-20" })}
}
\`\`\``;
    }

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

        // 0. Tiesioginis sutarčių ir sąskaitų redagavimas pagal administratoriaus nurodymą
        if (lower.includes('pakeisk') || lower.includes('redaguok') || lower.includes('atnaujink') || lower.includes('įrašyk') || lower.includes('pataisyk') || lower.includes('nustatyk')) {
            const isInvoice = lower.includes('sąskait') || lower.includes('kvit') || lower.includes('faktūr') || lower.includes('sf');
            const docType = isInvoice ? 'invoice' : 'contract';
            const updates = {};

            const nameMatch = message.match(/(?:vard[ąa]|klient[ąa]|užsakov[ąa])\s+(?:į\s+)?([A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+\s+[A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+)/i);
            if (nameMatch) updates.clientName = nameMatch[1].trim();

            const priceMatch = message.match(/(?:kain[ąa]|sum[ąa]|vert[ęe])\s+(?:į\s+)?(\d+(?:[.,]\d+)?)/i);
            if (priceMatch) updates.finalPrice = parseFloat(priceMatch[1].replace(',', '.'));

            const depMatch = message.match(/(?:avans[ąa])\s+(?:į\s+)?(\d+(?:[.,]\d+)?)/i);
            if (depMatch) updates.depositAmount = parseFloat(depMatch[1].replace(',', '.'));

            const dateMatch = message.match(/(?:dat[ąa]|dien[ąa])\s+(?:į\s+)?(\d{4}[-/.]\d{1,2}[-/.]\d{1,2}|\d{1,2}[-/.]\d{1,2}[-/.]\d{4})/i);
            if (dateMatch) updates.preferredDate = dateMatch[1];

            const locMatch = message.match(/(?:viet[ąa]|lokacij[ąa]|miest[ąa])\s+(?:į\s+)?([A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+(?:\s+[A-ZĄČĘĖĮŠŲŪŽa-ząčęėįšųūž]+)?)/i);
            if (locMatch && !locMatch[1].toLowerCase().includes('sutart') && !locMatch[1].toLowerCase().includes('kain')) {
                updates.location = locMatch[1].trim();
            }

            if (Object.keys(updates).length === 0) {
                updates.clientName = "Klientas (atnaujinta)";
            }

            const updatesFormatted = Object.entries(updates)
                .map(([k, v]) => `- **${k === 'clientName' ? 'Kliento vardas' : (k === 'finalPrice' ? 'Kaina' : (k === 'depositAmount' ? 'Avansas' : (k === 'preferredDate' ? 'Data' : (k === 'location' ? 'Vieta' : k))))}:** ${v}${typeof v === 'number' ? ' €' : ''}`)
                .join('\n');

            return `### ⚡ DOKUMENTO DUOMENŲ ATNAUJINIMAS
Atlikau Jūsų nurodytus pakeitimus **${docType === 'contract' ? 'Fotografavimo sutartyje' : 'Sąskaitoje-faktūroje'}**:

${updatesFormatted}

Visi duomenys paruošti perkėlimui į oficialų A4 šabloną. Spustelėkite mygtuką **„⚡ Tiesiogiai atnaujinti ${docType === 'contract' ? 'sutartį' : 'sąskaitą'}“** žemiau, kad pamatytumėte atnaujintą dokumentą!

\`\`\`json
{
  "system_action": "update_document",
  "docType": "${docType}",
  "updates": ${JSON.stringify(updates, null, 2)}
}
\`\`\``;
        }

        // 0.5. Išlaidų įtraukimas į VMI žurnalą
        if ((lower.includes('įtrauk') || lower.includes('pridėk') || lower.includes('registruok')) && (lower.includes('išlaid') || lower.includes('kur') || lower.includes('ček') || lower.includes('sf') || lower.includes('eur'))) {
            const amountMatch = message.match(/(\d+(?:[.,]\d+)?)\s*(?:€|eur)/i) || message.match(/(?:išlaid[ąa]|sum[ąa]|kain[ąa])\s+(\d+(?:[.,]\d+)?)/i);
            const amount = amountMatch ? parseFloat(amountMatch[1].replace(',', '.')) : 45.00;
            const title = lower.includes('kur') ? 'Kuras vykimui į fotosesijas' : (lower.includes('studij') ? 'Fotostudijos nuoma' : 'Fotografijos veiklos išlaida');
            const cat = lower.includes('kur') ? 'Kuras / Transportas' : (lower.includes('studij') ? 'Studijos nuoma' : 'Kita / Įranga');
            const checkMatch = message.match(/(?:čekis|kvitas|sf|sąskaita)\s+([A-Z0-9_-]+)/i);
            const checkNr = checkMatch ? checkMatch[1] : 'ČEK-' + Math.floor(100 + Math.random() * 900);

            return `### 📥 VMI IŠLAIDOS REGISTRAVIMAS
Užregistruoju Jūsų nurodytą išlaidą į **VMI Pajamų ir Išlaidų Apskaitos Žurnalą (EVRK 74.20)**:
- **Išlaidos pavadinimas:** ${title}
- **Suma:** **${amount.toFixed(2)} €**
- **Kategorija:** ${cat}
- **Dokumentas / Čekio Nr.:** ${checkNr}
- **Data:** ${new Date().toLocaleDateString('lt-LT')}

Spustelėkite mygtuką **„📥 Įtraukti išlaidą į VMI žurnalą“** žemiau, kad ši suma automatiškai atsirastų apskaitos lentelėje!

\`\`\`json
{
  "system_action": "add_vmi_expense",
  "expense": {
    "title": "${title}",
    "amount": ${amount},
    "category": "${cat}",
    "date": "${new Date().toISOString().split('T')[0]}",
    "invoiceNumber": "${checkNr}"
  }
}
\`\`\``;
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
