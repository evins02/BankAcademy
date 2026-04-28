import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TragbarkeitOverview } from "@/components/modules/tragbarkeit/TragbarkeitOverview";

export default function TragbarkeitPage() {
  return (
    <>
      <Header title="Firmenkunden Tragbarkeit" subtitle="Credit Office – Kreditanalyse" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Tragbarkeit" },
        ]}
      />
      <TragbarkeitOverview />
    </>
  );
}
