"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scoreDocumentCase, type DocumentCase } from "@/lib/kontoeröffnung-privat";
import { ActiveRecallPrompt } from "@/components/shared/ActiveRecallPrompt";
import { BegründungsPrompt } from "@/components/shared/BegründungsPrompt";

interface DocumentResultCardProps {
  c: DocumentCase;
  selected: Set<string>;
  isLastCase: boolean;
  onNext: () => void;
}

function scoreColor(s: number) {
  if (s >= 80) return "text-green-700";
  if (s >= 60) return "text-amber-700";
  return "text-red-700";
}

function scoreBg(s: number) {
  if (s >= 80) return "bg-green-50 border-green-200";
  if (s >= 60) return "bg-amber-50 border-amber-200";
  return "bg-red-50 border-red-200";
}

export function DocumentResultCard({
  c,
  selected,
  isLastCase,
  onNext,
}: DocumentResultCardProps) {
  const { score, correct } = scoreDocumentCase(c, selected);
  const [recallDone, setRecallDone] = useState(false);

  const requiredMissed = c.documents.filter(
    (d) => d.status === "required" && !selected.has(d.id)
  );
  const forbiddenSelected = c.documents.filter(
    (d) => d.status === "forbidden" && selected.has(d.id)
  );
  const requiredHit = c.documents.filter(
    (d) => d.status === "required" && selected.has(d.id)
  );
  const optionalSelected = c.documents.filter(
    (d) => d.status === "optional" && selected.has(d.id)
  );

  const unsatisfiedGroups = (c.requiredOneOf ?? []).filter(
    (group) => !group.some((id) => selected.has(id))
  );

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Score banner */}
      <div className={cn("rounded-DEFAULT border p-4", scoreBg(score))}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Ergebnis
            </p>
            <p className={cn("mt-0.5 text-2xl font-bold", scoreColor(score))}>{score}%</p>
          </div>
          {correct ? (
            <CheckCircle2 size={32} className="text-green-600" />
          ) : (
            <XCircle size={32} className="text-red-600" />
          )}
        </div>
      </div>

      {/* Active recall before the breakdown is revealed */}
      <ActiveRecallPrompt onComplete={() => setRecallDone(true)} />

      {/* Full breakdown — only after recall is done */}
      {recallDone && (
        <>
          {/* Per-document feedback */}
          <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Auswertung pro Dokument</h3>
            <div className="space-y-2">
              {requiredHit.map((doc) => (
                <div key={doc.id} className="flex items-start gap-3 rounded-DEFAULT bg-green-50 p-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
                  <div>
                    <p className="text-xs font-semibold text-green-800">{doc.label}</p>
                    <p className="text-xs text-green-700">{doc.feedbackSelected}</p>
                  </div>
                </div>
              ))}

              {optionalSelected.map((doc) => (
                <div key={doc.id} className="flex items-start gap-3 rounded-DEFAULT bg-blue-50 p-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-blue-800">{doc.label}</p>
                    <p className="text-xs text-blue-700">{doc.feedbackSelected}</p>
                  </div>
                </div>
              ))}

              {forbiddenSelected.map((doc) => (
                <div key={doc.id} className="flex items-start gap-3 rounded-DEFAULT bg-red-50 p-3">
                  <XCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
                  <div>
                    <p className="text-xs font-semibold text-red-800">{doc.label}</p>
                    <p className="text-xs text-red-700">{doc.feedbackSelected}</p>
                  </div>
                </div>
              ))}

              {requiredMissed.map((doc) => (
                <div key={doc.id} className="flex items-start gap-3 rounded-DEFAULT bg-red-50 p-3">
                  <MinusCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                  <div>
                    <p className="text-xs font-semibold text-red-800">{doc.label} – nicht ausgewählt</p>
                    <p className="text-xs text-red-700">{doc.feedbackNotSelected}</p>
                  </div>
                </div>
              ))}

              {unsatisfiedGroups.map((group, i) => {
                const labels = group.map(
                  (id) => c.documents.find((d) => d.id === id)?.label ?? id
                );
                return (
                  <div key={i} className="flex items-start gap-3 rounded-DEFAULT bg-red-50 p-3">
                    <XCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
                    <div>
                      <p className="text-xs font-semibold text-red-800">Mindestens eines erforderlich</p>
                      <p className="text-xs text-red-700">
                        Sie müssen mindestens eines auswählen: {labels.join(" ODER ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* General feedback */}
          <div className="rounded-DEFAULT border border-border bg-background p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Erklärung
            </p>
            <p className="text-sm leading-relaxed text-text-primary">{c.generalFeedback}</p>
          </div>

          <BegründungsPrompt explanation={c.generalFeedback} />

          <Button onClick={onNext} className="w-full">
            {isLastCase ? "Zum Abschluss" : "Weiter →"}
          </Button>
        </>
      )}
    </div>
  );
}
