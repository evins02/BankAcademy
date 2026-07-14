"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, CheckCircle2, Clock, Lock, BookOpen, Lightbulb } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getProgress, type ModuleProgress } from "@/lib/progressData";
import { cn } from "@/lib/utils";
import { BankerDenkweise } from "@/components/shared/BankerDenkweise";
import { PraxisTipps } from "@/components/shared/PraxisTipps";
import { PRAXIS_DATA } from "@/lib/praxisData";

interface SubModuleItem {
  id: string;
  title: string;
  description: string;
  href: string;
  emoji: string;
  totalScenarios: number;
  comingSoon?: boolean;
}

interface SubModuleGroup {
  label: string;
  items: SubModuleItem[];
}

interface OverviewConfig {
  moduleId: string;
  title: string;
  description: string;
  emoji: string;
  totalScenarios: number;
  groups: SubModuleGroup[];
}

// ─── Module configs ────────────────────────────────────────────────────────────

const PRIVATKUNDE: OverviewConfig = {
  moduleId: "privatkunde",
  title: "Privatkunde",
  description: "Basis- und Individualprodukte aus Beratersicht",
  emoji: "👤",
  totalScenarios: 10,
  groups: [
    {
      label: "Basis",
      items: [
        {
          id: "privatkunde-kontoeröffnung",
          title: "Kontoeröffnung",
          description: "Legitimationsprüfung und Onboarding",
          href: "/privatkunde/basis/kontoeröffnung",
          emoji: "📄",
          totalScenarios: 3,
        },
        {
          id: "privatkunde-sparen-konto",
          title: "Sparen & Konto",
          description: "Sparkonten und Kontoprodukte",
          href: "/privatkunde/basis/sparen-konto",
          emoji: "💰",
          totalScenarios: 3,
        },
        {
          id: "privatkunde-zahlungsverkehr",
          title: "Zahlungsverkehr",
          description: "Zahlungsprodukte kennen und beraten",
          href: "/privatkunde/basis/zahlungsverkehr",
          emoji: "💳",
          totalScenarios: 3,
        },
        {
          id: "privatkunde-vorsorge",
          title: "3a / Vorsorge",
          description: "Vorsorgelösungen und Steuervorteile",
          href: "/privatkunde/basis/vorsorge",
          emoji: "🔐",
          totalScenarios: 3,
        },
        {
          id: "privatkunde-fonds",
          title: "Fonds",
          description: "Anlagestrategien und Fondsempfehlung",
          href: "/privatkunde/basis/fonds",
          emoji: "📈",
          totalScenarios: 3,
        },
        {
          id: "privatkunde-simulation",
          title: "Simulation: Kontoeröffnung",
          description: "Praxissimulation Kundengespräch",
          href: "/privatkunde/basis/simulation-kontoeröffnung",
          emoji: "🎭",
          totalScenarios: 1,
        },
      ],
    },
    {
      label: "Dokument prüfen",
      items: [
        {
          id: "privatkunde-dokument-pruefen",
          title: "Dokument prüfen",
          description: "Fehler in Bankdokumenten finden und analysieren",
          href: "/privatkunde/dokument-pruefen",
          emoji: "📋",
          totalScenarios: 1,
        },
      ],
    },
    {
      label: "Individual",
      items: [
        {
          id: "privatkunde-hypotheken",
          title: "Hypotheken",
          description: "Wohnbaukredit und Tragbarkeit",
          href: "/privatkunde/individual/hypotheken",
          emoji: "🏠",
          totalScenarios: 3,
        },
        {
          id: "privatkunde-blankokredit",
          title: "Blankokredit",
          description: "Blankokredit und Kreditlimite",
          href: "/privatkunde/individual/blankokredit",
          emoji: "💼",
          totalScenarios: 3,
        },
        {
          id: "privatkunde-konsumkredit",
          title: "Konsumkredit",
          description: "Konsumkreditberatung",
          href: "/privatkunde/individual/konsumkredit",
          emoji: "🛒",
          totalScenarios: 3,
          comingSoon: true,
        },
        {
          id: "privatkunde-sim-hypothek",
          title: "Simulation: Hypothek",
          description: "Praxissimulation Hypothekenberatung",
          href: "/privatkunde/individual/simulation-hypothek",
          emoji: "🎭",
          totalScenarios: 1,
        },
      ],
    },
  ],
};

