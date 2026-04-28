import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BlankokreditRunner } from "@/components/modules/blankokredit/BlankokreditRunner";

export default function BlankokreditPage() {
  return (
    <>
      <Header
        title="Blankokredit – Kreditfähigkeitsprüfung"
        subtitle="Privatkunde – Individual"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Individual" },
          { label: "Blankokredit" },
        ]}
      />
      <BlankokreditRunner />
    </>
  );
}
