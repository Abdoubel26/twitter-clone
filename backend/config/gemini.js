import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
dotenv.config()

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function callGemini(prompt) {
  try {
    const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  return response
  } catch(e) {
    console.log(e.message + 'error in gemini.js')
    return e
  }
}
