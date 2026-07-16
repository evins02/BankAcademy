import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: "/",
};

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const secret = process.env.ACCESS_CODE;
  if (!secret) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }

  const valid = typeof code === "string" && code === secret;
  const res = NextResponse.json({ valid });

  if (valid) {
    res.cookies.set("bankacademy_access", "1", COOKIE_OPTIONS);
  }

  return res;
}
