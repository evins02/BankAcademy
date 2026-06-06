"use client";

import Link from "next/link";
import { Lightbulb, X } from "lucide-react";
import { useState } from "react";
import type { ModuleProgress, StreakData } from "@/lib/progressData";

interface Module {
  moduleId: string;
  title: string;
  href: string;
  totalScenarios: number;
}

interface SmartRecommendationProps {
  progress: Record<string, ModuleProgress>;
  streak: StreakData;
  modules: Module[];
}

const MODULE_ORDER: string[] = [
  "privatkunde",
  "banking-operations",
  "firmenkunde",
  "anlagekunde",
  "credit-operations",
];

export function SmartRecommendation({ progress, streak, modules }: SmartRecommendationProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const rec = getRecommendation(progress, streak, modules);
  if (!rec) return null;

  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary-light px-4 py-3">
      <Lightbulb size={16} className="shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-text-primary">
          <span className="font-semibold">💡 Empfohlen: {rec.moduleTitle}</span>
          {" – "}
          <span className="text-text-secondary">{rec.reason}</span>
        </p>
      </div>
      <Link
        href={rec.href}
        className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-85"
        style={{ background: "#0D1B4B" }}
      >
        Jetzt starten →
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-text-secondary hover:text-text-primary"
        aria-label="Schliessen"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface Recommendation {
  moduleTitle: string;
  href: string;
  reason: string;
}

function getRecommendation(
  progress: Record<string, ModuleProgress>,
  streak: StreakData,
  modules: Module[]
): Recommendation | null {
  // Rule 1: if score < 70% in a started module → repeat it
  for (const mod of modules) {
    const p = progress[mod.moduleId];
    if (p && p.completed > 0 && p.accuracy < 70) {
      return {
        moduleTitle: mod.title,
        href: mod.href,
        reason: `Deine Genauigkeit liegt bei ${p.accuracy}% – übe nochmals!`,
      };
    }
  }

  // Rule 2: if streak > 7 → recommend hardest incomplete module
  if (streak.current > 7) {
    const hardModules = ["credit-operations", "anlagekunde", "firmenkunde"];
    for (const id of hardModules) {
      const mod = modules.find((m) => m.moduleId === id);
      const p = progress[id];
      if (mod && (!p || p.completed < mod.totalScenarios)) {
        return {
          moduleTitle: mod.title,
          href: mod.href,
          reason: `Du bist auf einem ${streak.current}-Tage-Streak – Zeit für eine Herausforderung!`,
        };
      }
    }
  }

  // Rule 3: module completed → recommend next in order
  for (let i = 0; i < MODULE_ORDER.length - 1; i++) {
    const currentId = MODULE_ORDER[i];
    const nextId = MODULE_ORDER[i + 1];
    const currentP = progress[currentId];
    const currentMod = modules.find((m) => m.moduleId === currentId);
    const nextMod = modules.find((m) => m.moduleId === nextId);
    if (!nextMod) continue;
    const nextP = progress[nextId];

    if (currentMod && currentP && currentP.completed >= currentMod.totalScenarios) {
      if (!nextP || nextP.completed === 0) {
        return {
          moduleTitle: nextMod.title,
          href: nextMod.href,
          reason: `Du hast ${currentMod.title} abgeschlossen – als nächstes empfehlen wir ${nextMod.title}.`,
        };
      }
    }
  }

  // Rule 4: nothing started yet → recommend first module
  const firstMod = modules[0];
  if (firstMod && (!progress[firstMod.moduleId] || progress[firstMod.moduleId].completed === 0)) {
    return {
      moduleTitle: firstMod.title,
      href: firstMod.href,
      reason: "Der perfekte Einstieg für Banking-Lernende.",
    };
  }

  return null;
}
