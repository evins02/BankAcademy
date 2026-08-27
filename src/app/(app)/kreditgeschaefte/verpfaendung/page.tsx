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
    situation:
      "Kunde Peter Züst möchte seinen Pensionskassen-Anspruch für den Kauf eines Eigenheims nutzen. Er fragt nach dem Unterschied zwischen Verpfändung und Vorbezug.",
    question: "Was ist der grundlegende Unterschied zwischen Verpfändung und Vorbezug der Pensionskasse?",
    options: [
      {
        key: "A",
        text: "Beim Vorbezug bleibt das Kapital in der PK, bei der Verpfändung wird es ausbezahlt",
      },
      {
        key: "B",
        text: "Beide sind identisch – nur die Bezeichnung unterscheidet sich je nach Bank",
      },
      {
        key: "C",
        text: "Bei der Verpfändung bleibt das PK-Kapital angelegt und dient als Sicherheit; beim Vorbezug wird es entnommen und sofort versteuert",
      },
      {
        key: "D",
        text: "Die Verpfändung ist nur für Renovationen erlaubt, der Vorbezug für Neukauf",
      },
    ],
    correct: "C",
    feedback:
      "Verpfändung: Das PK-Kapital bleibt investiert und wächst weiter. Es wird nur als Sicherheit für die Hypothek hinterlegt. Kein Kapitalabgang, keine sofortige Besteuerung. Vorbezug: Das Kapital verlässt die PK, es entstehen Vorsorgelücken und eine einmalige Kapitalsteuer ist sofort fällig.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: `Familie Meier möchte ein Eigenheim für CHF 800'000 kaufen.

Verfügbares Kapital:
• Bankguthaben (hartes EK): CHF 80'000
• PK-Guthaben Familie Meier: CHF 150'000

Regulatorische Anforderungen (FINMA):
• Mindest-Eigenkapital: 20% des Kaufpreises
• Davon mindestens 10% aus hartem EK (nicht PK/3a)
• Maximal 10% des Kaufpreises aus PK/3a`,
    question: "Kann Familie Meier das Eigenheim kaufen, und wenn ja – wie?",
    options: [
      { key: "A", text: "Nein – CHF 80'000 hartes EK reicht nicht aus, Kauf nicht möglich" },
      {
        key: "B",
        text: "Ja – mit Verpfändung von CHF 80'000 PK (10% Limite) als Ergänzung: CHF 80'000 + CHF 80'000 = CHF 160'000 (20%) ✓",
      },
      {
        key: "C",
        text: "Ja – die gesamten CHF 150'000 PK können als Vorbezug verwendet werden",
      },
      {
        key: "D",
        text: "Ja – aber nur wenn beide Partner ihr gesamtes PK-Guthaben vorbeziehen",
      },
    ],
    correct: "B",
    feedback:
      "CHF 800'000 × 10% = CHF 80'000 max. aus PK (Verpfändung oder Vorbezug). CHF 80'000 hartes EK deckt die Pflichtquote von 10% = CHF 80'000. Mit PK-Verpfändung von CHF 80'000 ergibt sich Gesamt-EK von CHF 160'000 = 20%. Kauf ist möglich! Der Rest des PK-Guthabens (CHF 70'000) bleibt unangetastet.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: `Kundin Sandra Huber, 42 Jahre, kauft Eigenheim für CHF 600'000.
Hartes EK: CHF 60'000 (10%)
PK-Guthaben: CHF 80'000

