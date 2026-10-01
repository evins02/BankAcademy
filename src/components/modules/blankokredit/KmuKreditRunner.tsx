"use client";

import { useState, useCallback, useMemo } from "react";
import { Lock, CheckCircle2, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaseCard } from "./CaseCard";
import { FeedbackPanel } from "./FeedbackPanel";
import { LevelComplete, type CaseResult } from "./LevelComplete";
import { NoteModal } from "@/components/shared/NoteModal";
import { SoftFeedbackBanner } from "@/components/shared/SoftFeedbackBanner";
import { KMU_LEVELS, KMU_MERKSATZ } from "@/lib/kmu-kredit";
import { type LevelNum, type OptionKey, type BlankokreditCase } from "@/lib/blankokredit";
import { recordConceptError } from "@/lib/conceptTracker";
import { addAttemptRecord } from "@/lib/error-tracking";

type View = "selector" | "lernblock" | "playing" | "soft-feedback" | "feedback" | "level-complete";

const LERNBLOCK_STEPS = [
  { num: 1, title: "Kreditart bestimmen", detail: "Investitionskredit, Betriebskredit oder Kontokorrent?" },
  { num: 2, title: "Unterlagen prüfen", detail: "Jahresabschlüsse (3 J.), HR, Betreibungsregister, Steuern" },
  { num: 3, title: "Kennzahlen analysieren", detail: "EK-Quote ≥ 20%, Net Debt/EBITDA ≤ 3×, DSCR ≥ 1.2×" },
  { num: 4, title: "Sicherheiten bewerten", detail: "Grundpfand, Zession, Bürgschaft, Bürgschaftsgenossenschaft" },
];

