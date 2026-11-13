"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BlankokreditRunner } from "@/components/modules/blankokredit/BlankokreditRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function BlankokreditPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.blankokredit;
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
      <BlankokreditRunner />
    </>
  );
}
