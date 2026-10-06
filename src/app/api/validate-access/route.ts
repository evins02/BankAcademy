import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { rateLimit, getIp } from "@/lib/rateLimit";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 365,
  path: "/",
};

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`validate-access:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json(
      { valid: false, error: "Zu viele Versuche. Bitte 15 Minuten warten." },
      { status: 429 }
    );
  }

  const { code } = await req.json();
  const secret = process.env.ACCESS_CODE;
  if (!secret) {
    return NextResponse.json({ valid: false, error: "Konfigurationsfehler" }, { status: 500 });
  }

  const valid = typeof code === "string" && code.trim() === secret;
  if (!valid) {
    return NextResponse.json({ valid: false });
  }

  // Set Clerk publicMetadata.approved on the current user (if logged in)
  try {
    const { userId } = await auth();
    if (userId) {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { approved: true },
      });
    }
  } catch {
    // Non-fatal: metadata update failed, cookie fallback still works
  }

  const res = NextResponse.json({ valid: true });
  res.cookies.set("bankacademy_access", "1", COOKIE_OPTIONS);
  return res;
}
