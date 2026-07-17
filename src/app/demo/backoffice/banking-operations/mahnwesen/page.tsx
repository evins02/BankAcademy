import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MahnwesenRunner } from "@/components/modules/mahnwesen/MahnwesenRunner";

export default function DemoMahnwesenPage() {
  return (
    <>
      <Header title="Mahnwesen" subtitle="Back Office – Banking Operations" />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: "Back Office" },
          { label: "Banking Operations" },
          { label: "Mahnwesen" },
        ]}
      />
      <MahnwesenRunner />
    </>
  );
}
