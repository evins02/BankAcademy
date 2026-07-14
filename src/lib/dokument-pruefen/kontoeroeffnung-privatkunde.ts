import type { DocumentConfig } from "./types";

export const kontoeroeffnungPrivatkunde: DocumentConfig = {
  id: "kontoeroeffnung-privatkunde",
  title: "Kontoeröffnung Privatkunde",
  subtitle: "Szenario: Thomas Kowalski – Kontoeröffnungsformular prüfen",
  header: {
    bank: "Schweizer Musterbank AG",
    docType: "Kontoeröffnung Privatkunde",
    docNr: "Nr. KOE-2026-0312",
    date: "14. Juli 2026",
    clerk: "Sachb.: S. Brunner, Zürich",
    statusBadge: "ABGESCHLOSSEN",
  },
  sections: [
    {
      title: "1. Personalien",
      fields: [
        { id: "vorname-name", label: "Vorname / Name", value: { text: "Thomas Kowalski" } },
        { id: "geburtsdatum", label: "Geburtsdatum", value: { text: "14.05.1989" } },
        { id: "nationalitaet", label: "Nationalität", value: { text: "Polnisch" } },
        { id: "zivilstand", label: "Zivilstand", value: { text: "Ledig" } },
        { id: "beruf", label: "Beruf", value: { text: "IT-Ingenieur" } },
        { id: "arbeitgeber", label: "Arbeitgeber", value: { text: "Siemens AG, Zürich" } },
        { id: "jahreseinkommen", label: "Jahreseinkommen", value: { text: "CHF 95'000" } },
      ],
    },
    {
      title: "2. Aufenthaltsstatus",
      fields: [
        { id: "aufenthalt-seit", label: "In der Schweiz seit", value: { text: "3 Jahren (seit 2021)" } },
        { id: "wohnadresse", label: "Wohnadresse", value: { text: "Langstrasse 84, 8004 Zürich" } },
        {
          id: "aufenthaltsbewilligung",
          label: "Aufenthaltsbewilligung",
          value: { text: "Ausweis C", bold: true },
        },
      ],
    },
    {
      title: "3. Kontoprodukte",
      fields: [
        {
          id: "privatkonto",
          label: "Privatkonto CHF",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
        {
          id: "sparkonto",
          label: "Sparkonto CHF",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
        {
          id: "e-banking",
          label: "E-Banking",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
        {
          id: "debitkarte",
          label: "Debitkarte",
          value: { text: "Ja", badge: { text: "✓ beantragt", color: "green" } },
        },
      ],
    },
    {
      title: "4. Identifikation & Dokumente",
      fields: [
        { id: "ausweistyp", label: "Ausweistyp", value: { text: "Ausländerausweis" } },
        { id: "ausweiskategorie", label: "Ausweiskategorie", value: { text: "C", bold: true } },
        { id: "ausweisnummer", label: "Ausweisnummer", value: { text: "X1234567" } },
        { id: "gueltig-bis", label: "Gültig bis", value: { text: "14.05.2027" } },
        {
          id: "ausweiskopie",
          label: "Ausweiskopie erstellt",
          value: { text: "Ja", badge: { text: "✓ erledigt", color: "green" } },
        },
        {
          id: "formular-a",
          label: "Formular A (wirtschaftlich Berechtigter)",
          value: { text: "Ja, Kunde = wirtschaftlich Berechtigter" },
        },
        {
          id: "unterschriftenprobe",
          label: "Unterschriftenprobe",
          value: { text: "Vorhanden", bold: true },
        },
      ],
    },
    {
      title: "5. FATCA / Steuerstatus",
      fields: [
        { id: "us-person", label: "US-Person", value: { text: "Ja", bold: true } },
        { id: "steuerdomizil", label: "Steuerdomizil", value: { text: "Schweiz" } },
        { id: "steuernummer-ch", label: "Steuernummer CH", value: { text: "756.1234.5678.90" } },
      ],
    },
    {
      title: "6. Compliance",
      fields: [
        { id: "pep-status", label: "PEP-Status", value: { text: "Nein" } },
        {
          id: "pep-pruefung",
          label: "PEP-Prüfung durchgeführt",
          value: { text: "Ja", badge: { text: "✓ erledigt", color: "green" } },
        },
        { id: "risikoklasse", label: "Risikoklasse", value: { text: "Standard" } },
        {
          id: "gwg-pruefung",
          label: "GwG-Prüfung",
          value: { text: "Abgeschlossen", badge: { text: "✓ erledigt", color: "green" } },
        },
      ],
    },
    {
      title: "7. Unterschriften",
      fields: [
        { id: "datum", label: "Datum", value: { text: "14. Juli 2026" } },
        {
          id: "unterschrift-kunde",
          label: "Unterschrift Kunde",
          value: { text: "Vorhanden", bold: true },
        },
        {
          id: "visum-sachbearbeiter",
          label: "Visum Sachbearbeiter",
          value: { text: "(ausstehend)", muted: true },
        },
        {
          id: "visum-kontrolle",
          label: "Visum Kontrolle",
          value: { text: "Vorhanden", bold: true },
        },
      ],
    },
  ],
  actualErrors: ["aufenthaltsbewilligung", "us-person", "visum-sachbearbeiter"],
  errorExplanations: {
    aufenthaltsbewilligung:
      "Thomas Kowalski lebt seit 3 Jahren in der Schweiz. Die Niederlassungsbewilligung C wird frühestens nach 5 Jahren (EU/EFTA) bzw. 10 Jahren (andere) ausgestellt. Mit 3 Jahren Aufenthalt hat er maximal Ausweis B – die Angabe C ist falsch (inkl. Ausweiskategorie im Abschnitt «Identifikation»).",
    "us-person":
      "Thomas Kowalski ist polnischer Staatsbürger, geboren in Polen, wohnhaft in der Schweiz. Er hat keine US-Staatsbürgerschaft, keinen US-Geburtsort und keine Green Card. Er ist keine US-Person im Sinne von FATCA – die Klassifizierung «Ja» ist falsch.",
    "visum-sachbearbeiter":
      "Ein Kontoeröffnungsformular ist erst rechtsgültig, wenn alle Pflichtunterschriften vorliegen. Das Formular ist als «Abgeschlossen» markiert, obwohl das Sachbearbeiter-Visum noch aussteht. Das Konto darf in diesem Zustand nicht eröffnet werden.",
  },
  errorContext: {
    aufenthaltsbewilligung: {
      field: "Aufenthaltsbewilligung",
      shown: "Ausweis C",
      correct:
        "Ausweis B. Thomas Kowalski ist seit 2021 in der Schweiz (3 Jahre). Als EU-Staatsangehöriger (Polen) erhält er die Niederlassungsbewilligung C frühestens nach 5 Jahren Aufenthalt, also frühestens 2026. Aktuell steht ihm Ausweis B zu. Auch die Ausweiskategorie im Abschnitt Identifikation & Dokumente muss entsprechend auf B korrigiert werden.",
      type: "Fehlerhafte Aufenthaltsbewilligung (C statt B, nur 3 Jahre Aufenthalt)",
    },
    "us-person": {
      field: "FATCA – US-Person",
      shown: "Ja",
      correct:
        "Nein. Thomas Kowalski ist polnischer Staatsbürger ohne US-Bezug. Eine US-Person gemäss FATCA ist definiert als: US-Staatsbürger, Inhaber einer US-Greencard oder Person mit US-Geburtsort. Keine dieser Bedingungen trifft zu – die Klassifizierung muss auf «Nein» korrigiert werden, da sonst unnötige FATCA-Meldepflichten ausgelöst werden.",
      type: "Fehlerhafte FATCA-Klassifizierung (kein US-Bezug vorhanden)",
    },
    "visum-sachbearbeiter": {
      field: "Visum Sachbearbeiter",
      shown: "(ausstehend) – Formularstatus: «Abgeschlossen»",
      correct:
        "Visum Sachbearbeiter muss vor Abschluss des Formulars vorliegen. Ein Kontoeröffnungsformular ist erst vollständig und rechtsgültig, wenn alle Pflichtunterschriften eingeholt wurden. Das Formular ist als «Abgeschlossen» markiert, obwohl das Sachbearbeiter-Visum noch fehlt – dieser Widerspruch muss geklärt werden, bevor das Konto eröffnet werden darf.",
      type: "Unvollständige Pflichtunterschriften (Sachbearbeiter-Visum ausstehend)",
    },
  },
};
