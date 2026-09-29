"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Trophy, RotateCcw, CheckCircle2, XCircle,
  Clock, ChevronDown, ChevronUp, Target,
} from "lucide-react";

// Module data
import { FONDS_LEVELS } from "@/lib/fonds";
import { ZV_LEVELS, type ZvCase } from "@/lib/zahlungsverkehr";
import { AL_LEVELS, type AnlageScenario } from "@/lib/anlagekunde";
import { KYC_LEVELS, type KycScenario } from "@/lib/kyc";
import { MW_LEVELS, type MwCase } from "@/lib/mahnwesen";
import { BK_LEVELS, type BlankokreditCase } from "@/lib/blankokredit";
import { CO_LEVELS, type CreditOpsScenario } from "@/lib/credit-operations";
import { ZV_FO_LEVELS, type ZvFoCase } from "@/lib/zahlungsverkehr-privat";
import { ANLAGE_FONDS_LEVELS, type SubmoduleCase } from "@/lib/anlage-fonds";
import { AKTIEN_LEVELS } from "@/lib/aktien";
import { OBLIGATIONEN_LEVELS } from "@/lib/obligationen";
import { IB_LEVELS } from "@/lib/investmentbanking";
import { SK_LEVELS, type SkScenario } from "@/lib/sparen-konto";
import { VORSORGE_LEVELS, type VorsorgeCase } from "@/lib/vorsorge";
import { BKO_KYC_LEVELS, type MCScenario as BkoMCScenario } from "@/lib/backoffice-kyc";
import { KONTO_PRIVAT_LEVELS, type McqCase as KontoMcqCase } from "@/lib/kontoeröffnung-privat";
import { addXP } from "@/lib/xpData";
import { ShareCard } from "@/components/shared/ShareCard";

/* ─── Types ───────────────────────────────────────────────────────────────── */

type SourceKey =
  | "fonds" | "zv" | "anlagekunde" | "kyc" | "mahnwesen" | "blankokredit"
  | "credit-ops" | "zv-privat" | "anlage-fonds" | "aktien" | "obligationen"
  | "investmentbanking" | "sparen-konto" | "vorsorge" | "bko-kyc" | "kontoeröffnung";

type Category = "anlage" | "kredit" | "operations" | "compliance";

interface QvCase {
  id: string;
  source: SourceKey;
  category: Category;
  question: string;
  options: { key: string; text: string }[];
  correct: string;
  feedback: string;
  context: string;
}

interface CaseResult {
  caseId: string;
  source: SourceKey;
  category: Category;
  correct: boolean;
  selected: string;
  question: string;
  context: string;
  feedback: string;
  correctOption: string;
}

type View = "intro" | "quiz" | "results";

/* ─── Constants ───────────────────────────────────────────────────────────── */

const SESSION_SIZE = 30;
const EXAM_MINUTES = 60;
const PASSING_PCT = 70;

const SOURCE_CATEGORY: Record<SourceKey, Category> = {
  "anlage-fonds": "anlage", aktien: "anlage", obligationen: "anlage",
  investmentbanking: "anlage", anlagekunde: "anlage", fonds: "anlage",
  blankokredit: "kredit", "credit-ops": "kredit",
  zv: "operations", "zv-privat": "operations",
  "sparen-konto": "operations", vorsorge: "operations", kontoeröffnung: "operations",
  kyc: "compliance", "bko-kyc": "compliance", mahnwesen: "compliance",
};

const SOURCE_LABEL: Record<SourceKey, string> = {
  fonds: "Anlagefonds", zv: "Zahlungsverkehr", anlagekunde: "Anlageberatung",
  kyc: "KYC / Compliance", mahnwesen: "Mahnwesen", blankokredit: "Blankokredit",
  "credit-ops": "Credit Operations", "zv-privat": "ZV Privatkunde",
  "anlage-fonds": "Anlagefonds & ETF", aktien: "Aktien & Kennzahlen",
  obligationen: "Obligationen", investmentbanking: "Investmentbanking",
  "sparen-konto": "Sparen & Konto", vorsorge: "Vorsorge & 3a",
  "bko-kyc": "KYC Backoffice", kontoeröffnung: "Kontoeröffnung",
};

