"use client";

export interface ScenarioRating {
  scenarioId: string;
  rating: number; // 1-5
  ratedAt: string;
}

function read(): Record<string, ScenarioRating> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("scenario-ratings");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function write(data: Record<string, ScenarioRating>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("scenario-ratings", JSON.stringify(data));
}

export function getRatings(): Record<string, ScenarioRating> {
  return read();
}

export function getRating(scenarioId: string): number {
  return read()[scenarioId]?.rating ?? 0;
}

export function saveRating(scenarioId: string, rating: number) {
  const all = read();
  all[scenarioId] = { scenarioId, rating, ratedAt: new Date().toISOString() };
  write(all);
}

export function getAverageRating(): number {
  const all = Object.values(read());
  if (all.length === 0) return 0;
  return Math.round((all.reduce((s, r) => s + r.rating, 0) / all.length) * 10) / 10;
}
