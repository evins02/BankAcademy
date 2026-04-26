"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, RefreshCw, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";
import {
  SIM_STEPS,
  type ScoreResult,
  type OptionKey,
} from "@/lib/simulation-kontoeröffnung";

interface ResultsScreenProps {
  scores: ScoreResult;
  answers: Record<number, OptionKey>;
  onRetry: () => void;
  onNext: () => void;
}

const CATEGORY_LABELS = {
  gespraechsfuehrung: "Gesprächsführung",
  fachkompetenz: "Fachkompetenz",
  vollstaendigkeit: "Vollständigkeit",
} as const;

function scoreColor(pct: number) {
  if (pct >= 80) return "text-primary";
  if (pct >= 50) return "text-accent";
  return "text-red-600";
}

function scoreBg(pct: number) {
  if (pct >= 80) return "bg-primary-light";
  if (pct >= 50) return "bg-accent-light";
  return "bg-red-50";
}

export function ResultsScreen({
  scores,
  answers,
  onRetry,
  onNext,
}: ResultsScreenProps) {
  const [showSolution, setShowSolution] = useState(false);
  const canProceed = scores.overall >= 60;

  const categories: Array<{ key: keyof typeof CATEGORY_LABELS; score: number }> = [
    { key: "gespraechsfuehrung", score: scores.gespraechsfuehrung },
    { key: "fachkompetenz", score: scores.fachkompetenz },
    { key: "vollstaendigkeit", score: scores.vollstaendigkeit },
  ];

  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
      <div className="w-full max-w-xl space-y-4">
        {/* Overall score */}
        <div
          className={cn(
            "rounded-DEFAULT p-6 text-center",
            scoreBg(scores.overall)
          )}
        >
          <p
            className={cn(
              "text-6xl font-bold tabular-nums",
              scoreColor(scores.overall)
            )}
          >
            {scores.overall}%
          </p>
          <p
            className={cn(
              "mt-1 text-sm font-semibold",
              scoreColor(scores.overall)
            )}
          >
            {scores.overall >= 80
              ? "Ausgezeichnet!"
              : scores.overall >= 60
              ? "Gut gemacht"
              : "Noch etwas üben"}
          </p>
        </div>

        {/* Category breakdown */}
        <div className="rounded-DEFAULT bg-surface p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">
            Auswertung nach Kategorie
          </h3>
          {categories.map(({ key, score }) => (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-text-secondary">{CATEGORY_LABELS[key]}</span>
                <span className={cn("font-semibold", scoreColor(score))}>
                  {score}%
                </span>
              </div>
              <ProgressBar value={score} max={100} />
            </div>
          ))}
        </div>

        {/* Musterlösung */}
        <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
          <button
            onClick={() => setShowSolution((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-text-primary hover:bg-gray-50 transition-colors"
          >
            Musterlösung anzeigen
            {showSolution ? (
              <ChevronUp size={16} className="text-text-secondary" />
            ) : (
              <ChevronDown size={16} className="text-text-secondary" />
            )}
          </button>

          {showSolution && (
            <div className="border-t border-border divide-y divide-border">
              {SIM_STEPS.map((step, i) => {
                const chosen = answers[step.id];
                const isCorrect = chosen === step.correctKey;
                const correctOpt = step.options.find(
                  (o) => o.key === step.correctKey
                )!;
                const chosenOpt = step.options.find((o) => o.key === chosen);

                return (
                  <div key={step.id} className="px-5 py-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                      Schritt {i + 1}
                    </p>
                    <p className="mb-2 text-xs text-text-secondary italic line-clamp-2">
                      &bdquo;{step.customerSpeech}&ldquo;
                    </p>

                    {/* Correct answer */}
                    <div className="flex items-start gap-2 rounded-DEFAULT border border-primary/20 bg-primary-light/40 p-2">
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span className="text-xs text-text-primary">
                        <span className="font-bold">{step.correctKey})</span>{" "}
                        {correctOpt.text}
                      </span>
                    </div>

                    {/* Student's wrong answer */}
                    {!isCorrect && chosenOpt && (
                      <div className="mt-1 flex items-start gap-2 rounded-DEFAULT border border-red-200 bg-red-50 p-2">
                        <XCircle
                          size={14}
                          className="mt-0.5 shrink-0 text-red-500"
                        />
                        <span className="text-xs text-text-secondary">
                          <span className="font-bold">{chosen})</span>{" "}
                          {chosenOpt.text}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 pb-6">
          <Button onClick={onRetry} variant="secondary" className="w-full">
            <RefreshCw size={14} />
            Nochmal versuchen
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="w-full"
          >
            {canProceed ? (
              <>
                Nächste Simulation
                <ChevronRight size={14} />
              </>
            ) : (
              <>
                <Lock size={14} />
                Nächste Simulation (min. 60% erforderlich)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
