"use client";

export interface ModuleProgress {
  moduleId: string;
  completed: number;
  total: number;
  accuracy: number; // 0-100
  lastAttempt?: string; // ISO date
  errors: ErrorEntry[];
}

export interface ErrorEntry {
  id: string;
  moduleId: string;
  moduleName: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  timestamp: string;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActivity: string; // ISO date
}

export interface Notification {
  id: string;
  message: string;
  type: "achievement" | "reminder" | "info";
  timestamp: string;
  read: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string; // ISO date — undefined if not earned
  condition: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  completedModules: number;
  streak: number;
  isMe?: boolean;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export function getProgress(): Record<string, ModuleProgress> {
  return read<Record<string, ModuleProgress>>("progress", {});
}

export function saveProgress(data: Record<string, ModuleProgress>) {
  write("progress", data);
}

export function getModuleProgress(moduleId: string): ModuleProgress | null {
  return getProgress()[moduleId] ?? null;
}

// ─── Streak ───────────────────────────────────────────────────────────────────

const DEFAULT_STREAK: StreakData = { current: 0, longest: 0, lastActivity: "" };

export function getStreak(): StreakData {
  return read<StreakData>("streak", DEFAULT_STREAK);
}

export function recordActivity() {
  const today = new Date().toISOString().slice(0, 10);
  const streak = getStreak();
  if (streak.lastActivity === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const next = streak.lastActivity === yesterday ? streak.current + 1 : 1;
  const updated: StreakData = {
    current: next,
    longest: Math.max(next, streak.longest),
    lastActivity: today,
  };
  write("streak", updated);
  return updated;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export function getNotifications(): Notification[] {
  return read<Notification[]>("notifications", []);
}

export function markAllRead() {
  const notes = getNotifications().map((n) => ({ ...n, read: true }));
  write("notifications", notes);
}

export function addNotification(msg: string, type: Notification["type"] = "info") {
  const notes = getNotifications();
  notes.unshift({
    id: crypto.randomUUID(),
    message: msg,
    type,
    timestamp: new Date().toISOString(),
    read: false,
  });
  write("notifications", notes.slice(0, 20));
}

// ─── Errors ───────────────────────────────────────────────────────────────────

export function getErrors(): ErrorEntry[] {
  const progress = getProgress();
  return Object.values(progress).flatMap((m) => m.errors ?? []);
}

// ─── Badges ───────────────────────────────────────────────────────────────────

const ALL_BADGES: Badge[] = [
  {
    id: "first-steps",
    title: "Erste Schritte",
    description: "Erstes Modul abgeschlossen",
    icon: "🎯",
    condition: "complete_1_module",
  },
  {
    id: "streak-3",
    title: "Dran bleiben",
    description: "3-Tage-Streak erreicht",
    icon: "🔥",
    condition: "streak_3",
  },
  {
    id: "streak-7",
    title: "Woche durch",
    description: "7-Tage-Streak erreicht",
    icon: "🚀",
    condition: "streak_7",
  },
  {
    id: "streak-30",
    title: "Monatspflicht",
    description: "30-Tage-Streak erreicht",
    icon: "⚡",
    condition: "streak_30",
  },
  {
    id: "accuracy-90",
    title: "Scharfsinnig",
    description: "90% Genauigkeit in einem Modul",
    icon: "🎓",
    condition: "accuracy_90",
  },
  {
    id: "accuracy-100",
    title: "Perfekt",
    description: "100% Genauigkeit in einem Modul",
    icon: "💎",
    condition: "accuracy_100",
  },
  {
    id: "all-front-office",
    title: "Berater",
    description: "Alle Front-Office-Module abgeschlossen",
    icon: "🏆",
    condition: "all_front_office",
  },
  {
    id: "all-back-office",
    title: "Operations-Profi",
    description: "Alle Back-Office-Module abgeschlossen",
    icon: "⚙️",
    condition: "all_back_office",
  },
];

export function computeBadges(): Badge[] {
  const progress = getProgress();
  const streak = getStreak();
  const modules = Object.values(progress);
  const completedModules = modules.filter((m) => m.completed >= m.total && m.total > 0);

  const earned = new Set<string>();
  if (completedModules.length >= 1) earned.add("first-steps");
  if (streak.current >= 3 || streak.longest >= 3) earned.add("streak-3");
  if (streak.current >= 7 || streak.longest >= 7) earned.add("streak-7");
  if (streak.current >= 30 || streak.longest >= 30) earned.add("streak-30");
  if (modules.some((m) => m.accuracy >= 90)) earned.add("accuracy-90");
  if (modules.some((m) => m.accuracy >= 100)) earned.add("accuracy-100");

  const frontOffice = ["privatkunde", "firmenkunde", "anlagekunde"];
  const backOffice = ["banking-operations", "credit-operations"];
  if (frontOffice.every((id) => completedModules.find((m) => m.moduleId === id)))
    earned.add("all-front-office");
  if (backOffice.every((id) => completedModules.find((m) => m.moduleId === id)))
    earned.add("all-back-office");

  const stored = read<Record<string, string>>("badge-dates", {});
  const now = new Date().toISOString();
  const newDates: Record<string, string> = { ...stored };
  for (const id of earned) {
    if (!newDates[id]) newDates[id] = now;
  }
  write("badge-dates", newDates);

  return ALL_BADGES.map((b) => ({
    ...b,
    earnedAt: earned.has(b.id) ? (newDates[b.id] ?? now) : undefined,
  }));
}

// ─── Mock seed (called once on first app load) ────────────────────────────────

export function seedMockDataIfEmpty() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("mock-seeded")) return;

  const progress: Record<string, ModuleProgress> = {
    privatkunde: {
      moduleId: "privatkunde",
      completed: 3,
      total: 10,
      accuracy: 76,
      lastAttempt: new Date(Date.now() - 2 * 86400000).toISOString(),
      errors: [
        {
          id: "e1",
          moduleId: "privatkunde",
          moduleName: "Privatkunde",
          question: "Was ist die maximale Belehnungsquote bei Eigenheimen?",
          userAnswer: "90%",
          correctAnswer: "80%",
          timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        },
        {
          id: "e2",
          moduleId: "privatkunde",
          moduleName: "Privatkunde",
          question: "Welche Dokumente sind für die Legitimationsprüfung erforderlich?",
          userAnswer: "Nur Reisepass",
          correctAnswer: "Reisepass oder ID-Karte + Wohnsitznachweis",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
    },
    "banking-operations": {
      moduleId: "banking-operations",
      completed: 1,
      total: 4,
      accuracy: 60,
      lastAttempt: new Date(Date.now() - 5 * 86400000).toISOString(),
      errors: [
        {
          id: "e3",
          moduleId: "banking-operations",
          moduleName: "Banking Operations",
          question: "In welchem Zeitfenster muss eine Zahlung widerrufen werden?",
          userAnswer: "72 Stunden",
          correctAnswer: "Bis zum Ende des Buchungstages",
          timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
        },
      ],
    },
  };

  const streak: StreakData = {
    current: 4,
    longest: 7,
    lastActivity: new Date().toISOString().slice(0, 10),
  };

  const notifications: Notification[] = [
    {
      id: "n1",
      message: "Du hast einen 4-Tage-Streak! Weiter so! 🔥",
      type: "achievement",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: "n2",
      message: "Neues Modul verfügbar: Hypotheken – Simulation",
      type: "info",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: false,
    },
    {
      id: "n3",
      message: "Dein Lernziel für diese Woche: 5 Szenarien",
      type: "reminder",
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
    },
  ];

  write("progress", progress);
  write("streak", streak);
  write("notifications", notifications);
  localStorage.setItem("mock-seeded", "true");
}

// ─── Leaderboard (seeded anonymously) ────────────────────────────────────────

export function getLeaderboard(myName?: string): LeaderboardEntry[] {
  const progress = getProgress();
  const streak = getStreak();
  const modules = Object.values(progress);
  const myCompleted = modules.reduce((s, m) => s + m.completed, 0);
  const myPoints = myCompleted * 10 + (streak.current * 5);

  const seed: LeaderboardEntry[] = [
    { rank: 1, name: "S.K.", points: 420, completedModules: 18, streak: 14 },
    { rank: 2, name: "M.B.", points: 390, completedModules: 16, streak: 9 },
    { rank: 3, name: "L.H.", points: 350, completedModules: 15, streak: 21 },
    { rank: 4, name: "T.W.", points: 290, completedModules: 12, streak: 5 },
    { rank: 5, name: "A.R.", points: 240, completedModules: 10, streak: 3 },
    { rank: 6, name: "J.M.", points: 210, completedModules: 9, streak: 0 },
    { rank: 7, name: "F.G.", points: 180, completedModules: 7, streak: 2 },
  ];

  const myEntry: LeaderboardEntry = {
    rank: 0,
    name: myName ?? "Du",
    points: myPoints,
    completedModules: myCompleted,
    streak: streak.current,
    isMe: true,
  };

  const all = [...seed, myEntry].sort((a, b) => b.points - a.points);
  return all.map((e, i) => ({ ...e, rank: i + 1 }));
}
