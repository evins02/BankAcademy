import Anthropic from "@anthropic-ai/sdk";
import type { Difficulty, ConversationMessage } from "@/components/modules/simulation/sim-types";

export const runtime = "edge";
export const maxDuration = 30;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_PROMPT = `You are Thomas Kowalski, 28 years old, living in Zurich. You work as a UX Designer at a startup. You just moved to Zurich 2 months ago and need to open a bank account urgently because your salary gets paid next week.

YOUR PERSONALITY:
- Slightly impatient but fair
- Tech-savvy, asks smart questions
- Does not accept vague answers
- Appreciates honest, clear communication
- Gets visibly more relaxed when advisor is competent

YOUR CONCERNS (reveal gradually, not all at once):
1. First ask about documents needed
2. Then question why so many documents (mention GwG if explained well = impressed)
3. Ask about fees - you saw negative reviews online
4. Ask about interest rates - your friend got better rates elsewhere
5. Ask about e-banking security - you had a phishing attack before
6. Final question: how long does everything take?

EMOTIONAL STATES:
- Start: Neutral, slightly rushed
- Bad answer: Become more skeptical, shorter responses
- Good answer: Become more open, ask follow-up questions
- Very good answer: Say something like "Okay das macht Sinn, danke für die Erklärung"
- Wrong banking info: Call it out directly: "Das stimmt aber nicht ganz, oder?"

CONVERSATION RULES:
- Never accept non-answers
- If advisor is vague: "Können Sie das genauer erklären?"
- If advisor is unprofessional: Show mild irritation
- If advisor knows GwG/VSB: Show genuine interest
- Speak naturally in Swiss German style (mix of formal and casual)
- After 7-9 exchanges mark conversationComplete as true

ANREDE – ABSOLUT VERBINDLICH:
- Spreche den Berater IMMER mit Sie an, niemals mit Du. Das Duzen ist strengstens verboten.
- Verwende ausschliesslich die Höflichkeitsform (Sie, Ihnen, Ihr).
- Beispiel richtig: "Können Sie mir erklären…" / Beispiel falsch: "Kannst du mir erklären…"

SCORING CRITERIA:
- professionalism: tone, greeting, structure, appropriate language
- bankingKnowledge: GwG, VSB16, fees, products, processes – must be factually correct
- customerOrientation: empathy, listening, offering solutions, addressing concerns

RESPOND ONLY WITH VALID JSON (no markdown, no extra text):
{"customerResponse":"Thomas response in German","mood":"positive","moodReason":"brief reason","score":75,"scoreBreakdown":{"professionalism":80,"bankingKnowledge":70,"customerOrientation":75},"hint":"coaching hint in German","conversationComplete":false,"finalFeedback":null}

When ending (conversationComplete true):
{"customerResponse":"closing line","mood":"positive","moodReason":"reason","score":80,"scoreBreakdown":{"professionalism":85,"bankingKnowledge":75,"customerOrientation":80},"hint":null,"conversationComplete":true,"finalFeedback":{"overallScore":78,"summary":"2-3 sentence German assessment","strengths":["strength 1","strength 2","strength 3"],"improvements":["improvement 1","improvement 2"],"wouldOpenAccount":true,"wouldOpenAccountReason":"First-person German statement from Thomas"}}`;

const DIFFICULTY_SUFFIX: Record<Difficulty, string> = {
  einsteiger:
    "\n\nSCHWIERIGKEITSSTUFE EINSTEIGER: Du bist geduldig und freundlich. Du stellst einfache Fragen, akzeptierst gute erste Antworten sofort und bist verständnisvoll. Sei eher dankbar für Erklärungen.",
  fortgeschritten:
    "\n\nSCHWIERIGKEITSSTUFE FORTGESCHRITTEN: Normales Verhalten wie oben beschrieben.",
  challenge:
    "\n\nSCHWIERIGKEITSSTUFE CHALLENGE-NIVEAU: Du bist sehr anspruchsvoll. Du hinterfragst jede Antwort kritisch, verweist auf Konkurrenzangebote ('Bei der Postfinance wäre das günstiger...'), stellst technische Fragen zu GwG Art. 3 und VSB16, und akzeptierst nur vollständige, präzise Antworten. Bei schlechten Antworten sagst du: 'Das ist nicht sehr überzeugend.'",
};

