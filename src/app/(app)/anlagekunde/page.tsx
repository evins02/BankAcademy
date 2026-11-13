"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModuleOverview } from "@/components/modules/ModuleOverviewPage";
import { useLanguage } from "@/context/LanguageContext";

export default function AnlagekundePage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={t.modules.anlagekunde.pageTitle} subtitle={t.modules.anlagekunde.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.anlagekunde.pageTitle },
        ]}
      />
      <ModuleOverview configId="anlagekunde" />
    </>
  );
}
