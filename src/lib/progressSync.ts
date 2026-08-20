"use client";

import { ls, lsSet } from "./storage";

const SYNC_KEYS = [
  "progress",
  "total-xp",
  "streak",
  "badge-dates",
  "correct-streak",
  "correct-streak-best",
  "first-visit",
  "comeback-earned",
  "mock-seeded",
  "module-analytics",
] as const;

// These keys are stored directly in localStorage (not ba-sid prefixed)
const DIRECT_KEYS = ["user-profile", "onboarding-complete", "settings"] as const;

/** Load progress from Neon into the current session's localStorage.
 *  Returns true if data was found and written. */
export async function loadProgressFromDB(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch("/api/user-progress", { cache: "no-store" });
    if (!res.ok) return false;
    const { data } = (await res.json()) as { data: Record<string, unknown> | null };
    if (!data || typeof data !== "object") return false;

    for (const key of SYNC_KEYS) {
      const val = data[key];
      if (val === undefined || val === null) continue;
      lsSet(key, typeof val === "string" ? val : JSON.stringify(val));
    }

    for (const key of DIRECT_KEYS) {
      const val = data[key];
      if (val === undefined || val === null) continue;
      localStorage.setItem(key, typeof val === "string" ? val : JSON.stringify(val));
    }

    return true;
  } catch {
    return false;
  }
}

function buildSyncData(): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const key of SYNC_KEYS) {
    const raw = ls(key);
    if (raw === null) continue;
    try { data[key] = JSON.parse(raw); } catch { data[key] = raw; }
  }
  for (const key of DIRECT_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw === null) continue;
    try { data[key] = JSON.parse(raw); } catch { data[key] = raw; }
  }
  return data;
}

/** Immediate write of current localStorage progress to Neon.
 *  Returns a promise so callers can await it (e.g. before logout). */
export async function syncNow(): Promise<void> {
  if (typeof window === "undefined") return;
  const data = buildSyncData();
  await fetch("/api/user-progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  }).catch(() => {});
}

let syncTimer: ReturnType<typeof setTimeout> | null = null;

/** Debounced (3 s) write of current localStorage progress to Neon.
 *  Fire-and-forget — errors never block the user. */
export function scheduleSync(): void {
  if (typeof window === "undefined") return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    fetch("/api/user-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: buildSyncData() }),
    }).catch(() => {});
  }, 3000);
}
