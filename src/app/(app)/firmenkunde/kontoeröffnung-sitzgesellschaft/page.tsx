"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioRunner } from "@/components/modules/kontoeröffnungen/ScenarioRunner";
import { KONTO_SCENARIOS } from "@/lib/kontoeröffnungen";
import { useLanguage } from "@/context/LanguageContext";

const scenario = KONTO_SCENARIOS.find((s) => s.id === "sitzgesellschaft")!;

export default function KontoeröffnungSitzgesellschaftPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={t.modules.firmenkunde.kontoeröffnungSitzgesellschaft.title} subtitle={scenario.customerType} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.firmenkunde.pageTitle, href: "/firmenkunde" },
          { label: t.modules.firmenkunde.kontoeröffnungSitzgesellschaft.title },
        ]}
      />
      <div className="flex-1 overflow-y-auto">
        <ScenarioRunner scenario={scenario} />
      </div>
    </>
  );
}
