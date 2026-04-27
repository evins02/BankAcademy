"use client";

import { CheckCircle2, XCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BKO_KYC_LEVELS,
  type BkoKycScenario,
  type SubmissionResult,
} from "@/lib/backoffice-kyc";

interface FeedbackCardProps {
  scenario: BkoKycScenario;
  submission: SubmissionResult;
  scenarioIndex: number;
  total: number;
  isLastScenario: boolean;
  onNext: () => void;
}

export function FeedbackCard({
  scenario,
  submission,
  scenarioIndex,
  total,
  isLastScenario,
  onNext,
}: FeedbackCardProps) {
  const levelConfig = BKO_KYC_LEVELS.find((l) => l.level === scenario.level)!;
  const isCorrect = submission.isCorrect;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="space-y-5 rounded-DEFAULT bg-surface p-6 shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {scenario.level} – {levelConfig.label}
          </Badge>
          <span className="text-xs text-text-secondary">
            Fall {scenarioIndex + 1} von {total}
          </span>
        </div>

        {/* Result banner */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-DEFAULT p-4",
            isCorrect ? "bg-primary-light" : "bg-red-50"
          )}
        >
          {isCorrect ? (
            <CheckCircle2 size={20} className="shrink-0 text-primary" />
          ) : (
            <XCircle size={20} className="shrink-0 text-red-600" />
          )}
          <p className={cn("font-semibold", isCorrect ? "text-primary" : "text-red-700")}>
            {isCorrect ? "Richtig!" : "Nicht optimal"}
          </p>
        </div>

        {/* Checklist feedback */}
        {submission.type === "checklist" && scenario.type === "checklist" && (
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Erkannte Mängel
            </p>
            <div className="space-y-1.5">
              {scenario.checklistItems
                .filter((item) => item.isIssue)
                .map((item) => {
                  const caught = submission.selectedIssueIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-2 rounded-DEFAULT border p-2.5 text-xs",
                        caught
                          ? "border-primary/20 bg-primary-light/40 text-text-primary"
                          : "border-red-200 bg-red-50 text-red-700"
                      )}
                    >
                      {caught ? (
                        <CheckCircle2 size={13} className="shrink-0 text-primary" />
                      ) : (
                        <XCircle size={13} className="shrink-0 text-red-500" />
                      )}
                      <span className="flex-1">{item.label}</span>
                      {!caught && (
                        <span className="text-red-500">Nicht erkannt</span>
                      )}
                    </div>
                  );
                })}
              {/* False positives */}
              {submission.selectedIssueIds
                .filter(
                  (id) =>
                    !scenario.checklistItems.find((i) => i.id === id)?.isIssue
                )
                .map((id) => {
                  const item = scenario.checklistItems.find((i) => i.id === id);
                  return item ? (
                    <div
                      key={id}
                      className="flex items-center gap-2 rounded-DEFAULT border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-700"
                    >
                      <AlertTriangle size={13} className="shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      <span>Fälschlicherweise markiert</span>
                    </div>
                  ) : null;
                })}
              {/* Student's comment */}
              {submission.action === "zurueckweisen" && submission.comment && (
                <div className="mt-2 rounded-DEFAULT border border-border bg-background p-3">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    Dein Kommentar
                  </p>
                  <p className="text-xs text-text-primary">{submission.comment}</p>
                </div>
              )}
              {submission.action === "freigeben" && (
                <div className="mt-1 rounded-DEFAULT border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                  Du hast das Dossier freigegeben, obwohl Mängel vorhanden waren.
                </div>
              )}
            </div>
          </div>
        )}

        {/* MC feedback */}
        {submission.type === "mc" && scenario.type === "mc" && (
          <div className="space-y-2">
            {scenario.options.map((opt) => {
              const isSelected = opt.key === submission.selectedKey;
              const isCorrectOpt = opt.key === scenario.correct;
              return (
                <div
                  key={opt.key}
                  className={cn(
                    "flex items-start gap-3 rounded-DEFAULT border p-3 text-xs",
                    isCorrectOpt
                      ? "border-primary bg-primary-light text-text-primary"
                      : isSelected
                        ? "border-red-300 bg-red-50 text-text-primary"
                        : "border-border bg-surface text-text-secondary opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                      isCorrectOpt
                        ? "bg-primary text-white"
                        : isSelected
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-text-secondary"
                    )}
                  >
                    {opt.key}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                  {isCorrectOpt && (
                    <CheckCircle2
                      size={13}
                      className="ml-auto shrink-0 self-center text-primary"
                    />
                  )}
                  {isSelected && !isCorrectOpt && (
                    <XCircle
                      size={13}
                      className="ml-auto shrink-0 self-center text-red-500"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Explanation */}
        <div className="rounded-DEFAULT border border-border bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Erklärung
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{scenario.feedback}</p>
        </div>

        <Button onClick={onNext} className="w-full">
          {isLastScenario ? "Level abschliessen" : "Nächster Fall"}
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
