"use client";

import { getWeakConcepts } from "./conceptTracker";

interface HasIdAndConcepts {
  id: string;
  concepts?: string[];
}

interface StoredSession {
  orderedIds: string[];
  createdAt: number;
}

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

// Per-module max count per level. undefined = show all (just shuffle).
const MODULE_MAX: Record<string, Partial<Record<number, number>>> = {
  "banking-operations-zahlungsverkehr": { 2: 7, 3: 5 },
  "backoffice-zahlungsverkehr": { 2: 7, 3: 5 },
  "privatkunde-zahlungsverkehr": { 2: 6 },
};

function storageKey(moduleId: string, level: number) {
  return `bankinglab:session:${moduleId}:${level}`;
}

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function weightedShuffle<T extends HasIdAndConcepts>(items: T[], weakConcepts: string[]): T[] {
  if (weakConcepts.length === 0) return fisherYates(items);

  // Build expanded pool: weak-concept items appear 3× more often → land earlier after shuffle
  const expanded: T[] = [];
  for (const item of items) {
    const boost = (item.concepts ?? []).some((c) => weakConcepts.includes(c)) ? 3 : 1;
    for (let i = 0; i < boost; i++) expanded.push(item);
  }

  // Deduplicated sample in weighted order
  const shuffled = fisherYates(expanded);
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of shuffled) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
    }
  }
  return result;
}

/**
 * Returns a (shuffled, optionally subsetted) list of cases for a given module+level.
 * The order is persisted in localStorage for 24 h so a learner resuming mid-session
 * sees the same sequence they started with.
 */
export function resolveSessionCases<T extends HasIdAndConcepts>(
  moduleId: string,
  level: number,
  cases: readonly T[],
): T[] {
  if (typeof window === "undefined") return [...cases];

  const key = storageKey(moduleId, level);

  // Restore existing session
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const stored: StoredSession = JSON.parse(raw);
      if (Date.now() - stored.createdAt < SESSION_TTL_MS) {
        const map = new Map(cases.map((c) => [c.id, c]));
        const restored = stored.orderedIds.map((id) => map.get(id)).filter((c): c is T => c !== undefined);
        if (restored.length > 0) return restored;
      }
    }
  } catch {
    // fall through to create new session
  }

  // Create new session with adaptive weighting
  const weak = getWeakConcepts(moduleId).map((w) => w.concept);
  const shuffled = weightedShuffle([...cases], weak);

  const maxCount = MODULE_MAX[moduleId]?.[level];
  const ordered = maxCount ? shuffled.slice(0, maxCount) : shuffled;

  try {
    const session: StoredSession = { orderedIds: ordered.map((c) => c.id), createdAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(session));
  } catch {
    // ignore
  }

  return ordered;
}

/** Force a new shuffle next time the module+level is started. */
export function resetSession(moduleId: string, level: number): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(storageKey(moduleId, level)); } catch { /* ignore */ }
}

/** Reset all sessions for a module (call when user clicks "Restart"). */
export function resetAllSessions(moduleId: string): void {
  if (typeof window === "undefined") return;
  for (let lvl = 1; lvl <= 3; lvl++) resetSession(moduleId, lvl);
}
