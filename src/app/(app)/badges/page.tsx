"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { computeBadges, type Badge } from "@/lib/progressData";

function BadgeCard({ badge }: { badge: Badge }) {
  const earned = !!badge.earnedAt;
  const dateStr = badge.earnedAt
    ? new Date(badge.earnedAt).toLocaleDateString("de-CH", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={`relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all ${
        earned
          ? "border-primary/30 bg-primary-light shadow-sm"
          : "border-border bg-surface opacity-50 grayscale"
      }`}
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
          earned ? "bg-white shadow-sm" : "bg-gray-100"
        }`}
      >
        {badge.icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{badge.title}</p>
        <p className="mt-0.5 text-xs text-text-secondary">{badge.description}</p>
        {earned && dateStr && (
          <p className="mt-2 text-[11px] font-medium text-primary">Verdient am {dateStr}</p>
        )}
        {!earned && (
          <p className="mt-2 text-[11px] text-text-secondary">Noch nicht verdient</p>
        )}
      </div>
      {earned && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
          ✓
        </div>
      )}
    </div>
  );
}

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    setBadges(computeBadges());
  }, []);

  const earned = badges.filter((b) => b.earnedAt);
  const locked = badges.filter((b) => !b.earnedAt);

  return (
    <>
      <Header title="Badges" subtitle={`${earned.length} von ${badges.length} verdient`} />
      <div className="flex-1 overflow-y-auto p-6">

        {earned.length > 0 && (
          <>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Verdient ({earned.length})
            </h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {earned.map((b) => (
                <BadgeCard key={b.id} badge={b} />
              ))}
            </div>
          </>
        )}

        {locked.length > 0 && (
          <>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Noch zu erreichen ({locked.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {locked.map((b) => (
                <BadgeCard key={b.id} badge={b} />
              ))}
            </div>
          </>
        )}

        {badges.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-4xl">🏆</p>
            <p className="mt-4 text-lg font-semibold text-text-primary">Badges werden geladen…</p>
          </div>
        )}
      </div>
    </>
  );
}
