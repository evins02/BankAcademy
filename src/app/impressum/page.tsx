import Link from "next/link";

export const metadata = {
  title: "Impressum – BankAcademy",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-base font-bold text-gray-900">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-gray-600">{children}</div>
    </section>
  );
}

export default function ImpressumPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Impressum</h1>
          <p className="mt-2 text-sm text-gray-500">Angaben gemäss Art. 3 UWG</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm">

          <Section title="Betreiberin">
            <p className="font-medium text-gray-800">BankAcademy</p>
            <p>Schweiz</p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:evinsariaratnam@gmail.com"
                className="text-blue-600 hover:underline"
              >
                evinsariaratnam@gmail.com
              </a>
            </p>
          </Section>

          <Section title="Zweck der Plattform">
            <p>
              BankAcademy ist eine digitale Lernplattform für Banklehrlinge im Schweizer Bankwesen.
              Die Plattform stellt praxisnahe Szenarien und Lernmaterialien bereit und erhebt keinen
              Anspruch auf Vollständigkeit oder rechtliche Verbindlichkeit der dargestellten Inhalte.
            </p>
          </Section>

          <Section title="Haftungsausschluss">
            <p>
              Die Inhalte dieser Plattform dienen ausschliesslich zu Bildungszwecken. Trotz
              sorgfältiger inhaltlicher Kontrolle übernimmt BankAcademy keine Haftung für die
              Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen.
              Die Nutzung der Inhalte erfolgt auf eigene Verantwortung.
            </p>
          </Section>

          <Section title="Urheberrecht">
            <p>
              Die auf dieser Plattform veröffentlichten Inhalte und Werke unterliegen dem
              Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung oder jede
              Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedarf der schriftlichen
              Zustimmung von BankAcademy.
            </p>
          </Section>

          <Section title="Datenschutz">
            <p>
              Informationen zur Bearbeitung deiner Personendaten findest du in unserer{" "}
              <Link href="/datenschutz" className="text-blue-600 hover:underline">
                Datenschutzerklärung
              </Link>
              .
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
