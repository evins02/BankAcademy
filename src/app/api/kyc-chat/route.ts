export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const cleanMessages = messages.filter((m: any) =>
    m.role && m.content && m.content.trim() !== ''
  )

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 250,
      system: 'Du bist Thomas Kowalski, ein polnischer Staatsbürger wohnhaft in Zürich. Du möchtest ein Bankkonto eröffnen. Antworte nur als dieser Kunde auf Deutsch. Kurze natürliche Sätze wie in einem echten Gespräch. Kein JSON, keine Listen, nur normaler Text.',
      messages: cleanMessages
    })
  })

  const data = await res.json()
  const text = data.content[0].text

  return new Response(JSON.stringify({ message: text }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
