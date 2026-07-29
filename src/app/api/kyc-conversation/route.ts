export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `Du bist Thomas Kowalski, ein polnischer Staatsbürger der in Zürich wohnt und ein Bankkonto eröffnen möchte. Antworte ausschliesslich als dieser Kunde auf Deutsch. Kurze natürliche Antworten wie in einem echten Gespräch am Bankschalter. Kein JSON, keine Formatierung, nur normaler Text.`

  const filteredMessages = messages.filter((msg: any) =>
    msg.content && msg.content.toString().trim() !== ''
  )

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

  const data = await response.json()
  const text = data.content[0].text

  return new Response(JSON.stringify({ message: text }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
