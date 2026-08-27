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
      "Kunde Thomas Keller plant einen Neubau. Er fragt nach dem Unterschied zwischen einem Baukredit und einer Hypothek.",
    question: "Was unterscheidet den Baukredit grundlegend von der Hypothek?",
    options: [
      { key: "A", text: "Baukredit und Hypothek sind dasselbe – nur die Laufzeit unterscheidet sich" },
      {
        key: "B",
        text: "Der Baukredit wird in Phasen (Tranchen) gemäss Baufortschritt ausgezahlt und nach Fertigstellung in eine Hypothek umgewandelt",
      },
      { key: "C", text: "Die Hypothek hat immer tiefere Zinsen als der Baukredit" },
      { key: "D", text: "Baukredite sind nur für Firmenkunden verfügbar" },
    ],
    correct: "B",
    feedback:
      "Der Baukredit ist ein kurzfristiger Kontokorrentkredit: Das Geld wird nicht auf einmal, sondern phasenweise nach Baufortschritt (Aushubb, Rohbau, Ausbau, Fertigstellung) ausbezahlt. Zinsen fallen nur auf den bezogenen Betrag an. Nach Fertigstellung und Bezugsfertigkeit wird der Baukredit in eine langfristige Hypothek umgewandelt.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: `Kundin Sarah Bührer baut ein Einfamilienhaus.
Bewilligter Baukredit-Rahmen: CHF 500'000
Aktuell bereits bezogen: CHF 230'000
Bauzins: 4.0% p.a.`,
    question: "Wie hoch ist Sarahs monatlicher Bauzins zum jetzigen Zeitpunkt?",
    options: [
      { key: "A", text: "CHF 1'667 / Monat (auf CHF 500'000 Kreditrahmen)" },
      { key: "B", text: "CHF 767 / Monat (auf CHF 230'000 bezogenen Betrag)" },
      { key: "C", text: "CHF 383 / Monat (Hälfte des vollen Baukreditzinses)" },
      { key: "D", text: "Noch keine Zinsen – erst nach Fertigstellung fällig" },
    ],
    correct: "B",
    feedback:
      "Beim Baukredit werden Zinsen nur auf den tatsächlich bezogenen Betrag berechnet: CHF 230'000 × 4.0% ÷ 12 = CHF 766.67 ≈ CHF 767/Monat. Der nicht bezogene Rest (CHF 270'000) verursacht noch keine Zinskosten. Dies ist der grosse Vorteil gegenüber einer sofortigen Gesamtauszahlung.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: `Bauherr Marco Rizzi, Kreditrahmen CHF 500'000.
Nach Rohbauabschluss meldet der Architekt eine Kostenmehrung von CHF 80'000.
Grund: unvorhergesehener Felsenabbau beim Aushub.

Marco kommt zur Bank und bittet um sofortige Auszahlung der zusätzlichen CHF 80'000.`,
    question: "Was ist das korrekte Vorgehen als Kundenberater?",
    options: [
      {
        key: "A",
        text: "Die CHF 80'000 sofort aus dem Baukredit auszahlen – das liegt ja noch im Rahmen der ursprünglichen Limite",
      },
      {
        key: "B",
        text: "Kostenmehrung als neue Krediterhöhung mit aktualisierten Dokumenten (Kostenvoranschlag, Baupläne) beantragen und Kreditoffizier entscheiden lassen",
      },
      {
        key: "C",
        text: "Den Baukredit ablehnen und Marco zur Konkurrenz schicken",
      },
      {
        key: "D",
        text: "Die CHF 80'000 als private Schuld von Marco verbuchen, ohne Anpassung des Baukredits",
      },
    ],
    correct: "B",
    feedback:
      "Jede Kostenmehrung erfordert einen formellen Nachtragsantrag: aktualisierter Kostenvoranschlag, Begründung (hier: Felsenabbau-Protokoll), neue Tragbarkeitsberechnung. Der Kreditoffizier muss die Krediterhöhung bewilligen. Eigenständige Auszahlung über die ursprüngliche Limite ohne Genehmigung ist ein Kontrollversagen. Merksatz: Kostenmehrung = neuer Kreditantrag.",
  },
];

export default function BaukreditPage() {
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
      <Header title="Baukredit" subtitle="Kreditgeschäfte · Eigenheimfinanzierung" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kreditgeschäfte", href: "/kreditgeschaefte" },
          { label: "Baukredit" },
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
                <span className="text-sm font-bold text-text-primary">Lernblock – Baukredit</span>
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
                  Der Baukredit ist ein kurzfristiger Kontokorrentkredit, der parallel zum Baufortschritt in Tranchen
                  ausgezahlt wird. Er überbrückt die Zeit zwischen Baubeginn und Fertigstellung, bevor er in eine
                  langfristige Hypothek umgewandelt wird.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Baukredit vs. Hypothek",
                      items: [
                        "Kurzfristig (Bautzeit)",
                        "Phasenweiser Bezug",
                        "Zins auf Bezogenem",
                        "Höherer Zinssatz",
                        "→ Umwandlung in Hypothek",
                      ],
                    },
                    {
                      title: "Phasenweiser Bezug",
                      items: [
                        "Phase 1: Aushub / Fundament",
                        "Phase 2: Rohbau",
                        "Phase 3: Ausbau & Technik",
                        "Phase 4: Fertigstellung",
                        "Auszahlung gegen Rechnungen",
                      ],
                    },
                    {
                      title: "Umwandlung",
                      items: [
                        "Nach Fertigstellung / Bezug",
                        "Baudarlehen → Hypothek",
                        "Neue Tragbarkeitsberechnung",
                        "Wahl: Festhyp. / SARON",
                        "Eigenkapitalnachweis",
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
                    Bauzins = bezogener Betrag × Zins ÷ 12. Kostenmehrung = neuer Kreditantrag mit Nachtragsgesuch.
                    Nie ohne Bewilligung auszahlen.
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
                "Baupläne und Kostenvoranschlag immer vollständig und aktuell einholen",
                "Phasenauszahlungen gegen originale Handwerkerrechnungen – nie pauschal",
                "Kostenmehrungen frühzeitig melden: Bauherr soll nicht warten bis zur Kreditlimit-Überschreitung",
                "Umwandlung in Hypothek rechtzeitig vorbereiten – Wartezeiten einkalkulieren",
                "Bei Selbstbauherren: Eigenleistungen separat bewerten und dokumentieren",
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
                "Zinsen auf Gesamtlimite statt auf bezogenen Betrag berechnet",
                "Kostenmehrung ohne Nachtragsantrag selbständig ausgezahlt",
                "Baukredit nicht rechtzeitig in Hypothek umgewandelt (Fristüberschreitung)",
                "Fehlende Schlussabrechnung vor Umwandlung akzeptiert",
                "Eigenleistungen des Bauherrn als echtes EK gewertet ohne Bewertung",
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
