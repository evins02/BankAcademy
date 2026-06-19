"use client";

import { useState, useCallback } from "react";
import { LevelSelector } from "./LevelSelector";
import { DocumentCaseCard } from "./DocumentCaseCard";
import { DocumentResultCard } from "./DocumentResultCard";
import { McqCaseCard } from "./McqCaseCard";
import { McqResultCard } from "./McqResultCard";
import { LevelComplete, type CaseResult } from "./LevelComplete";
import {
  KONTO_PRIVAT_LEVELS,
  scoreDocumentCase,
  type LevelNum,
  type DocumentCase,
} from "@/lib/kontoeröffnung-privat";

type View = "selector" | "case" | "result" | "level-complete";

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

  const levelConfig = KONTO_PRIVAT_LEVELS.find((l) => l.level === activeLevel)!;
  const currentCase = levelConfig.cases[caseIndex];
  const total = levelConfig.cases.length;
  const isLastCase = caseIndex === total - 1;

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

  const handleSubmitDoc = useCallback(() => {
    setView("result");
  }, []);

  const handleSubmitMcq = useCallback(() => {
    setView("result");
  }, []);

  const handleNext = useCallback(() => {
    // Compute result for current case
    let score: number;
    let correct: boolean;

    if (currentCase.type === "document-select") {
      const res = scoreDocumentCase(currentCase as DocumentCase, selectedDocs);
      score = res.score;
      correct = res.correct;
    } else {
      correct = selectedOption === currentCase.correct;
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

  if (view === "case") {
    if (currentCase.type === "document-select") {
      return (
        <div className="flex-1 overflow-y-auto p-6">
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

  // When retrying a single case, treat it as "last" so the button leads back to the summary
  const effectiveIsLastCase = retryingCaseIndex !== null ? true : isLastCase;

  // result view
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
