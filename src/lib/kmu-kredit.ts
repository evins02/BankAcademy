import { type BlankokreditCase, type BlankokreditLevelConfig } from "./blankokredit";

export const KMU_MERKSATZ =
  "KMU-Kredit = Kreditart zum Zweck, Sicherheiten zur Deckung, Cashflow zur Bedienung.";

export const KMU_LEVELS: BlankokreditLevelConfig[] = [
  {
    level: 1,
    label: "Grundlagen",
    badgeVariant: "green",
    cases: [
      {
        id: "kmu-1.1",
        level: 1,
        briefing:
          "Schreinerei Gerber AG, Umsatz CHF 2.4 Mio., möchte eine neue CNC-Fräse für CHF 180'000 finanzieren und gleichzeitig einen Puffer für den Rohstoffeinkauf von CHF 40'000 sicherstellen.",
        question: "Welche Kreditkombination empfiehlst du?",
        options: [
          { key: "A", text: "Einen Betriebskredit CHF 220'000 für beides – einfacher in der Verwaltung." },
          { key: "B", text: "Investitionskredit CHF 180'000 (5 Jahre) + Kontokorrentlimite CHF 40'000 – jedes Instrument für seinen Zweck." },
          { key: "C", text: "Hypothek auf die Betriebsliegenschaft CHF 220'000 – günstiger Zins." },
          { key: "D", text: "Leasing für die Maschine, kein Kontokorrent nötig." },
        ],
        correct: "B",
        feedback:
          "Investitionskredit passt zur Maschine: Amortisation über Nutzungsdauer (5 Jahre). Kontokorrent deckt kurzfristigen Liquiditätsbedarf flexibel. Jedes Instrument für seinen Zweck – das ist bankfachlich sauber.",
        concepts: ["kreditarten", "investitionskredit", "kontokorrent"],
      },
      {
        id: "kmu-1.2",
        level: 1,
        briefing:
          "Bauunternehmer Hess AG mit stark saisonalem Geschäft: volle Auftragsbücher im Sommer, tiefe Einnahmen im Winter. Er fragt nach einem Kontokorrentkredit CHF 150'000.",
        question: "Was ist das Hauptmerkmal eines Kontokorrentkredits?",
        options: [
          { key: "A", text: "Feste Amortisation über 5 Jahre, wie beim Investitionskredit." },
          { key: "B", text: "Revolvierende Kreditlinie: kann jederzeit bezogen und zurückbezahlt werden; Zinsen nur auf den effektiv bezogenen Betrag." },
          { key: "C", text: "Der Betrag wird einmalig ausbezahlt und am Ende der Laufzeit zurückbezahlt." },
          { key: "D", text: "Kontokorrentkredite sind nur für Privatpersonen möglich." },
        ],
        correct: "B",
        feedback:
          "Kontokorrent = revolvierende Kreditlinie. Die Firma bezieht bei Bedarf und zahlt zurück, wenn die Liquidität wieder da ist. Zinsen laufen nur auf den tatsächlich in Anspruch genommenen Betrag. Ideal für saisonale Schwankungen.",
        concepts: ["kontokorrent", "kreditarten"],
      },
      {
        id: "kmu-1.3",
        level: 1,
        briefing:
          "Neukunde Müller GmbH beantragt einen Investitionskredit CHF 300'000. Du bereitest die Unterlagenliste für das Dossier vor.",
        question: "Welche Unterlagen sind für einen KMU-Kredit zwingend einzuholen?",
        options: [
          { key: "A", text: "Nur Handelsregisterauszug und Personalausweis des Inhabers." },
          { key: "B", text: "Jahresabschlüsse letzte 3 Jahre, HR-Auszug (< 3 Monate), Betreibungsregister Firma und Inhaber, Steuerdokumente." },
          { key: "C", text: "Nur der letzte Jahresabschluss und aktuelle Kontoauszüge." },
          { key: "D", text: "Unter CHF 500'000 braucht es keine Unterlagen – mündliche Auskunft reicht." },
        ],
        correct: "B",
        feedback:
          "Standardunterlagen KMU-Kredit: 3 Jahresabschlüsse (Trend sichtbar), HR-Auszug aktuell, Betreibungsregister Firma und Zeichnungsberechtigte, Steuerdokumente. Bei Sicherheiten (Grundpfand, Zession) kommen weitere hinzu.",
        concepts: ["unterlagen", "kreditdossier"],
      },
      {
        id: "kmu-1.4",
        level: 1,
        briefing:
          "Startup-Gründer David Koch, 2 Jahre Betriebsgeschichte, EK-Quote 12%, gute Zukunftsperspektiven aber wenig Sicherheiten. Er braucht CHF 200'000 Investitionskredit.",
        question: "Welches Instrument kann fehlende Sicherheiten ersetzen?",
        options: [
          { key: "A", text: "Persönliche Bürgschaft des Gründers – das reicht immer aus." },
          { key: "B", text: "Bürgschaftsgenossenschaft (z.B. GO! oder bürgschaftsgenossenschaft.ch): staatlich mitgetragen, übernimmt bis 65% der Bürgschaft." },
          { key: "C", text: "Startups erhalten grundsätzlich keine Bankkredite." },
          { key: "D", text: "Ohne ausreichende Sicherheiten ist die Ablehnung zwingend." },
        ],
        correct: "B",
        feedback:
          "Bürgschaftsgenossenschaften sind eine staatlich geförderte Lösung für KMU mit Potenzial aber unzureichenden Sicherheiten. Die Genossenschaft übernimmt bis 65% der Bürgschaft – das reduziert das Bankrisiko erheblich und ermöglicht die Kreditvergabe.",
        concepts: ["buergschaftsgenossenschaft", "sicherheiten"],
      },
      {
        id: "kmu-1.5",
        level: 1,
        briefing: "Schäfer Transport AG reicht Jahresabschluss ein.",
        inputData: [
          { label: "Bilanzsumme", value: "CHF 1'800'000" },
          { label: "Eigenkapital", value: "CHF 162'000" },
        ],
        calculator: [
          {
            rows: [
              { type: "data", label: "Eigenkapital", value: "CHF 162'000" },
              { type: "data", label: "÷ Bilanzsumme", value: "CHF 1'800'000" },
              { type: "divider" },
              { type: "total", label: "EK-Quote", value: "9%" },
            ],
            verdict: { text: "9% – deutlich unter Richtwert 20–30% ⚠️", ok: false, warning: true },
          },
        ],
        question: "Wie bewertest du eine EK-Quote von 9% im Kreditentscheid?",
        options: [
          { key: "A", text: "Gut – für ein Transportunternehmen ist 9% branchenüblich." },
          { key: "B", text: "Zu hoch – das Unternehmen nutzt sein Kapital ineffizient." },
          { key: "C", text: "Kritisch tief. Richtwert liegt bei 20–30%. Kreditbewilligung braucht kompensierende Faktoren: starke Sicherheiten, solider Cashflow oder Bürgschaft." },
          { key: "D", text: "Irrelevant – nur der Cashflow zählt." },
        ],
        correct: "C",
        feedback:
          "EK-Quote Richtwert für gesunde KMU: 20–30%. Bei 9% ist das Eigenkapitalpolster sehr dünn. Kreditbewilligung möglich, aber nur mit kompensierenden Faktoren: starke Sicherheiten, guter Cashflow-Nachweis, persönliche Bürgschaft des Inhabers oder Bürgschaftsgenossenschaft.",
        concepts: ["ek-quote", "bilanzanalyse"],
      },
      {
        id: "kmu-1.6",
        level: 1,
        briefing:
          "Elektro Brunner GmbH möchte einen Lieferwagen (CHF 58'000) finanzieren. Der Kundenberater stellt drei Optionen vor: Bankkredit, Leasing oder Kauf aus eigenen Mitteln.",
        question: "Was ist der Kernunterschied zwischen Bankkredit und Leasing bei Investitionen?",
        options: [
          { key: "A", text: "Leasing ist immer günstiger als ein Bankkredit." },
          { key: "B", text: "Bankkredit: Fahrzeug gehört der Firma, erscheint in der Bilanz, Zins auf sinkendes Restkapital. Leasing: Fahrzeug bleibt Eigentum des Leasinggebers, keine Bilanzeintragung, monatliche Rate konstant – aber keine Eigentumsbildung." },
          { key: "C", text: "Kein Unterschied – beide Instrumente sind rechtlich identisch." },
          { key: "D", text: "Leasing ist nur für Privatkunden, Bankkredit nur für Unternehmen zulässig." },
        ],
        correct: "B",
        feedback:
          "Bankkredit: Eigentum geht sofort auf die Firma über, das Fahrzeug erscheint als Aktivum in der Bilanz, der Zins läuft auf das sinkende Restkapital. Leasing: Das Fahrzeug bleibt wirtschaftlich und rechtlich beim Leasinggeber, die Firma nutzt es nur. Keine Bilanzeintragung, konstante Rate. Nachteil: keine Eigentumsbildung, bei Kündigung keine Restwertzahlung. KMU wählen Leasing oft für Flotten und Maschinen, da es die Bilanz entlastet.",
        concepts: ["leasing", "investitionskredit", "bilanz"],
      },
      {
        id: "kmu-1.7",
        level: 1,
        briefing:
          "Zimmerei Keller AG plant einen Neubau ihrer Werkstatt für CHF 950'000. Der Bauunternehmer beginnt in 3 Monaten. Das Geld wird nicht auf einmal, sondern in mehreren Tranchen während der Bauphase benötigt.",
        question: "Welches Kreditprodukt ist für eine Baufinanzierung geeignet und wie funktioniert es?",
        options: [
          { key: "A", text: "Investitionskredit CHF 950'000 direkt auszahlen – einfacher zu verwalten." },
          { key: "B", text: "Baukredit: Die Bank stellt eine Kreditlimite bereit, die tranchenweise je nach Baufortschritt abgerufen wird. Zinsen laufen nur auf dem abgerufenen Betrag. Nach Bauvollendung wird in Hypothek umgewandelt." },
          { key: "C", text: "Kontokorrentkredit – kann jederzeit für Bauausgaben verwendet werden." },
          { key: "D", text: "Keine Banklösung – Baufinanzierungen müssen vollständig aus EK finanziert werden." },
        ],
        correct: "B",
        feedback:
          "Baukredit = Spezialprodukt für Bauprojekte. Die Bank stellt eine Gesamtlimite bereit, die in Abhängigkeit vom dokumentierten Baufortschritt abgerufen wird. Zinsen laufen nur auf dem tatsächlich bezogenen Betrag – das spart Zinsen in der Anfangsphase. Nach Bauvollendung und Abnahme wird der Baukredit in eine langfristige Hypothek umgewandelt. Zwischenzinsen während der Bauphase sind steuerlich abziehbar.",
        concepts: ["baukredit", "kreditarten", "hypothek"],
      },
      {
        id: "kmu-1.8",
        level: 1,
        briefing:
          "Spengler Huber AG nimmt einen Investitionskredit CHF 480'000 über 8 Jahre auf. Der Kundenberater erklärt die Amortisationsform.",
        question: "Was ist der Unterschied zwischen direkter und indirekter Amortisation?",
        options: [
          { key: "A", text: "Kein Unterschied – die Gesamtkosten sind immer identisch." },
          { key: "B", text: "Direkte Amortisation: Kredit wird laufend zurückgezahlt, Schuld sinkt, Zinsbelastung nimmt ab. Indirekte Amortisation: Kreditschuld bleibt konstant, Sparbetrag geht in Vorsorge (3a/Lebensversicherung), die am Ende zur Tilgung eingesetzt wird." },
          { key: "C", text: "Indirekte Amortisation bedeutet, der Kredit wird in zwei Hälften aufgeteilt und separat zurückgezahlt." },
          { key: "D", text: "Direkte Amortisation ist verboten bei Unternehmenskrediten." },
        ],
        correct: "B",
        feedback:
          "Direkte Amortisation: Regelmässige Rückzahlungen reduzieren die Schuld. Zinsbelastung sinkt laufend. Indirekte Amortisation: Schuld bleibt konstant, Gegenwert wird in ein Vehikel (Lebensversicherung, Säule 3a) angespart, das am Ende des Kreditvertrags zur Tilgung verwendet wird. Indirekte Amortisation ist im KMU-Bereich seltener als bei Hypotheken – dort ist sie steueroptimierend, weil die volle Hypothekarzinsbelastung absetzbar bleibt.",
        concepts: ["amortisation", "investitionskredit", "tilgung"],
      },
      {
        id: "kmu-1.9",
        level: 1,
        briefing:
          "Kundin Sandra Wyss (Inhaberin einer Physiotherapiepraxis) fragt: «Was genau ist ein Schuldbrief und warum braucht die Bank diesen bei einer Hypothek?»",
        question: "Was erklärt der Kundenberater?",
        options: [
          { key: "A", text: "Ein Schuldbrief ist ein Kreditvertrag – er ersetzt den Hypothekarvertrag." },
          { key: "B", text: "Ein Schuldbrief ist ein grundpfandrechtliches Wertpapier. Er verbrieft eine Grundpfandschuld auf der Liegenschaft und gibt der Bank das Recht, im Verwertungsfall als Grundpfandgläubigerin aufzutreten. Die Liegenschaft dient als Sicherheit für den Kredit." },
          { key: "C", text: "Ein Schuldbrief ist eine persönliche Bürgschaft des Eigentümers." },
          { key: "D", text: "Schuldbriefe sind nur bei Privathypotheken nötig, nicht bei Gewerbeliegenschaften." },
        ],
        correct: "B",
        feedback:
          "Schuldbrief (Art. 842 ff. ZGB): Grundpfandrechtliches Wertpapier, das auf dem Grundbuch einer Liegenschaft eingetragen wird. Er verbrieft eine Schuld und sichert die Bank als Pfandgläubigerin. Bei Zahlungsausfall kann die Bank die Liegenschaft verwerten und aus dem Erlös befriedigt werden. In der Schweiz werden Schuldbriefe heute fast ausschliesslich als Register-Schuldbriefe (elektronisch im Grundbuch) ausgestellt – kein physisches Papier mehr.",
        concepts: ["schuldbrief", "grundpfand", "hypothek", "sicherheiten"],
      },
      {
        id: "kmu-1.10",
        level: 1,
        briefing:
          "Neukunde Oliver Gross möchte wissen: «Welche Sicherheiten gibt es überhaupt? Was kann ich der Bank anbieten?»",
        question: "Welche Sicherheitenkategorien gibt es im KMU-Kreditgeschäft?",
        options: [
          { key: "A", text: "Nur Grundpfand (Liegenschaft) – das ist die einzige anerkannte Sicherheit." },
          { key: "B", text: "Grundpfand (Liegenschaften), Bürgschaft (persönlich oder Gesellschaft), Zession (Kundenforderungen), Faustpfand (Maschinen, Fahrzeuge, Wertpapiere), Verpfändung Lebensversicherung." },
          { key: "C", text: "Nur Bargeld oder Festgeldkonten." },
          { key: "D", text: "Sicherheiten sind optional – bei guter EK-Quote braucht es keine." },
        ],
        correct: "B",
        feedback:
          "Sicherheitenkategorien im KMU-Bereich: 1) Grundpfand: Liegenschaften (Schuldbrief), stärkste Sicherheit. 2) Bürgschaft: persönliche Solidarbürgschaft des Inhabers oder Bürgschaftsgenossenschaft. 3) Zession: Abtretung von Kundenforderungen. 4) Faustpfand: Verpfändung von Maschinen, Fahrzeugen oder Wertschriften. 5) Lebensversicherung: Rückkaufswert als Sicherheit. Kombination mehrerer Sicherheiten ist häufig und stärkt das Kreditdossier.",
        concepts: ["sicherheiten", "grundpfand", "buergschaft", "zession"],
      },
    ] as BlankokreditCase[],
  },
  {
    level: 2,
    label: "Anwendung",
    badgeVariant: "orange",
    cases: [
      {
        id: "kmu-2.1",
        level: 2,
        briefing: "Bauer AG, Maschinenbau, reicht Bilanz ein.",
        inputData: [
          { label: "Bilanzsumme", value: "CHF 3'200'000" },
          { label: "Fremdkapital", value: "CHF 2'560'000" },
          { label: "Eigenkapital", value: "CHF 640'000" },
        ],
        calculator: [
          {
            rows: [
              { type: "data", label: "Eigenkapital", value: "CHF 640'000" },
              { type: "data", label: "÷ Bilanzsumme", value: "CHF 3'200'000" },
              { type: "divider" },
              { type: "total", label: "EK-Quote", value: "20%" },
            ],
            verdict: { text: "20% – am Richtwert ✅", ok: true },
          },
        ],
        question: "Was folgst du aus einer EK-Quote von 20% für den Kreditentscheid?",
        options: [
          { key: "A", text: "Solide Basis. In Verbindung mit positivem Cashflow und stabilen Perspektiven kann der Kredit bewilligt werden." },
          { key: "B", text: "Zu hoch – das Unternehmen braucht mehr Fremdfinanzierung." },
          { key: "C", text: "Zu tief – Ablehnung zwingend." },
          { key: "D", text: "Irrelevant – nur der Jahresgewinn zählt." },
        ],
        correct: "A",
        feedback:
          "20% EK-Quote liegt genau am Richtwert. Kein Luxuspuffer, aber eine solide Basis. Bei positivem Cashflow und stabilen Perspektiven ist eine Kreditbewilligung gut vertretbar.",
        concepts: ["ek-quote", "kreditentscheid"],
      },
      {
        id: "kmu-2.2",
        level: 2,
        briefing: "Weiss Holding GmbH, Dienstleistungsbranche, hat Kreditgespräch.",
        inputData: [
          { label: "Nettoverschuldung (Net Debt)", value: "CHF 4'200'000" },
          { label: "EBITDA", value: "CHF 1'400'000" },
        ],
        calculator: [
          {
            rows: [
              { type: "data", label: "Net Debt", value: "CHF 4'200'000" },
              { type: "data", label: "÷ EBITDA", value: "CHF 1'400'000" },
              { type: "divider" },
              { type: "total", label: "Net Debt / EBITDA", value: "3.0×" },
            ],
            verdict: { text: "3.0× – am Richtwert ⚠️", ok: true, warning: true },
          },
        ],
        question: "Was bedeutet Net Debt/EBITDA von 3.0×?",
        options: [
          { key: "A", text: "Kritisch – Unternehmen ist technisch überschuldet." },
          { key: "B", text: "Richtwert ≤3× knapp erreicht. Kredit bewilligbar, aber Covenants sinnvoll und Lage muss beobachtet werden." },
          { key: "C", text: "Ausgezeichnet – unter 5× ist grundsätzlich problemlos." },
          { key: "D", text: "Nicht relevant für Dienstleistungsunternehmen." },
        ],
        correct: "B",
        feedback:
          "Richtwert Net Debt/EBITDA: ≤3× gilt als tragbar. Bei genau 3.0× ist die Grenze erreicht. Kreditbewilligung möglich, aber mit Covenant (z.B. «Net Debt/EBITDA darf 3.5× nicht überschreiten») und engem Monitoring.",
        concepts: ["verschuldungsgrad", "ebitda", "covenants"],
      },
      {
        id: "kmu-2.3",
        level: 2,
        briefing:
          "Heinz AG hat Kundenforderungen CHF 800'000 und beantragt Kontokorrent CHF 500'000. Keine Immobilien verfügbar als Sicherheit.",
        question: "Was bedeutet eine Sicherungsabtretung (Zession) der Kundenforderungen?",
        options: [
          { key: "A", text: "Die Bank kauft die Forderungen definitiv und sofort auf." },
          { key: "B", text: "Die Heinz AG tritt ihre Forderungen sicherungshalber an die Bank ab. Solange der Kredit bedient wird, ändert sich nichts. Im Verwertungsfall kann die Bank die Forderungen direkt einziehen." },
          { key: "C", text: "Ab sofort müssen alle Kunden der Heinz AG direkt an die Bank zahlen." },
          { key: "D", text: "Zession ist nur bei Privatpersonen möglich." },
        ],
        correct: "B",
        feedback:
          "Zession (Sicherungsabtretung) = Kundenforderungen werden als Sicherheit abgetreten, ohne dass Kunden davon erfahren. Erst im Verwertungsfall tritt die Bank aktiv ein. Wichtig: Bonität der Schuldner (Debitorenqualität) muss geprüft werden.",
        concepts: ["zession", "sicherheiten", "kontokorrent"],
      },
      {
        id: "kmu-2.4",
        level: 2,
        briefing: "Müller Bau GmbH beantragt Investitionskredit CHF 600'000, Zinssatz 3.5% p.a., Laufzeit 5 Jahre.",
        inputData: [
          { label: "EBITDA", value: "CHF 280'000 / Jahr" },
          { label: "Jahresamortisation", value: "CHF 120'000 (600'000 ÷ 5)" },
          { label: "Jahreszinsen (ca.)", value: "CHF 21'000 (3.5% × 600'000 / 2)" },
          { label: "Total Schuldendienst", value: "CHF 141'000 / Jahr" },
        ],
        calculator: [
          {
            heading: "Schuldendienstdeckungsgrad (DSCR)",
            rows: [
              { type: "data", label: "EBITDA", value: "CHF 280'000" },
              { type: "data", label: "÷ Schuldendienst", value: "CHF 141'000" },
              { type: "divider" },
              { type: "total", label: "DSCR", value: "1.99×" },
            ],
            verdict: { text: "1.99× – über Richtwert ≥1.2× ✅", ok: true },
          },
        ],
        question: "Was bedeutet ein DSCR von 1.99× für den Kreditentscheid?",
        options: [
          { key: "A", text: "Ablehnen – DSCR muss mindestens 3.0× betragen." },
          { key: "B", text: "Bewilligen – Richtwert liegt bei ≥1.2× bis 1.5×. Bei 1.99× ist ein komfortabler Puffer vorhanden." },
          { key: "C", text: "DSCR ist nicht relevant – nur die EK-Quote zählt." },
          { key: "D", text: "Ablehnen – unter 2.0× ist ein Kredit immer zu verweigern." },
        ],
        correct: "B",
        feedback:
          "DSCR (Debt Service Coverage Ratio) misst, wie oft der operative Cashflow den Schuldendienst deckt. Richtwert: ≥1.2× bis 1.5×. Bei 1.99× kann das Unternehmen Zins und Amortisation gut bedienen, auch wenn der Gewinn leicht sinkt. Kreditbewilligung empfohlen.",
        concepts: ["dscr", "cashflow", "kreditentscheid"],
      },
      {
        id: "kmu-2.5",
        level: 2,
        briefing:
          "Zimmermann AG: EK-Quote 8%, aber stabiler EBITDA CHF 320'000, volle Auftragsbücher, Inhaber Thomas Zimmermann (55) bietet persönliche Bürgschaft an.",
        question: "Was ist die richtige Vorgehensweise bei schwacher EK-Quote mit kompensierenden Faktoren?",
        options: [
          { key: "A", text: "Sofort ablehnen – unter 10% EK-Quote ist Ablehnung zwingend." },
          { key: "B", text: "Bewilligen ohne Auflagen – EBITDA ist stark genug." },
          { key: "C", text: "Strukturierter Entscheid: Kredit bewilligen mit Auflagen (persönliche Bürgschaft, EK-Aufbauplan, jährliches Reporting), Überprüfung in 12 Monaten." },
          { key: "D", text: "Erst eine Kapitalerhöhung abwarten, dann neu einreichen." },
        ],
        correct: "C",
        feedback:
          "Schwache EK-Quote schliesst einen Kredit nicht automatisch aus, wenn kompensierende Faktoren vorliegen. Richtiges Vorgehen: Bewilligung mit Auflagen – persönliche Bürgschaft des Inhabers, nachweisbarer EK-Aufbauplan, Pflicht zur Einreichung des Jahresabschlusses. Monitoring ist entscheidend.",
        concepts: ["kreditstrukturierung", "auflagen", "buergschaft"],
      },
      {
        id: "kmu-2.6",
        level: 2,
        briefing: "Gross GmbH, Grosshandel, zur Beurteilung des Liquiditätsbedarfs.",
        inputData: [
          { label: "Forderungen aus Lieferungen", value: "CHF 620'000" },
          { label: "Vorräte", value: "CHF 380'000" },
          { label: "Verbindlichkeiten aus Lieferungen", value: "CHF 290'000" },
        ],
        calculator: [
          {
            heading: "Netto-Umlaufvermögen (Net Working Capital)",
            rows: [
              { type: "data", label: "Forderungen", value: "CHF 620'000" },
              { type: "data", label: "+ Vorräte", value: "CHF 380'000" },
              { type: "data", label: "− Verbindlichkeiten", value: "CHF 290'000" },
              { type: "divider" },
              { type: "total", label: "Net Working Capital", value: "CHF 710'000" },
            ],
            verdict: { text: "CHF 710'000 laufend gebundenes Kapital", ok: true },
          },
        ],
        question: "Was sagt das Net Working Capital über den Kreditbedarf aus?",
        options: [
          { key: "A", text: "NWC ist irrelevant – nur der Jahresgewinn zählt." },
          { key: "B", text: "CHF 710'000 sind dauerhaft im Umlaufvermögen gebunden. Das ist der strukturelle Finanzierungsbedarf, den die Bank mit einem Kontokorrent oder Betriebskredit decken muss." },
          { key: "C", text: "Je höher das NWC, desto schlechter – das Unternehmen hortet zu viel Kapital." },
          { key: "D", text: "NWC bedeutet, das Unternehmen hat CHF 710'000 frei verfügbar." },
        ],
        correct: "B",
        feedback:
          "Net Working Capital (NWC) = Forderungen + Vorräte − kurzfristige Verbindlichkeiten. Es zeigt, wie viel Kapital dauerhaft im operativen Umlauf gebunden ist. Ein hohes NWC bedeutet: Die Firma muss diesen Betrag kontinuierlich vorfinanzieren. Das ist der strukturelle Bedarf für einen Kontokorrentkredit oder Betriebskredit. Für die Bank ist das NWC ein wichtiger Anhaltspunkt für die richtige Kreditdimensionierung.",
        concepts: ["working-capital", "kontokorrent", "liquiditaet"],
      },
      {
        id: "kmu-2.7",
        level: 2,
        briefing: "Handel Müller AG, Jahresumsatz CHF 6.4 Mio., durchschnittliche Forderungen CHF 800'000.",
        inputData: [
          { label: "Jahresumsatz", value: "CHF 6'400'000" },
          { label: "Durchschnittliche Debitorenforderungen", value: "CHF 800'000" },
        ],
        calculator: [
          {
            heading: "Debitorenlaufzeit (DSO – Days Sales Outstanding)",
            rows: [
              { type: "data", label: "Forderungen", value: "CHF 800'000" },
              { type: "data", label: "÷ Jahresumsatz", value: "CHF 6'400'000" },
              { type: "data", text: "× 365 Tage" },
              { type: "divider" },
              { type: "total", label: "DSO", value: "45.6 Tage" },
            ] as { type: string; label?: string; value?: string; text?: string }[],
            verdict: { text: "45.6 Tage – übliche Zahlungsziele 30 Tage ⚠️", ok: false, warning: true },
          },
        ],
        question: "Was bedeutet eine DSO von 45.6 Tagen und welche Konsequenz zieht die Bank?",
        options: [
          { key: "A", text: "Ausgezeichnet – über 30 Tage ist ein Zeichen für treue Stammkunden." },
          { key: "B", text: "DSO über 30 Tage zeigt verzögerte Zahlungseingänge. Das erhöht den Liquiditätsdruck und den Kontokorrentbedarf. Bank prüft Debitorenmanagement und Forderungsausfallrisiko." },
          { key: "C", text: "DSO ist nur für Grossunternehmen relevant." },
          { key: "D", text: "Bei CHF 800'000 Forderungen ist alles automatisch in Ordnung." },
        ],
        correct: "B",
        feedback:
          "DSO (Days Sales Outstanding) = (Forderungen ÷ Umsatz) × 365. Zeigt, wie viele Tage im Durchschnitt bis zur Zahlung vergehen. Bei 45.6 Tagen gegenüber einem marktüblichen Zahlungsziel von 30 Tagen deutet das auf verzögertes Inkasso oder säumige Kunden hin. Konsequenz für Bank: Höherer struktureller Kontokorrentbedarf, Bonitätsrisiko der Schuldner prüfen, bei Zession die Qualität der Debitoren bewerten.",
        concepts: ["dso", "debitorenlaufzeit", "liquiditaet", "kontokorrent"],
      },
      {
        id: "kmu-2.8",
        level: 2,
        briefing: "Druckerei Schär AG reicht Jahresrechnung ein. Freier Cashflow nicht direkt ausgewiesen.",
        inputData: [
          { label: "Jahresgewinn", value: "CHF 85'000" },
          { label: "Abschreibungen", value: "CHF 140'000" },
          { label: "Rückstellungen (netto Zunahme)", value: "CHF 15'000" },
        ],
        calculator: [
          {
            heading: "Vereinfachter operativer Cashflow",
            rows: [
              { type: "data", label: "Jahresgewinn", value: "CHF 85'000" },
              { type: "data", label: "+ Abschreibungen", value: "CHF 140'000" },
              { type: "data", label: "+ Rückstellungen", value: "CHF 15'000" },
              { type: "divider" },
              { type: "total", label: "Operativer Cashflow", value: "CHF 240'000" },
            ],
            verdict: { text: "CHF 240'000 – deutlich mehr als Gewinn ✅", ok: true },
          },
        ],
        question: "Warum ist der operative Cashflow CHF 240'000 und nicht nur CHF 85'000?",
        options: [
          { key: "A", text: "Der Cashflow ist falsch berechnet – er kann nie höher sein als der Gewinn." },
          { key: "B", text: "Abschreibungen und Rückstellungen sind buchhalterischer Aufwand ohne direkte Geldabfluss. Sie werden zum Gewinn addiert, um den echten Geldfluss aus der Geschäftstätigkeit zu zeigen." },
          { key: "C", text: "Abschreibungen bedeuten, das Unternehmen hat diesen Betrag auf dem Konto." },
          { key: "D", text: "Rückstellungen erhöhen den Cashflow nicht – nur realisierte Zahlungen zählen." },
        ],
        correct: "B",
        feedback:
          "Cashflow-Schätzung (indirekte Methode): Gewinn + Abschreibungen + Rückstellungszunahme = operativer Cashflow. Abschreibungen sind nicht-liquiditätswirksamer Aufwand: Sie mindern den Gewinn, fliessen aber als Geld nicht ab. Der tatsächlich verfügbare Geldfluss ist daher oft deutlich grösser als der Buchgewinn. Wichtig für Kreditentscheid: Der Cashflow – nicht der Gewinn – ist die Grundlage für die DSCR-Berechnung.",
        concepts: ["cashflow", "abschreibungen", "dscr"],
      },
      {
        id: "kmu-2.9",
        level: 2,
        briefing:
          "Gipser Ammann AG, Baubranche. Die Bank prüft den Kreditantrag und bewertet neben den Kennzahlen auch das Branchenrisiko. Die Baubranche gilt als zyklisch und konjunkturabhängig.",
        question: "Wie beeinflusst das Branchenrisiko den Kreditentscheid und das Rating?",
        options: [
          { key: "A", text: "Branchenrisiko hat keinen Einfluss – nur die Zahlen des einzelnen Unternehmens zählen." },
          { key: "B", text: "Branchen mit hohem zyklischen Risiko (Bau, Tourismus, Gastronomie) erhalten im Rating einen Risikomalus. Das kann die Kreditkonditionen (Zinsen, Limits) verschlechtern, auch wenn das einzelne Unternehmen gut dasteht." },
          { key: "C", text: "Branchen mit hohem Risiko erhalten automatisch günstigere Zinsen als Ausgleich." },
          { key: "D", text: "Branchenrisiko ist nur bei Auslandskrediten relevant." },
        ],
        correct: "B",
        feedback:
          "Branchenrisiko ist ein wichtiger Bestandteil jedes KMU-Ratings. Banken klassifizieren Branchen nach ihrer Konjunkturabhängigkeit und historischen Ausfallquoten. Die Baubranche, Tourismus, Gastronomie und Detailhandel gelten als höheres Risiko. Dieser «Industry Factor» fliesst ins interne Rating ein – mit direktem Einfluss auf die risikogewichteten Aktiven, den Zinssatz und die bewilligten Limite. Ein starkes Unternehmen in einer schwachen Branche kann durch diesen Faktor trotzdem einen Malus erhalten.",
        concepts: ["branchenrisiko", "kreditrating", "kreditentscheid"],
      },
      {
        id: "kmu-2.10",
        level: 2,
        briefing:
          "Maler Schneider GmbH, saisonales Geschäft (Hauptsaison April–Oktober), beantragt Kontokorrent CHF 180'000. Der Kundenberater analysiert, wie hoch der Kontokorrent wirklich sein sollte.",
        question: "Wie bestimmt die Bank die richtige Kontokorrenthöhe für ein saisonales Geschäft?",
        options: [
          { key: "A", text: "Immer ein Pauschalbetrag von CHF 100'000 – das ist Marktstandard." },
          { key: "B", text: "Analyse des saisonalen Liquiditätsbedarfs: maximale Unterdeckung im Jahresverlauf (tiefster Kassenstand) bestimmt die benötigte Limite. Dazu Sicherheitspuffer von 10–20%." },
          { key: "C", text: "10% des Jahresumsatzes als Faustregel – unabhängig von Saisonalität." },
          { key: "D", text: "Kontokorrent sollte immer gleich gross sein wie der Jahresgewinn." },
        ],
        correct: "B",
        feedback:
          "Korrekte Dimensionierung: Die Bank lässt sich den monatlichen Liquiditätsplan vorlegen. Der tiefste Kassenstand im Jahr (typisch im Winter für Maler) zeigt die maximale Unterdeckung ohne Kontokorrent. Darauf wird ein Puffer von 10–20% addiert. Beispiel: maximale Unterdeckung CHF 150'000 → Kontokorrent CHF 165'000–180'000 ist angemessen. Ein zu grosser Kontokorrent verleitet zur Dauernutzung (struktureller Betriebskredit statt Puffer) – das ist ein Warnsignal.",
        concepts: ["kontokorrent", "liquiditaet", "saisonalitaet"],
      },
    ] as BlankokreditCase[],
  },
  {
    level: 3,
    label: "Vertiefung",
    badgeVariant: "red",
    cases: [
      {
        id: "kmu-3.1",
        level: 3,
        briefing:
          "MBO: Geschäftsführer Patrick Auer (42) möchte die Metallbau AG von Inhaber Thomas Keller (55) kaufen. Kaufpreis CHF 2.4 Mio., Patrick hat CHF 600'000 Eigenkapital.",
        inputData: [
          { label: "Kaufpreis", value: "CHF 2'400'000" },
          { label: "Eigenkapital Käufer", value: "CHF 600'000 (25%)" },
          { label: "Bankfinanzierungsbedarf", value: "CHF 1'800'000" },
          { label: "EBITDA Betrieb", value: "CHF 480'000 / Jahr" },
        ],
        calculator: [
          {
            rows: [
              { type: "data", label: "Bankkredit", value: "CHF 1'800'000" },
              { type: "data", label: "÷ EBITDA", value: "CHF 480'000" },
              { type: "divider" },
              { type: "total", label: "Net Debt / EBITDA", value: "3.75×" },
            ],
            verdict: { text: "3.75× – über Richtwert 3.0× ❌", ok: false },
          },
          {
            heading: "Lösung mit Seller Loan CHF 400'000",
            rows: [
              { type: "data", label: "Bankkredit reduziert", value: "CHF 1'400'000" },
              { type: "data", label: "÷ EBITDA", value: "CHF 480'000" },
              { type: "divider" },
              { type: "total", label: "Net Debt / EBITDA", value: "2.92×" },
            ],
            verdict: { text: "2.92× – unter Richtwert ✅", ok: true },
          },
        ],
        question: "Wie strukturierst du diese MBO-Finanzierung?",
        options: [
          { key: "A", text: "Direkt bewilligen – 25% Eigenkapitalanteil ist ausreichend." },
          { key: "B", text: "Net Debt/EBITDA von 3.75× übersteigt Richtwert. Lösung: Verkäufer stellt Seller Loan CHF 400'000 bereit → Bankkredit sinkt auf CHF 1.4 Mio. → DSCR verbessert sich auf 2.92×." },
          { key: "C", text: "Ablehnen – MBO-Finanzierungen sind für Kantonalbanken nicht zulässig." },
          { key: "D", text: "Bewilligen, EBITDA ist stark genug, Richtwert ist nur Richtlinie." },
        ],
        correct: "B",
        feedback:
          "3.75× Net Debt/EBITDA übersteigt den Richtwert von 3×. Klassische MBO-Lösung: Seller Loan – der Verkäufer stellt ein nachrangiges Darlehen bereit. So sinkt der Bankanteil, der DSCR verbessert sich auf 2.92×. Zusätzlich entscheidend: Nachweis, dass Patrick die Firma erfolgreich führen kann (Track Record).",
        concepts: ["mbo", "seller-loan", "verschuldungsgrad"],
      },
      {
        id: "kmu-3.2",
        level: 3,
        briefing:
          "Weber Holding GmbH hat im Kreditvertrag einen Covenant: «EK-Quote ≥ 15%». Der neue Jahresabschluss zeigt eine EK-Quote von 12.3%.",
        question: "Was muss die Bank nach einer Covenant-Verletzung tun?",
        options: [
          { key: "A", text: "Sofort den gesamten Kredit fälligstellen." },
          { key: "B", text: "Die Verletzung ignorieren – Covenants sind nur Richtwerte ohne Konsequenz." },
          { key: "C", text: "Formale Covenant-Verletzung feststellen (Waiver-Letter), Kundengespräch führen, Massnahmenplan vereinbaren. Kredit läuft weiter, solange ein glaubwürdiger Sanierungsplan vorliegt." },
          { key: "D", text: "Sicherheiten sofort verwerten." },
        ],
        correct: "C",
        feedback:
          "Covenant-Verletzung ≠ automatische Kündigung. Vorgehen: 1) Formale Feststellung (Waiver-Letter), 2) Kundengespräch mit Ursachenanalyse, 3) Massnahmenplan mit klaren Fristen. Die Bank kann auf sofortige Kündigung verzichten (Waiver), wenn das Unternehmen kooperiert und ein glaubwürdiger Plan vorliegt.",
        concepts: ["covenants", "covenant-verletzung", "waiver"],
      },
      {
        id: "kmu-3.3",
        level: 3,
        briefing:
          "Drucksachen Meyer GmbH: negative EK-Quote (−8%), Verluste in den letzten 2 Jahren, neues Management seit 6 Monaten, erste Anzeichen einer Trendwende.",
        question: "Was ist die richtige Reaktion der Bank?",
        options: [
          { key: "A", text: "Sofortige Kreditkündigung und Sicherheitenverwertung." },
          { key: "B", text: "Sanierungskredit bewilligen ohne Auflagen – neues Management ist Garant." },
          { key: "C", text: "Strukturierte Sanierungsbegleitung: externe Revisionsstelle, monatlicher Liquiditätsplan, Überbrückungskredit nur mit klarem Milestoneplan, ggf. Rangrücktritt bestehender Gläubiger." },
          { key: "D", text: "Fall ignorieren und weitere Entwicklung abwarten." },
        ],
        correct: "C",
        feedback:
          "Sanierung braucht Struktur. Vorgehen: Externe Revisionsstelle mandatieren, monatliche Liquiditätsplanung verlangen, Milestoneplan mit klaren Zielen. Rangrücktritt bestehender Gläubiger (Aktionäre, Nahestehende) kann Voraussetzung sein. Kreditkündigung ist oft der schlechteste Weg – sie kann Konkursverschleppung verhindern helfen.",
        concepts: ["sanierung", "rangruecktritt", "milestoneplan"],
      },
      {
        id: "kmu-3.4",
        level: 3,
        briefing:
          "Kunststoff Fischer AG, Umsatz CHF 4.2 Mio. Ein Hauptkunde (Grosskonzern) macht CHF 2.5 Mio. = 59% des Umsatzes aus.",
        question: "Wie bewertest du dieses Klumpenrisiko im Kreditdossier?",
        options: [
          { key: "A", text: "Kein Problem – ein Grosskonzern als Hauptkunde ist sehr sicher." },
          { key: "B", text: "Signifikantes Klumpenrisiko. Im Kreditdossier dokumentieren, Covenant «Hauptkunde ≤ 50% Umsatz in 3 Jahren» verankern, Diversifizierung mit dem Kunden besprechen." },
          { key: "C", text: "Sofort ablehnen – über 50% Umsatzkonzentration ist unzulässig." },
          { key: "D", text: "Klumpenrisiken sind erst bei der Sicherheitenverwertung relevant." },
        ],
        correct: "B",
        feedback:
          "Konzentration auf einen Hauptkunden ist ein echtes Risiko – selbst stabile Grosskunden können Lieferantenbeziehungen beenden. Richtiges Vorgehen: dokumentieren, im Rating berücksichtigen und als Covenant verankern. Kreditbewilligung mit dem Hinweis auf Diversifizierungsnotwendigkeit ist möglich.",
        concepts: ["klumpenrisiko", "kreditrating", "covenants"],
      },
      {
        id: "kmu-3.5",
        level: 3,
        briefing: "Lieferant Huber AG, Bilanzanalyse vor Kreditentscheid.",
        inputData: [
          { label: "Umlaufvermögen", value: "CHF 840'000" },
          { label: "davon Vorräte", value: "CHF 310'000" },
          { label: "Flüssige Mittel + Forderungen", value: "CHF 530'000" },
          { label: "Kurzfristiges Fremdkapital", value: "CHF 650'000" },
        ],
        calculator: [
          {
            heading: "Quick Ratio (Liquidität 2. Grades)",
            rows: [
              { type: "data", label: "UV − Vorräte", value: "CHF 530'000" },
              { type: "data", label: "÷ kurzfrist. FK", value: "CHF 650'000" },
              { type: "divider" },
              { type: "total", label: "Quick Ratio", value: "0.82" },
            ],
            verdict: { text: "0.82 – unter Richtwert ≥1.0 ⚠️", ok: false, warning: true },
          },
        ],
        question: "Was bedeutet ein Quick Ratio von 0.82?",
        options: [
          { key: "A", text: "Sehr gut – über 0.5 ist immer ausreichend." },
          { key: "B", text: "Kritisch. Richtwert ≥1.0 nicht erreicht: kurzfristige Verbindlichkeiten wären bei Fälligkeit nicht vollständig aus liquiden Mitteln und Forderungen deckbar. Liquiditätsplanung einfordern." },
          { key: "C", text: "Quick Ratio wird bei KMU nicht verwendet." },
          { key: "D", text: "Ausgezeichnet – unter 1.0 bedeutet effizientes Working-Capital-Management." },
        ],
        correct: "B",
        feedback:
          "Quick Ratio (Liquidität 2. Grades) = (UV − Vorräte) ÷ kurzfristiges FK. Richtwert: ≥1.0. Bei 0.82 wären nicht alle kurzfristigen Verbindlichkeiten sofort deckbar. Das erhöht das Liquiditätsrisiko. Im Kreditentscheid: Liquiditätsplanung einfordern und Kontokorrentlimite prüfen.",
        concepts: ["liquiditaet", "quick-ratio", "bilanzanalyse"],
      },
      {
        id: "kmu-3.6",
        level: 3,
        briefing:
          "Heizungsbau Weber GmbH, technisch überschuldet: EK −CHF 120'000 wegen eines Aktionärsdarlehens CHF 500'000. Ohne das Darlehen wäre EK +CHF 380'000. Bisheriger Kredit der Bank CHF 650'000.",
        question: "Was ist ein Rangrücktritt (Subordination) und was bewirkt er?",
        options: [
          { key: "A", text: "Der Aktionär verliert sein Darlehen definitiv und bekommt es nie zurück." },
          { key: "B", text: "Der Aktionär erklärt, sein Darlehen erst nach vollständiger Befriedigung der Bankforderungen zurückzuverlangen. Bilanziell wirkt das wie Eigenkapital – die technische Überschuldung wird aufgehoben." },
          { key: "C", text: "Die Bank übernimmt das Aktionärsdarlehen und wandelt es in Bankkredit um." },
          { key: "D", text: "Rangrücktritt ist nur bei börsenkotierten Gesellschaften rechtlich möglich." },
        ],
        correct: "B",
        feedback:
          "Rangrücktritt (Art. 725 OR) = Aktionär oder nahestehende Person erklärt, das Darlehen zurückzutreten – d.h. erst nach allen anderen Gläubigern zu fordern. Bilanziell reduziert das die Überschuldung. Die Bank hält das unterzeichnete Rangrücktrittsdokument zwingend im Kreditdossier. Wichtig: Rangrücktritt darf nicht widerrufen werden, solange der Kredit besteht.",
        concepts: ["rangruecktritt", "ueberschuldung", "sicherheiten"],
      },
      {
        id: "kmu-3.7",
        level: 3,
        briefing:
          "IT-Dienstleister Kern GmbH, CHF 3.8 Mio. Umsatz, hat CHF 1.2 Mio. offene Debitorenforderungen mit 60–90 Tagen Zahlungsziel. Liquiditätsengpass trotz gutem Auftragsbestand.",
        question: "Was ist der Kernunterschied zwischen Factoring und Zession?",
        options: [
          { key: "A", text: "Kein Unterschied – beide Instrumente funktionieren identisch." },
          { key: "B", text: "Factoring = sofortiger Verkauf der Forderungen an einen Factor → sofortige Liquidität, Factor trägt Ausfallrisiko. Zession = Forderungen bleiben beim Unternehmen, dienen nur als Sicherheit für die Bank." },
          { key: "C", text: "Zession gibt sofortige Liquidität; Factoring ist nur eine Sicherheit." },
          { key: "D", text: "Factoring ist nur für Banken, Zession nur für Versicherungsgesellschaften möglich." },
        ],
        correct: "B",
        feedback:
          "Factoring = Forderungsverkauf: sofortige Liquidität (80–90% des Forderungswerts), aber Factor-Gebühr 0.5–2%. Zession = Sicherungsabtretung: Forderungen bleiben beim Unternehmen, Bank greift erst im Verwertungsfall zu. Factoring löst den Liquiditätsengpass sofort, ist aber teurer. Für Kern GmbH wäre Factoring die direktere Lösung.",
        concepts: ["factoring", "zession", "liquiditaet", "sicherheiten"],
      },
      {
        id: "kmu-3.8",
        level: 3,
        briefing: "Reto Müller AG, Metallverarbeitung, möchte die eigene Betriebsliegenschaft als Sicherheit einsetzen. Bankschätzung ergibt Marktwert CHF 2.4 Mio.",
        inputData: [
          { label: "Marktwert (Bankschätzung)", value: "CHF 2'400'000" },
          { label: "Belehnungswert (80%)", value: "CHF 1'920'000" },
          { label: "Max. Belehnung Gewerbe", value: "70% des Belehnungswerts" },
        ],
        calculator: [
          {
            heading: "Maximale Bankbelehnung",
            rows: [
              { type: "data", label: "Belehnungswert", value: "CHF 1'920'000" },
              { type: "data", label: "× 70% (Gewerbe)", value: "" },
              { type: "divider" },
              { type: "total", label: "Max. Hypothek", value: "CHF 1'344'000" },
            ],
            verdict: { text: "CHF 1'344'000 maximal belehnbar ✅", ok: true },
          },
        ],
        question: "Warum beträgt die maximale Bankbelehnung CHF 1'344'000 und nicht CHF 1'920'000?",
        options: [
          { key: "A", text: "Die Bank belehnt immer 80% des Marktwerts direkt = CHF 1'920'000." },
          { key: "B", text: "Bei Gewerbeliegenschaften gilt: max. 70% des Belehnungswerts (nicht des Marktwerts). Der Belehnungswert selbst liegt bereits konservativ bei 80% des Marktwerts: 70% × 1'920'000 = CHF 1'344'000." },
          { key: "C", text: "Die Bank kann 100% des Marktwerts belehnen, wenn die Lage gut ist." },
          { key: "D", text: "Gewerbeliegenschaften dürfen nur zu 50% belehnt werden." },
        ],
        correct: "B",
        feedback:
          "Zweistufige Logik: 1) Belehnungswert = ca. 80% des Marktwerts (konservative Schätzung). 2) Max. Belehnung Gewerbe = 70% des Belehnungswerts. Ergebnis: 70% × 1'920'000 = CHF 1'344'000. Bei Wohnliegenschaften gilt max. 80% des Belehnungswerts. Gewerbeliegenschaften werden konservativer bewertet, weil sie schwerer verwertbar sind.",
        concepts: ["belehnungswert", "gewerbehypothek", "sicherheiten"],
      },
      {
        id: "kmu-3.9",
        level: 3,
        briefing:
          "Zwei Geschäftspartner, Beat Meier und Sandra Huber, haften je als Bürge CHF 200'000 für eine neue GmbH. Die Bank schlägt eine Solidarbürgschaft vor.",
        question: "Was ist der rechtliche Unterschied zwischen einfacher Bürgschaft und Solidarbürgschaft?",
        options: [
          { key: "A", text: "Kein Unterschied – beide haften gleichwertig." },
          { key: "B", text: "Einfache Bürgschaft (Art. 495 OR): Bank muss zuerst alle Mittel gegen den Hauptschuldner ausschöpfen (Einrede der Vorausklage). Solidarbürgschaft (Art. 496 OR): Bank kann direkt und sofort beide Bürgen belangen, ohne vorher gegen die GmbH vorzugehen." },
          { key: "C", text: "Solidarbürgschaft bedeutet, dass Beat und Sandra die Haftung je hälftig aufteilen." },
          { key: "D", text: "Solidarbürgschaft ist teurer, hat aber keine anderen rechtlichen Auswirkungen." },
        ],
        correct: "B",
        feedback:
          "Solidarbürgschaft (Art. 496 OR) = keine Einrede der Vorausklage. Die Bank kann sofort und direkt auf den Bürgen zugreifen, ohne zuerst alle Betreibungsmassnahmen gegen die GmbH zu erschöpfen. Das macht die Sicherheit für die Bank deutlich wertvoller. In der Praxis verlangt die Bank bei KMU fast immer Solidarbürgschaft der Gesellschafter.",
        concepts: ["buergschaft", "solidarbuergschaft", "sicherheiten"],
      },
      {
        id: "kmu-3.10",
        level: 3,
        briefing:
          "Familienholding Brunner AG hat Kredite bei drei Banken: CHF 800'000 Kantonalbank, CHF 500'000 Raiffeisen, CHF 300'000 PostFinance. Alle Kreditverträge enthalten eine Cross-Default-Klausel. Die Raiffeisen kündigt wegen Zahlungsverzug.",
        question: "Was bedeutet die Cross-Default-Klausel für Kantonalbank und PostFinance?",
        options: [
          { key: "A", text: "Die anderen Banken sind nicht betroffen – jeder Kredit läuft unabhängig." },
          { key: "B", text: "Der Verzug bei der Raiffeisen löst bei Kantonalbank und PostFinance automatisch ein Kündigungsrecht aus – auch wenn bei ihnen kein Zahlungsverzug besteht." },
          { key: "C", text: "Cross-Default schützt den Kreditnehmer – die anderen Banken dürfen nicht kündigen." },
          { key: "D", text: "Cross-Default gilt nur bei Konzernen mit mehr als 250 Mitarbeitenden." },
        ],
        correct: "B",
        feedback:
          "Cross-Default-Klausel = Standardklausel in KMU-Kreditverträgen: Ein Kreditausfall bei einem anderen Gläubiger gilt als Default-Ereignis für alle anderen Kreditverträge mit dieser Klausel. Zweck: Keine Bank will die letzte sein, die noch Gelder hat, während andere bereits vollstrecken. In der Praxis: sobald Cross-Default ausgelöst, müssen alle Beteiligten an einen Tisch – oft Beginn einer Sanierungsrunde.",
        concepts: ["cross-default", "kreditvertrag", "covenants"],
      },
    ] as BlankokreditCase[],
  },
];
