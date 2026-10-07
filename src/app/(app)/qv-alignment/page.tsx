"use client";

import { useState } from "react";
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
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
import {
  HK_LEVEL_MAPPING,
  MATRIX_HKS,
  MATRIX_HK_LABELS,
  ABTEILUNG_LABELS,
  ABTEILUNG_COLORS,
  type AbteilungId,
} from "@/lib/hkLevelMapping";

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

const LEVEL_BADGE: Record<1 | 2 | 3, string> = {
  1: "bg-blue-50 text-blue-700 border border-blue-200",
  2: "bg-amber-50 text-amber-700 border border-amber-200",
  3: "bg-red-50 text-red-700 border border-red-200",
};

const ABTEILUNG_ORDER: AbteilungId[] = [
  "privatkunde",
  "anlage",
  "firmenkunde",
  "backoffice",
  "simulationen",
];

function getHkCoverageSet(): Set<string> {
  const covered = new Set<string>();
  for (const m of MODULES_WITH_HK) {
    for (const hk of m.hks) covered.add(hk);
  }
  return covered;
}

// ─── ThemaCard ──────────────────────────────────────────────────────────────
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

// ─── HK Matrix ──────────────────────────────────────────────────────────────
function HkMatrix() {
  const [openAbteilungen, setOpenAbteilungen] = useState<Set<AbteilungId>>(
    new Set(["privatkunde"])
  );

  const toggle = (a: AbteilungId) => {
    setOpenAbteilungen((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  };

  const byAbteilung = new Map<AbteilungId, typeof HK_LEVEL_MAPPING>();
  for (const abt of ABTEILUNG_ORDER) {
    byAbteilung.set(
      abt,
      HK_LEVEL_MAPPING.filter((m) => m.abteilung === abt)
    );
  }

  return (
    <div className="space-y-2">
      {ABTEILUNG_ORDER.map((abt) => {
        const modules = byAbteilung.get(abt) ?? [];
        const isOpen = openAbteilungen.has(abt);
        const color = ABTEILUNG_COLORS[abt];

        // Count distinct HKs trained in this abteilung
        const abtHks = new Set(modules.flatMap((m) => m.levels.flatMap((l) => l.hks)));

        return (
          <div key={abt} className="overflow-hidden rounded-xl border border-border">
            {/* Abteilung header */}
            <button
              className="flex w-full items-center gap-3 bg-surface px-4 py-3 text-left transition-colors hover:bg-surface/80"
              onClick={() => toggle(abt)}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: color }}
              />
              <span className="flex-1 text-sm font-bold text-text-primary">
                {ABTEILUNG_LABELS[abt]}
              </span>
              <span className="text-[11px] text-text-secondary">
                {modules.length} Module · {abtHks.size} HKs
              </span>
              <ChevronDown
                size={14}
                className={`text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Matrix table */}
            {isOpen && (
              <div className="overflow-x-auto border-t border-border">
                <table className="w-full min-w-[640px] border-collapse text-xs">
                  {/* Column headers */}
                  <thead>
                    <tr className="border-b border-border bg-background">
                      <th className="w-44 px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                        Modul
                      </th>
                      <th className="w-8 px-1 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                        Lvl
                      </th>
                      {MATRIX_HKS.map((hk) => (
                        <th
                          key={hk}
                          title={MATRIX_HK_LABELS[hk]}
                          className="w-8 px-0.5 py-2 text-center font-bold uppercase tracking-wider text-text-secondary"
                          style={{ fontSize: "10px" }}
                        >
                          {hk.toUpperCase()}
                        </th>
                      ))}
                      <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                        Fokus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((modul, mi) =>
                      modul.levels.map((lvl, li) => {
                        const isFirstRow = li === 0;
                        const isLastModuleRow = li === modul.levels.length - 1;
                        return (
                          <tr
                            key={`${modul.moduleId}-${lvl.level}`}
                            className={`${
                              isLastModuleRow && mi < modules.length - 1
                                ? "border-b border-border"
                                : ""
                            } ${li % 2 === 0 ? "bg-background" : "bg-surface/40"}`}
                          >
                            {/* Module name — only on first level row */}
                            <td className="px-3 py-1.5 align-top">
                              {isFirstRow && (
                                <span className="font-semibold text-text-primary">
                                  {modul.name}
                                </span>
                              )}
                            </td>

                            {/* Level badge */}
                            <td className="px-1 py-1.5 text-center align-middle">
                              <span
                                className={`inline-block rounded px-1 py-0.5 text-[9px] font-bold ${LEVEL_BADGE[lvl.level]}`}
                              >
                                L{lvl.level}
                              </span>
                            </td>

                            {/* HK cells */}
                            {MATRIX_HKS.map((hk) => {
                              const covered = lvl.hks.includes(hk);
                              return (
                                <td
                                  key={hk}
                                  className="py-1.5 text-center align-middle"
                                  title={covered ? `${hk.toUpperCase()}: ${MATRIX_HK_LABELS[hk]}` : undefined}
                                >
                                  {covered ? (
                                    <span
                                      className="inline-block h-3 w-3 rounded-full"
                                      style={{ background: color }}
                                    />
                                  ) : (
                                    <span className="inline-block h-1 w-1 rounded-full bg-gray-200" />
                                  )}
                                </td>
                              );
                            })}

                            {/* Fokus */}
                            <td className="px-3 py-1.5 align-middle text-[11px] text-text-secondary">
                              {lvl.fokus}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      {/* HK legend */}
      <div className="rounded-lg border border-border bg-surface px-4 py-3">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
          Legende Handlungskompetenzen
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {MATRIX_HKS.map((hk) => (
            <span key={hk} className="text-[11px] text-text-secondary">
              <span className="font-bold text-text-primary">{hk.toUpperCase()}</span>{" "}
              {MATRIX_HK_LABELS[hk]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HKRow (KV21 list) ───────────────────────────────────────────────────────
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

// ─── Page ────────────────────────────────────────────────────────────────────
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

  const bereichGroups = (["a", "b", "c", "d", "e"] as HKBereich[]).map((b) => ({
    bereich: b,
    label: BEREICH_LABELS[b],
    hks: HANDLUNGSKOMPETENZEN.filter((hk) => hk.bereich === b),
  }));

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
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
          <h2 className="text-base font-bold text-text-primary">Bankfachliche Kompetenzen</h2>
          <p className="text-xs text-text-secondary">
            Spezifische Brancheninhalte der Banklehre — direkt auf das Qualifikationsverfahren ausgerichtet
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BANK_THEMEN.map((thema) => (
            <ThemaCard key={thema.id} thema={thema} />
          ))}
        </div>
      </section>

      {/* HK Matrix — Module + Level Ansicht */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-bold text-text-primary">
            Modul- & Level-Matrix
          </h2>
          <p className="text-xs text-text-secondary">
            Welche Handlungskompetenzen werden auf welcher Schwierigkeitsstufe trainiert — geordnet
            nach Abteilung. L1 = Grundlagen · L2 = Vertiefung · L3 = Experte
          </p>
        </div>
        <HkMatrix />
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
