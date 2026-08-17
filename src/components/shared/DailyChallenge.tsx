"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { addXP } from "@/lib/xpData";
import { ls, lsSet } from "@/lib/storage";

const CHALLENGES = [
  { label: "Kontoeröffnung", module: "Privatkunde · Basis", href: "/privatkunde/basis/kontoeröffnung", emoji: "📋", minLevel: 1 },
  { label: "Zahlungsverkehr", module: "Privatkunde · Basis", href: "/privatkunde/basis/zahlungsverkehr", emoji: "💸", minLevel: 1 },
  { label: "Sparen & Konto", module: "Privatkunde · Basis", href: "/privatkunde/basis/sparen-konto", emoji: "💰", minLevel: 1 },
  { label: "Fonds", module: "Privatkunde · Basis", href: "/privatkunde/basis/fonds", emoji: "📈", minLevel: 2 },
  { label: "KYC / Compliance", module: "Back Office", href: "/backoffice/banking-operations/kyc", emoji: "🔍", minLevel: 2 },
  { label: "Vorsorge 3a", module: "Privatkunde · Basis", href: "/privatkunde/basis/vorsorge", emoji: "🏦", minLevel: 2 },
  { label: "Hypotheken", module: "Privatkunde · Individual", href: "/privatkunde/individual/hypotheken", emoji: "🏠", minLevel: 3 },
  { label: "Firmenkunde Tragbarkeit", module: "Firmenkunde", href: "/firmenkunde/tragbarkeit", emoji: "🏢", minLevel: 3 },
];

const LEHRJAHR_TO_LEVEL: Record<string, number> = {
  lj1: 1, lj2: 2, lj3: 3, quereinsteiger: 2,
};

function todayKey() {
  return `daily-challenge-${new Date().toISOString().slice(0, 10)}`;
}

function getChallenge(lehrjahr?: string) {
  const level = LEHRJAHR_TO_LEVEL[lehrjahr ?? ""] ?? 2;
  const pool = CHALLENGES.filter((c) => c.minLevel <= level);
  const active = pool.length > 0 ? pool : CHALLENGES;
  const start = new Date(new Date().getFullYear(), 0, 1);
  const day = Math.floor((Date.now() - start.getTime()) / 86400000);
  return active[day % active.length];
}

function formatCountdown() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function DailyChallenge({ lehrjahr }: { lehrjahr?: string }) {
  const [completed, setCompleted] = useState(false);
  const [countdown, setCountdown] = useState(formatCountdown());
  const challenge = getChallenge(lehrjahr);

  useEffect(() => {
    setCompleted(ls(todayKey()) === "true");
    const interval = setInterval(() => setCountdown(formatCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  function accept() {
    if (!completed) {
      lsSet(todayKey(), "true");
      addXP(150);
      setCompleted(true);
    }
  }

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex items-start gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl">
          🎯
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Tagesaufgabe
            </p>
            {!completed && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                +150 XP
              </span>
            )}
          </div>

          {completed ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-lg">✅</span>
              <div>
                <p className="text-sm font-semibold text-primary">
                  Tagesaufgabe abgeschlossen! +150 XP
                </p>
                <p className="text-xs text-text-secondary">
                  Neue Aufgabe in {countdown}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xl">{challenge.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{challenge.label}</p>
                  <p className="text-xs text-text-secondary">{challenge.module}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Link
                  href={challenge.href}
                  onClick={accept}
                  className="rounded-lg bg-[#0D1B4B] px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Challenge annehmen
                </Link>
                <span className="text-xs text-text-secondary">Noch {countdown}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
