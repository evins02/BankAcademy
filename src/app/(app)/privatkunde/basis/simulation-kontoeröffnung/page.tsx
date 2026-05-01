import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AiSimulationPage } from "@/components/modules/simulation/AiSimulationPage";

export default function SimulationKontoeröffnungPage() {
  return (
    <>
      <Header
        title="Kundengespräch Simulation"
        subtitle="Kontoeröffnung – Thomas Kowalski"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Simulation: Kontoeröffnung" },
        ]}
      />
      <AiSimulationPage />
    </>
  );
}
