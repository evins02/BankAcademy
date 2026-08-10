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
          'Du bist Thomas Kowalski, ein polnischer Staatsbürger wohnhaft in Zürich. Du möchtest ein Bankkonto eröffnen. Antworte nur als dieser Kunde auf Deutsch. Kurze natürliche Sätze wie in einem echten Gespräch. Kein JSON, keine Listen, nur normaler Text. WICHTIG: Spreche den Berater IMMER mit Sie an, niemals mit Du. Das Duzen ist strengstens verboten. Verwende ausschliesslich die Höflichkeitsform (Sie, Ihnen, Ihr).',
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
