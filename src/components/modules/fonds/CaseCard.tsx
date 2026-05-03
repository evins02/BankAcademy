"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FONDS_LEVELS, type FondsCase } from "@/lib/fonds";

// Mini strategy reference shown during cases
const STRATEGY_MINI = [
  { emoji: "🔥", label: "Aggressiv", stocks: "~100% Aktien" },
  { emoji: "🚀", label: "Wachstum", stocks: "~75%" },
  { emoji: "⚖️", label: "Ausgewogen", stocks: "~50%" },
  { emoji: "📈", label: "Ertrag", stocks: "20–25%" },
  { emoji: "💰", label: "Sparkonto", stocks: "0%" },
];

interface CaseCardProps {
  fondsCase: FondsCase;
  caseIndex: number;
  total: number;
  selectedOption: string | null;
  onSelect: (key: string) => void;
  onSubmit: () => void;
}

export function CaseCard({
  fondsCase,
  caseIndex,
  total,
  selectedOption,
  onSelect,
  onSubmit,
}: CaseCardProps) {
  const levelConfig = FONDS_LEVELS.find((l) => l.level === fondsCase.level)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {fondsCase.level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">
            Fall {caseIndex + 1} von {total}
          </span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Situation
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{fondsCase.situation}</p>
        </div>

        {/* Mini strategy ladder reference */}
        <div className="mb-5 flex items-center gap-2 overflow-x-auto rounded-DEFAULT border border-border bg-gray-50 px-3 py-2">
          {STRATEGY_MINI.map((s, i) => (
            <div key={s.label} className="flex shrink-0 items-center gap-1.5">
              {i > 0 && <span className="text-border">›</span>}
              <span className="text-sm">{s.emoji}</span>
              <div>
                <p className="text-[10px] font-semibold text-text-primary">{s.label}</p>
                <p className="text-[9px] text-text-secondary">{s.stocks}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-4 font-semibold text-text-primary">{fondsCase.question}</p>

        <div className="mb-6 flex flex-col gap-3">
          {fondsCase.options.map((opt) => (
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