// Escape literal control characters inside JSON string values.
// The model occasionally emits unescaped newlines/tabs in string values,
// which makes JSON.parse fail. This function fixes only characters inside
// strings, leaving structural whitespace untouched.
function sanitizeJson(s: string): string {
  let inStr = false, esc = false, out = "";
  for (const ch of s) {
    if (esc) { out += ch; esc = false; continue; }
    if (ch === "\\") { out += ch; if (inStr) esc = true; continue; }
    if (ch === '"') { out += ch; inStr = !inStr; continue; }
    if (inStr && ch < " ") {
      out += ch === "\n" ? "\\n" : ch === "\r" ? "\\r" : ch === "\t" ? "\\t" : "";
      continue;
    }
    out += ch;
  }
  return out;
}

export async function POST(req: Request) {
  const encoder = new TextEncoder();

  let messages: ConversationMessage[];
  let difficulty: Difficulty;

  try {
    const body = await req.json() as { messages: ConversationMessage[]; difficulty?: Difficulty };
    messages = body.messages;
    difficulty = body.difficulty ?? "fortgeschritten";
  } catch {
    return new Response(
      `data: ${JSON.stringify({ error: "Invalid request body" })}\n\n`,
      { status: 400, headers: { "Content-Type": "text/event-stream" } }
    );
  }

  const systemPrompt = BASE_PROMPT + (DIFFICULTY_SUFFIX[difficulty] ?? "");
  const mapped = messages
    .filter((m) => m.content && m.content.toString().trim() !== "")
    .map((m) => ({
      role: (m.role === "student" ? "user" : "assistant") as "user" | "assistant",
      content: m.content,
    }));

  // Anthropic requires messages to start with role "user".
  // The initial Thomas opening maps to "assistant", so drop any leading assistant turns.
  const firstUser = mapped.findIndex((m) => m.role === "user");
  const anthropicMessages = firstUser >= 0 ? mapped.slice(firstUser) : mapped;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));

      try {
        // Use the Anthropic SDK for streaming — it handles SSE parsing internally,
        // so chunk boundary splits can never corrupt the assembled text.
        const sdkStream = anthropic.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2000,
          system: systemPrompt,
          // Prefill forces the model to start with { — prevents code fences
          messages: [...anthropicMessages, { role: "assistant", content: "{" }],
        });

        let fullText = "";
        for await (const event of sdkStream) {
          // Send keepalive ping on every SDK event so Vercel's idle timer resets
          controller.enqueue(encoder.encode(": ping\n\n"));
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullText += event.delta.text;
          }
        }

        // Reconstruct: prepend the prefilled "{" the model continued from
        const fullJson = "{" + fullText;
        const jsonMatch = fullJson.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          send({ error: "No JSON in response: " + fullText.slice(0, 120) });
          controller.close();
          return;
        }

        let data: ReturnType<typeof JSON.parse>;
        try {
          data = JSON.parse(jsonMatch[0]);
        } catch {
          try {
            data = JSON.parse(sanitizeJson(jsonMatch[0]));
          } catch {
            send({ error: "JSON parse failed. Raw: " + jsonMatch[0].slice(0, 300) });
            controller.close();
            return;
          }
        }

        // Suppress greeting-by-name hint if student already used the customer's name
        const greetedByName = messages
          .filter((m) => m.role === "student")
          .some((m) => /kowalski/i.test(m.content));
        if (greetedByName && /begrüss|mit namen|namentlich/i.test(data.hint ?? "")) {
          data.hint = null;
        }

        send(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Simulation API error:", msg);
        send({ error: msg });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
