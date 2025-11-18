import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

export const aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || undefined,
});

// helper to call model and normalize result
export async function callGemini(prompt, options = {}) {
    console.log(process.env.GEMINI_API_KEY);
    
    const model = options.model || "gemini-2.5-flash";
    const contents = Array.isArray(prompt) ? prompt : [String(prompt)];
    const res = await aiClient.models.generateContent({
        model,
        contents,
    });
    // res structure: candidates[0].content.parts[...] — simplify to text join
    try {
        const cand = res?.candidates?.[0];
        if (!cand) return JSON.stringify(res);
        const parts = cand.content?.parts ?? [];
        const text = parts.map((p) => p.text ?? "").join("\n");
        return text.trim();
    } catch (e) {
        return typeof res === "string" ? res : JSON.stringify(res);
    }
}
