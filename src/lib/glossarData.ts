export type GlossarCategory = "KYC" | "Kredit" | "Zahlungsverkehr" | "Vorsorge";

export interface GlossarTerm {
  id: string;
  name: string;
  category: GlossarCategory;
  short: string;
  detail: string;
  related: string[]; // ids of related terms
}

export const GLOSSAR_TERMS: GlossarTerm[] = [
  // ── KYC / Compliance ──────────────────────────────────────────────────────
  {
    id: "gwg",
    name: "GwG – Geldwäschereigesetz",
    category: "KYC",
    short: "Schweizer Gesetz zur Bekämpfung von Geldwäscherei und Terrorismusfinanzierung.",
    detail:
      "Verpflichtet Banken zur Identifikation von Kunden, Feststellung wirtschaftlich Berechtigter und Meldung verdächtiger Transaktionen an die MROS.",
    related: ["vsb", "mros", "wibe"],
  },
  {
    id: "vsb",
    name: "VSB – Vereinbarung über die Standesregeln",
    category: "KYC",
    short: "Selbstregulierung der Schweizer Banken zur Sorgfaltspflicht bei der Kundenidentifikation.",
    detail:
      "Regelt wann und wie Banken Kunden identifizieren müssen. Basis für Formular A und K.",
    related: ["gwg", "formular-a", "formular-k"],
  },
  {
    id: "formular-a",
    name: "Formular A",
    category: "KYC",
    short:
      "Formular zur Feststellung des wirtschaftlich Berechtigten bei Privatpersonen und Sitzgesellschaften.",
    detail:
      "Pflicht wenn Vertragspartner nicht identisch mit wirtschaftlich Berechtigtem ist.",
    related: ["formular-k", "wibe", "vsb"],
  },
  {
    id: "formular-k",
    name: "Formular K",
    category: "KYC",
    short: "Formular für Kontoeröffnungen bei juristischen Personen (Firmen).",
    detail:
      "Ersetzt Formular A bei Firmenkunden – enthält Angaben zur Firma und deren zeichnungsberechtigten Personen.",
    related: ["formular-a", "hr-auszug"],
  },
  {
    id: "wibe",
    name: "WiBe – Wirtschaftlich Berechtigter",
    category: "KYC",
    short: "Person die letztendlich von einem Konto oder Vermögen profitiert.",
    detail:
      "Muss zwingend identifiziert werden – auch wenn eine andere Person als Vertragspartner auftritt.",
    related: ["formular-a", "gwg"],
  },
  {
    id: "mros",
    name: "MROS – Meldestelle für Geldwäscherei",
    category: "KYC",
    short: "Schweizer Behörde die Verdachtsmeldungen von Banken entgegennimmt.",
    detail:
      "Bei Geldwäschereiverdacht müssen Banken zwingend an MROS melden und Vermögenswerte sperren.",
    related: ["gwg", "meldepflicht"],
  },
  {
    id: "pep",
    name: "PEP – Politisch Exponierte Person",
    category: "KYC",
    short: "Person in wichtiger öffentlicher Funktion (z.B. Politiker, Botschafter, CEO Staatsunternehmen).",
    detail:
      "Erhöhte Sorgfaltspflichten, Genehmigung der Geschäftsleitung nötig, engmaschige Überwachung.",
    related: ["gwg"],
  },
  {
    id: "meldepflicht",
    name: "Meldepflicht",
    category: "KYC",
    short: "Gesetzliche Pflicht zur Meldung von Geldwäschereiverdacht an MROS.",
    detail:
      "Ausgelöst bei begründetem Verdacht. Bank muss Konto sperren und darf Kunden nicht informieren.",
    related: ["mros", "gwg"],
  },
  {
    id: "hr-auszug",
    name: "HR-Auszug",
    category: "KYC",
    short: "Handelsregisterauszug – offizielles Dokument über eine Firma.",
    detail:
      "Belegt Firma, Sitz, Zweck und zeichnungsberechtigte Personen. Pflichtdokument bei Firmenkontoeröffnung.",
    related: ["formular-k"],
  },

  // ── Kredit ────────────────────────────────────────────────────────────────
  {
    id: "tragbarkeit",
    name: "Tragbarkeit",
    category: "Kredit",
    short: "Verhältnis der Hypothekarkosten zum Einkommen des Kreditnehmers.",
    detail:
      "Max. 33% heute, 38% im Rentenalter. Berechnung: (Zins + Amortisation + Nebenkosten) / Bruttoeinkommen × 100.",
    related: ["belehnung", "amortisation"],
  },
  {
    id: "belehnung",
    name: "Belehnung",
    category: "Kredit",
    short: "Verhältnis Hypothek zu Verkehrswert der Liegenschaft.",
    detail:
      "Max. 80% Belehnung. Über 65% = 2. Hypothek, muss innert 15 Jahren amortisiert werden.",
    related: ["tragbarkeit", "amortisation"],
  },
  {
    id: "amortisation",
    name: "Amortisation",
    category: "Kredit",
    short: "Rückzahlung der Hypothek.",
    detail:
      "Direkt = Zahlung an Bank. Indirekt = via Säule 3a (verpfändet). 2. Hypothek muss innert 15 Jahren auf 65% Belehnung reduziert werden.",
    related: ["belehnung", "saeule-3a"],
  },
  {
    id: "saron",
    name: "SARON",
    category: "Kredit",
    short: "Swiss Average Rate Overnight – variabler Referenzzinssatz für Hypotheken.",
    detail:
      "Wird täglich neu berechnet. Günstiger als Festhypothek aber kein Schutz bei Zinserhöhungen.",
    related: ["tragbarkeit", "belehnung"],
  },
  {
    id: "kreditfaehigkeit",
    name: "Kreditfähigkeit",
    category: "Kredit",
    short: "Fähigkeit einen Kredit innerhalb von 3 Jahren zurückzuzahlen.",
    detail:
      "Gegeben wenn: Total Konsumkredite / 36 ≤ Freibetrag. Basis: KKG (Konsumkreditgesetz).",
    related: ["zek", "kkgruppe"],
  },
  {
    id: "zek",
    name: "ZEK",
    category: "Kredit",
    short: "Zentralstelle für Kreditinformation – Register aller Konsumkredite in der Schweiz.",
    detail:
      "Pflichtauskunft vor jeder Kreditvergabe. Zeigt alle bestehenden Kredite, Leasings und Kreditkarten.",
    related: ["kreditfaehigkeit", "kkgruppe"],
  },
  {
    id: "etp",
    name: "ETP – Entscheid Tragbarkeit Pflichtbegründung",
    category: "Kredit",
    short: "Ausnahmefall wenn Tragbarkeit nicht gegeben ist aber Kredit trotzdem möglich sein soll.",
    detail:
      "Braucht klare Begründung, Genehmigung höhere Stelle und kürzere Wiedervorlage.",
    related: ["tragbarkeit", "deckungsgrad"],
  },
  {
    id: "deckungsgrad",
    name: "Deckungsgrad",
    category: "Kredit",
    short: "Verhältnis Cashflow zu Gesamtbelastung bei Firmenkrediten.",
    detail:
      "Min. 1.2 erforderlich. Formel: Ø Cashflow / (Nettoaufwand + 1.5% × langfristige Verbindlichkeiten).",
    related: ["etp"],
  },
  {
    id: "kkgruppe",
    name: "KKG – Konsumkreditgesetz",
    category: "Kredit",
    short: "Schweizer Gesetz das Konsumkredite regelt und Kreditnehmer schützt.",
    detail:
      "Schreibt Pflichtprüfung der Kreditfähigkeit vor. Kreditgeber haftet bei Vergabe trotz fehlender Kreditfähigkeit.",
    related: ["kreditfaehigkeit", "zek"],
  },

  // ── Zahlungsverkehr ───────────────────────────────────────────────────────
  {
    id: "iban",
    name: "IBAN",
    category: "Zahlungsverkehr",
    short: "International Bank Account Number – eindeutige Kontonummer für Überweisungen.",
    detail:
      "Schweizer IBAN = 21 Stellen (CH + 2 Prüfziffern + 17 Stellen). Bei SEPA reicht IBAN alleine.",
    related: ["bic", "sepa"],
  },
  {
    id: "bic",
    name: "BIC / SWIFT",
    category: "Zahlungsverkehr",
    short: "Bank Identifier Code – eindeutige Bankkennung für Auslandzahlungen.",
    detail:
      "Bei SEPA nicht zwingend. Bei SWIFT (ausserhalb EU/EWR) zwingend.",
    related: ["iban", "sepa"],
  },
  {
    id: "sepa",
    name: "SEPA",
    category: "Zahlungsverkehr",
    short: "Single Euro Payments Area – einheitlicher Zahlungsraum in Europa.",
    detail:
      "Gilt für EU/EWR Länder + Schweiz. Nur IBAN nötig, kein BIC. Günstigere Gebühren als SWIFT.",
    related: ["iban", "bic"],
  },
  {
    id: "ebill",
    name: "E-Bill",
    category: "Zahlungsverkehr",
    short: "Elektronische Rechnung direkt im E-Banking – bereits vorerfasst.",
    detail:
      "Rechnungssteller schickt Rechnung elektronisch. Kunde prüft und bestätigt mit einem Klick. Kein Papier mehr.",
    related: ["lsv"],
  },
  {
    id: "lsv",
    name: "LSV – Lastschriftverfahren",
    category: "Zahlungsverkehr",
    short: "Rechnungssteller zieht Betrag automatisch vom Konto ein.",
    detail:
      "Ideal bei variablen Beträgen (z.B. Krankenkasse). Widerspruchsrecht innert 30 Tagen.",
    related: ["ebill"],
  },

  // ── Vorsorge ──────────────────────────────────────────────────────────────
  {
    id: "saeule-3a",
    name: "Säule 3a",
    category: "Vorsorge",
    short: "Gebundene private Vorsorge mit Steuerabzug.",
    detail:
      "Max. CHF 7'258/Jahr (Angestellte). Steuerlich abzugsfähig. Bezug erst 5 Jahre vor Pension oder bei Sonderfällen.",
    related: ["saeule-3b", "bvg", "ahv"],
  },
  {
    id: "ahv",
    name: "AHV – Alters- und Hinterlassenenversicherung",
    category: "Vorsorge",
    short: "Staatliche 1. Säule der Schweizer Altersvorsorge.",
    detail:
      "Obligatorisch für alle. Max. Rente Skala 44: CHF 29'400/Jahr. Finanziert durch Lohnbeiträge (AN + AG je 50%).",
    related: ["bvg", "saeule-3a"],
  },
  {
    id: "bvg",
    name: "BVG – Berufliche Vorsorge",
    category: "Vorsorge",
    short: "Obligatorische 2. Säule der Schweizer Altersvorsorge.",
    detail:
      "Pensionskasse. Obligatorisch ab CHF 22'050 Jahreslohn. AG zahlt mindestens 50%.",
    related: ["ahv", "freizuegigkeit"],
  },
  {
    id: "freizuegigkeit",
    name: "Freizügigkeit",
    category: "Vorsorge",
    short: "PK-Guthaben bei Stellenwechsel oder Kündigung.",
    detail:
      "Wird auf Freizügigkeitskonto übertragen bis neue Stelle mit PK. Vorbezug nur bei Eigenheim, Selbständigkeit oder Auswanderung.",
    related: ["bvg", "saeule-3a"],
  },
  {
    id: "verrechnungssteuer",
    name: "Verrechnungssteuer",
    category: "Vorsorge",
    short: "35% Steuer auf Zinserträge – wird direkt von Bank abgezogen.",
    detail:
      "Rückforderbar über Steuererklärung bei korrekter Deklaration. Schutz gegen Steuerhinterziehung.",
    related: [],
  },
  {
    id: "saeule-3b",
    name: "Säule 3b",
    category: "Vorsorge",
    short: "Freie private Vorsorge ohne steuerliche Bindung.",
    detail:
      "Kein Steuerabzug, aber flexible Einzahlung und Bezug jederzeit möglich. Z.B. Sparkonto, Lebensversicherung.",
    related: ["saeule-3a", "bvg"],
  },
];

export const CATEGORY_COLORS: Record<
  GlossarCategory,
  { bg: string; text: string; border: string }
> = {
  KYC: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  Kredit: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  Zahlungsverkehr: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  Vorsorge: {
    bg: "bg-teal-100",
    text: "text-teal-700",
    border: "border-teal-200",
  },
};
