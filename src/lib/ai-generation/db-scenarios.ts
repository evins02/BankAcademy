import { sql } from "@/lib/db";
import type { SubmoduleCase } from "@/lib/anlage-submodule-types";

export interface AiScenarioRow {
  id: string;
  module_key: string;
  level: number;
  topic: string;
  title: string;
  case_data: SubmoduleCase;
  source: string;
  approved: boolean;
  generated_at: string;
  generation_run_id: string | null;
  clerk_user_id: string | null;
}

export async function ensureAiScenariosTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS ai_scenarios (
      id TEXT PRIMARY KEY,
      module_key TEXT NOT NULL,
      level INTEGER NOT NULL,
      topic TEXT NOT NULL,
      title TEXT NOT NULL,
      case_data JSONB NOT NULL,
      source TEXT NOT NULL DEFAULT 'curriculum',
      approved BOOLEAN NOT NULL DEFAULT true,
      generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      generation_run_id TEXT,
      clerk_user_id TEXT
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_ai_scenarios_lookup
    ON ai_scenarios (module_key, level, approved)
    WHERE clerk_user_id IS NULL
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_ai_scenarios_user
    ON ai_scenarios (clerk_user_id, module_key, level, approved)
  `;
}

export async function saveAiScenario(
  scenario: SubmoduleCase,
  moduleKey: string,
  topic: string,
  source: string,
  runId: string,
  clerkUserId?: string,
): Promise<void> {
  await sql`
    INSERT INTO ai_scenarios (id, module_key, level, topic, title, case_data, source, generation_run_id, clerk_user_id)
    VALUES (
      ${scenario.id},
      ${moduleKey},
      ${scenario.level},
      ${topic},
      ${scenario.title},
      ${JSON.stringify(scenario)}::jsonb,
      ${source},
      ${runId},
      ${clerkUserId ?? null}
    )
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function getGeneratedScenarios(
  moduleKey: string,
  level: number,
  clerkUserId?: string,
): Promise<SubmoduleCase[]> {
  await ensureAiScenariosTable();
  const rows = await sql`
    SELECT case_data FROM ai_scenarios
    WHERE module_key = ${moduleKey}
      AND level = ${level}
      AND approved = true
      AND (clerk_user_id IS NULL OR clerk_user_id = ${clerkUserId ?? null})
    ORDER BY generated_at DESC
  ` as { case_data: SubmoduleCase }[];
  return rows.map((r) => r.case_data);
}

export async function countGeneratedScenarios(moduleKey: string): Promise<number> {
  await ensureAiScenariosTable();
  const rows = await sql`
    SELECT COUNT(*)::int AS n FROM ai_scenarios
    WHERE module_key = ${moduleKey} AND approved = true AND clerk_user_id IS NULL
  ` as { n: number }[];
  return rows[0]?.n ?? 0;
}
