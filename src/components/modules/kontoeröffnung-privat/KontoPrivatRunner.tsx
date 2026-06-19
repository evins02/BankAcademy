"use client";

import { useState, useCallback } from "react";
import { LevelSelector } from "./LevelSelector";
import { DocumentCaseCard } from "./DocumentCaseCard";
import { DocumentResultCard } from "./DocumentResultCard";
import { McqCaseCard } from "./McqCaseCard";
import { McqResultCard } from "./McqResultCard";
import { LevelComplete, type CaseResult } from "./LevelComplete";
import { SoftFeedbackBanner } from "./SoftFeedbackBanner";
import {
  KONTO_PRIVAT_LEVELS,
  scoreDocumentCase,
  type LevelNum,
  type DocumentCase,
  type McqCase,
} from "@/lib/kontoeröffnung-privat";
import { addAttemptRecord, type TrackingError } from "@/lib/error-tracking";

type View = "selector" | "case" | "soft-feedback" | "result" | "level-complete";

// ─── helpers ────────────────────────────────────────────────────────────────

function getDocErrors(c: DocumentCase, selected: Set<string>): TrackingError[] {
  const errors: TrackingError[] = [];
  for (const doc of c.documents) {
    if (doc.status === "required" && !selected.has(doc.id)) {
      errors.push({ type: "missed", documentId: doc.id, documentLabel: doc.label });
    } else if (doc.status === "forbidden" && selected.has(doc.id)) {
      errors.push({ type: "wrong", documentId: doc.id, documentLabel: doc.label });
    }
  }
  for (const group of c.requiredOneOf ?? []) {
    if (!group.some((id) => selected.has(id))) {
      errors.push({ type: "missed", documentId: group[0], documentLabel: "Mindestens eines aus Gruppe erforderlich" });
    }
  }
  return errors;
}

function docSoftMessage(errors: TrackingError[]): string {
  const hasMissed = errors.some((e) => e.type === "missed");
  const hasWrong = errors.some((e) => e.type === "wrong");
  if (hasMissed && hasWrong)
    return "Du hast mindestens ein Dokument vergessen und eines ausgewählt, das hier nicht benötigt wird. Überprüfe deine Auswahl.";
  if (hasMissed)
    return "Du hast mindestens ein erforderliches Dokument vergessen. Überprüfe deine Auswahl.";
  return "Du hast mindestens ein Dokument ausgewählt, das hier nicht benötigt wird. Überprüfe deine Auswahl.";
}

// ─── runner ─────────────────────────────────────────────────────────────────

