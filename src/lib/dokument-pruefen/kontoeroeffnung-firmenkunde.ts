import type { DocumentConfig } from "./types";

export const kontoeroeffnungFirmenkunde: DocumentConfig = {
  id: "kontoeroeffnung-firmenkunde",
  title: "Kontoeröffnung Firmenkunde",
  subtitle: "Szenario: Bau & Renovations GmbH – Geschäftskonto-Eröffnung prüfen",
  header: {
    bank: "Schweizer Musterbank AG",
    docType: "Kontoeröffnung Firmenkunde",
    docNr: "Nr. KOF-2026-0189",
    date: "14. Juli 2026",
    clerk: "Sachb.: M. Widmer, Zürich",
    statusBadge: "ABGESCHLOSSEN",
  },
  sections: [
    {
      title: "1. Firmenangaben",
      fields: [
        { id: "firmenname", label: "Firmenname", value: { text: "Bau & Renovations GmbH", bold: true } },
        { id: "rechtsform", label: "Rechtsform", value: { text: "GmbH" } },
        { id: "gruendungsjahr", label: "Gründungsjahr", value: { text: "2019" } },
        { id: "branche", label: "Branche", value: { text: "Baugewerbe" } },
        { id: "jahresumsatz", label: "Jahresumsatz", value: { text: "CHF 1.2 Mio." } },
        { id: "mitarbeiter", label: "Anzahl Mitarbeiter", value: { text: "8" } },
        { id: "uid-nummer", label: "UID-Nummer", value: { text: "CHE-123.456.789" } },
      ],
    },
    {
      title: "2. Geschäftsführung / Zeichnungsberechtigte",
      fields: [
        { id: "gf-name", label: "Name", value: { text: "Marco Ferretti, geb. 12.03.1981, IT-Staatsbürger" } },
        { id: "gf-funktion", label: "Funktion", value: { text: "Geschäftsführer" } },
        { id: "gf-zeichnung", label: "Zeichnungsberechtigung", value: { text: "Einzelunterschrift", bold: true } },
        { id: "gf-ausweis", label: "Ausweis", value: { text: "Italienischer Pass, gültig bis 2029" } },
      ],
    },
    {
      title: "3. Kontoprodukte",
      fields: [
        {
          id: "geschaeftskonto",
          label: "Geschäftskonto CHF",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
        {
          id: "e-banking-business",
          label: "E-Banking Business",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
        {
          id: "zv-inland",
          label: "Zahlungsverkehr Inland",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
        {
          id: "zv-ausland",
          label: "Zahlungsverkehr Ausland",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
      ],
    },
    {
      title: "4. Identifikation & Dokumente",
      fields: [
        {
          id: "handelsregister",
          label: "Handelsregisterauszug",
          value: { text: "Vorhanden", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "statuten",
          label: "Statuten / Gesellschaftsvertrag",
          value: { text: "Vorhanden", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "formular-a",
          label: "Formular A (wirtschaftlich Berechtigter)",
          value: { text: "Ausgefüllt", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "ausweiskopie-gf",
          label: "Ausweiskopie Geschäftsführer",
          value: { text: "Vorhanden", badge: { text: "✓ erledigt", color: "green" } },
        },
      ],
    },
    {
      title: "5. Zweck der Geschäftsbeziehung",
      fields: [
        {
          id: "zweck-geschaeftsbeziehung",
          label: "Zweck der Geschäftsbeziehung",
          value: { text: "(nicht ausgefüllt)", muted: true },
        },
        {
          id: "haupttaetigkeit",
          label: "Hauptgeschäftstätigkeit",
          value: { text: "Renovation und Umbau von Wohnliegenschaften" },
        },
        {
          id: "transaktionsvolumen",
          label: "Erwartetes Transaktionsvolumen",
          value: { text: "CHF 80'000–120'000 / Monat" },
        },
        {
          id: "zahlungspartner",
          label: "Hauptzahlungspartner",
          value: { text: "Lieferanten Baumaterial, Subunternehmer" },
        },
      ],
    },
    {
      title: "6. FATCA / Steuerstatus",
      fields: [
        {
          id: "fatca-eigenerklaerung",
          label: "FATCA-Eigenerklärung",
          value: { text: "Juristische Person", badge: { text: "✓ erledigt", color: "green" } },
        },
        { id: "steuerdomizil", label: "Steuerdomizil", value: { text: "Schweiz" } },
        { id: "us-verbindung", label: "US-Verbindung", value: { text: "Nein" } },
      ],
    },
    {
      title: "7. Compliance",
      fields: [
        {
          id: "pep-pruefung",
          label: "PEP-Prüfung Geschäftsführer",
          value: { text: "Durchgeführt, kein PEP", badge: { text: "✓ erledigt", color: "green" } },
        },
        { id: "risikoklasse", label: "Risikoklasse", value: { text: "Standard", bold: true } },
        {
          id: "gwg-pruefung",
          label: "GwG-Prüfung",
          value: { text: "Abgeschlossen", badge: { text: "✓ erledigt", color: "green" } },
        },
        { id: "herkunft-mittel", label: "Herkunft der Mittel", value: { text: "Geschäftstätigkeit" } },
      ],
    },
    {
      title: "8. Unterschriften",
      fields: [
        { id: "datum", label: "Datum", value: { text: "14. Juli 2026" } },
        { id: "unterschrift-gf", label: "Unterschrift Geschäftsführer", value: { text: "Vorhanden", bold: true } },
        { id: "visum-sachbearbeiter", label: "Visum Sachbearbeiter", value: { text: "Vorhanden", bold: true } },
        { id: "visum-kontrolle", label: "Visum Kontrolle", value: { text: "Vorhanden", bold: true } },
      ],
    },
  ],
  actualErrors: ["formular-a", "zweck-geschaeftsbeziehung", "risikoklasse"],
  errorExplanations: {
    "formular-a":
      "Bei der Bau & Renovations GmbH handelt es sich um eine juristische Person. Gemäss VSB 20 muss in diesem Fall Formular K (Kontrolle über juristische Person) verwendet werden – nicht Formular A, das ausschliesslich für natürliche Personen gilt.",
    "zweck-geschaeftsbeziehung":
      "Der Zweck der Geschäftsbeziehung ist bei Firmenkunden ein Pflichtfeld gemäss GwG Art. 6 (Abklärungspflicht). Ohne diese Angabe darf das Konto nicht eröffnet werden – der Sachbearbeiter muss den Zweck dokumentieren.",
    risikoklasse:
      "Das Baugewerbe gilt in der Schweiz als erhöhte Risikobranche – bekannt für hohe Bargeldtransaktionen, Schwarzarbeit und komplexe Subunternehmer-Strukturen. Gemäss FINMA-Vorgaben muss die Risikoklasse «Erhöht» gesetzt werden, was eine verstärkte Sorgfaltsprüfung auslöst.",
  },
  errorContext: {
    "formular-a": {
      field: "Formular A (wirtschaftlich Berechtigter)",
      shown: "Ausgefüllt",
      correct:
        "Formular K muss verwendet werden. Formular A gilt gemäss VSB 20 (Vereinbarung über die Standesregeln zur Sorgfaltspflicht der Banken) ausschliesslich für natürliche Personen. Bei juristischen Personen wie einer GmbH ist stattdessen Formular K (Kontrolle über juristische Person / Feststellung des wirtschaftlich Berechtigten bei Gesellschaften) auszufüllen. Das falsche Formular macht die Identifikation rechtlich ungültig.",
      type: "Falsches Sorgfaltspflicht-Formular (A statt K für juristische Person)",
    },
    "zweck-geschaeftsbeziehung": {
      field: "Zweck der Geschäftsbeziehung",
      shown: "(nicht ausgefüllt)",
      correct:
        "Pflichtfeld muss ausgefüllt sein. Gemäss GwG Art. 6 (Abklärungspflicht) ist der Zweck der Geschäftsbeziehung bei Firmenkunden zwingend zu dokumentieren. Bei einer Baufirma wäre z.B. «Abwicklung des laufenden Geschäftsverkehrs im Bereich Renovation und Umbau, Zahlungen an Lieferanten und Subunternehmer» ein adäquater Eintrag. Ohne diese Angabe ist die GwG-Compliance nicht erfüllt.",
      type: "Fehlendes Pflichtfeld (GwG Art. 6 – Zweck der Geschäftsbeziehung)",
    },
    risikoklasse: {
      field: "Risikoklasse",
      shown: "Standard",
      correct:
        "Erhöht. Das Baugewerbe ist gemäss FINMA-Rundschreiben 2011/1 eine erhöhte Risikobranche, da hohe Bargeldtransaktionen, Schwarzarbeit und vielschichtige Subunternehmer-Strukturen typisch sind. Mit der Risikoklasse «Erhöht» wird eine verstärkte Sorgfaltsprüfung (VSP) ausgelöst: periodische Überprüfung der Geschäftsbeziehung, Monitoring der Transaktionen und ggf. Erstellung eines Risikoprofils.",
      type: "Falsche Risikoklasse (Standard statt Erhöht – Baugewerbe)",
    },
  },
};
