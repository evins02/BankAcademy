"use client";

import { CheckCircle2, XCircle, ChevronRight, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BKO_KYC_LEVELS, type LevelNum } from "@/lib/backoffice-kyc";

export interface LevelResult {
  scenarioId: string;
  correct: boolean;
}

interface LevelCompleteProps {
  level: LevelNum;
  results: LevelResult[];
  onNext: () => void;
  onRetry: () => void;
}

export function LevelComplete({ level, results, onNext, onRetry }: LevelCompleteProps) {
  const levelConfig = BKO_KYC_LEVELS.find((l) => l.level === level)!;
  const score = results.filter((r) => r.correct).length;
  const total = levelConfig.scenarios.length;
  const isLastLevel = level === 3;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-6 flex items-center gap-3">
          <Badge variant={levelConfig.badgeVariant}>
            Level {level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">Abgeschlossen</span>
        </div>

        <div
          className={cn(
            "mb-6 rounded-DEFAULT p-6 text-center",
            score === total ? "bg-primary-light" : score >= 2 ? "bg-accent-light" : "bg-red-50"
          )}
        >
          <p
            className={cn(
              "text-5xl font-bold",
              score === total ? "text-primary" : score >= 2 ? "text-accent" : "text-red-600"
            )}
          >
            {score}/{total}
          </p>
          <p
            className={cn(
              "mt-1 text-sm font-medium",
              score === total ? "text-primary" : score >= 2 ? "text-accent" : "text-red-700"
            )}
          >
            {score === total
              ? "Perfekt – alle richtig!"
              : score >= 2
                ? "Gut gemacht"
                : "Noch etwas üben"}
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          {levelConfig.scenarios.map((scenario, i) => {
            const result = results[i];
            return (
              <div
                key={scenario.id}
                className={cn(
                  "flex items-center gap-3 rounded-DEFAULT border p-3 text-sm",
                  result?.correct
                    ? "border-primary/20 bg-primary-light/40"
                    : "border-red-200 bg-red-50"
                )}
              >
                {result?.correct ? (
                  <CheckCircle2 size={16} className="shrink-0 text-primary" />
                ) : (
                  <XCircle size={16} className="shrink-0 text-red-500" />
                )}
                <span className="flex-1 text-text-primary">Fall {scenario.id}</span>
                {!result?.correct && (
                  <span className="text-xs text-text-secondary">Nicht korrekt</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          {isLastLevel ? (
            <div className="rounded-DEFAULT border border-primary/20 bg-primary-light p-4 text-center">
              <p className="font-semibold text-primary">Alle Level abgeschlossen!</p>
              <p className="mt-1 text-xs text-text-secondary">
                Du hast das Back Office KYC Modul abgeschlossen.
              </p>
            </div>
          ) : (
            <Button onClick={onNext} className="w-full">
              Nächstes Level freischalten
              <ChevronRight size={14} />
            </Button>
          )}
          <Button variant="secondary" onClick={onRetry} className="w-full">
            <RefreshCw size={14} />
            Nochmals versuchen
          </Button>
        </div>
      </div>
    </div>
  );
}
