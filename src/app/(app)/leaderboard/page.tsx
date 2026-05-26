"use client";

import { useEffect, useState } from "react";
import { Trophy, Flame, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/progressData";

const RANK_LABELS = ["🥇", "🥈", "🥉"];

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    return <span className="text-xl leading-none">{RANK_LABELS[rank - 1]}</span>;
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-text-secondary">
      {rank}
    </span>
  );
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user-profile");
      const p = raw ? JSON.parse(raw) : {};
      setEntries(getLeaderboard(p.name));
    } catch {
      setEntries(getLeaderboard());
    }
  }, []);

  const myEntry = entries.find((e) => e.isMe);

  return (
    <>
      <Header title="Leaderboard" subtitle="Diese Woche · Anonyme Rangliste" />
      <div className="flex-1 overflow-y-auto p-6">

        {/* My position callout */}
        {myEntry && (
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary-light p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              {myEntry.rank}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Deine aktuelle Position</p>
              <p className="text-xs text-text-secondary">
                {myEntry.points} Punkte · {myEntry.completedModules} Szenarien · {myEntry.streak}🔥 Streak
              </p>
            </div>
          </div>
        )}

        {/* Leaderboard table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {/* Header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-border bg-gray-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            <span className="w-8 text-center">#</span>
            <span>Name</span>
            <span className="hidden sm:block">Szenarien</span>
            <span>Streak</span>
            <span>Punkte</span>
          </div>

          {entries.map((entry) => (
            <div
              key={`${entry.rank}-${entry.name}`}
              className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-border px-5 py-4 last:border-0 transition-colors ${
                entry.isMe ? "bg-primary-light" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 flex justify-center">
                <RankBadge rank={entry.rank} />
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: entry.isMe ? "#16A34A" : "#0D1B4B" }}
                >
                  {entry.isMe ? "Du" : entry.name.slice(0, 2)}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${entry.isMe ? "text-primary" : "text-text-primary"}`}>
                    {entry.isMe ? `${entry.name} (Du)` : entry.name}
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-1 sm:flex">
                <CheckCircle2 size={13} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{entry.completedModules}</span>
              </div>

              <div className="flex items-center gap-1">
                <Flame size={13} className="text-accent" />
                <span className="text-sm text-text-secondary">{entry.streak}</span>
              </div>

              <div className="flex items-center gap-1">
                <Trophy size={13} className={entry.isMe ? "text-primary" : "text-text-secondary"} />
                <span className={`text-sm font-semibold ${entry.isMe ? "text-primary" : "text-text-primary"}`}>
                  {entry.points}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-text-secondary">
          Punkte: 10 pro Szenario + 5 pro Streak-Tag · Alle Namen anonymisiert
        </p>
      </div>
    </>
  );
}
