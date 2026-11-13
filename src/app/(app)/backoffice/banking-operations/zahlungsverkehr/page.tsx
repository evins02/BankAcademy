"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ZahlungsverkehrRunner } from "@/components/modules/zahlungsverkehr/ZahlungsverkehrRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function ZahlungsverkehrPage() {
  const { t } = useLanguage();
  const bko = t.modules.backoffice;
  return (
    <>
      <Header title={bko.zahlungsverkehr.pageTitle} subtitle={bko.zahlungsverkehr.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: bko.pageTitle, href: "/backoffice" },
          { label: bko.bankingOps.pageTitle, href: "/backoffice/banking-operations" },
          { label: bko.zahlungsverkehr.pageTitle },
        ]}
      />
      <ZahlungsverkehrRunner />
    </>
  );
}
