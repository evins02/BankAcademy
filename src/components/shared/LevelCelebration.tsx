"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Confetti } from "./Confetti";
import { WeiterButton } from "./WeiterButton";
import { addXP } from "@/lib/xpData";

export interface SlimResult {
  correct: boolean;
  label?: string;
}

interface LevelCelebrationProps {
  levelNum: number;
  levelLabel: string;
  results: SlimResult[];
  isLastLevel: boolean;
  timeSeconds?: number;
  onNext: () => void;
  onRetry: () => void;
  onBack?: () => void;
}

function formatTime(s: number) {
  if (s < 60) return `${s} Sekunde${s !== 1 ? "n" : ""}`;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return sec > 0 ? `${m}:${String(sec).padStart(2, "0")} Minuten` : `${m} Minute${m !== 1 ? "n" : ""}`;
}

export function LevelCelebration({
  levelNum,
  levelLabel,
  results,
  isLastLevel,
  timeSeconds,
  onNext,
  onRetry,
  onBack,
}: LevelCelebrationProps) {
  const score = results.filter((r) => r.correct).length;
  const total = results.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPerfect = score === total;
  const isGood = score >= Math.ceil(total * 0.6);
  const levelXP = score * 10 + 200;

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    addXP(levelXP);
    if (isGood) {
      setConfetti(true);
      const t = setTimeout(() => setConfetti(false), 3500);
      return () => clearTimeout(t);
    }
  }, [isGood, levelXP]);

  const nextLabel = isLastLevel
    ? "Modul abschliessen 🎓"
    : `Level ${levelNum + 1} freischalten`;

  return (
    <>
      <Confetti active={confetti} />

      <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl">

          {/* Trophy / icon */}
          <div className="mb-5 text-center">
            <div
              className={cn(
                "mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl",
                isPerfect ? "bg-yellow-100" : isGood ? "bg-primary-light" : "bg-accent-light"
              )}
            >
              {isPerfect ? "🏆" : isGood ? "✅" : "📖"}
            </div>

            <h2 className="text-xl font-bold text-text-primary">
              {isLastLevel ? "Modul abgeschlossen! 🎓" : `Level ${levelNum} abgeschlossen!`}
            </h2>
            <p className="mt-0.5 text-sm text-text-secondary">
              Level {levelNum} – {levelLabel}
            </p>
          </div>

          {/* Score tile */}
          <div
            className={cn(
              "mb-4 rounded-xl p-4 text-center",
              isPerfect ? "bg-yellow-50" : isGood ? "bg-primary-light" : "bg-accent-light"
            )}
          >
            <p
              className={cn(
                "text-4xl font-bold tabular-nums",
                isPerfect ? "text-yellow-600" : isGood ? "text-primary" : "text-accent"
              )}
            >
              {score}/{total}
            </p>
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                isPerfect ? "text-yellow-700" : isGood ? "text-primary" : "text-accent"
              )}
            >
              {pct}%{" · "}
              {isPerfect ? "Perfekt – alle richtig!" : isGood ? "Gut gemacht" : "Noch etwas üben"}
            </p>
            <p className="mt-1.5 text-xs font-semibold text-text-secondary">
              +{levelXP} XP verdient
            </p>
          </div>

          {/* Time taken */}
          {timeSeconds !== undefined && timeSeconds > 0 && (
            <div className="mb-4 flex items-center justify-center gap-2 text-xs text-text-secondary">
              <Clock size={12} />
              Du hast {formatTime(timeSeconds)} gebraucht
            </div>
          )}

          {/* Per-case result rows */}
          <div className="mb-5 space-y-1.5">
            {results.map((r, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm",
                  r.correct ? "border-primary/20 bg-primary-light/40" : "border-red-200 bg-red-50"
                )}
              >
                {r.correct ? (
                  <CheckCircle2 size={14} className="shrink-0 text-primary" />
                ) : (
                  <XCircle size={14} className="shrink-0 text-red-500" />
                )}
                <span className="flex-1 text-text-primary">{r.label ?? `Fall ${i + 1}`}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {isLastLevel ? (
              <Button onClick={onNext} className="w-full">
                {nextLabel}
              </Button>
            ) : (
              <WeiterButton
                onNext={onNext}
                onRetry={onRetry}
                onBack={onBack}
                label={nextLabel}
                className="w-full"
              />
            )}
            <Button variant="secondary" onClick={onRetry} className="w-full">
              <RefreshCw size={14} />
              Nochmals versuchen
            </Button>
            {onBack && (
              <button
                onClick={onBack}
                className="flex w-full items-center justify-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft size={12} />
                Zurück zur Übersicht
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
