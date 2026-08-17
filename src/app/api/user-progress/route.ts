import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_progress (
      email         TEXT PRIMARY KEY,
      progress_data JSONB NOT NULL DEFAULT '{}',
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

function getSessionEmail(req: NextRequest): string | null {
  const header = req.headers.get("X-Demo-Session");
  if (!header) return null;
  try {
    return (JSON.parse(header) as { email?: string }).email?.trim().toLowerCase() ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }

    const sessionEmail = getSessionEmail(req);
    if (!sessionEmail || sessionEmail !== email) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await ensureTable();
    const rows = await sql`
      SELECT progress_data FROM user_progress WHERE email = ${email}
    `;
    return NextResponse.json({ data: rows[0]?.progress_data ?? null });
  } catch (err) {
    console.error("[user-progress GET]", err);
    return NextResponse.json({ data: null, warn: "db_error" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, data } = await req.json();
    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail) {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }

    const sessionEmail = getSessionEmail(req);
    if (!sessionEmail || sessionEmail !== cleanEmail) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await ensureTable();
    await sql`
      INSERT INTO user_progress (email, progress_data, updated_at)
      VALUES (${cleanEmail}, ${JSON.stringify(data)}, NOW())
      ON CONFLICT (email) DO UPDATE
        SET progress_data = ${JSON.stringify(data)},
            updated_at    = NOW()
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[user-progress POST]", err);
    // DB errors never block the user
    return NextResponse.json({ success: true, warn: "db_error" });
  }
}
