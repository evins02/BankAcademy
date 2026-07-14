import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_SCENARIOS } from "@/lib/constants";

const scenarios = SAMPLE_SCENARIOS.filter((s) => s.module === "kreditgeschaefte");

export default function KreditgeschaeftePage() {
  return (
    <>
      <Header
        title="Kreditgeschäfte"
        subtitle="Kreditvergabe, Hypotheken und Risikobeurteilung aus drei Perspektiven."
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kreditgeschäfte" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Dokument prüfen — interactive exercise */}
        <div className="mb-6">
          <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Dokument prüfen
          </h2>
          <Link
            href="/kreditgeschaefte/dokument-pruefen"
            className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            style={{ borderLeftWidth: 4, borderLeftColor: "#1ddba0" }}
          >
            <span className="shrink-0 text-2xl">📋</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">Hypothekarantrag prüfen</p>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#d1faf0", color: "#0a8a64" }}>
                  Neu
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">
                Familie Müller – 3 versteckte Fehler im Dossier aufspüren
              </p>
            </div>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {["Alle", "Relationship Manager", "Kreditstelle", "Kreditabwicklung"].map(
            (role) => (
              <Badge
                key={role}
                variant={role === "Alle" ? "dark" : "neutral"}
                className="cursor-pointer text-sm px-3 py-1"
              >
                {role}
              </Badge>
            )
          )}
        </div>

        {scenarios.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
