import { User, Building2, TrendingUp, Settings2, Landmark } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Card, CardContent } from "@/components/ui/card";

const FRONT_OFFICE_MODULES = [
  {
    title: "Privatkunde",
    description: "Basis- und Individualprodukte aus Beratersicht.",
    href: "/privatkunde/basis/zahlungsverkehr",
    icon: User,
    status: "active" as const,
    completedScenarios: 1,
    totalScenarios: 7,
  },
  {
    title: "Firmenkunde",
    description: "Coming soon",
    href: "/firmenkunde",
    icon: Building2,
    status: "idle" as const,
    completedScenarios: 0,
    totalScenarios: 0,
  },
  {
    title: "Anlagekunde",
    description: "Coming soon",
    href: "/anlagekunde",
    icon: TrendingUp,
    status: "idle" as const,
    completedScenarios: 0,
    totalScenarios: 0,
  },
];

const BACK_OFFICE_MODULES = [
  {
    title: "Banking Operations",
    description: "Kontoeröffnungen, Zahlungsverkehr, KYC und Mahnwesen.",
    href: "/backoffice/banking-operations/kontoeröffnungen",
    icon: Landmark,
    status: "active" as const,
    completedScenarios: 0,
    totalScenarios: 4,
  },
  {
    title: "Credit Operations",
    description: "Coming soon",
    href: "/backoffice/credit-operations",
    icon: Settings2,
    status: "idle" as const,
    completedScenarios: 0,
    totalScenarios: 0,
  },
];

const STATS = [
  { label: "Szenarien total", value: "19" },
  { label: "Abgeschlossen", value: "6" },
  { label: "Genauigkeit", value: "84%" },
];

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Banking Lab"
        subtitle="Willkommen zurück, Max — mach weiter, wo du aufgehört hast."
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-8 grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-2">
                <p className="text-3xl font-bold text-text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Front Office
        </h2>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRONT_OFFICE_MODULES.map((m) => (
            <ModuleCard key={m.title} {...m} />
          ))}
        </div>

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Back Office
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BACK_OFFICE_MODULES.map((m) => (
            <ModuleCard key={m.title} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}