const FIRMENKUNDE: OverviewConfig = {
  moduleId: "firmenkunde",
  title: "Firmenkunde",
  description: "Firmenkonten, Tragbarkeit und Kreditengagements",
  emoji: "🏢",
  totalScenarios: 7,
  groups: [
    {
      label: "Dokument prüfen",
      items: [
        {
          id: "firmenkunde-dokument-pruefen",
          title: "Dokument prüfen",
          description: "Fehler in Bankdokumenten finden und analysieren",
          href: "/firmenkunde/dokument-pruefen",
          emoji: "📋",
          totalScenarios: 1,
        },
      ],
    },
    {
      label: "Kontoeröffnung",
      items: [
        {
          id: "firmenkunde-kontoeröffnung-firma",
          title: "Kontoeröffnung Firma",
          description: "Kontoeröffnung für Kapitalgesellschaften",
          href: "/firmenkunde/kontoeröffnung-firma",
          emoji: "📋",
          totalScenarios: 2,
        },
        {
          id: "firmenkunde-sitzgesellschaft",
          title: "Sitzgesellschaft",
          description: "Kontoeröffnung für Sitzgesellschaften",
          href: "/firmenkunde/kontoeröffnung-sitzgesellschaft",
          emoji: "🏛️",
          totalScenarios: 1,
        },
      ],
    },
    {
      label: "Tragbarkeit",
      items: [
        {
          id: "firmenkunde-tragbarkeit",
          title: "Übersicht Tragbarkeit",
          description: "Tragbarkeitsberechnung im Überblick",
          href: "/firmenkunde/tragbarkeit",
          emoji: "⚖️",
          totalScenarios: 1,
        },
        {
          id: "firmenkunde-renditeobjekt",
          title: "Renditeobjekte",
          description: "Tragbarkeit bei Renditeobjekten",
          href: "/firmenkunde/tragbarkeit/renditeobjekt",
          emoji: "🏗️",
          totalScenarios: 1,
        },
        {
          id: "firmenkunde-gesamtengagement",
          title: "Gesamtengagement",
          description: "Kreditportfolio und Gesamtengagement",
          href: "/firmenkunde/tragbarkeit/gesamtengagement",
          emoji: "📊",
          totalScenarios: 1,
        },
        {
          id: "firmenkunde-etp",
          title: "Belastungsgrenze & ETP",
          description: "Eigenkapital und Tragbarkeitsplafond",
          href: "/firmenkunde/tragbarkeit/etp",
          emoji: "📐",
          totalScenarios: 1,
        },
        {
          id: "firmenkunde-gewerbe",
          title: "Gewerbeliegenschaft",
          description: "Selbstgenutzte Gewerbeliegenschaften",
          href: "/firmenkunde/tragbarkeit/gewerbe",
          emoji: "🔨",
          totalScenarios: 1,
        },
      ],
    },
  ],
};

const ANLAGEKUNDE: OverviewConfig = {
  moduleId: "anlagekunde",
  title: "Anlagekunde",
  description: "Anlageberatung und Kundenprofil",
  emoji: "📈",
  totalScenarios: 4,
  groups: [
    {
      label: "Dokument prüfen",
      items: [
        {
          id: "anlagekunde-dokument-pruefen",
          title: "Dokument prüfen",
          description: "Fehler in Bankdokumenten finden und analysieren",
          href: "/anlagekunde/dokument-pruefen",
          emoji: "📋",
          totalScenarios: 1,
          comingSoon: true,
        },
      ],
    },
    {
      label: "Anlageberatung",
      items: [
        {
          id: "anlagekunde-anlegerprofil",
          title: "Anlegerprofil",
          description: "Risikoprofil und Anlagestrategie bestimmen",
          href: "/anlagekunde/anlegerprofil",
          emoji: "🎯",
          totalScenarios: 4,
        },
      ],
    },
  ],
};

const BACKOFFICE: OverviewConfig = {
  moduleId: "banking-operations",
  title: "Back Office",
  description: "Kontoeröffnungen, Zahlungsverkehr, KYC und Mahnwesen",
  emoji: "🏦",
  totalScenarios: 9,
  groups: [
    {
      label: "Dokument prüfen",
      items: [
        {
          id: "backoffice-dokument-pruefen",
          title: "Dokument prüfen",
          description: "Fehler in Bankdokumenten finden und analysieren",
          href: "/backoffice/dokument-pruefen",
          emoji: "📋",
          totalScenarios: 1,
          comingSoon: true,
        },
      ],
    },
    {
      label: "Banking Operations",
      items: [
        {
          id: "backoffice-kontoeröffnungen",
          title: "Kontoeröffnungen",
          description: "Kontoeröffnung und Legitimationsprüfung",
          href: "/backoffice/banking-operations/kontoeröffnungen",
          emoji: "📄",
          totalScenarios: 3,
        },
        {
          id: "backoffice-zahlungsverkehr",
          title: "Zahlungsverkehr",
          description: "Zahlungsverkehr Back Office",
          href: "/backoffice/banking-operations/zahlungsverkehr",
          emoji: "💸",
          totalScenarios: 3,
        },
        {
          id: "backoffice-kyc",
          title: "KYC / Compliance",
          description: "Know Your Customer und Compliance",
          href: "/backoffice/banking-operations/kyc",
          emoji: "🔍",
          totalScenarios: 2,
        },
        {
          id: "backoffice-mahnwesen",
          title: "Mahnwesen",
          description: "Mahnverfahren und Inkasso",
          href: "/backoffice/banking-operations/mahnwesen",
          emoji: "📬",
          totalScenarios: 2,
        },
      ],
    },
    {
      label: "Kreditgeschäft",
      items: [
        {
          id: "credit-operations",
          title: "Kreditgeschäft",
          description: "Kreditbearbeitung und Risikoprüfung",
          href: "/backoffice/credit-operations",
          emoji: "⚙️",
          totalScenarios: 5,
        },
      ],
    },
  ],
};

