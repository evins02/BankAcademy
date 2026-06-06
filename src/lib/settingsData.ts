"use client";

export interface AppSettings {
  timerEnabled: boolean;
  autoAdvance: boolean;
  sounds: boolean;
  keyboardShortcuts: boolean;
  difficultyPreference: "einsteiger" | "alle" | "lap";
  theme: "light" | "dark" | "system";
  avatarColor: string;
}

const DEFAULTS: AppSettings = {
  timerEnabled: true,
  autoAdvance: true,
  sounds: false,
  keyboardShortcuts: true,
  difficultyPreference: "alle",
  theme: "light",
  avatarColor: "#0D1B4B",
};

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem("app-settings");
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function saveSettings(patch: Partial<AppSettings>): AppSettings {
  const next = { ...getSettings(), ...patch };
  if (typeof window !== "undefined") {
    localStorage.setItem("app-settings", JSON.stringify(next));
  }
  return next;
}

export function applyTheme(theme: AppSettings["theme"]) {
  if (typeof window === "undefined") return;
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}
