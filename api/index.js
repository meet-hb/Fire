import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// ✅ FIXED DB CONNECTION (Supabase / Vercel)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Test DB connection
(async () => {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("✅ DB Connected:", res.rows);
    } catch (err) {
        console.error("❌ DB Error:", err.message);
    }
})();

// Routes
app.get("/api/test", (req, res) => {
    res.json({
        message: "API Working 🚀",
        has_db: !!process.env.DATABASE_URL,
    });
});

// GET content
app.get("/api/content/:section", async (req, res) => {
    try {
        const { section } = req.params;

        const result = await pool.query(
            "SELECT content FROM site_content WHERE section_name = $1",
            [section]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0].content);
        } else {
            res.json(null);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SAVE content
app.post("/api/content/:section", async (req, res) => {
    try {
        const { section } = req.params;
        const { content } = req.body;

        await pool.query(
            `INSERT INTO site_content (section_name, content)
       VALUES ($1, $2)
       ON CONFLICT (section_name)
       DO UPDATE SET content = $2`,
            [section, JSON.stringify(content)]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload (Vercel temp storage)
const uploadDir = "/tmp/uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-")),
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.use("/uploads", express.static(uploadDir));

// ✅ FIXED SETUP ROUTE (NO FILE PATH ISSUE)
app.get("/api/setup", async (req, res) => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        section_name TEXT UNIQUE,
        content JSONB
      );
    `);

        res.json({
            success: true,
            message: "✅ Database setup complete",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Root
app.get("/api", (req, res) => {
    res.send("🔥 Firegard API Running");
});

export default app;