import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTable() {
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await ensureTable();

    await sql`
      INSERT INTO pilot_feedback (
        session_id, ease_of_use, scenario_relevance, usage_frequency,
        best_module, better_prepared, difficulty_rating, best_features,
        liked_most, improvements, would_recommend, apprenticeship_year,
        bank_name, contact_consent, email, vorname
      ) VALUES (
        ${body.sessionId ?? null},
        ${body.easeOfUse ?? null},
        ${body.scenarioRelevance ?? null},
        ${body.usageFrequency ?? null},
        ${body.bestModule ?? null},
        ${body.betterPrepared ?? null},
        ${body.difficultyRating ?? null},
        ${Array.isArray(body.bestFeatures) ? body.bestFeatures.join(", ") : null},
        ${body.likedMost ?? null},
        ${body.improvements ?? null},
        ${body.wouldRecommend ?? null},
        ${body.apprenticeshipYear ?? null},
        ${body.bankName ?? null},
        ${body.contactConsent ?? false},
        ${body.contactConsent ? (body.email ?? null) : null},
        ${body.contactConsent ? (body.vorname ?? null) : null}
      )
    `;

    // If the user explicitly revoked contact consent, honour it in pilot_users as well
    if (!body.contactConsent && body.email) {
      const cleanEmail = String(body.email).trim().toLowerCase();
      sql`UPDATE pilot_users SET opt_in = false WHERE email = ${cleanEmail}`.catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[pilot-feedback] DB error:", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
