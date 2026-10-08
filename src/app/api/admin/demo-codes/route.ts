import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const adminPassword =
    process.env.ADMIN_PASSWORD ?? process.env.ADMIN_CODE ?? "";
  const supplied = req.headers.get("x-admin-code") ?? "";

  if (!adminPassword || supplied !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const codes = (process.env.DEMO_CODES ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  return NextResponse.json({ codes });
}
