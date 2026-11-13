"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function HypothekErstfinanzierungPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={`${t.navItems["Hypotheken"]} – ${t.navItems["Erstfinanzierung"]}`} subtitle={t.navItems["Bald verfügbar"]} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.navGroups["Practice"] },
          { label: t.navItems["Privatkundenberater"] },
          { label: t.navItems["Hypotheken"] },
          { label: t.navItems["Erstfinanzierung"] },
        ]}
      />
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-2xl font-bold text-text-primary mb-2">Bald verfügbar</p>
          <p className="text-text-secondary text-sm">Szenario: Junges Paar kauft erstes Eigenheim – Tragbarkeit, Eigenmittel, Modellwahl.</p>
        </div>
      </div>
    </>
  );
}