export function KontoPrivatRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);
  // When non-null, the user is retrying a single case by index (not sequential play)
  const [retryingCaseIndex, setRetryingCaseIndex] = useState<number | null>(null);

  // Document case state
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());

  // MCQ state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Soft-feedback message (set when transitioning to "soft-feedback" view)
  const [softFeedbackMessage, setSoftFeedbackMessage] = useState("");

  const levelConfig = KONTO_PRIVAT_LEVELS.find((l) => l.level === activeLevel)!;
  const currentCase = levelConfig.cases[caseIndex];
  const total = levelConfig.cases.length;
  const isLastCase = caseIndex === total - 1;

  // ─── navigation ───────────────────────────────────────────────────────────

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setCaseIndex(0);
    setSelectedDocs(new Set());
    setSelectedOption(null);
    setSessionResults([]);
    setView("case");
  }, []);

  const handleToggleDoc = useCallback((id: string) => {
    setSelectedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ─── submit handlers ──────────────────────────────────────────────────────

  const handleSubmitDoc = useCallback(() => {
    const c = currentCase as DocumentCase;
    const { score, correct } = scoreDocumentCase(c, selectedDocs);
    const errors = getDocErrors(c, selectedDocs);
    const isAttempt2 = view === "soft-feedback";
    const attempt = isAttempt2 ? 2 : 1;

    addAttemptRecord({
      moduleId: "kontoeröffnung-privat",
      levelNum: activeLevel,
      caseId: c.id,
      caseTitle: c.title,
      attempt,
      timestamp: Date.now(),
      score,
      correct,
      errors,
    });

    if (!isAttempt2 && !correct) {
      setSoftFeedbackMessage(docSoftMessage(errors));
      setView("soft-feedback");
    } else {
      setView("result");
    }
  }, [view, currentCase, selectedDocs, activeLevel]);

  const handleSubmitMcq = useCallback(() => {
    if (!selectedOption) return;
    const c = currentCase as McqCase;
    const correct = selectedOption === c.correct;
    const isAttempt2 = view === "soft-feedback";
    const attempt = isAttempt2 ? 2 : 1;

    const errors: TrackingError[] = correct
      ? []
      : [
          {
            type: "wrong",
            documentId: selectedOption,
            documentLabel: c.options.find((o) => o.key === selectedOption)?.text ?? selectedOption,
          },
        ];

    addAttemptRecord({
      moduleId: "kontoeröffnung-privat",
      levelNum: activeLevel,
      caseId: c.id,
      caseTitle: c.title,
      attempt,
      timestamp: Date.now(),
      score: correct ? 100 : 0,
      correct,
      errors,
    });

    if (!isAttempt2 && !correct) {
      setSoftFeedbackMessage("Du hast eine falsche Antwort gewählt. Du hast noch einen Versuch.");
      setView("soft-feedback");
    } else {
      setView("result");
    }
  }, [view, currentCase, selectedOption, activeLevel]);

  // ─── advance / level flow ─────────────────────────────────────────────────

  const handleNext = useCallback(() => {
    let score: number;
    let correct: boolean;

    if (currentCase.type === "document-select") {
      const res = scoreDocumentCase(currentCase as DocumentCase, selectedDocs);
      score = res.score;
      correct = res.correct;
    } else {
      correct = selectedOption === (currentCase as McqCase).correct;
      score = correct ? 100 : 0;
    }

    // Single-case retry: overwrite the result at that index, return to summary
    if (retryingCaseIndex !== null) {
      const newResults = [...sessionResults];
      newResults[retryingCaseIndex] = { caseId: currentCase.id, score, correct };
      setSessionResults(newResults);
      const avg = Math.round(newResults.reduce((s, r) => s + r.score, 0) / newResults.length);
      setLevelScores((prev) => ({ ...prev, [activeLevel]: avg }));
      setRetryingCaseIndex(null);
      setView("level-complete");
      return;
    }

    const newResults: CaseResult[] = [
      ...sessionResults,
      { caseId: currentCase.id, score, correct },
    ];
    setSessionResults(newResults);

    if (isLastCase) {
      const avg = Math.round(newResults.reduce((s, r) => s + r.score, 0) / newResults.length);
      setCompletedLevels((prev) => {
        const next = new Set(prev);
        next.add(activeLevel);
        return next;
      });
      setLevelScores((prev) => ({ ...prev, [activeLevel]: avg }));
      setView("level-complete");
    } else {
      setCaseIndex((i) => i + 1);
      setSelectedDocs(new Set());
      setSelectedOption(null);
      setView("case");
    }
  }, [currentCase, selectedDocs, selectedOption, sessionResults, isLastCase, activeLevel, retryingCaseIndex]);

  const handleRetryCase = useCallback((index: number) => {
    setCaseIndex(index);
    setSelectedDocs(new Set());
    setSelectedOption(null);
    setRetryingCaseIndex(index);
    setView("case");
  }, []);

  const handleRepeat = useCallback(() => {
    setCaseIndex(0);
    setSelectedDocs(new Set());
    setSelectedOption(null);
    setSessionResults([]);
    setRetryingCaseIndex(null);
    setView("case");
  }, []);

  const handleNextLevel = useCallback(() => {
    const nextLevel = (activeLevel + 1) as LevelNum;
    setActiveLevel(nextLevel);
    setCaseIndex(0);
    setSelectedDocs(new Set());
    setSelectedOption(null);
    setSessionResults([]);
    setView("case");
  }, [activeLevel]);

  const handleBackToMenu = useCallback(() => {
    setView("selector");
  }, []);

  // ─── render ───────────────────────────────────────────────────────────────

  if (view === "selector") {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <LevelSelector
          completedLevels={completedLevels}
          levelScores={levelScores}
          onSelectLevel={handleSelectLevel}
        />
      </div>
    );
  }

  if (view === "level-complete") {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <LevelComplete
          level={activeLevel}
          results={sessionResults}
          hasNextLevel={activeLevel < 3}
          onRepeat={handleRepeat}
          onNextLevel={handleNextLevel}
          onBackToMenu={handleBackToMenu}
          onRetryCase={handleRetryCase}
        />
      </div>
    );
  }

  // When retrying a single case, treat it as "last" so the result button
  // leads back to the summary instead of advancing to the next case.
  const effectiveIsLastCase = retryingCaseIndex !== null ? true : isLastCase;

  if (view === "result") {
    if (currentCase.type === "document-select") {
      return (
        <div className="flex-1 overflow-y-auto p-6">
          <DocumentResultCard
            c={currentCase}
            selected={selectedDocs}
            isLastCase={effectiveIsLastCase}
            onNext={handleNext}
          />
        </div>
      );
    }
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <McqResultCard
          c={currentCase}
          selected={selectedOption!}
          isLastCase={effectiveIsLastCase}
          onNext={handleNext}
        />
      </div>
    );
  }

  // "case" and "soft-feedback" both show the editable case card;
  // "soft-feedback" adds the amber banner above it.
  if (currentCase.type === "document-select") {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        {view === "soft-feedback" && <SoftFeedbackBanner message={softFeedbackMessage} />}
        <DocumentCaseCard
          c={currentCase}
          caseNum={caseIndex + 1}
          total={total}
          selected={selectedDocs}
          onToggle={handleToggleDoc}
          onSubmit={handleSubmitDoc}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {view === "soft-feedback" && <SoftFeedbackBanner message={softFeedbackMessage} />}
      <McqCaseCard
        c={currentCase}
        caseNum={caseIndex + 1}
        total={total}
        selected={selectedOption}
        onSelect={setSelectedOption}
        onSubmit={handleSubmitMcq}
      />
    </div>
  );
}
