"use client";

import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ZV_FO_LEVELS, type ZvFoCase } from "@/lib/zahlungsverkehr-privat";
import { ActiveRecallPrompt } from "@/components/shared/ActiveRecallPrompt";

interface FeedbackCardProps {
  zvCase: ZvFoCase;
  selectedOption: string;
  caseIndex: number;
  total: number;
  isLastCase: boolean;
  onNext: () => void;
}

export function FeedbackCard({
  zvCase,
  selectedOption,
  caseIndex,
  total,
  isLastCase,
  onNext,
}: FeedbackCardProps) {
  const isCorrect = selectedOption === zvCase.correct;
  const levelConfig = ZV_FO_LEVELS.find((l) => l.level === zvCase.level)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {zvCase.level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">
            Fall {caseIndex + 1} von {total}
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
          {zvCase.options.map((opt) => {
            const isSelected = opt.key === selectedOption;
            const isCorrectOpt = opt.key === zvCase.correct;
            return (
              <div
                key={opt.key}
                className={cn(
                  "flex items-start gap-3 rounded-DEFAULT border p-4 text-sm",
                  isCorrectOpt
                    ? "border-2 border-primary bg-primary-light text-text-primary font-medium"
                    : isSelected
                      ? "border-red-300 bg-red-50 text-text-primary"
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
          <p className="text-sm leading-relaxed text-text-primary">{zvCase.feedback}</p>
        </div>

        <ActiveRecallPrompt />
        <Button onClick={onNext} className="w-full">
          {isLastCase ? "Level abschliessen" : "Nächster Fall"}
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
