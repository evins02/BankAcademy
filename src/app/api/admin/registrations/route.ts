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
  await sql`
    CREATE TABLE IF NOT EXISTS user_progress (
      email         TEXT PRIMARY KEY,
      progress_data JSONB,
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
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

    const [statsRows, users, feedback, progressRows] = await Promise.all([
      sql`
        SELECT
          (SELECT COUNT(*)::int FROM (
            SELECT email FROM pilot_users UNION SELECT email FROM registrations
          ) all_users)                                                                         AS total_users,
          (SELECT COUNT(*)::int FROM pilot_feedback)                                           AS total_feedback,
          (SELECT COUNT(*)::int FROM (
            SELECT email FROM pilot_users WHERE opt_in = true
            UNION SELECT email FROM registrations WHERE opt_in = true
          ) opted_in)                                                                          AS total_opt_ins,
          (SELECT ROUND(AVG(ease_of_use)::numeric, 1)
             FROM pilot_feedback WHERE ease_of_use IS NOT NULL)                                AS avg_ease,
          (SELECT ROUND(AVG(scenario_relevance)::numeric, 1)
             FROM pilot_feedback WHERE scenario_relevance IS NOT NULL)                         AS avg_relevance
      `,
      sql`
        SELECT
          u.id, u.vorname, u.email, u.opt_in, u.created_at, u.source,
          COALESCE(u.apprenticeship_year, f.apprenticeship_year) AS apprenticeship_year,
          COALESCE(u.bank_name, f.bank_name) AS bank_name,
          (f.id IS NOT NULL) AS has_feedback
        FROM (
          SELECT id, vorname, email, opt_in, created_at, 'pilot' AS source,
                 NULL::text AS apprenticeship_year, NULL::text AS bank_name
          FROM pilot_users
          UNION ALL
          SELECT id, vorname, email, opt_in, created_at, 'access' AS source,
                 apprenticeship_year, bank_name
          FROM registrations
        ) u
        LEFT JOIN pilot_feedback f ON LOWER(f.email) = LOWER(u.email)
        ORDER BY u.created_at DESC
      `,
      sql`SELECT * FROM pilot_feedback ORDER BY created_at DESC`,
      sql`SELECT email, progress_data FROM user_progress`,
    ]);

    const analyticsMap: Record<string, Record<string, unknown>> = {};
    for (const row of progressRows) {
      const data = row.progress_data as Record<string, unknown> | null;
      if (data?.["module-analytics"]) {
        analyticsMap[row.email as string] = data["module-analytics"] as Record<string, unknown>;
      }
    }

    return NextResponse.json({ stats: statsRows[0], users, feedback, analyticsMap });
  } catch (err) {
    console.error("[admin] DB error:", err);
    return NextResponse.json({ error: "DB-Fehler – Tabellen existieren möglicherweise noch nicht" }, { status: 500 });
  }
}
