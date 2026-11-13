"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { VorsorgeRunner } from "@/components/modules/vorsorge/VorsorgeRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function VorsorgePage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.vorsorge;
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
      <VorsorgeRunner />
    </>
  );
}
