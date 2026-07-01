"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type OffeneFrageCase } from "@/lib/offene-frage";

interface OffeneFrageCardProps {
  c: OffeneFrageCase;
  caseIndex: number;
  total: number;
  levelLabel: string;
  badgeVariant: "green" | "orange" | "red";
  answer: string;
  onAnswerChange: (val: string) => void;
  onSubmit: () => void;
}

const MIN_CHARS = 20;

export function OffeneFrageCard({
  c,
  caseIndex,
  total,
  levelLabel,
  badgeVariant,
  answer,
  onAnswerChange,
  onSubmit,
}: OffeneFrageCardProps) {
  const charCount = answer.trim().length;
  const canSubmit = charCount >= MIN_CHARS;

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

        <div className="mb-5 rounded-DEFAULT border border-border bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Situation
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{c.briefing}</p>
        </div>

        <div className="mb-4">
          <p className="mb-3 text-base font-semibold text-text-primary">{c.question}</p>
          <textarea
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            rows={5}
            placeholder="Beschreibe dein Vorgehen..."
            className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors"
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] text-text-secondary">
              {charCount < MIN_CHARS
                ? `Noch ${MIN_CHARS - charCount} Zeichen`
                : `${charCount} Zeichen`}
            </span>
            <span className="text-[11px] text-text-secondary">2–4 Sätze empfohlen</span>
          </div>
        </div>

        <Button onClick={onSubmit} disabled={!canSubmit} className="w-full">
          Antwort einreichen →
        </Button>
      </div>
    </div>
  );
}
