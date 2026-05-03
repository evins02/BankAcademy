"use client";

import { useMemo } from "react";
import { FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DocumentCase } from "@/lib/kontoeröffnung-privat";

interface DocumentCaseCardProps {
  c: DocumentCase;
  caseNum: number;
  total: number;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSubmit: () => void;
}

export function DocumentCaseCard({
  c,
  caseNum,
  total,
  selected,
  onToggle,
  onSubmit,
}: DocumentCaseCardProps) {
  const shuffled = useMemo(() => {
    return [...c.documents].sort(() => Math.random() - 0.5);
  }, [c.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Fall {caseNum} / {total}
        </p>
        <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent">
          Dokumente auswählen
        </span>
      </div>

      {/* Case card */}
      <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
        <h3 className="mb-1 text-base font-bold text-text-primary">{c.title}</h3>
        {c.today && (
          <div className="mb-3 flex items-center gap-1.5 text-xs text-amber-700">
            <Calendar size={12} />
            <span>Heute: {c.today}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed text-text-primary">{c.briefing}</p>
      </div>

      {/* Instruction */}
      <div className="rounded-DEFAULT border border-border bg-background p-3">
        <div className="flex items-start gap-2">
          <FileText size={14} className="mt-0.5 shrink-0 text-text-secondary" />
          <p className="text-xs text-text-secondary">
            Wählen Sie alle Unterlagen / Schritte aus, die für diese Kontoeröffnung notwendig oder
            sinnvoll sind. Falsche Auswahl kostet Punkte.
          </p>
        </div>
      </div>

      {/* Document checkboxes */}
      <div className="space-y-2">
        {shuffled.map((doc) => {
          const checked = selected.has(doc.id);
          return (
            <button
              key={doc.id}
              onClick={() => onToggle(doc.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-DEFAULT border p-3 text-left text-sm transition-colors",
                checked
                  ? "border-primary bg-primary-light"
                  : "border-border bg-surface hover:bg-background"
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                  checked ? "border-primary bg-primary" : "border-gray-300"
                )}
              >
                {checked && (
                  <svg viewBox="0 0 12 9" fill="none" className="h-3 w-3">
                    <path
                      d="M1 4l3.5 3.5L11 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={cn("flex-1", checked ? "text-text-primary" : "text-text-primary")}>
                {doc.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-secondary">{selected.size} ausgewählt</p>
        <Button onClick={onSubmit}>Einreichen</Button>
      </div>
    </div>
  );
}
