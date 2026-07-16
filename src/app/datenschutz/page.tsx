import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung – BankAcademy",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-base font-bold text-gray-900">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-gray-600">{children}</div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-block text-xs text-gray-400 hover:text-gray-600"
          >
            ← Zurück
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Datenschutzerklärung</h1>
          <p className="mt-2 text-sm text-gray-500">Stand: Juli 2025</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm">

          <Section title="1. Verantwortliche Stelle">
            <p>
              Verantwortlich für die Bearbeitung deiner Personendaten im Sinne des
              Schweizer Datenschutzgesetzes (DSG) ist:
            </p>
            <p className="rounded-lg bg-gray-50 p-4 font-medium text-gray-800">
              BankAcademy<br />
              E-Mail:{" "}
              <a
                href="mailto:datenschutz@bankacademy.ch"
                className="text-blue-600 hover:underline"
              >
                datenschutz@bankacademy.ch
              </a>
            </p>
          </Section>

          <Section title="2. Welche Daten wir erfassen">
            <p className="font-medium text-gray-700">Bei der Registrierung:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Vorname und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Opt-in für Kontaktaufnahme (freiwillig, Ja/Nein)</li>
              <li>Zeitstempel der Registrierung</li>
            </ul>
            <p className="mt-3 font-medium text-gray-700">Bei der App-Nutzung:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                Lernfortschritt, Testergebnisse und Einstellungen — diese werden
                ausschliesslich lokal in deinem Browser gespeichert (localStorage)
                und nicht an unsere Server übertragen
              </li>
              <li>
                Antworten auf KI-ausgewertete Aufgaben werden zur Auswertung an
                die Anthropic API übermittelt (siehe Abschnitt 5)
              </li>
            </ul>
            <p className="mt-3 font-medium text-gray-700">Technische Daten:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                Wir verwenden kein Analytics, keine Tracking-Cookies und keine
                Werbenetzwerke
              </li>
            </ul>
          </Section>

          <Section title="3. Zweck der Datenbearbeitung">
            <ul className="ml-4 list-disc space-y-1">
              <li>Identifikation der Teilnehmenden</li>
              <li>
                Kontaktaufnahme nach dem Testlauf — nur wenn du dem ausdrücklich
                zugestimmt hast (Opt-in)
              </li>
              <li>Verbesserung des Lernangebots</li>
            </ul>
          </Section>

          <Section title="4. Rechtsgrundlage">
            <p>
              Die Bearbeitung erfolgt auf Basis deiner Einwilligung (Art. 6 DSG)
              sowie zur Erfüllung des Nutzungsvertrags. Der Opt-in zur
              Kontaktaufnahme ist freiwillig und kann jederzeit widerrufen werden.
            </p>
          </Section>

          <Section title="5. Dienstleister & Datenweitergabe">
            <p>
              Wir geben deine Daten nicht an Dritte weiter, ausser an die
              folgenden technischen Dienstleister, die für den Betrieb der App
              notwendig sind:
            </p>
            <div className="mt-2 overflow-hidden rounded-lg border border-gray-100">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Dienstleister</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Zweck</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Standort</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-800">Vercel / Neon</td>
                    <td className="px-3 py-2 text-gray-600">Hosting & Datenbank</td>
                    <td className="px-3 py-2 text-gray-600">EU (Frankfurt)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-gray-800">Anthropic</td>
                    <td className="px-3 py-2 text-gray-600">KI-Auswertung von Aufgaben</td>
                    <td className="px-3 py-2 text-gray-600">USA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Bei Anthropic werden nur deine Aufgaben-Antworten übermittelt —
              keine Registrierungsdaten. Anthropic verarbeitet diese gemäss ihrer
              eigenen Datenschutzrichtlinie.
            </p>
          </Section>

          <Section title="6. Speicherdauer">
            <p>
              Registrierungsdaten werden spätestens 12 Monate nach der letzten
              Nutzung gelöscht, sofern kein berechtigtes Interesse an einer
              längeren Aufbewahrung besteht. Auf Anfrage löschen wir deine Daten
              jederzeit früher.
            </p>
          </Section>

          <Section title="7. Deine Rechte">
            <p>Du hast jederzeit das Recht auf:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li><span className="font-medium text-gray-700">Auskunft</span> — welche Daten wir über dich gespeichert haben</li>
              <li><span className="font-medium text-gray-700">Berichtigung</span> — falsche Daten korrigieren lassen</li>
              <li><span className="font-medium text-gray-700">Löschung</span> — Löschung deiner Daten verlangen</li>
              <li><span className="font-medium text-gray-700">Widerruf</span> — erteilte Einwilligungen jederzeit widerrufen</li>
            </ul>
            <p className="mt-2">
              Für alle Anfragen:{" "}
              <a
                href="mailto:datenschutz@bankacademy.ch"
                className="text-blue-600 hover:underline"
              >
                datenschutz@bankacademy.ch
              </a>
            </p>
          </Section>

          <Section title="8. Cookies & lokale Speicherung">
            <p>
              Die App verwendet <span className="font-medium text-gray-700">keine Tracking-Cookies</span>.
              Dein Lernfortschritt wird im localStorage deines Browsers gespeichert
              — das ist eine lokale Funktion deines Geräts und wird nicht an
              unsere Server übertragen. Du kannst diese Daten jederzeit über die
              Einstellungen deines Browsers löschen.
            </p>
          </Section>

          <Section title="9. Änderungen">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Die
              jeweils aktuelle Version ist unter{" "}
              <span className="font-medium text-gray-700">bankacademy.ch/datenschutz</span>{" "}
              abrufbar. Bei wesentlichen Änderungen informieren wir registrierte
              Nutzerinnen und Nutzer per E-Mail.
            </p>
          </Section>

        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2025 BankAcademy ·{" "}
          <Link href="/" className="hover:text-gray-600">
            Startseite
          </Link>
        </p>
      </div>
    </div>
  );
}
