import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, apiKey } = body;

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });

    if (action === "describe-image") {
      const { image } = body;
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an accessibility assistant that describes educational images and diagrams in detail for visually impaired students. Describe the visual elements, spatial relationships, data presented, and educational significance. Use clear, structured formatting with headers and bullet points.",
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${image}` },
              },
              {
                type: "text",
                text: "Please describe this educational image in detail for a visually impaired student. Include all visual elements, their relationships, and the educational content being conveyed.",
              },
            ],
          },
        ],
        max_tokens: 1000,
      });

      return NextResponse.json({
        result: response.choices[0].message.content,
      });
    }

    if (action === "adhd-summary") {
      const { text } = body;
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an educational assistant helping students with ADHD. Create concise, well-structured summaries with: ## Key Points (3-5 bullets with bold key terms), ## Quick Summary (numbered steps), ## Why It Matters (brief relevance), ## Key Terms (table with Term and Definition columns). Use bold for important terms. Keep sentences short and clear.",
          },
          {
            role: "user",
            content: `Summarize this educational text for a student with ADHD. Make it scannable and highlight the most important information:\n\n${text}`,
          },
        ],
        max_tokens: 1000,
      });

      return NextResponse.json({
        result: response.choices[0].message.content,
      });
    }

    if (action === "lecture-summary") {
      const { text } = body;
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an educational assistant that creates structured summaries of lecture transcripts. Include: ## Lecture Summary with title, ## Key Topics Covered (bullets), ## Important Concepts (numbered), ## Action Items (bullets). Be concise but comprehensive.",
          },
          {
            role: "user",
            content: `Create a structured summary of this lecture transcript:\n\n${text}`,
          },
        ],
        max_tokens: 1000,
      });

      return NextResponse.json({
        result: response.choices[0].message.content,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
