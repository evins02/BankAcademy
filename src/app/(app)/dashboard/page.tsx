"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, type LucideIcon } from "lucide-react";
import { User, Building2, TrendingUp, Settings2, Landmark, Flame, Target, CheckCircle2, AlertTriangle } from "lucide-react";
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
import { BadgeEarnAnimation, useNewlyEarnedBadge } from "@/components/shared/BadgeEarnAnimation";

interface UserProfile {
  name?: string;
  role?: string;
}

const FRONT_OFFICE_MODULES = [
  {
    title: "Privatkunde",
    description: "Basis- und Individualprodukte aus Beratersicht.",
    href: "/privatkunde",
    icon: User,
    moduleId: "privatkunde",
    totalScenarios: 10,
  },
  {
    title: "Firmenkunde",
    description: "Firmenkonten, Tragbarkeit und Kreditengagements.",
    href: "/firmenkunde",
    icon: Building2,
    moduleId: "firmenkunde",
    totalScenarios: 7,
  },
  {
    title: "Anlagekunde",
    description: "Anlageberatung und Kundenprofil.",
    href: "/anlagekunde",
    icon: TrendingUp,
    moduleId: "anlagekunde",
    totalScenarios: 4,
  },
];

const BACK_OFFICE_MODULES = [
  {
    title: "Banking Operations",
    description: "Kontoeröffnungen, Zahlungsverkehr, KYC und Mahnwesen.",
    href: "/backoffice",
    icon: Landmark,
    moduleId: "banking-operations",
    totalScenarios: 4,
  },
  {
    title: "Kreditgeschäft",
    description: "Kreditbearbeitung und Risikoprüfung.",
    href: "/backoffice/credit-operations",
    icon: Settings2,
    moduleId: "credit-operations",
    totalScenarios: 5,
  },
];

function statusFromProgress(p: ModuleProgress | undefined, total: number) {
  if (!p || p.completed === 0) return "idle" as const;
  if (p.completed >= total) return "done" as const;
  return "active" as const;
}


function WeakModulesSection({ progress }: { progress: Record<string, ModuleProgress> }) {
  const weakModules = [...FRONT_OFFICE_MODULES, ...BACK_OFFICE_MODULES].filter((m) => {
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

export default function DashboardPage() {
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

  useEffect(() => {
    seedMockDataIfEmpty();
    try {
      const raw = localStorage.getItem("user-profile");
      if (raw) {
        const p = JSON.parse(raw);
        setProfile(p);
      }
    } catch {}
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

  const allModules = [...FRONT_OFFICE_MODULES, ...BACK_OFFICE_MODULES];
  const totalCompleted = allModules.reduce((s, m) => s + (progress[m.moduleId]?.completed ?? 0), 0);
  const totalScenarios = allModules.reduce((s, m) => s + m.totalScenarios, 0);
  const avgAccuracy = (() => {
    const active = allModules.filter((m) => (progress[m.moduleId]?.completed ?? 0) > 0);
    if (active.length === 0) return 0;
    return Math.round(
      active.reduce((s, m) => s + (progress[m.moduleId]?.accuracy ?? 0), 0) / active.length
    );
  })();

  const frontModules = FRONT_OFFICE_MODULES.map((m) => ({
    ...m,
    status: statusFromProgress(progress[m.moduleId], m.totalScenarios),
    completedScenarios: progress[m.moduleId]?.completed ?? 0,
  }));

  const backModules = BACK_OFFICE_MODULES.map((m) => ({
    ...m,
    status: statusFromProgress(progress[m.moduleId], m.totalScenarios),
    completedScenarios: progress[m.moduleId]?.completed ?? 0,
  }));

  const countStreak = useCountUp(loaded ? streak.current : 0);
  const countCompleted = useCountUp(loaded ? totalCompleted : 0);
  const countAccuracy = useCountUp(loaded ? avgAccuracy : 0);

  // Empty state: new user with no progress yet
  const isEmptyState = loaded && totalCompleted === 0;

  // Recommend first module based on role
  const roleToModule: Record<string, { title: string; href: string; icon: LucideIcon }> = {
    Privatkunde: { title: "Privatkunde", href: "/privatkunde", icon: User },
    Firmenkunde: { title: "Firmenkunde", href: "/firmenkunde", icon: Building2 },
    "Back Office": { title: "Banking Operations", href: "/backoffice", icon: Landmark },
  };
  const recommended: { title: string; href: string; icon: LucideIcon } =
    (profile.role ? roleToModule[profile.role] : undefined) ?? { title: "Privatkunde", href: "/privatkunde", icon: User };

  const allModulesList = [...FRONT_OFFICE_MODULES, ...BACK_OFFICE_MODULES];
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
                Starte dein erstes Szenario und baue dein Banking-Wissen auf.<br />
                Wähle ein Modul aus und leg los – kostenlos und ohne Anmeldung.
              </p>
            </div>

            <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-light p-5">
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles size={14} className="text-primary" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Empfohlen für dich</p>
              </div>
              <Link href={recommended.href}>
                <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-white/60 p-4 transition-all hover:bg-white hover:shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "#E8EBF7" }}>
                    <recommended.icon size={24} style={{ color: "#0D1B4B" }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-text-primary">{recommended.title}</p>
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

        <WeakModulesSection progress={progress} />

        {loaded && <DailyChallenge />}

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Front Office
        </h2>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!loaded
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonModuleCard key={i} />)
            : frontModules.map((m) => <ModuleCard key={m.title} {...m} />)}
        </div>

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Back Office
        </h2>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!loaded
            ? Array.from({ length: 2 }).map((_, i) => <SkeletonModuleCard key={i} />)
            : backModules.map((m) => <ModuleCard key={m.title} {...m} />)}
        </div>

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
            <Link href="/leaderboard">📊 Leaderboard</Link>
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
