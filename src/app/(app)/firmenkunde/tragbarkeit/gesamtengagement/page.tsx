"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionRunner } from "@/components/modules/tragbarkeit/SectionRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function GesamtengagementPage() {
  const { t } = useLanguage();
  const tr = t.modules.firmenkunde.tragbarkeit;
  return (
    <>
      <Header title={tr.gesamtengagement.title} subtitle={tr.gesamtengagement.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.firmenkunde.pageTitle, href: "/firmenkunde" },
          { label: tr.title, href: "/firmenkunde/tragbarkeit" },
          { label: tr.gesamtengagement.title },
        ]}
      />
      <SectionRunner sectionId="gesamtengagement" />
    </>
  );
}
