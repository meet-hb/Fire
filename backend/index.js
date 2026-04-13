import pool from "./config/db.js";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Status Check Route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family:sans-serif; text-align:center; padding:50px;">
      <h1 style="color:#F26522;">🚀 API IS LIVE (v3)</h1>
      <p>The Upload Route is ACTIVE and READY.</p>
      <p>Status: <span style="color:green; font-weight:bold;">FULLY SYNCED</span></p>
    </div>
  `);
});

// DB Configuration
const db = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: 5432,
});

const testDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB Connected:", res.rows);
  } catch (err) {
    console.error("DB Error:", err);
  }
};

testDB();

db.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ Database Connection Error:', err.message));

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

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
  console.log('--- Upload Request Received ---');
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('Generated URL:', fileUrl);
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
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/setup', async (req, res) => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf8');
    await db.query(sql);
    res.send('<div style="text-align:center; padding:50px;"><h1>✅ Database Fully Seeded!</h1><p>All sections are now ready.</p></div>');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Only listen to port if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend API running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
