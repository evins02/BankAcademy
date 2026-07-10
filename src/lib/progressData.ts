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

const MODULE_TOTALS: Record<string, { name: string; total: number }> = {
  privatkunde: { name: "Privatkunde", total: 10 },
  firmenkunde: { name: "Firmenkunde", total: 19 },
  anlagekunde: { name: "Anlagekunde", total: 4 },
  "banking-operations": { name: "Bankbetrieb", total: 4 },
  "credit-operations": { name: "Kreditgeschäft", total: 5 },
};

export function generateSmartNotifications() {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  const lastGen = localStorage.getItem("notif-generated-date");
  if (lastGen === today) return;
  localStorage.setItem("notif-generated-date", today);

  const streak = getStreak();
  const progress = getProgress();
  const badges = computeBadges();
  const notes = getNotifications();
  const existingMessages = new Set(notes.map((n) => n.message));

  const newNotes: Notification[] = [];

  function push(msg: string, type: Notification["type"]) {
    if (!existingMessages.has(msg)) {
      newNotes.push({ id: crypto.randomUUID(), message: msg, type, timestamp: new Date().toISOString(), read: false });
    }
  }

  // Streak milestone
  if (streak.current > 0 && [3, 5, 7, 10, 14, 21, 30].includes(streak.current)) {
    push(`🔥 ${streak.current} Tage Streak! Weiter so – du bist auf dem richtigen Weg!`, "achievement");
  }

  // Near-completion modules
  for (const [id, meta] of Object.entries(MODULE_TOTALS)) {
    const p = progress[id];
    if (p && p.completed > 0 && p.completed < meta.total) {
      const remaining = meta.total - p.completed;
      if (remaining === 1) {
        push(`📚 Noch 1 Szenario in ${meta.name} – schliess das Modul ab!`, "reminder");
      } else if (remaining <= 2 && p.completed / meta.total >= 0.75) {
        push(`📚 Fast geschafft! Nur noch ${remaining} Szenarien in ${meta.name}.`, "reminder");
      }
    }
  }

  // Newly earned badges
  for (const badge of badges) {
    if (badge.earnedAt) {
      const badgeDate = badge.earnedAt.slice(0, 10);
      const daysDiff = Math.floor((Date.now() - new Date(badgeDate).getTime()) / 86400000);
      if (daysDiff <= 1) {
        push(`🏆 Badge verdient: "${badge.title}" – ${badge.description}`, "achievement");
      }
    }
  }

  // Weekly summary on Mondays
  const dayOfWeek = new Date().getDay();
  if (dayOfWeek === 1) {
    const totalCompleted = Object.values(progress).reduce((s, m) => s + m.completed, 0);
    if (totalCompleted > 0) {
      const lastWeekKey = "notif-weekly-shown";
      const lastWeekDate = localStorage.getItem(lastWeekKey);
      if (lastWeekDate !== today) {
        localStorage.setItem(lastWeekKey, today);
        const completedMods = Object.values(MODULE_TOTALS).filter((m, i) => {
          const id = Object.keys(MODULE_TOTALS)[i];
          const p = progress[id];
          return p && p.completed >= m.total;
        }).length;
        push(`📊 Wochenzusammenfassung: ${totalCompleted} Szenarien abgeschlossen, ${completedMods}/${Object.keys(MODULE_TOTALS).length} Module fertig. Weiter so!`, "info");
      }
    }
  }

  // Accuracy encouragement
  const activeModules = Object.entries(progress).filter(([, p]) => p.completed > 0);
  if (activeModules.length > 0) {
    const avgAcc = Math.round(activeModules.reduce((s, [, p]) => s + p.accuracy, 0) / activeModules.length);
    if (avgAcc >= 90) {
      push(`⭐ Exzellent! Deine durchschnittliche Genauigkeit liegt bei ${avgAcc}%. Du bist ein Banking-Profi!`, "achievement");
    } else if (avgAcc >= 80) {
      push(`👍 Gut gemacht! Durchschnittliche Genauigkeit: ${avgAcc}%. Noch ein bisschen üben für Perfektion.`, "info");
    }
  }

  if (newNotes.length > 0) {
    const all = [...newNotes, ...notes].slice(0, 20);
    write("notifications", all);
  }
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
  {
    id: "erster-tag",
    title: "Erster Tag",
    description: "Willkommen bei BankAcademy!",
    icon: "🌟",
    condition: "first_login",
  },
  {
    id: "wissensdurst",
    title: "Wissensdurst",
    description: "5 Szenarien abgeschlossen",
    icon: "📚",
    condition: "scenarios_5",
  },
  {
    id: "scharfschuetze",
    title: "Scharfschütze",
    description: "5 richtige Antworten in Folge",
    icon: "🎯",
    condition: "correct_5_row",
  },
  {
    id: "comeback-kid",
    title: "Comeback Kid",
    description: "Aufgeben ist keine Option!",
    icon: "💪",
    condition: "comeback",
  },
  {
    id: "banking-insider",
    title: "Banking Insider",
    description: "Alle Banking-Operations abgeschlossen",
    icon: "🏦",
    condition: "all_banking_ops",
  },
  {
    id: "unaufhaltbar",
    title: "Unaufhaltbar",
    description: "14-Tage-Streak erreicht",
    icon: "🔥",
    condition: "streak_14",
  },
  {
    id: "lap-bereit",
    title: "Challenge Bereit",
    description: "Challenge-Modus mit >80% abgeschlossen",
    icon: "🎓",
    condition: "lap_80",
  },
  {
    id: "bankacademy-pro",
    title: "BankAcademy Pro",
    description: "Alle Module gemeistert",
    icon: "🚀",
    condition: "all_modules",
  },
];

export function recordCorrectAnswer() {
  if (typeof window === "undefined") return;
  const streak = parseInt(localStorage.getItem("correct-streak") ?? "0") + 1;
  localStorage.setItem("correct-streak", String(streak));
  const best = parseInt(localStorage.getItem("correct-streak-best") ?? "0");
  if (streak > best) localStorage.setItem("correct-streak-best", String(streak));
}

export function recordWrongAnswer() {
  if (typeof window === "undefined") return;
  const prevStreak = parseInt(localStorage.getItem("correct-streak") ?? "0");
  if (prevStreak === 0) localStorage.setItem("comeback-earned", "true");
  localStorage.setItem("correct-streak", "0");
}

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

  // New badges
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("first-visit")) localStorage.setItem("first-visit", new Date().toISOString());
    earned.add("erster-tag");

    const totalCompleted = modules.reduce((s, m) => s + m.completed, 0);
    if (totalCompleted >= 5) earned.add("wissensdurst");

    if (parseInt(localStorage.getItem("correct-streak-best") ?? "0") >= 5) earned.add("scharfschuetze");
    if (localStorage.getItem("comeback-earned") === "true") earned.add("comeback-kid");
    if (parseInt(localStorage.getItem("lap-best-score") ?? "0") >= 80) earned.add("lap-bereit");
  }

  if (completedModules.find((m) => m.moduleId === "banking-operations")) earned.add("banking-insider");
  if (streak.current >= 14 || streak.longest >= 14) earned.add("unaufhaltbar");
  const allModuleIds = ["privatkunde", "firmenkunde", "anlagekunde", "banking-operations", "credit-operations"];
  if (allModuleIds.every((id) => completedModules.find((m) => m.moduleId === id))) earned.add("bankacademy-pro");

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
          moduleName: "Bankbetrieb",
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
