"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AktienLernblock } from "@/components/modules/aktien/LernblockCard";
import { AKTIEN_LEVELS } from "@/lib/aktien";
import { useLanguage } from "@/context/LanguageContext";
import { localizeCaseLevels } from "@/lib/translations/utils";
import { TRANSLATIONS as AKTIEN_TRANSLATIONS } from "@/lib/translations/aktien";

export default function AktienPage() {
  const { t, lang } = useLanguage();
  const m = t.modules.anlagekunde.aktien;
  const localizedLevels = localizeCaseLevels(AKTIEN_LEVELS, lang, AKTIEN_TRANSLATIONS);
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
        levels={localizedLevels}
        moduleId="anlagekunde-aktien"
        moduleName={m.title}
        selectorTitle={m.selectorTitle}
        selectorDescription={m.selectorDescription}
        LernblockComponent={AktienLernblock}
      />
    </>
  );
}
