"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AnlageFondsLernblock } from "@/components/modules/anlage-fonds/LernblockCard";
import { ANLAGE_FONDS_LEVELS } from "@/lib/anlage-fonds";
import { useLanguage } from "@/context/LanguageContext";

export default function AnlageFondsPage() {
  const { t } = useLanguage();
  const m = t.modules.anlagekunde.fonds;
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
        levels={ANLAGE_FONDS_LEVELS}
        moduleId="anlagekunde-fonds"
        moduleName={m.title}
        selectorTitle={m.selectorTitle}
        selectorDescription={m.selectorDescription}
        LernblockComponent={AnlageFondsLernblock}
      />
    </>
  );
}
