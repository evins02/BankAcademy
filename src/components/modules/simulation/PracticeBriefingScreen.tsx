"use client";

import { useState } from "react";
import { Clock, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Difficulty } from "./sim-types";

interface PracticeBriefingScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: {
  key: Difficulty;
  dot: string;
  label: string;
  description: string;
}[] = [
  {
    key: "einsteiger",
    dot: "bg-green-500",
    label: "Einsteiger",
    description: "Markus ist enttäuscht aber offen für Erklärungen.",
  },
  {
    key: "fortgeschritten",
    dot: "bg-yellow-400",
    label: "Fortgeschritten",
    description: "Markus ist kritisch und erwartet klare Antworten.",
  },
  {
    key: "challenge",
    dot: "bg-red-500",
    label: "Challenge-Niveau",
    description: "Markus vergleicht mit Konkurrenz und erwägt Portfolio-Abzug.",
  },
];

export function PracticeBriefingScreen({ onStart }: PracticeBriefingScreenProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("fortgeschritten");

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Jahresgespräch · 10:00 Uhr
          </span>
        </div>

        <div className="overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          <div className="border-b border-border bg-background px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                MS
              </div>
              <div>
                <p className="font-semibold text-text-primary">Markus Steiner</p>
                <p className="text-xs text-text-secondary">Bestandeskunde · 12 Jahre</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {[
              { label: "Alter", value: "45 Jahre" },
              { label: "Beruf", value: "Techniker / Angestellter" },
              { label: "Wohnort", value: "Winterthur" },
              { label: "Portfolio", value: "CHF 280\'000" },
              { label: "Allokation", value: "60% Aktien · 30% Obl. · 10% Cash" },
              { label: "Rendite Ziel", value: "4–5% p.a." },
              { label: "Rendite IST", value: "–2% (letztes Jahr)" },
              { label: "Anliegen", value: "Jahresgespräch / Performance-Review" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-5 py-2.5 text-sm">
                <span className="text-text-secondary">{label}</span>
                <span className="font-medium text-text-primary">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-2.5 text-sm">
              <span className="text-text-secondary">Stimmung</span>
              <span className="flex items-center gap-1.5 font-semibold text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Angespannt
              </span>
            </div>
          </div>

          <div className="border-t border-border bg-amber-50 px-5 py-3">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs text-amber-800">
                Langjähriger Kunde ist enttäuscht über die Performance. Erwähnte in der Terminnotiz, dass er Vergleiche mit anderen Banken angestellt hat.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Schwierigkeitsstufe
          </p>
          <div className="flex flex-col gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.key}
                onClick={() => setDifficulty(d.key)}
                className={cn(
                  "flex items-center gap-3 rounded-DEFAULT border p-3 text-left text-sm transition-colors",
                  difficulty === d.key
                    ? "border-primary bg-primary-light"
                    : "border-border bg-surface hover:bg-background"
                )}
              >
                <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", d.dot)} />
                <div>
                  <p className="font-semibold text-text-primary">{d.label}</p>
                  <p className="text-xs text-text-secondary">{d.description}</p>
                </div>
                {difficulty === d.key && (
                  <span className="ml-auto text-xs font-semibold text-primary">Ausgewählt</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={() => onStart(difficulty)} className="w-full">
          Gespräch starten
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
