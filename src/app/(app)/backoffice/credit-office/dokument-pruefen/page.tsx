"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DocumentPruefen } from "@/components/features/dokument-pruefen/DocumentPruefen";
import { DOKUMENT_REGISTRY } from "@/lib/dokument-pruefen/registry";
import { useLanguage } from "@/context/LanguageContext";

export default function DokumentPruefenPage() {
  const { t } = useLanguage();
  const co = t.modules.backoffice.creditOffice;
  const config = DOKUMENT_REGISTRY["kreditpruefung-bianchi"];
  return (
    <>
      <Header title={co.dokumentPruefenTitle} subtitle={config.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.backoffice.pageTitle, href: "/backoffice" },
          { label: co.pageTitle, href: "/backoffice/credit-office" },
          { label: co.dokumentPruefenTitle },
        ]}
      />
      <div className="flex-1 overflow-y-auto">
        <DocumentPruefen config={config} />
      </div>
    </>
  );
}
