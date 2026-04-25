import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioRunner } from "@/components/modules/kontoeröffnungen/ScenarioRunner";
import { KONTO_SCENARIOS } from "@/lib/kontoeröffnungen";

export default function KontoScenarioPage({
  params,
}: {
  params: { scenarioId: string };
}) {
  const scenario = KONTO_SCENARIOS.find((s) => s.id === params.scenarioId);
  if (!scenario) notFound();

  return (
    <>
      <Header title={scenario.title} subtitle={scenario.customerType} />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Sparen & Konto", href: "/privatkunde/basis/konto" },
          { label: scenario.customerType },
        ]}
      />
      <ScenarioRunner scenario={scenario} basePath="/privatkunde/basis/konto" />
    </>
  );
}

export function generateStaticParams() {
  return KONTO_SCENARIOS.map((s) => ({ scenarioId: s.id }));
}
