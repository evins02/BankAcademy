import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS community_cases (
      id           TEXT PRIMARY KEY,
      clerk_user_id TEXT NOT NULL,
      titel        TEXT NOT NULL,
      bereich      TEXT NOT NULL,
      beschreibung TEXT NOT NULL,
      herausforderung TEXT NOT NULL,
      gelernt      TEXT NOT NULL,
      likes        INT  NOT NULL DEFAULT 0,
      comments     JSONB NOT NULL DEFAULT '[]',
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    await ensureTable();
    const rows = await sql`
      SELECT id, titel, bereich, beschreibung, herausforderung, gelernt,
             likes, comments, created_at
      FROM community_cases
      WHERE clerk_user_id = ${userId}
      ORDER BY created_at ASC
    `;
    const cases = rows.map((r) => ({
      id: r.id as string,
      titel: r.titel as string,
      bereich: r.bereich as string,
      beschreibung: r.beschreibung as string,
      herausforderung: r.herausforderung as string,
      gelernt: r.gelernt as string,
      likes: r.likes as number,
      comments: r.comments as string[],
      timestamp: r.created_at as string,
    }));
    return NextResponse.json({ cases });
  } catch (err) {
    console.error("[community-cases GET]", err);
    return NextResponse.json({ cases: [] });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, titel, bereich, beschreibung, herausforderung, gelernt, likes, comments, timestamp } = body;

    await ensureTable();
    await sql`
      INSERT INTO community_cases
        (id, clerk_user_id, titel, bereich, beschreibung, herausforderung, gelernt, likes, comments, created_at)
      VALUES
        (${id}, ${userId}, ${titel}, ${bereich}, ${beschreibung}, ${herausforderung}, ${gelernt},
         ${likes ?? 0}, ${JSON.stringify(comments ?? [])}, ${timestamp ?? new Date().toISOString()})
      ON CONFLICT (id) DO NOTHING
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[community-cases POST]", err);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const { id, likes, comments } = await req.json();

    await ensureTable();
    if (typeof likes === "number") {
      await sql`
        UPDATE community_cases SET likes = ${likes}
        WHERE id = ${id} AND clerk_user_id = ${userId}
      `;
    }
    if (Array.isArray(comments)) {
      await sql`
        UPDATE community_cases SET comments = ${JSON.stringify(comments)}
        WHERE id = ${id} AND clerk_user_id = ${userId}
      `;
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[community-cases PATCH]", err);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}
