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
          <p className="mt-2 text-sm text-gray-500">Stand: August 2026</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm">

          <Section title="1. Verantwortliche Stelle">
            <p>
              Verantwortlich für die Bearbeitung von Personendaten im Sinne des
              Schweizerischen Datenschutzgesetzes (DSG) ist:
            </p>
            <p className="rounded-lg bg-gray-50 p-4 font-medium text-gray-800">
              BankAcademy<br />
              E-Mail:{" "}
              <a
                href="mailto:evins@bankacademy.ch"
                className="text-blue-600 hover:underline"
              >
                evins@bankacademy.ch
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
                Lernfortschritt, Testergebnisse, Streak, XP, Badges sowie dein
                Fehlerprotokoll (Frage, deine Antwort, Musterlösung) werden bei{" "}
                <span className="font-medium text-gray-700">allen Nutzenden lokal in deinem Browser</span>{" "}
                gespeichert.
              </li>
              <li>
                Bei <span className="font-medium text-gray-700">Demo-Nutzenden</span> wird
                zusätzlich eine Kopie des Lernfortschritts und des Fehlerprotokolls auf
                unseren Servern (Neon-Datenbank) gespeichert, damit dein Fortschritt
                geräteübergreifend verfügbar bleibt. Bei regulären Access-Code-Nutzenden
                bleibt dein Fortschritt vollständig lokal auf deinem Gerät.
              </li>
              <li>
                Deine &ldquo;Top Schwächstellen&rdquo; (häufige Fehlerarten) werden
                ausschliesslich lokal in deinem Browser berechnet und nie an unsere
                Server übermittelt.
              </li>
              <li>
                Antworten auf KI-ausgewertete Aufgaben (inkl. KYC-Übungsformulare)
                werden zur Auswertung an die Anthropic API übermittelt (siehe Abschnitt 5).{" "}
                <span className="font-medium text-gray-700">
                  Bitte trage in Übungsformularen nur fiktive Übungsdaten ein, keine
                  echten persönlichen Angaben
                </span>{" "}
                — die Formulare sind für Trainingszwecke konzipiert und nicht für echte
                Kundendaten vorgesehen.
              </li>
              <li>
                Bei der Gesprächssimulation wird der von der KI generierte Dialogtext
                des simulierten Kunden zur Sprachausgabe an die OpenAI API übermittelt.
                Dabei werden keine personenbezogenen Daten von dir übertragen.
              </li>
            </ul>

            <p className="mt-3 font-medium text-gray-700">Kontaktformular:</p>
            <p>
              Wenn du uns über das Kontaktformular oder das Feedback-Formular schreibst,
              speichern wir Vorname, Nachname, E-Mail-Adresse, ggf. Institution/Bank-Name
              sowie deine Nachricht.
            </p>

            <p className="mt-3 font-medium text-gray-700">Technische Daten:</p>
            <p>
              Wir verwenden kein Analytics, keine Tracking-Cookies und keine
              Werbenetzwerke.
            </p>
          </Section>

          <Section title="3. Zweck der Datenbearbeitung">
            <ul className="ml-4 list-disc space-y-1">
              <li>Identifikation der Teilnehmenden</li>
              <li>
                Bereitstellung und Synchronisation deines Lernfortschritts (bei
                Demo-Nutzenden)
              </li>
              <li>
                Kontaktaufnahme nach dem Testlauf — nur wenn du dem ausdrücklich
                zugestimmt hast (Opt-in)
              </li>
              <li>Beantwortung von Anfragen über das Kontaktformular</li>
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
              Wir geben deine Daten nicht an Dritte weiter, ausser an die folgenden
              technischen Dienstleister, die für den Betrieb der App zwingend sind:
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
                    <td className="px-3 py-2 font-medium text-gray-800">Neon</td>
                    <td className="px-3 py-2 text-gray-600">
                      Hosting &amp; Datenbank (Registrierungsdaten, Fortschritt von
                      Demo-Nutzenden, Kontaktformular-Inhalte)
                    </td>
                    <td className="px-3 py-2 text-gray-600">EU (Frankfurt)</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-800">Anthropic</td>
                    <td className="px-3 py-2 text-gray-600">KI-Auswertung deiner Übungsantworten</td>
                    <td className="px-3 py-2 text-gray-600">USA</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-800">OpenAI</td>
                    <td className="px-3 py-2 text-gray-600">
                      Sprachausgabe für simulierte Kundendialoge (kein Personenbezug)
                    </td>
                    <td className="px-3 py-2 text-gray-600">USA</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-gray-800">Resend</td>
                    <td className="px-3 py-2 text-gray-600">
                      Weiterleitung von Kontaktformular-Inhalten per E-Mail an uns
                    </td>
                    <td className="px-3 py-2 text-gray-600">USA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Als Auftragsbearbeiter werden alle Dienstleister datenschutzkonform eingesetzt
              und dürfen deine Daten ausschliesslich in unserem Auftrag und gemäss unseren
              Anweisungen bearbeiten. Bei Übermittlungen in die USA stellen wir sicher, dass
              geeignete Garantien bestehen (z.&nbsp;B. Standardvertragsklauseln der jeweiligen
              Anbieter).
            </p>
          </Section>

          <Section title="6. Speicherdauer">
            <p>
              Registrierungsdaten werden spätestens 12 Monate nach der letzten Nutzung
              gelöscht, sofern kein berechtigtes Interesse an einer längeren Aufbewahrung
              besteht. Auf Anfrage löschen wir deine Daten jederzeit früher.
            </p>
            <p>
              Kontaktformular-Inhalte, bei denen du der Kontaktaufnahme{" "}
              <span className="font-medium text-gray-700">nicht</span> zugestimmt hast,
              werden nicht dauerhaft mit deinem Namen und deiner E-Mail-Adresse verknüpft
              gespeichert.
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
                href="mailto:evins@bankacademy.ch"
                className="text-blue-600 hover:underline"
              >
                evins@bankacademy.ch
              </a>
            </p>
          </Section>

          <Section title="8. Cookies & lokale Speicherung">
            <p>
              Die App verwendet{" "}
              <span className="font-medium text-gray-700">keine Tracking-Cookies</span>.
              Dein Lernfortschritt wird bei Access-Code-Nutzenden ausschliesslich lokal
              im Browser gespeichert — das ist eine bewusste Funktion, damit du flexibel
              bleibst und nicht an unsere Server gebunden bist. Bei Demo-Nutzenden wird
              zusätzlich eine Kopie auf unseren Servern gespeichert (siehe Abschnitt 2).
              Du kannst deine lokal gespeicherten Daten jederzeit über deinen Browser
              löschen.
            </p>
          </Section>

          <Section title="9. Änderungen">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Die jeweils
              aktuelle Version ist auf{" "}
              <span className="font-medium text-gray-700">bankacademy.ch/datenschutz</span>{" "}
              abrufbar. Bei wesentlichen Änderungen informieren wir registrierte
              Nutzerinnen und Nutzer per E-Mail.
            </p>
          </Section>

        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 BankAcademy ·{" "}
          <Link href="/" className="hover:text-gray-600">
            Startseite
          </Link>
        </p>
      </div>
    </div>
  );
}
