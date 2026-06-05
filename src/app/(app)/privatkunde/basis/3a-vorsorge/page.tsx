import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { VorsorgeRunner } from "@/components/modules/vorsorge/VorsorgeRunner";

export default function VorsorgePage3a() {
  return (
    <>
      <Header
        title="3a / Vorsorge"
        subtitle="Säule 3a und Vorsorgeberatung"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "3a / Vorsorge" },
        ]}
      />
      <VorsorgeRunner />
    </>
  );
}
