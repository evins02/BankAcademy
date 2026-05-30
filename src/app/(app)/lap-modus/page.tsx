"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FONDS_LEVELS } from "@/lib/fonds";
import { ZV_LEVELS } from "@/lib/zahlungsverkehr";
import { addXP } from "@/lib/xpData";
import { ScenarioTimer } from "@/components/shared/ScenarioTimer";
import { ShareCard } from "@/components/shared/ShareCard";
import { ArrowRight, Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface LapCase {
  id: string;
  source: "fonds" | "zv";
  question: string;
  options: { key: string; text: string }[];
  correct: string;
  feedback: string;
  context: string;
}

function buildCases(): LapCase[] {
  const fondsL3 = FONDS_LEVELS.find((l) => l.level === 3)?.cases ?? [];
  const zvL3 = ZV_LEVELS.find((l) => l.level === 3)?.cases ?? [];

  const fonds: LapCase[] = fondsL3.map((c) => ({
    id: `fonds-${c.id}`,
    source: "fonds",
    question: c.question,
    options: c.options,
    correct: c.correct,
    feedback: c.feedback,
    context: c.situation,
  }));

  const zv: LapCase[] = zvL3.map((c) => ({
    id: `zv-${c.id}`,
    source: "zv",
    question: c.question,
    options: c.options,
    correct: c.correct,
    feedback: c.feedback,
    context: c.briefing,
  }));

  return [...fonds, ...zv];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SOURCE_LABELS: Record<string, string> = {
  fonds: "Fonds",
  zv: "Zahlungsverkehr",
};

type View = "intro" | "quiz" | "results";

export default function LapModusPage() {
  const router = useRouter();
  const allCases = useMemo(() => buildCases(), []);
  const [cases, setCases] = useState<LapCase[]>([]);
  const [view, setView] = useState<View>("intro");
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [showShare, setShowShare] = useState(false);

  function handleStart() {
    const shuffled = shuffle(allCases);
    setCases(shuffled);
    setCaseIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setStartTime(Date.now());
    setView("quiz");
  }

  function handleSubmit() {
    if (!selected) return;
    setSubmitted(true);
    if (selected === cases[caseIndex].correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (caseIndex < cases.length - 1) {
      setCaseIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      // Compute final score including current answer
      const finalScore = selected === cases[caseIndex].correct ? score + 1 : score;
      const pct = Math.round((finalScore / cases.length) * 100);
      if (pct >= 80) addXP(500);
      else addXP(100);
      setView("results");
    }
  }

  const currentCase = cases[caseIndex];
  const total = cases.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const pruefungsbereit = pct >= 80;

  if (view === "intro") {
    return (
      <>
        <Header title="LAP Modus" subtitle="Prüfungssimulation" />
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "LAP Modus" },
          ]}
        />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-lg">
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <div className="mb-4 text-5xl">🎓</div>
              <h1 className="mb-2 text-2xl font-bold text-text-primary">LAP Modus</h1>
              <p className="text-sm text-text-secondary">
                Echte LAP-Prüfungsfragen aus Fonds und Zahlungsverkehr in zufälliger Reihenfolge.
                Du brauchst <strong>80%</strong> um als prüfungsbereit zu gelten.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-3">
              {[
                { label: "Fragen", value: allCases.length },
                { label: "Bestehensgrenze", value: "80%" },
                { label: "Themen", value: "2" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-surface p-4 text-center">
                  <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 rounded-xl border border-border bg-surface p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Enthaltene Module</p>
              <div className="flex gap-2 flex-wrap">
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                  📈 Fonds (Level 3)
                </span>
                <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
                  💳 Zahlungsverkehr (Level 3)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={handleStart} className="w-full gap-2 text-base py-3">
                Prüfung starten
                <ArrowRight size={16} />
              </Button>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-center text-xs text-text-secondary hover:text-text-primary"
              >
                Zurück zum Dashboard
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (view === "results") {
    return (
      <>
        <Header title="LAP Modus" subtitle="Ergebnis" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-lg text-center">
            <div
              className={`mb-6 rounded-2xl p-8 ${
                pruefungsbereit
                  ? "border border-green-200 bg-green-50"
                  : "border border-red-200 bg-red-50"
              }`}
            >
              <div className="mb-4 text-6xl">{pruefungsbereit ? "🏆" : "📚"}</div>
              <h2 className="mb-2 text-2xl font-bold text-text-primary">
                {pruefungsbereit ? "Prüfungsbereit!" : "Noch nicht bereit"}
              </h2>
              <p className="mb-4 text-sm text-text-secondary">
                {pruefungsbereit
                  ? "Du hast die Bestehensgrenze erreicht. Weiter so!"
                  : "Übe nochmals und versuche 80% zu erreichen."}
              </p>
              <div className="text-5xl font-bold text-text-primary mb-1">{pct}%</div>
              <p className="text-sm text-text-secondary">
                {score} von {total} Fragen richtig
              </p>
            </div>

            <div className="mb-6 rounded-xl border border-border bg-surface p-4">
              <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    pruefungsbereit ? "bg-green-500" : "bg-red-400"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary text-right">{pct}% / 80% Bestehensgrenze</p>
            </div>

            <div className="space-y-2">
              <Button onClick={handleStart} className="w-full gap-2">
                <RotateCcw size={14} />
                Nochmals versuchen
              </Button>
              <Button variant="secondary" onClick={() => setShowShare(true)} className="w-full gap-2">
                <Trophy size={14} />
                Ergebnis teilen
              </Button>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-center text-xs text-text-secondary hover:text-text-primary"
              >
                Zurück zum Dashboard
              </button>
            </div>
          </div>
        </div>

        <ShareCard
          open={showShare}
          onClose={() => setShowShare(false)}
          title="LAP Modus – Prüfungssimulation"
          score={score}
          total={total}
          moduleName="LAP Modus"
          xpEarned={pruefungsbereit ? 500 : 100}
        />
      </>
    );
  }

  // Quiz view
  const isCorrect = submitted && selected === currentCase.correct;

  return (
    <>
      <Header title="LAP Modus" subtitle={`Frage ${caseIndex + 1} von ${total}`} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((caseIndex) / total) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-text-secondary">
                {caseIndex + 1}/{total}
              </span>
              <ScenarioTimer startTime={startTime} />
            </div>
          </div>

          {/* Module badge */}
          <div className="mb-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                currentCase.source === "fonds"
                  ? "bg-primary-light text-primary"
                  : "bg-accent-light text-accent"
              }`}
            >
              {SOURCE_LABELS[currentCase.source]}
            </span>
          </div>

          {/* Context */}
          <div className="mb-4 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm leading-relaxed text-text-secondary">{currentCase.context}</p>
          </div>

          {/* Question */}
          <h2 className="mb-4 text-base font-semibold text-text-primary">{currentCase.question}</h2>

          {/* Options */}
          <div className="mb-5 space-y-2">
            {currentCase.options.map((opt) => {
              const isSelected = selected === opt.key;
              const isAnswer = submitted && opt.key === currentCase.correct;
              const isWrongPick = submitted && isSelected && opt.key !== currentCase.correct;

              return (
                <button
                  key={opt.key}
                  disabled={submitted}
                  onClick={() => !submitted && setSelected(opt.key)}
                  className={`w-full rounded-xl border p-4 text-left text-sm transition-colors ${
                    isAnswer
                      ? "border-green-400 bg-green-50 text-green-800"
                      : isWrongPick
                      ? "border-red-400 bg-red-50 text-red-800"
                      : isSelected
                      ? "border-primary bg-primary-light text-primary"
                      : "border-border bg-surface text-text-primary hover:border-primary/50"
                  }`}
                >
                  <span className="mr-2 font-bold">{opt.key}.</span>
                  {opt.text}
                  {isAnswer && <CheckCircle2 size={14} className="ml-2 inline text-green-600" />}
                  {isWrongPick && <XCircle size={14} className="ml-2 inline text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {submitted && (
            <div
              className={`mb-5 rounded-xl border p-4 text-sm ${
                isCorrect
                  ? "border-green-200 bg-green-50 text-green-900"
                  : "border-red-200 bg-red-50 text-red-900"
              }`}
            >
              <p className="mb-1 font-semibold">
                {isCorrect ? "✅ Richtig!" : "❌ Leider falsch"}
              </p>
              <p className="leading-relaxed">{currentCase.feedback}</p>
            </div>
          )}

          {/* Actions */}
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={!selected} className="w-full">
              Antwort bestätigen
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full gap-2">
              {caseIndex < total - 1 ? "Nächste Frage" : "Ergebnis anzeigen"}
              <ArrowRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
