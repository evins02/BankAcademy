"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ZvPrivatRunner } from "@/components/modules/zahlungsverkehr-privat/ZvPrivatRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoZahlungsverkehrPage() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <>
      <Header
        title={d.privatZvTitle}
        subtitle={d.privatZvSubtitle}
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navItems["Privatkunde"] },
          { label: t.navSections["Basis"] },
          { label: d.privatZvTitle },
        ]}
      />
      <ZvPrivatRunner />
    </>
  );
}
