// ENV vars:
//   BERUFSBILDNER_CODES=BB-RAIFFEISEN2026:Raiffeisen Wallis,BB-WKB2026:Walliser Kantonalbank

import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIp } from "@/lib/rateLimit";

/**
 * Resolve a Berufsbildner code to its bank name.
 * Returns null if the code is not found.
 */
export function resolveBBCode(inputCode: string): string | null {
  const raw = process.env.BERUFSBILDNER_CODES ?? "";
  if (!raw) return null;
  for (const entry of raw.split(",")) {
    const [code, ...nameParts] = entry.trim().split(":");
    if (code.trim() === inputCode.trim()) return nameParts.join(":").trim();
  }
  return null;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`bb-auth:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ valid: false, error: "Zu viele Versuche." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code.trim() : "";
  const bank = resolveBBCode(code);

  if (!bank) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true, bank, token: code });
}
