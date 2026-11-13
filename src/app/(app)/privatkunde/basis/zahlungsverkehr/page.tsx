"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ZvPrivatRunner } from "@/components/modules/zahlungsverkehr-privat/ZvPrivatRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function ZahlungsverkehrPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.zahlungsverkehr;
  return (
    <>
      <Header title={m.title} subtitle={m.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.privatkunde.pageTitle, href: "/privatkunde" },
          { label: m.title },
        ]}
      />
      <ZvPrivatRunner />
    </>
  );
}
