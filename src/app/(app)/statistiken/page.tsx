"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, AlertCircle, CheckCircle2, Flame, Clock, TrendingUp, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SkeletonStatCard } from "@/components/ui/skeleton";
import { getProgress, getStreak, computeBadges, type ModuleProgress } from "@/lib/progressData";
import { getXP } from "@/lib/xpData";

const MODULE_META: Record<string, { name: string; total: number }> = {
  privatkunde: { name: "Privatkunde", total: 10 },
  firmenkunde: { name: "Firmenkunde", total: 7 },
  anlagekunde: { name: "Anlagekunde", total: 4 },
  "banking-operations": { name: "Bankbetrieb", total: 4 },
  "credit-operations": { name: "Kreditgeschäft", total: 5 },
};

function scoreBg(accuracy: number): string {
  if (accuracy >= 85) return "bg-green-50 text-green-700";
  if (accuracy >= 70) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-600";
}

function Heatmap({ activityDates }: { activityDates: Set<string> }) {
  const weeks = 12;
  const days: { date: string; active: boolean; dayOfWeek: number }[] = [];
  const today = new Date();

  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    days.push({ date: dateStr, active: activityDates.has(dateStr), dayOfWeek: d.getDay() });
  }

  const columns: (typeof days)[] = [];
  for (let w = 0; w < weeks; w++) {
    columns.push(days.slice(w * 7, w * 7 + 7));
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {columns.map((col, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {col.map((day) => (
              <div
                key={day.date}
                title={`${day.date}${day.active ? " – Aktiv" : ""}`}
                className="h-3 w-3 rounded-sm transition-colors"
                style={{
                  background: day.active ? "#0D1B4B" : "#e5e7eb",
                  opacity: day.active ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 text-[10px] text-text-secondary">
        <div className="h-3 w-3 rounded-sm" style={{ background: "#e5e7eb", opacity: 0.5 }} />
        <span>Kein Training</span>
        <div className="h-3 w-3 rounded-sm ml-2" style={{ background: "#0D1B4B" }} />
        <span>Aktiv</span>
      </div>
    </div>
  );
}

export default function StatistikenPage() {
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [streak, setStreak] = useState({ current: 0, longest: 0, lastActivity: "" });
  const [earnedBadges, setEarnedBadges] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [xp, setXp] = useState(0);
  const [activityDates, setActivityDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prog = getProgress();
    setProgress(prog);
    const str = getStreak();
    setStreak(str);
    const badges = computeBadges();
    setEarnedBadges(badges.filter((b) => b.earnedAt).length);
    setXp(getXP());

    // Build activity date set from streak + lastAttempt dates
    const dates = new Set<string>();
    try {
      const stored = JSON.parse(localStorage.getItem("activity-dates") ?? "[]") as string[];
      stored.forEach((d) => dates.add(d));
    } catch {}
    // Also add lastAttempt dates from modules
    Object.values(prog).forEach((m) => {
      if (m.lastAttempt) dates.add(m.lastAttempt.slice(0, 10));
    });
    // Backfill streak days
    if (str.current > 0) {
      for (let i = 0; i < Math.min(str.current, 30); i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.add(d.toISOString().slice(0, 10));
      }
    }
    setActivityDates(dates);
    setLoaded(true);
  }, []);

  const modules = Object.entries(MODULE_META).map(([id, meta]) => {
    const p = progress[id];
    return {
      id,
      name: meta.name,
      total: meta.total,
      completed: p?.completed ?? 0,
      accuracy: p?.completed ? p.accuracy : null,
      lastAttempt: p?.lastAttempt ?? null,
    };
  });

  const totalCompleted = modules.reduce((s, m) => s + m.completed, 0);
  const totalErrors = Object.values(progress).reduce((s, m) => s + (m.errors?.length ?? 0), 0);
  const totalModules = Object.keys(MODULE_META).length;
  const completedModules = modules.filter((m) => m.completed >= m.total && m.total > 0).length;
  const studyMinutes = totalCompleted * 3;

  const weakModules = modules.filter((m) => m.accuracy !== null && m.accuracy < 70 && m.completed > 0);
  const strongModules = modules.filter((m) => m.accuracy !== null && m.accuracy >= 85);

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
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-2" style={{ background: "#E8EBF7" }}>
                    <Clock size={18} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="text-2xl font-bold text-text-primary">
                    {studyMinutes < 60 ? `${studyMinutes}m` : `${Math.floor(studyMinutes / 60)}h ${studyMinutes % 60}m`}
                  </p>
                  <p className="text-xs text-text-secondary">Lernzeit (geschätzt)</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-2" style={{ background: "#E8EBF7" }}>
                    <Flame size={18} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{streak.longest}</p>
                  <p className="text-xs text-text-secondary">Bester Streak (Tage)</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-2" style={{ background: "#E8EBF7" }}>
                    <TrendingUp size={18} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="text-2xl font-bold text-text-primary">⚡ {xp}</p>
                  <p className="text-xs text-text-secondary">XP verdient</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-2" style={{ background: "#E8EBF7" }}>
                    <BookOpen size={18} style={{ color: "#0D1B4B" }} />
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{completedModules}/{totalModules}</p>
                  <p className="text-xs text-text-secondary">Module abgeschlossen</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Activity heatmap */}
        <div className="mb-8 rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Aktivität – letzte 12 Wochen
          </h2>
          {!loaded ? (
            <div className="flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div key={j} className="h-3 w-3 rounded-sm bg-gray-200 animate-pulse" />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <Heatmap activityDates={activityDates} />
          )}
        </div>

        {/* Module breakdown table */}
        {loaded && modules.some((m) => m.completed > 0) && (
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Detaillierter Überblick
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary">Modul</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary">Szenarien</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary">Score</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary hidden sm:table-cell">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-text-secondary hidden md:table-cell">Zuletzt</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m, i) => (
                    <tr key={m.id} className={i < modules.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-4 py-3 font-medium text-text-primary">{m.name}</td>
                      <td className="px-4 py-3 text-center text-text-secondary">
                        {m.completed}/{m.total}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {m.accuracy !== null ? (
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${scoreBg(m.accuracy)}`}>
                            {m.accuracy}%
                          </span>
                        ) : (
                          <span className="text-xs text-text-secondary">–</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        {m.completed === 0 ? (
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-text-secondary">Nicht gestartet</span>
                        ) : m.completed >= m.total ? (
                          <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">✅ Abgeschlossen</span>
                        ) : (
                          <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-semibold text-accent">In Bearbeitung</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-text-secondary hidden md:table-cell">
                        {m.lastAttempt ? new Date(m.lastAttempt).toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" }) : "–"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Weak areas */}
        {loaded && weakModules.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <AlertCircle size={14} className="text-accent" />
              Diese Bereiche brauchen Aufmerksamkeit
            </h2>
            <div className="space-y-3">
              {weakModules.map((m) => (
                <div key={m.id} className="flex items-center gap-4 rounded-xl border border-accent/20 bg-accent-light p-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary text-sm">{m.name}</p>
                    <div className="mt-1.5">
                      <ProgressBar value={m.completed} max={m.total} />
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">{m.accuracy}% Genauigkeit · {m.completed}/{m.total} Szenarien</p>
                  </div>
                  <Link
                    href={`/${m.id === "banking-operations" ? "backoffice" : m.id === "credit-operations" ? "backoffice/credit-operations" : m.id}`}
                    className="shrink-0 rounded-full px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-85"
                    style={{ background: "#0D1B4B" }}
                  >
                    Jetzt üben →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strong areas */}
        {loaded && strongModules.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-600" />
              Deine Stärken
            </h2>
            <div className="space-y-3">
              {strongModules.map((m) => (
                <div key={m.id} className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary text-sm">{m.name}</p>
                    <p className="mt-0.5 text-xs text-green-700">{m.accuracy}% Genauigkeit – hervorragend!</p>
                  </div>
                  <span className="shrink-0 text-lg">🏆</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
