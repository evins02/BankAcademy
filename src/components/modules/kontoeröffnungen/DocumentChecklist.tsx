"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ALL_DOCUMENT_IDS,
  DOCUMENT_LABELS,
  type DocumentId,
  type KontoScenario,
} from "@/lib/kontoeröffnungen";

interface Props {
  scenario: KontoScenario;
  onComplete: (score: { correct: number; total: number }) => void;
}

export function DocumentChecklist({ scenario, onComplete }: Props) {
  const [selected, setSelected] = useState<Set<DocumentId>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: DocumentId) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const handleSubmit = () => setSubmitted(true);

  const required = new Set(scenario.requiredDocuments);
  const correctCount = ALL_DOCUMENT_IDS.filter(
    (id) => selected.has(id) === required.has(id)
  ).length;

  const getState = (id: DocumentId) => {
    if (!submitted) return "idle";
    const isSelected = selected.has(id);
    const isRequired = required.has(id);
    if (isRequired && isSelected) return "correct";
    if (!isRequired && !isSelected) return "correct";
    if (isRequired && !isSelected) return "missed";
    return "wrong";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase 1 — Welche Dokumente werden benötigt?</CardTitle>
        <p className="text-sm text-text-secondary">{scenario.description}</p>
      </CardHeader>
      <CardContent>
        <ul className="mb-6 grid gap-2 sm:grid-cols-2">
          {ALL_DOCUMENT_IDS.map((id) => {
            const state = getState(id);
            return (
              <li key={id}>
                <button
                  onClick={() => toggle(id)}
                  disabled={submitted}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-DEFAULT border px-4 py-3 text-left text-sm transition-colors",
                    !submitted && "hover:border-slate-400 hover:bg-slate-50",
                    selected.has(id) && !submitted && "border-slate-400 bg-slate-100 font-medium text-slate-700",
                    state === "correct" && "border-primary bg-primary-light text-primary",
                    state === "wrong" && "border-red-300 bg-red-50 text-red-600",
                    state === "missed" && "border-amber-300 bg-amber-50 text-amber-700",
                    state === "idle" && !selected.has(id) && "border-border bg-surface text-text-primary"
                  )}
                >
                  <span className="flex h-4 w-4 items-center justify-center">
                    {state === "correct" && <CheckCircle2 size={16} className="text-primary" />}
                    {state === "wrong" && <XCircle size={16} className="text-red-500" />}
                    {state === "missed" && <AlertCircle size={16} className="text-amber-500" />}
                    {state === "idle" && (
                      <span
                        className={cn(
                          "h-4 w-4 rounded border-2 transition-colors",
                          selected.has(id) ? "border-slate-500 bg-slate-500" : "border-gray-300"
                        )}
                      />
                    )}
                  </span>
                  {DOCUMENT_LABELS[id]}
                </button>
              </li>
            );
          })}
        </ul>

        {!submitted ? (
          <Button onClick={handleSubmit} disabled={selected.size === 0}>
            Auswertung anzeigen
          </Button>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-primary">
                <CheckCircle2 size={14} /> Richtig: {correctCount}/{ALL_DOCUMENT_IDS.length}
              </span>
              <span className="flex items-center gap-1.5 text-amber-600">
                <AlertCircle size={14} /> Legende: grün = korrekt, orange = vergessen, rot = falsch ausgewählt
              </span>
            </div>
            <Button onClick={() => onComplete({ correct: correctCount, total: ALL_DOCUMENT_IDS.length })}>
              Weiter zu Phase 2
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
