"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AnlageFondsLernblock } from "@/components/modules/anlage-fonds/LernblockCard";
import { ANLAGE_FONDS_LEVELS } from "@/lib/anlage-fonds";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoAnlageFondsPage() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <>
      <Header
        title={d.anlageFondsTitle}
        subtitle={d.anlageFondsSubtitle}
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navItems["Anlagekunde"] },
          { label: d.anlageFondsTitle },
        ]}
      />
      <SubRunner
        levels={ANLAGE_FONDS_LEVELS}
        moduleId="demo-anlagekunde-fonds"
        moduleName={d.anlageFondsTitle}
        selectorTitle={d.anlageFondsSelectorTitle}
        selectorDescription={d.anlageFondsSelectorDesc}
        LernblockComponent={AnlageFondsLernblock}
      />
    </>
  );
}
