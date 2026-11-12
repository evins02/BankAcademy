"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnlageSimulationPage } from "@/components/modules/anlage-simulation/AnlageSimulationPage";
import { useLanguage } from "@/context/LanguageContext";

export default function AnlageSimulationRoute() {
  const { t } = useLanguage();
  const m = t.modules.anlagekunde.simulation;
  return (
    <>
      <Header title={m.title} subtitle={m.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.anlagekunde.pageTitle, href: "/anlagekunde" },
          { label: m.title },
        ]}
      />
      <AnlageSimulationPage />
    </>
  );
}
