"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AnlageFondsLernblock } from "@/components/modules/anlage-fonds/LernblockCard";
import { ANLAGE_FONDS_LEVELS } from "@/lib/anlage-fonds";
import { useLanguage } from "@/context/LanguageContext";
import { localizeCaseLevels } from "@/lib/translations/utils";
import { ANLAGE_FONDS_TRANSLATIONS } from "@/lib/translations/anlage-fonds";

export default function AnlageFondsPage() {
  const { t, lang } = useLanguage();
  const m = t.modules.anlagekunde.fonds;
  const localizedLevels = localizeCaseLevels(ANLAGE_FONDS_LEVELS, lang, ANLAGE_FONDS_TRANSLATIONS);
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
        moduleId="anlagekunde-fonds"
        moduleName={m.title}
        selectorTitle={m.selectorTitle}
        selectorDescription={m.selectorDescription}
        LernblockComponent={AnlageFondsLernblock}
      />
    </>
  );
}
