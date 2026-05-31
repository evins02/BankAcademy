"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FONDS_LEVELS, type FondsCase } from "@/lib/fonds";
import { WeiterButton } from "@/components/shared/WeiterButton";
import { Confetti } from "@/components/shared/Confetti";
import { useGlossar } from "@/context/GlossarContext";
import { addXP } from "@/lib/xpData";
import { InlineRating } from "@/components/shared/StarRating";
import { FeedbackEnhancement } from "@/components/shared/FeedbackEnhancement";

interface FeedbackCardProps {
  fondsCase: FondsCase;
  selectedOption: string;
  caseIndex: number;
  total: number;
  isLastCase: boolean;
  onNext: () => void;
}

export function FeedbackCard({
  fondsCase,
  selectedOption,
  caseIndex,
  total,
  isLastCase,
  onNext,
}: FeedbackCardProps) {
  const isCorrect = selectedOption === fondsCase.correct;
  const levelConfig = FONDS_LEVELS.find((l) => l.level === fondsCase.level)!;
  const xp = isCorrect ? 100 : 10;
  const { open: openGlossar } = useGlossar();
  const [showConfetti, setShowConfetti] = useState(isCorrect);

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
          <div className="mb-5 flex items-center justify-between">
            <Badge variant={levelConfig.badgeVariant}>
              Level {fondsCase.level} – {levelConfig.label}
            </Badge>
            <span className="text-xs text-text-secondary">
              Fall {caseIndex + 1} von {total}
            </span>
          </div>

          {/* Large result indicator */}
          <div
            className={cn(
              "mb-5 flex flex-col items-center gap-2 rounded-DEFAULT p-5 animate-scale-in",
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

          <div className="mb-5 flex flex-col gap-2">
            {fondsCase.options.map((opt) => {
              const isSelected = opt.key === selectedOption;
              const isCorrectOpt = opt.key === fondsCase.correct;
              return (
                <div
                  key={opt.key}
                  className={cn(
                    "flex items-start gap-3 rounded-DEFAULT border p-4 text-sm",
                    isCorrectOpt
                      ? "border-primary bg-primary-light text-text-primary"
                      : isSelected
                        ? "border-red-300 bg-red-50 text-text-primary animate-shake"
                        : "border-border bg-surface text-text-secondary opacity-50"
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

          <div className="mb-4 rounded-DEFAULT border border-border bg-background p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Das solltest du wissen
            </p>
            <p className="text-sm leading-relaxed text-text-primary">{fondsCase.feedback}</p>
          </div>

          <FeedbackEnhancement
            warum={fondsCase.warum}
            inDerPraxis={fondsCase.inDerPraxis}
            merksatz={fondsCase.merksatz}
            glossarTerm={fondsCase.glossarTerm}
          />

          <div className="mb-4 mt-4 flex items-center justify-between">
            <button
              onClick={openGlossar}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <BookOpen size={13} />
              Glossar öffnen
            </button>
            <InlineRating scenarioId={`fonds-${fondsCase.id}`} label="Szenario bewerten:" />
          </div>

          <WeiterButton
            onNext={onNext}
            label={isLastCase ? "Level abschliessen" : "Nächster Fall"}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}
