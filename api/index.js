import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
const { Pool } = pg;
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// DB Configuration - Note: localhost won't work on Vercel
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
};

const db = new Pool(dbConfig);

// Safe connect
if (process.env.DB_USER) {
    db.connect()
      .then(() => console.log('✅ Connected to PostgreSQL'))
      .catch(err => console.error('❌ Database Connection Error:', err.message));
}

// Routes
app.get('/api/test', (req, res) => {
    res.json({ 
        message: "API Working 🚀",
        env: {
            has_db_user: !!process.env.DB_USER,
            node_env: process.env.NODE_ENV
        }
    });
});

app.get('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    if (!process.env.DB_USER) {
        return res.status(500).json({ error: "Database configuration missing (DB_USER not set)" });
    }
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
    if (!process.env.DB_USER) {
        return res.status(500).json({ error: "Database configuration missing (DB_USER not set)" });
    }
    await db.query(
      'INSERT INTO site_content (section_name, content) VALUES ($1, $2) ON CONFLICT (section_name) DO UPDATE SET content = $2',
      [section, JSON.stringify(content)]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve local uploads only if they exist (won't persist on Vercel)
const uploadDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadDir)) {
    try {
        fs.mkdirSync(uploadDir, { recursive: true });
    } catch (e) {
        console.log("Could not create /tmp/uploads folder");
    }
}
app.use('/uploads', express.static(uploadDir));

// Multer Storage - Using /tmp for Vercel
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.get('/api/setup', async (req, res) => {
  try {
    const sqlPath = path.join(__dirname, '..', 'backend', 'setup.sql');
    if (!fs.existsSync(sqlPath)) {
        return res.status(404).json({ error: "setup.sql not found at " + sqlPath });
    }
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await db.query(sql);
    res.send('<div style="text-align:center; padding:50px; font-family:sans-serif;"><h1>✅ Database Fully Seeded!</h1><p>All sections are now ready on Vercel.</p><a href="/" style="color:#F26522; font-weight:bold; text-decoration:none;">Go back to site</a></div>');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root route
app.get('/api', (req, res) => {
    res.send('<h1>Firegard API v1.0</h1>');
});

export default app;