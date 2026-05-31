"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import {
  getProgress,
  getStreak,
  seedMockDataIfEmpty,
  type ModuleProgress,
  type StreakData,
} from "@/lib/progressData";

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
    title: "Credit Operations",
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

  useEffect(() => {
    seedMockDataIfEmpty();
    try {
      const raw = localStorage.getItem("user-profile");
      if (raw) {
        const p = JSON.parse(raw);
        setProfile(p);
      }
    } catch {}
    setProgress(getProgress());
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
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
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

  return (
    <>
      <Header title="Dashboard" />
      {showWeeklyReport && <WeeklyReportModal onClose={() => setShowWeeklyReport(false)} />}
      <div className="flex-1 overflow-y-auto p-6">

        <HeroBanner name={profile.name?.trim()} />

        {/* Inactivity banner */}
        {showInactivity && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary-light p-4">
            <span className="text-xl">👋</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary">Willkommen zurück!</p>
              <p className="text-xs text-text-secondary">
                Dein Streak läuft noch – starte jetzt und lerne weiter!
              </p>
            </div>
            <button
              onClick={() => setShowInactivity(false)}
              className="text-text-secondary hover:text-text-primary text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                    🔥
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                    <CheckCircle2 size={22} className="text-primary" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">{countCompleted}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">Abgeschlossen</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light">
                    <Target size={22} className="text-accent" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">{countAccuracy}%</p>
                  <p className="mt-0.5 text-sm text-text-secondary">Genauigkeit</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                    <Flame size={22} className="text-primary" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">
                    {totalCompleted}/{totalScenarios}
                  </p>
                  <p className="mt-0.5 text-sm text-text-secondary">Szenarien total</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

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
        </div>
      </div>
    </>
  );
}
