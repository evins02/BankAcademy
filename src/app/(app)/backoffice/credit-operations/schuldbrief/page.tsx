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
    situation: "Kreditgeschäft diskutiert den Unterschied zwischen Papier- und Registerschuldbrief.",
    question: "Was ist der Vorteil des Registerschuldbriefs?",
    options: [
      { key: "A", text: "Höherer Belehnungswert möglich" },
      {
        key: "B",
        text: "Nur im Grundbuch eingetragen – kein Verlustrisiko eines physischen Dokuments",
      },
      { key: "C", text: "Tiefere Kosten bei der Errichtung" },
      { key: "D", text: "Kann für mehrere Liegenschaften gleichzeitig verwendet werden" },
    ],
    correct: "B",
    feedback:
      "Registerschuldbrief (seit 2012): Nur im Grundbuch eingetragen, kein physisches Dokument. Kein Verlustrisiko, direkt online prüfbar. Der Papierschuldbrief existiert als physisches Dokument – Verlust ist sehr aufwändig.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation:
      "Ein neuer Schuldbrief CHF 350'000 kommt vom Notar bei Kreditgeschäft an.",
    question: "Was prüft Kreditgeschäft zuerst?",
    options: [
      { key: "A", text: "Ob der Kunde eine gute Bonität hat" },
      {
        key: "B",
        text: "Betrag, Rang, Eigentümer und ob Grundbucheintrag korrekt ist",
      },
      { key: "C", text: "Nur den Betrag – der Rest ist Sache des Notars" },
      { key: "D", text: "Unterschrift des Notars und Stempel" },
    ],
    correct: "B",
    feedback:
      "Bei Eingang eines Schuldbriefs prüft Kreditgeschäft: 1. Betrag korrekt? 2. Rang korrekt? 3. Eigentümer = Kreditnehmer? 4. Grundbucheintrag stimmt? Erst dann wird der Kredit ausgezahlt.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation:
      "Kunde verkauft seine Liegenschaft. Schuldbrief CHF 600'000 liegt bei der Bank. Kredit CHF 400'000 noch ausstehend. Neuer Eigentümer übernimmt die Liegenschaft.",
    question: "Was passiert mit dem Schuldbrief?",
    options: [
      { key: "A", text: "Schuldbrief erlischt automatisch beim Eigentumsübergang" },
      {
        key: "B",
        text: "Schuldbrief bleibt bei der Bank bis Kredit bezahlt, dann Übergabe an neuen Eigentümer oder Löschung",
      },
      {
        key: "C",
        text: "Schuldbrief geht automatisch auf neuen Eigentümer über ohne Bankbeteiligung",
      },
      { key: "D", text: "Schuldbrief muss neu erstellt werden auf den neuen Eigentümer" },
    ],
    correct: "B",
    feedback:
      "Schuldbrief bleibt als Sicherheit bei der Bank bis der Kredit bezahlt ist. Danach: Übergabe an neuen Eigentümer (wenn er den Kredit übernimmt) oder Löschung im Grundbuch auf Antrag. Kein automatischer Übergang.",
  },
];

export default function SchuldbriefPage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header title="Schuldbriefverwaltung" subtitle="Kreditgeschäft · Back Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kreditgeschäft", href: "/backoffice/credit-operations" },
          { label: "Schuldbriefverwaltung" },
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
                <span className="text-sm font-bold text-text-primary">Lernblock – Schuldbriefverwaltung</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Kreditgeschäft verwaltet alle Schuldbriefe der Bank – von Eingang über Aufbewahrung bis zur Freigabe.</p>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Aufgaben:</p>
                  <ul className="space-y-1 ml-2">
                    {[
                      "Eingang und Aufbewahrung",
                      "Kontrolle Betrag und Rang",
                      "Freigabe nach Rückzahlung",
                      "Übertragung bei Eigentümerwechsel",
                    ].map((i) => (
                      <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Papierschuldbrief</p>
                    <ul className="space-y-1">
                      {[
                        "Physisches Dokument",
                        "Muss sicher aufbewahrt werden",
                        "Bei Verlust: aufwändige Ersatzausstellung",
                      ].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Registerschuldbrief (seit 2012)</p>
                    <ul className="space-y-1">
                      {[
                        "Nur im Grundbuch eingetragen",
                        "Kein physisches Dokument",
                        "Moderner und sicherer",
                      ].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Registerschuldbrief = kein Papier, nur Grundbucheintrag</p>
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
                "Bei Eingang Schuldbrief sofort prüfen: Betrag, Rang, Eigentümer korrekt?",
                "Papierschuldbrief sicher aufbewahren – Verlust ist sehr aufwändig",
                "Registerschuldbrief im Grundbuch direkt online prüfbar",
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
                "Schuldbrief nicht bei Eingang geprüft",
                "Falscher Rang im System erfasst",
                "Schuldbrief bei Kreditrückzahlung vergessen zurückzugeben",
                "Papierschuldbrief verlegt oder verloren",
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
