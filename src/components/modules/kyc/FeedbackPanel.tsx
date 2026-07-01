"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KYC_LEVELS, type KycScenario, type OptionKey } from "@/lib/kyc";
import { Confetti } from "@/components/shared/Confetti";
import { addXP } from "@/lib/xpData";
import { ActiveRecallPrompt } from "@/components/shared/ActiveRecallPrompt";
import { BegründungsPrompt } from "@/components/shared/BegründungsPrompt";

interface FeedbackPanelProps {
  scenario: KycScenario;
  selectedOption: OptionKey;
  scenarioIndex: number;
  total: number;
  isLastScenario: boolean;
  onNext: () => void;
}

export function FeedbackPanel({
  scenario,
  selectedOption,
  scenarioIndex,
  total,
  isLastScenario,
  onNext,
}: FeedbackPanelProps) {
  const isCorrect = selectedOption === scenario.correct;
  const levelConfig = KYC_LEVELS.find((l) => l.level === scenario.level)!;
  const xp = isCorrect ? 100 : 10;
  const [showConfetti, setShowConfetti] = useState(isCorrect);
  const [recallDone, setRecallDone] = useState(false);

  useEffect(() => {
    addXP(xp);
    if (!isCorrect) return;
    const t = setTimeout(() => setShowConfetti(false), 1500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="mx-auto max-w-2xl">
        <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant={levelConfig.badgeVariant}>
              Level {scenario.level} – {levelConfig.label}
            </Badge>
            <span className="text-xs text-text-secondary">
              Szenario {scenarioIndex + 1} von {total}
            </span>
          </div>

          <div
            className={cn(
              "mb-6 flex flex-col items-center gap-2 rounded-DEFAULT p-5 animate-scale-in",
              isCorrect ? "bg-primary-light" : "bg-red-50"
            )}
          >
            <span className="text-4xl">{isCorrect ? "✅" : "❌"}</span>
            <p className={cn("text-xl font-bold", isCorrect ? "text-primary" : "text-red-700")}>
              {isCorrect ? "Richtig!" : "Leider falsch"}
            </p>
            {isCorrect && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                +{xp} XP
              </span>
            )}
          </div>

          <ActiveRecallPrompt feedback={scenario.feedback} onComplete={() => setRecallDone(true)} />
          {recallDone && (
            <>
              <div className="mb-6 flex flex-col gap-2">
                {scenario.options.map((opt) => {
                  const isSelected = opt.key === selectedOption;
                  const isCorrectOpt = opt.key === scenario.correct;
                  return (
                    <div
                      key={opt.key}
                      className={cn(
                        "flex items-start gap-3 rounded-DEFAULT border p-4 text-sm",
                        isCorrectOpt
                          ? "border-2 border-primary bg-primary-light text-text-primary font-medium"
                          : isSelected
                            ? "border-red-300 bg-red-50 text-text-primary animate-shake"
                            : "border-border bg-surface text-text-secondary opacity-30"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                          isCorrectOpt
                            ? "bg-primary text-white"
                            : isSelected
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 text-text-secondary"
                        )}
                      >
                        {opt.key}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {isCorrectOpt && (
                        <CheckCircle2 size={14} className="ml-auto shrink-0 self-center text-primary" />
                      )}
                      {isSelected && !isCorrectOpt && (
                        <XCircle size={14} className="ml-auto shrink-0 self-center text-red-500" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mb-6 rounded-DEFAULT border border-border bg-background p-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                  Erklärung
                </p>
                <p className="text-sm leading-relaxed text-text-primary">{scenario.feedback}</p>
              </div>

              <BegründungsPrompt explanation={scenario.feedback} />

              <Button onClick={onNext} className="w-full">
                {isLastScenario ? "Level abschliessen" : "Nächstes Szenario"}
                <ChevronRight size={14} />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
