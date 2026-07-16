import type { DocumentConfig } from "./types";

export const auslandsueberweisungSchmid: DocumentConfig = {
  id: "auslandsueberweisung-schmid",
  title: "Auslandsüberweisung – Zahlungsauftrag",
  subtitle: "Szenario: Peter Schmid – Zahlungsauftrag prüfen",
  header: {
    bank: "Schweizer Musterbank AG",
    docType: "Auslandsüberweisung SWIFT",
    docNr: "Nr. ZA-2026-8841",
    date: "14. Juli 2026",
    clerk: "Sachb.: M. Weber, Zürich",
    statusBadge: "FREIGEGEBEN",
  },
  sections: [
    {
      title: "1. Auftraggeber",
      fields: [
        { id: "auftraggeber-name", label: "Name", value: { text: "Peter Schmid" } },
        { id: "kontonummer", label: "Kontonummer (IBAN)", value: { text: "CH56 0483 5012 3456 7800 9" } },
        { id: "kontostand", label: "Kontostand", value: { text: "CHF 8'200", bold: true } },
        { id: "auftraggeber-adresse", label: "Adresse", value: { text: "Bahnhofstrasse 12, 8001 Zürich" } },
      ],
    },
    {
      title: "2. Zahlungsdetails",
      fields: [
        { id: "betrag", label: "Betrag", value: { text: "CHF 15'000", bold: true } },
        { id: "waehrung", label: "Währung", value: { text: "CHF", bold: true } },
        { id: "valutadatum", label: "Valutadatum", value: { text: "16. Juli 2026" } },
        { id: "auftragsdatum", label: "Auftragsdatum", value: { text: "14. Juli 2026" } },
        { id: "zahlungsart", label: "Zahlungsart", value: { text: "Auslandsüberweisung SWIFT" } },
      ],
    },
    {
      title: "3. Empfänger",
      fields: [
        { id: "empfaenger-name", label: "Name", value: { text: "Müller GmbH" } },
        {
          id: "empfaenger-adresse",
          label: "Adresse",
          value: { text: "Mainzer Landstrasse 50, 60325 Frankfurt" },
        },
        { id: "iban", label: "IBAN", value: { text: "DE89 3704 0044 0532 0130 00", bold: true } },
        { id: "bank", label: "Bank", value: { text: "Deutsche Bank Frankfurt" } },
        { id: "bic-swift", label: "BIC / SWIFT", value: { text: "DEUTDEDB" } },
      ],
    },
    {
      title: "4. Verwendungszweck",
      fields: [
        { id: "referenz", label: "Referenz", value: { text: "Rechnung Nr. 2026-445" } },
        { id: "verwendungszweck", label: "Verwendungszweck", value: { text: "Maschinenlieferung" } },
      ],
    },
    {
      title: "5. Deckungsprüfung",
      fields: [
        { id: "deckung-kontostand", label: "Kontostand", value: { text: "CHF 8'200" } },
        { id: "deckung-betrag", label: "Überweisungsbetrag", value: { text: "CHF 15'000" } },
        {
          id: "deckung-vorhanden",
          label: "Deckung vorhanden",
          value: { text: "Ja", badge: { text: "✓ geprüft", color: "green" } },
        },
        {
          id: "pruefung-status",
          label: "Status",
          value: { text: "Genehmigt", badge: { text: "✓ genehmigt", color: "green" } },
        },
      ],
    },
    {
      title: "6. Compliance",
      fields: [
        {
          id: "betragsschwelle",
          label: "Betragsschwelle überschritten",
          value: { text: "Ja (über CHF 10'000)" },
        },
        {
          id: "sanktionspruefung",
          label: "Sanktionsprüfung (SECO)",
          value: { text: "Nicht durchgeführt" },
        },
        {
          id: "geldwaescherei",
          label: "Geldwäschereibeurteilung",
          value: { text: "Unauffällig", badge: { text: "✓ erledigt", color: "green" } },
        },
      ],
    },
    {
      title: "7. Verarbeitung",
      fields: [
        { id: "sachbearbeiter", label: "Sachbearbeiter", value: { text: "M. Weber" } },
        {
          id: "visum-kontrolle",
          label: "Visum Kontrolle",
          value: { text: "Vorhanden", bold: true },
        },
        {
          id: "freigabe",
          label: "Freigabe",
          value: { text: "Erteilt", badge: { text: "✓ freigegeben", color: "green" } },
        },
      ],
    },
  ],
  actualErrors: ["deckung-vorhanden", "waehrung", "sanktionspruefung"],
  errorExplanations: {
    "deckung-vorhanden":
      "Der Kontostand von Peter Schmid beträgt CHF 8'200 – der Überweisungsbetrag CHF 15'000 übersteigt das verfügbare Guthaben um CHF 6'800. Die Zahlung wurde trotzdem als «Genehmigt» markiert. Vor jeder Auslandsüberweisung muss die Kontodeckung geprüft und bei ungenügender Deckung abgelehnt werden.",
    waehrung:
      "Die Empfängerbank ist die Deutsche Bank Frankfurt, die IBAN beginnt mit DE – ein deutsches EUR-Konto. Die Überweisung muss in EUR ausgeführt werden, nicht in CHF. Andernfalls entstehen unnötige Wechselkurskosten und die Zahlung könnte beim Empfänger mit falscher Währung ankommen.",
    sanktionspruefung:
      "Bei Auslandsüberweisungen über CHF 10'000 ist eine Sanktionsprüfung gegen die SECO-Sanktionslisten zwingend vorgeschrieben. Der Auftrag übersteigt die Schwelle (CHF 15'000), die Prüfung wurde jedoch nicht durchgeführt. Das ist ein schwerwiegender Compliance-Verstoss mit möglichen strafrechtlichen Konsequenzen.",
  },
  errorContext: {
    "deckung-vorhanden": {
      field: "Deckung vorhanden",
      shown: "Ja (✓ geprüft) – Status: Genehmigt",
      correct:
        "Nein – Deckung nicht vorhanden. Kontostand CHF 8'200 < Überweisungsbetrag CHF 15'000 (Differenz CHF 6'800). Die Deckungsprüfung ist ein Pflichtschritt vor jeder Auslandsüberweisung. Bei ungenügender Deckung muss die Zahlung abgelehnt oder bis zur Kontoauffüllung zurückgestellt werden. Der Status «Genehmigt» hätte nie gesetzt werden dürfen.",
      type: "Fehlende Deckung – Überweisungsbetrag übersteigt Kontostand",
    },
    waehrung: {
      field: "Währung",
      shown: "CHF",
      correct:
        "EUR. Das Empfängerkonto (IBAN DE89 3704 0044 0532 0130 00) ist ein deutsches Euro-Konto bei der Deutsche Bank Frankfurt. Auslandsüberweisungen auf EUR-Konten müssen in EUR ausgeführt werden. Eine CHF-Überweisung auf ein EUR-Konto führt zu einer automatischen Konversion mit Wechselkursrisiko und zusätzlichen Gebühren – und entspricht nicht dem mutmasslichen Willen des Auftraggebers bei einer Rechnung in EUR.",
      type: "Falsche Währung (CHF statt EUR – Empfängerkonto ist EUR-IBAN)",
    },
    sanktionspruefung: {
      field: "Sanktionsprüfung (SECO)",
      shown: "Nicht durchgeführt",
      correct:
        "Sanktionsprüfung muss durchgeführt werden. Ab CHF 10'000 bei Auslandsüberweisungen ist die Prüfung gegen die SECO-Sanktionslisten (Staatssekretariat für Wirtschaft) zwingend vorgeschrieben. Der Auftrag beläuft sich auf CHF 15'000 und übersteigt die Schwelle. Die Freigabe ohne diese Prüfung ist ein gravierender Compliance-Verstoss und kann nach Embargogesetz (EmbG) strafrechtlich verfolgt werden.",
      type: "Fehlende SECO-Sanktionsprüfung (Pflicht ab CHF 10'000 bei Auslandszahlungen)",
    },
  },
};
