"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type LückentextCase } from "@/lib/lückentext";

interface LückentextCardProps {
  c: LückentextCase;
  caseIndex: number;
  total: number;
  levelLabel: string;
  badgeVariant: "green" | "orange" | "red";
  answer: string;
  onAnswerChange: (val: string) => void;
  onSubmit: () => void;
}

export function LückentextCard({
  c,
  caseIndex,
  total,
  levelLabel,
  badgeVariant,
  answer,
  onAnswerChange,
  onSubmit,
}: LückentextCardProps) {
  const [before, after] = c.question.split("___");

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && answer.trim()) onSubmit();
  }

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

        {c.briefing && (
          <div className="mb-4 rounded-DEFAULT border border-border bg-background p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-1">
              Situation
            </p>
            <p className="text-sm leading-relaxed text-text-primary">{c.briefing}</p>
          </div>
        )}

        <div className="mb-6 rounded-DEFAULT bg-primary-light/40 border border-primary/20 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-3">
            Lückentext
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-text-primary leading-relaxed">
            <span>{before}</span>
            <input
              type="text"
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              onKeyDown={handleKey}
              placeholder="?"
              className="inline-block w-28 rounded-lg border-2 border-primary/40 bg-surface px-2 py-1 text-center text-sm font-semibold text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary transition-colors"
            />
            {c.unit && (
              <span className="text-xs font-medium text-text-secondary">{c.unit}</span>
            )}
            {after && <span>{after}</span>}
          </div>
        </div>

        <Button
          onClick={onSubmit}
          disabled={!answer.trim()}
          className="w-full"
        >
          Überprüfen
        </Button>
      </div>
    </div>
  );
}
