"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FondsRunner } from "@/components/modules/fonds/FondsRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function FondsPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.fonds;
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
      <FondsRunner />
    </>
  );
}
