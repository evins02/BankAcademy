"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FondsRunner } from "@/components/modules/fonds/FondsRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoFondsPage() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <>
      <Header
        title={d.privatFondsTitle}
        subtitle={d.privatFondsSubtitle}
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navItems["Privatkunde"] },
          { label: t.navSections["Basis"] },
          { label: d.privatFondsTitle },
        ]}
      />
      <FondsRunner />
    </>
  );
}
