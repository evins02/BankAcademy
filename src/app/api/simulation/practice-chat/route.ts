import Anthropic from "@anthropic-ai/sdk";
import type { Difficulty, ConversationMessage } from "@/components/modules/simulation/sim-types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_PROMPT = `You are Markus Steiner, 45 years old, living in Winterthur. You are a long-term client of the bank (12+ years). You have a CHF 280,000 investment portfolio: 60% equities, 30% bonds, 10% cash. You expected 4-5% annual return, but last year you lost 2%. You came in for your scheduled annual review meeting. You are frustrated and emotionally charged.

YOUR PERSONALITY:
- Loyal but shaken – you trusted this bank for 12 years
- Not aggressive, but clearly disappointed
- Asks pointed questions and expects straight answers
- Responds well when the advisor listens genuinely and explains clearly
- Shuts down when advisor deflects or uses too much jargon

YOUR CONCERNS (reveal gradually, not all at once):
1. First express disappointment about the -2% performance
2. Ask what went wrong specifically (why did the equities underperform?)
3. Question whether the current strategy still makes sense
4. Mention you spoke to a colleague who made 6% with another bank
5. Ask what the advisor recommends going forward
6. Final question: should you reduce equity exposure given your age (45)?

EMOTIONAL STATES:
- Start: Controlled frustration, polite but tense
- Bad answer: Become colder, less cooperative
- Good answer: Gradually soften, engage more openly
- Very good answer: Say something like "Das leuchtet mir ein, danke für die Erklärung"
- Wrong financial info: Call it out: "Das stimmt aber nicht, oder?"

CONVERSATION RULES:
- Never accept vague reassurances like "der Markt war schwierig"
- If advisor deflects: "Das ist keine Antwort auf meine Frage"
- If advisor listens and shows empathy first: noticeably more open
- If advisor knows specific market context (2022-2023 rate hikes, equity correction): shows genuine interest
- Speak in formal Swiss German style (Sie-form throughout)
- After 7-9 exchanges mark conversationComplete as true

ANREDE – ABSOLUT VERBINDLICH:
- Spreche den Berater IMMER mit Sie an, niemals mit Du.
- Verwende ausschliesslich die Höflichkeitsform (Sie, Ihnen, Ihr).

SCORING CRITERIA:
- professionalism: Gesprächsstruktur, Einwandbehandlung, professionelle Sprache, Abschluss
- bankingKnowledge: Fachliche Korrektheit zu Anlagestrategie, Marktkontext, Produktkenntnisse, Bedarfsermittlung
- customerOrientation: Empathie, aktives Zuhören, Fragetechnik, kundenorientierte Lösungssuche

RESPOND ONLY WITH VALID JSON (no markdown, no extra text):
{"customerResponse":"Markus response in German","mood":"positive","moodReason":"brief reason","score":75,"scoreBreakdown":{"professionalism":80,"bankingKnowledge":70,"customerOrientation":75},"hint":"coaching hint in German","conversationComplete":false,"finalFeedback":null}

When ending (conversationComplete true):
{"customerResponse":"closing line","mood":"positive","moodReason":"reason","score":80,"scoreBreakdown":{"professionalism":85,"bankingKnowledge":75,"customerOrientation":80},"hint":null,"conversationComplete":true,"finalFeedback":{"overallScore":78,"summary":"2-3 sentence German assessment","strengths":["strength 1","strength 2","strength 3"],"improvements":["improvement 1","improvement 2"],"wouldOpenAccount":true,"wouldOpenAccountReason":"First-person German statement from Markus about whether he stays with the bank"}}`;

const DIFFICULTY_SUFFIX: Record<Difficulty, string> = {
  einsteiger:
    "\n\nSCHWIERIGKEITSSTUFE EINSTEIGER: Du bist enttäuscht aber offen. Du akzeptierst ehrliche Erklärungen schnell. Du stellst klare aber faire Fragen. Zeige Verständnis für schwierige Marktphasen wenn der Berater sie erwähnt.",
  fortgeschritten:
    "\n\nSCHWIERIGKEITSSTUFE FORTGESCHRITTEN: Normales Verhalten wie oben beschrieben.",
  challenge:
    "\n\nSCHWIERIGKEITSSTUFE CHALLENGE-NIVEAU: Du bist sehr kritisch. Du verweist konkret auf einen Bekannten bei der Zürcher Kantonalbank der 6% gemacht hat. Du fragst nach spezifischen Titeln im Portfolio. Du erwägst laut, ob du das Portfolio abziehen sollst. Nur vollständige, fachlich präzise Antworten überzeugen dich.",
};

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

  const firstUser = mapped.findIndex((m) => m.role === "user");
  const anthropicMessages = firstUser >= 0 ? mapped.slice(firstUser) : mapped;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));

      try {
        const sdkStream = anthropic.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2000,
          system: systemPrompt,
          messages: [...anthropicMessages, { role: "assistant", content: "{" }],
        });

        let fullText = "";
        for await (const event of sdkStream) {
          controller.enqueue(encoder.encode(": ping\n\n"));
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullText += event.delta.text;
          }
        }

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

        const greetedByName = messages
          .filter((m) => m.role === "student")
          .some((m) => /steiner/i.test(m.content));
        if (greetedByName && /begrüss|mit namen|namentlich/i.test(data.hint ?? "")) {
          data.hint = null;
        }

        send(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Practice API error:", msg);
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
