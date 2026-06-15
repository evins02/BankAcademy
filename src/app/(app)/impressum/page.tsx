import { Header } from "@/components/layout/Header";

export default function ImpressumPage() {
  return (
    <>
      <Header title="Impressum" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-8">

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Angaben gemäss Art. 3 UWG
            </h2>
            <div className="space-y-1 text-sm text-text-primary">
              <p className="font-semibold text-base">BankAcademy</p>
              <p>Schweiz 🇨🇭</p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Kontakt
            </h2>
            <div className="space-y-2 text-sm text-text-primary">
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:evinsariaratnam@gmail.com"
                  className="text-primary underline hover:no-underline"
                >
                  evinsariaratnam@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Zweck der Plattform
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              BankAcademy ist eine digitale Lernplattform für Banklehrlinge im Schweizer Bankwesen.
              Die Plattform stellt praxisnahe Szenarien und Lernmaterialien bereit und erhebt keinen
              Anspruch auf Vollständigkeit oder rechtliche Verbindlichkeit der dargestellten Inhalte.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Haftungsausschluss
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Die Inhalte dieser Plattform dienen ausschliesslich zu Bildungszwecken. Trotz
              sorgfältiger inhaltlicher Kontrolle übernimmt BankAcademy keine Haftung für die
              Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen.
              Die Nutzung der Inhalte erfolgt auf eigene Verantwortung.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">
              Urheberrecht
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Die auf dieser Plattform veröffentlichten Inhalte und Werke unterliegen dem
              Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung oder jede
              Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedarf der schriftlichen
              Zustimmung von BankAcademy.
            </p>
          </section>

          <p className="text-center text-xs text-text-secondary">
            © 2026 BankAcademy · Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </>
  );
}
