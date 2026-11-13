"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AktienLernblock } from "@/components/modules/aktien/LernblockCard";
import { AKTIEN_LEVELS } from "@/lib/aktien";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoAktienPage() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <>
      <Header
        title={d.aktienTitle}
        subtitle={d.aktienSubtitle}
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navItems["Anlagekunde"] },
          { label: d.aktienTitle },
        ]}
      />
      <SubRunner
        levels={AKTIEN_LEVELS}
        moduleId="demo-anlagekunde-aktien"
        moduleName={d.aktienTitle}
        selectorTitle={d.aktienSelectorTitle}
        selectorDescription={d.aktienSelectorDesc}
        LernblockComponent={AktienLernblock}
      />
    </>
  );
}
