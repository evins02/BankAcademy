"use client";

import { Lock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SubmoduleLevel, LevelNum } from "@/lib/anlage-submodule-types";

interface SubLevelSelectorProps {
  levels: SubmoduleLevel[];
  completedLevels: Set<LevelNum>;
  levelScores: Partial<Record<LevelNum, number>>;
  onSelectLevel: (level: LevelNum) => void;
  title: string;
  description: string;
}

export function SubLevelSelector({
  levels,
  completedLevels,
  levelScores,
  onSelectLevel,
  title,
  description,
}: SubLevelSelectorProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {levels.map(({ level, label, badgeVariant, cases }) => {
          const isLocked = level > 1 && !completedLevels.has((level - 1) as LevelNum);
          const isCompleted = completedLevels.has(level);
          const score = levelScores[level];

          return (
            <div
              key={level}
              className={cn(
                "flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card",
                isLocked && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between">
                <Badge variant={isLocked ? "neutral" : badgeVariant}>
                  Level {level} – {label}
                </Badge>
                {isLocked && <Lock size={16} className="shrink-0 text-text-secondary" />}
                {isCompleted && <CheckCircle2 size={16} className="shrink-0 text-primary" />}
              </div>

              <div className="flex-1">
                <p className="text-sm text-text-secondary">{cases.length} Fall</p>
                {isCompleted && score !== undefined && (
                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {score}/{cases.length} richtig
                  </p>
                )}
                {isLocked && (
                  <p className="mt-1 text-xs text-text-secondary">
                    Schliesse Level {level - 1} ab, um dieses Level freizuschalten.
                  </p>
                )}
              </div>

              <Button
                variant={isLocked ? "secondary" : "primary"}
                disabled={isLocked}
                onClick={() => onSelectLevel(level)}
                className="w-full"
              >
                {isCompleted ? "Wiederholen" : isLocked ? "Gesperrt" : "Starten"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
