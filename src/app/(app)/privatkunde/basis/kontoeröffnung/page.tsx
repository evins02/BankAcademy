"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KontoeröffnungHub } from "@/components/modules/kontoeröffnung-privat/KontoeröffnungHub";
import { useLanguage } from "@/context/LanguageContext";

export default function KontoeröffnungPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.kontoeröffnung;
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
      <KontoeröffnungHub />
    </>
  );
}
