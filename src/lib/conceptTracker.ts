"use client";

const STORAGE_KEY = "bankinglab:concept-errors";

type ConceptErrorStore = Record<string, Record<string, { count: number; lastError: number }>>;

function load(): ConceptErrorStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConceptErrorStore) : {};
  } catch {
    return {};
  }
}

function save(store: ConceptErrorStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore storage errors
  }
}

export function recordConceptError(moduleId: string, concepts: string[]): void {
  if (typeof window === "undefined" || concepts.length === 0) return;
  const store = load();
  if (!store[moduleId]) store[moduleId] = {};
  for (const concept of concepts) {
    const prev = store[moduleId][concept] ?? { count: 0, lastError: 0 };
    store[moduleId][concept] = { count: prev.count + 1, lastError: Date.now() };
  }
  save(store);
}

export interface WeakConcept {
  concept: string;
  count: number;
  lastError: number;
}

export function getWeakConcepts(moduleId: string): WeakConcept[] {
  if (typeof window === "undefined") return [];
  const store = load();
  const mod = store[moduleId] ?? {};
  return Object.entries(mod)
    .map(([concept, data]) => ({ concept, ...data }))
    .sort((a, b) => b.count - a.count);
}

export function getAllWeakConcepts(): WeakConcept[] {
  if (typeof window === "undefined") return [];
  const store = load();
  const merged: Record<string, WeakConcept> = {};
  for (const modData of Object.values(store)) {
    for (const [concept, data] of Object.entries(modData)) {
      if (!merged[concept]) merged[concept] = { concept, count: 0, lastError: 0 };
      merged[concept].count += data.count;
      merged[concept].lastError = Math.max(merged[concept].lastError, data.lastError);
    }
  }
  return Object.values(merged).sort((a, b) => b.count - a.count);
}

export function clearConceptErrors(moduleId?: string): void {
  if (typeof window === "undefined") return;
  if (moduleId) {
    const store = load();
    delete store[moduleId];
    save(store);
  } else {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }
}
