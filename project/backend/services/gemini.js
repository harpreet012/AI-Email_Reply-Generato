import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
export const isConfigured = Boolean(API_KEY);

const ai = isConfigured ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const TONES = ["Professional", "Formal", "Friendly", "Concise", "Persuasive"];

function buildPrompt(email, tone, includeSubject) {
  return `
You are an expert email assistant. Write a reply to the email below.

Tone: ${tone}
${includeSubject ? "Also propose a short, relevant subject line." : ""}

Respond in strict JSON with this exact shape and nothing else, no markdown fences:
{
  "subject": ${includeSubject ? '"the proposed subject line"' : '""'},
  "reply": "the full email reply, written in the requested tone"
}

Original email:
"""
${email}
"""
`.trim();
}

export async function generateReply(email, tone = "Professional", includeSubject = false) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const safeTone = TONES.includes(tone) ? tone : "Professional";
  const prompt = buildPrompt(email, safeTone, includeSubject);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const raw = (response.text || "").trim();
  const cleaned = raw.replace(/^```json\s*|```$/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    return {
      reply: parsed.reply?.trim() || raw,
      subject: parsed.subject?.trim() || "",
    };
  } catch {
    return { reply: raw, subject: "" };
  }
}