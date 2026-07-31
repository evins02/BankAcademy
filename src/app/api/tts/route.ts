export const runtime = "edge";
export const maxDuration = 20;

export async function POST(req: Request) {
  const { text } = (await req.json()) as { text: string };
  if (!text?.trim()) return new Response("Missing text", { status: 400 });

  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "tts-1-hd",
      voice: "echo",       // warm male voice, suits a 28-year-old Swiss-German customer
      input: text.slice(0, 4096),
      speed: 0.95,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(err, { status: res.status });
  }

  return new Response(res.body, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