const CATEGORY_LABEL: Record<Category, string> = {
  anlage: "Anlage & Wertschriften",
  kredit: "Kredit & Finanzierung",
  operations: "Banking Operations",
  compliance: "Compliance & Recht",
};

const CATEGORY_COLOR: Record<Category, string> = {
  anlage: "text-blue-700 bg-blue-50 border-blue-200",
  kredit: "text-rose-700 bg-rose-50 border-rose-200",
  operations: "text-emerald-700 bg-emerald-50 border-emerald-200",
  compliance: "text-violet-700 bg-violet-50 border-violet-200",
};

const CATEGORY_BAR: Record<Category, string> = {
  anlage: "bg-blue-500",
  kredit: "bg-rose-500",
  operations: "bg-emerald-500",
  compliance: "bg-violet-500",
};

const MODULE_CHIPS = [
  { label: "Anlagefonds & ETF", source: "anlage-fonds" as SourceKey },
  { label: "Aktien & Kennzahlen", source: "aktien" as SourceKey },
  { label: "Obligationen", source: "obligationen" as SourceKey },
  { label: "Anlageberatung", source: "anlagekunde" as SourceKey },
  { label: "Investmentbanking", source: "investmentbanking" as SourceKey },
  { label: "Blankokredit", source: "blankokredit" as SourceKey },
  { label: "Credit Operations", source: "credit-ops" as SourceKey },
  { label: "Zahlungsverkehr", source: "zv" as SourceKey },
  { label: "ZV Privatkunde", source: "zv-privat" as SourceKey },
  { label: "Sparen & Konto", source: "sparen-konto" as SourceKey },
  { label: "Vorsorge & 3a", source: "vorsorge" as SourceKey },
  { label: "Kontoeröffnung", source: "kontoeröffnung" as SourceKey },
  { label: "KYC / Compliance", source: "kyc" as SourceKey },
  { label: "KYC Backoffice", source: "bko-kyc" as SourceKey },
  { label: "Mahnwesen", source: "mahnwesen" as SourceKey },
  { label: "Anlagefonds Legacy", source: "fonds" as SourceKey },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function isMcqLike(c: unknown): boolean {
  if (typeof c !== "object" || c === null) return false;
  const obj = c as Record<string, unknown>;
  return (
    typeof obj.question === "string" &&
    Array.isArray(obj.options) &&
    typeof obj.correct === "string" &&
    !("type" in obj && (obj.type === "lückentext" || obj.type === "checklist" || obj.type === "document"))
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toQvCase<T extends { id: string; question: string; options: { key: string; text: string }[]; correct: string; feedback: string }>(
  arr: T[], source: SourceKey, ctx: (c: T) => string
): QvCase[] {
  return arr.map((c) => ({
    id: `${source}-${c.id}`,
    source,
    category: SOURCE_CATEGORY[source],
    question: c.question,
    options: c.options,
    correct: c.correct,
    feedback: c.feedback,
    context: ctx(c),
  }));
}

// Extract MCQ-compatible cases from a level array by level number (avoids generic call syntax in TSX)
function lvlCases(
  levels: { level: number; cases?: unknown[]; scenarios?: unknown[] }[],
  lvl: number
): unknown[] {
  const found = levels.find((l) => l.level === lvl);
  return found?.cases ?? found?.scenarios ?? [];
}

function buildPool(): QvCase[] {
  // SubmoduleCase modules (anlage-fonds, aktien, obligationen, investmentbanking)
  function fromSubmodule(
    levels: { level: number; cases: SubmoduleCase[] }[],
    source: SourceKey
  ): QvCase[] {
    const cases = levels.filter((l) => l.level >= 2).flatMap((l) => l.cases);
    return toQvCase(cases, source, (c) => c.situation);
  }

  return [
    // Anlage
    ...fromSubmodule(ANLAGE_FONDS_LEVELS, "anlage-fonds"),
    ...fromSubmodule(AKTIEN_LEVELS, "aktien"),
    ...fromSubmodule(OBLIGATIONEN_LEVELS, "obligationen"),
    ...fromSubmodule(IB_LEVELS, "investmentbanking"),
    ...toQvCase(
      ([...lvlCases(AL_LEVELS as {level:number;scenarios:AnlageScenario[]}[], 2), ...lvlCases(AL_LEVELS as {level:number;scenarios:AnlageScenario[]}[], 3)] as AnlageScenario[]).filter(isMcqLike),
      "anlagekunde", (c) => c.situation
    ),
    ...toQvCase(
      ([...lvlCases(FONDS_LEVELS, 2), ...lvlCases(FONDS_LEVELS, 3)] as { id: string; question: string; options: { key: string; text: string }[]; correct: string; feedback: string; situation: string }[]).filter(isMcqLike),
      "fonds", (c) => c.situation
    ),
    // Kredit
    ...toQvCase(
      ([...lvlCases(BK_LEVELS as {level:number;cases:BlankokreditCase[]}[], 2), ...lvlCases(BK_LEVELS as {level:number;cases:BlankokreditCase[]}[], 3)] as BlankokreditCase[]).filter(isMcqLike),
      "blankokredit", (c) => c.briefing
    ),
    ...toQvCase(
      ([...lvlCases(CO_LEVELS as {level:number;scenarios:CreditOpsScenario[]}[], 2), ...lvlCases(CO_LEVELS as {level:number;scenarios:CreditOpsScenario[]}[], 3)] as CreditOpsScenario[]).filter(isMcqLike),
      "credit-ops", (c) => c.situation
    ),
    // Operations
    ...toQvCase(
      ([...lvlCases(ZV_LEVELS as {level:number;cases:ZvCase[]}[], 2), ...lvlCases(ZV_LEVELS as {level:number;cases:ZvCase[]}[], 3)] as ZvCase[]).filter(isMcqLike),
      "zv", (c) => c.briefing
    ),
    ...toQvCase(
      ([...lvlCases(ZV_FO_LEVELS as {level:number;cases:ZvFoCase[]}[], 2), ...lvlCases(ZV_FO_LEVELS as {level:number;cases:ZvFoCase[]}[], 3)] as ZvFoCase[]),
      "zv-privat", (c) => c.situation
    ),
    ...toQvCase(
      ([...lvlCases(SK_LEVELS as {level:number;scenarios:SkScenario[]}[], 2), ...lvlCases(SK_LEVELS as {level:number;scenarios:SkScenario[]}[], 3)] as SkScenario[]).filter(isMcqLike),
      "sparen-konto", (c) => c.situation
    ),
    ...toQvCase(
      ([...lvlCases(VORSORGE_LEVELS as {level:number;cases:VorsorgeCase[]}[], 2), ...lvlCases(VORSORGE_LEVELS as {level:number;cases:VorsorgeCase[]}[], 3)] as VorsorgeCase[]).filter(isMcqLike),
      "vorsorge", (c) => c.situation
    ),
    ...toQvCase(
      ([...lvlCases(KONTO_PRIVAT_LEVELS as {level:number;cases:KontoMcqCase[]}[], 2), ...lvlCases(KONTO_PRIVAT_LEVELS as {level:number;cases:KontoMcqCase[]}[], 3)] as KontoMcqCase[]).filter((c) => (c as { type?: string }).type === "multiple-choice"),
      "kontoeröffnung", (c) => c.briefing
    ),
    // Compliance
    ...toQvCase(
      ([...lvlCases(KYC_LEVELS as {level:number;scenarios:KycScenario[]}[], 2), ...lvlCases(KYC_LEVELS as {level:number;scenarios:KycScenario[]}[], 3)] as KycScenario[]).filter(isMcqLike),
      "kyc", (c) => c.situation
    ),
    ...toQvCase(
      (BKO_KYC_LEVELS.flatMap((l) => l.scenarios as unknown[]).filter((c) => (c as { type?: string }).type === "mc")) as BkoMCScenario[],
      "bko-kyc", (c) => c.briefing
    ),
    ...toQvCase(
      ([...lvlCases(MW_LEVELS as {level:number;cases:MwCase[]}[], 2), ...lvlCases(MW_LEVELS as {level:number;cases:MwCase[]}[], 3)] as MwCase[]).filter(isMcqLike),
      "mahnwesen", (c) => c.briefing
    ),
  ];
}

/* ─── Timer ──────────────────────────────────────────────────────────────── */

function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function QvSimulationPage() {
  const router = useRouter();
  const pool = useMemo(() => buildPool(), []);

  const [view, setView] = useState<View>("intro");
  const [cases, setCases] = useState<QvCase[]>([]);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<CaseResult[]>([]);
  const [endTime, setEndTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_MINUTES * 60 * 1000);
  const [elapsed, setElapsed] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showShare, setShowShare] = useState(false);

  // Countdown tick
  useEffect(() => {
    if (view !== "quiz") return;
    const id = setInterval(() => {
      const left = endTime - Date.now();
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(id);
        finishExam(results, cases);
      }
    }, 500);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, endTime]);

  const finishExam = useCallback((finalResults: CaseResult[], finalCases: QvCase[]) => {
    const remaining = finalCases.slice(finalResults.length);
    const skipped: CaseResult[] = remaining.map((c) => ({
      caseId: c.id, source: c.source, category: c.category,
      correct: false, selected: "", question: c.question,
      context: c.context, feedback: c.feedback, correctOption: c.correct,
    }));
    const all = [...finalResults, ...skipped];
    const pct = Math.round((all.filter((r) => r.correct).length / all.length) * 100);
    if (pct >= PASSING_PCT) addXP(600); else addXP(150);
    setResults(all);
    setElapsed(EXAM_MINUTES * 60 * 1000 - Math.max(0, endTime - Date.now()));
    setView("results");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  function handleStart() {
    const session = shuffle(pool).slice(0, SESSION_SIZE);
    setCases(session);
    setCaseIndex(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
    const end = Date.now() + EXAM_MINUTES * 60 * 1000;
    setEndTime(end);
    setTimeLeft(EXAM_MINUTES * 60 * 1000);
    setView("quiz");
  }

  function handleSubmit() {
    if (!selected) return;
    setSubmitted(true);
  }

  function handleNext() {
    const currentCase = cases[caseIndex];
    const isCorrect = selected === currentCase.correct;
    const result: CaseResult = {
      caseId: currentCase.id, source: currentCase.source, category: currentCase.category,
      correct: isCorrect, selected: selected ?? "", question: currentCase.question,
      context: currentCase.context, feedback: currentCase.feedback, correctOption: currentCase.correct,
    };
    const newResults = [...results, result];
    setResults(newResults);

    if (caseIndex < cases.length - 1) {
      setCaseIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      const pct = Math.round((newResults.filter((r) => r.correct).length / newResults.length) * 100);
      if (pct >= PASSING_PCT) addXP(600); else addXP(150);
      setElapsed(EXAM_MINUTES * 60 * 1000 - Math.max(0, endTime - Date.now()));
      setResults(newResults);
      setView("results");
    }
  }

  /* ── Intro ── */
  if (view === "intro") {
    return (
      <>
        <Header title="QV-Simulation" subtitle="Vollständige Prüfungssimulation" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-xl space-y-5">

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <div className="mb-3 text-5xl">🎓</div>
              <h1 className="mb-1 text-2xl font-bold text-text-primary">QV-Simulation</h1>
              <p className="text-sm text-text-secondary">
                {SESSION_SIZE} Prüfungsfragen aus allen {MODULE_CHIPS.length} Modulen — Level 2 & 3.
                Du hast <strong>{EXAM_MINUTES} Minuten</strong>.
                Bestehensgrenze: <strong>{PASSING_PCT}%</strong>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Fragen", value: SESSION_SIZE },
                { label: "Bestehensgrenze", value: `${PASSING_PCT}%` },
                { label: "Module", value: MODULE_CHIPS.length },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-surface p-4 text-center">
                  <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-secondary">
                Enthaltene Themenbereiche
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(["anlage", "kredit", "operations", "compliance"] as Category[]).map((cat) => (
                  <div key={cat} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${CATEGORY_COLOR[cat]}`}>
                    {CATEGORY_LABEL[cat]}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {MODULE_CHIPS.map((m) => (
                  <span key={m.source} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${CATEGORY_COLOR[SOURCE_CATEGORY[m.source]]}`}>
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={handleStart} className="w-full gap-2 py-3 text-base">
                Simulation starten
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

  /* ── Results ── */
  if (view === "results") {
    const correctCount = results.filter((r) => r.correct).length;
    const pct = Math.round((correctCount / results.length) * 100);
    const bestanden = pct >= PASSING_PCT;
    const elapsedMin = Math.floor(elapsed / 60000);
    const elapsedSec = Math.floor((elapsed % 60000) / 1000);

    const catResults = (["anlage", "kredit", "operations", "compliance"] as Category[]).map((cat) => {
      const catItems = results.filter((r) => r.category === cat);
      const catCorrect = catItems.filter((r) => r.correct).length;
      return { cat, total: catItems.length, correct: catCorrect };
    });

    return (
      <>
        <Header title="QV-Simulation" subtitle="Ergebnis" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl space-y-5">

            {/* Main result */}
            <div className={`rounded-2xl border p-8 text-center ${bestanden ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
              <div className="mb-3 text-5xl">{bestanden ? "🏆" : "📚"}</div>
              <h2 className="mb-1 text-2xl font-bold text-text-primary">
                {bestanden ? "Bestanden!" : "Noch nicht bestanden"}
              </h2>
              <p className="mb-4 text-sm text-text-secondary">
                {bestanden
                  ? "Du hast die QV-Bestehensgrenze erreicht. Sehr gute Leistung!"
                  : `Bestehensgrenze: ${PASSING_PCT}%. Übe die schwachen Bereiche und versuche es erneut.`}
              </p>
              <div className="text-5xl font-extrabold text-text-primary">{pct}%</div>
              <p className="mt-1 text-sm text-text-secondary">{correctCount} von {results.length} Fragen richtig</p>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
                <Clock size={12} />
                <span>Zeit: {elapsedMin}:{elapsedSec.toString().padStart(2, "0")} / {EXAM_MINUTES}:00</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${bestanden ? "bg-green-500" : "bg-amber-500"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-secondary px-1">
              <span>0%</span>
              <span className="font-semibold text-primary">{PASSING_PCT}% Bestehensgrenze</span>
              <span>100%</span>
            </div>

            {/* Category breakdown */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-secondary">Ergebnis nach Bereich</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {catResults.map(({ cat, total, correct }) => {
                  if (total === 0) return null;
                  const catPct = Math.round((correct / total) * 100);
                  return (
                    <div key={cat} className={`rounded-xl border p-4 ${CATEGORY_COLOR[cat]}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold uppercase tracking-wider">{CATEGORY_LABEL[cat]}</p>
                        <p className="text-sm font-extrabold">{catPct}%</p>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                        <div className={`h-full rounded-full ${CATEGORY_BAR[cat]}`} style={{ width: `${catPct}%` }} />
                      </div>
                      <p className="mt-1.5 text-xs opacity-70">{correct}/{total} richtig</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Per-question review */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-secondary">Alle Fragen anzeigen</p>
              <div className="space-y-2">
                {results.map((r, idx) => (
                  <div key={r.caseId} className={`rounded-xl border ${r.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                      className="flex w-full items-center gap-3 p-3 text-left"
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${r.correct ? "bg-green-500" : "bg-red-400"}`}>
                        {idx + 1}
                      </span>
                      <span className={`flex-1 text-xs font-medium truncate ${r.correct ? "text-green-800" : "text-red-800"}`}>
                        {r.question}
                      </span>
                      <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 border ${CATEGORY_COLOR[r.category]}`}>
                        {SOURCE_LABEL[r.source]}
                      </span>
                      {r.correct
                        ? <CheckCircle2 size={15} className="shrink-0 text-green-600" />
                        : <XCircle size={15} className="shrink-0 text-red-500" />}
                      {expandedIdx === idx ? <ChevronUp size={13} className="shrink-0 opacity-50" /> : <ChevronDown size={13} className="shrink-0 opacity-50" />}
                    </button>
                    {expandedIdx === idx && (
                      <div className="border-t border-black/5 px-4 pb-4 pt-3 space-y-2">
                        <p className="text-xs text-text-secondary leading-relaxed">{r.context}</p>
                        <p className="text-xs font-semibold text-text-primary">{r.question}</p>
                        {r.selected && !r.correct && (
                          <p className="text-xs text-red-700">Deine Antwort: <strong>{r.selected}</strong></p>
                        )}
                        <p className={`text-xs font-semibold ${r.correct ? "text-green-700" : "text-emerald-700"}`}>
                          Richtige Antwort: <strong>{r.correctOption}</strong>
                        </p>
                        <p className="text-xs text-text-secondary leading-relaxed border-t border-black/5 pt-2">{r.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <Button onClick={handleStart} className="w-full gap-2">
                <RotateCcw size={14} />
                Neue Simulation
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
          title="QV-Simulation"
          score={correctCount}
          total={results.length}
          moduleName="QV-Simulation"
          xpEarned={bestanden ? 600 : 150}
        />
      </>
    );
  }

  /* ── Quiz ── */
  const currentCase = cases[caseIndex];
  const isCorrect = submitted && selected === currentCase.correct;
  const isUrgent = timeLeft < 5 * 60 * 1000;

  return (
    <>
      <Header title="QV-Simulation" subtitle={`Frage ${caseIndex + 1} von ${SESSION_SIZE}`} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl">

          {/* Progress + timer */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(caseIndex / SESSION_SIZE) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-text-secondary shrink-0">
              {caseIndex + 1}/{SESSION_SIZE}
            </span>
            <div className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold shrink-0 ${isUrgent ? "border-red-300 bg-red-50 text-red-700" : "border-border bg-surface text-text-secondary"}`}>
              <Clock size={12} />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Module + category badge */}
          <div className="mb-3 flex items-center gap-2">
            <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${CATEGORY_COLOR[currentCase.category]}`}>
              {CATEGORY_LABEL[currentCase.category]}
            </span>
            <span className="text-xs text-text-secondary">{SOURCE_LABEL[currentCase.source]}</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-text-secondary">
              <Target size={11} />
              Level 2–3
            </span>
          </div>

          {/* Context */}
          <div className="mb-4 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">{currentCase.context}</p>
          </div>

          {/* Question */}
          <h2 className="mb-4 text-base font-semibold text-text-primary">{currentCase.question}</h2>

          {/* Options */}
          <div className="mb-5 space-y-2">
            {currentCase.options.map((opt) => {
              const isSelected = selected === opt.key;
              const isAnswer = submitted && opt.key === currentCase.correct;
              const isWrong = submitted && isSelected && !isAnswer;
              return (
                <button
                  key={opt.key}
                  disabled={submitted}
                  onClick={() => !submitted && setSelected(opt.key)}
                  className={`w-full rounded-xl border p-4 text-left text-sm transition-colors ${
                    isAnswer
                      ? "border-green-400 bg-green-50 text-green-800"
                      : isWrong
                      ? "border-red-400 bg-red-50 text-red-800"
                      : isSelected
                      ? "border-primary bg-primary-light text-primary"
                      : "border-border bg-surface text-text-primary hover:border-primary/50"
                  }`}
                >
                  <span className="mr-2 font-bold">{opt.key}.</span>
                  {opt.text}
                  {isAnswer && <CheckCircle2 size={14} className="ml-2 inline text-green-600" />}
                  {isWrong && <XCircle size={14} className="ml-2 inline text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {submitted && (
            <div className={`mb-5 rounded-xl border p-4 text-sm ${isCorrect ? "border-green-200 bg-green-50 text-green-900" : "border-red-200 bg-red-50 text-red-900"}`}>
              <p className="mb-1 font-semibold">{isCorrect ? "✅ Richtig!" : "❌ Leider falsch"}</p>
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
              {caseIndex < SESSION_SIZE - 1 ? "Nächste Frage" : "Ergebnis anzeigen"}
              <ArrowRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
