"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { TragbarkeitCase, OptionKey } from "@/lib/tragbarkeit";

interface CaseCardProps {
  sectionCase: TragbarkeitCase;
  caseIndex: number;
  total: number;
  selectedOption: OptionKey | null;
  onSelect: (key: OptionKey) => void;
  onSubmit: () => void;
}

export function CaseCard({
  sectionCase,
  caseIndex,
  total,
  selectedOption,
  onSelect,
  onSubmit,
}: CaseCardProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Fall {sectionCase.id}
          </span>
          <span className="text-xs text-text-secondary">
            {caseIndex + 1} / {total}
          </span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Situation
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-text-primary">
            {sectionCase.briefing}
          </p>
        </div>

        {sectionCase.calcRows && <CalcTable rows={sectionCase.calcRows} />}
        {sectionCase.deckungsgradData && (
          <DeckungsgradCalculator data={sectionCase.deckungsgradData} />
        )}

        <p className="mb-4 font-semibold text-text-primary">{sectionCase.question}</p>

        <div className="mb-6 flex flex-col gap-3">
          {sectionCase.options.map((opt) => (
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

function CalcTable({ rows }: { rows: TragbarkeitCase["calcRows"] }) {
  if (!rows) return null;
  return (
    <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
      <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Rechnung
      </p>
      <div className="divide-y divide-border">
        {rows.map((row, i) => {
          if (row.type === "divider") {
            return <div key={i} className="border-t-2 border-border" />;
          }
          return (
            <div
              key={i}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-sm",
                (row.type === "total-ok" || row.type === "total-error" || row.type === "total-neutral") && "bg-gray-50 font-semibold"
              )}
            >
              <span className="text-text-secondary">{row.label}</span>
              <span className="font-mono text-text-primary">{row.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeckungsgradCalculator({
  data,
}: {
  data: NonNullable<TragbarkeitCase["deckungsgradData"]>;
}) {
  return (
    <div className="mb-5 space-y-3">
      <div className="overflow-hidden rounded-DEFAULT border border-border">
        <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Eingabewerte
        </p>
        <div className="divide-y divide-border">
          {data.inputs.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-2.5 text-sm"
            >
              <span className="text-text-secondary">{row.label}</span>
              <span className="font-mono text-text-primary">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-DEFAULT border border-border">
        <p className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Berechnung
        </p>
        <div className="space-y-1 p-4">
          {data.calcLines.map((line, i) => (
            <p key={i} className="font-mono text-xs text-text-secondary">
              {line}
            </p>
          ))}
          <p className="mt-3 rounded-DEFAULT bg-gray-50 px-3 py-2 font-mono text-sm font-bold text-text-primary">
            {data.resultLine}
          </p>
        </div>
      </div>
    </div>
  );
}
