import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '20mb' }));

const VISIBILITY_FILE = path.join(__dirname, 'reviews-visibility.json');
const REVIEWS_FILE = path.join(__dirname, 'reviews.json');
const EMAIL_CONFIG_FILE = path.join(__dirname, 'email-config.json');
const OUTBOX_FILE = path.join(__dirname, 'emails-outbox.json');

const DEFAULT_EMAIL_CONFIG = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    user: process.env.SMTP_USER || process.env.GMAIL_USER || 'dominikphotofficial.lt@gmail.com',
    pass: process.env.SMTP_PASS || process.env.GMAIL_PASS || '',
    fromName: 'Dominik Šuškevič | DP.PORTFOLIO',
    fromEmail: 'dominikphotofficial.lt@gmail.com',
    replyTo: 'dominikphotofficial.lt@gmail.com'
};

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

function getEmailTransporter(config) {
    const user = (config && config.user ? config.user : (process.env.SMTP_USER || process.env.GMAIL_USER || '')).trim();
    const pass = (config && config.pass ? config.pass : (process.env.SMTP_PASS || process.env.GMAIL_PASS || '')).trim();

    if (!user || !pass) {
        return null;
    }

    const cleanPass = pass.replace(/\s+/g, ''); // Google App Passwords often have spaces

    if (config.host && config.host !== 'smtp.gmail.com') {
        return nodemailer.createTransport({
            host: config.host,
            port: Number(config.port) || 465,
            secure: Number(config.port) === 465 || config.secure === true,
            auth: {
                user: user,
                pass: cleanPass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: cleanPass
        }
    });
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
// Email System APIs
// -----------------------------------------------------------------------------

// Get current email config (without exposing full password)
app.get('/api/email-config', (req, res) => {
    const config = readJsonFile(EMAIL_CONFIG_FILE, DEFAULT_EMAIL_CONFIG);
    const envPass = process.env.SMTP_PASS || process.env.GMAIL_PASS || '';
    const hasPass = Boolean((config.pass && config.pass.trim()) || envPass);

    res.json({
        service: config.service || 'gmail',
        host: config.host || 'smtp.gmail.com',
        port: config.port || 465,
        secure: config.secure !== false,
        user: config.user || 'dominikphotofficial.lt@gmail.com',
        hasPassword: hasPass,
        fromName: config.fromName || 'Dominik Šuškevič | DP.PORTFOLIO',
        fromEmail: config.fromEmail || config.user || 'dominikphotofficial.lt@gmail.com',
        replyTo: config.replyTo || 'dominikphotofficial.lt@gmail.com'
    });
});

// Update email config
app.post('/api/email-config', (req, res) => {
    const existing = readJsonFile(EMAIL_CONFIG_FILE, DEFAULT_EMAIL_CONFIG);
    const { host, port, user, pass, fromName, fromEmail, replyTo } = req.body;

    const updated = {
        service: (host && host !== 'smtp.gmail.com') ? 'custom' : 'gmail',
        host: host || 'smtp.gmail.com',
        port: Number(port) || 465,
        secure: Number(port) === 465 || port === undefined,
        user: (user || existing.user || 'dominikphotofficial.lt@gmail.com').trim(),
        pass: (pass && pass.trim()) ? pass.trim() : (existing.pass || ''),
        fromName: fromName || existing.fromName || 'Dominik Šuškevič | DP.PORTFOLIO',
        fromEmail: fromEmail || user || existing.fromEmail || 'dominikphotofficial.lt@gmail.com',
        replyTo: replyTo || user || existing.replyTo || 'dominikphotofficial.lt@gmail.com'
    };

    const saved = writeJsonFile(EMAIL_CONFIG_FILE, updated);
    if (saved) {
        res.json({ success: true, message: 'El. pašto konfigūracija sėkmingai išsaugota' });
    } else {
        res.status(500).json({ success: false, error: 'Nepavyko išsaugoti konfigūracijos' });
    }
});

// Test email connection / send test message
app.post('/api/email-test', async (req, res) => {
    const config = readJsonFile(EMAIL_CONFIG_FILE, DEFAULT_EMAIL_CONFIG);
    const targetEmail = (req.body && req.body.to) ? req.body.to.trim() : (config.user || 'dominikphotofficial.lt@gmail.com');
    const transporter = getEmailTransporter(config);

    if (!transporter) {
        return res.status(400).json({
            success: false,
            error: 'SMTP slaptažodis neįvestas. Įveskite Google App Password arba SMTP slaptažodį.'
        });
    }

    try {
        // Verify transport credentials
        await transporter.verify();

        // Send actual test email
        const info = await transporter.sendMail({
            from: `"${config.fromName || 'Dominik Šuškevič'}" <${config.user.trim()}>`,
            to: targetEmail,
            subject: '✅ DP.PORTFOLIO Testinis El. Laiškas',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 25px; background: #f4f6f5; color: #113939;">
                    <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0;">
                        <h2 style="margin-top: 0; color: #113939; letter-spacing: 2px;">DP.PORTFOLIO</h2>
                        <p style="font-size: 15px; line-height: 1.6;">
                            Sveikiname! Jūsų <strong>DP.PORTFOLIO</strong> el. pašto siuntimo sistema sukonfigūruota teisingai ir veikia be priekaištų.
                        </p>
                        <p style="font-size: 13px; color: #666; margin-top: 20px;">
                            Siuntėjas: ${config.user}<br>
                            Gavėjas: ${targetEmail}<br>
                            Laikas: ${new Date().toLocaleString('lt-LT')}
                        </p>
                    </div>
                </div>
            `
        });

        // Log to outbox
        const outbox = readJsonFile(OUTBOX_FILE, []);
        outbox.unshift({
            id: 'test_' + Date.now(),
            to: targetEmail,
            subject: '✅ DP.PORTFOLIO Testinis El. Laiškas',
            clientName: 'Testas',
            createdAt: new Date().toISOString(),
            status: 'sent',
            deliveredAt: new Date().toISOString(),
            deliveryDetails: `Testinis laiškas išsiųstas sėkmingai (ID: ${info.messageId})`
        });
        writeJsonFile(OUTBOX_FILE, outbox.slice(0, 100));

        res.json({
            success: true,
            message: `Testinis laiškas sėkmingai išsiųstas į ${targetEmail}!`,
            messageId: info.messageId
        });
    } catch (err) {
        console.error('Email test failure:', err);
        res.status(500).json({
            success: false,
            error: err.message || 'Nepavyko prisijungti prie el. pašto serverio. Patikrinkite el. paštą ir slaptažodį.'
        });
    }
});

// Send real email to client
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html, replyTo, clientName } = req.body;
    if (!to || !subject || !html) {
        return res.status(400).json({ success: false, error: 'Trūksta privalomų laukų (to, subject, html)' });
    }

    const config = readJsonFile(EMAIL_CONFIG_FILE, DEFAULT_EMAIL_CONFIG);
    const outbox = readJsonFile(OUTBOX_FILE, []);
    const emailRecord = {
        id: 'mail_' + Date.now(),
        to: to.trim(),
        subject: subject.trim(),
        clientName: clientName || '',
        previewText: subject.substring(0, 90),
        html: html,
        createdAt: new Date().toISOString(),
        status: 'pending',
        deliveryDetails: null
    };

    const transporter = getEmailTransporter(config);

    if (!transporter) {
        emailRecord.status = 'queued_no_smtp';
        emailRecord.deliveryDetails = 'SMTP slaptažodis nesukonfigūruotas. Laiškas išsaugotas žurnale.';
        outbox.unshift(emailRecord);
        writeJsonFile(OUTBOX_FILE, outbox.slice(0, 100));

        return res.json({
            success: true,
            delivered: false,
            queued: true,
            emailId: emailRecord.id,
            notice: 'SMTP slaptažodis dar neįvestas. Laiškas išsaugotas išsiuntimo žurnale. Įveskite Google App Password admin skiltyje „El. Paštas“.'
        });
    }

    try {
        const fromAddress = `"${config.fromName || 'Dominik Šuškevič | DP.PORTFOLIO'}" <${config.user.trim()}>`;
        const mailOptions = {
            from: fromAddress,
            to: to.trim(),
            replyTo: replyTo || config.replyTo || config.user.trim(),
            subject: subject.trim(),
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        emailRecord.status = 'sent';
        emailRecord.deliveredAt = new Date().toISOString();
        emailRecord.deliveryDetails = `Išsiųsta sėkmingai (ID: ${info.messageId})`;
        outbox.unshift(emailRecord);
        writeJsonFile(OUTBOX_FILE, outbox.slice(0, 100));

        return res.json({
            success: true,
            delivered: true,
            messageId: info.messageId,
            emailId: emailRecord.id
        });
    } catch (err) {
        console.error('Email send error:', err);
        emailRecord.status = 'error';
        emailRecord.deliveryDetails = err.message || 'Klaida siunčiant laišką';
        outbox.unshift(emailRecord);
        writeJsonFile(OUTBOX_FILE, outbox.slice(0, 100));

        return res.status(500).json({
            success: false,
            delivered: false,
            error: err.message || 'Nepavyko išsiųsti el. laiško per SMTP'
        });
    }
});

// Get Outbox list
app.get('/api/emails-outbox', (req, res) => {
    const outbox = readJsonFile(OUTBOX_FILE, []);
    // Don't send full heavy HTML in list
    const summary = outbox.map(item => ({
        id: item.id,
        to: item.to,
        subject: item.subject,
        clientName: item.clientName,
        createdAt: item.createdAt,
        status: item.status,
        deliveredAt: item.deliveredAt,
        deliveryDetails: item.deliveryDetails
    }));
    res.json(summary);
});

// Get single email with HTML for preview
app.get('/api/emails-outbox/:id', (req, res) => {
    const outbox = readJsonFile(OUTBOX_FILE, []);
    const email = outbox.find(m => m.id === req.params.id);
    if (email) {
        res.json(email);
    } else {
        res.status(404).json({ error: 'Laiškas nerastas' });
    }
});

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
