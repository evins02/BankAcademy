export async function GET() {
  const pw = process.env.ADMIN_PASSWORD ?? process.env.ADMIN_CODE;
  return Response.json({
    middleware_ok: true,
    env_configured: !!pw,
    env_key_used: process.env.ADMIN_PASSWORD
      ? "ADMIN_PASSWORD"
      : process.env.ADMIN_CODE
      ? "ADMIN_CODE (fallback)"
      : "KEINER – bitte in Vercel setzen",
    env_length: pw?.length ?? 0,
  });
}
