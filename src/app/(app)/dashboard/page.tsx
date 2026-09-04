"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, type LucideIcon } from "lucide-react";
import { User, Building2, TrendingUp, Settings2, Landmark, Flame, Target, CheckCircle2, AlertTriangle, ClipboardCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SkeletonStatCard, SkeletonModuleCard } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/useCountUp";
import { DailyChallenge } from "@/components/shared/DailyChallenge";
import { WeeklyReportModal, shouldShowWeeklyReport } from "@/components/shared/WeeklyReportModal";
import { SmartRecommendation } from "@/components/shared/SmartRecommendation";
import {
  getProgress,
  getStreak,
  seedMockDataIfEmpty,
  computeBadges,
  type ModuleProgress,
  type StreakData,
} from "@/lib/progressData";
import { getAllWeakConcepts } from "@/lib/conceptTracker";
import { getWeakScenarios, type WeakScenario } from "@/lib/error-tracking";
import { BadgeEarnAnimation, useNewlyEarnedBadge } from "@/components/shared/BadgeEarnAnimation";

interface UserProfile {
  name?: string;
  role?: string;
  abteilung?: string;
  lehrjahr?: string;
  ziel?: string;
}

// ── Personalisierung ────────────────────────────────────────────

const ABTEILUNG_LABELS: Record<string, string> = {
  privatkunde: "Privatkunde",
  firmenkunde: "Firmenkunde",
  anlagekunde: "Anlagekunde",
  backoffice: "Backoffice & ZV",
  kreditgeschaeft: "Credit Operations",
  "credit-office": "Credit Office",
};

const LEHRJAHR_LABELS: Record<string, string> = {
  lj1: "1. Lehrjahr",
  lj2: "2. Lehrjahr",
  lj3: "3. Lehrjahr",
  quereinsteiger: "Quereinsteiger",
};

const LEHRJAHR_LEVEL: Record<string, 1 | 2 | 3> = {
  lj1: 1, lj2: 2, lj3: 3, quereinsteiger: 2,
};

const LEVEL_LABEL: Record<1 | 2 | 3, string> = {
  1: "Level 1 – Einsteiger",
  2: "Level 2 – Fortgeschritten",
  3: "Level 3 – Challenge",
};

// Primary recommended module per abteilung
const ABTEILUNG_PRIMARY: Record<string, string> = {
  privatkunde: "privatkunde",
  firmenkunde: "firmenkunde",
  anlagekunde: "anlagekunde",
  backoffice: "banking-operations",
  kreditgeschaeft: "credit-operations",
  "credit-office": "credit-office",
};

// Deep link per module × level
const MODULE_LEVEL_HREFS: Record<string, Record<1 | 2 | 3, string>> = {
  privatkunde: {
    1: "/privatkunde/basis/kontoeröffnung",
    2: "/privatkunde/basis/kyc",
    3: "/privatkunde/individual/hypotheken",
  },
  firmenkunde: {
    1: "/firmenkunde",
    2: "/firmenkunde",
    3: "/firmenkunde",
  },
  anlagekunde: {
    1: "/anlagekunde/fonds",
    2: "/anlagekunde",
    3: "/anlagekunde",
  },
  "banking-operations": {
    1: "/backoffice/banking-operations/kontoeröffnungen",
    2: "/backoffice/banking-operations/kyc",
    3: "/backoffice/banking-operations/zahlungsverkehr",
  },
  "credit-operations": {
    1: "/backoffice/credit-operations",
    2: "/backoffice/credit-operations/sicherheiten",
    3: "/backoffice/credit-operations",
  },
  "credit-office": {
    1: "/backoffice/credit-office",
    2: "/backoffice/credit-office/hypothek",
    3: "/backoffice/credit-office/hypothek",
  },
};

// Within-section sort order per abteilung
const FRONT_SORT: Record<string, string[]> = {
  firmenkunde: ["firmenkunde", "anlagekunde", "privatkunde"],
  anlagekunde: ["anlagekunde", "privatkunde", "firmenkunde"],
};
const BACK_SORT: Record<string, string[]> = {
  backoffice: ["banking-operations", "credit-operations", "credit-office"],
  kreditgeschaeft: ["credit-operations", "credit-office", "banking-operations"],
  "credit-office": ["credit-office", "credit-operations", "banking-operations"],
};

