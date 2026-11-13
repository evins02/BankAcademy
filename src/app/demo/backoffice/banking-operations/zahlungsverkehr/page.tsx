"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ZahlungsverkehrRunner } from "@/components/modules/zahlungsverkehr/ZahlungsverkehrRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoBkoZahlungsverkehrPage() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <>
      <Header title={d.bkoZvTitle} subtitle={d.bkoZvSubtitle} />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navGroups["Back Office"] },
          { label: t.navItems["Banking Operations"] },
          { label: d.bkoZvTitle },
        ]}
      />
      <ZahlungsverkehrRunner />
    </>
  );
}
