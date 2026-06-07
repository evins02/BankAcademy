import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { AnlageFondsLernblock } from "@/components/modules/anlage-fonds/LernblockCard";
import { ANLAGE_FONDS_LEVELS } from "@/lib/anlage-fonds";

export default function AnlageFondsPage() {
  return (
    <>
      <Header title="Anlagefonds & ETF" subtitle="Anlagekunde – TER, ausschüttend/thesaurierend, aktiv vs. passiv" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde" },
          { label: "Anlagefonds & ETF" },
        ]}
      />
      <SubRunner
        levels={ANLAGE_FONDS_LEVELS}
        moduleId="anlagekunde-fonds"
        moduleName="Anlagefonds & ETF"
        selectorTitle="Anlagefonds & ETF"
        selectorDescription="Lerne TER zu vergleichen, ausschüttende von thesaurierenden Fonds zu unterscheiden und aktiv vs. passiv zu bewerten."
        LernblockComponent={AnlageFondsLernblock}
      />
    </>
  );
}
