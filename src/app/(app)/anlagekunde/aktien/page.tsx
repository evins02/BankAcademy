"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AktienLernblock } from "@/components/modules/aktien/LernblockCard";
import { AKTIEN_LEVELS } from "@/lib/aktien";
import { useLanguage } from "@/context/LanguageContext";

export default function AktienPage() {
  const { t } = useLanguage();
  const m = t.modules.anlagekunde.aktien;
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
      <SubRunner
        levels={AKTIEN_LEVELS}
        moduleId="anlagekunde-aktien"
        moduleName={m.title}
        selectorTitle={m.selectorTitle}
        selectorDescription={m.selectorDescription}
        LernblockComponent={AktienLernblock}
      />
    </>
  );
}
