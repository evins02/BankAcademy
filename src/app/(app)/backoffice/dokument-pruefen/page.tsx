"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DocumentPruefen } from "@/components/features/dokument-pruefen/DocumentPruefen";
import { DOKUMENT_REGISTRY } from "@/lib/dokument-pruefen/registry";
import { useLanguage } from "@/context/LanguageContext";

export default function DokumentPruefenPage() {
  const { t } = useLanguage();
  const bko = t.modules.backoffice;
  const config = DOKUMENT_REGISTRY["auslandsueberweisung-schmid"];
  return (
    <>
      <Header title={bko.bankingOps.dokumentPruefenTitle} subtitle={bko.bankingOps.dokumentPruefenSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: bko.pageTitle, href: "/backoffice" },
          { label: bko.bankingOps.dokumentPruefenTitle },
        ]}
      />
      <div className="flex-1 overflow-y-auto">
        <DocumentPruefen config={config} />
      </div>
    </>
  );
}
