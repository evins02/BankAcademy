"use client";

import { useEffect, useState } from "react";
import { StickyNote } from "lucide-react";
import { getNotes } from "@/lib/notesData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KYC_LEVELS, type KycScenario, type OptionKey } from "@/lib/kyc";

interface ScenarioCardProps {
  scenario: KycScenario;
  scenarioIndex: number;
  total: number;
  selectedOption: OptionKey | null;
  onSelect: (key: OptionKey) => void;
  onSubmit: () => void;
  onOpenNote: () => void;
}

export function ScenarioCard({
  scenario,
  scenarioIndex,
  total,
  selectedOption,
  onSelect,
  onSubmit,
  onOpenNote,
}: ScenarioCardProps) {
  const levelConfig = KYC_LEVELS.find((l) => l.level === scenario.level)!;
  const [hasNote, setHasNote] = useState(false);

  useEffect(() => {
    const notes = getNotes();
    setHasNote(!!notes[`kyc-${scenario.id}`]?.content?.trim());
  }, [scenario.id]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {scenario.level} – {levelConfig.label}
          </Badge>
          <button
            onClick={onOpenNote}
            className={cn(
              "flex items-center gap-1 rounded-lg border px-2 py-1 text-xs transition-colors",
              hasNote
                ? "border-amber-300 bg-amber-50 text-amber-700"
                : "border-border text-text-secondary hover:border-primary/40 hover:text-primary"
            )}
            title="Notiz zu diesem Szenario"
            aria-label="Notiz öffnen"
          >
            <StickyNote size={11} />
            {hasNote ? "Notiz" : "📝"}
          </button>
          <span className="text-xs text-text-secondary">
            Szenario {scenarioIndex + 1} von {total}
          </span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Situation
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{scenario.situation}</p>
        </div>

        <p className="mb-4 font-semibold text-text-primary">{scenario.question}</p>

        <div className="mb-5 flex flex-col gap-3">
          {scenario.options.map((opt) => (
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
