"use client";

import { CheckCircle2, XCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TragbarkeitSectionConfig, OptionKey } from "@/lib/tragbarkeit";

export interface CaseResult {
  caseId: string;
  correct: boolean;
  selectedOption: OptionKey;
}

interface SectionCompleteProps {
  section: TragbarkeitSectionConfig;
  results: CaseResult[];
  onRetry: () => void;
  onBack: () => void;
}

export function SectionComplete({ section, results, onRetry, onBack }: SectionCompleteProps) {
  const score = results.filter((r) => r.correct).length;
  const total = section.cases.length;
  const isPerfect = score === total;
  const isGood = score >= Math.ceil(total * 0.6);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            {section.title}
          </span>
          <span className="text-[11px] text-text-secondary">– Abgeschlossen</span>
        </div>

        <div
          className={cn(
            "mb-6 rounded-DEFAULT p-6 text-center",
            isPerfect ? "bg-primary-light" : isGood ? "bg-accent-light" : "bg-red-50"
          )}
        >
          <p
            className={cn(
              "text-5xl font-bold",
              isPerfect ? "text-primary" : isGood ? "text-accent" : "text-red-600"
            )}
          >
            {score}/{total}
          </p>
          <p
            className={cn(
              "mt-1 text-sm font-medium",
              isPerfect ? "text-primary" : isGood ? "text-accent" : "text-red-700"
            )}
          >
            {isPerfect ? "Perfekt – alle richtig!" : isGood ? "Gut gemacht" : "Noch etwas üben"}
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          {section.cases.map((c, i) => {
            const result = results[i];
            return (
              <div
                key={c.id}
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
                <span className="flex-1 text-text-primary">Fall {c.id}</span>
                {!result?.correct && (
                  <span className="text-xs text-text-secondary">
                    Richtig: {c.correct}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="secondary" onClick={onRetry} className="w-full">
            <RefreshCw size={14} />
            Nochmals versuchen
          </Button>
          <Button variant="secondary" onClick={onBack} className="w-full">
            <ArrowLeft size={14} />
            Zurück zur Übersicht
          </Button>
        </div>
      </div>
    </div>
  );
}
