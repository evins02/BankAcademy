import { Header } from "@/components/layout/Header";
import { Mail, MessageSquare, Target, Lightbulb, Flag, TrendingUp } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Praxisnähe",
    text: "Jedes Szenario basiert auf echten Situationen aus dem Schweizer Bankberatungsalltag – keine Lehrbuchtheorie, sondern was wirklich passiert.",
  },
  {
    icon: Lightbulb,
    title: "Rechtliche Korrektheit",
    text: "Alle Inhalte sind auf geltende Schweizer Rechtsgrundlagen abgestimmt: FIDLEG, GwG, OR, KKG, BVG, VSB und weitere.",
  },
  {
    icon: Flag,
    title: "Made in Switzerland",
    text: "Entwickelt für den Schweizer Markt mit seinen einzigartigen Anforderungen – mehrsprachig, reguliert und präzise.",
  },
  {
    icon: TrendingUp,
    title: "Kontinuierliche Weiterentwicklung",
    text: "BankAcademy wächst mit dem Feedback der Community. Neue Szenarien, Module und Features werden laufend hinzugefügt.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <Header title="Über uns" subtitle="Die Geschichte hinter BankAcademy" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-8">

          {/* Origin story */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Wie alles begann
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
              <p>
                BankAcademy entstand aus einer einfachen Beobachtung während der Banklehre bei der
                Raiffeisen: Die Lücke zwischen Lehrmittel und Praxis ist riesig.
              </p>
              <p>
                Klassische Lernmaterialien zeigen dir, wie ein SEPA-Auftrag theoretisch funktioniert.
                Sie bereiten dich aber nicht darauf vor, was passiert, wenn eine Kundin aus dem
                Kosovo jeden Monat 2&apos;000 Franken ins Ausland überweist und du als Berater
                entscheiden musst, ob du eine Verdachtsmeldung an die MROS erstattst.
              </p>
              <p>
                Aus diesem Wunsch nach realistischen, rechtskonformen Praxisszenarien ist
                BankAcademy entstanden – entwickelt von einem Banklehrling, für alle die im
                Schweizer Bankwesen arbeiten oder einsteigen möchten.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="rounded-2xl border border-primary/20 bg-primary-light p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
              Unsere Mission
            </h2>
            <p className="text-base font-semibold leading-relaxed text-text-primary">
              Den Weg von der Theorie zur Praxis im Schweizer Banking kürzer und effektiver machen –
              mit realistischen Szenarien, klaren Rechtsgrundlagen und echtem Bankerwissen.
            </p>
          </section>

          {/* Values */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Unsere Werte
            </h2>
            <div className="space-y-5">
              {VALUES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* For Compendio/SBVg */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Für Bildungspartner
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">
              BankAcademy ist als Ergänzung zu bestehenden Lehrplänen konzipiert und orientiert sich
              an den Ausbildungszielen des Schweizerischen Bankenverbands (SBVg) sowie an den
              Lehrmitteln von Compendio. Die Szenarien sind auf das LAP-Niveau abgestimmt und
              decken alle relevanten Kompetenzbereiche ab.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "GwG-konform",
                "FIDLEG-konform",
                "LAP-Niveau",
                "VSB 20",
                "OR-Grundlagen",
                "BVG/Vorsorge",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Kontakt
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Mail size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">E-Mail</p>
                  <a
                    href="mailto:evinsariaratnam@gmail.com"
                    className="text-sm font-medium text-primary underline hover:no-underline"
                  >
                    evinsariaratnam@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <MessageSquare size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Zusammenarbeit & Feedback</p>
                  <p className="text-sm text-text-primary">
                    Wir freuen uns über Rückmeldungen von Ausbildner/innen, Berufsschulen
                    und Bildungsanbieter/innen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <p className="text-center text-xs text-text-secondary">
            © 2026 BankAcademy · Entwickelt in der Schweiz
          </p>
        </div>
      </div>
    </>
  );
}
