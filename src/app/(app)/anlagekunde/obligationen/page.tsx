"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { ObligationenLernblock } from "@/components/modules/obligationen/LernblockCard";
import { OBLIGATIONEN_LEVELS } from "@/lib/obligationen";
import { useLanguage } from "@/context/LanguageContext";

export default function ObligationenPage() {
  const { t } = useLanguage();
  const m = t.modules.anlagekunde.obligationen;
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
        levels={OBLIGATIONEN_LEVELS}
        moduleId="anlagekunde-obligationen"
        moduleName={m.title}
        selectorTitle={m.selectorTitle}
        selectorDescription={m.selectorDescription}
        LernblockComponent={ObligationenLernblock}
      />
    </>
  );
}
