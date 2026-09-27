import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getGeneratedScenarios } from "@/lib/ai-generation/db-scenarios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const moduleKey = searchParams.get("moduleKey");
  const levelParam = searchParams.get("level");

  if (!moduleKey || !levelParam) {
    return NextResponse.json({ error: "moduleKey and level are required" }, { status: 400 });
  }

  const level = parseInt(levelParam, 10);
  if (![1, 2, 3].includes(level)) {
    return NextResponse.json({ error: "level must be 1, 2, or 3" }, { status: 400 });
  }

  try {
    // Fetch both global scenarios and personalized ones for this user
    const scenarios = await getGeneratedScenarios(moduleKey, level, userId);
    return NextResponse.json({ scenarios });
  } catch {
    return NextResponse.json({ scenarios: [] });
  }
}
