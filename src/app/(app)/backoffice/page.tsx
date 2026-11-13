"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModuleOverview } from "@/components/modules/ModuleOverviewPage";
import { useLanguage } from "@/context/LanguageContext";

export default function BackofficePage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={t.modules.backoffice.pageTitle} subtitle={t.modules.backoffice.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.backoffice.pageTitle },
        ]}
      />
      <ModuleOverview configId="backoffice" />
    </>
  );
}
