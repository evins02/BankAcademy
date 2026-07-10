"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubModuleMCQ } from "@/components/modules/credit-operations/SubModuleMCQ";
import { addXP } from "@/lib/xpData";

const SCENARIOS = [
  {
    num: 1,
    level: "Level 1 – Einsteiger",
    situation: "Dein Chef fragt dich: «Was ist der Mindest-Deckungsgrad, den wir bei einem Firmenkredit einhalten müssen?»",
    question: "Welche Antwort ist korrekt?",
    options: [
      { key: "A", text: "1.0 – der Cashflow muss den Schuldendienst genau decken" },
      { key: "B", text: "1.2 – der Cashflow muss Zinsen und Amortisation zu mindestens 120% decken" },
      { key: "C", text: "2.0 – der Cashflow muss den Schuldendienst doppelt decken" },
      { key: "D", text: "Es gibt keinen Mindestdeckungsgrad – das ist Ermessenssache" },
    ],
    correct: "B",
    feedback:
      "Deckungsgrad = Cashflow ÷ (Zinsen + Amortisation). Der Mindest-DG beträgt 1.2 – d.h. der Cashflow muss den Schuldendienst um 20% übersteigen. Unter 1.2 ist die Kreditvergabe in der Regel nicht möglich ohne Zusatzsicherheiten oder ETP-Begründung.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: "Du führst eine Bonitätsprüfung für die Müller Bau GmbH durch. Welche vier Hauptbereiche müssen analysiert werden?",
    question: "Welche Kombination ist vollständig und korrekt?",
    options: [
      { key: "A", text: "Umsatz, Gewinn, Eigenkapital, Anzahl Mitarbeitende" },
      { key: "B", text: "Ertragskraft, Bilanzstruktur, Liquidität, Managementqualität" },
      { key: "C", text: "Jahresumsatz, Steuerschulden, Betreibungsregister, Kredithistorie" },
      { key: "D", text: "Cashflow, Dividenden, Aktienkurs, Eigenkapitalrendite" },
    ],
    correct: "B",
    feedback:
      "Die vier Säulen der KMU-Bonitätsprüfung: (1) Ertragskraft – EBITDA, Cashflow, Gewinnmarge; (2) Bilanzstruktur – EK-Quote, Verschuldungsgrad; (3) Liquidität – Zahlungsfähigkeit, Current Ratio; (4) Managementqualität – Erfahrung, Nachfolgeplanung, Marktposition. Steuerschulden und Betreibungen sind Warnsignale, keine eigenständigen Prüfkategorien.",
  },
  {
    num: 3,
    level: "Level 2 – Fortgeschritten",
    situation:
      "Die Tanner GmbH hat eine Bilanzsumme von CHF 2'000'000 und ein Eigenkapital von CHF 300'000. Wie beurteilen Sie die Situation?",
    question: "Was ist die korrekte Beurteilung?",
    options: [
      { key: "A", text: "EK-Quote 10% – akzeptabel für eine GmbH, Kredit problemlos bewilligen" },
      { key: "B", text: "EK-Quote 25% – solide, keine weiteren Massnahmen nötig" },
      { key: "C", text: "EK-Quote 15% – schwach, kritisch prüfen und zusätzliche Sicherheiten verlangen" },
      { key: "D", text: "EK-Quote 30% – gut, ohne Auflagen bewilligen" },
    ],
    correct: "C",
    feedback:
      "300'000 ÷ 2'000'000 = 15% EK-Quote – das ist schwach. Branchenüblich sind 25–40% für Schweizer KMU. Bei tiefer EK-Quote müssen zusätzliche Sicherheiten (Bürgschaft, Pfandrechte) verlangt oder höhere Margen eingerechnet werden. Die Bank trägt bei tiefer EK ein erhöhtes Verlustrisiko.",
  },
  {
    num: 4,
    level: "Level 3 – Experte",
    situation:
      "Müller Bau GmbH beantragt CHF 350'000 Betriebskredit. Der Inhaber bietet eine persönliche Bürgschaft (CHF 150'000) und eine Zession der Debitorenforderungen (ca. CHF 220'000) an. Wie beurteilen Sie die Sicherheitenlage?",
    question: "Was ist die korrekte Einschätzung?",
    options: [
      { key: "A", text: "Vollständig gedeckt – 150'000 + 220'000 = 370'000 > 350'000, ohne Auflagen bewilligen" },
      { key: "B", text: "Unzureichend – Bürgschaft und Zession gelten nicht als bankfähige Sicherheiten" },
      { key: "C", text: "Bedingt gedeckt – Belehnungswert der Zession und Bonität des Bürgen müssen geprüft werden" },
      { key: "D", text: "Überdeckt – der Inhaber leistet zu viele Sicherheiten, das ist rechtlich problematisch" },
    ],
    correct: "C",
    feedback:
      "Sicherheiten werden nie zum Nominalwert angerechnet. Debitorenzession: Belehnungswert ca. 70–80% (Ausfallrisiko). Persönliche Bürgschaft: abhängig von der Bonität des Bürgen, nicht automatisch werthaltig. Effektive Deckung: ca. 0.75 × 220'000 + 150'000 ≈ CHF 315'000 – leicht unter CHF 350'000. ETP prüfen oder Zusatzsicherheit verlangen.",
  },
];

