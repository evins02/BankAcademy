"use client";

import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioRunner } from "@/components/modules/kontoeröffnungen/ScenarioRunner";
import { KONTO_SCENARIOS } from "@/lib/kontoeröffnungen";
import { useLanguage } from "@/context/LanguageContext";
import { use } from "react";

export default function ScenarioPage({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = use(params);
  const { t } = useLanguage();
  const bko = t.modules.backoffice;
  const scenario = KONTO_SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) notFound();

  return (
    <>
      <Header title={scenario.title} subtitle={scenario.customerType} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: bko.pageTitle, href: "/backoffice" },
          { label: bko.bankingOps.pageTitle, href: "/backoffice/banking-operations" },
          { label: bko.kontoeröffnungen.pageTitle, href: "/backoffice/banking-operations/kontoeröffnungen" },
          { label: scenario.customerType },
        ]}
      />
      <ScenarioRunner scenario={scenario} basePath="/backoffice/banking-operations/kontoeröffnungen" />
    </>
  );
}
