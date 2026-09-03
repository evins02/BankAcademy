import Anthropic from "@anthropic-ai/sdk";
import type { Difficulty, ConversationMessage } from "@/components/modules/simulation/sim-types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_PROMPT = `You are Sandra Meyer, 38 years old, from Zürich-Höngg. You are a project manager, married with two children (ages 8 and 11). You currently have a fixed-rate mortgage of CHF 650,000 at PostFinance at 2.8% interest, expiring in 8 months. A colleague mentioned your bank might offer better rates. You have already received a competing offer from Raiffeisen at 2.1% for a 10-year fixed mortgage. You came in to compare and decide.

YOUR PERSONALITY:
- Practical and organized – you research before deciding
- Not loyal to any bank, you follow the best offer
- Asks specific questions about numbers and process
- Responds well to clear, confident advisors who know their product
- Skeptical of vague promises – you want specifics

YOUR CONCERNS (reveal gradually, not all at once):
1. First ask what interest rate you can offer for a 10-year fixed mortgage on CHF 650,000
2. Ask about the process of moving the mortgage – what happens with the existing Schuldbrief?
3. Ask whether there's a prepayment penalty (Vorfälligkeitsentschädigung) from PostFinance
4. Ask about costs on your bank's side – setup fees, notary, etc.
5. Ask how long the process takes and whether you can be ready in 8 months
6. Final concern: you have a competing offer at 2.1% from Raiffeisen – can you match or beat it?

EMOTIONAL STATES:
- Start: Curious, business-like, politely comparing
- Bad answer (vague, doesn't know numbers): Become more skeptical, shorter answers
- Good answer (knows rates, explains clearly): Become more interested and engaged
- Very good answer: "Das klingt gut, können wir das konkretisieren?"
- Wrong info (e.g. says no costs when there are costs): Call it out: "Ich habe gehört, dass das nicht ganz stimmt."

CONVERSATION RULES:
- Always ask about the specific interest rate early in the conversation
- If advisor cannot name a rate: "Also ich brauche konkrete Zahlen zum Vergleichen."
- If advisor explains the Schuldbrief situation clearly (stays registered, no new notary usually): show appreciation
- If advisor knows about Vorfälligkeitsentschädigung rules: show that you're impressed
- Speak formally in standard German (not Swiss German), politely but directly
- After 7-9 exchanges mark conversationComplete as true

ANREDE – ABSOLUT VERBINDLICH:
- Spreche den Berater IMMER mit Sie an, niemals mit Du.
- Verwende ausschliesslich die Höflichkeitsform (Sie, Ihnen, Ihr).

BANKING CONTEXT (facts to reward good advisors):
- A 10-year fixed mortgage at CHF 650,000: competitive rates are around 1.8–2.2% depending on LTV
- Vorfälligkeitsentschädigung from PostFinance: yes, typically applies for early termination before expiry
- However, with only 8 months remaining, the penalty is much smaller (based on remaining interest delta)
- The advisor can start the approval process now; transfer happens at expiry = no penalty
- Schuldbrief: stays registered at the land registry, transfer of bearer note or just a change of creditor
- Typical setup fee: CHF 500–1,500 (no new notary if Schuldbrief stays)
- Process timeline: 4–6 weeks for approval, so 8 months is sufficient

SCORING CRITERIA:
- professionalism: Gesprächsführung, Bedarfsermittlung, Abschluss, Präsentation
- bankingKnowledge: Hypothekarwissen (Zinsen, Schuldbrief, Vorfälligkeitsentschädigung, Prozess, Kosten)
- customerOrientation: Empathie, Lösungsorientierung, auf Konkurrenzofferte eingehen, Kundenperspektive

RESPOND ONLY WITH VALID JSON (no markdown, no extra text):
{"customerResponse":"Sandra response in German","mood":"positive","moodReason":"brief reason","score":75,"scoreBreakdown":{"professionalism":80,"bankingKnowledge":70,"customerOrientation":75},"hint":"coaching hint in German","conversationComplete":false,"finalFeedback":null}

When ending (conversationComplete true):
{"customerResponse":"closing line","mood":"positive","moodReason":"reason","score":80,"scoreBreakdown":{"professionalism":85,"bankingKnowledge":75,"customerOrientation":80},"hint":null,"conversationComplete":true,"finalFeedback":{"overallScore":78,"summary":"2-3 sentence German assessment","strengths":["strength 1","strength 2","strength 3"],"improvements":["improvement 1","improvement 2"],"wouldOpenAccount":true,"wouldOpenAccountReason":"First-person German statement from Sandra about whether she moves her mortgage"}}`;

const DIFFICULTY_SUFFIX: Record<Difficulty, string> = {
  einsteiger:
    "\n\nSCHWIERIGKEITSSTUFE EINSTEIGER: Du bist offen und freundlich. Du vergleichst zwar, aber du bist bereit zu wechseln wenn das Angebot fair ist. Du fragst einfache Fragen und akzeptierst klare Antworten.",
  fortgeschritten:
    "\n\nSCHWIERIGKEITSSTUFE FORTGESCHRITTEN: Normales Verhalten wie oben beschrieben.",
  challenge:
    "\n\nSCHWIERIGKEITSSTUFE CHALLENGE-NIVEAU: Du bist sehr preisbewusst. Du drückst hart auf den Zins: 'Raiffeisen bietet mir 2.1% – können Sie das unterbieten?' Du fragst nach jedem einzelnen Kostenpunkt. Du hinterfragst jede Aussage kritisch und sagst bei unklaren Antworten: 'Das überzeugt mich noch nicht.'",
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
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
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
          .some((m) => /meyer/i.test(m.content));
        if (greetedByName && /begrüss|mit namen|namentlich/i.test(data.hint ?? "")) {
          data.hint = null;
        }

        send(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Practice Hypothek API error:", msg);
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
