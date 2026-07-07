import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FondsRunner } from "@/components/modules/fonds/FondsRunner";

export default function DemoFondsPage() {
  return (
    <>
      <Header
        title="Fonds"
        subtitle="Anlagestrategien verstehen – Kunden optimal beraten"
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Fonds" },
        ]}
      />
      <FondsRunner />
    </>
  );
}
