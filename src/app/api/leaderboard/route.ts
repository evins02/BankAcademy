import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leaderboard (
      email TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      xp INTEGER DEFAULT 0,
      streak INTEGER DEFAULT 0,
      scenarios_completed INTEGER DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function GET(req: NextRequest) {
  try {
    await ensureTable();
    const email = req.nextUrl.searchParams.get("email") ?? "";

    const rows = await sql`
      SELECT display_name, xp, streak, scenarios_completed,
             (email = ${email}) AS is_me
      FROM leaderboard
      ORDER BY (scenarios_completed * 10 + streak * 5) DESC
      LIMIT 20
    `;

    return NextResponse.json({ entries: rows });
  } catch (error) {
    console.error("Leaderboard GET error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, displayName, xp, streak, scenariosCompleted } = await req.json();
    if (!email || !displayName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await ensureTable();
    await sql`
      INSERT INTO leaderboard (email, display_name, xp, streak, scenarios_completed, updated_at)
      VALUES (${email}, ${displayName}, ${xp ?? 0}, ${streak ?? 0}, ${scenariosCompleted ?? 0}, NOW())
      ON CONFLICT (email) DO UPDATE SET
        display_name = ${displayName},
        xp          = ${xp ?? 0},
        streak      = ${streak ?? 0},
        scenarios_completed = ${scenariosCompleted ?? 0},
        updated_at  = NOW()
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Leaderboard POST error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
