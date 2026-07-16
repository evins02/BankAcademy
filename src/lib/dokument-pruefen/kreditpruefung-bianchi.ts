import type { DocumentConfig } from "./types";

export const kreditpruefungBianchi: DocumentConfig = {
  id: "kreditpruefung-bianchi",
  title: "Kreditprüfungsformular",
  subtitle: "Szenario: Marco Bianchi – Renovationskredit Kreditprüfung",
  header: {
    bank: "Schweizer Musterbank AG",
    docType: "Kreditprüfungsformular",
    docNr: "Nr. KPF-2026-0233",
    date: "14. Juli 2026",
    clerk: "Sachb.: R. Müller, Baden",
    statusBadge: "GENEHMIGT",
  },
  sections: [
    {
      title: "1. Antragsteller",
      fields: [
        { id: "antragsteller-name", label: "Name", value: { text: "Marco Bianchi" } },
        { id: "geburtsdatum", label: "Geburtsdatum", value: { text: "15.07.1985" } },
        { id: "nationalitaet", label: "Nationalität", value: { text: "Schweizer Staatsbürger" } },
        { id: "zivilstand", label: "Zivilstand", value: { text: "Verheiratet, 2 Kinder" } },
        { id: "beruf", label: "Beruf", value: { text: "Projektleiter" } },
        { id: "arbeitgeber", label: "Arbeitgeber", value: { text: "ABB AG, Baden" } },
        {
          id: "bruttoeinkommen",
          label: "Bruttoeinkommen p.a.",
          value: { text: "CHF 120'000", bold: true },
        },
      ],
    },
    {
      title: "2. Kreditantrag",
      fields: [
        { id: "kreditbetrag", label: "Kreditbetrag", value: { text: "CHF 250'000", bold: true } },
        { id: "zweck", label: "Zweck", value: { text: "Renovation Eigenheim" } },
        { id: "laufzeit", label: "Laufzeit", value: { text: "10 Jahre" } },
        {
          id: "zinssatz",
          label: "Zinssatz (Referenz 5.0 %)",
          value: { text: "CHF 12'500 / Jahr" },
        },
        { id: "amortisation", label: "Amortisation p.a.", value: { text: "CHF 25'000" } },
      ],
    },
    {
      title: "3. Immobilie",
      fields: [
        {
          id: "immobilie-adresse",
          label: "Adresse",
          value: { text: "Gartenstrasse 8, 5400 Baden" },
        },
        { id: "objektart", label: "Objektart", value: { text: "Einfamilienhaus" } },
        {
          id: "schaetzwert",
          label: "Schätzwert",
          value: { text: "CHF 700'000", bold: true },
        },
        {
          id: "schaetzungsdatum",
          label: "Schätzungsdatum",
          value: { text: "12.03.2019", bold: true },
        },
      ],
    },
    {
      title: "4. Bestehende Finanzierung",
      fields: [
        {
          id: "bestehende-hypothek",
          label: "Bestehende Hypothek",
          value: { text: "CHF 450'000" },
        },
        {
          id: "neuer-kreditbetrag",
          label: "Neuer Kreditbetrag",
          value: { text: "CHF 250'000" },
        },
        {
          id: "gesamtbelastung",
          label: "Gesamtbelastung nach Kredit",
          value: { text: "CHF 700'000", bold: true },
        },
        {
          id: "belehnung-nach-kredit",
          label: "Belehnung nach Kredit (LTV)",
          value: { text: "75.0 %", bold: true },
        },
      ],
    },
    {
      title: "5. Tragbarkeitsberechnung (Referenzzins 5.0 %)",
      fields: [
        {
          id: "hypo-zins",
          label: "Hypothekarzins (5 % von CHF 450'000)",
          value: { text: "CHF 22'500" },
        },
        {
          id: "kredit-zins",
          label: "Neuer Kreditzins (5 % von CHF 250'000)",
          value: { text: "CHF 12'500" },
        },
        {
          id: "tragbarkeit-amort",
          label: "Amortisation p.a.",
          value: { text: "CHF 25'000" },
        },
        {
          id: "nebenkosten",
          label: "Nebenkosten (1 % von CHF 700'000)",
          value: { text: "CHF 7'000" },
        },
        {
          id: "total-wohnkosten",
          label: "Total Wohnkosten p.a.",
          value: { text: "CHF 67'000", bold: true },
        },
        {
          id: "tragbarkeit",
          label: "Tragbarkeit",
          value: { text: "22.5 % (Grenzwert: 33.0 %)", bold: true },
        },
        {
          id: "kreditentscheid",
          label: "Kreditentscheid",
          value: { text: "Genehmigt", badge: { text: "✓ genehmigt", color: "green" } },
        },
      ],
    },
    {
      title: "6. Dokumente",
      fields: [
        {
          id: "lohnausweis",
          label: "Lohnausweis (letzte 3 Monate)",
          value: { text: "Vorhanden", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "steuererklaerung",
          label: "Steuererklärung",
          value: { text: "Vorhanden", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "grundbuchauszug",
          label: "Grundbuchauszug",
          value: { text: "Vorhanden", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "schaetzungsbericht",
          label: "Schätzungsbericht",
          value: { text: "Vorhanden (2019)", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "betreibungsregister",
          label: "Betreibungsregisterauszug",
          value: { text: "Vorhanden, keine Einträge", badge: { text: "✓ erledigt", color: "green" } },
        },
      ],
    },
    {
      title: "7. Kreditentscheid",
      fields: [
        { id: "sachbearbeiter", label: "Sachbearbeiter", value: { text: "R. Müller" } },
        {
          id: "kreditkommission",
          label: "Kreditkommission",
          value: { text: "Genehmigt", badge: { text: "✓ genehmigt", color: "green" } },
        },
        { id: "datum-entscheid", label: "Datum", value: { text: "14. Juli 2026" } },
      ],
    },
  ],
  actualErrors: ["tragbarkeit", "belehnung-nach-kredit", "schaetzungsdatum"],
  errorExplanations: {
    tragbarkeit:
      "Die Tragbarkeit wurde falsch berechnet. Korrekt: Hypothekarzins CHF 22'500 + Kreditzins CHF 12'500 + Amortisation CHF 25'000 + Nebenkosten CHF 7'000 = CHF 67'000. CHF 67'000 ÷ CHF 120'000 = 55.8 % – weit über dem Grenzwert von 33.0 %. Der Kredit hätte abgelehnt werden müssen.",
    "belehnung-nach-kredit":
      "Nach Kreditvergabe beträgt die Gesamtbelastung CHF 700'000 (bestehende Hypothek CHF 450'000 + neuer Kredit CHF 250'000). Bei einem Schätzwert von CHF 700'000 ergibt das eine Belehnung von 100 % – die Schweizer Obergrenze liegt bei 80 %. Im Formular steht fälschlicherweise 75 %.",
    schaetzungsdatum:
      "Der Schätzungsbericht ist vom März 2019 – also 7 Jahre alt. Für neue Kreditvergaben verlangen Schweizer Banken eine aktuelle Schätzung (max. 2–3 Jahre). Der Immobilienmarkt hat sich seit 2019 stark verändert – der aktuelle Verkehrswert könnte deutlich abweichen.",
  },
  errorContext: {
    tragbarkeit: {
      field: "Tragbarkeit",
      shown: "22.5 % (Grenzwert: 33.0 %)",
      correct:
        "55.8 %. Korrekte Berechnung: Hypothekarzins CHF 22'500 + neuer Kreditzins CHF 12'500 + Amortisation CHF 25'000 + Nebenkosten CHF 7'000 = Total Wohnkosten CHF 67'000. CHF 67'000 ÷ Bruttoeinkommen CHF 120'000 = 55.8 %. Der Grenzwert von 33.0 % wird massiv überschritten – der eingetragene Wert von 22.5 % ist rechnerisch falsch und führte zu einer unzulässigen Genehmigung.",
      type: "Falsch berechnete Tragbarkeit (22.5% statt 55.8% – K.O.-Kriterium verletzt)",
    },
    "belehnung-nach-kredit": {
      field: "Belehnung nach Kredit (LTV)",
      shown: "75.0 %",
      correct:
        "100 %. Gesamtbelastung nach Kredit: bestehende Hypothek CHF 450'000 + neuer Kredit CHF 250'000 = CHF 700'000. Schätzwert der Immobilie: CHF 700'000. Belehnung: CHF 700'000 ÷ CHF 700'000 = 100 %. Die Schweizer Obergrenze liegt bei 80 % (erste Hypothek). Die eingetragenen 75 % sind rechnerisch falsch – die tatsächliche Belehnung überschreitet die Grenze um 20 Prozentpunkte.",
      type: "Falsch berechnete Belehnung (75% statt 100% – 80%-Grenze verletzt)",
    },
    schaetzungsdatum: {
      field: "Schätzungsdatum",
      shown: "12.03.2019 (7 Jahre alt)",
      correct:
        "Max. 2–3 Jahre alt (also frühestens ca. 2023/2024). Für eine neue Kreditvergabe ist eine aktuelle Liegenschaftsschätzung zwingend erforderlich. Der Immobilienmarkt hat sich seit März 2019 erheblich verändert. Ohne aktuelle Schätzung ist die Belehnungsberechnung nicht verlässlich und die Bank trägt ein unkontrolliertes Wertrisiko. Ein neuer Schätzungsbericht muss eingeholt werden, bevor der Kredit bewilligt werden darf.",
      type: "Veraltete Liegenschaftsschätzung (7 Jahre alt, max. 2–3 Jahre erlaubt)",
    },
  },
};
