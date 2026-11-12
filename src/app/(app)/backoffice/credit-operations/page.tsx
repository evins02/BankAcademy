"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CreditOperationsRunner } from "@/components/modules/credit-operations/CreditOperationsRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function CreditOperationsPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={t.modules.backoffice.creditOps.pageTitle} subtitle={t.modules.backoffice.creditOps.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.backoffice.pageTitle, href: "/backoffice" },
          { label: t.modules.backoffice.creditOps.pageTitle },
        ]}
      />
      <CreditOperationsRunner />
    </>
  );
}
