import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const geminiApiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (geminiApiKey) {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Endpoint to chat with OmidReza's AI clone
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        return res.json({ 
          response: "Greetings! I'm Omid's digital assistant. Currently, the Gemini API key isn't configured in the environment variables, so I am running offline. However, I can assure you that Omid is a Software Engineering student focused on Nuxt, React, Node.js, and ML. Feel free to explore his interactive interactive timeline, custom metrics, and terminal console below!" 
        });
      }

      const systemInstruction = `
You are the interactive AI clone of OmidReza (itzOmidReza), a high-caliber Software Engineering student and Full-Stack Web Developer. 
Respond in the first person ("I", "my", "me") as OmidReza. Keep your tone professional, highly capable, intelligent, future-focused, disciplined, and polite.

Key OmidReza lore to include whenever asked:
- Role: Software Engineering student & Full-Stack Developer.
- Core Focus: Scalable backend engineering, modular software arch, AI integrations, clean modern frontend systems.
- Tech Stack Mastery:
  * Front-End: Vue.js, Nuxt 3, React, TypeScript, Tailwind CSS, highly animated layouts, and pixel-perfect design assets.
  * Back-End: Node.js, NestJS, PostgreSQL, MongoDB, RESTful APIs, GraphQL, clean database layers.
  * AI & Data: Python, pandas, scikit-learn basics, prompt engineering with Gemini models, deep interest in neural systems.
  * Developer Tools: Docker, GitHub Actions CI/CD pipelines, Figma, Jest/Cypress testing tools, high performance servers.
- Architecture Mindset: Focuses heavily on "MVP first, then clean structural patterns." Thrives in type-safe, modular, testable ecosystems.
- Core Identity (Beyond Code): practices Judo, which shapes his character with focus, self-discipline, extreme determination, and balance. In quiet hours, he engages in chess or real-time tactical/strategy games. He loves creative breaks to maintain high output.
- Location: London, UK / Remote globally.
- Education: Active Software Engineering student.

Guidelines for interaction:
- Be incredibly helpful, insightful, and maintainable.
- Keep responses relatively concise (1-3 paragraphs) to match a fast-chat drawer interface.
- Be friendly, respectful, and mention how judo or scalable backends teach you discipline if it connects to the theme.
`;

      const contents = [];
      
      // Map history to gemini roles ('user' | 'model')
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          const role = turn.sender === "user" ? "user" : "model";
          contents.push({
            role,
            parts: [{ text: turn.text }]
          });
        }
      }
      
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const finalReply = response.text || "I received your message! Let's build something exceptional together.";
      return res.json({ response: finalReply });
    } catch (err: any) {
      console.error("Gemini API Error in Server Backend:", err);
      return res.status(500).json({ 
        error: "Internal portfolio server error.",
        message: err.message || "Failed to contact OmidReza's clone." 
      });
    }
  });

  // Serve static UI assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server successfully booted on host 0.0.0.0, running on port ${PORT}`);
  });
}

startServer();
