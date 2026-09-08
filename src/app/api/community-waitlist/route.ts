import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS community_waitlist (
      id         SERIAL PRIMARY KEY,
      email      TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS community_waitlist_email_unique ON community_waitlist (email)
  `;
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }
  const cleanEmail = email.trim().toLowerCase();
  try {
    await ensureTable();
    await sql`
      INSERT INTO community_waitlist (email)
      VALUES (${cleanEmail})
      ON CONFLICT (email) DO NOTHING
    `;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
