require('dotenv').config();
const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());

// O cliente usa Application Default Credentials (configure GOOGLE_APPLICATION_CREDENTIALS)
const ai = new GoogleGenAI({});

app.get('/api/ai/models', async (req, res) => {
  try {
    const list = await ai.models.list();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/ai/sugestao', async (req, res) => {
  const prompt = req.body.prompt || '';
  const model = process.env.GENAI_MODEL || 'gemini-3.5-flash';

  try {
    const response = await ai.models.generateContent({ model, contents: prompt });
    // O objeto response pode variar; preferir response.text se existir
    const text = response?.text || (response?.output?.[0]?.content?.[0]?.text) || JSON.stringify(response);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('AI proxy running on port', port));
