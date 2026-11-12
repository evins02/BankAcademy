"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnlagekundeRunner } from "@/components/modules/anlagekunde/AnlagekundeRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function AnlageprofilPage() {
  const { t } = useLanguage();
  const m = t.modules.anlagekunde.anlegerprofil;
  return (
    <>
      <Header title={m.title} subtitle={m.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.anlagekunde.pageTitle, href: "/anlagekunde" },
          { label: m.title },
        ]}
      />
      <AnlagekundeRunner />
    </>
  );
}
