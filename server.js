import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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
