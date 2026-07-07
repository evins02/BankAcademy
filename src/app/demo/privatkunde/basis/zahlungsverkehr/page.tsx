import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ZvPrivatRunner } from "@/components/modules/zahlungsverkehr-privat/ZvPrivatRunner";

export default function DemoZahlungsverkehrPage() {
  return (
    <>
      <Header
        title="Zahlungsverkehr"
        subtitle="Produkte kennen – Kunden richtig beraten"
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Zahlungsverkehr" },
        ]}
      />
      <ZvPrivatRunner />
    </>
  );
}
