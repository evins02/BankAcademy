"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { McqCase } from "@/lib/kontoeröffnung-privat";

interface McqCaseCardProps {
  c: McqCase;
  caseNum: number;
  total: number;
  selected: string | null;
  onSelect: (key: string) => void;
  onSubmit: () => void;
}

export function McqCaseCard({
  c,
  caseNum,
  total,
  selected,
  onSelect,
  onSubmit,
}: McqCaseCardProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Fall {caseNum} / {total}
        </p>
        <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary">
          Einzelauswahl
        </span>
      </div>

      {/* Case card */}
      <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
        <h3 className="mb-3 text-base font-bold text-text-primary">{c.title}</h3>
        {c.today && (
          <div className="mb-3 flex items-center gap-1.5 text-xs text-amber-700">
            <Calendar size={12} />
            <span>Heute: {c.today}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed text-text-primary">{c.briefing}</p>
      </div>

      {/* Question */}
      <p className="font-semibold text-text-primary">{c.question}</p>

      {/* Options */}
      <div className="space-y-2">
        {c.options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className={cn(
              "flex w-full items-start gap-3 rounded-DEFAULT border p-4 text-left text-sm transition-colors",
              selected === opt.key
                ? "border-primary bg-primary-light text-text-primary"
                : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:bg-primary-light/30 hover:text-text-primary"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                selected === opt.key
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-text-secondary"
              )}
            >
              {opt.key}
            </span>
            <span className="flex-1 leading-relaxed">{opt.text}</span>
          </button>
        ))}
      </div>

      <Button onClick={onSubmit} disabled={!selected} className="w-full">
        Antwort bestätigen
      </Button>
    </div>
  );
}
