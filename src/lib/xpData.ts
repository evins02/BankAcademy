"use client";

export const XP_LEVELS = [
  { min: 0, max: 500, title: "Einsteiger", color: "#6B7280" },
  { min: 500, max: 1500, title: "Lernender", color: "#16A34A" },
  { min: 1500, max: 3000, title: "Fortgeschritten", color: "#2563EB" },
  { min: 3000, max: 6000, title: "Experte", color: "#7C3AED" },
  { min: 6000, max: Infinity, title: "Banking Pro", color: "#F97316" },
];

export function getXP(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(localStorage.getItem("total-xp") ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

export function addXP(amount: number): number {
  const current = getXP();
  const next = current + amount;
  if (typeof window !== "undefined") {
    localStorage.setItem("total-xp", String(next));
  }
  return next;
}

export function getXPLevel(xp: number) {
  return (
    XP_LEVELS.find((l) => xp >= l.min && (l.max === Infinity || xp < l.max)) ??
    XP_LEVELS[XP_LEVELS.length - 1]
  );
}

export function getXPProgress(xp: number): number {
  const level = getXPLevel(xp);
  if (level.max === Infinity) return 100;
  return Math.round(((xp - level.min) / (level.max - level.min)) * 100);
}

export function getNextLevelXP(xp: number): number {
  const level = getXPLevel(xp);
  return level.max === Infinity ? 0 : level.max;
}
