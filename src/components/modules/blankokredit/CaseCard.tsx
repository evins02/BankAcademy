"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BK_LEVELS, type BlankokreditCase, type OptionKey } from "@/lib/blankokredit";

interface CaseCardProps {
  bkCase: BlankokreditCase;
  caseIndex: number;
  total: number;
  selectedOption: OptionKey | null;
  onSelect: (key: OptionKey) => void;
  onSubmit: () => void;
}

export function CaseCard({
  bkCase,
  caseIndex,
  total,
  selectedOption,
  onSelect,
  onSubmit,
}: CaseCardProps) {
  const levelConfig = BK_LEVELS.find((l) => l.level === bkCase.level)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {bkCase.level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">
            Fall {caseIndex + 1} von {total}
          </span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Situation
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{bkCase.briefing}</p>
        </div>

        {bkCase.inputData && (
          <div className="mb-4 overflow-hidden rounded-DEFAULT border border-border">
            <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Kundendaten
            </p>
            <div className="divide-y divide-border">
              {bkCase.inputData.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-2 text-sm"
                >
                  <span className="text-text-secondary">{row.label}</span>
                  <span className="font-mono text-text-primary">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {bkCase.calculator && (
          <div className="mb-5 space-y-3">
            {bkCase.calculator.map((section, si) => (
              <div key={si} className="overflow-hidden rounded-DEFAULT border border-border">
                {section.heading && (
                  <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    {section.heading}
                  </p>
                )}
                {!section.heading && (
                  <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    Berechnung
                  </p>
                )}
                <div className="divide-y divide-border">
                  {section.rows.map((row, ri) => {
                    if (row.type === "divider") {
                      return <div key={ri} className="border-t-2 border-border" />;
                    }
                    return (
                      <div
                        key={ri}
                        className={cn(
                          "flex items-center justify-between px-4 py-2.5 text-sm",
                          row.type === "total" && "bg-gray-50 font-semibold"
                        )}
                      >
                        <span
                          className={cn(
                            "text-text-secondary",
                            row.type === "total" && "text-text-primary"
                          )}
                        >
                          {row.label}
                        </span>
                        <span className="font-mono text-text-primary">{row.value}</span>
                      </div>
                    );
                  })}
                </div>
                {section.verdict && (
                  <div
                    className={cn(
                      "px-4 py-3",
                      section.verdict.ok && !section.verdict.warning && "bg-primary-light",
                      section.verdict.ok && section.verdict.warning && "bg-amber-50",
                      !section.verdict.ok && "bg-red-50"
                    )}
                  >
                    <p
                      className={cn(
                        "font-mono text-sm font-bold",
                        section.verdict.ok && !section.verdict.warning && "text-primary",
                        section.verdict.ok && section.verdict.warning && "text-amber-700",
                        !section.verdict.ok && "text-red-700"
                      )}
                    >
                      {section.verdict.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mb-4 font-semibold text-text-primary">{bkCase.question}</p>

        <div className="mb-6 flex flex-col gap-3">
          {bkCase.options.map((opt) => (
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
