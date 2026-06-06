"use client";

import { useState } from "react";
import { CheckSquare, Square, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BKO_KYC_LEVELS,
  type BkoKycScenario,
  type SubmissionResult,
} from "@/lib/backoffice-kyc";

interface DossierViewProps {
  scenario: BkoKycScenario;
  scenarioIndex: number;
  total: number;
  onSubmit: (result: SubmissionResult) => void;
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
      <div className="rounded-DEFAULT border border-border bg-gray-50 p-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Auftrag
        </p>
        <p className="text-sm text-text-primary">{scenario.briefing}</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-5 gap-4">
        {/* Dossier */}
        <div className="col-span-3 overflow-hidden rounded-DEFAULT border border-border bg-white shadow-card">
          <div className="border-b border-border bg-white px-4 py-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                  KYC Dossier · Neueröffnung
                </p>
                <p className="mt-0.5 text-sm font-semibold text-text-primary">
                  {scenario.dossierTitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded border border-border px-2 py-1">
                <Shield size={10} className="text-text-secondary" />
                <span className="text-[10px] font-medium text-text-secondary">Vertraulich</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {scenario.dossierFields.map((field, i) => (
              <div key={i} className="flex items-center px-4 py-2.5">
                <span className="w-44 shrink-0 text-xs text-text-secondary">{field.label}</span>
                <span className="flex-1 text-xs text-text-primary">{field.value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-gray-50 px-4 py-2">
            <p className="text-[10px] text-text-secondary">
              Vertraulich – Nur für internen Gebrauch
            </p>
          </div>
        </div>

        {/* Right panel: checklist or MC */}
        <div className="col-span-2 overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          {scenario.type === "checklist" ? (
            <>
              <div className="border-b border-border bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-text-primary">Prüfpunkte</p>
                <p className="text-xs text-text-secondary">
                  Wähle alle Mängel, die du feststellst
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
                        isSelected ? "bg-primary-light hover:bg-primary-light/80" : "hover:bg-gray-50"
                      )}
                    >
                      {isSelected ? (
                        <CheckSquare size={15} className="shrink-0 text-primary" />
                      ) : (
                        <Square size={15} className="shrink-0 text-gray-300" />
                      )}
                      <span
                        className={cn(
                          "text-xs leading-snug",
                          isSelected ? "font-medium text-text-primary" : "text-text-secondary"
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
                <p className="text-sm font-semibold text-text-primary">Dein Entscheid</p>
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
                className="flex flex-1 items-center justify-center gap-2 rounded-DEFAULT border border-border bg-surface py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-50"
              >
                Dossier freigeben
              </button>
              <button
                onClick={handleZurueckweisen}
                className="flex flex-1 items-center justify-center gap-2 rounded-DEFAULT border border-border bg-text-primary py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
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
