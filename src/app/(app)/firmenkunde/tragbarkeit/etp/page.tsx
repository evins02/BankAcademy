import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionRunner } from "@/components/modules/tragbarkeit/SectionRunner";

export default function EtpPage() {
  return (
    <>
      <Header
        title="Belastungsgrenze & ETP"
        subtitle="Firmenkunden Tragbarkeit"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Tragbarkeit", href: "/firmenkunde/tragbarkeit" },
          { label: "Belastungsgrenze & ETP" },
        ]}
      />
      <SectionRunner sectionId="etp" />
    </>
  );
}
