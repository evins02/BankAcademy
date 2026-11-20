"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AktienLernblock } from "@/components/modules/aktien/LernblockCard";
import { AKTIEN_LEVELS } from "@/lib/aktien";
import { useLanguage } from "@/context/LanguageContext";
import { localizeCaseLevels } from "@/lib/translations/utils";
import { AKTIEN_TRANSLATIONS } from "@/lib/translations/aktien";

export default function DemoAktienPage() {
  const { t, lang } = useLanguage();
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
        levels={localizeCaseLevels(AKTIEN_LEVELS, lang, AKTIEN_TRANSLATIONS)}
        moduleId="demo-anlagekunde-aktien"
        moduleName={d.aktienTitle}
        selectorTitle={d.aktienSelectorTitle}
        selectorDescription={d.aktienSelectorDesc}
        LernblockComponent={AktienLernblock}
      />
    </>
  );
}
