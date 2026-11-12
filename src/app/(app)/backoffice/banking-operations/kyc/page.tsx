"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BkoKycRunner } from "@/components/modules/backoffice-kyc/BkoKycRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function BackofficeKycPage() {
  const { t } = useLanguage();
  const bko = t.modules.backoffice;
  return (
    <>
      <Header title={bko.kyc.pageTitle} subtitle={bko.kyc.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: bko.pageTitle, href: "/backoffice" },
          { label: bko.bankingOps.pageTitle, href: "/backoffice/banking-operations" },
          { label: bko.kyc.pageTitle },
        ]}
      />
      <BkoKycRunner />
    </>
  );
}
