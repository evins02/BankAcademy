"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, MinusCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AL_LEVELS, scoreDocumentCase, type AnlageDocumentCase } from "@/lib/anlagekunde";
import { Confetti } from "@/components/shared/Confetti";
import { addXP } from "@/lib/xpData";
import { ActiveRecallPrompt } from "@/components/shared/ActiveRecallPrompt";
import { BegründungsPrompt } from "@/components/shared/BegründungsPrompt";

interface DocumentFeedbackPanelProps {
  scenario: AnlageDocumentCase;
  selectedDocs: Set<string>;
  scenarioIndex: number;
  total: number;
  isLastScenario: boolean;
  onNext: () => void;
}

export function DocumentFeedbackPanel({
  scenario,
  selectedDocs,
  scenarioIndex,
  total,
  isLastScenario,
  onNext,
}: DocumentFeedbackPanelProps) {
  const { score, correct } = scoreDocumentCase(scenario, selectedDocs);
  const levelConfig = AL_LEVELS.find((l) => l.level === scenario.level)!;
  const xp = correct ? 100 : 10;
  const [showConfetti, setShowConfetti] = useState(correct);
  const [recallDone, setRecallDone] = useState(false);

  useEffect(() => {
    addXP(xp);
    if (!correct) return;
    const t = setTimeout(() => setShowConfetti(false), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requiredHit = scenario.documents.filter(
    (d) => d.status === "required" && selectedDocs.has(d.id)
  );
  const requiredMissed = scenario.documents.filter(
    (d) => d.status === "required" && !selectedDocs.has(d.id)
  );
  const forbiddenSelected = scenario.documents.filter(
    (d) => d.status === "forbidden" && selectedDocs.has(d.id)
  );
  const forbiddenAvoided = scenario.documents.filter(
    (d) => d.status === "forbidden" && !selectedDocs.has(d.id)
  );

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="mx-auto max-w-2xl">
        <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <Badge variant={levelConfig.badgeVariant}>
              Level {scenario.level} – {levelConfig.label}
            </Badge>
            <span className="text-xs text-text-secondary">
              Szenario {scenarioIndex + 1} von {total}
            </span>
          </div>

          <div
            className={cn(
              "mb-5 flex flex-col items-center gap-2 rounded-DEFAULT p-5 animate-scale-in",
              correct ? "bg-primary-light" : "bg-red-50"
            )}
          >
            <span className="text-4xl">{correct ? "✅" : "❌"}</span>
            <p className={cn("text-xl font-bold", correct ? "text-primary" : "text-red-700")}>
              {correct ? "Richtig!" : "Leider nicht ganz richtig"}
            </p>
            <p className="text-sm text-text-secondary">{score}% korrekt</p>
            {correct && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                +{xp} XP
              </span>
            )}
          </div>

          <ActiveRecallPrompt
            feedback={scenario.generalFeedback}
            promptText="Begründe in deinen eigenen Worten, welche Dokumente hier nötig sind – und warum:"
            onComplete={() => setRecallDone(true)}
          />

          {recallDone && (
            <>
              <div className="mb-5 flex flex-col gap-2">
                {requiredHit.map((doc) => (
                  <div key={doc.id} className="flex items-start gap-3 rounded-DEFAULT bg-primary-light p-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{doc.label}</p>
                      <p className="text-xs text-text-secondary">{doc.feedbackSelected}</p>
                    </div>
                  </div>
                ))}
                {forbiddenAvoided.map((doc) => (
                  <div key={doc.id} className="flex items-start gap-3 rounded-DEFAULT bg-primary-light p-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{doc.label} – zurecht nicht ausgewählt</p>
                      <p className="text-xs text-text-secondary">{doc.feedbackNotSelected}</p>
                    </div>
                  </div>
                ))}
                {forbiddenSelected.map((doc) => (
                  <div key={doc.id} className="flex items-start gap-3 rounded-DEFAULT bg-red-50 p-3">
                    <XCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
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
              </div>

              <div className="mb-6 rounded-DEFAULT border border-border bg-background p-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                  Erklärung
                </p>
                <p className="text-sm leading-relaxed text-text-primary">{scenario.generalFeedback}</p>
              </div>

              <BegründungsPrompt explanation={scenario.generalFeedback} />

              <Button onClick={onNext} className="w-full">
                {isLastScenario ? "Level abschliessen" : "Nächstes Szenario"}
                <ChevronRight size={14} />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
