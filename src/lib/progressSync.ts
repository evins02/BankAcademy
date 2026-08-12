"use client";

import { ls, lsSet } from "./storage";

// Logical key names (session prefix added automatically by ls/lsSet)
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
] as const;

function getDemoEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("ba-demo-session");
    if (!raw) return null;
    return (JSON.parse(raw) as { email?: string }).email ?? null;
  } catch {
    return null;
  }
}

/** Load progress from Neon into the current session's localStorage.
 *  Returns true if data was found and written. */
export async function loadProgressFromDB(email: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch(
      `/api/user-progress?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return false;
    const { data } = (await res.json()) as { data: Record<string, unknown> | null };
    if (!data || typeof data !== "object") return false;

    for (const key of SYNC_KEYS) {
      const val = data[key];
      if (val === undefined || val === null) continue;
      lsSet(key, typeof val === "string" ? val : JSON.stringify(val));
    }
    return true;
  } catch {
    return false;
  }
}

let syncTimer: ReturnType<typeof setTimeout> | null = null;

/** Debounced (3 s) write of current localStorage progress to Neon.
 *  Fire-and-forget — errors never block the user. */
export function scheduleSync(): void {
  if (typeof window === "undefined") return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    const email = getDemoEmail();
    if (!email) return;

    const data: Record<string, unknown> = {};
    for (const key of SYNC_KEYS) {
      const raw = ls(key);
      if (raw === null) continue;
      try { data[key] = JSON.parse(raw); } catch { data[key] = raw; }
    }

    fetch("/api/user-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, data }),
    }).catch(() => {});
  }, 3000);
}
