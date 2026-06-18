"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DOCUMENT_LABELS,
  type DocumentId,
  type KontoScenario,
} from "@/lib/kontoeröffnungen";

interface Props {
  scenario: KontoScenario;
  onComplete: (score: { correct: number; total: number }) => void;
}

export function DossierReview({ scenario, onComplete }: Props) {
  const [flagged, setFlagged] = useState<Set<DocumentId>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  // Documents to show in dossier section + possibly-missing section
  const dossierSet = new Set(scenario.dossierDocuments);
  // Use explicit list if provided (includes distractors); otherwise compute from required docs
  const possiblyMissing: DocumentId[] =
    scenario.possiblyMissingOptions ??
    scenario.requiredDocuments.filter((id) => !dossierSet.has(id));
  // Wrong-type issue docs (in dossier but shouldn't be)
  const wrongIssues = new Set(
    scenario.issues.filter((i) => i.type === "wrong").map((i) => i.documentId)
  );
  const missingIssues = new Set(
    scenario.issues.filter((i) => i.type === "missing").map((i) => i.documentId)
  );

  const toggleFlag = (id: DocumentId) => {
    if (submitted) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const correctFlags = Array.from(flagged).filter(
    (id) => wrongIssues.has(id) || missingIssues.has(id)
  ).length;
  const totalIssues = scenario.issues.length;

  const getFlagState = (id: DocumentId, section: "dossier" | "missing") => {
    if (!submitted) return "idle";
    const isFlagged = flagged.has(id);
    const isActualIssue =
      section === "dossier" ? wrongIssues.has(id) : missingIssues.has(id);
    if (isFlagged && isActualIssue) return "correct";
    if (!isFlagged && isActualIssue) return "missed";
    if (isFlagged && !isActualIssue) return "wrong";
    return "ok";
  };

  const DocChip = ({
    id,
    section,
  }: {
    id: DocumentId;
    section: "dossier" | "missing";
  }) => {
    const state = getFlagState(id, section);
    const isFlagged = flagged.has(id);
    return (
      <button
        onClick={() => toggleFlag(id)}
        disabled={submitted}
        className={cn(
          "flex items-center gap-2 rounded-DEFAULT border px-4 py-2.5 text-sm transition-colors",
          !submitted && "hover:border-slate-300 hover:bg-slate-50",
          isFlagged && !submitted && "border-slate-400 bg-slate-100 text-slate-700 font-medium",
          state === "correct" && "border-primary bg-primary-light text-primary",
          state === "missed" && "border-amber-300 bg-amber-50 text-amber-700",
          state === "wrong" && "border-red-300 bg-red-50 text-red-600",
          state === "ok" && "border-border bg-surface text-text-primary"
        )}
      >
        <FileText size={14} className="shrink-0" />
        {DOCUMENT_LABELS[id]}
        {state === "correct" && <CheckCircle2 size={14} className="ml-auto text-primary" />}
        {state === "missed" && <AlertCircle size={14} className="ml-auto text-amber-500" />}
        {state === "wrong" && <XCircle size={14} className="ml-auto text-red-500" />}
      </button>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase 2 — Dossier prüfen</CardTitle>
        <p className="text-sm text-text-secondary">
          Klicken Sie auf fehlerhafte Dokumente im Dossier und markieren Sie
          fehlende Dokumente.
        </p>
      </CardHeader>
      <CardContent>
        {/* In-dossier documents */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Im Dossier vorhanden — auf fehlerhafte klicken
          </p>
          <div className="flex flex-wrap gap-2">
            {scenario.dossierDocuments.map((id) => (
              <DocChip key={id} id={id} section="dossier" />
            ))}
          </div>
        </div>

        {/* Possibly missing documents */}
        {possiblyMissing.length > 0 && (
          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Möglicherweise fehlend — auf fehlende klicken
            </p>
            <div className="flex flex-wrap gap-2">
              {possiblyMissing.map((id) => (
                <DocChip key={id} id={id} section="missing" />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)}>
            Auswertung anzeigen
          </Button>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {correctFlags}/{totalIssues} Probleme korrekt identifiziert
            </span>
            <Button
              onClick={() =>
                onComplete({ correct: correctFlags, total: totalIssues })
              }
            >
              Weiter zu Phase 3
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
