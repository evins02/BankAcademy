import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";

export default function BlankokreditPage() {
  return (
    <>
      <Header title="Blankokredit" subtitle="Privatkunde – Individual" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Individual" },
          { label: "Blankokredit" },
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
