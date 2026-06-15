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
    situation: "Kunde fragt: «Was ist ein Kapitalschutzprodukt?» – Du erklärst.",
    question: "Was ist die korrekte Antwort?",
    options: [
      {
        key: "A",
        text: "Ihr Kapital ist zu 100% garantiert und Sie erhalten maximale Rendite",
      },
      {
        key: "B",
        text: "Ihr eingesetztes Kapital ist geschützt, aber die Rendite ist begrenzt – Schutz kostet Ertrag",
      },
      { key: "C", text: "Das ist dasselbe wie ein Sparkonto – kein Unterschied" },
      {
        key: "D",
        text: "Kapitalschutz bedeutet keine Verluste auf dem gesamten Depot",
      },
    ],
    correct: "B",
    feedback:
      "Kapitalschutz ≠ Kapitalgarantie. Der Schutz gilt nur für das eingesetzte Kapital – nicht für das ganze Depot. Höherer Schutz = tiefere Rendite. Das ist das Grundprinzip strukturierter Produkte.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation:
      "Barrier Reverse Convertible (BRC): Basiswert Nestlé, Barriere 70%, Zins 8%, Laufzeit 1 Jahr. Nestlé fällt auf 65% des Ausgangswerts – die Barriere ist unterschritten.",
    question: "Was passiert am Laufzeitende?",
    options: [
      { key: "A", text: "Kunde erhält 100% Kapital + 8% Zins – Barriere schützt" },
      {
        key: "B",
        text: "Kunde erhält Nestlé Aktien zum Ausgangspreis + 8% Zins – macht Verlust",
      },
      { key: "C", text: "Produkt wird automatisch um 1 Jahr verlängert" },
      { key: "D", text: "Bank übernimmt den Verlust automatisch" },
    ],
    correct: "B",
    feedback:
      "Barriere unterschritten = Kunde erhält Aktien statt Kapital. Den 8% Zins erhält er trotzdem – aber der Aktienverlust überwiegt. Merksatz: Barriere = Sicherheitsnetz. Durchbrochen = kein Kapitalschutz mehr.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation:
      "Konservative Kundin, 72 Jahre alt, fragt nach einem BRC mit 12% Zins. Sie sagt: «Das klingt viel besser als mein Sparkonto!»",
    question: "Was machst du?",
    options: [
      { key: "A", text: "BRC direkt empfehlen – die hohe Rendite überzeugt" },
      {
        key: "B",
        text: "Erst Risikoprofil prüfen – BRC ohne Kapitalschutz nicht geeignet für konservative Anleger",
      },
      { key: "C", text: "Produkt kurz erklären und direkt Bestellung auslösen" },
      { key: "D", text: "Sparkonto und BRC sind vergleichbar – kein Problem" },
    ],
    correct: "B",
    feedback:
      "12% Zins klingt verlockend – aber BRC hat kein Kapitalschutz. 72-jährige konservative Anlegerin = falsches Produkt. FIDLEG verlangt Eignungsprüfung vor Empfehlung. Rendite ist verlockend – Eignung geht vor.",
  },
];

export default function StrukturierteProduktePage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header title="Strukturierte Produkte" subtitle="Anlagekunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde", href: "/anlagekunde" },
          { label: "Strukturierte Produkte" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button onClick={() => setLernOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Strukturierte Produkte</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Strukturierte Produkte = Kombination aus Anlage + Absicherung. Drei Hauptkategorien mit unterschiedlichem Schutz-Rendite-Profil.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Kapitalschutz",
                      items: ["Kapital 100% geschützt", "Tiefere Rendite", "Für risikoscheue Anleger"],
                    },
                    {
                      title: "Renditeoptimierung",
                      items: ["Kein Kapitalschutz", "Höhere Rendite möglich", "z.B. BRC"],
                    },
                    {
                      title: "Partizipation",
                      items: ["Nimmt an Kursentwicklung teil", "z.B. Tracker Zertifikat", "Kein Kapitalschutz"],
                    },
                  ].map((b) => (
                    <div key={b.title} className="rounded-DEFAULT border border-border p-3 space-y-2">
                      <p className="font-bold text-text-primary text-xs uppercase tracking-wider">{b.title}</p>
                      <ul className="space-y-1">
                        {b.items.map((i) => (
                          <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Höherer Schutz = tiefere Rendite. Immer.</p>
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
                "Strukturierte Produkte nur empfehlen wenn Kunde sie wirklich versteht",
                "Laufzeit und Barriere immer erklären – nie nur den Zins nennen",
                "Nicht geeignet für konservative Anleger ohne Eignungsprüfung (FIDLEG)",
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
              {["Kapitalschutz mit Kapitalgarantie verwechseln", "Barriere nicht erklärt", "Produkt empfohlen ohne Verständnisprüfung", "Laufzeit vergessen zu erwähnen"].map((f) => (
                <li key={f} className="flex gap-2"><span className="shrink-0">❌</span><span>{f}</span></li>
              ))}
            </ul>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
          {SCENARIOS.map((s) => (
            <SubModuleMCQ key={s.num} scenarioNum={s.num} levelLabel={s.level} situation={s.situation} question={s.question} options={s.options} correct={s.correct} feedback={s.feedback} />
          ))}
        </div>
      </div>
    </>
  );
}