export default function BonitaetPage() {
  const [lernOpen, setLernOpen] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [bonusAwarded, setBonusAwarded] = useState(false);
  useEffect(() => {
    if (correctCount === SCENARIOS.length && !bonusAwarded) {
      addXP(50);
      setBonusAwarded(true);
    }
  }, [correctCount, bonusAwarded]);

  return (
    <>
      <Header title="Bonitätsprüfung & Firmenkredit" subtitle="Firmenkunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde", href: "/firmenkunde" },
          { label: "Bonitätsprüfung" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button onClick={() => setLernOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Bonitätsprüfung & Firmenkredit</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <div>
                  <p className="font-semibold text-text-primary mb-2">Deckungsgrad (DG)</p>
                  <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3 font-mono text-sm text-text-primary">
                    DG = Cashflow ÷ (Zinsen + Amortisation) → Minimum 1.2
                  </div>
                  <p className="mt-2">DG ≥ 1.2: tragbar · DG 1.0–1.19: ETP prüfen · DG &lt; 1.0: ablehnen</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">EK-Quote</p>
                  <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3 font-mono text-sm text-text-primary">
                    EK-Quote = Eigenkapital ÷ Bilanzsumme × 100
                  </div>
                  <p className="mt-2">Gut: &gt;30% · Schwach: 15–25% · Kritisch: &lt;15%</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Die 4 Säulen der Bonitätsprüfung</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Ertragskraft", items: ["Cashflow", "EBITDA", "Gewinnmarge"] },
                      { title: "Bilanzstruktur", items: ["EK-Quote", "Verschuldungsgrad", "Anlagevermögen"] },
                      { title: "Liquidität", items: ["Current Ratio", "Zahlungsfähigkeit", "Working Capital"] },
                      { title: "Management", items: ["Erfahrung", "Nachfolgeplanung", "Marktposition"] },
                    ].map((b) => (
                      <div key={b.title} className="rounded-DEFAULT border border-border p-3 space-y-1">
                        <p className="font-bold text-text-primary text-xs uppercase tracking-wider">{b.title}</p>
                        {b.items.map((i) => (
                          <div key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Sicherheitenarten</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { title: "Bürgschaft", note: "Bonität des Bürgen prüfen", val: "100% (wenn werthaltig)" },
                      { title: "Debitorenzession", note: "Belehnungswert ~70–80%", val: "je nach Qualität" },
                      { title: "Grundpfand", note: "Belehnung max. 80% (Wohn) / 70% (Gewerbe)", val: "stabilste Sicherheit" },
                    ].map((s) => (
                      <div key={s.title} className="rounded-DEFAULT border border-border p-3 space-y-1">
                        <p className="font-bold text-text-primary text-xs">{s.title}</p>
                        <p className="text-xs">{s.note}</p>
                        <p className="text-xs text-primary font-semibold">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Sicherheiten ersetzen nie eine schlechte Bonität – sie ergänzen eine gute.</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Praxistipps</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Deckungsgrad immer mit zwei Jahresabschlüssen berechnen – Ausreisser erkennen",
                "EK-Quote unter 15%: immer zusätzliche Sicherheiten oder ETP-Begründung",
                "Zession von Debitoren: Qualität der Schuldner prüfen – nicht nur Summe",
                "Managementqualität ist weich, aber entscheidend bei KMU – Nachfolgerisiko nicht unterschätzen",
              ].map((t) => (
                <li key={t} className="flex gap-2"><span className="shrink-0 text-amber-500">💡</span><span>{t}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-text-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Typische Fehler</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Sicherheiten zum Nominalwert angerechnet statt zum Belehnungswert",
                "Nur einen Jahresabschluss analysiert – Trend übersehen",
                "Deckungsgrad unter 1.2 ohne ETP-Begründung bewilligt",
                "Managementqualität und Nachfolgerisiko ignoriert",
              ].map((f) => (
                <li key={f} className="flex gap-2"><span className="shrink-0">❌</span><span>{f}</span></li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
            <div className="flex items-center gap-1.5 pt-1">
              {SCENARIOS.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < correctCount ? "bg-green-500" : "bg-gray-200"}`} />
              ))}
              <span className="text-xs text-text-secondary ml-1">{correctCount} / {SCENARIOS.length}</span>
            </div>
          </div>
          {SCENARIOS.map((s) => (
            <SubModuleMCQ key={s.num} scenarioNum={s.num} levelLabel={s.level} situation={s.situation} question={s.question} options={s.options} correct={s.correct} feedback={s.feedback} onCorrect={() => setCorrectCount(c => Math.min(c + 1, SCENARIOS.length))} />
          ))}
          {correctCount === SCENARIOS.length && (
            <div className="rounded-DEFAULT bg-green-50 border border-green-200 p-5 flex items-start gap-3">
              <span className="text-xl shrink-0">🏆</span>
              <div>
                <p className="font-bold text-green-800 text-sm">Modul abgeschlossen!</p>
                <p className="text-sm text-green-700 mt-0.5">Du hast alle {SCENARIOS.length} Szenarien korrekt beantwortet.</p>
                <p className="text-xs font-bold text-green-600 mt-2">+50 XP Bonus erhalten</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
