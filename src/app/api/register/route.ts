import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS registrations (
      id                  SERIAL PRIMARY KEY,
      vorname             TEXT NOT NULL,
      nachname            TEXT NOT NULL,
      email               TEXT NOT NULL,
      opt_in              BOOLEAN NOT NULL DEFAULT false,
      apprenticeship_year TEXT,
      bank_name           TEXT,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS apprenticeship_year TEXT`;
  await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS bank_name TEXT`;
}

export async function POST(req: NextRequest) {
  const { vorname, nachname, email, optIn, apprenticeshipYear, bankName } = await req.json();

  if (!vorname?.trim() || !nachname?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }

  await ensureTable();

  await sql`
    INSERT INTO registrations (vorname, nachname, email, opt_in, apprenticeship_year, bank_name)
    VALUES (
      ${vorname.trim()}, ${nachname.trim()}, ${email.trim().toLowerCase()},
      ${optIn ?? false},
      ${apprenticeshipYear ?? null},
      ${bankName?.trim() ?? null}
    )
  `;

  return NextResponse.json({ success: true });
}
