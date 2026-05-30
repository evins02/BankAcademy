import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ModuleOverview } from "@/components/modules/ModuleOverviewPage";

export default function BackofficePage() {
  return (
    <>
      <Header title="Back Office" subtitle="Kontoeröffnungen, Zahlungsverkehr, KYC und Mahnwesen" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
        ]}
      />
      <ModuleOverview configId="backoffice" />
    </>
  );
}
