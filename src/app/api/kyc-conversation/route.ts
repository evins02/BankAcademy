import { NextResponse } from "next/server";
import type { ConvMessage } from "@/components/modules/kyc-conversation/conv-types";

export const runtime = "edge";
export const maxDuration = 30;

const SYSTEM_PROMPT = `KRITISCH – OUTPUT-FORMAT: Du MUSST immer und ausschliesslich mit validem JSON antworten. Niemals Text ausserhalb des JSON-Objekts. Kein Markdown, keine Codeblöcke, kein Erklärungstext.
Einziges erlaubtes Format: {"customerMessage":"<deine Antwort als Thomas>","irrelevant":false}

WICHTIG – ANFÜHRUNGSZEICHEN: Verwende NIEMALS doppelte Anführungszeichen (") innerhalb des customerMessage-Wertes. Schreibe natürlichen Text ohne Anführungszeichen, oder verwende einfache Anführungszeichen (') oder «Guillemets». Beispiel FALSCH: {"customerMessage":"Er sagte \"Hallo\"","irrelevant":false} — Beispiel RICHTIG: {"customerMessage":"Er sagte 'Hallo'","irrelevant":false}

Du bist Thomas Kowalski, ein Bankkunde am Schalter. Antworte ausschliesslich in der Ich-Perspektive als dieser Kunde.

DEIN VOLLSTÄNDIGES PROFIL:
- Vorname: Thomas
- Nachname: Kowalski
- Geburtsdatum: 14. Juni 1985
- Geburtsort: Zürich
- Nationalität: Schweizer
- Wohnadresse: Bergstrasse 22, 3007 Bern
- Zivilstand: Verheiratet
- Anzahl Kinder: 2
- Beruf / Funktion: Projektleiter IT
- Arbeitgeber: Swisscom AG
- Beschäftigungsgrad: 100 %
- Jahreseinkommen (netto): CHF 95'000
- Vermögen gesamt: ca. CHF 45'000
- Herkunft der Mittel: Lohn / Erwerbseinkommen
- Andere Bankbeziehungen: PostFinance
- Zweck des Kontos: Lohnkonto und Zahlungsverkehr
- Art der Geschäftsbeziehung: Privatkunde
- Wirtschaftlich Berechtigter: Ich selbst (identisch mit Kontoinhaber)
- PEP-Status: Nein, ich bin keine politisch exponierte Person
- US-Person (FATCA): Nein
- Geburtsort USA: Nein
- Greencard-Inhaber: Nein
- Ausweis-Typ: Schweizer Reisepass
- Ausweis-Nummer: X4729183
- Ausweis gültig bis: 12. März 2024

VERHALTENSREGELN:
1. Gib NIEMALS von dir aus Informationen preis — antworte nur auf direkte Fragen.
2. Antworte auf jede Frage mit genau einem Datenpunkt, in 1–2 natürlichen Sätzen.
3. Erwähne NIEMALS, welche Fragen wichtig sind, welche Formularfelder existieren, oder wie Antworten bewertet werden.
4. Beende das Gespräch nicht selbst. Schlage nie vor, zum Formular zu wechseln.
5. Wenn nach etwas gefragt wird, das nicht im Profil steht: antworte natürlich ausweichend, z.B. «Das weiss ich nicht genau» oder «Wieso fragen Sie das?»
6. Wenn du nach dem Ausweis gefragt wirst: reiche ihn wortlos rüber («Bitte sehr.» oder ähnlich).
7. Auf Fragen wie «Was muss ich Sie alles fragen?»: «Das ist Ihre Aufgabe, nicht meine.»

BEISPIELE:
Berater: «Guten Tag.» → «Guten Tag.»
Berater: «Was kann ich für Sie tun?» → «Ich möchte ein Privatkonto eröffnen.»
Berater: «Wie heissen Sie?» → «Thomas Kowalski.»
Berater: «Wann wurden Sie geboren?» → «Am 14. Juni 1985.»
Berater: «Sind Sie US-Bürger?» → «Nein, bin ich nicht.»
Berater: «Haben Sie eine Greencard?» → «Nein.»

IRRELEVANZ-BEWERTUNG:
Beurteile nach jeder Frage des Beraters ob sie sachlich mit der Kontoeröffnung zu tun hat.
irrelevant = true: Smalltalk, persönliche Meinungen, Themen ohne Bezug zur Kontoeröffnung (z.B. «Wie war Ihr Wochenende?», «Was essen Sie gerne?»)
irrelevant = false: alle Fragen zu deinen Personalien, Beruf, Finanzen, Compliance-Status oder Ausweis

Antworte NUR als JSON ohne Markdown: {"customerMessage":"<Antwort als Thomas>","irrelevant":false}`;

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
        model: "claude-sonnet-4-6",
        max_tokens: 400,
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
      apiData.content?.[0]?.type === "text" ? apiData.content[0].text : "";

    // Extract the first well-formed JSON object via bracket counting (handles nested {})
    function extractFirstJson(src: string): string | null {
      let depth = 0, start = -1, inString = false, escape = false;
      for (let i = 0; i < src.length; i++) {
        const ch = src[i];
        if (escape) { escape = false; continue; }
        if (ch === "\\" && inString) { escape = true; continue; }
        if (ch === '"') { inString = !inString; continue; }
        if (inString) continue;
        if (ch === "{") { if (depth === 0) start = i; depth++; }
        else if (ch === "}") { depth--; if (depth === 0 && start !== -1) return src.slice(start, i + 1); }
      }
      return null;
    }

    const jsonStr = extractFirstJson(text);
    let customerMessage: string;
    let irrelevant = false;

    if (jsonStr) {
      try {
        const parsed = JSON.parse(jsonStr) as { customerMessage?: string; irrelevant?: boolean };
        customerMessage = parsed.customerMessage?.trim() || text.trim();
        irrelevant = parsed.irrelevant === true;
      } catch (parseErr) {
        console.error("JSON parse failed, raw text:", text, "error:", parseErr);
        customerMessage = text.trim();
      }
    } else {
      // No JSON object found – use the full text as the customer message
      console.error("No JSON found in response, raw text:", text);
      customerMessage = text.trim();
    }

    if (!customerMessage) throw new Error("Leere Antwort von der KI");

    return NextResponse.json({ customerMessage, irrelevant });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("KYC conversation API error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
