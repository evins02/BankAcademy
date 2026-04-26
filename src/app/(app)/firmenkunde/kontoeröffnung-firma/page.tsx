import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";

export default function KontoeröffnungFirmaPage() {
  return (
    <>
      <Header title="Kontoeröffnung Firma" subtitle="Firmenkunde" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Kontoeröffnung Firma" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <EmptyState
          title="Inhalt folgt in Kürze"
          subtitle="Dieses Modul wird gerade aufgebaut"
        />
      </div>
    </>
  );
}
