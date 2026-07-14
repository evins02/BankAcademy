import type { DocumentConfig } from "./types";

export const hypothekarantrag: DocumentConfig = {
  id: "hypothekarantrag",
  title: "Hypothekarantrag",
  subtitle: "Szenario: Familie Müller – Hypothekarantrag prüfen",
  header: {
    bank: "Schweizer Musterbank AG",
    docType: "Hypothekarantrag",
    docNr: "Nr. HYP-2025-0847",
    date: "15. Juni 2025",
    clerk: "Sachb.: K. Steiner, Winterthur",
    statusBadge: "ENTWURF – zur Prüfung",
  },
  sections: [
    {
      title: "1. Antragsteller",
      fields: [
        { id: "ehemann", label: "Ehemann", value: { text: "Hans Müller, geb. 12.03.1971, CH" } },
        { id: "ehefrau", label: "Ehefrau", value: { text: "Marie Müller-Bühler, geb. 04.07.1981, CH" } },
        { id: "wohnadresse", label: "Wohnadresse", value: { text: "Seestrasse 45, 8200 Schaffhausen" } },
        { id: "familienstand", label: "Familienstand", value: { text: "Verheiratet, 3 Kinder (2009 / 2012 / 2016)" } },
      ],
    },
    {
      title: "2. Kaufobjekt",
      fields: [
        { id: "objektart", label: "Objektart", value: { text: "Einfamilienhaus (EFH)" } },
        { id: "adresse", label: "Adresse", value: { text: "Birkenweg 12, 8400 Winterthur" } },
        { id: "kaufpreis", label: "Kaufpreis", value: { text: "CHF 950'000" } },
        { id: "schaetzwert", label: "Bankinterner Schätzwert", value: { text: "CHF 950'000" } },
        { id: "baujahr", label: "Baujahr / Renovation", value: { text: "1998 / 2019" } },
        { id: "wohnflaeche", label: "Wohnfläche / Grundstück", value: { text: "185 m²  |  625 m²" } },
      ],
    },
    {
      title: "3. Finanzierungsstruktur",
      fields: [
        { id: "hypothek1", label: "1. Hypothek (66.7 %)", value: { text: "CHF 633'000" } },
        { id: "hypothek2", label: "2. Hypothek (15.4 %)", value: { text: "CHF 146'000" } },
        { id: "gesamthypothek", label: "Gesamthypothek", value: { text: "CHF 779'000" } },
        { id: "belehnung", label: "Belehnung (LTV)", value: { text: "78.0 %", bold: true } },
        { id: "eigenmittel-gesamt", label: "Eigenmittel gesamt", value: { text: "CHF 171'000" } },
        { id: "bankguthaben", label: "  — Bankguthaben (UBS Sparkonto)", value: { text: "CHF 99'000" } },
        {
          id: "eigenmittel",
          label: "  — Pensionskassen-Vorbezug (BVG)",
          value: { text: "CHF 72'000", badge: { text: "✓ Eigenmittel", color: "green" } },
        },
      ],
    },
    {
      title: "4. Amortisation",
      fields: [
        { id: "amort-typ", label: "Typ", value: { text: "Direkt" } },
        { id: "amort-rate", label: "Amortisationsrate p.a.", value: { text: "CHF 7'733", bold: true } },
        { id: "amort-frist", label: "Amortisationsfrist (2. Hypothek)", value: { text: "15 Jahre" } },
        { id: "amortisation", label: "Amortisationsplan (Dok.)", value: { text: "vorhanden", bold: true } },
      ],
    },
    {
      title: "5. Tragbarkeitsberechnung (Referenzzins 5.0 %)",
      fields: [
        { id: "bruttoeinkommen", label: "Bruttoeinkommen p.a.", value: { text: "CHF 168'000" } },
        { id: "hypothekarkosten", label: "Hypothekarkosten (5.0 %)", value: { text: "CHF 38'950" } },
        { id: "tragbarkeit-amort", label: "Amortisation p.a.", value: { text: "CHF 7'733" } },
        { id: "nebenkosten", label: "Nebenkosten (1.0 % Kaufpreis)", value: { text: "CHF 9'500" } },
        { id: "wohnkosten-total", label: "Total Wohnkosten p.a.", value: { text: "CHF 56'183" } },
        { id: "tragbarkeit", label: "Tragbarkeit", value: { text: "33.4 % (Grenzwert: 33.0 %)" } },
        { id: "kreditentscheid", label: "Kreditentscheid", value: { text: "Abzulehnen – Belehnung überschreitet 80 %-Grenze" } },
      ],
    },
    {
      title: "6. Visa / Unterschriften",
      fields: [
        { id: "kreditsachbearbeiter", label: "Kreditsachbearbeiter", value: { text: "K. Steiner  _______________", muted: true } },
        { id: "kreditkontrolle", label: "Kreditkontrolle", value: { text: "(ausstehend)", muted: true } },
        { id: "kreditkommission", label: "Kreditkommission", value: { text: "(ausstehend)", muted: true } },
      ],
    },
  ],
  actualErrors: ["belehnung", "amort-rate", "amort-frist"],
  errorExplanations: {
    belehnung:
      "Die Belehnung beträgt 82%, nicht 78%. Die Schweizer Obergrenze liegt bei 80% – der Antrag müsste in dieser Form abgelehnt werden.",
    "amort-rate":
      "Die 2. Hypothek beträgt CHF 146'000, Laufzeit 15 Jahre. Die korrekte Jahresrate wäre CHF 146'000 ÷ 15 = CHF 9'733 – nicht CHF 7'733 wie im Formular angegeben.",
    "amort-frist":
      "Hans Müller ist 55 Jahre alt. Die 2. Hypothek muss bis zur Pensionierung (65) amortisiert sein – also in 10 Jahren, nicht 15. Die maximale Frist beträgt 10 Jahre.",
  },
  errorContext: {
    belehnung: {
      field: "Belehnung (LTV)",
      shown: "78.0 %",
      correct:
        "82.0 % (CHF 779'000 ÷ CHF 950'000 = 0.820). Die Belehnung überschreitet zudem die Schweizer Obergrenze von 80 % – der Antrag müsste in dieser Form abgelehnt werden.",
      type: "Rechenfehler + Grenzwertverletzung (80%-Regel)",
    },
    "amort-rate": {
      field: "Amortisationsrate p.a. (2. Hypothek)",
      shown: "CHF 7'733 p.a.",
      correct:
        "CHF 9'733 p.a. (CHF 146'000 ÷ 15 Jahre = CHF 9'733). Der im Formular eingetragene Wert von CHF 7'733 ist um CHF 2'000 zu tief – ein Rechenfehler.",
      type: "Rechenfehler (Amortisationsrate zu tief berechnet)",
    },
    "amort-frist": {
      field: "Amortisationsfrist (2. Hypothek)",
      shown: "15 Jahre",
      correct:
        "Hans Müller (geb. 12.03.1971) ist 55 Jahre alt und pensioniert sich mit 65. Die 2. Hypothek muss spätestens bei Pensionierung vollständig amortisiert sein – die maximale Frist beträgt daher 10 Jahre, nicht 15.",
      type: "Fristfehler (Amortisationsfrist überschreitet Zeitraum bis Pensionierung)",
    },
  },
};
