import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionRunner } from "@/components/modules/tragbarkeit/SectionRunner";

export default function RenditeobjektPage() {
  return (
    <>
      <Header
        title="Renditeobjekte – Objektebene"
        subtitle="Firmenkunden Tragbarkeit"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Tragbarkeit", href: "/firmenkunde/tragbarkeit" },
          { label: "Renditeobjekte" },
        ]}
      />
      <SectionRunner sectionId="renditeobjekt" />
    </>
  );
}