const CONFIGS: Record<string, OverviewConfig> = {
  privatkunde: PRIVATKUNDE,
  firmenkunde: FIRMENKUNDE,
  anlagekunde: ANLAGEKUNDE,
  backoffice: BACKOFFICE,
};

// ─── Sub-module row ────────────────────────────────────────────────────────────

function SubModuleRow({
  item,
  subProgress,
}: {
  item: SubModuleItem;
  subProgress: ModuleProgress | null;
}) {
  const completed = subProgress?.completed ?? 0;
  const total = item.totalScenarios;
  const isDone = completed >= total && total > 0 && completed > 0;
  const isActive = completed > 0 && !isDone;

  return (
    <Link
      href={item.comingSoon ? "#" : item.href}
      className={cn(
        "flex items-center gap-4 border-b border-border px-4 py-3.5 last:border-0 transition-colors",
        item.comingSoon
          ? "pointer-events-none opacity-50"
          : "hover:bg-gray-50 cursor-pointer"
      )}
    >
      <span className="shrink-0 text-2xl">{item.emoji}</span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="text-sm font-semibold text-text-primary">{item.title}</p>
          {item.comingSoon && (
            <span className="rounded-pill bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-text-secondary">
              Bald
            </span>
          )}
          {isDone && (
            <span className="inline-flex items-center gap-0.5 rounded-pill bg-primary-light px-2 py-0.5 text-[10px] font-medium text-primary">
              <CheckCircle2 size={9} />
              Abgeschlossen
            </span>
          )}
          {isActive && (
            <span className="inline-flex items-center gap-0.5 rounded-pill bg-accent-light px-2 py-0.5 text-[10px] font-medium text-accent">
              <Clock size={9} />
              In Bearbeitung
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-text-secondary">{item.description}</p>
        {isActive && (
          <div className="mt-1.5">
            <ProgressBar value={completed} max={total} />
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="text-xs text-text-secondary tabular-nums">
          {completed}/{total}
        </span>
        {item.comingSoon ? (
          <Lock size={13} className="text-text-secondary" />
        ) : (
          <ChevronRight size={14} className="text-text-secondary" />
        )}
      </div>
    </Link>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface ModuleOverviewProps {
  configId: string;
}

type TabId = "szenarien" | "praxis";

export function ModuleOverview({ configId }: ModuleOverviewProps) {
  const config = CONFIGS[configId];
  const [allProgress, setAllProgress] = useState<Record<string, ModuleProgress>>({});
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("szenarien");
  const hasPraxisData = !!PRAXIS_DATA[configId];

  useEffect(() => {
    setAllProgress(getProgress());
    setLoaded(true);
  }, []);

  const moduleProgress = allProgress[config.moduleId];
  const completed = moduleProgress?.completed ?? 0;
  const total = config.totalScenarios;
  const accuracy = moduleProgress?.accuracy ?? 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Module header card */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div
          className="p-6"
          style={{ background: "linear-gradient(135deg, #0D1B4B08 0%, #00C9B108 100%)" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-3xl">
              {config.emoji}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-text-primary">{config.title}</h1>
              <p className="mt-0.5 text-sm text-text-secondary">{config.description}</p>
            </div>
          </div>

          <div className="mt-5 flex items-end gap-4">
            <div className="flex-1">
              <div className="mb-1.5 flex justify-between text-xs text-text-secondary">
                <span>Gesamtfortschritt</span>
                <span>
                  {loaded ? completed : "–"}/{total} Szenarien
                </span>
              </div>
              <ProgressBar value={loaded ? completed : 0} max={total} />
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-bold text-text-primary">
                {loaded ? pct : 0}%
              </p>
              {loaded && accuracy > 0 && (
                <p className="text-xs text-text-secondary">{accuracy}% Genauigkeit</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      {hasPraxisData && (
        <div className="mb-5 flex rounded-xl border border-border bg-surface p-1 gap-1">
          <button
            onClick={() => setActiveTab("szenarien")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
              activeTab === "szenarien"
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            <BookOpen size={14} />
            Szenarien
          </button>
          <button
            onClick={() => setActiveTab("praxis")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
              activeTab === "praxis"
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            <Lightbulb size={14} />
            Praxis
          </button>
        </div>
      )}

      {/* Szenarien tab */}
      {activeTab === "szenarien" && (
        <div className="space-y-5">
          {config.groups.map((group) => (
            <div key={group.label}>
              <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {group.label}
              </h2>
              <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                {group.items.map((item) => (
                  <SubModuleRow
                    key={item.id}
                    item={item}
                    subProgress={allProgress[item.id] ?? null}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Praxis tab */}
      {activeTab === "praxis" && hasPraxisData && (
        <div className="space-y-5">
          <BankerDenkweise configId={configId} />
          <PraxisTipps configId={configId} />
        </div>
      )}
    </div>
  );
}
