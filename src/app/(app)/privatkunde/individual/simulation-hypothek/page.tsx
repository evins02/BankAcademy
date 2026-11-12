"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { HypothekSimulationPage } from "@/components/modules/simulation/HypothekSimulationPage";
import { useLanguage } from "@/context/LanguageContext";

export default function SimulationHypothekPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.simulationHypothek;
  return (
    <>
      <Header title={m.title} subtitle={m.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.privatkunde.pageTitle, href: "/privatkunde" },
          { label: m.title },
        ]}
      />
      <HypothekSimulationPage />
    </>
  );
}
