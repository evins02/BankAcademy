import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AktienLernblock } from "@/components/modules/aktien/LernblockCard";
import { AKTIEN_LEVELS } from "@/lib/aktien";

export default function AktienPage() {
  return (
    <>
      <Header title="Aktien & Kennzahlen" subtitle="Anlagekunde – KGV, Dividendenrendite & Aktie vs. Obligation" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde" },
          { label: "Aktien & Kennzahlen" },
        ]}
      />
      <SubRunner
        levels={AKTIEN_LEVELS}
        moduleId="anlagekunde-aktien"
        moduleName="Aktien & Kennzahlen"
        selectorTitle="Aktien & Kennzahlen"
        selectorDescription="Lerne KGV und Dividendenrendite zu berechnen und Aktien mit Obligationen zu vergleichen."
        LernblockComponent={AktienLernblock}
      />
    </>
  );
}
