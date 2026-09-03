import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PracticeSimulationPage } from "@/components/modules/simulation/PracticeSimulationPage";

export default function SchwierigGespraeche() {
  return (
    <>
      <Header
        title="Schwieriges Kundengespräch"
        subtitle="Markus Steiner – Anlageportfolio Jahresgespräch"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Practice" },
          { label: "Privatkunde" },
          { label: "Schwieriges Gespräch" },
        ]}
      />
      <PracticeSimulationPage />
    </>
  );
}
