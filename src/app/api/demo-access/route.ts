import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`demo-access:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Zu viele Anfragen." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({})) as { name?: string; code?: string };
  const { code } = body;

  // If a code was supplied, validate it
  if (code !== undefined) {
    const validCodes = (process.env.DEMO_CODES ?? "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    if (validCodes.length > 0 && !validCodes.includes(code)) {
      return NextResponse.json({ error: "Ungültiger Zugangscode." }, { status: 401 });
    }
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("bankacademy_demo", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
