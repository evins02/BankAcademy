import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModuleOverview } from "@/components/modules/ModuleOverviewPage";

export default function FirmenkundePage() {
  return (
    <>
      <Header title="Firmenkunde" subtitle="Firmenkonten, Tragbarkeit und Kreditengagements" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
        ]}
      />
      <ModuleOverview configId="firmenkunde" />
    </>
  );
}
