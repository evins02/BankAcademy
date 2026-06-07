import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubRunner } from "@/components/modules/anlage-submodule/SubRunner";
import { ObligationenLernblock } from "@/components/modules/obligationen/LernblockCard";
import { OBLIGATIONEN_LEVELS } from "@/lib/obligationen";

export default function ObligationenPage() {
  return (
    <>
      <Header title="Obligationen" subtitle="Anlagekunde – Ratings, Rendite & Zins-Kurs-Zusammenhang" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde" },
          { label: "Obligationen" },
        ]}
      />
      <SubRunner
        levels={OBLIGATIONEN_LEVELS}
        moduleId="anlagekunde-obligationen"
        moduleName="Obligationen"
        selectorTitle="Obligationen"
        selectorDescription="Lerne Ratings zu interpretieren, Renditen zu berechnen und den Zins-Kurs-Zusammenhang zu erklären."
        LernblockComponent={ObligationenLernblock}
      />
    </>
  );
}
