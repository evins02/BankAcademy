"use client";

import { useState } from "react";
import { Clock, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Difficulty } from "./sim-types";

interface AiBriefingScreenProps {
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
    description: "Thomas ist geduldig, stellt einfache Fragen.",
  },
  {
    key: "fortgeschritten",
    dot: "bg-yellow-400",
    label: "Fortgeschritten",
    description: "Thomas ist normal – fragt nach, braucht Überzeugungsarbeit.",
  },
  {
    key: "challenge",
    dot: "bg-red-500",
    label: "Challenge-Niveau",
    description: "Thomas ist sehr anspruchsvoll, verweist auf Konkurrenzbanken.",
  },
];

export function AiBriefingScreen({ onStart }: AiBriefingScreenProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("fortgeschritten");

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        {/* CRM-style header */}
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Nächster Termin · 14:30 Uhr
          </span>
        </div>

        {/* Customer dossier card */}
        <div className="overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          <div className="border-b border-border bg-background px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                TK
              </div>
              <div>
                <p className="font-semibold text-text-primary">Thomas Kowalski</p>
                <p className="text-xs text-text-secondary">Neukunde</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {[
              { label: "Alter", value: "28 Jahre" },
              { label: "Beruf", value: "UX Designer (Startup)" },
              { label: "Wohnort", value: "Zürich (seit 2 Monaten)" },
              { label: "Status", value: "Neukunde" },
              { label: "Anliegen", value: "Kontoeröffnung Privatkonto" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-5 py-2.5 text-sm">
                <span className="text-text-secondary">{label}</span>
                <span className="font-medium text-text-primary">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-2.5 text-sm">
              <span className="text-text-secondary">Priorität</span>
              <span className="flex items-center gap-1.5 font-semibold text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Dringend
              </span>
            </div>
          </div>

          <div className="border-t border-border bg-amber-50 px-5 py-3">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs text-amber-800">
                Kunde wirkt ungeduldig – Gehalt kommt nächste Woche, braucht Konto dringend.
              </p>
            </div>
          </div>
        </div>

        {/* Difficulty selector */}
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
