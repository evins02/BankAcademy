"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KmuKreditRunner } from "@/components/modules/blankokredit/KmuKreditRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function KmuKreditPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={t.modules.firmenkunde.kmuKredit.title} subtitle={t.modules.firmenkunde.kmuKredit.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.firmenkunde.pageTitle, href: "/firmenkunde" },
          { label: t.modules.firmenkunde.kmuKredit.title },
        ]}
      />
      <KmuKreditRunner />
    </>
  );
}
