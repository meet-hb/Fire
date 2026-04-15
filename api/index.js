import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { getPool, hasDatabaseConfig } from "./db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// ✅ FIXED DB CONNECTION (Supabase / Neon / Vercel Postgres)
const pool = getPool();
const isMissingTableError = (error) => error?.code === "42P01";
const isMissingColumnError = (error) => error?.code === "42703";

// Test DB connection
(async () => {
    try {
        if (!hasDatabaseConfig() || !pool) {
            console.warn("⚠️ DATABASE_URL not set. Skipping DB connection test.");
            return;
        }
        const res = await pool.query("SELECT NOW()");
        console.log("✅ DB Connected:", res.rows[0]);
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
    }
})();

// API Routes
app.get("/api/test", (req, res) => {
    res.json({
        message: "API Working 🚀",
        has_db: hasDatabaseConfig(),
    });
});

// GET content
app.get("/api/content/:section", async (req, res) => {
    try {
        if (!pool) {
            return res.json(null);
        }

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
        if (isMissingTableError(err) || isMissingColumnError(err)) {
            return res.json(null);
        }
        console.error("Content fetch error:", err.message);
        res.status(500).json({ error: "Failed to fetch content." });
    }
});

// SAVE content
app.post("/api/content/:section", async (req, res) => {
    try {
        if (!pool) {
            return res.status(503).json({ error: "Database is not configured." });
        }

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
        console.error("Content save error:", err.message);
        res.status(500).json({ error: "Failed to save content." });
    }
});

// Upload Logic (Temporary for Vercel, /tmp is allowed)
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

// ✅ FULL SETUP ROUTE (Hardcoded for stability on Vercel)
app.get("/api/setup", async (req, res) => {
    try {
        if (!hasDatabaseConfig() || !pool) {
            throw new Error("DATABASE_URL is missing in environment variables.");
        }

        // 1. Create Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS site_content (
                id SERIAL PRIMARY KEY,
                section_name VARCHAR(50) UNIQUE NOT NULL,
                content JSONB NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 2. All Default Content Data
        const seedData = [
            ['navigation', {
                "logo": "WELDOSELD",
                "links": ["Home", "About", "Brands", "Products", "Videos", "Gallery", "Certifications", "Clients", "Contact"],
                "topBar": { "phone": "+61 8 0000 000", "email": "info@weldoseld.com", "address": "123 Safety Way, NY" }
            }],
            ['hero', {
                "tagline": "WELCOME TO WELDOSELD",
                "title": "Protecting lives with trusted fire safety",
                "description": "Premium fire protection solutions for industrial and residential assets across the globe.",
                "image": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1000",
            }],
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
            ['about', {
                "title": "Expert guidance and fire safety protection",
                "subtitle": "ABOUT OUR COMPANY",
                "description": "We specialize in high-end fire safety solutions, providing specialized consultancy and on-site engineering.",
                "experience": "30+",
                "image": "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
                "image2": "https://images.unsplash.com/photo-1599059021644-80252390a424?auto=format&fit=crop&q=80&w=400",
                "stats": [{ "label": "Projects Completed", "value": "150+" }, { "label": "Cities Covered", "value": "40+" }, { "label": "Awards Won", "value": "25+" }]
            }],
            ['services', [
                { "title": "Fire Suppression", "description": "Automatic CO2 and clean agent systems for high-risk areas.", "icon": "Shield" },
                { "title": "Alarm Systems", "description": "Smart detection and notification systems for early warnings.", "icon": "Flame" },
                { "title": "Hydrant Systems", "description": "High-pressure water distribution for industrial complexes.", "icon": "Droplets" },
                { "title": "Safety Audits", "description": "Professional consultancy and thorough asset assessment.", "icon": "Search" }
            ]],
            ['footer', {
                "logo": "WELDOSELD",
                "description": "Premium fire protection solutions for industrial and residential assets. Engineered for ultimate protection.",
                "links": { "services": ["Fire Alarms", "Fire Suppression", "Fire Hydrants", "Safety Audits"] },
                "contact": { "address": "123 Safety Way, Industrial Zone, New York", "phone": "+61 8 0000 000", "email": "info@weldoseld.com" }
            }],
            ['gallery', [
                "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1542353436-312f0ee9429b?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?w=500&h=450&fit=crop",
                "https://images.unsplash.com/photo-1599059021644-80252390a424?w=500&h=500&fit=crop"
            ]],
            ['brands', [
                { "name": "FireGard Pro", "logo": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=100&fit=crop" },
                { "name": "SafeTech", "logo": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=100&fit=crop" }
            ]],
            ['videos', [
                { "title": "Fire Training", "thumb": "https://images.unsplash.com/photo-1542353436-312f0ee9429b?w=800&h=450&fit=crop" },
                { "title": "Installation Guide", "thumb": "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?w=800&h=450&fit=crop" }
            ]],
            ['features', [
                { "title": "Custom Fire Protection Plans", "description": "Tailored fire safety solutions based on your property needs.", "image": "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800" },
                { "title": "Advanced Fire Alarm Systems", "description": "State of the art fire alarm systems designed for early detection.", "image": "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=800" },
                { "title": "Evacuation Planning & Drills", "description": "We develop customized emergency evacuation plans.", "image": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800" }
            ]],
            ['certs', [
                { "title": "ISO 9001:2015", "issuer": "Quality Management System", "date": "Active" },
                { "title": "NFPA Certified", "issuer": "Fire Protection Assoc", "date": "Renewed" }
            ]],
            ['clients', [
                { "label": "Global Assets", "value": "47B+" },
                { "label": "Compliance Rate", "value": "90%+" }
            ]]
        ];

        // 3. Execution (Upsert)
        for (const [section, content] of seedData) {
            await pool.query(
                `INSERT INTO site_content (section_name, content) 
                 VALUES ($1, $2) 
                 ON CONFLICT (section_name) DO UPDATE SET content = $2`,
                [section, JSON.stringify(content)]
            );
        }

        res.json({
            success: true,
            message: "✅ Backend Setup + Seed Data Inserted Perfectly!",
        });

    } catch (err) {
        console.error("Setup Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Root Route
app.get("/api", (req, res) => {
    res.send("<h1>🔥 WELDOSELD Vercel API is Live v1.1</h1>");
});

export default app;
