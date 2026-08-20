import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_progress (
      clerk_user_id TEXT PRIMARY KEY,
      progress_data JSONB NOT NULL DEFAULT '{}',
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await ensureTable();
    const rows = await sql`
      SELECT progress_data FROM user_progress WHERE clerk_user_id = ${userId}
    `;
    return NextResponse.json({ data: rows[0]?.progress_data ?? null });
  } catch (err) {
    console.error("[user-progress GET]", err);
    return NextResponse.json({ data: null, warn: "db_error" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { data } = await req.json();

    await ensureTable();
    await sql`
      INSERT INTO user_progress (clerk_user_id, progress_data, updated_at)
      VALUES (${userId}, ${JSON.stringify(data)}, NOW())
      ON CONFLICT (clerk_user_id) DO UPDATE
        SET progress_data = ${JSON.stringify(data)},
            updated_at    = NOW()
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[user-progress POST]", err);
    return NextResponse.json({ success: true, warn: "db_error" });
  }
}
