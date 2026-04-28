"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TheoryCard } from "./TheoryCard";
import { CaseCard } from "./CaseCard";
import { CaseFeedback } from "./CaseFeedback";
import { SectionComplete, type CaseResult } from "./SectionComplete";
import { getSectionConfig, type SectionId, type OptionKey } from "@/lib/tragbarkeit";

type View = "theory" | "question" | "feedback" | "complete";

interface SectionRunnerProps {
  sectionId: SectionId;
}

export function SectionRunner({ sectionId }: SectionRunnerProps) {
  const router = useRouter();
  const section = getSectionConfig(sectionId);

  const [view, setView] = useState<View>("theory");
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [results, setResults] = useState<CaseResult[]>([]);

  const currentCase = section.cases[caseIndex];
  const isLast = caseIndex === section.cases.length - 1;

  const handleSubmit = useCallback(() => {
    setView("feedback");
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentCase.correct;
    const newResults: CaseResult[] = [
      ...results,
      { caseId: currentCase.id, correct: isCorrect, selectedOption },
    ];
    setResults(newResults);

    if (isLast) {
      setView("complete");
    } else {
      setCaseIndex((i) => i + 1);
      setSelectedOption(null);
      setView("question");
    }
  }, [selectedOption, currentCase, results, isLast]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setResults([]);
    setView("theory");
  }, []);

  const handleBack = useCallback(() => {
    router.push("/firmenkunde/tragbarkeit");
  }, [router]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {view === "theory" && (
        <TheoryCard
          sectionId={sectionId}
          onContinue={() => setView("question")}
        />
      )}

      {view === "question" && currentCase && (
        <CaseCard
          sectionCase={currentCase}
          caseIndex={caseIndex}
          total={section.cases.length}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          onSubmit={handleSubmit}
        />
      )}

      {view === "feedback" && currentCase && selectedOption && (
        <CaseFeedback
          sectionCase={currentCase}
          selectedOption={selectedOption}
          caseIndex={caseIndex}
          total={section.cases.length}
          isLast={isLast}
          onNext={handleNext}
        />
      )}

      {view === "complete" && (
        <SectionComplete
          section={section}
          results={results}
          onRetry={handleRetry}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
