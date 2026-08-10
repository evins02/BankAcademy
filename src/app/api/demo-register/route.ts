import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS pilot_users (
      id         SERIAL PRIMARY KEY,
      vorname    TEXT NOT NULL,
      email      TEXT UNIQUE NOT NULL,
      opt_in     BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function POST(req: NextRequest) {
  try {
    const { vorname, email, optIn } = await req.json();

    if (!vorname?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) {
      return NextResponse.json({ error: "Ungültige E-Mail" }, { status: 400 });
    }

    await ensureTable();

    await sql`
      INSERT INTO pilot_users (vorname, email, opt_in)
      VALUES (${vorname.trim()}, ${email.trim().toLowerCase()}, ${optIn ?? false})
      ON CONFLICT (email) DO UPDATE
        SET vorname = EXCLUDED.vorname,
            opt_in  = EXCLUDED.opt_in
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[demo-register] error:", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
