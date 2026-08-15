"use client";

import { useEffect, useRef } from "react";
import { ls, lsSet } from "./storage";
import { scheduleSync } from "./progressSync";

export interface ModuleAnalyticsEntry {
  moduleId: string;
  moduleName: string;
  firstStartedAt: string;
  lastActiveAt: string;
  completedAt?: string;
  totalMinutes: number;
  sessions: number;
  casesAttempted: number;
  casesCorrect: number;
}

type AnalyticsMap = Record<string, ModuleAnalyticsEntry>;

const KEY = "module-analytics";

function readMap(): AnalyticsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = ls(KEY);
    return raw ? (JSON.parse(raw) as AnalyticsMap) : {};
  } catch {
    return {};
  }
}

function writeMap(map: AnalyticsMap) {
  if (typeof window === "undefined") return;
  lsSet(KEY, JSON.stringify(map));
  scheduleSync();
}

export function getModuleAnalytics(): AnalyticsMap {
  return readMap();
}

/** Call after each case is resolved. */
export function trackCaseResult(moduleId: string, correct: boolean) {
  if (typeof window === "undefined") return;
  const map = readMap();
  const entry = map[moduleId];
  if (!entry) return;
  map[moduleId] = {
    ...entry,
    lastActiveAt: new Date().toISOString(),
    casesAttempted: entry.casesAttempted + 1,
    casesCorrect: correct ? entry.casesCorrect + 1 : entry.casesCorrect,
  };
  writeMap(map);
}

/** Call when the module reaches its "module-complete" screen. */
export function trackModuleComplete(moduleId: string) {
  if (typeof window === "undefined") return;
  const map = readMap();
  const entry = map[moduleId];
  if (!entry || entry.completedAt) return;
  map[moduleId] = {
    ...entry,
    completedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
  writeMap(map);
}

/**
 * Drop-in hook: add one call at the top of any Runner component.
 * Automatically tracks sessions and time-on-page.
 */
export function useModuleTracking(moduleId: string, moduleName: string) {
  const sessionStartRef = useRef(Date.now());

  useEffect(() => {
    const now = new Date().toISOString();
    const map = readMap();
    const existing = map[moduleId];
    map[moduleId] = {
      moduleId,
      moduleName,
      firstStartedAt: existing?.firstStartedAt ?? now,
      lastActiveAt: now,
      completedAt: existing?.completedAt,
      totalMinutes: existing?.totalMinutes ?? 0,
      sessions: (existing?.sessions ?? 0) + 1,
      casesAttempted: existing?.casesAttempted ?? 0,
      casesCorrect: existing?.casesCorrect ?? 0,
    };
    writeMap(map);
    sessionStartRef.current = Date.now();

    return () => {
      const elapsed = Math.round((Date.now() - sessionStartRef.current) / 60000);
      if (elapsed < 1) return;
      const m = readMap();
      const e = m[moduleId];
      if (!e) return;
      m[moduleId] = { ...e, totalMinutes: e.totalMinutes + elapsed };
      lsSet(KEY, JSON.stringify(m));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
