"use client";

import { useState } from "react";
import { Clock, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Difficulty } from "./sim-types";

export interface BriefingCustomer {
  initials: string;
  name: string;
  statusLabel: string;
  fields: { label: string; value: string }[];
  mood: {
    label: string;
    colorClass: string;
    dotClass: string;
  };
  alertText: string;
  appointmentLabel: string;
}

export interface DifficultyOption {
  key: Difficulty;
  dot: string;
  label: string;
  description: string;
}

interface PracticeBriefingScreenProps {
  onStart: (difficulty: Difficulty) => void;
  customer: BriefingCustomer;
  difficulties: DifficultyOption[];
}

export function PracticeBriefingScreen({ onStart, customer, difficulties }: PracticeBriefingScreenProps) {
  const defaultDiff = difficulties.find((d) => d.key === "fortgeschritten")?.key ?? difficulties[0].key;
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDiff);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            {customer.appointmentLabel}
          </span>
        </div>

        <div className="overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          <div className="border-b border-border bg-background px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                {customer.initials}
              </div>
              <div>
                <p className="font-semibold text-text-primary">{customer.name}</p>
                <p className="text-xs text-text-secondary">{customer.statusLabel}</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {customer.fields.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-5 py-2.5 text-sm">
                <span className="text-text-secondary">{label}</span>
                <span className="font-medium text-text-primary">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-2.5 text-sm">
              <span className="text-text-secondary">Stimmung</span>
              <span className={cn("flex items-center gap-1.5 font-semibold", customer.mood.colorClass)}>
                <span className={cn("h-2 w-2 rounded-full", customer.mood.dotClass)} />
                {customer.mood.label}
              </span>
            </div>
          </div>

          <div className="border-t border-border bg-amber-50 px-5 py-3">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs text-amber-800">{customer.alertText}</p>
            </div>
          </div>
        </div>

        <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Schwierigkeitsstufe
          </p>
          <div className="flex flex-col gap-2">
            {difficulties.map((d) => (
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
