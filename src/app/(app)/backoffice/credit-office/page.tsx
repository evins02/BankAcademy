import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home, CreditCard, Building2, RefreshCw, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MODULES = [
  {
    href: "/backoffice/credit-office/hypothek",
    badge: "Level 3",
    badgeVariant: "red" as const,
    icon: Home,
    title: "Privathypothek prüfen",
    desc: "Familie Rossi – Hypothekarantrag mit kritischen K.O.-Kriterien. Belehnung, Eigenmittel, Tragbarkeit und Rentenalter prüfen.",
    time: "10 Min",
    xp: "+200 XP",
  },
  {
    href: "/backoffice/credit-office/blankokredit",
    badge: "Level 2",
    badgeVariant: "orange" as const,
    icon: CreditCard,
    title: "Blankokredit prüfen",
    desc: "Kevin Meier – Konsumkredit CHF 25'000. Kreditfähigkeit gemäss KKG prüfen und Laufzeit beurteilen.",
    time: "7 Min",
    xp: "+150 XP",
  },
  {
    href: "/backoffice/credit-office/firmenkredit",
    badge: "Level 3",
    badgeVariant: "red" as const,
    icon: Building2,
    title: "Firmenkredit prüfen",
    desc: "Müller Bau GmbH – Betriebsmittelkredit CHF 350'000. Deckungsgrad, EK-Quote und qualitative Risiken beurteilen.",
    time: "10 Min",
    xp: "+200 XP",
  },
  {
    href: "/backoffice/credit-office/neubewilligung",
    badge: "Level 2",
    badgeVariant: "orange" as const,
    icon: RefreshCw,
    title: "Periodische Neubewilligung",
    desc: "Hans Schneider – Bestehende Hypothek periodisch überprüfen. Veränderte Situation, gesunkener Liegenschaftswert.",
    time: "7 Min",
    xp: "+150 XP",
  },
];

export default function CreditOfficeHubPage() {
  return (
    <>
      <Header
        title="Credit Office"
        subtitle="Kreditanträge und Dossiers prüfen – als Credit-Office-Analyst"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
          { label: "Credit Office" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-sm text-text-secondary">
            Du spielst die Rolle des Credit Office Analysten. Dossiers kommen vom Kundenberater –
            du analysierst, erkennst Risiken und fällst den Entscheid.
          </p>

          <div className="overflow-hidden rounded-xl border bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: "#e5e7eb" }}>
            <div className="flex items-center gap-4 p-4 opacity-60">
              <span className="shrink-0 text-2xl">📋</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">Dokument prüfen</p>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    Bald verfügbar
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  Fehler in Bankdokumenten finden und analysieren
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.href} className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card">
                  <div className="flex items-start justify-between">
                    <Badge variant={m.badgeVariant}>{m.badge}</Badge>
                    <Icon size={18} className="text-text-secondary shrink-0" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-text-primary mb-2">{m.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1"><Clock size={10} /> {m.time}</span>
                      <span className="text-text-secondary/40">·</span>
                      <span className="flex items-center gap-1"><Star size={10} /> {m.xp}</span>
                    </div>
                  </div>
                  <Link
                    href={m.href}
                    className="w-full rounded-DEFAULT py-2 px-4 text-sm font-semibold text-center transition-colors"
                    style={{ background: "var(--primary, #0D1B4B)", color: "#fff" }}
                  >
                    Starten
                  </Link>
                </div>
              );
            })}
          </div>

          <div
            className="rounded-DEFAULT p-4 text-sm text-text-secondary"
            style={{ background: "rgba(13,27,75,0.04)", border: "1px solid rgba(13,27,75,0.08)" }}
          >
            <p className="font-semibold text-text-primary mb-1">Credit Office – Rolle und Aufgaben</p>
            <p>
              Der Credit Officer prüft Kreditanträge unabhängig vom Kundenberater. Er beurteilt
              Bonität, Tragbarkeit, Sicherheiten und Branchenrisiken. Entscheide:{" "}
              <span className="font-semibold text-text-primary">Bewilligen</span> →{" "}
              <span className="font-semibold text-text-primary">Bewilligen mit Auflagen</span> →{" "}
              <span className="font-semibold text-text-primary">Rückfrage</span> →{" "}
              <span className="font-semibold text-text-primary">Ablehnen</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
