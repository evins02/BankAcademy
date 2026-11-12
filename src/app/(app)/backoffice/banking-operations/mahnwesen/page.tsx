"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MahnwesenRunner } from "@/components/modules/mahnwesen/MahnwesenRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function MahnwesenPage() {
  const { t } = useLanguage();
  const bko = t.modules.backoffice;
  return (
    <>
      <Header title={bko.mahnwesen.pageTitle} subtitle={bko.mahnwesen.pageSubtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: bko.pageTitle, href: "/backoffice" },
          { label: bko.bankingOps.pageTitle, href: "/backoffice/banking-operations" },
          { label: bko.mahnwesen.pageTitle },
        ]}
      />
      <MahnwesenRunner />
    </>
  );
}
