"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TragbarkeitOverview } from "@/components/modules/tragbarkeit/TragbarkeitOverview";
import { useLanguage } from "@/context/LanguageContext";

export default function TragbarkeitPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={t.modules.firmenkunde.tragbarkeit.title} subtitle={t.modules.firmenkunde.tragbarkeit.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.firmenkunde.pageTitle, href: "/firmenkunde" },
          { label: t.modules.firmenkunde.tragbarkeit.title },
        ]}
      />
      <TragbarkeitOverview />
    </>
  );
}
