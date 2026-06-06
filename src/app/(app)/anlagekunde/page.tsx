import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModuleOverview } from "@/components/modules/ModuleOverviewPage";

export default function AnlagekundePage() {
  return (
    <>
      <Header title="Anlagekunde" subtitle="Anlageberatung und Kundenprofil" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde" },
        ]}
      />
      <ModuleOverview configId="anlagekunde" />
    </>
  );
}
