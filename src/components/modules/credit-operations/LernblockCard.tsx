"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CO_LEVELS, type LevelNum } from "@/lib/credit-operations";

interface LernblockCardProps {
  level: LevelNum;
  onContinue: () => void;
}

const STEPS = [
  {
    num: 1,
    title: "Sicherheiten bestellt?",
    items: ["Grundpfand eingetragen", "Bürgschaft unterschrieben", "Verpfändung dokumentiert"],
  },
  {
    num: 2,
    title: "Alle Dokumente unterschrieben?",
    items: ["Kreditvertrag", "Allgemeine Kreditbedingungen"],
  },
  {
    num: 3,
    title: "Auszahlungsvoraussetzungen erfüllt?",
    items: ["Versicherungsnachweis", "Eigenmittelnachweis"],
  },
  {
    num: 4,
    title: "Wiedervorlage gesetzt?",
    items: ["Nächste Überprüfung terminiert", "Bei ETP: kürzere Frist"],
  },
];

export function LernblockCard({ level, onContinue }: LernblockCardProps) {
  const levelConfig = CO_LEVELS.find((l) => l.level === level)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center gap-2">
          <Badge variant={levelConfig.badgeVariant}>
            Level {level} – {levelConfig.label}
          </Badge>
        </div>

        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Lernblock
        </p>
        <h2 className="mb-2 text-lg font-bold text-text-primary">Credit Operations – Grundlagen</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Credit Operations prüft bevor ein Kredit ausgezahlt wird:
        </p>

        <div className="mb-6 space-y-3">
          {STEPS.map((step) => (
            <div key={step.num} className="overflow-hidden rounded-DEFAULT border border-border">
              <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {step.num}
                </div>
                <p className="text-sm font-semibold text-text-primary">{step.title}</p>
              </div>
              <div className="space-y-1 p-3">
                {step.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary" />
                    <p className="text-xs text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-DEFAULT border border-primary/30 bg-primary-light p-4">
          <p className="text-sm font-semibold text-primary">
            Grundsatz: Alle Punkte müssen erfüllt sein – keine Ausnahmen!
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Auszahlung erst wenn die vollständige Checkliste abgehakt ist.
          </p>
        </div>

        <Button onClick={onContinue} className="w-full">
          Zum ersten Szenario
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
