import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import { buildEmail } from './email-templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// 🔒 Firebase Auth System Endpoints Proxy (/__/auth/* and /_/auth/*: /handler, /iframe, /action, etc.)
// Seamlessly proxies custom domain Firebase Auth requests to the Firebase backend so custom domain OAuth & Action URLs work 100%
app.all(['/__/auth/*', '/_/auth/*'], (req, res) => {
    let targetPath = req.originalUrl;
    // Normalize /_/auth/ to /__/auth/ for Firebase backend compatibility
    if (targetPath.startsWith('/_/auth/')) {
        targetPath = '/__' + targetPath.slice(2);
    }

    const hostHeader = (req.headers.host || '').split(':')[0].toLowerCase();
    const isCustomDomain = hostHeader.includes('dominikphotofficial.lt');
    const forwardedHost = isCustomDomain ? 'dominikphotofficial.lt' : 'tfp-form.firebaseapp.com';

    const cleanHeaders = { ...req.headers };
    delete cleanHeaders.host;
    delete cleanHeaders['x-forwarded-host'];
    delete cleanHeaders['x-forwarded-server'];

    const options = {
        hostname: 'tfp-form.firebaseapp.com',
        port: 443,
        path: targetPath,
        method: req.method,
        headers: {
            ...cleanHeaders,
            host: 'tfp-form.firebaseapp.com',
            'x-forwarded-host': forwardedHost,
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
// - Firebase Auth handler (/__/auth/ and /_/auth/) and API (/api) pass through directly on the main domain
app.use((req, res, next) => {
    const host = (req.headers.host || '').split(':')[0].toLowerCase();
    const isCustomDomain = host.includes('dominikphotofficial.lt');
    if (!isCustomDomain) {
        return next();
    }

    // Pass through Firebase Auth handler and API requests
    if (req.path.startsWith('/__/auth') || req.path.startsWith('/_/auth') || req.path.startsWith('/api')) {
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
// Private Booking Confirmation Email Builder (uses server-side env payment vars)
// -----------------------------------------------------------------------------
app.post('/api/booking-confirmation-email', (req, res) => {
    try {
        const body = req.body || {};
        const name = String(body.name || body.clientName || '').trim();
        const email = String(body.email || '').trim();
        if (!name || !email) {
            return res.status(400).json({ success: false, error: 'Trūksta kliento vardo arba el. pašto' });
        }

        const templateType = body.templateType === 'ServiceConfirmed' ? 'ServiceConfirmed' : 'ServiceNew';
        const lang = ['lt', 'en', 'ru'].includes(body.lang) ? body.lang : 'lt';

        const paymentDetails = {
            recipient: process.env.PAYMENT_RECIPIENT || '',
            iban: process.env.PAYMENT_IBAN || '',
            bank: process.env.PAYMENT_BANK || '',
            paypal: process.env.PAYMENT_PAYPAL || ''
        };

        const built = buildEmail(templateType, lang, {
            name,
            serviceName: body.serviceName || '',
            finalPrice: body.finalPrice,
            depositAmount: body.depositAmount,
            remainingAmount: body.remainingAmount,
            paymentMethod: body.paymentMethod || 'Bank Transfer',
            date_time: body.date_time || '',
            location: body.location || '',
            paymentDetails
        });

        return res.json({
            success: true,
            subject: built.subject,
            text: built.text,
            html: built.html
        });
    } catch (error) {
        console.error('Error building booking confirmation email:', error);
        return res.status(500).json({ success: false, error: 'Nepavyko paruošti el. laiško šablono' });
    }
});

// API 404 handler - prevents returning HTML for API requests
app.use('/api', (req, res) => {
    res.status(404).json({ success: false, error: `API maršrutas nerastas: ${req.method} ${req.originalUrl}` });
});

// Aliases for booking and admin routes
app.get(['/service', '/service.html', '/services'], (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get(['/tfp.booking', '/tfp.booking.html', '/tfp-booking', '/tfp-booking.html', '/tfp'], (req, res) => {
    res.sendFile(path.join(__dirname, 'tfp-booking.html'));
});

app.get(['/admin', '/admin/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// 🖼️ Unified Album & Gallery Routes:
// Direct redirects for bare album collections
app.get(['/albums', '/albums/', '/album', '/album/'], (req, res) => {
    res.redirect(302, '/#gallery');
});

// Frozen Time movie special album alias
app.get(['/albums/frozen-time', '/albums/frozen-time.html', '/album/frozen-time', '/album/frozen-time.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'frozen-time.html'));
});

// Serve core assets (CSS/JS) requested from inside /albums/ directory to prevent any 404s
app.get('/albums/:file(style\\.css|script\\.js|album-footer\\.js|analytics\\.js)', (req, res) => {
    res.sendFile(path.join(__dirname, req.params.file));
});

// Dynamic album page resolution (handles /albums/:slug, /album/:slug with or without .html)
app.get(['/albums/:slug', '/album/:slug'], (req, res, next) => {
    let slug = req.params.slug;
    if (slug.endsWith('.html')) slug = slug.slice(0, -5);

    const albumFile = path.join(__dirname, 'albums', `${slug}.html`);
    if (fs.existsSync(albumFile)) {
        return res.sendFile(albumFile);
    }

    // Try finding close match in albums directory
    const files = fs.readdirSync(path.join(__dirname, 'albums'));
    const matched = files.find(f => f.toLowerCase().replace('.html', '') === slug.toLowerCase());
    if (matched) {
        return res.sendFile(path.join(__dirname, 'albums', matched));
    }

    next();
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