export function KmuKreditRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});
  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);
  const [noteOpen, setNoteOpen] = useState(false);
  const [softFeedbackMessage, setSoftFeedbackMessage] = useState("");
  const [isMcqSecondAttempt, setIsMcqSecondAttempt] = useState(false);

  const levelConfig = KMU_LEVELS.find((l) => l.level === activeLevel)!;
  const activeCases = useMemo(
    () => levelConfig.cases as BlankokreditCase[],
    [levelConfig],
  );
  const currentCase = activeCases[caseIndex] as BlankokreditCase;
  const total = activeCases.length;
  const isLastCase = caseIndex === total - 1;

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setView("lernblock");
  }, []);

  const handleSubmit = useCallback(() => {
    if (view === "soft-feedback") {
      setIsMcqSecondAttempt(true);
      setView("feedback");
      return;
    }
    const isCorrect = selectedOption === currentCase.correct;
    if (!isCorrect) {
      setSoftFeedbackMessage("Du hast eine falsche Antwort gewählt. Du hast noch einen Versuch.");
      setView("soft-feedback");
    } else {
      setView("feedback");
    }
  }, [view, currentCase, selectedOption]);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentCase.correct;
    const newResults: CaseResult[] = [
      ...sessionResults,
      { caseId: currentCase.id, correct: isCorrect, selectedOption },
    ];
    setSessionResults(newResults);

    if (!isCorrect) recordConceptError("firmenkunde-kmu-kredit", currentCase.concepts ?? []);
    addAttemptRecord({
      moduleId: "firmenkunde-kmu-kredit",
      levelNum: activeLevel,
      caseId: currentCase.id,
      caseTitle: String(currentCase.question),
      attempt: isMcqSecondAttempt ? 2 : 1,
      timestamp: Date.now(),
      score: isCorrect ? 100 : 0,
      correct: isCorrect,
      errors: isCorrect ? [] : selectedOption
        ? [{ type: "wrong" as const, documentId: selectedOption, documentLabel: selectedOption }]
        : [],
    });

    if (isLastCase) {
      const score = newResults.filter((r) => r.correct).length;
      setCompletedLevels((prev) => { const n = new Set(prev); n.add(activeLevel); return n; });
      setLevelScores((prev) => ({ ...prev, [activeLevel]: score }));
      setView("level-complete");
    } else {
      setCaseIndex((i) => i + 1);
      setSelectedOption(null);
      setIsMcqSecondAttempt(false);
      setView("playing");
    }
  }, [selectedOption, currentCase, sessionResults, isLastCase, activeLevel, isMcqSecondAttempt]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setIsMcqSecondAttempt(false);
    setView("lernblock");
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {/* Level Selector */}
      {view === "selector" && (
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-start gap-3 rounded-DEFAULT border border-primary/30 bg-primary-light p-4">
            <BookOpen size={16} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">Merksatz</p>
              <p className="text-sm leading-relaxed text-text-primary">{KMU_MERKSATZ}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {KMU_LEVELS.map(({ level, label, badgeVariant, cases }) => {
              const isLocked = level > 1 && !completedLevels.has((level - 1) as LevelNum);
              const isCompleted = completedLevels.has(level);
              const score = levelScores[level];
              return (
                <div key={level} className={cn("flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card", isLocked && "opacity-60")}>
                  <div className="flex items-start justify-between">
                    <Badge variant={isLocked ? "neutral" : badgeVariant}>Level {level} – {label}</Badge>
                    {isLocked && <Lock size={16} className="shrink-0 text-text-secondary" />}
                    {isCompleted && <CheckCircle2 size={16} className="shrink-0 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-secondary">{cases.length} Fälle</p>
                    {isCompleted && score !== undefined && (
                      <p className="mt-1 text-sm font-medium text-text-primary">{score}/{cases.length} richtig</p>
                    )}
                    {isLocked && (
                      <p className="mt-1 text-xs text-text-secondary">Schliesse Level {level - 1} ab, um dieses Level freizuschalten.</p>
                    )}
                  </div>
                  <Button variant={isLocked ? "secondary" : "primary"} disabled={isLocked} onClick={() => handleSelectLevel(level as LevelNum)} className="w-full">
                    {isCompleted ? "Wiederholen" : isLocked ? "Gesperrt" : "Starten"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lernblock */}
      {view === "lernblock" && (
        <div className="mx-auto max-w-2xl">
          <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
            <div className="mb-5 flex items-center gap-2">
              <Badge variant={levelConfig.badgeVariant}>Level {activeLevel} – {levelConfig.label}</Badge>
            </div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Lernblock</p>
            <h2 className="mb-5 text-lg font-bold text-text-primary">KMU-Kredit – Grundlagen & Kennzahlen</h2>
            <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
              {LERNBLOCK_STEPS.map((step, i) => (
                <div key={step.num} className={`flex items-start gap-4 p-4 ${i < LERNBLOCK_STEPS.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{step.num}</div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{step.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6 flex items-start gap-3 rounded-DEFAULT border border-primary/30 bg-primary-light p-4">
              <div className="mt-0.5 text-base">💡</div>
              <div>
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Merksatz</p>
                <p className="text-sm leading-relaxed text-text-primary">{KMU_MERKSATZ}</p>
              </div>
            </div>
            <div className="mb-6 rounded-DEFAULT border border-amber-200 bg-amber-50 p-3">
              <p className="text-sm font-semibold text-amber-800">
                EK-Quote ≥ 20% · Net Debt/EBITDA ≤ 3× · DSCR ≥ 1.2× — drei Kernkennzahlen für den KMU-Kreditentscheid.
              </p>
            </div>
            <Button onClick={() => setView("playing")} className="w-full">
              Zum ersten Fall <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Playing / Soft-Feedback */}
      {(view === "playing" || view === "soft-feedback") && currentCase && (
        <>
          {view === "soft-feedback" && <SoftFeedbackBanner message={softFeedbackMessage} />}
          <CaseCard
            bkCase={currentCase}
            caseIndex={caseIndex}
            total={total}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            onSubmit={handleSubmit}
            onOpenNote={() => setNoteOpen(true)}
          />
        </>
      )}

      {/* Feedback */}
      {view === "feedback" && currentCase && selectedOption && (
        <FeedbackPanel
          bkCase={currentCase}
          selectedOption={selectedOption}
          caseIndex={caseIndex}
          total={total}
          isLastCase={isLastCase}
          onNext={handleNext}
          onSkip={handleNext}
        />
      )}

      {/* Level Complete */}
      {view === "level-complete" && (
        <LevelComplete
          level={activeLevel}
          results={sessionResults}
          onNext={() => setView("selector")}
          onRetry={handleRetry}
        />
      )}

      {noteOpen && currentCase && (
        <NoteModal
          scenarioId={`kmu-kredit-${currentCase.id}`}
          moduleId="firmenkunde-kmu-kredit"
          moduleName="KMU-Kredit"
          onClose={() => setNoteOpen(false)}
        />
      )}
    </div>
  );
}
