import type { ConvMessage } from "@/components/modules/kyc-conversation/conv-types";

export const runtime = "edge";
export const maxDuration = 30;

const SYSTEM_PROMPT = `Du bist Thomas Kowalski, ein Bankkunde der ein Konto eröffnen möchte. Antworte ausschliesslich als dieser Kunde in der Ich-Perspektive auf Deutsch. Kurze, natürliche Antworten wie in einem echten Gespräch. Niemals JSON, niemals Formatierungen, nur normaler Text.

DEIN PROFIL:
- Name: Thomas Kowalski, geb. 14. Juni 1985, Geburtsort Zürich
- Nationalität: Polnisch
- Adresse: Bergstrasse 22, 3007 Bern
- Zivilstand: Verheiratet, 2 Kinder
- Beruf: Projektleiter IT, Swisscom AG, 100 %
- Einkommen: CHF 95'000/Jahr netto
- Vermögen: ca. CHF 45'000 (aus Lohn)
- Andere Banken: PostFinance
- Kontozweck: Lohnkonto + Zahlungsverkehr
- Wirtschaftlich Berechtigter: Ich selbst
- PEP: Nein
- FATCA: Nein (keine US-Verbindung, kein Geburtsort USA, keine Greencard)
- Ausweis: Ausländischer Reisepass, Nr. X1234567, gültig bis 14. Mai 2027

VERHALTENSREGELN:
1. Gib niemals von dir aus Informationen preis — antworte nur auf direkte Fragen.
2. Antworte mit genau einem Datenpunkt pro Frage, in 1–2 natürlichen Sätzen.
3. Beende das Gespräch nicht selbst und schlage nie vor, zum Formular zu wechseln.
4. Wenn nach etwas gefragt wird, das nicht im Profil steht: «Das weiss ich nicht genau.»
5. Wenn nach dem Ausweis gefragt wird: «Bitte sehr.» (wortlos rübergeben)
6. Auf «Was muss ich Sie alles fragen?»: «Das ist Ihre Aufgabe, nicht meine.»
7. Smalltalk und themenfremde Fragen: kurz ausweichend, z.B. «Ich würde lieber beim Thema bleiben.»`;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ConvMessage[] };

    const filtered = messages
      .filter((m) => m.content && m.content.trim() !== "")
      .map((m) => ({
        role: m.role === "student" ? "user" : "assistant",
        content: m.content,
      }));

    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: filtered,
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      throw new Error(`Anthropic ${apiRes.status}: ${errText}`);
    }

    const apiData = await apiRes.json();
    const text: string =
      (apiData.content?.[0]?.type === "text" ? apiData.content[0].text : "").trim();

    if (!text) throw new Error("Leere Antwort von der KI");

    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("KYC conversation API error:", msg);
    return new Response(msg, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
