import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  const code = req.headers.get("x-admin-code");
  if (!code || code !== process.env.ACCESS_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await sql`
    SELECT id, vorname, nachname, email, opt_in, created_at
    FROM registrations
    ORDER BY created_at DESC
  `;

  return NextResponse.json({ registrations: rows });
}
