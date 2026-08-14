import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

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
