"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function AnlageEsgPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header title={`${t.navSections["Anlageberatung"]} – ${t.navItems["Nachhaltige Anlagen ESG"]}`} subtitle={t.navItems["Bald verfügbar"]} />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.navGroups["Practice"] },
          { label: t.navItems["Privatkundenberater"] },
          { label: t.navSections["Anlageberatung"] },
          { label: t.navItems["ESG-Anfrage"] },
        ]}
      />
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-2xl font-bold text-text-primary mb-2">Bald verfügbar</p>
          <p className="text-text-secondary text-sm">Szenario: Kunde möchte Portfolio auf nachhaltige Anlagen umschichten.</p>
        </div>
      </div>
    </>
  );
}
