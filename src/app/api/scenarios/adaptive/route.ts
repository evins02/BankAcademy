import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateScenario } from "@/lib/ai-generation/generate";
import { saveAiScenario, getGeneratedScenarios } from "@/lib/ai-generation/db-scenarios";
import { CURRICULUM } from "@/lib/ai-generation/curriculum";
import type { LevelNum } from "@/lib/anlage-submodule-types";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

// Called when a learner exhausts all scenarios for a module+level.
// Generates N new scenarios targeting their weak concepts.
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { moduleKey, level, weakConcepts } = (await req.json()) as {
    moduleKey: string;
    level: LevelNum;
    weakConcepts?: string[];
  };

  if (!moduleKey || !level) {
    return NextResponse.json({ error: "moduleKey and level are required" }, { status: 400 });
  }

  const mod = CURRICULUM.find((m) => m.moduleKey === moduleKey);
  if (!mod) {
    return NextResponse.json({ error: "Unknown module" }, { status: 404 });
  }

  // Pick topics at the right level; prioritize if they relate to weak concepts
  const levelTopics = mod.topics.filter((t) => t.level === level);
  if (levelTopics.length === 0) {
    return NextResponse.json({ error: "No topics defined for this module/level" }, { status: 404 });
  }

  // Generate up to 3 new personalized scenarios
  const runId = `adaptive-${userId}-${Date.now()}`;
  const generated = [];

  for (const topic of levelTopics.slice(0, 3)) {
    const scenario = await generateScenario(mod.moduleKey, mod.moduleLabel, topic.name, level);
    if (scenario) {
      await saveAiScenario(scenario, moduleKey, topic.name, "adaptive", runId, userId);
      generated.push(scenario);
    }
  }

  // Return the new scenarios + any existing ones for this user+module+level
  const all = await getGeneratedScenarios(moduleKey, level, userId);

  return NextResponse.json({ scenarios: all, newlyGenerated: generated.length });
}
