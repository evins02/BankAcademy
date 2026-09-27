import { NextRequest, NextResponse } from "next/server";
import { CURRICULUM } from "@/lib/ai-generation/curriculum";
import { generateScenario } from "@/lib/ai-generation/generate";
import { ensureAiScenariosTable, saveAiScenario } from "@/lib/ai-generation/db-scenarios";
import type { LevelNum } from "@/lib/anlage-submodule-types";

export const runtime = "nodejs";
export const maxDuration = 55;
export const dynamic = "force-dynamic";

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("Authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureAiScenariosTable();

  const runId = `cron-${Date.now()}`;
  const tasks: { moduleKey: string; moduleLabel: string; topic: string; level: LevelNum }[] = [];

  for (const mod of CURRICULUM) {
    for (const topicDef of mod.topics) {
      tasks.push({
        moduleKey: mod.moduleKey,
        moduleLabel: mod.moduleLabel,
        topic: topicDef.name,
        level: topicDef.level,
      });
    }
  }

  let generated = 0;
  let failed = 0;

  // Process in parallel batches of 5 to respect rate limits + stay within maxDuration
  const batches = chunk(tasks, 5);
  for (const batch of batches) {
    const results = await Promise.allSettled(
      batch.map(async (t) => {
        const scenario = await generateScenario(t.moduleKey, t.moduleLabel, t.topic, t.level);
        if (!scenario) throw new Error("null result");
        await saveAiScenario(scenario, t.moduleKey, t.topic, "curriculum", runId);
        return scenario.id;
      })
    );
    for (const r of results) {
      if (r.status === "fulfilled") generated++;
      else failed++;
    }
  }

  return NextResponse.json({
    ok: true,
    runId,
    generated,
    failed,
    totalTasks: tasks.length,
    timestamp: new Date().toISOString(),
  });
}
