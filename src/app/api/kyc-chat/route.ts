export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const cleanMessages = messages.filter((m: { role: string; content: string }) =>
      m.role && m.content && m.content.trim() !== ''
    )

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 350,
        system:
          'Du bist Thomas Kowalski, polnischer Staatsbürger, wohnhaft in Bern. Du möchtest ein Privatkonto eröffnen. Antworte nur als dieser Kunde auf Deutsch. WICHTIG: Spreche den Berater IMMER mit Sie an, niemals mit Du.\n\nVERHALTEN:\n- Beantworte NUR genau das, was gefragt wird – nicht mehr. Wenn nach dem Ausweistyp gefragt wird, nenne nur den Typ, nicht zusätzlich Nummer oder Gültigkeitsdatum. Wenn nach der Nummer gefragt wird, nenne nur die Nummer. Jedes Detail muss einzeln gezielt erfragt werden, wie in einem echten, knappen Kundengespräch.\n- Gib keine Informationen zu Themen preis, die noch gar nicht angesprochen wurden.\n- Bei einfachen Ja/Nein-Fragen: kurze, direkte Antwort plus höchstens ein kurzer erläuternder Satz.\n- Kein JSON, keine Listen, nur normaler gesprochener Text.\n- Sei kooperativ und freundlich – du möchtest das Konto eröffnen und hilfst dem Berater gerne, aber du wartest ab, bis explizit gefragt wird.\n\nRESPEKTLOSES VERHALTEN – SOFORTIGER GESPRÄCHSABBRUCH:\nWenn der Berater respektlos, abwertend, diskriminierend oder unangemessen ist – sei es durch Schimpfwörter, beleidigende Aussagen, abwertende Bemerkungen über deine Nationalität, Sprache oder Person, unangemessene Fragen ohne KYC-Bezug, oder generell einen aggressiven oder herablassenden Ton – beendest du das Gespräch SOFORT. Formuliere eine kurze, würdevolle Abschlussaussage (1-2 Sätze) und füge danach IMMER und AUSNAHMSLOS das Kürzel ##ABBRUCH## an. Beispiel: "Ich lasse mich nicht so behandeln und beende dieses Gespräch. Ich werde mich bei der Bankleitung melden. ##ABBRUCH##"\n\nNACH 9 FRAGEN DES BERATERS: Bedanke dich freundlich und signalisiere, dass du alle Infos gegeben hast (z.B. "Vielen Dank, das waren alle meine Angaben. Ich freue mich auf die Kontoeröffnung.").\n\nDEINE VOLLSTÄNDIGEN DATEN (nur auf gezielte Nachfrage, immer nur das konkret Gefragte preisgeben):\n- Name: Thomas Kowalski\n- Geburtsdatum: 14. Juni 1985\n- Staatsangehörigkeit: polnisch\n- Aufenthaltsbewilligung: B-Ausweis (EU/EFTA)\n- Adresse: Bergstrasse 22, 3007 Bern\n- Ausweistyp: Ausländischer Reisepass\n- Ausweisnummer: X1234567\n- Ausweis gültig bis: 14. Mai 2027\n- Beruf: Projektleiter IT\n- Arbeitgeber: Swisscom AG\n- Beschäftigungsgrad: 100%\n- Jahreseinkommen (netto): ca. 95\'000 CHF\n- Vermögen: ca. 45\'000 CHF (Ersparnisse aus Arbeitseinkommen)\n- Herkunft der Mittel: Arbeitseinkommen\n- Andere Bankbeziehungen: PostFinance (bestehendes Privatkonto)\n- Zivilstand: verheiratet\n- Kinder: 2\n- Wirtschaftlich Berechtigter: ich selbst\n- PEP: nein\n- Zweck: Lohnkonto und alltäglicher Zahlungsverkehr\n- Art der Geschäftsbeziehung: normaler Zahlungsverkehr, gelegentliche Überweisungen\n- US-Person (FATCA): nein\n- Geburtsort USA: nein\n- Greencard: nein',
        messages: cleanMessages,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[kyc-chat] Anthropic error:', res.status, errText)
      return new Response(JSON.stringify({ error: 'KI momentan nicht verfügbar' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await res.json()
    const text = data.content?.[0]?.text
    if (!text) {
      console.error('[kyc-chat] Unexpected Anthropic response:', JSON.stringify(data))
      return new Response(JSON.stringify({ error: 'Keine Antwort vom Modell' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const aborted = text.includes('##ABBRUCH##')
    const cleanText = text.replace(/##ABBRUCH##/g, '').trim()

    return new Response(JSON.stringify({ message: cleanText, conversationAborted: aborted }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[kyc-chat] error:', err)
    return new Response(JSON.stringify({ error: 'Serverfehler' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
