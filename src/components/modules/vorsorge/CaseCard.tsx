"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VORSORGE_LEVELS, type VorsorgeCase } from "@/lib/vorsorge";
import { SteuervorteilPanel } from "./SteuervorteilPanel";
import { TragbarkeitPanel } from "./TragbarkeitPanel";

interface CaseCardProps {
  vorsorgeCase: VorsorgeCase;
  caseIndex: number;
  total: number;
  selectedOption: string | null;
  onSelect: (key: string) => void;
  onSubmit: () => void;
}

export function CaseCard({
  vorsorgeCase,
  caseIndex,
  total,
  selectedOption,
  onSelect,
  onSubmit,
}: CaseCardProps) {
  const levelConfig = VORSORGE_LEVELS.find((l) => l.level === vorsorgeCase.level)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {vorsorgeCase.level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">
            Fall {caseIndex + 1} von {total}
          </span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Situation
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{vorsorgeCase.situation}</p>
        </div>

        {/* Optional calculator panel */}
        {vorsorgeCase.calculator?.type === "steuervorteil" && (
          <SteuervorteilPanel calc={vorsorgeCase.calculator} />
        )}
        {vorsorgeCase.calculator?.type === "tragbarkeit-rente" && (
          <TragbarkeitPanel calc={vorsorgeCase.calculator} />
        )}

        <p className="mb-4 font-semibold text-text-primary">{vorsorgeCase.question}</p>

        <div className="mb-6 flex flex-col gap-3">
          {vorsorgeCase.options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className={cn(
                "flex items-start gap-3 rounded-DEFAULT border p-4 text-left text-sm transition-colors",
                selectedOption === opt.key
                  ? "border-primary bg-primary-light text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:bg-primary-light/30 hover:text-text-primary"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  selectedOption === opt.key
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text-secondary"
                )}
              >
                {opt.key}
              </span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>

        <Button onClick={onSubmit} disabled={selectedOption === null} className="w-full">
          Antwort bestätigen
        </Button>
      </div>
    </div>
  );
}
