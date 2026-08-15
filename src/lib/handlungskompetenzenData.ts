export type HKBereich = "a" | "b" | "c" | "d" | "e";

export interface HKLeitfrage {
  code: string;
  frage: string;
}

export interface Handlungskompetenz {
  code: string;
  titel: string;
  bereich: HKBereich;
  bereichTitel: string;
  // Handlungskompetenzen mit vollem Praxisszenario + Simulation ("Stufe 2")
  bankspezifisch: boolean;
  leitfragen: HKLeitfrage[];
}

export const BEREICH_LABELS: Record<HKBereich, string> = {
  a: "Handeln in agilen Arbeits- und Organisationsformen",
  b: "Interagieren in einem vernetzten Arbeitsumfeld",
  c: "Koordinieren von unternehmerischen Arbeitsprozessen",
  d: "Gestalten von Kunden- oder Lieferantenbeziehungen",
  e: "Einsetzen von Technologien der digitalen Arbeitswelt",
};

export const HANDLUNGSKOMPETENZEN: Handlungskompetenz[] = [
  {
    code: "a1",
    titel: "Kaufmännische Kompetenzentwicklung überprüfen und weiterentwickeln",
    bereich: "a",
    bereichTitel: "Handeln in agilen Arbeits- und Organisationsformen",
    bankspezifisch: false,
    leitfragen: [
      { code: "a1.1", frage: "Dokumentiere ich meine Kompetenzen und meine Kompetenzentwicklung zielführend?" },
      { code: "a1.2", frage: "Nehme ich in sinnvollen Abständen gewissenhaft eine persönliche Standortbestimmung vor?" },
      { code: "a1.3", frage: "Nutze ich SMARTe Ziele und passende Massnahmen zur Zielerreichung für meine eigene berufliche Entwicklung?" },
      { code: "a1.4", frage: "Treibe ich meine eigene berufliche Entwicklung proaktiv voran?" },
    ],
  },
  {
    code: "a2",
    titel: "Netzwerke im kaufmännischen Bereich aufbauen und nutzen",
    bereich: "a",
    bereichTitel: "Handeln in agilen Arbeits- und Organisationsformen",
    bankspezifisch: false,
    leitfragen: [
      { code: "a2.1", frage: "Bemühe ich mich aktiv, mein berufliches Netzwerk aufzubauen?" },
      { code: "a2.2", frage: "Nutze ich mein berufliches Netzwerk zielgerichtet?" },
      { code: "a2.3", frage: "Positioniere ich mich innerhalb des beruflichen Netzwerks angemessen?" },
      { code: "a2.4", frage: "Halte ich mich zu den beruflichen Netzwerken in meiner Branche auf dem Laufenden?" },
    ],
  },
  {
    code: "a3",
    titel: "Kaufmännische Aufträge entgegennehmen und bearbeiten",
    bereich: "a",
    bereichTitel: "Handeln in agilen Arbeits- und Organisationsformen",
    bankspezifisch: false,
    leitfragen: [
      { code: "a3.1", frage: "Kann ich eine vollständige Auftragsklarung vornehmen?" },
      { code: "a3.2", frage: "Bin ich in der Lage, die Umsetzung meiner Aufträge sinnvoll zu planen?" },
      { code: "a3.3", frage: "Gehe ich bei der Bearbeitung meiner Aufgaben strukturiert und zielgerichtet vor?" },
      { code: "a3.4", frage: "Gehe ich konstruktiv mit Rückmeldungen anderer um?" },
    ],
  },
  {
    code: "a4",
    titel: "Als selbstverantwortliche Person in der Gesellschaft handeln",
    bereich: "a",
    bereichTitel: "Handeln in agilen Arbeits- und Organisationsformen",
    bankspezifisch: false,
    leitfragen: [],
  },
  {
    code: "a5",
    titel: "Politische Themen und kulturelles Bewusstsein im Handeln einbeziehen",
    bereich: "a",
    bereichTitel: "Handeln in agilen Arbeits- und Organisationsformen",
    bankspezifisch: false,
    leitfragen: [],
  },
  {
    code: "b1",
    titel: "In unterschiedlichen Teams zur Bearbeitung kaufmännischer Aufträge zusammenarbeiten und kommunizieren",
    bereich: "b",
    bereichTitel: "Interagieren in einem vernetzten Arbeitsumfeld",
    bankspezifisch: true,
    leitfragen: [
      { code: "b1.1", frage: "Arbeite ich mit allen Teammitgliedern respektvoll zusammen?" },
      { code: "b1.2", frage: "Gelingt es mir, die Ziele und Regeln meines Teams tatkräftig zu verfolgen und einzuhalten?" },
      { code: "b1.3", frage: "Gehe ich angemessen mit anspruchsvollen Situationen im Team um?" },
      { code: "b1.4", frage: "Spreche ich Probleme mit Teammitgliedern konstruktiv an?" },
      { code: "b1.5", frage: "Gelingt es mir, die Verhaltensrichtlinien und Gesetzesvorgaben meiner Branche sowie meines Betriebs im Zusammenhang mit Kundenbeziehungen zielführend und konsequent umzusetzen?" },
    ],
  },
  {
    code: "b2",
    titel: "Schnittstellen in betrieblichen Prozessen koordinieren",
    bereich: "b",
    bereichTitel: "Interagieren in einem vernetzten Arbeitsumfeld",
    bankspezifisch: false,
    leitfragen: [
      { code: "b2.1", frage: "Verhalte ich mich an betrieblichen Schnittstellen stets professionell und halte ich mich gewissenhaft an die gesetzlichen Vorgaben und internen Richtlinien?" },
      { code: "b2.2", frage: "Leite ich Informationen an Schnittstellen gekonnt weiter?" },
      { code: "b2.3", frage: "Gelingt es mir, betriebliche Prozesse fachlich korrekt auszuführen und Schnittstellen zielführend zu analysieren." },
      { code: "b2.4", frage: "Bringe ich Verbesserungsvorschläge zu betrieblichen Prozessen und Schnittstellen gekonnt ein?" },
    ],
  },
  {
    code: "b3",
    titel: "In wirtschaftlichen Fachdiskussionen mitdiskutieren",
    bereich: "b",
    bereichTitel: "Interagieren in einem vernetzten Arbeitsumfeld",
    bankspezifisch: false,
    leitfragen: [
      { code: "b3.1", frage: "Recherchiere ich gekonnt geeignete Informationen zu branchenspezifischen Themen, um mir zu diesen Themen fundiert eine eigene Meinung zu bilden?" },
      { code: "b3.2", frage: "Argumentiere und trete ich in wirtschaftlichen Fachdiskussionen überzeugend auf?" },
      { code: "b3.3", frage: "Gelingt es mir, konstruktiv mit anderen Meinungen umzugehen?" },
      { code: "b3.4", frage: "Bereite ich wirtschaftliche Fachdiskussionen zielführend nach?" },
    ],
  },
  {
    code: "b4",
    titel: "Kaufmännische Projektmanagementaufgaben ausführen und Teilprojekte bearbeiten",
    bereich: "b",
    bereichTitel: "Interagieren in einem vernetzten Arbeitsumfeld",
    bankspezifisch: false,
    leitfragen: [
      { code: "b4.1", frage: "Informiere ich mich umfassend über jedes Projekt, in dem ich mitarbeite?" },
      { code: "b4.2", frage: "Gelingt es mir, meine Projektmanagementaufgaben zielführend zu planen?" },
      { code: "b4.3", frage: "Kommuniziere ich transparent in Projekten?" },
      { code: "b4.4", frage: "Betreue ich digitale Arbeitsumgebungen in Projekten kompetent?" },
      { code: "b4.5", frage: "Reagiere ich flexibel auf Veränderungen im Projekt?" },
    ],
  },
  {
    code: "b5",
    titel: "Betriebliche Veränderungsprozesse mitgestalten",
    bereich: "b",
    bereichTitel: "Interagieren in einem vernetzten Arbeitsumfeld",
    bankspezifisch: false,
    leitfragen: [
      { code: "b5.1", frage: "Setze ich mich zielführend mit Veränderungsprozessen in meinem Betrieb auseinander?" },
      { code: "b5.2", frage: "Gelingt es mir, einen produktiven Beitrag zu Veränderungen zu leisten?" },
      { code: "b5.3", frage: "Bringe ich Ideen und Verbesserungsvorschläge für betriebliche Veränderungen mutig ein?" },
    ],
  },
  {
    code: "c1",
    titel: "Aufgaben und Ressourcen im kaufmännischen Arbeitsbereich planen, koordinieren und optimieren",
    bereich: "c",
    bereichTitel: "Koordinieren von unternehmerischen Arbeitsprozessen",
    bankspezifisch: false,
    leitfragen: [
      { code: "c1.1", frage: "Gelingt es mir, meine Aufgaben und Ressourcen gemäss den betrieblichen Vorgaben  zu planen?" },
      { code: "c1.2", frage: "Priorisiere ich meine Termine und Aufgaben auf sinnvolle Weise?" },
      { code: "c1.3", frage: "Nutze ich zielführende Massnahmen, um meine Aufgaben speditiv zu erledigen?" },
      { code: "c1.4", frage: "Gehe ich nachhaltig mit meinen persönlichen Ressourcen um?" },
      { code: "c1.5", frage: "Unterstütze ich die Vorbereitung von Anlässen fachgerecht?" },
      { code: "c1.6", frage: "Gelingt es mir, bei der Durchführung von Anlässen professionell zu unterstützten?" },
    ],
  },
  {
    code: "c2",
    titel: "Kaufmännische Unterstützungsprozesse koordinieren und umsetzen",
    bereich: "c",
    bereichTitel: "Koordinieren von unternehmerischen Arbeitsprozessen",
    bankspezifisch: false,
    leitfragen: [
      { code: "c2.1", frage: "Kann ich qualitativ hochwertige Unterstützungsdokumente erstellen?" },
      { code: "c2.2", frage: "Bin ich in der Lage, Terminkalender für mich und andere professionell zu führen?" },
      { code: "c2.3", frage: "Kann ich Protokolle fachgerecht führen?" },
      { code: "c2.4", frage: "Gelingt es mir, digitale und analoge Ablagen gewissenhaft zu erstellen, zu bewirtschaften und zu überarbeiten?" },
      { code: "c2.5", frage: "Gehe ich verantwortungsvoll mit betrieblichen Informationen um?" },
    ],
  },
  {
    code: "c3",
    titel: "Betriebliche Prozesse dokumentieren, koordinieren und umsetzen",
    bereich: "c",
    bereichTitel: "Koordinieren von unternehmerischen Arbeitsprozessen",
    bankspezifisch: false,
    leitfragen: [
      { code: "c3.1", frage: "Bin ich in der Lage, Informationen zum Prozess zielführend einzuholen und zu verarbeiten?" },
      { code: "c3.2", frage: "Kann ich vollständige, verständliche und nachvollziehbare Flussdiagramme erstellen?" },
      { code: "c3.3", frage: "Kann ich vollständige, verständliche und nachvollziehbare Prozessbeschreibungen erstellen?" },
      { code: "c3.4", frage: "Gelingt es mir, Personen so zu instruieren, dass sie die Handlung selbständig ausführen können?" },
      { code: "c3.5", frage: "Gelingt es mir, Optimierungsmassnahmen auszuarbeiten und umzusetzen?" },
      { code: "c3.6", frage: "Kann ich realistische Terminpläne für Projekte mit mehreren Beteiligten erstellen und sie verwalten?" },
    ],
  },
  {
    code: "c4",
    titel: "Marketing- und Kommunikationsaktivitäten umsetzen",
    bereich: "c",
    bereichTitel: "Koordinieren von unternehmerischen Arbeitsprozessen",
    bankspezifisch: false,
    leitfragen: [
      { code: "c4.1", frage: "Gelingt es mir, eine umfassende Zielgruppenanalyse für Kommunikationsinhalte durchzuführen?" },
      { code: "c4.2", frage: "Bin ich in der Lage, eine Kommunikationsmassnahme professionell zu planen?" },
      { code: "c4.3", frage: "Kann ich Kommunikationsinhalte professionell erstellen?" },
      { code: "c4.4", frage: "Kann ich Beiträge im Internet professionell erstellen und verwalten (z.B. auf Webseiten und den Sozialen Medien)?" },
      { code: "c4.5", frage: "Gelingt es mir, die Kommunikationsmassnahme fachgerecht abzuschliessen?" },
    ],
  },
  {
    code: "c5",
    titel: "Finanzielle Vorgänge betreuen und kontrollieren",
    bereich: "c",
    bereichTitel: "Koordinieren von unternehmerischen Arbeitsprozessen",
    bankspezifisch: false,
    leitfragen: [
      { code: "c5.1", frage: "Kann ich das Kassenbuch fachgerecht führen?" },
      { code: "c5.2", frage: "Kann ich eingegangene Rechnungen eigenverantwortlich kontrollieren?" },
      { code: "c5.3", frage: "Kann ich eine Rechnung selbstständig und fehlerfrei erstellen?" },
      { code: "c5.4", frage: "Bin ich in der Lage, den betrieblichen Zahlungsprozess kompetent zu unterstützen?" },
      { code: "c5.5", frage: "Kann ich aussagekräftige finanzielle Dokumente (Budgets, Kostenvergleiche oder Abrechnungen) erstellen?" },
    ],
  },
  {
    code: "c6",
    titel: "Aufgaben im finanziellen Rechnungswesen bearbeiten (Option Finanzen)",
    bereich: "c",
    bereichTitel: "Koordinieren von unternehmerischen Arbeitsprozessen",
    bankspezifisch: false,
    leitfragen: [
      { code: "c6.1", frage: "Bin ich in der Lage, einen wirkungsvollen Beitrag zum Jahresabschluss zu leisten?" },
      { code: "c6.2", frage: "Gelingt es mir, buchhalterische Aufgaben rechtskonform auszuführen?" },
    ],
  },
  {
    code: "d1",
    titel: "Anliegen von Kunden oder Lieferanten entgegennehmen",
    bereich: "d",
    bereichTitel: "Gestalten von Kunden- oder Lieferantenbeziehungen",
    bankspezifisch: true,
    leitfragen: [
      { code: "d1.1", frage: "Gestalte ich den Kundenkontakt dienstleistungsorientiert?" },
      { code: "d1.2", frage: "Erfasse ich die Anliegen meines Gegenübers vollumfänglich, um daraus Bedürfnisse abzuleiten?" },
      { code: "d1.3", frage: "Bearbeite ich Kundenbedarf professionell und zielführend?" },
    ],
  },
  {
    code: "d2",
    titel: "Informations- und Beratungsgespräche mit Kunden oder Lieferanten führen",
    bereich: "d",
    bereichTitel: "Gestalten von Kunden- oder Lieferantenbeziehungen",
    bankspezifisch: true,
    leitfragen: [
      { code: "d2.1", frage: "Gelingt es mir Anfragen über digitale Kanäle jederzeit situationsgerecht entgegen zu nehmen, zu beantworten oder weiterzuvermitteln?" },
      { code: "d2.2", frage: "Gelingt es mir Besprechungen über digitale Kanäle konstruktiv auszuwerten?" },
      { code: "d2.3", frage: "Bereite ich Beratungsgespräche über digitale Kanäle umfassend und zielführend vor?" },
      { code: "d2.4", frage: "Führe ich Beratungsgespräche über digitale Kanäle mit allen Kunden fachkundig und professionell?" },
    ],
  },
  {
    code: "d3",
    titel: "Verkaufs- und Verhandlungsgespräche mit Kunden oder Lieferanten führen",
    bereich: "d",
    bereichTitel: "Gestalten von Kunden- oder Lieferantenbeziehungen",
    bankspezifisch: true,
    leitfragen: [
      { code: "d3.1", frage: "Bereite ich alle notwendigen Grundlagen für ein Beratungsgespräch ausreichend vor?" },
      { code: "d3.2", frage: "Gelingt es mir, Beratungsgespräche erfolgsversprechend und dienstleistungsorientiert zu führen?" },
      { code: "d3.3", frage: "Gelingt es mir Verhandlungsgespräche konstruktiv zu führen?" },
      { code: "d3.4", frage: "Gelingt es mir, Beratungs- und Verhandlungsgespräche im richtigen Moment professionell und freundlich abzuschliessen?" },
      { code: "d3.5", frage: "Bereite ich Beratungs- und Verhandlungsgespräche entsprechend dem Ergebnis zielführend nach?" },
      { code: "d3.6", frage: "Gelingt es mir, Beratungs- und Verhandlungsgespräche konstruktiv auszuwerten?" },
    ],
  },
  {
    code: "d4",
    titel: "Beziehungen mit Kunden oder Lieferanten pflegen",
    bereich: "d",
    bereichTitel: "Gestalten von Kunden- oder Lieferantenbeziehungen",
    bankspezifisch: true,
    leitfragen: [
      { code: "d4.1", frage: "Informiere ich mich umfassend darüber, wie ich Beziehungen zu Kunden oder Lieferanten in meinem Betrieb aufbauen und pflegen kann?" },
      { code: "d4.2", frage: "Unterstütze ich den/die Kundenberater/in wirkungsvoll dabei, die Beziehungen im Berufskontext für sein/ihr Gegenüber stets zufriedenstellend und vertrauensfördernd zu gestalten?" },
      { code: "d4.3", frage: "Helfe ich konstruktiv mit, die Beziehung zu meinen Kunden und Lieferanten längerfristig (auf Dauer?) zu pflegen?" },
      { code: "d4.4", frage: "Gelingt es mir, entsprechende Verbesserungsmassnahmen aus dem Kundenfeedback und der Reflexion für die Zukunft abzuleiten und erfolgsversprechend umzusetzen?" },
    ],
  },
  {
    code: "d5",
    titel: "Anspruchsvolle Beratungs-, Verkaufs- und Verhandlungssituationen mit Kunden meistern",
    bereich: "d",
    bereichTitel: "Gestalten von Kunden- oder Lieferantenbeziehungen",
    bankspezifisch: true,
    leitfragen: [
      { code: "d5.1", frage: "Gestalte ich anspruchsvolle Beratungsgespräche professionell?" },
      { code: "d5.2", frage: "Führe ich anspruchsvolle Verkaufsgespräche ergebnisorientiert?" },
      { code: "d5.3", frage: "Gelingt es mir, anspruchsvolle Verhandlungsgespräche systematisch zu führen?" },
    ],
  },
  {
    code: "d6",
    titel: "Anspruchsvolle Beratungs-, Verkaufs- und Verhandlungssituationen mit Lieferanten meistern",
    bereich: "d",
    bereichTitel: "Gestalten von Kunden- oder Lieferantenbeziehungen",
    bankspezifisch: true,
    leitfragen: [
      { code: "d6.1", frage: "Gestalte ich anspruchsvolle Beratungsgespräche in der Fremdsprache professionell?" },
      { code: "d6.2", frage: "Führe ich anspruchsvolle Verkaufsgespräche in der Fremdsprache ergebnisorientiert?" },
      { code: "d6.3", frage: "Gelingt es mir, anspruchsvolle Verhandlungsgespräche in der Fremdsprache systematisch zu führen?" },
    ],
  },
  {
    code: "e1",
    titel: "Applikationen im kaufmännischen Bereich anwenden",
    bereich: "e",
    bereichTitel: "Einsetzen von Technologien der digitalen Arbeitswelt",
    bankspezifisch: false,
    leitfragen: [],
  },
  {
    code: "e2",
    titel: "Informationen im wirtschaftlichen und kaufmännischen Bereich recherchieren",
    bereich: "e",
    bereichTitel: "Einsetzen von Technologien der digitalen Arbeitswelt",
    bankspezifisch: false,
    leitfragen: [
      { code: "e2.4", frage: "Dokumentiere ich meine Rechercheergebnisse in geeigneter Weise?" },
      { code: "e2.5", frage: "Gelingt es mir, mein eigenes Vorgehen laufend zu analysieren und zu optimieren?" },
    ],
  },
  {
    code: "e3",
    titel: "Markt- und betriebsbezogene Statistiken und Daten auswerten und aufbereiten",
    bereich: "e",
    bereichTitel: "Einsetzen von Technologien der digitalen Arbeitswelt",
    bankspezifisch: false,
    leitfragen: [
      { code: "e3.3", frage: "Bin ich in der Lage, quantitative Auswertungen sauber durchzuführen?" },
      { code: "e3.4", frage: "Interpretiere ich Ergebnisse aus Analysen und Auswertungen plausibel?" },
    ],
  },
  {
    code: "e4",
    titel: "Betriebsbezogene Inhalte multimedial aufbereiten",
    bereich: "e",
    bereichTitel: "Einsetzen von Technologien der digitalen Arbeitswelt",
    bankspezifisch: false,
    leitfragen: [
      { code: "e4.1", frage: "Bin ich in der Lage, die Ansprüche an eine multimediale Aufbereitung vollständig zu klären?" },
      { code: "e4.2", frage: "Gelingt es mir, Inhalte für eine Medienaufbereitung vollständig abzuholen?" },
      { code: "e4.3", frage: "Bereite ich multimediale Inhalte gemäss betrieblichen Standards professionell auf?" },
      { code: "e4.4", frage: "Bin ich in der Lage, geeignete Vorlagen für Medienformate zu erstellen?" },
      { code: "e4.5", frage: "Gelingt es mir, die Qualität von betrieblichen Medienbeiträgen zuverlässig zu überprüfen?" },
    ],
  },
  {
    code: "e5",
    titel: "Technologien im kaufmännischen Bereich einrichten und betreuen (Option Tech)",
    bereich: "e",
    bereichTitel: "Einsetzen von Technologien der digitalen Arbeitswelt",
    bankspezifisch: false,
    leitfragen: [
      { code: "e5.1", frage: "Gehe ich fachkundig mit Datenbanken und Inhaltsverwaltungssystemen in meinem Betrieb um?" },
      { code: "e5.2", frage: "Führe ich neue Applikationen in meinem Team verständlich ein?" },
      { code: "e5.3", frage: "Leiste ich hilfsbereiten Support bei meinen Arbeitskollegen?" },
      { code: "e5.4", frage: "Setze ich mich aktiv mit Angeboten von technischer Infrastruktur auseinander?" },
    ],
  },
  {
    code: "e6",
    titel: "Grosse Datenmengen im Unternehmen auftragsbezogen auswerten (Option Tech)",
    bereich: "e",
    bereichTitel: "Einsetzen von Technologien der digitalen Arbeitswelt",
    bankspezifisch: false,
    leitfragen: [
      { code: "e6.1", frage: "Bereite ich die Auswertung grosser Datenmengen ganzheitlich vor?" },
      { code: "e6.2", frage: "Gelingt es mir, grosse Datenmengen aussagekräftig auszuwerten?" },
      { code: "e6.3", frage: "Bereite ich meine Ergebnisse adressatengerecht und verständlich auf?" },
    ],
  },
];
