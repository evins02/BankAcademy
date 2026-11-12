"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SparenKontoRunner } from "@/components/modules/sparen-konto/SparenKontoRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function SparenKontoPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.sparenKonto;
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
      <SparenKontoRunner />
    </>
  );
}
