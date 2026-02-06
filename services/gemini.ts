"use server"

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateAIWish = async (vibe: string, target: string, language: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: Chinese New Year 2026, the Year of the Fire Horse. 
      Task: Write a trendy 1-2 sentence Instagram caption style greeting.
      
      Vibe: ${vibe}
      Target: ${target}
      Language: ${language}
      
      Instructions:
      1. Length: Aim for 15-25 words. Do not give a 1-word response.
      2. If Language is "Medanese Hokkien": Use a heavy mix of Medanese Hokkien slang (e.g., 'Cincai', 'Huat', 'Bo Jio', 'Kiam Siap'), Indonesian (Bahasa Gaul), and English. It should sound like a Gen Z person from Medan.
      3. Content: Focus on the energy of the "Fire Horse"—fast, bold, and lucky.
      4. Style: Use line breaks for readability and include 2-3 colorful emojis.
      
      Example of desired length: "Happy Year of the Fire Horse! 🐎🔥 May your energy stay high and your wallet stay thick all through 2026. Let's get this bread! 🧧✨"`,
      config: {
        temperature: 1.0,
        topP: 0.95,
      },
    });

    return response.text || "Huat Ah! May your 2026 be legendary!";
  } catch (error) {
		console.error(error)
    return "Wishing you a prosperous Year of the Horse! 🐎🧧";
  }
};
