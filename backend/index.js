require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API\_KEY = process.env.OPENAI\_API\_KEY;
const ENDPOINT = process.env.OPENAI\_API\_URL;
const DEPLOYMENT = process.env.OPENAI\_DEPLOYMENT;
const API\_VERSION = "2025-01-01-preview";
const SYSTEM\_PROMPT = fs.readFileSync("./system\_prompt\_FULL.txt", "utf8");
const PORT = process.env.PORT || 3001;

console.log("✅ Server booted. API\_KEY loaded:", !!API\_KEY);

app.post("/api/ask", async (req, res) => {
const userMessage = req.body.message || "";

console.log("📥 Received message from frontend:", userMessage);
console.log("🔑 API KEY being used:", API\_KEY);

const messages = \[
{ role: "system", content: SYSTEM\_PROMPT },
{ role: "user", content: userMessage }
];

try {
const response = await axios.post(
`${ENDPOINT}/openai/deployments/${DEPLOYMENT}/chat/completions?api-version=${API_VERSION}`,
{
messages,
max\_tokens: 600,
temperature: 0.7
},
{
headers: {
"Content-Type": "application/json",
"api-key": API\_KEY
}
}
);

```
console.log("🤖 Raw GPT response:", JSON.stringify(response.data));

const reply = response.data.choices?.[0]?.message?.content || "No response.";

console.log("🤖 Parsed reply:", reply);

res.json({ reply });
```

} catch (error) {
console.error("❌ GPT API error:", error);
res.status(500).json({ error: "Error talking to Astro." });
}
});

app.listen(PORT, () => {
console.log(`🚀 Server listening on port ${PORT}`);
});

