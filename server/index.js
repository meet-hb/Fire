require('dotenv').config();
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const db = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const result = await db.query('SELECT content FROM site_content WHERE section_name = $1', [section]);
    if (result.rows.length > 0) {
      res.json(result.rows[0].content);
    } else {
      res.status(404).json({ error: 'Section not found' });
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

// Auto-setup endpoint
app.get('/api/setup', async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const sql = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf8');
    await db.query(sql);
    res.send('<div style="font-family: sans-serif; text-align: center; padding: 50px;"><h1>✅ Database Setup Successful!</h1><p>Your PostgreSQL tables have been initialized with seeded data.</p><button onclick="window.close()">Close this window</button></div>');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
