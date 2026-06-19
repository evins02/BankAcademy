"use client";

import { Trophy, RefreshCw, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LevelNum } from "@/lib/kontoeröffnung-privat";

export interface CaseResult {
  caseId: string;
  score: number;
  correct: boolean;
}

interface LevelCompleteProps {
  level: LevelNum;
  results: CaseResult[];
  hasNextLevel: boolean;
  onRepeat: () => void;
  onNextLevel: () => void;
  onBackToMenu: () => void;
  onRetryCase: (index: number) => void;
}

export function LevelComplete({
  level,
  results,
  hasNextLevel,
  onRepeat,
  onNextLevel,
  onBackToMenu,
  onRetryCase,
}: LevelCompleteProps) {
  const avgScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
  const correctCount = results.filter((r) => r.correct).length;

  const color =
    avgScore >= 80 ? "text-green-700" : avgScore >= 60 ? "text-amber-700" : "text-red-700";
  const bg =
    avgScore >= 80 ? "bg-green-50" : avgScore >= 60 ? "bg-amber-50" : "bg-red-50";

  return (
    <div className="mx-auto max-w-md space-y-6 text-center">
      <div className={cn("rounded-DEFAULT border p-8", bg)}>
        <Trophy size={40} className={cn("mx-auto mb-4", color)} />
        <h2 className="text-xl font-bold text-text-primary">Level {level} abgeschlossen!</h2>
        <p className={cn("mt-2 text-4xl font-bold", color)}>{avgScore}%</p>
        <p className="mt-1 text-sm text-text-secondary">
          {correctCount} / {results.length} Fälle vollständig korrekt
        </p>
      </div>

      {/* Case breakdown — each row is clickable for direct retry */}
      <div className="rounded-DEFAULT bg-surface p-4 shadow-card text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Fälle — zum Wiederholen anklicken
        </p>
        <div className="space-y-1">
          {results.map((r, i) => (
            <button
              key={r.caseId}
              onClick={() => onRetryCase(i)}
              className="flex w-full items-center justify-between rounded px-2 py-2 text-sm transition-colors hover:bg-slate-100 group"
            >
              <span className="flex items-center gap-2 text-text-secondary">
                <RotateCcw size={13} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                Fall {i + 1}
              </span>
              <span
                className={cn(
                  "font-semibold",
                  r.score >= 80
                    ? "text-green-700"
                    : r.score >= 60
                      ? "text-amber-700"
                      : "text-red-700"
                )}
              >
                {r.score}%
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={onRepeat} className="w-full">
          <RefreshCw size={14} />
          Wiederholen
        </Button>
        {hasNextLevel ? (
          <Button onClick={onNextLevel} className="w-full">
            Nächstes Level
            <ChevronRight size={14} />
          </Button>
        ) : (
          <Button onClick={onBackToMenu} className="w-full">
            Zum Menü
          </Button>
        )}
      </div>

      {!hasNextLevel && (
        <Button variant="secondary" onClick={onBackToMenu} className="w-full">
          Zurück zum Menü
        </Button>
      )}
    </div>
  );
}
