"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MahnwesenRunner } from "@/components/modules/mahnwesen/MahnwesenRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoBkoMahnwesenPage() {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <>
      <Header title={d.mahnwesenTitle} subtitle={d.mahnwesenSubtitle} />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navGroups["Back Office"] },
          { label: t.navItems["Banking Operations"] },
          { label: d.mahnwesenTitle },
        ]}
      />
      <MahnwesenRunner />
    </>
  );
}
