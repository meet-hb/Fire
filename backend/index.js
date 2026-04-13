const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// DB Configuration - Support both DATABASE_URL and individual params
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD || ''),
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
};

const db = new Pool(dbConfig);

// Test Connection
db.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ Database Connection Error:', err.message));

// Status Check Route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family:sans-serif; text-align:center; padding:50px;">
      <h1 style="color:#F26522;">🚀 WELDOSELD API IS LIVE</h1>
      <p>Database: ${process.env.DB_NAME || 'Linked'}</p>
      <p>Status: <span style="color:green; font-weight:bold;">READY</span></p>
    </div>
  `);
});

// Serve Static Files
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use('/uploads', express.static(uploadDir));

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage });

// --- File Upload API ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// --- Content API ---
app.get('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const result = await db.query('SELECT content FROM site_content WHERE section_name = $1', [section]);
    if (result.rows.length > 0) {
      res.json(result.rows[0].content);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.error(`Error fetching ${req.params.section}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const { content } = req.body;
    await db.query(
      'INSERT INTO site_content (section_name, content) VALUES ($1, $2) ON CONFLICT (section_name) DO UPDATE SET content = $2',
      [section, JSON.stringify(content)]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(`Error updating ${req.params.section}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- Setup/Seed Route ---
app.get('/api/setup', async (req, res) => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS site_content (
                id SERIAL PRIMARY KEY,
                section_name VARCHAR(50) UNIQUE NOT NULL,
                content JSONB NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Rebrand data
        const seedData = [
            ['navigation', { "logo": "WELDOSELD", "links": ["Home", "About", "Brands", "Products", "Videos", "Gallery", "Certifications", "Clients", "Contact"], "topBar": { "phone": "+61 8 0000 000", "email": "info@weldoseld.com", "address": "123 Safety Way, NY" } }],
            ['hero', { "tagline": "WELCOME TO WELDOSELD", "title": "Protecting lives with trusted fire safety", "description": "Solutions for industrial and residential assets.", "image": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1000" }],
            ['expertise', {
                "badge": "WHO WE ARE",
                "title": "Unlock your potential with our expertise",
                "description": "Fire incidents can strike without warning, causing damage, disruption, and putting lives at risk. That’s why having a trusted fire protection partner is essential.",
                "subtitle": "Certified and Experienced in fire protections",
                "subdescription": "From advanced alarm systems and extinguishers to custom evacuation plans, our certified professionals handle every detail with care, precision, and urgency.",
                "image": "https://images.unsplash.com/photo-1599059021644-80252390a424?w=800&h=800&fit=crop",
                "stats": [
                    { "label": "Satisfied Customers", "value": "98%" },
                    { "label": "Projects Completed", "value": "20K" }
                ],
                "points": [
                    "Let us help you build a custom fire protection plan.",
                    "From inspections to installations we've got you covered."
                ]
            }],
            ['footer', { "logo": "WELDOSELD", "description": "Engineered for ultimate protection.", "links": { "services": ["Fire Alarms", "Fire Suppression"] }, "contact": { "address": "123 Safety Way, NY", "phone": "+61 8 0000 000", "email": "info@weldoseld.com" } }]
        ];

        for (const [section, content] of seedData) {
            await db.query(
                `INSERT INTO site_content (section_name, content) VALUES ($1, $2) ON CONFLICT (section_name) DO UPDATE SET content = $2`,
                [section, JSON.stringify(content)]
            );
        }

        res.json({ success: true, message: "✅ WELDOSELD Database Initialized Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
  console.log(`🚀 Production Server running on port ${PORT}`);
});
