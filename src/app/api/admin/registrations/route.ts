import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS pilot_users (
      id         SERIAL PRIMARY KEY,
      vorname    TEXT NOT NULL,
      email      TEXT NOT NULL,
      opt_in     BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS pilot_users_email_unique ON pilot_users (email)
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS pilot_feedback (
      id                  SERIAL PRIMARY KEY,
      session_id          TEXT,
      ease_of_use         SMALLINT,
      scenario_relevance  SMALLINT,
      usage_frequency     TEXT,
      best_module         TEXT,
      better_prepared     TEXT,
      difficulty_rating   TEXT,
      best_features       TEXT,
      liked_most          TEXT,
      improvements        TEXT,
      would_recommend     TEXT,
      apprenticeship_year TEXT,
      bank_name           TEXT,
      contact_consent     BOOLEAN NOT NULL DEFAULT FALSE,
      email               TEXT,
      vorname             TEXT,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD ?? process.env.ADMIN_CODE;

  if (!adminPassword) {
    console.error("[admin] ADMIN_PASSWORD env var is not set");
    return NextResponse.json(
      { error: "Admin-Passwort nicht konfiguriert (ADMIN_PASSWORD fehlt in Vercel)" },
      { status: 503 }
    );
  }

  const code = req.headers.get("x-admin-code");
  if (!code || code !== adminPassword) {
    return NextResponse.json({ error: "Falscher Code" }, { status: 401 });
  }

  try {
    await ensureTables();

    const [statsRows, users, feedback] = await Promise.all([
      sql`
        SELECT
          (SELECT COUNT(*)::int FROM pilot_users)                                              AS total_users,
          (SELECT COUNT(*)::int FROM pilot_feedback)                                           AS total_feedback,
          (SELECT COUNT(*)::int FROM pilot_users WHERE opt_in = true)                          AS total_opt_ins,
          (SELECT ROUND(AVG(ease_of_use)::numeric, 1)
             FROM pilot_feedback WHERE ease_of_use IS NOT NULL)                                AS avg_ease,
          (SELECT ROUND(AVG(scenario_relevance)::numeric, 1)
             FROM pilot_feedback WHERE scenario_relevance IS NOT NULL)                         AS avg_relevance
      `,
      sql`
        SELECT
          u.id, u.vorname, u.email, u.opt_in, u.created_at,
          f.apprenticeship_year, f.bank_name,
          (f.id IS NOT NULL) AS has_feedback
        FROM pilot_users u
        LEFT JOIN pilot_feedback f ON LOWER(f.email) = LOWER(u.email)
        ORDER BY u.created_at DESC
      `,
      sql`SELECT * FROM pilot_feedback ORDER BY created_at DESC`,
    ]);

    return NextResponse.json({ stats: statsRows[0], users, feedback });
  } catch (err) {
    console.error("[admin] DB error:", err);
    return NextResponse.json({ error: "DB-Fehler – Tabellen existieren möglicherweise noch nicht" }, { status: 500 });
  }
}
