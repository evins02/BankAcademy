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
    ] as BlankokreditCase[],
  },
];
