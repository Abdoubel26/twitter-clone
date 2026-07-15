import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getTextAndCallAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Chat request received:", prompt?.substring(0, 50) + "...");

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 2048,
    });

    console.log("Chat response sent successfully");
    
    return res.json({ text: response.choices[0]?.message?.content || "", success: true, status: 200 });
  } catch (err) {
    const error = err;
    console.error("Chat Error:", error.message);
    return res.status(500).json({ error: error.message, success: false, status: 500 });
  }
};