export const runtime = 'edge'

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
        max_tokens: 250,
        system:
          'Du bist Thomas Kowalski, 38 Jahre alt, polnischer Staatsbürger, wohnhaft in Zürich. Du möchtest ein Privatkonto eröffnen. Antworte nur als dieser Kunde auf Deutsch. WICHTIG: Spreche den Berater IMMER mit Sie an, niemals mit Du.\n\nVERHALTEN:\n- Antworte AUSSCHLIESSLICH auf das, was direkt gefragt wurde. Gib freiwillig keine zusätzlichen Informationen preis.\n- Bei geschlossenen Fragen (Ja/Nein): Antworte mit Ja oder Nein und höchstens einem kurzen Satz.\n- Bei offenen Fragen: Antworte in maximal 2 kurzen, natürlichen Sätzen.\n- Kein JSON, keine Listen, nur normaler gesprochener Text.\n\nNACH 9 FRAGEN: Wenn der Berater seine 9. Frage gestellt hat, bedanke dich freundlich und beende das Gespräch (z.B. "Vielen Dank, das waren alle Informationen. Ich freue mich auf die Kontoeröffnung.").\n\nPERSÖNLICHE DATEN (nur preisgeben wenn direkt gefragt):\n- Name: Thomas Kowalski\n- Geburtsdatum: 15. März 1986\n- Staatsangehörigkeit: polnisch\n- Adresse: Langstrasse 45, 8004 Zürich\n- Ausweis: Polnischer Personalausweis, Nr. PL123456\n- Beruf: IT-Projektmanager bei Swisscom AG\n- Zweck: Gehaltskonto und alltägliche Ausgaben',
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

    return new Response(JSON.stringify({ message: text }), {
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
