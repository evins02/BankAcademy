"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SparenKontoRunner } from "@/components/modules/sparen-konto/SparenKontoRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoSparenKontoPage() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <>
      <Header title={d.sparenKontoTitle} subtitle={d.sparenKontoSubtitle} />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navItems["Privatkunde"] },
          { label: t.navSections["Basis"] },
          { label: d.sparenKontoTitle },
        ]}
      />
      <SparenKontoRunner />
    </>
  );
}
