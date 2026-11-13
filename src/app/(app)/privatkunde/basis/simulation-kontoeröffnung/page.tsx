"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AiSimulationPage } from "@/components/modules/simulation/AiSimulationPage";
import { useLanguage } from "@/context/LanguageContext";

export default function SimulationKontoeröffnungPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.simulationKontoeröffnung;
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
      <AiSimulationPage />
    </>
  );
}
