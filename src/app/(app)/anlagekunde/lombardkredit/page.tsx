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
    level: "Level 1 – Grundlagen",
    situation: `Kundin hat folgendes Wertschriftendepot:
• Nestlé Aktien: Kurswert CHF 100'000 (Belehnungssatz 60%)
• Obligationen BBB-Rating: Kurswert CHF 80'000 (Belehnungssatz 80%)

Sie möchte einen Lombardkredit aufnehmen.`,
    question: "Wie hoch ist der maximale Lombardkredit?",
    options: [
      { key: "A", text: "CHF 180'000 – 100% des Gesamtdepotwerts" },
      { key: "B", text: "CHF 100'000 – nur auf die Aktienposition" },
      { key: "C", text: "CHF 124'000 – CHF 60'000 (Aktien) + CHF 64'000 (Obligationen)" },
      { key: "D", text: "CHF 150'000 – Durchschnitt der beiden Positionen" },
    ],
    correct: "C",
    feedback:
      "Nestlé Aktien: CHF 100'000 × 60% = CHF 60'000. Obligationen: CHF 80'000 × 80% = CHF 64'000. Maximaler Lombardkredit = CHF 124'000. Jede Position wird mit ihrem spezifischen Belehnungssatz gewichtet – sicherere Anlagen erhalten höhere Sätze.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: `Kunde hat Lombardkredit CHF 100'000 auf sein Aktien-Depot (100% Aktien).

Anfangssituation:
• Depotwert: CHF 200'000
• Belehnungssatz: 60% → Kreditlimite: CHF 120'000 ✓

Aktuell nach Kursrückgang:
• Depotwert: CHF 150'000
• Neue Kreditlimite: CHF 90'000
• Ausstehender Kredit: CHF 100'000`,
    question: "Was passiert in dieser Situation?",
    options: [
      { key: "A", text: "Nichts – der Kredit läuft automatisch bis zum Verfall weiter" },
      { key: "B", text: "Die Bank erhöht die Limite auf CHF 100'000, um dem Kunden zu helfen" },
      { key: "C", text: "Margin Call: Kunde muss CHF 10'000 nachdecken oder Positionen werden zwangsliquidiert" },
      { key: "D", text: "Der Kredit wird automatisch in eine Hypothek umgewandelt" },
    ],
    correct: "C",
    feedback:
      "Kredit CHF 100'000 übersteigt die neue Limite von CHF 90'000 → Unterdeckung CHF 10'000. Die Bank löst einen Margin Call aus: Sofortige Nachdeckung durch Einzahlung oder Depot-Aufstockung. Bei Nichtreaktion: Zwangsliquidierung von Positionen bis die Limite wieder eingehalten ist.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: `Kundin Maria Müller, 55 Jahre, konservatives Risikoprofil.
Depot: CHF 200'000 (70% Obligationen AA, 30% Nestlé Aktien)

Belehnungsberechnung:
• Aktien CHF 60'000 × 60% = CHF 36'000
• Obligationen CHF 140'000 × 80% = CHF 112'000
• Maximale Limite: CHF 148'000

Maria beantragt CHF 150'000 Lombardkredit zur Finanzierung einer Ferienwohnung.`,
    question: "Was ist deine korrekte Empfehlung?",
    options: [
      { key: "A", text: "Kredit bewilligen – CHF 150'000 ist nur knapp über der Limite, vertretbar" },
      { key: "B", text: "Antrag ablehnen: CHF 150'000 übersteigt die Limite; zudem ist Lombardkredit für Immobilien bei konservativem Profil ungeeignet" },
      { key: "C", text: "Limite auf CHF 150'000 erhöhen – die Kundin wirkt solvent und zuverlässig" },
      { key: "D", text: "Obligationen aus dem Belehnungswert ausschliessen und nur Aktien beliehen" },
    ],
    correct: "B",
    feedback:
      "CHF 150'000 übersteigt die Limite von CHF 148'000 – der Antrag ist abzulehnen. Zusätzlich: Lombardkredit für eine Immobilie bei konservativem Risikoprofil ist grundsätzlich ungeeignet (Klumpenrisiko, fehlende Liquidität des Sicherungsguts). Alternative: Hypothek auf die Ferienwohnung prüfen.",
  },
];

