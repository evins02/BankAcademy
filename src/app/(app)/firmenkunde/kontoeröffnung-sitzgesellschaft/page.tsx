import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioRunner } from "@/components/modules/kontoeröffnungen/ScenarioRunner";
import { KONTO_SCENARIOS } from "@/lib/kontoeröffnungen";

const scenario = KONTO_SCENARIOS.find((s) => s.id === "sitzgesellschaft")!;

export default function KontoeröffnungSitzgesellschaftPage() {
  return (
    <>
      <Header title={scenario.title} subtitle={scenario.customerType} />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Kontoeröffnung Sitzgesellschaft" },
        ]}
      />
      <ScenarioRunner scenario={scenario} />
    </>
  );
}
