import type { NavGroup, Scenario } from "@/types";

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Mein Lernen",
    items: [
      { label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
      { label: "Statistiken", icon: "BarChart2", href: "/statistiken" },
      { label: "Badges", icon: "Award", href: "/badges" },
      { label: "Fehler Übersicht", icon: "AlertCircle", href: "/fehler-uebersicht" },
      { label: "Notizen", icon: "FileText", href: "/notizen" },
      { label: "Lesezeichen", icon: "Bookmark", href: "/lesezeichen" },
      { label: "LAP Modus", icon: "GraduationCap", href: "/lap-modus" },
      { label: "Lernpfad", icon: "Map", href: "/lernpfad" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Leaderboard", icon: "Trophy", href: "/leaderboard" },
      { label: "Forum", icon: "MessageSquare", href: "/community" },
      { label: "Praxisfälle", icon: "ClipboardList", href: "/community/cases" },
    ],
  },

  {
    label: "Front Office",
    items: [
      {
        label: "Privatkunde",
        icon: "User",
        sections: [
          {
            label: "Basis",
            items: [
              { label: "Kontoeröffnung", href: "/privatkunde/basis/kontoeröffnung" },
              { label: "Sparen & Konto", href: "/privatkunde/basis/sparen-konto" },
              { label: "Zahlungsverkehr", href: "/privatkunde/basis/zahlungsverkehr" },
              { label: "3a / Vorsorge", href: "/privatkunde/basis/vorsorge" },
              { label: "Fonds", href: "/privatkunde/basis/fonds" },
              { label: "Simulation: Kontoeröffnung", href: "/privatkunde/basis/simulation-kontoeröffnung" },
            ],
          },
          {
            label: "Individual",
            items: [
              { label: "Hypotheken", href: "/privatkunde/individual/hypotheken" },
              { label: "Konsumkredit", href: "/privatkunde/individual/konsumkredit" },
              { label: "Blankokredit", href: "/privatkunde/individual/blankokredit" },
              { label: "Simulation: Hypothek", href: "/privatkunde/individual/simulation-hypothek" },
            ],
          },
        ],
      },
      {
        label: "Firmenkunde",
        icon: "Building2",
        sections: [
          {
            label: "",
            items: [
              { label: "Kontoeröffnung Firma", href: "/firmenkunde/kontoeröffnung-firma" },
              { label: "Kontoeröffnung Sitzgesellschaft", href: "/firmenkunde/kontoeröffnung-sitzgesellschaft" },
            ],
          },
          {
            label: "Tragbarkeit",
            items: [
              { label: "Übersicht", href: "/firmenkunde/tragbarkeit" },
              { label: "Renditeobjekte", href: "/firmenkunde/tragbarkeit/renditeobjekt" },
              { label: "Gesamtengagement", href: "/firmenkunde/tragbarkeit/gesamtengagement" },
              { label: "Belastungsgrenze & ETP", href: "/firmenkunde/tragbarkeit/etp" },
              { label: "Selbstgenutzte Gewerbeliegenschaft", href: "/firmenkunde/tragbarkeit/gewerbe" },
            ],
          },
        ],
      },
      {
        label: "Anlagekunde",
        icon: "TrendingUp",
        sections: [
          {
            label: "Anlageberatung",
            items: [
              { label: "Anlegerprofil & Beratung", href: "/anlagekunde/anlegerprofil" },
              { label: "Obligationen", href: "/anlagekunde/obligationen" },
              { label: "Aktien & Kennzahlen", href: "/anlagekunde/aktien" },
              { label: "Anlagefonds & ETF", href: "/anlagekunde/fonds" },
              { label: "Simulation: Anlageberatung", href: "/anlagekunde/simulation" },
            ],
          },
          {
            label: "Produkte & Themen",
            items: [
              { label: "Strukturierte Produkte", href: "/anlagekunde/strukturierte-produkte" },
              { label: "Vorsorge & 3a", href: "/anlagekunde/vorsorge-anlage" },
              { label: "Nachhaltige Anlagen ESG", href: "/anlagekunde/esg" },
              { label: "Währungsrisiken", href: "/anlagekunde/waehrungsrisiken" },
              { label: "Depotauszug lesen", href: "/anlagekunde/depotauszug" },
              { label: "Steuerliche Aspekte", href: "/anlagekunde/steuern" },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Back Office",
    items: [
      {
        label: "Banking Operations",
        icon: "Landmark",
        sections: [
          {
            label: "",
            items: [
              { label: "Zahlungsverkehr", href: "/backoffice/banking-operations/zahlungsverkehr" },
              { label: "KYC / Compliance", href: "/backoffice/banking-operations/kyc" },
              { label: "Mahnwesen", href: "/backoffice/banking-operations/mahnwesen" },
            ],
          },
        ],
      },
      {
        label: "Credit Operations",
        icon: "Settings2",
        sections: [
          {
            label: "",
            items: [
              { label: "Übersicht", href: "/backoffice/credit-operations" },
              { label: "Sicherheitenverwaltung", href: "/backoffice/credit-operations/sicherheiten" },
              { label: "Grundpfand & Schuldbrief", href: "/backoffice/credit-operations/grundpfand" },
              { label: "Bürgschaften", href: "/backoffice/credit-operations/buergschaft" },
              { label: "Vorzeitige Rückzahlung", href: "/backoffice/credit-operations/vorzeitige-rueckzahlung" },
              { label: "Schuldbriefverwaltung", href: "/backoffice/credit-operations/schuldbrief" },
              { label: "Rating erfassen", href: "/backoffice/credit-operations/rating" },
            ],
          },
        ],
      },
      {
        label: "Credit Office",
        icon: "Scale",
        sections: [
          {
            label: "",
            items: [
              { label: "Privathypothek prüfen", href: "/backoffice/credit-office/hypothek" },
              { label: "Blankokredit prüfen", href: "/backoffice/credit-office/blankokredit" },
              { label: "Firmenkredit prüfen", href: "/backoffice/credit-office/firmenkredit" },
              { label: "Periodische Neubewilligung", href: "/backoffice/credit-office/neubewilligung" },
            ],
          },
        ],
      },
    ],
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
