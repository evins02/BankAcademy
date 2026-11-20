"use client";

import { useEffect, useState } from "react";
import { getProgress, getStreak } from "@/lib/progressData";
import { useLanguage } from "@/context/LanguageContext";

const ALL_MODULES = [
  { id: "privatkunde", label: "Privatkunde", total: 10 },
  { id: "firmenkunde", label: "Firmenkunde", total: 7 },
  { id: "anlagekunde", label: "Anlagekunde", total: 4 },
  { id: "banking-operations", label: "Banking Operations", total: 4 },
  { id: "credit-operations", label: "Credit Operations", total: 5 },
];

const TOTAL = ALL_MODULES.reduce((s, m) => s + m.total, 0);

interface HeroBannerProps {
  name?: string;
}

export function HeroBanner({ name }: HeroBannerProps) {
  const { t } = useLanguage();
  const [heading, setHeading] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [done, setDone] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    const n = name ? `, ${name}` : "";
    if (h >= 6 && h < 12) setHeading(`${t.shared.greetMorning}${n}!`);
    else if (h < 18) setHeading(`${t.shared.greetDay}${n}!`);
    else setHeading(`${t.shared.greetEvening}${n}!`);

    const prog = getProgress();
    const streak = getStreak();
    const today = new Date().toISOString().slice(0, 10);
    const totalDone = ALL_MODULES.reduce((s, m) => s + (prog[m.id]?.completed ?? 0), 0);
    setDone(totalDone);

    if (streak.current >= 7) {
      setSubtitle(t.shared.streakMsg.replace("{n}", String(streak.current)));
    } else {
      const near = ALL_MODULES.map((m) => {
        const p = prog[m.id];
        if (!p || p.completed === 0) return null;
        const rem = m.total - p.completed;
        return rem > 0 && rem <= 3 ? { label: m.label, rem } : null;
      })
        .filter(Boolean)
        .sort((a, b) => a!.rem - b!.rem)[0];

      if (near) {
        const unit = near.rem > 1 ? t.shared.moduleScenarios : t.shared.scenarioSingular;
        setSubtitle(
          t.shared.nearModuleLeft
            .replace("{count}", `${near.rem} ${unit}`)
            .replace("{module}", near.label)
        );
      } else {
        const todayDone = Object.values(prog)
          .filter((p) => p.lastAttempt?.slice(0, 10) === today)
          .reduce((s, p) => s + p.completed, 0);
        if (todayDone === 0) setSubtitle(t.shared.noLearningToday);
        else if (todayDone <= 3) setSubtitle(t.shared.goodStart);
        else setSubtitle(t.shared.strongDay);
      }
    }

    setVisible(true);
  }, [name, t]);

  const pct = Math.round((done / TOTAL) * 100);
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div
      className={`relative mb-6 overflow-hidden rounded-2xl p-6 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ background: "linear-gradient(135deg, #00897B 0%, #00C9B1 100%)" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-white">{heading || `${t.shared.greetDay}!`}</h1>
          <p className="mt-1.5 text-sm text-white/80">{subtitle}</p>
          <p className="mt-3 text-xs text-white/60">
            {t.shared.scenariosCount
              .replace("{done}", String(done))
              .replace("{total}", String(TOTAL))}
          </p>
        </div>
        <div className="relative shrink-0">
          <svg width="64" height="64" className="-rotate-90">
            <circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="5"
            />
            <circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              className="transition-all duration-1000"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}