export default function LombardkreditPage() {
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
      <Header title="Lombardkredit" subtitle="Anlagekunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde", href: "/anlagekunde" },
          { label: "Lombardkredit" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button
              onClick={() => setLernOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Lombardkredit</span>
              </div>
              {lernOpen ? (
                <ChevronUp size={15} className="text-text-secondary" />
              ) : (
                <ChevronDown size={15} className="text-text-secondary" />
              )}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>
                  Der Lombardkredit ermöglicht es, ein Wertschriftendepot als Sicherheit für einen kurzfristigen Kredit zu nutzen.
                  Die Kreditlimite ergibt sich aus den belehnten Positionen × deren jeweiligem Belehnungssatz.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Belehnungssätze",
                      items: [
                        "Aktien Bluechip: 50–60%",
                        "Obligationen AAA–A: 80–90%",
                        "Obligationen BBB: 70–80%",
                        "Geldmarktfonds: 90%",
                        "Exotische Aktien: 40–50%",
                      ],
                    },
                    {
                      title: "Margin Call",
                      items: [
                        "Depot fällt unter Kreditlimite",
                        "Bank fordert sofortige Nachdeckung",
                        "Keine Reaktion = Zwangsliquidierung",
                        "Gilt auch bei Zinserhöhungen",
                      ],
                    },
                    {
                      title: "Kontokorrent-Prinzip",
                      items: [
                        "Flexibel bis zur Limite nutzbar",
                        "Zinsen nur auf genutztem Betrag",
                        "Jederzeit rückzahlbar",
                        "Keine fixe Laufzeit",
                      ],
                    },
                  ].map((b) => (
                    <div key={b.title} className="rounded-DEFAULT border border-border p-3 space-y-2">
                      <p className="font-bold text-text-primary text-xs uppercase tracking-wider">{b.title}</p>
                      <ul className="space-y-1">
                        {b.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="shrink-0 text-primary">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Limite = Σ (Positionswert × Belehnungssatz). Depot unter Limite = Margin Call = sofortiger Handlungsbedarf.</p>
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
                "Belehnungssätze je nach Bank und Marktsituation verschieden – immer aktuell abfragen",
                "Margin Call-Risiko im Beratungsgespräch proaktiv ansprechen, bevor der Kredit vergeben wird",
                "Bei konservativen Kunden immer einen Puffer zur Limite einplanen (z.B. Kredit nur 80% der Limite)",
                "Lombardkredit für Immobilien-Investitionen ist kritisch zu prüfen – Klumpenrisiko vermeiden",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="shrink-0 text-amber-500">💡</span>
                  <span>{t}</span>
                </li>
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
                "Limite = 100% Depotwert angenommen (falsch: Belehnungssatz reduziert den Wert)",
                "Einheitlichen Belehnungssatz für alle Positionen verwendet",
                "Margin Call-Risiko nicht kommuniziert – Kunde später überrascht",
                "Lombardkredit für illiquide oder risikoreiche Zwecke (Konsum, Immobilien) vergeben",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="shrink-0">❌</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
            <div className="flex items-center gap-1.5 pt-1">
              {SCENARIOS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i < correctCount ? "bg-green-500" : "bg-gray-200"}`}
                />
              ))}
              <span className="text-xs text-text-secondary ml-1">
                {correctCount} / {SCENARIOS.length}
              </span>
            </div>
          </div>

          {SCENARIOS.map((s) => (
            <SubModuleMCQ
              key={s.num}
              scenarioNum={s.num}
              levelLabel={s.level}
              situation={s.situation}
              question={s.question}
              options={s.options}
              correct={s.correct}
              feedback={s.feedback}
              onCorrect={() => setCorrectCount((c) => Math.min(c + 1, SCENARIOS.length))}
            />
          ))}

          {correctCount === SCENARIOS.length && (
            <div className="rounded-DEFAULT bg-green-50 border border-green-200 p-5 flex items-start gap-3">
              <span className="text-xl shrink-0">🏆</span>
              <div>
                <p className="font-bold text-green-800 text-sm">Modul abgeschlossen!</p>
                <p className="text-sm text-green-700 mt-0.5">
                  Du hast alle {SCENARIOS.length} Szenarien korrekt beantwortet.
                </p>
                <p className="text-xs font-bold text-green-600 mt-2">+50 XP Bonus erhalten</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
