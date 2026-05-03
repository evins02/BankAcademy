import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { VorsorgeRunner } from "@/components/modules/vorsorge/VorsorgeRunner";

export default function VorsorgePage() {
  return (
    <>
      <Header
        title="3a / Vorsorge"
        subtitle="Die 3 Säulen kennen – Kunden optimal beraten"
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
