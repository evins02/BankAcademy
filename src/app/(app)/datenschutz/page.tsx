import { Header } from "@/components/layout/Header";

export default function DatenschutzPage() {
  return (
    <>
      <Header title="Datenschutz" subtitle="Datenschutzerklärung gemäss DSG" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              1. Verantwortliche Stelle
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Verantwortlich für die Datenbearbeitung im Sinne des Schweizer Datenschutzgesetzes
              (DSG) ist BankAcademy. Kontakt:{" "}
              <a href="mailto:evinsariaratnam@gmail.com" className="text-primary underline">
                evinsariaratnam@gmail.com
              </a>
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              2. Erhobene Daten
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              BankAcademy speichert ausschliesslich Daten lokal in deinem Browser (localStorage).
              Es werden keine Daten auf externe Server übertragen oder gespeichert.
            </p>
            <p className="text-sm font-medium text-text-primary mb-2">Lokal gespeicherte Daten:</p>
            <ul className="space-y-1 text-sm text-text-secondary">
              {[
                "Lernfortschritt (abgeschlossene Szenarien, Genauigkeit)",
                "Benutzerprofil (freiwillig angegebener Name und Rolle)",
                "Streak-Daten (Lernstreak-Zählung)",
                "Notizen zu Szenarien",
                "Lesezeichen",
                "Szenario-Bewertungen",
                "Einstellungen (Sprache, Theme)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-primary">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              3. Zweck der Datenverarbeitung
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Die lokal gespeicherten Daten dienen ausschliesslich der Personalisierung deines
              Lernerlebnisses. Sie ermöglichen es, deinen Fortschritt zu verfolgen, personalisierte
              Statistiken anzuzeigen und dein Lernerlebnis zu optimieren.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              4. Datenweitergabe
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Es findet keine Weitergabe von Daten an Dritte statt. Alle Daten verbleiben
              ausschliesslich in deinem Browser und werden nicht an externe Server oder
              Dienste übertragen.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              5. Daten löschen
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Du kannst alle gespeicherten Daten jederzeit über die Einstellungen löschen
              oder deinen Browser-Cache leeren. Dadurch werden alle lokal gespeicherten
              Lerndaten unwiderruflich entfernt.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              6. Keine Cookies
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              BankAcademy verwendet keine Tracking-Cookies, keine Analyse-Tools (z.B. Google
              Analytics) und keine Drittanbieter-Werbung. Die Plattform ist frei von
              kommerziellen Tracking-Mechanismen.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-secondary">
              7. Kontakt
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              Bei Fragen zum Datenschutz wende dich an:{" "}
              <a href="mailto:evinsariaratnam@gmail.com" className="text-primary underline">
                evinsariaratnam@gmail.com
              </a>
            </p>
          </section>

          <p className="text-center text-xs text-text-secondary">
            Stand: Juni 2026 · BankAcademy
          </p>
        </div>
      </div>
    </>
  );
}
