"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KycRunner } from "@/components/modules/kyc/KycRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function KycPage() {
  const { t } = useLanguage();
  const kyc = t.modules.backoffice.kyc;
  return (
    <>
      <Header title={kyc.pageTitle} subtitle={kyc.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.backoffice.pageTitle, href: "/backoffice" },
          { label: kyc.pageTitle },
        ]}
      />
      <KycRunner />
    </>
  );
}
