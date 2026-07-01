"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { McqCase } from "@/lib/kontoeröffnung-privat";
import { ActiveRecallPrompt } from "@/components/shared/ActiveRecallPrompt";
import { BegründungsPrompt } from "@/components/shared/BegründungsPrompt";

interface McqResultCardProps {
  c: McqCase;
  selected: string;
  isLastCase: boolean;
  onNext: () => void;
}

export function McqResultCard({ c, selected, isLastCase, onNext }: McqResultCardProps) {
  const isCorrect = selected === c.correct;
  const [recallDone, setRecallDone] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Result banner — no correct answer revealed yet */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-DEFAULT border p-4",
          isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
        )}
      >
        {isCorrect ? (
          <CheckCircle2 size={24} className="shrink-0 text-green-600" />
        ) : (
          <XCircle size={24} className="shrink-0 text-red-600" />
        )}
        <p className={cn("font-semibold", isCorrect ? "text-green-800" : "text-red-800")}>
          {isCorrect ? "Richtig!" : "Leider falsch"}
        </p>
      </div>

      {/* Active recall before the answer is revealed */}
      <ActiveRecallPrompt feedback={c.feedback} onComplete={() => setRecallDone(true)} />

      {/* Full breakdown — only after recall is done */}
      {recallDone && (
        <>
          {/* Per-option feedback */}
          <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Auswertung der Antworten</h3>
            <div className="space-y-3">
              {c.options.map((opt) => {
                const isRight = opt.key === c.correct;
                const wasChosen = opt.key === selected;
                const perFeedback = c.feedbackPerOption?.[opt.key];

                return (
                  <div
                    key={opt.key}
                    className={cn(
                      "rounded-DEFAULT border p-3",
                      isRight
                        ? "border-2 border-green-300 bg-green-50 font-medium"
                        : wasChosen
                          ? "border-red-200 bg-red-50"
                          : "border-border bg-background opacity-30"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                          isRight
                            ? "bg-green-600 text-white"
                            : wasChosen
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-600"
                        )}
                      >
                        {opt.key}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-text-primary">{opt.text}</p>
                        {perFeedback && (
                          <p
                            className={cn(
                              "mt-1 text-xs",
                              isRight ? "text-green-700" : "text-text-secondary"
                            )}
                          >
                            {perFeedback}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* General feedback */}
          <div className="rounded-DEFAULT border border-border bg-background p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Erklärung
            </p>
            <p className="text-sm leading-relaxed text-text-primary">{c.feedback}</p>
          </div>

          <BegründungsPrompt explanation={c.feedback} />

          <Button onClick={onNext} className="w-full">
            {isLastCase ? "Zum Abschluss" : "Weiter →"}
          </Button>
        </>
      )}
    </div>
  );
}
