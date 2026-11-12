"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DocumentPruefen } from "@/components/features/dokument-pruefen/DocumentPruefen";
import { DOKUMENT_REGISTRY } from "@/lib/dokument-pruefen/registry";
import { useLanguage } from "@/context/LanguageContext";

export default function DokumentPruefenPage() {
  const { t } = useLanguage();
  const config = DOKUMENT_REGISTRY["kontoeroeffnung-firmenkunde"];
  return (
    <>
      <Header title={t.modules.firmenkunde.dokumentPruefen.title} subtitle={config.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.firmenkunde.pageTitle, href: "/firmenkunde" },
          { label: t.modules.firmenkunde.dokumentPruefen.title },
        ]}
      />
      <div className="flex-1 overflow-y-auto">
        <DocumentPruefen config={config} />
      </div>
    </>
  );
}
