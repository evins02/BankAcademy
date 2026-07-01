"use client";

import { useState, useEffect } from "react";
import { X, TrendingUp, CheckCircle2, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProgress, getStreak } from "@/lib/progressData";
import { getXP, getXPLevel } from "@/lib/xpData";

interface WeeklyReportModalProps {
  onClose: () => void;
}

interface WeekStats {
  scenariosCompleted: number;
  xpEarned: number;
  avgAccuracy: number;
  streakDays: number;
  topModule: string;
  levelTitle: string;
}

function computeWeekStats(): WeekStats {
  const progress = getProgress();
  const streak = getStreak();
  const xp = getXP();
  const modules = Object.values(progress);

  const active = modules.filter((m) => m.completed > 0);
  const totalCompleted = active.reduce((s, m) => s + m.completed, 0);
  const avgAcc = active.length > 0
    ? Math.round(active.reduce((s, m) => s + m.accuracy, 0) / active.length)
    : 0;

  const topMod = active.sort((a, b) => b.completed - a.completed)[0];

  const MODULE_NAMES: Record<string, string> = {
    privatkunde: "Privatkunde",
    firmenkunde: "Firmenkunde",
    anlagekunde: "Anlagekunde",
    "banking-operations": "Banking Operations",
    "credit-operations": "Kreditgeschäft",
  };

  return {
    scenariosCompleted: totalCompleted,
    xpEarned: xp,
    avgAccuracy: avgAcc,
    streakDays: streak.current,
    topModule: topMod ? (MODULE_NAMES[topMod.moduleId] ?? topMod.moduleId) : "–",
    levelTitle: getXPLevel(xp).title,
  };
}

function StatBox({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl bg-background p-4 text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
        {icon}
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="mt-0.5 text-xs text-text-secondary">{label}</p>
      {sub && <p className="mt-0.5 text-[10px] font-medium text-primary">{sub}</p>}
    </div>
  );
}

export function WeeklyReportModal({ onClose }: WeeklyReportModalProps) {
  const [stats, setStats] = useState<WeekStats | null>(null);

  useEffect(() => {
    setStats(computeWeekStats());
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("last-weekly-report", today);
  }, []);

  if (!stats) return null;

  const greeting = new Date().getHours() < 12 ? "Guten Morgen" : "Hallo";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md animate-scale-in rounded-2xl border border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <div>
              <h2 className="text-base font-bold text-text-primary">Dein Wochenbericht</h2>
              <p className="text-xs text-text-secondary">{greeting}! Hier dein Lernrückblick.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-secondary hover:bg-gray-100 hover:text-text-primary"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-5">
            <StatBox
              icon={<CheckCircle2 size={18} className="text-primary" />}
              label="Szenarien abgeschlossen"
              value={stats.scenariosCompleted}
            />
            <StatBox
              icon={<Zap size={18} className="text-amber-500" />}
              label="Gesamt-XP"
              value={stats.xpEarned}
              sub={stats.levelTitle}
            />
            <StatBox
              icon={<Target size={18} className="text-accent" />}
              label="Ø Genauigkeit"
              value={`${stats.avgAccuracy}%`}
            />
            <StatBox
              icon={<TrendingUp size={18} className="text-primary" />}
              label="Streak"
              value={`${stats.streakDays} 🔥`}
            />
          </div>

          {stats.topModule !== "–" && (
            <div className="mb-5 rounded-xl bg-primary-light p-3">
              <p className="text-xs font-semibold text-primary">🏆 Stärkstes Modul diese Woche</p>
              <p className="mt-0.5 text-sm text-text-primary">{stats.topModule}</p>
            </div>
          )}

          <div className="rounded-xl border border-border p-3 text-xs text-text-secondary">
            💡 <span className="font-medium text-text-primary">Tipp für diese Woche:</span>{" "}
            {stats.avgAccuracy < 70
              ? "Deine Genauigkeit hat Potenzial. Schau dir die Fehlerübersicht an und übe gezielt."
              : stats.scenariosCompleted < 5
              ? "Versuche diese Woche 5 Szenarien zu absolvieren – das reicht für soliden Fortschritt."
              : "Super Leistung! Probiere nächste Woche schwierigere Level aus."}
          </div>
        </div>

        <div className="border-t border-border px-6 py-4">
          <Button onClick={onClose} className="w-full">
            Los geht&apos;s! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}

export function shouldShowWeeklyReport(): boolean {
  if (typeof window === "undefined") return false;
  const today = new Date();
  if (today.getDay() !== 1) return false; // Monday only
  const lastShown = localStorage.getItem("last-weekly-report");
  const todayStr = today.toISOString().slice(0, 10);
  return lastShown !== todayStr;
}
