"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionRunner } from "@/components/modules/tragbarkeit/SectionRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function RenditeobjektPage() {
  const { t } = useLanguage();
  const tr = t.modules.firmenkunde.tragbarkeit;
  return (
    <>
      <Header title={tr.renditeobjekt.title} subtitle={tr.renditeobjekt.subtitle} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.firmenkunde.pageTitle, href: "/firmenkunde" },
          { label: tr.title, href: "/firmenkunde/tragbarkeit" },
          { label: tr.renditeobjekt.title },
        ]}
      />
      <SectionRunner sectionId="renditeobjekt" />
    </>
  );
}
