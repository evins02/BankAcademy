"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModuleOverview } from "@/components/modules/ModuleOverviewPage";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivatkundePage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={t.modules.privatkunde.pageTitle} subtitle={t.modules.privatkunde.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.privatkunde.pageTitle },
        ]}
      />
      <ModuleOverview configId="privatkunde" />
    </>
  );
}
