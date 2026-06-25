import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const secret = process.env.ACCESS_CODE;
  if (!secret) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
  const valid = typeof code === "string" && code === secret;
  return NextResponse.json({ valid });
}
