import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModuleOverview } from "@/components/modules/ModuleOverviewPage";

export default function PrivatkundePage() {
  return (
    <>
      <Header title="Privatkunde" subtitle="Basis- und Individualprodukte aus Beratersicht" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
        ]}
      />
      <ModuleOverview configId="privatkunde" />
    </>
  );
}
