// ENV vars:
//   BERUFSBILDNER_CODES=BB-RAIFFEISEN2026:Raiffeisen Wallis,BB-WKB2026:Walliser Kantonalbank

import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { sql } from "@/lib/db";
import { resolveBBCode } from "../auth/route";

export interface StudentSummary {
  clerk_user_id: string;
  bank_name: string | null;
  name: string | null;
  lehrjahr: string | null;
  abteilung: string | null;
  totalXp: number;
  streakCurrent: number;
  scenariosCompleted: number;
  moduleAnalytics: Record<string, { completed: number; total: number; accuracy: number; lastAt?: number }>;
  lastLogin: string | null;
  onboardingPending: boolean;
}

export async function GET(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`bb-students:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  const token = req.headers.get("x-bb-token") ?? "";
  const bank = resolveBBCode(token);
  if (!bank) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rows: Array<{
    clerk_user_id: string;
    bank_name: string | null;
    progress_data: Record<string, unknown>;
    updated_at: string;
  }>;

  try {
    rows = (await sql`
      SELECT clerk_user_id, bank_name, progress_data, updated_at
      FROM user_progress
      WHERE bank_name = ${bank}
    `) as typeof rows;
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const students: StudentSummary[] = rows.map((row) => {
    const pd = row.progress_data ?? {};
    const settings = (pd["settings"] as Record<string, string> | null) ?? null;
    const onboardingPending = !settings;

    const totalXp = typeof pd["total-xp"] === "number" ? pd["total-xp"] : 0;
    const streakData = pd["streak"] as Record<string, number> | null;
    const streakCurrent = streakData?.current ?? 0;

    // Count completed scenarios from progress object
    const progressObj = pd["progress"] as Record<string, { completed?: boolean }> | null;
    let scenariosCompleted = 0;
    if (progressObj && typeof progressObj === "object") {
      for (const val of Object.values(progressObj)) {
        if (val && val.completed === true) scenariosCompleted++;
      }
    }

    const moduleAnalytics =
      (pd["module-analytics"] as Record<string, { completed: number; total: number; accuracy: number; lastAt?: number }> | null) ?? {};

    return {
      clerk_user_id: row.clerk_user_id,
      bank_name: row.bank_name,
      name: settings?.name ?? null,
      lehrjahr: settings?.lehrjahr ?? null,
      abteilung: settings?.abteilung ?? null,
      totalXp,
      streakCurrent,
      scenariosCompleted,
      moduleAnalytics,
      lastLogin: row.updated_at ?? null,
      onboardingPending,
    };
  });

  return NextResponse.json({ bank, students });
}
