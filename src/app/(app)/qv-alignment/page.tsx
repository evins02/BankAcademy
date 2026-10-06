"use client";

import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Shield,
  TrendingUp,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import { BANK_THEMEN, BT_TOTAL_SCENARIOS, type BankThema } from "@/lib/bankThemen";
import { HANDLUNGSKOMPETENZEN, BEREICH_LABELS, type HKBereich } from "@/lib/handlungskompetenzenData";
import { MODULES_WITH_HK } from "@/lib/hkModuleMapping";

const ICON_MAP: Record<string, LucideIcon> = {
  CreditCard,
  TrendingUp,
  Shield,
  Building2,
  Home,
  Umbrella,
  FileText,
  MessageSquare,
};

const BEREICH_COLORS: Record<HKBereich, string> = {
  a: "bg-slate-100 text-slate-700 border-slate-200",
  b: "bg-blue-50 text-blue-700 border-blue-200",
  c: "bg-amber-50 text-amber-700 border-amber-200",
  d: "bg-emerald-50 text-emerald-700 border-emerald-200",
  e: "bg-violet-50 text-violet-700 border-violet-200",
};

function getHkCoverageSet(): Set<string> {
  const covered = new Set<string>();
  for (const m of MODULES_WITH_HK) {
    for (const hk of m.hks) covered.add(hk);
  }
  return covered;
}

function ThemaCard({ thema }: { thema: BankThema }) {
  const Icon = ICON_MAP[thema.icon] ?? BookOpen;
  const moduleCount = MODULES_WITH_HK.filter(
    (m) => m.bankThemaId === thema.id
  ).length;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-card">
      <div className="mb-3 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `${thema.color}18`, border: `1px solid ${thema.color}33` }}
        >
          <Icon size={20} style={{ color: thema.color }} strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-text-primary">{thema.titel}</h3>
          <p className="mt-0.5 text-xs text-text-secondary">{moduleCount} Module</p>
        </div>
        <span
          className="ml-auto shrink-0 text-lg font-extrabold tabular-nums"
          style={{ color: thema.color }}
        >
          {thema.totalScenarios}
        </span>
      </div>

      {/* Subthemen */}
      <ul className="space-y-1">
        {thema.subthemen.map((s) => (
          <li key={s} className="flex items-start gap-1.5 text-xs text-text-secondary">
            <CheckCircle2 size={11} className="mt-0.5 shrink-0 text-primary" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HKRow({
  code,
  titel,
  bereich,
  covered,
  bankspezifisch,
}: {
  code: string;
  titel: string;
  bereich: HKBereich;
  covered: boolean;
  bankspezifisch: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
        covered
          ? "border-primary/20 bg-primary-light/40"
          : "border-border bg-background opacity-50"
      }`}
    >
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          covered ? "bg-primary text-white" : "border border-border bg-surface text-transparent"
        }`}
      >
        {covered && <CheckCircle2 size={12} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
            {code.toUpperCase()}
          </span>
          {bankspezifisch && (
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
              Bankspezifisch
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-text-primary">{titel}</p>
      </div>
    </div>
  );
}

export default function QvAlignmentPage() {
  const coveredHks = getHkCoverageSet();
  const totalHks = HANDLUNGSKOMPETENZEN.length;
  const coveredCount = HANDLUNGSKOMPETENZEN.filter((hk) =>
    coveredHks.has(hk.code)
  ).length;
  const bankspezifischCovered = HANDLUNGSKOMPETENZEN.filter(
    (hk) => hk.bankspezifisch && coveredHks.has(hk.code)
  ).length;
  const bankspezifischTotal = HANDLUNGSKOMPETENZEN.filter(
    (hk) => hk.bankspezifisch
  ).length;

  const totalModules = MODULES_WITH_HK.length;

  const bereichGroups = (
    ["a", "b", "c", "d", "e"] as HKBereich[]
  ).map((b) => ({
    bereich: b,
    label: BEREICH_LABELS[b],
    hks: HANDLUNGSKOMPETENZEN.filter((hk) => hk.bereich === b),
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Header */}
      <div>
        <div className="mb-1 flex items-center gap-2">
          <Award size={18} className="text-primary" />
          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            QV-Alignment
          </p>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
          Handlungskompetenzen & Fachthemen
        </h1>
        <p className="mt-1 max-w-xl text-sm text-text-secondary">
          Übersicht wie BankAcademy die KV21-Handlungskompetenzen und die bankspezifischen
          Fachthemen des Qualifikationsverfahrens abdeckt.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Szenarien total", value: BT_TOTAL_SCENARIOS + "+", color: "text-primary" },
          { label: "Fachthemen", value: String(BANK_THEMEN.length), color: "text-amber-600" },
          { label: "Module abgedeckt", value: String(totalModules), color: "text-violet-600" },
          {
            label: "Bankspez. HKs",
            value: `${bankspezifischCovered}/${bankspezifischTotal}`,
            color: "text-emerald-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-surface p-4 text-center"
          >
            <p className={`text-2xl font-extrabold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-[11px] text-text-secondary">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Banking Fachthemen */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-bold text-text-primary">
            Bankfachliche Kompetenzen
          </h2>
          <p className="text-xs text-text-secondary">
            Spezifische Brancheninhalte — direkt abgestimmt auf die Branchenkenntnis-Prüfung von CYP
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BANK_THEMEN.map((thema) => (
            <ThemaCard key={thema.id} thema={thema} />
          ))}
        </div>
      </section>

      {/* KV21 Handlungskompetenzen */}
      <section>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-text-primary">
              KV21 Handlungskompetenzen
            </h2>
            <p className="text-xs text-text-secondary">
              {coveredCount} von {totalHks} HKs durch BankAcademy-Module trainiert
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-lg font-extrabold text-primary tabular-nums">
              {Math.round((coveredCount / totalHks) * 100)}%
            </div>
            <div className="text-[10px] text-text-secondary">Abdeckung</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${(coveredCount / totalHks) * 100}%` }}
          />
        </div>

        <div className="space-y-6">
          {bereichGroups.map(({ bereich, label, hks }) => {
            const bereichCovered = hks.filter((hk) => coveredHks.has(hk.code)).length;
            return (
              <div key={bereich}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${BEREICH_COLORS[bereich]}`}
                  >
                    {bereich.toUpperCase()}
                  </span>
                  <p className="text-xs font-semibold text-text-primary">{label}</p>
                  <span className="ml-auto text-[11px] text-text-secondary">
                    {bereichCovered}/{hks.length}
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {hks.map((hk) => (
                    <HKRow
                      key={hk.code}
                      code={hk.code}
                      titel={hk.titel}
                      bereich={hk.bereich}
                      covered={coveredHks.has(hk.code)}
                      bankspezifisch={hk.bankspezifisch}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Note */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs text-amber-800">
          <span className="font-bold">Hinweis:</span> Die{" "}
          <span className="font-semibold">bankspezifischen</span> HKs (b1, d1–d6) werden durch
          Simulationen und Fallszenarien mit KI-Auswertung trainiert. HKs aus Bereichen A, C und E
          sind in der Banklehre weniger prüfungsrelevant — hier sind üK und Betrieb die primären
          Lernorte. BankAcademy ergänzt diese gezielt im Bereich Fachkompetenz und Kundeninteraktion.
        </p>
      </div>
    </div>
  );
}
