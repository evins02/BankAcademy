"use client";

import { useMemo } from "react";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AL_LEVELS, type AnlageDocumentCase } from "@/lib/anlagekunde";

interface DocumentCaseCardProps {
  scenario: AnlageDocumentCase;
  scenarioIndex: number;
  total: number;
  selectedDocs: Set<string>;
  onToggle: (id: string) => void;
  onSubmit: () => void;
}

export function DocumentCaseCard({
  scenario,
  scenarioIndex,
  total,
  selectedDocs,
  onToggle,
  onSubmit,
}: DocumentCaseCardProps) {
  const levelConfig = AL_LEVELS.find((l) => l.level === scenario.level)!;

  const shuffled = useMemo(() => {
    return [...scenario.documents].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {scenario.level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">
            Szenario {scenarioIndex + 1} von {total}
          </span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <h3 className="mb-1 text-base font-bold text-text-primary">{scenario.title}</h3>
          <p className="text-sm leading-relaxed text-text-primary">{scenario.briefing}</p>
        </div>

        <div className="mb-4 flex items-start gap-2 rounded-DEFAULT border border-border bg-background p-3">
          <FileText size={14} className="mt-0.5 shrink-0 text-text-secondary" />
          <p className="text-xs text-text-secondary">
            Wähle alle Dokumente / Abklärungen aus, die für diesen Fall notwendig sind. Falsche
            Auswahl kostet Punkte.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          {shuffled.map((doc) => {
            const checked = selectedDocs.has(doc.id);
            return (
              <button
                key={doc.id}
                onClick={() => onToggle(doc.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-DEFAULT border p-3 text-left text-sm transition-colors",
                  checked
                    ? "border-primary bg-primary-light text-text-primary"
                    : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:bg-primary-light/30 hover:text-text-primary"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
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
                <span className="flex-1">{doc.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs text-text-secondary">{selectedDocs.size} ausgewählt</p>
        </div>

        <Button onClick={onSubmit} className="w-full">
          Antwort bestätigen
        </Button>
      </div>
    </div>
  );
}
