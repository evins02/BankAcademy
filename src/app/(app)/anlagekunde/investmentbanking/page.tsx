"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { IBLernblock } from "@/components/modules/investmentbanking/LernblockCard";
import { IB_LEVELS } from "@/lib/investmentbanking";
import { useLanguage } from "@/context/LanguageContext";

export default function InvestmentbankingPage() {
  const { t } = useLanguage();
  const m = t.modules.anlagekunde.investmentbanking;
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
        levels={IB_LEVELS}
        moduleId="anlagekunde-investmentbanking"
        moduleName={m.title}
        selectorTitle={m.selectorTitle}
        selectorDescription={m.selectorDescription}
        LernblockComponent={IBLernblock}
      />
    </>
  );
}
