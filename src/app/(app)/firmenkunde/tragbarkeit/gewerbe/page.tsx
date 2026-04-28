import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionRunner } from "@/components/modules/tragbarkeit/SectionRunner";

export default function GewerbePage() {
  return (
    <>
      <Header
        title="Selbstgenutzte Gewerbeliegenschaft"
        subtitle="Firmenkunden Tragbarkeit"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Tragbarkeit", href: "/firmenkunde/tragbarkeit" },
          { label: "Selbstgenutzte Gewerbeliegenschaft" },
        ]}
      />
      <SectionRunner sectionId="gewerbe" />
    </>
  );
}
