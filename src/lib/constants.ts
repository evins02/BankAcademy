import type { NavItem, Scenario } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Privatkunde",
    icon: "User",
    sections: [
      {
        label: "Basis",
        items: [
          { label: "Zahlungsverkehr", href: "/privatkunde/basis/zahlungsverkehr" },
          { label: "Sparen & Konto", href: "/privatkunde/basis/konto" },
          { label: "3a / Vorsorge", href: "/privatkunde/basis/3a-vorsorge" },
          { label: "Fonds", href: "/privatkunde/basis/fonds" },
          { label: "KYC / Compliance", href: "/privatkunde/basis/kyc" },
        ],
      },
      {
        label: "Individual",
        items: [
          { label: "Hypotheken", href: "/privatkunde/individual/hypotheken" },
          { label: "Konsumkredit", href: "/privatkunde/individual/konsumkredit" },
          { label: "Blankokredit", href: "/privatkunde/individual/blankokredit" },
        ],
      },
    ],
  },
  {
    label: "Firmenkunde",
    icon: "Building2",
    href: "/firmenkunde",
  },
  {
    label: "Anlagekunde",
    icon: "TrendingUp",
    href: "/anlagekunde",
  },
  {
    label: "Credit Operations",
    icon: "Settings2",
    href: "/credit-operations",
  },
];

export const SAMPLE_SCENARIOS: Scenario[] = [
  {
    id: "fin-001",
    module: "kreditgeschaefte",
    title: "KMU-Kreditantrag: Maschinenkauf",
    description:
      "Analysieren Sie den Kreditantrag einer Schreinerei für den Kauf einer CNC-Fräsmaschine. Prüfen Sie Bonität, Sicherheiten und Tragbarkeit.",
    role: "relationship-manager",
    difficulty: "beginner",
    status: "not-started",
    durationMinutes: 20,
    tags: ["KMU", "Investitionskredit", "Sicherheiten"],
  },
  {
    id: "fin-002",
    module: "kreditgeschaefte",
    title: "Hypothekarkredit: Eigenheim",
    description:
      "Bewerten Sie einen Hypothekarantrag für ein Einfamilienhaus. Prüfen Sie Belehnungswert, Tragbarkeit und Eigenmittel.",
    role: "credit-office",
    difficulty: "intermediate",
    status: "in-progress",
    durationMinutes: 30,
    tags: ["Hypothek", "Eigenheim", "Tragbarkeit"],
  },
  {
    id: "fin-003",
    module: "kreditgeschaefte",
    title: "Restrukturierung: Problemengagement",
    description:
      "Ein bestehendes Kreditengagement zeigt erste Warnsignale. Erarbeiten Sie eine Restrukturierungsstrategie.",
    role: "credit-office",
    difficulty: "advanced",
    status: "not-started",
    durationMinutes: 45,
    tags: ["Restrukturierung", "Risikomanagement", "Watch-Liste"],
  },
  {
    id: "ops-001",
    module: "banking-operations",
    title: "Kontoeröffnung: Neukunde",
    description:
      "Führen Sie die vollständige Kontoeröffnung für einen Privatkunden durch inkl. Legitimationsprüfung.",
    role: "relationship-manager",
    difficulty: "beginner",
    status: "completed",
    durationMinutes: 15,
    tags: ["Onboarding", "Konto", "Legitimation"],
  },
  {
    id: "kyc-001",
    module: "kyc",
    title: "Beneficial Owner: Firmenstruktur",
    description:
      "Identifizieren Sie die wirtschaftlich berechtigte Person hinter einer verschachtelten Holdingstruktur.",
    role: "compliance-officer",
    difficulty: "advanced",
    status: "not-started",
    durationMinutes: 40,
    tags: ["Beneficial Owner", "Geldwäscherei", "AMLA"],
  },
];
