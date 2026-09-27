"use client";

import { useState, useEffect } from "react";
import type { SubmoduleCase } from "@/lib/anlage-submodule-types";

interface UseGeneratedScenariosResult {
  cases: SubmoduleCase[];
  loading: boolean;
  requestAdaptive: (weakConcepts?: string[]) => Promise<SubmoduleCase[]>;
}

/**
 * Fetches AI-generated scenarios for a module+level from the DB.
 * Merges with static cases in SubRunner before calling resolveSessionCases.
 *
 * Usage in SubRunner:
 *   const { cases: generatedCases } = useGeneratedScenarios(moduleId, level);
 *   const allCases = useMemo(
 *     () => dedup([...staticCases, ...generatedCases]),
 *     [staticCases, generatedCases]
 *   );
 *   const sessionCases = resolveSessionCases(moduleId, level, allCases);
 */
export function useGeneratedScenarios(
  moduleKey: string,
  level: 1 | 2 | 3,
): UseGeneratedScenariosResult {
  const [cases, setCases] = useState<SubmoduleCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`/api/scenarios/generated?moduleKey=${encodeURIComponent(moduleKey)}&level=${level}`)
      .then((r) => (r.ok ? r.json() : { scenarios: [] }))
      .then((data: { scenarios: SubmoduleCase[] }) => {
        if (!cancelled) {
          setCases(data.scenarios ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [moduleKey, level]);

  async function requestAdaptive(weakConcepts?: string[]): Promise<SubmoduleCase[]> {
    try {
      const res = await fetch("/api/scenarios/adaptive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleKey, level, weakConcepts }),
      });
      if (!res.ok) return cases;
      const data: { scenarios: SubmoduleCase[] } = await res.json();
      setCases(data.scenarios ?? []);
      return data.scenarios ?? [];
    } catch {
      return cases;
    }
  }

  return { cases, loading, requestAdaptive };
}
