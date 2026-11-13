"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KycRunner } from "@/components/modules/kyc/KycRunner";
import { useLanguage } from "@/context/LanguageContext";

export default function KycPage() {
  const { t } = useLanguage();
  const m = t.modules.privatkunde.kyc;
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
      <KycRunner />
    </>
  );
}
