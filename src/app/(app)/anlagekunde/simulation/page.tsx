import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnlageSimulationPage } from "@/components/modules/anlage-simulation/AnlageSimulationPage";

export default function AnlageSimulationRoute() {
  return (
    <>
      <Header title="Simulation: Anlageberatung" subtitle="Anlagekunde – Vollständiges Beratungsgespräch mit Andreas Keller" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde" },
          { label: "Simulation: Anlageberatung" },
        ]}
      />
      <AnlageSimulationPage />
    </>
  );
}
