import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MahnwesenRunner } from "@/components/modules/mahnwesen/MahnwesenRunner";

export default function MahnwesenPage() {
  return (
    <>
      <Header title="Mahnwesen" subtitle="Back Office – Bankbetrieb" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
          { label: "Bankbetrieb" },
          { label: "Mahnwesen" },
        ]}
      />
      <MahnwesenRunner />
    </>
  );
}
