"use client";

import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TragbarkeitCase, OptionKey } from "@/lib/tragbarkeit";

interface CaseFeedbackProps {
  sectionCase: TragbarkeitCase;
  selectedOption: OptionKey;
  caseIndex: number;
  total: number;
  isLast: boolean;
  onNext: () => void;
}

export function CaseFeedback({
  sectionCase,
  selectedOption,
  caseIndex,
  total,
  isLast,
  onNext,
}: CaseFeedbackProps) {
  const isCorrect = selectedOption === sectionCase.correct;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Fall {sectionCase.id}
          </span>
          <span className="text-xs text-text-secondary">
            {caseIndex + 1} / {total}
          </span>
        </div>

        <div
          className={cn(
            "mb-5 flex items-center gap-3 rounded-DEFAULT p-4",
            isCorrect ? "bg-primary-light" : "bg-red-50"
          )}
        >
          {isCorrect ? (
            <CheckCircle2 size={20} className="shrink-0 text-primary" />
          ) : (
            <XCircle size={20} className="shrink-0 text-red-600" />
          )}
          <p className={cn("font-semibold", isCorrect ? "text-primary" : "text-red-700")}>
            {isCorrect ? "Richtig!" : "Falsch"}
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-2">
          {sectionCase.options.map((opt) => {
            const isSelected = opt.key === selectedOption;
            const isCorrectOpt = opt.key === sectionCase.correct;
            return (
              <div
                key={opt.key}
                className={cn(
                  "flex items-start gap-3 rounded-DEFAULT border p-4 text-sm",
                  isCorrectOpt
                    ? "border-primary bg-primary-light text-text-primary"
                    : isSelected
                      ? "border-red-300 bg-red-50 text-text-primary"
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
                  <CheckCircle2
                    size={14}
                    className="ml-auto shrink-0 self-center text-primary"
                  />
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
          <p className="text-sm leading-relaxed text-text-primary">{sectionCase.feedback}</p>
        </div>

        <Button onClick={onNext} className="w-full">
          {isLast ? "Abschnitt abschliessen" : "Nächster Fall"}
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
