import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Use the new Gemini 3 series
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `Translate the following text into ${targetLang}. 
                    Return ONLY the translated string, no explanations: "${text}"`;

    const result = await model.generateContent(prompt);
    const translation = result.response.text();
    
    res.json({ translation });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));