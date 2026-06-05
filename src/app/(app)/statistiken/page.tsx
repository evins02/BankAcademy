"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, AlertCircle, Target, CheckCircle2, Flame } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton, SkeletonStatCard } from "@/components/ui/skeleton";
import { getProgress, getStreak, computeBadges, type ModuleProgress } from "@/lib/progressData";

export default function StatistikenPage() {
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [streak, setStreak] = useState({ current: 0, longest: 0, lastActivity: "" });
  const [earnedBadges, setEarnedBadges] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setStreak(getStreak());
    const badges = computeBadges();
    setEarnedBadges(badges.filter((b) => b.earnedAt).length);
    setLoaded(true);
  }, []);

  const modules = Object.values(progress);
  const totalCompleted = modules.reduce((s, m) => s + m.completed, 0);
  const totalErrors = modules.reduce((s, m) => s + (m.errors?.length ?? 0), 0);
  const avgAccuracy =
    modules.filter((m) => m.completed > 0).length > 0
      ? Math.round(
          modules.filter((m) => m.completed > 0).reduce((s, m) => s + m.accuracy, 0) /
            modules.filter((m) => m.completed > 0).length
        )
      : 0;

  const MODULE_NAMES: Record<string, string> = {
    privatkunde: "Privatkunde",
    firmenkunde: "Firmenkunde",
    anlagekunde: "Anlagekunde",
    "banking-operations": "Banking Operations",
    "credit-operations": "Credit Operations",
  };

  return (
    <>
      <Header title="Statistiken" subtitle="Dein Lernfortschritt auf einen Blick" />
      <div className="flex-1 overflow-y-auto p-6">

        {/* Overview cards */}
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
                  <CheckCircle2 size={20} className="mb-2 text-primary" />
                  <p className="text-2xl font-bold text-text-primary">{totalCompleted}</p>
                  <p className="text-xs text-text-secondary">Szenarien</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <Target size={20} className="mb-2 text-accent" />
                  <p className="text-2xl font-bold text-text-primary">{avgAccuracy}%</p>
                  <p className="text-xs text-text-secondary">Genauigkeit</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <Flame size={20} className="mb-2 text-orange-500" />
                  <p className="text-2xl font-bold text-text-primary">{streak.current}</p>
                  <p className="text-xs text-text-secondary">Streak (Tage)</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <Award size={20} className="mb-2 text-yellow-500" />
                  <p className="text-2xl font-bold text-text-primary">{earnedBadges}</p>
                  <p className="text-xs text-text-secondary">Badges</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Module breakdown */}
        {!loaded ? (
          <div className="mb-8">
            <Skeleton className="mb-4 h-4 w-40" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ) : modules.length > 0 ? (
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Fortschritt nach Modul
            </h2>
            <div className="space-y-3">
              {modules.map((m) => (
                <div key={m.moduleId} className="rounded-xl border border-border bg-surface p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary">
                      {MODULE_NAMES[m.moduleId] ?? m.moduleId}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {m.completed}/{m.total} · {m.accuracy}% Genauigkeit
                    </p>
                  </div>
                  <ProgressBar value={m.completed} max={Math.max(m.total, 1)} />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Quick links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/badges">
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/30 hover:bg-primary-light">
              <Award size={28} className="text-primary" />
              <div>
                <p className="font-semibold text-text-primary">Badges</p>
                <p className="text-sm text-text-secondary">{earnedBadges} verdient</p>
              </div>
            </div>
          </Link>
          <Link href="/fehler-uebersicht">
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-accent-light">
              <AlertCircle size={28} className="text-accent" />
              <div>
                <p className="font-semibold text-text-primary">Fehler Übersicht</p>
                <p className="text-sm text-text-secondary">{totalErrors} Fehler aufgezeichnet</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
