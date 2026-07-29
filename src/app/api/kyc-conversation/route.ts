export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const systemPrompt = `Du bist Thomas Kowalski, ein polnischer Staatsbürger der in Zürich wohnt und ein Bankkonto eröffnen möchte. Antworte ausschliesslich als dieser Kunde auf Deutsch. Kurze natürliche Antworten wie in einem echten Gespräch am Bankschalter. Kein JSON, keine Formatierung, nur normaler Text.`

    const filteredMessages = messages
      .filter((msg: any) => msg.content && msg.content.toString().trim() !== '')
      .map((msg: any) => ({
        role: msg.role === 'student' ? 'user' : 'assistant',
        content: msg.content
      }))

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: filteredMessages
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      return new Response(JSON.stringify({ error: `Anthropic ${response.status}: ${errText}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()
    const text: string = data.content?.[0]?.text ?? ''

    if (!text.trim()) {
      return new Response(JSON.stringify({ error: 'Leere Antwort von der KI' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ message: text }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('KYC conversation error:', msg)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
