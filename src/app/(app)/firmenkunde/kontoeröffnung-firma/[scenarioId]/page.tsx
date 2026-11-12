"use client";

import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioRunner } from "@/components/modules/kontoeröffnungen/ScenarioRunner";
import { FIRMENKUNDE_KONTO_SCENARIOS } from "@/lib/kontoeröffnungen";
import { useLanguage } from "@/context/LanguageContext";
import { use } from "react";

export default function KontoeröffnungFirmaScenarioPage({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = use(params);
  const { t } = useLanguage();
  const fk = t.modules.firmenkunde;
  const scenario = FIRMENKUNDE_KONTO_SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) notFound();

  return (
    <>
      <Header title={scenario.title} subtitle={scenario.customerType} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: fk.pageTitle, href: "/firmenkunde" },
          { label: fk.kontoeröffnung.title, href: "/firmenkunde/kontoeröffnung-firma" },
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
