const express = require('express');
const cors = require('cors');
const https = require('https');
const dotenv = require('dotenv');
const { SearchClient, AzureKeyCredential } = require('@azure/search-documents');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// 🧠 Azure Cognitive Search query
async function getChunksFromSearch(query) {
  const endpoint = process.env.COGNITIVE_SEARCH_ENDPOINT;
  const indexName = process.env.COGNITIVE_SEARCH_INDEX;
  const apiKey = process.env.COGNITIVE_SEARCH_API_KEY;

  const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));

  const searchResults = await client.search(query, {
    top: 3,
    select: ["chunk"]
  });

  const chunks = [];
  for await (const result of searchResults.results) {
    chunks.push(result.document.chunk);
  }

  return chunks;
}

// 🧠 Main GPT route
app.post('/api/ask', async (req, res) => {
  try {
    const userMessage = req.body.message || "";
    const knowledgeChunks = await getChunksFromSearch(userMessage);
    const context = knowledgeChunks.join('\n\n').slice(0, 4000); // Trim for token safety

    const url = new URL(`${process.env.OPENAI_API_URL}/openai/deployments/${process.env.OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-03-01`);

    const body = JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are Astro, an empathetic AI guide who supports individuals and families with invisible wounds using the BARC Method. Speak at a 5th grade level. Respond warmly, supportively, and with compassion.\n\nUse this knowledge:\n\n${context}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 600,
      temperature: 0.7
    });

    const accessToken = {
      token: process.env.OPENAI_API_KEY
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': accessToken.token
      }
    };

    const request = https.request(url, options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log('🧠 FULL GPT RESPONSE:', JSON.stringify(json, null, 2));
          const reply = json.choices?.[0]?.message?.content || "Astro couldn’t think of a reply.";
          res.json({ reply });
        } catch (err) {
          console.error('Error parsing GPT response:', err.message);
          res.status(500).json({ reply: "Astro received a broken reply from GPT." });
        }
      });
    });

    request.on('error', (error) => {
      console.error('GPT HTTPS Error:', error.message);
      res.status(500).json({
        reply: "Astro’s brain isn’t waking up right now — can we try again in a few minutes?"
      });
    });

    request.write(body);
    request.end();

  } catch (error) {
    console.error('GPT Error:', error.message);
    res.status(500).json({
      reply: "Astro hit a snag reaching the brain — can you try again?"
    });
  }
});

app.get('/api/userdata/:email', async (req, res) => {
  res.json({ message: "This endpoint is not yet wired for CosmosDB queries." });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`✅ AstroGPT backend running on port ${process.env.PORT || 3001}`);
});


