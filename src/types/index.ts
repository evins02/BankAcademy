export type Module = "kreditgeschaefte" | "banking-operations" | "kyc";

export type Role =
  | "relationship-manager"
  | "credit-office"
  | "credit-operations"
  | "compliance-officer";

export type ScenarioStatus = "not-started" | "in-progress" | "completed" | "failed";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Scenario {
  id: string;
  module: Module;
  title: string;
  description: string;
  role: Role;
  difficulty: DifficultyLevel;
  status: ScenarioStatus;
  durationMinutes: number;
  tags: string[];
}

export interface UserProgress {
  scenariosCompleted: number;
  scenariosTotal: number;
  pointsEarned: number;
  currentStreak: number;
}

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  items: NavSubItem[];
}

export interface NavItem {
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  sections?: NavSection[];
}
