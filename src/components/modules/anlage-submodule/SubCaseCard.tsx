"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SubmoduleCase, SubmoduleLevel } from "@/lib/anlage-submodule-types";

interface SubCaseCardProps {
  subCase: SubmoduleCase;
  levels: SubmoduleLevel[];
  caseIndex: number;
  total: number;
  selectedOption: string | null;
  onSelect: (key: string) => void;
  onSubmit: () => void;
}

export function SubCaseCard({
  subCase,
  levels,
  caseIndex,
  total,
  selectedOption,
  onSelect,
  onSubmit,
}: SubCaseCardProps) {
  const levelConfig = levels.find((l) => l.level === subCase.level)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {subCase.level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">
            Fall {caseIndex + 1} von {total}
          </span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Situation
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{subCase.situation}</p>
        </div>

        {subCase.inputData && (
          <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
            <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Kundendaten
            </p>
            <div className="divide-y divide-border">
              {subCase.inputData.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-2.5 text-sm"
                >
                  <span className="text-text-secondary">{row.label}</span>
                  <span className="font-medium text-text-primary">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {subCase.calculator &&
          subCase.calculator.map((section, si) => (
            <div
              key={si}
              className="mb-5 overflow-hidden rounded-DEFAULT border border-border"
            >
              <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                {section.heading ?? "Berechnung"}
              </p>
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
            </div>
          ))}

        <p className="mb-4 font-semibold text-text-primary">{subCase.question}</p>

        <div className="mb-6 flex flex-col gap-3">
          {subCase.options.map((opt) => (
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
              <span className="flex-1">{opt.text}</span>
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
