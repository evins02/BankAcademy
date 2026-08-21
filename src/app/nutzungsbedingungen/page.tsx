import Link from "next/link";

export const metadata = {
  title: "Nutzungsbedingungen – BankAcademy",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-base font-bold text-gray-900">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-gray-600">{children}</div>
    </section>
  );
}

export default function NutzungsbedingungenPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-10">
          <Link href="/" className="mb-6 inline-block text-xs text-gray-400 hover:text-gray-600">
            ← Zurück
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Nutzungsbedingungen</h1>
          <p className="mt-2 text-sm text-gray-500">Stand: August 2026</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm">

          <Section title="1. Geltungsbereich">
            <p>
              Diese Nutzungsbedingungen gelten für die Nutzung der digitalen Lernplattform
              BankAcademy (nachfolgend «Plattform»), betrieben von BankAcademy, Schweiz
              (nachfolgend «wir» oder «BankAcademy»).
            </p>
            <p>
              Mit der Erstellung eines Benutzerkontos oder der Nutzung der Plattform (auch
              im Demo-Modus) akzeptierst du diese Nutzungsbedingungen sowie unsere{" "}
              <Link href="/datenschutz" className="text-blue-600 hover:underline">
                Datenschutzerklärung
              </Link>.
            </p>
          </Section>

          <Section title="2. Leistungsbeschreibung">
            <p>
              BankAcademy ist eine digitale Lernplattform für Lernende und Quereinsteiger im
              Schweizer Bankwesen. Sie bietet:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Praxisnahe Lernszenarien und Fallbeispiele</li>
              <li>KI-gestützte Auswertung von Freitextantworten</li>
              <li>Gesprächssimulationen mit simulierten Kundenrollen</li>
              <li>Fortschrittsverfolgung, XP-System und Badges</li>
              <li>Glossar und Lernmaterialien</li>
            </ul>
            <p>
              Die Plattform richtet sich ausschliesslich zu Lern- und Übungszwecken. Alle
              dargestellten Szenarien, Kundendaten und Situationen sind fiktiv.
            </p>
          </Section>

          <Section title="3. Konto und Zugang">
            <p>
              Für den vollen Zugang zur Plattform ist die Erstellung eines Benutzerkontos
              über unseren Authentifizierungsanbieter Clerk erforderlich. Du bist
              verpflichtet:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Wahrheitsgemässe und vollständige Angaben zu machen</li>
              <li>Deine Zugangsdaten vertraulich zu behandeln</li>
              <li>Uns unverzüglich zu informieren, falls du einen unbefugten Zugriff auf dein Konto vermutest</li>
            </ul>
            <p>
              Ein Konto ist personengebunden und darf nicht an Dritte weitergegeben werden.
              BankAcademy behält sich vor, Konten bei Verstoss gegen diese Bedingungen zu
              sperren oder zu löschen.
            </p>
          </Section>

          <Section title="4. Nutzungsrechte">
            <p>
              BankAcademy gewährt dir ein nicht übertragbares, nicht ausschliessendes Recht
              zur persönlichen Nutzung der Plattform zu Lernzwecken.
            </p>
            <p>Folgendes ist ausdrücklich untersagt:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Kommerzielle Nutzung oder Weiterverkauf der Inhalte</li>
              <li>Vervielfältigung, Verbreitung oder öffentliche Zugänglichmachung ohne schriftliche Genehmigung</li>
              <li>Automatisierter Abruf von Inhalten (Scraping, Bots)</li>
              <li>Nutzung der Plattform in einer Weise, die andere Nutzende oder den Betrieb beeinträchtigt</li>
            </ul>
          </Section>

          <Section title="5. KI-generierte Inhalte">
            <p>
              Teile der Auswertungen, Rückmeldungen und Gesprächssimulationen werden durch
              künstliche Intelligenz (Anthropic Claude, OpenAI) generiert. BankAcademy
              übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder rechtliche
              Verbindlichkeit dieser Inhalte.
            </p>
            <p>
              KI-Auswertungen dienen als Lernhilfe und ersetzen keine offizielle
              Ausbildung, keine rechtliche Beratung und keine bankinternen Weisungen.
              Lernende sind ausdrücklich angehalten, alle Inhalte kritisch zu hinterfragen
              und mit offiziellen Quellen (VSB 20, GwG, FINMA-Rundschreiben) zu vergleichen.
            </p>
            <p className="font-medium text-gray-700">
              Wichtig: Trage in Übungsformularen ausschliesslich fiktive Daten ein — keine
              echten Kundendaten, Kontonummern oder persönliche Angaben Dritter.
            </p>
          </Section>

          <Section title="6. Verfügbarkeit">
            <p>
              BankAcademy strebt eine möglichst hohe Verfügbarkeit der Plattform an, kann
              jedoch keine ununterbrochene Erreichbarkeit garantieren. Wartungsarbeiten,
              technische Störungen oder Drittanbieter-Ausfälle (Hosting, KI-APIs) können
              vorübergehend zu Einschränkungen führen.
            </p>
            <p>
              Ein Anspruch auf dauerhaften Zugang besteht nicht. BankAcademy kann den
              Betrieb der Plattform jederzeit einstellen oder einschränken.
            </p>
          </Section>

          <Section title="7. Haftungsausschluss">
            <p>
              BankAcademy haftet nicht für:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Schäden, die aus der Anwendung der Lerninhalte in der beruflichen Praxis entstehen</li>
              <li>Fehler oder Unvollständigkeiten in KI-generierten Auswertungen</li>
              <li>Datenverluste, die durch Drittanbieter oder technische Störungen entstehen</li>
              <li>Inhalte auf verlinkten externen Webseiten</li>
            </ul>
            <p>
              Die Haftung für Vorsatz und grobe Fahrlässigkeit bleibt vorbehalten.
            </p>
          </Section>

          <Section title="8. Kündigung und Datenlöschung">
            <p>
              Du kannst dein Konto jederzeit durch eine formlose E-Mail an{" "}
              <a href="mailto:evins@bankacademy.ch" className="text-blue-600 hover:underline">
                evins@bankacademy.ch
              </a>{" "}
              löschen lassen. Nach Löschung werden deine Daten gemäss unserer{" "}
              <Link href="/datenschutz" className="text-blue-600 hover:underline">
                Datenschutzerklärung
              </Link>{" "}
              entfernt.
            </p>
          </Section>

          <Section title="9. Änderungen der Nutzungsbedingungen">
            <p>
              BankAcademy behält sich vor, diese Nutzungsbedingungen jederzeit anzupassen.
              Bei wesentlichen Änderungen werden registrierte Nutzende per E-Mail informiert.
              Die fortgesetzte Nutzung der Plattform nach Inkrafttreten der Änderungen gilt
              als Zustimmung.
            </p>
          </Section>

          <Section title="10. Anwendbares Recht und Gerichtsstand">
            <p>
              Diese Nutzungsbedingungen unterliegen Schweizer Recht. Ausschliesslicher
              Gerichtsstand für Streitigkeiten ist die Schweiz.
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
