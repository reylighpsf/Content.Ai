import { GoogleGenAI } from "@google/genai";

export const runtime = "edge";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt, imageBase64, mimeType } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    // ✅ SYSTEM PROMPT DIGABUNG KE USER
    type Part =
      | { text: string }
      | { inlineData: { mimeType: string; data: string } };

    const parts: Part[] = [
      {
        text: `
Kamu adalah seorang CONTENT CREATOR profesional.

Aturan:
- Buat konten siap publish
- Gunakan bahasa Indonesia yang natural & engaging
- Fokus hook di kalimat awal
- Jika caption Instagram: singkat, emosional, ada CTA

Tugas:
${prompt}
        `,
      },
    ];

    // ✅ JIKA ADA GAMBAR
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: imageBase64,
        },
      });
    }

    const stream = await genAI.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts,
        },
      ],
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const rawChunk of stream as AsyncIterable<unknown>) {
            const chunk = rawChunk as { text?: string | (() => string) };
            const text =
              typeof chunk.text === "function"
                ? chunk.text()
                : chunk.text;

            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          console.error("Streaming error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return new Response("Failed to generate content", { status: 500 });
  }
}
