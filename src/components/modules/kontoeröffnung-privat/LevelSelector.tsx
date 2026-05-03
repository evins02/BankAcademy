"use client";

import { Lock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KONTO_PRIVAT_LEVELS, type LevelNum } from "@/lib/kontoeröffnung-privat";

interface LevelSelectorProps {
  completedLevels: Set<LevelNum>;
  levelScores: Partial<Record<LevelNum, number>>;
  onSelectLevel: (level: LevelNum) => void;
}

export function LevelSelector({ completedLevels, levelScores, onSelectLevel }: LevelSelectorProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {KONTO_PRIVAT_LEVELS.map(({ level, label, description, badgeVariant, cases }) => {
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
                <p className="text-sm text-text-secondary">{description}</p>
                <p className="mt-1 text-xs text-text-secondary">{cases.length} Fälle</p>
                {score !== undefined && (
                  <p
                    className={cn(
                      "mt-2 text-sm font-semibold",
                      score >= 80
                        ? "text-primary"
                        : score >= 60
                          ? "text-amber-600"
                          : "text-red-600"
                    )}
                  >
                    Ø {score}%
                  </p>
                )}
              </div>

              <Button
                onClick={() => onSelectLevel(level)}
                disabled={isLocked}
                variant={isCompleted ? "secondary" : "primary"}
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
