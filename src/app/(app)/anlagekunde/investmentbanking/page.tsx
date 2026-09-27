import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { IBLernblock } from "@/components/modules/investmentbanking/LernblockCard";
import { IB_LEVELS } from "@/lib/investmentbanking";

export default function InvestmentbankingPage() {
  return (
    <>
      <Header
        title="Investmentbanking"
        subtitle="Anlagekunde – IPO, M&A, Underwriting & Bewertungsmethoden"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde" },
          { label: "Investmentbanking" },
        ]}
      />
      <SubRunner
        levels={IB_LEVELS}
        moduleId="anlagekunde-investmentbanking"
        moduleName="Investmentbanking"
        selectorTitle="Investmentbanking"
        selectorDescription="Verstehe die Rolle von Investmentbanken bei Börsengängen, M&A-Transaktionen und Kapitalmärkten."
        LernblockComponent={IBLernblock}
      />
    </>
  );
}
