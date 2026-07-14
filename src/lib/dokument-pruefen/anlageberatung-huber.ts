import type { DocumentConfig } from "./types";

export const anlageberatungHuber: DocumentConfig = {
  id: "anlageberatung-huber",
  title: "Anlageberatung & Risikoprofil",
  subtitle: "Szenario: Elisabeth Huber – Anlageberatungsprotokoll prüfen",
  header: {
    bank: "Schweizer Musterbank AG",
    docType: "Anlageberatung & Risikoprofil",
    docNr: "Nr. ABR-2026-0054",
    date: "14. Juli 2026",
    clerk: "Berater: R. Kuster, Bern",
    statusBadge: "ABGESCHLOSSEN",
  },
  sections: [
    {
      title: "1. Personalien",
      fields: [
        { id: "vorname-name", label: "Vorname / Name", value: { text: "Elisabeth Huber" } },
        { id: "geburtsdatum", label: "Geburtsdatum", value: { text: "03.09.1958" } },
        { id: "nationalitaet", label: "Nationalität", value: { text: "Schweizer Staatsbürgerin" } },
        { id: "zivilstand", label: "Zivilstand", value: { text: "Verwitwet" } },
        { id: "beruf", label: "Beruf", value: { text: "Pensioniert (seit 2023)" } },
        { id: "wohnadresse", label: "Wohnadresse", value: { text: "Rosenweg 12, 3006 Bern" } },
      ],
    },
    {
      title: "2. Finanzsituation",
      fields: [
        { id: "gesamtvermoegen", label: "Gesamtvermögen", value: { text: "CHF 450'000", bold: true } },
        { id: "monatsbedarf", label: "Monatlicher Bedarf Lebensunterhalt", value: { text: "CHF 3'500" } },
        { id: "jahresbedarf", label: "Jahresbedarf", value: { text: "CHF 42'000" } },
        { id: "ahv-rente", label: "AHV-Rente monatlich", value: { text: "CHF 2'200" } },
        {
          id: "monatliche-luecke",
          label: "Monatliche Lücke (aus Vermögen)",
          value: { text: "CHF 1'300", bold: true },
        },
        {
          id: "liquiditaetsreserve",
          label: "Liquiditätsreserve",
          value: { text: "CHF 10'000", bold: true },
        },
        {
          id: "anlagebetrag",
          label: "Anlagebetrag",
          value: { text: "CHF 440'000", bold: true },
        },
      ],
    },
    {
      title: "3. Anlageziele & Risiko",
      fields: [
        {
          id: "anlageziel",
          label: "Anlageziel laut Kundengespräch",
          value: { text: "«Etwas Rendite, kein grosses Risiko»" },
        },
        {
          id: "risikoprofil",
          label: "Risikoprofil",
          value: { text: "Wachstum (70% Aktien / 30% Obligationen)", bold: true },
        },
        { id: "risikobereitschaft", label: "Risikobereitschaft", value: { text: "Mittel" } },
        {
          id: "risikofaehigkeit",
          label: "Risikofähigkeit",
          value: { text: "Tief (Rentnerin, Vermögen für Lebensunterhalt benötigt)" },
        },
        {
          id: "anlagehorizont",
          label: "Anlagehorizont",
          value: { text: "15 Jahre", bold: true },
        },
      ],
    },
    {
      title: "4. Anlagevorschlag",
      fields: [
        { id: "produkt-aktien", label: "Produktkategorie", value: { text: "Aktienfonds Global (70%)" } },
        {
          id: "produkt-obligationen",
          label: "  — Beimischung",
          value: { text: "Obligationenfonds CHF (30%)" },
        },
        { id: "erwartete-rendite", label: "Erwartete Rendite p.a.", value: { text: "5–7 %" } },
        { id: "waehrung", label: "Währung", value: { text: "CHF" } },
      ],
    },
    {
      title: "5. FIDLEG-Eignungsprüfung",
      fields: [
        { id: "anlagekenntnisse", label: "Anlagekenntnisse", value: { text: "Gering" } },
        { id: "anlageerfahrung", label: "Anlageerfahrung", value: { text: "Keine" } },
        {
          id: "eignungspruefung",
          label: "Eignungsprüfung durchgeführt",
          value: { text: "Ja", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "ergebnis",
          label: "Ergebnis",
          value: { text: "Geeignet", badge: { text: "✓ bestätigt", color: "green" } },
        },
      ],
    },
    {
      title: "6. Unterschriften",
      fields: [
        { id: "datum", label: "Datum", value: { text: "14. Juli 2026" } },
        {
          id: "unterschrift-kundin",
          label: "Unterschrift Kundin",
          value: { text: "Vorhanden", bold: true },
        },
        { id: "visum-berater", label: "Visum Berater", value: { text: "Vorhanden", bold: true } },
        { id: "visum-kontrolle", label: "Visum Kontrolle", value: { text: "Vorhanden", bold: true } },
      ],
    },
  ],
  actualErrors: ["risikoprofil", "anlagehorizont", "liquiditaetsreserve"],
  errorExplanations: {
    risikoprofil:
      "Elisabeth Huber ist 67 Jahre alt, pensioniert und benötigt ihr Vermögen für den Lebensunterhalt. Ein Wachstumsprofil mit 70% Aktien ist gemäss FIDLEG nicht geeignet – die Risikofähigkeit ist tief, da das Vermögen existenziell wichtig ist. Korrekt wäre Einkommen oder Ausgewogen (max. 30–40% Aktien).",
    anlagehorizont:
      "Bei einer 67-jährigen Rentnerin ist ein Anlagehorizont von 15 Jahren unrealistisch (sie wäre dann 82). Zudem benötigt sie laufend Kapital für den Lebensunterhalt. Max. 5–7 Jahre wäre ein realistischer Horizont.",
    liquiditaetsreserve:
      "Elisabeth Huber benötigt monatlich CHF 3'500. Als Faustregel gilt: mindestens 6 Monatsbedarf müssen liquide verfügbar sein = CHF 21'000. Mit nur CHF 10'000 Reserve kann sie kurzfristige Engpässe nicht überbrücken, ohne Anlagen zu ungünstigen Zeitpunkten zu liquidieren.",
  },
  errorContext: {
    risikoprofil: {
      field: "Risikoprofil",
      shown: "Wachstum (70% Aktien / 30% Obligationen)",
      correct:
        "Einkommen oder Ausgewogen (max. 30–40% Aktien). Elisabeth Huber ist 67 Jahre alt, verwitwet, pensioniert und benötigt ihr Vermögen für den Lebensunterhalt. Ihre Risikofähigkeit ist gemäss FIDLEG-Systematik tief, weil ein dauerhafter Verlust existenzielle Konsequenzen hätte. Das eingetragene Wachstumsprofil mit 70% Aktienanteil widerspricht ihrer Risikofähigkeit fundamental und ist nicht gesetzeskonform.",
      type: "Falsches Risikoprofil (Wachstum statt Einkommen/Ausgewogen – FIDLEG-Verletzung)",
    },
    anlagehorizont: {
      field: "Anlagehorizont",
      shown: "15 Jahre",
      correct:
        "Max. 5–7 Jahre. Elisabeth Huber ist bei Vertragsabschluss 67 Jahre alt. Ein Horizont von 15 Jahren würde bedeuten, sie hätte bis 82 Jahren keine Liquiditätsbedürfnisse – was bei einer Rentnerin mit monatlicher Finanzierungslücke von CHF 1'300 unrealistisch ist. Der Anlagehorizont muss zur Lebensphase und zum laufenden Kapitalbedarf passen.",
      type: "Unrealistischer Anlagehorizont (15 Jahre bei 67-jähriger Rentnerin)",
    },
    liquiditaetsreserve: {
      field: "Liquiditätsreserve",
      shown: "CHF 10'000",
      correct:
        "Mind. CHF 21'000 (6 × monatlicher Bedarf CHF 3'500). Die Faustregel für Privatanleger sieht eine Liquiditätsreserve von mindestens 6 Monatsbedarfen vor. Bei einem monatlichen Lebensunterhalt von CHF 3'500 ergibt das CHF 21'000. Mit nur CHF 10'000 Reserve und CHF 440'000 in Wachstumsanlagen wäre Elisabeth Huber gezwungen, bei kurzfristigem Kapitalbedarf Anlagen zum falschen Zeitpunkt zu liquidieren.",
      type: "Ungenügende Liquiditätsreserve (CHF 10'000 statt mind. CHF 21'000)",
    },
  },
};
