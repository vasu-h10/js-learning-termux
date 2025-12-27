import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// HTML validator
app.post("/api/w3proxy/html", async (req, res) => {
  try {
    const r = await fetch("https://validator.w3.org/nu/?out=json", {
      method: "POST",
      body: req.body.html,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
    res.json(await r.json());
  } catch (e) {
    res.json({ error: e.toString() });
  }
});

// CSS validator
app.post("/api/w3proxy/css", async (req, res) => {
  try {
    const r = await fetch("https://jigsaw.w3.org/css-validator/validator?output=json", {
      method: "POST",
      body: req.body.css,
      headers: { "Content-Type": "text/css" }
    });
    res.json(await r.json());
  } catch (e) {
    res.json({ error: e.toString() });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("W3 Proxy running on", PORT));
export default app;
