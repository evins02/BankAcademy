"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LückentextCase } from "@/lib/lückentext";
import { ActiveRecallPrompt } from "@/components/shared/ActiveRecallPrompt";
import { BegründungsPrompt } from "@/components/shared/BegründungsPrompt";

interface LückentextResultCardProps {
  c: LückentextCase;
  studentAnswer: string;
  isCorrect: boolean;
  caseIndex: number;
  total: number;
  levelLabel: string;
  badgeVariant: "green" | "orange" | "red";
  isLastCase: boolean;
  nextLabel?: string;
  onNext: () => void;
}

export function LückentextResultCard({
  c,
  studentAnswer,
  isCorrect,
  caseIndex,
  total,
  levelLabel,
  badgeVariant,
  isLastCase,
  nextLabel,
  onNext,
}: LückentextResultCardProps) {
  const [recallDone, setRecallDone] = useState(false);
  const [before, after] = c.question.split("___");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={badgeVariant}>
            Level {c.level} – {levelLabel}
          </Badge>
          <span className="text-xs text-text-secondary">
            {caseIndex + 1} von {total}
          </span>
        </div>

        <div
          className={cn(
            "mb-5 flex flex-col items-center gap-2 rounded-DEFAULT p-5 animate-scale-in",
            isCorrect ? "bg-primary-light" : "bg-red-50"
          )}
        >
          {isCorrect ? (
            <CheckCircle2 size={32} className="text-primary" />
          ) : (
            <XCircle size={32} className="text-red-600" />
          )}
          <p className={cn("text-xl font-bold", isCorrect ? "text-primary" : "text-red-700")}>
            {isCorrect ? "Richtig!" : "Leider falsch"}
          </p>
          {!isCorrect && (
            <p className="text-sm text-red-700">
              Deine Antwort: <span className="font-semibold">{studentAnswer || "–"}</span>
            </p>
          )}
        </div>

        <ActiveRecallPrompt onComplete={() => setRecallDone(true)} />

        {recallDone && (
          <>
            <div className="mb-5 rounded-DEFAULT border border-primary/20 bg-primary-light/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-2">
                Lösung
              </p>
              <p className="text-sm text-text-primary leading-relaxed">
                {before}
                <span className="font-bold text-primary mx-1">{c.answer}</span>
                {c.unit && (
                  <span className="text-text-secondary text-xs ml-1">{c.unit}</span>
                )}
                {after}
              </p>
            </div>

            <div className="mb-5 rounded-DEFAULT border border-border bg-background p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                Erklärung
              </p>
              <p className="text-sm leading-relaxed text-text-primary">{c.feedback}</p>
            </div>

            <BegründungsPrompt explanation={c.feedback} />

            <Button onClick={onNext} className="w-full">
              {isLastCase
                ? (nextLabel ?? "Level abschliessen")
                : "Weiter →"}
              <ChevronRight size={14} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