// Back Office should appear first for these abteilungen
const BACK_FIRST = new Set(["backoffice", "kreditgeschaeft", "credit-office"]);

function sortByPriority<T extends { moduleId: string }>(
  items: T[],
  priority: string[] | undefined
): T[] {
  if (!priority?.length) return items;
  return [...items].sort((a, b) => {
    const ai = priority.indexOf(a.moduleId);
    const bi = priority.indexOf(b.moduleId);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

const FRONT_OFFICE_MODULES = [
  {
    title: "Privatkunde",
    description: "Basis- und Individualprodukte aus Beratersicht.",
    href: "/privatkunde",
    icon: User,
    moduleId: "privatkunde",
    totalScenarios: 10,
    abteilungen: ["privatkunde", "anlagekunde"],
  },
  {
    title: "Firmenkunde",
    description: "Firmenkonten, Tragbarkeit und Kreditengagements.",
    href: "/firmenkunde",
    icon: Building2,
    moduleId: "firmenkunde",
    totalScenarios: 7,
    abteilungen: ["firmenkunde"],
  },
  {
    title: "Anlagekunde",
    description: "Anlageberatung und Kundenprofil.",
    href: "/anlagekunde",
    icon: TrendingUp,
    moduleId: "anlagekunde",
    totalScenarios: 32,
    abteilungen: ["anlagekunde"],
  },
];

const BACK_OFFICE_MODULES = [
  {
    title: "Banking Operations",
    description: "Kontoeröffnungen, Zahlungsverkehr, KYC und Mahnwesen.",
    href: "/backoffice",
    icon: Landmark,
    moduleId: "banking-operations",
    totalScenarios: 10,
    abteilungen: ["backoffice"],
  },
  {
    title: "Credit Operations",
    description: "Kreditbearbeitung und Risikoprüfung.",
    href: "/backoffice/credit-operations",
    icon: Settings2,
    moduleId: "credit-operations",
    totalScenarios: 15,
    abteilungen: ["kreditgeschaeft"],
  },
  {
    title: "Credit Office",
    description: "Kreditprüfungen und Kreditentscheide simulieren.",
    href: "/backoffice/credit-office",
    icon: ClipboardCheck,
    moduleId: "credit-office",
    totalScenarios: 4,
    abteilungen: ["credit-office"],
  },
];

function filterByAbt<T extends { abteilungen: string[] }>(mods: T[], abt: string | undefined): T[] {
  if (!abt || abt === "keine") return mods;
  return mods.filter((m) => m.abteilungen.includes(abt));
}

function statusFromProgress(p: ModuleProgress | undefined, total: number) {
  if (!p || p.completed === 0) return "idle" as const;
  if (p.completed >= total) return "done" as const;
  return "active" as const;
}


function WeakModulesSection({ progress, modules }: { progress: Record<string, ModuleProgress>; modules: typeof FRONT_OFFICE_MODULES }) {
  const weakModules = modules.filter((m) => {
    const p = progress[m.moduleId];
    return p && p.accuracy < 70 && p.completed > 0;
  });

  if (weakModules.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle size={16} className="text-accent" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Üben empfohlen
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {weakModules.map((m) => {
          const p = progress[m.moduleId]!;
          return (
            <Link key={m.moduleId} href={m.href}>
              <div className="flex items-center gap-4 rounded-xl border border-accent/30 bg-accent-light p-4 transition-colors hover:border-accent/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <m.icon size={18} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text-primary">{m.title}</p>
                  <div className="mt-1.5">
                    <ProgressBar value={p.accuracy} max={100} />
                    <p className="mt-1 text-xs text-text-secondary">{p.accuracy}% Genauigkeit</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function RecommendedLernpfad({
  profile,
  module,
}: {
  profile: UserProfile;
  module: { title: string; href: string; icon: LucideIcon; moduleId: string };
}) {
  if (!profile.abteilung || profile.abteilung === "keine") return null;
  const level = LEHRJAHR_LEVEL[profile.lehrjahr ?? ""] ?? 2;
  const levelLabel = LEVEL_LABEL[level];
  const deepHref = MODULE_LEVEL_HREFS[module.moduleId]?.[level] ?? module.href;
  const abteilungLabel = ABTEILUNG_LABELS[profile.abteilung] ?? profile.abteilung;
  const lehrjahrLabel = LEHRJAHR_LABELS[profile.lehrjahr ?? ""];
  const RecommendedIcon = module.icon;

  return (
    <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-light p-5">
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles size={13} className="text-primary" />
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Empfohlener Lernpfad</p>
      </div>
      <p className="text-sm text-text-secondary mb-3 leading-relaxed">
        Starte mit{" "}
        <span className="font-semibold text-text-primary">
          {module.title} · {levelLabel}
        </span>{" "}
        – das passt zu{lehrjahrLabel ? ` deinem ${lehrjahrLabel}` : ""} und deiner Abteilung ({abteilungLabel}).
      </p>
      <Link href={deepHref}>
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-white/70 px-4 py-3 transition-all hover:bg-white hover:shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "#E8EBF7" }}>
            <RecommendedIcon size={20} style={{ color: "#0D1B4B" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-text-primary">{module.title}</p>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                Für dich · {levelLabel}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">Direkt zu deinem empfohlenen Level →</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function WeakConceptsBanner() {
  const [concepts, setConcepts] = useState<{ concept: string; count: number }[]>([]);
  useEffect(() => {
    const top = getAllWeakConcepts().slice(0, 5);
    setConcepts(top);
  }, []);
  if (concepts.length === 0) return null;
  return (
    <div className="mb-8 rounded-DEFAULT border border-accent/30 bg-accent-light/40 p-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={15} className="text-accent" />
        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
          Deine Schwachstellen — diese Themen kommen öfter dran
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {concepts.map(({ concept, count }) => (
          <span
            key={concept}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-surface px-3 py-1 text-xs font-medium text-text-primary"
          >
            {concept}
            <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent">
              {count}×
            </span>
          </span>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-text-secondary">
        Szenarien zu diesen Themen werden beim nächsten Modulstart bevorzugt angezeigt.
      </p>
    </div>
  );
}

function WeakScenariosBanner() {
  const [scenarios, setScenarios] = useState<WeakScenario[]>([]);
  useEffect(() => {
    setScenarios(getWeakScenarios(3));
  }, []);
  if (scenarios.length === 0) return null;
  return (
    <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={15} className="text-red-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
          Top Schwachstellen
        </span>
        <Link href="/fehler-uebersicht" className="ml-auto text-xs text-text-secondary hover:text-text-primary transition-colors">
          Alle anzeigen →
        </Link>
      </div>
      <div className="space-y-2">
        {scenarios.map((s) => (
          <Link key={`${s.moduleId}:${s.caseId}`} href={s.moduleHref}>
            <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-white/70 px-3 py-2.5 transition-colors hover:bg-white">
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">{s.caseTitle}</p>
                <p className="text-xs text-text-secondary">{s.moduleLabel}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-600">
                  {s.errorCount}× falsch
                </span>
                <span className="text-xs font-semibold" style={{ color: "#0D1B4B" }}>Üben →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const [profile, setProfile] = useState<UserProfile>({});
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [streak, setStreak] = useState<StreakData>({ current: 0, longest: 0, lastActivity: "" });
  const [loaded, setLoaded] = useState(false);
  const [showInactivity, setShowInactivity] = useState(false);
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const { pendingBadge, checkForNewBadges, dismiss: dismissBadge } = useNewlyEarnedBadge();

  // Auto-dismiss inactivity banner after 5 s
  useEffect(() => {
    if (!showInactivity) return;
    const t = setTimeout(() => setShowInactivity(false), 5000);
    return () => clearTimeout(t);
  }, [showInactivity]);

  // Load profile from Clerk metadata (source of truth)
  useEffect(() => {
    if (!clerkLoaded || !user) return;
    const p = user.unsafeMetadata?.profile as UserProfile | undefined;
    if (p) setProfile(p);
  }, [clerkLoaded, user]);

  useEffect(() => {
    seedMockDataIfEmpty();
    const prog = getProgress();
    setProgress(prog);
    const str = getStreak();
    setStreak(str);
    // Check 5-day inactivity
    if (str.lastActivity) {
      const daysSince = Math.floor(
        (Date.now() - new Date(str.lastActivity).getTime()) / 86400000
      );
      if (daysSince >= 5) setShowInactivity(true);
    }
    if (shouldShowWeeklyReport()) setShowWeeklyReport(true);
    // Check for newly earned badges
    checkForNewBadges(computeBadges());
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const abt = profile.abteilung;
  const visibleFrontModules = filterByAbt(FRONT_OFFICE_MODULES, abt);
  const visibleBackModules = filterByAbt(BACK_OFFICE_MODULES, abt);
  const allModules = [...visibleFrontModules, ...visibleBackModules];

  const totalCompleted = allModules.reduce((s, m) => s + (progress[m.moduleId]?.completed ?? 0), 0);
  const totalScenarios = allModules.reduce((s, m) => s + m.totalScenarios, 0);
  const avgAccuracy = (() => {
    const active = allModules.filter((m) => (progress[m.moduleId]?.completed ?? 0) > 0);
    if (active.length === 0) return 0;
    return Math.round(
      active.reduce((s, m) => s + (progress[m.moduleId]?.accuracy ?? 0), 0) / active.length
    );
  })();

  const frontModules = sortByPriority(
    visibleFrontModules.map((m) => ({
      ...m,
      status: statusFromProgress(progress[m.moduleId], m.totalScenarios),
      completedScenarios: progress[m.moduleId]?.completed ?? 0,
    })),
    FRONT_SORT[abt ?? ""]
  );

  const backModules = sortByPriority(
    visibleBackModules.map((m) => ({
      ...m,
      status: statusFromProgress(progress[m.moduleId], m.totalScenarios),
      completedScenarios: progress[m.moduleId]?.completed ?? 0,
    })),
    BACK_SORT[abt ?? ""]
  );

  const countStreak = useCountUp(loaded ? streak.current : 0);
  const countCompleted = useCountUp(loaded ? totalCompleted : 0);
  const countAccuracy = useCountUp(loaded ? avgAccuracy : 0);

  // Empty state: new user with no progress yet
  const isEmptyState = loaded && totalCompleted === 0;

  const primaryModuleId = ABTEILUNG_PRIMARY[profile.abteilung ?? ""] ?? "privatkunde";
  const recommendedModule =
    [...FRONT_OFFICE_MODULES, ...BACK_OFFICE_MODULES].find((m) => m.moduleId === primaryModuleId) ??
    FRONT_OFFICE_MODULES[0];

  const allModulesList = allModules;
  const completedModulesList = allModulesList.filter((m) => {
    const p = progress[m.moduleId];
    return p && p.completed >= m.totalScenarios;
  });

  return (
    <>
      <Header title="Dashboard" />
      {showWeeklyReport && <WeeklyReportModal onClose={() => setShowWeeklyReport(false)} />}
      {pendingBadge && <BadgeEarnAnimation badge={pendingBadge} onClose={dismissBadge} />}
      <div className="flex-1 overflow-y-auto p-6">

        {/* Empty / welcome state for new users */}
        {isEmptyState ? (
          <>
            <div className="mb-6 overflow-hidden rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #0D1B4B 0%, #00C9B1 100%)" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎉</span>
                <h1 className="text-xl font-bold text-white">Willkommen bei BankAcademy!</h1>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Starte dein erstes Szenario und baue dein Banking-Wissen Schritt für Schritt auf.
              </p>
            </div>

            <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-light p-5">
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles size={14} className="text-primary" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Empfohlen für dich</p>
              </div>
              <Link href={recommendedModule.href}>
                <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-white/60 p-4 transition-all hover:bg-white hover:shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "#E8EBF7" }}>
                    <recommendedModule.icon size={24} style={{ color: "#0D1B4B" }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-text-primary">{recommendedModule.title}</p>
                    <p className="text-sm text-text-secondary">Jetzt starten und erstes Szenario absolvieren</p>
                  </div>
                  <div className="rounded-full px-4 py-2 text-sm font-bold text-white" style={{ background: "#0D1B4B" }}>
                    Starten →
                  </div>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <HeroBanner name={profile.name?.trim()} />

            {/* Inactivity banner – subtle, auto-dismisses after 5 s */}
            {showInactivity && (
              <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-border bg-gray-50 px-4 py-2.5">
                <span className="text-base">👋</span>
                <p className="flex-1 text-xs text-text-secondary">
                  <span className="font-semibold text-text-primary">Willkommen zurück!</span>{" "}
                  Starte jetzt und lerne weiter.
                </p>
                <button
                  onClick={() => setShowInactivity(false)}
                  className="shrink-0 text-[11px] text-text-secondary hover:text-text-primary"
                >
                  ✕
                </button>
              </div>
            )}
          </>
        )}

        {/* Stats row – hidden for empty state */}
        {!isEmptyState && (<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {!loaded ? (
            <>
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
            </>
          ) : (
            <>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#E8EBF7" }}>
                    <Flame size={22} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">{countStreak}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">Tage Streak</p>
                  {streak.longest > streak.current && (
                    <p className="mt-1 text-xs text-accent">Rekord: {streak.longest} Tage</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#E8EBF7" }}>
                    <CheckCircle2 size={22} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">{countCompleted}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">Abgeschlossen</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#E8EBF7" }}>
                    <Target size={22} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">{countAccuracy}%</p>
                  <p className="mt-0.5 text-sm text-text-secondary">Genauigkeit</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#E8EBF7" }}>
                    <CheckCircle2 size={22} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">
                    {totalCompleted}/{totalScenarios}
                  </p>
                  <p className="mt-0.5 text-sm text-text-secondary">Szenarien total</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>)}

        {loaded && !isEmptyState && (
          <SmartRecommendation
            progress={progress}
            streak={streak}
            modules={allModulesList}
          />
        )}

        <WeakModulesSection progress={progress} modules={allModules} />

        {loaded && <WeakConceptsBanner />}

        {loaded && <WeakScenariosBanner />}

        {loaded && <DailyChallenge lehrjahr={profile.lehrjahr} />}

        {loaded && <RecommendedLernpfad profile={profile} module={recommendedModule} />}

        {BACK_FIRST.has(abt ?? "") ? (
          <>
            {visibleBackModules.length > 0 && (
              <>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Back Office
                </h2>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {!loaded
                    ? Array.from({ length: visibleBackModules.length }).map((_, i) => <SkeletonModuleCard key={i} />)
                    : backModules.map((m) => (
                        <ModuleCard key={m.title} {...m} recommended={m.moduleId === primaryModuleId} />
                      ))}
                </div>
              </>
            )}
            {visibleFrontModules.length > 0 && (
              <>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Front Office
                </h2>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {!loaded
                    ? Array.from({ length: visibleFrontModules.length }).map((_, i) => <SkeletonModuleCard key={i} />)
                    : frontModules.map((m) => (
                        <ModuleCard key={m.title} {...m} recommended={m.moduleId === primaryModuleId} />
                      ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {visibleFrontModules.length > 0 && (
              <>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Front Office
                </h2>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {!loaded
                    ? Array.from({ length: visibleFrontModules.length }).map((_, i) => <SkeletonModuleCard key={i} />)
                    : frontModules.map((m) => (
                        <ModuleCard key={m.title} {...m} recommended={m.moduleId === primaryModuleId} />
                      ))}
                </div>
              </>
            )}
            {visibleBackModules.length > 0 && (
              <>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Back Office
                </h2>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {!loaded
                    ? Array.from({ length: visibleBackModules.length }).map((_, i) => <SkeletonModuleCard key={i} />)
                    : backModules.map((m) => (
                        <ModuleCard key={m.title} {...m} recommended={m.moduleId === primaryModuleId} />
                      ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Certificates for completed modules */}
        {loaded && completedModulesList.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Zertifikate
            </h2>
            <div className="flex flex-wrap gap-3">
              {completedModulesList.map((m) => (
                <Button key={m.moduleId} asChild variant="secondary" size="sm">
                  <Link href={`/zertifikat/${m.moduleId}`}>🎓 {m.title}</Link>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="sm">
            <Link href="/badges">🏆 Meine Badges</Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/fehler-uebersicht">❌ Fehler Übersicht</Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/lernpfad">🗺️ Lernpfad</Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/community/cases">📋 Praxisfälle</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
