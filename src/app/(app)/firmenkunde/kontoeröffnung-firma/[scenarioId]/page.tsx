import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioRunner } from "@/components/modules/kontoeröffnungen/ScenarioRunner";
import { FIRMENKUNDE_KONTO_SCENARIOS } from "@/lib/kontoeröffnungen";

export default function KontoeröffnungFirmaScenarioPage({
  params,
}: {
  params: { scenarioId: string };
}) {
  const scenario = FIRMENKUNDE_KONTO_SCENARIOS.find((s) => s.id === params.scenarioId);
  if (!scenario) notFound();

  return (
    <>
      <Header title={scenario.title} subtitle={scenario.customerType} />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Kontoeröffnung Firma", href: "/firmenkunde/kontoeröffnung-firma" },
          { label: scenario.customerType },
        ]}
      />
      <ScenarioRunner
        scenario={scenario}
        scenarios={FIRMENKUNDE_KONTO_SCENARIOS}
        basePath="/firmenkunde/kontoeröffnung-firma"
      />
    </>
  );
}

export function generateStaticParams() {
  return FIRMENKUNDE_KONTO_SCENARIOS.map((s) => ({ scenarioId: s.id }));
}
