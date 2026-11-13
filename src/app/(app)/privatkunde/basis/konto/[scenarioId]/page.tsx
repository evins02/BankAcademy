"use client";

import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioRunner } from "@/components/modules/kontoeröffnungen/ScenarioRunner";
import { KONTO_SCENARIOS } from "@/lib/kontoeröffnungen";
import { useLanguage } from "@/context/LanguageContext";
import { use } from "react";

export default function KontoScenarioPage({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = use(params);
  const { t } = useLanguage();
  const scenario = KONTO_SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) notFound();

  return (
    <>
      <Header title={scenario.title} subtitle={scenario.customerType} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.privatkunde.pageTitle, href: "/privatkunde" },
          { label: t.modules.privatkunde.sparenKonto.title, href: "/privatkunde/basis/konto" },
          { label: scenario.customerType },
        ]}
      />
      <ScenarioRunner scenario={scenario} basePath="/privatkunde/basis/konto" />
    </>
  );
}
