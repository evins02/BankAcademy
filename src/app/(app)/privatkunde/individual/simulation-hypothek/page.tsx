import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { HypothekSimulationPage } from "@/components/modules/simulation/HypothekSimulationPage";

export default function SimulationHypothekPage() {
  return (
    <>
      <Header
        title="Kundengespräch Simulation"
        subtitle="Hypothek – Sarah & Marco Bianchi"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Individual" },
          { label: "Simulation: Hypothek" },
        ]}
      />
      <HypothekSimulationPage />
    </>
  );
}
