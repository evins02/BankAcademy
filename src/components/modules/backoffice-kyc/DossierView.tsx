"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, CheckSquare, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BKO_KYC_LEVELS,
  type BkoKycScenario,
  type SubmissionResult,
  type FieldStatus,
} from "@/lib/backoffice-kyc";

interface DossierViewProps {
  scenario: BkoKycScenario;
  scenarioIndex: number;
  total: number;
  onSubmit: (result: SubmissionResult) => void;
}

function FieldIcon({ status }: { status: FieldStatus }) {
  if (status === "ok") return <CheckCircle2 size={14} className="shrink-0 text-green-500" />;
  if (status === "missing") return <XCircle size={14} className="shrink-0 text-red-500" />;
  return <AlertTriangle size={14} className="shrink-0 text-amber-500" />;
}

export function DossierView({ scenario, scenarioIndex, total, onSubmit }: DossierViewProps) {
  const [selectedIssues, setSelectedIssues] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<"selecting" | "commenting">("selecting");
  const [comment, setComment] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const levelConfig = BKO_KYC_LEVELS.find((l) => l.level === scenario.level)!;

  function toggleIssue(id: string) {
    setSelectedIssues((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleFreigeben() {
    onSubmit({
      type: "checklist",
      action: "freigeben",
      selectedIssueIds: [],
      comment: "",
      isCorrect: false,
    });
  }

  function handleZurueckweisen() {
    setPhase("commenting");
  }

  function handleAbsenden() {
    if (scenario.type !== "checklist") return;
    const realIssueIds = scenario.checklistItems.filter((i) => i.isIssue).map((i) => i.id);
    const selectedArray = [...selectedIssues];
    const allCaught = realIssueIds.every((id) => selectedIssues.has(id));
    const noFalsePositives = selectedArray.every(
      (id) => scenario.checklistItems.find((i) => i.id === id)?.isIssue === true
    );
    onSubmit({
      type: "checklist",
      action: "zurueckweisen",
      selectedIssueIds: selectedArray,
      comment: comment.trim(),
      isCorrect: allCaught && noFalsePositives && comment.trim().length > 0,
    });
  }

  function handleMCSubmit() {
    if (scenario.type !== "mc" || !selectedKey) return;
    onSubmit({
      type: "mc",
      selectedKey,
      isCorrect: selectedKey === scenario.correct,
    });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {/* Badge + progress */}
      <div className="flex items-center justify-between">
        <Badge variant={levelConfig.badgeVariant}>
          Level {scenario.level} – {levelConfig.label}
        </Badge>
        <span className="text-xs text-text-secondary">
          Fall {scenarioIndex + 1} von {total}
        </span>
      </div>

      {/* Briefing */}
      <div className="rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
          Briefing – Erstkontrolle
        </p>
        <p className="text-sm text-amber-900">{scenario.briefing}</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-5 gap-4">
        {/* Dossier */}
        <div className="col-span-3 overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          <div className="border-b border-border bg-gray-50 px-4 py-3">
            <p className="text-sm font-semibold text-text-primary">{scenario.dossierTitle}</p>
            <p className="text-xs text-text-secondary">KYC Dossier – Neueröffnung</p>
          </div>
          <div className="divide-y divide-border">
            {scenario.dossierFields.map((field, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5",
                  field.status === "missing" && "bg-red-50",
                  field.status === "suspicious" && "bg-amber-50"
                )}
              >
                <FieldIcon status={field.status} />
                <span className="w-44 shrink-0 text-xs text-text-secondary">{field.label}</span>
                <span
                  className={cn(
                    "flex-1 text-xs font-medium",
                    field.status === "ok" && "text-text-primary",
                    field.status === "missing" && "italic text-red-600",
                    field.status === "suspicious" && "text-amber-700"
                  )}
                >
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel: checklist or MC */}
        <div className="col-span-2 overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          {scenario.type === "checklist" ? (
            <>
              <div className="border-b border-border bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-text-primary">Mängel identifizieren</p>
                <p className="text-xs text-text-secondary">
                  Markiere alle Probleme im Dossier
                </p>
              </div>
              <div className="divide-y divide-border">
                {scenario.checklistItems.map((item) => {
                  const isSelected = selectedIssues.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleIssue(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                        isSelected ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"
                      )}
                    >
                      {isSelected ? (
                        <CheckSquare size={15} className="shrink-0 text-red-500" />
                      ) : (
                        <Square size={15} className="shrink-0 text-gray-300" />
                      )}
                      <span
                        className={cn(
                          "text-xs leading-snug",
                          isSelected ? "font-medium text-red-700" : "text-text-secondary"
                        )}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-border bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-text-primary">Beurteilung</p>
                <p className="text-xs text-text-secondary">{scenario.question}</p>
              </div>
              <div className="divide-y divide-border">
                {scenario.options.map((opt) => {
                  const isSelected = selectedKey === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setSelectedKey(opt.key)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                        isSelected
                          ? "border-l-2 border-l-primary bg-primary-light"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                          isSelected ? "bg-primary text-white" : "bg-gray-100 text-text-secondary"
                        )}
                      >
                        {opt.key}
                      </span>
                      <span
                        className={cn(
                          "text-xs leading-snug",
                          isSelected ? "font-medium text-text-primary" : "text-text-secondary"
                        )}
                      >
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action area */}
      {scenario.type === "checklist" ? (
        <div className="space-y-3">
          {phase === "selecting" && (
            <div className="flex gap-3">
              <button
                onClick={handleFreigeben}
                className="flex flex-1 items-center justify-center gap-2 rounded-DEFAULT border border-green-300 bg-green-50 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
              >
                <CheckCircle2 size={14} />
                Dossier freigeben
              </button>
              <button
                onClick={handleZurueckweisen}
                className="flex flex-1 items-center justify-center gap-2 rounded-DEFAULT bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <XCircle size={14} />
                Zurückweisen
              </button>
            </div>
          )}
          {phase === "commenting" && (
            <div className="space-y-3 rounded-DEFAULT border border-border bg-surface p-4 shadow-card">
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Kommentar an Kundenberater
                </p>
                <p className="mt-0.5 text-xs text-text-secondary">
                  Was muss korrigiert oder ergänzt werden?
                </p>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={scenario.commentHint}
                rows={4}
                className="w-full resize-none rounded-DEFAULT border border-border p-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button
                onClick={handleAbsenden}
                disabled={comment.trim().length === 0}
                className="w-full"
              >
                Absenden
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button onClick={handleMCSubmit} disabled={selectedKey === null} className="w-full">
          Antwort bestätigen
        </Button>
      )}
    </div>
  );
}