Sie ist unschlüssig: Soll sie die PK verpfänden oder vorbeziehen?
Ihr Steuersatz liegt bei 25% auf Kapitalleistungen.
Zinssatz Hypothek: 2.5% p.a.`,
    question: "Welche Empfehlung gibst du Sandra Huber?",
    options: [
      {
        key: "A",
        text: "Vorbezug empfehlen – das Kapital ist dann definitiv weg und es gibt keine Restschuld bei der Bank",
      },
      {
        key: "B",
        text: "Verpfändung empfehlen – kein Kapitalabgang, keine Steuer, PK wächst weiter, Hypothek amortisiert regulär",
      },
      {
        key: "C",
        text: "Vorbezug empfehlen – Steuerersparnis auf der Hypothek überwiegt immer die Kapitalsteuer",
      },
      {
        key: "D",
        text: "Keines von beiden – Sandra soll lieber die Hypothek voll aufnehmen ohne PK-Einbezug",
      },
    ],
    correct: "B",
    feedback:
      "Verpfändung ist bei Sandra klar vorzuziehen: Kein Kapitalabgang aus der PK, keine sofortige Kapitalsteuer (bei CHF 60'000 Vorbezug wären das CHF 15'000 Steuer), die PK wächst weiter bis zur Pensionierung. Die Hypothek wird regulär amortisiert. Vorbezug ist sinnvoller nur bei sehr langen Laufzeiten oder bei bereits reduzierter Steuerprogression kurz vor Pensionierung.",
  },
];

export default function VerpfaendungPage() {
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
      <Header title="Verpfändung PK / 3a" subtitle="Kreditgeschäfte · Eigenheimfinanzierung" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kreditgeschäfte", href: "/kreditgeschaefte" },
          { label: "Verpfändung PK / 3a" },
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
                <span className="text-sm font-bold text-text-primary">Lernblock – Verpfändung PK / 3a</span>
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
                  Zur Eigenheimfinanzierung können Vorsorgegelder (PK / Säule 3a) genutzt werden – entweder durch Verpfändung
                  oder Vorbezug. Beide Instrumente haben unterschiedliche steuerliche und vorsorgetechnische Konsequenzen.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Verpfändung",
                      items: [
                        "PK-Kapital bleibt angelegt",
                        "Dient als Sicherheit (kein Abgang)",
                        "Keine sofortige Besteuerung",
                        "PK wächst weiter",
                        "Bei Verkauf: Kredit rückzahlbar",
                      ],
                    },
                    {
                      title: "Vorbezug",
                      items: [
                        "Kapital verlässt die PK definitiv",
                        "Sofortige Kapitalleistungssteuer",
                        "Vorsorgelücke bis Pensionierung",
                        "Hypothek kann reduziert werden",
                        "Erst ab Alter 50 eingeschränkt",
                      ],
                    },
                    {
                      title: "Regulierung (FINMA)",
                      items: [
                        "Mind. 20% Eigenkapital",
                        "Min. 10% hartes EK (kein PK)",
                        "Max. 10% aus PK/3a",
                        "Amortisationspflicht bis 2/3 LW",
                        "Gilt für Erstwohnsitz",
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
                  <p>
                    Verpfändung = PK bleibt investiert, keine Steuer. Vorbezug = Kapital raus, Steuer sofort fällig,
                    Vorsorgelücke entsteht. Max. 10% des Kaufpreises aus PK/3a.
                  </p>
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
                "Verpfändung ist für die meisten Kunden die bessere Wahl – keine Steuer, keine Vorsorgelücke",
                "Vor dem Vorbezug immer die Kapitalsteuer berechnen lassen (separat besteuert, günstigerer Satz)",
                "10%-Regel beachten: max. 10% des Kaufpreises aus PK, min. 10% hartes EK",
                "Vorbezug ab Alter 50 eingeschränkt – rechtzeitig planen",
                "Heiratende Paare: Für beide Partner gilt die 10%-Limite separat",
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
                "Verpfändung und Vorbezug verwechselt – Steuerfolgen nicht erklärt",
                "10%-Limite übersehen – mehr als 10% aus PK kalkuliert",
                "Hartes EK-Minimum (10%) nicht berücksichtigt",
                "Vorsorgelücke beim Vorbezug nicht thematisiert",
                "Kapitalsteuer beim Vorbezug vergessen zu erwähnen",
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
