"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubModuleMCQ } from "@/components/modules/credit-operations/SubModuleMCQ";

const SCENARIOS = [
  {
    num: 1,
    level: "Level 1 – Einsteiger",
    situation: "Kunde möchte seine Festhypothek CHF 400'000 vorzeitig auflösen. Noch 2 Jahre Laufzeit verbleiben.",
    question: "Was muss die Bank verlangen?",
    options: [
      { key: "A", text: "Nichts – Kunde kann jederzeit ohne Kosten auflösen" },
      { key: "B", text: "Vorfälligkeitsentschädigung für die verbleibende Laufzeit" },
      { key: "C", text: "3 Monate Kündigungsfrist, danach kostenlos" },
      { key: "D", text: "Neue Hypothek abschliessen als Voraussetzung" },
    ],
    correct: "B",
    feedback:
      "Bei Festhypotheken entschädigt der Kunde die Bank für den entgangenen Zins bis zum Verfall. Die Vorfälligkeitsentschädigung entspricht der Zinsdifferenz zwischen dem vereinbarten Satz und dem aktuellen Marktzins für die verbleibende Laufzeit.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation:
      "Festhypothek CHF 500'000, Zinssatz 2.0%, noch 3 Jahre Laufzeit.\nAktueller Marktzins: 0.8%.\n\nZinsdifferenz: 2.0% – 0.8% = 1.2%\nCHF 500'000 × 1.2% × 3 Jahre = ?",
    question: "Wie hoch ist die Vorfälligkeitsentschädigung?",
    options: [
      { key: "A", text: "CHF 6'000" },
      { key: "B", text: "CHF 12'000" },
      { key: "C", text: "CHF 18'000" },
      { key: "D", text: "Keine – Marktzins ist tiefer als vereinbarter Zins" },
    ],
    correct: "C",
    feedback:
      "CHF 500'000 × 1.2% × 3 = CHF 18'000. Da der Marktzins tiefer als der vereinbarte Zins ist, entsteht eine Zinsdifferenz – und damit eine Vorfälligkeitsentschädigung zugunsten der Bank.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: "Kunde hat die Hypothek vollständig zurückbezahlt. Schuldbrief CHF 500'000 liegt bei der Bank. Kredit ist abgeschlossen.",
    question: "Was sind die nächsten Schritte von Credit Operations?",
    options: [
      { key: "A", text: "Akte schliessen – fertig" },
      {
        key: "B",
        text: "Schuldbrief zurückgeben, Sicherheiten freigeben, interne Systeme schliessen",
      },
      { key: "C", text: "Schuldbrief als Reserve für zukünftige Kredite behalten" },
      { key: "D", text: "Kunde muss Schuldbrief selbst beim Grundbuchamt abholen" },
    ],
    correct: "B",
    feedback:
      "Nach vollständiger Rückzahlung: 1. Schuldbrief an Kunden zurückgeben. 2. Alle Sicherheiten freigeben (Grundbuch). 3. Interne Systeme abschliessen. Das ist der korrekte Kreditabschluss – nicht nur die Akte schliessen.",
  },
];

export default function VorzeitigeRueckzahlungPage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header title="Vorzeitige Rückzahlung" subtitle="Credit Operations · Back Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Credit Operations", href: "/backoffice/credit-operations" },
          { label: "Vorzeitige Rückzahlung" },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          {/* Lernblock */}
          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button
              onClick={() => setLernOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Vorzeitige Rückzahlung</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Möchte ein Kunde seinen Kredit vor dem Ende der Laufzeit zurückzahlen, gelten je nach Kreditart unterschiedliche Regeln.</p>
                <div className="space-y-3">
                  {[
                    {
                      title: "Konsumkredit",
                      items: ["Jederzeit möglich", "Nur ausstehender Betrag + Zins", "Keine Vorfälligkeitsentschädigung"],
                    },
                    {
                      title: "Festhypothek",
                      items: ["Vorzeitige Auflösung möglich", "Bank verlangt Vorfälligkeitsentschädigung", "Berechnung: Zinsdifferenz × Restlaufzeit"],
                    },
                    {
                      title: "Variable Hypothek / SARON",
                      items: ["Kündigung mit Kündigungsfrist möglich", "Keine oder geringe Entschädigung"],
                    },
                  ].map((block) => (
                    <div key={block.title} className="rounded-DEFAULT border border-border p-4">
                      <p className="font-bold text-text-primary text-xs uppercase tracking-wider mb-2">{block.title}</p>
                      <ul className="space-y-1">
                        {block.items.map((i) => (
                          <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Festhypothek vorzeitig auflösen = Vorfälligkeitsentschädigung!</p>
                </div>
              </div>
            )}
          </div>

          {/* Praxistipps */}
          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Praxistipps</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Vorfälligkeitsentschädigung immer berechnen bevor Kunde informiert wird",
                "Liegenschaftsverkauf ist häufigster Grund für vorzeitige Rückzahlung",
                "Schuldbrief nach Rückzahlung nicht vergessen zurückzugeben",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="shrink-0 text-amber-500">💡</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Typische Fehler */}
          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-text-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Typische Fehler</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Vorfälligkeitsentschädigung vergessen zu berechnen",
                "Schuldbrief nach Rückzahlung nicht zurückgegeben",
                "Sicherheiten nicht freigegeben (Grundbucheintrag)",
                "Falsche Restschuld berechnet",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="shrink-0">❌</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scenarios */}
          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
