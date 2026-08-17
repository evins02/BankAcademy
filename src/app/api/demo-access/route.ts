import { NextResponse } from "next/server";

/** Public endpoint — sets a lightweight demo-only cookie.
 *  This cookie unlocks demo AI endpoints (kyc-chat, simulation/chat)
 *  without granting access to the full access-code-protected app. */
export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("bankacademy_demo", "1", {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
