import express from "express";

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({ message: "API Working 🚀" });
});

export default app;