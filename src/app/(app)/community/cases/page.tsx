"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";

interface CommunityCase {
  id: string;
  titel: string;
  bereich: string;
  beschreibung: string;
  herausforderung: string;
  gelernt: string;
  timestamp: string;
  likes: number;
  comments: string[];
}

const SEED_CASES: CommunityCase[] = [
  {
    id: "seed-1",
    titel: "Kunde wollte CHF 100k Blankokredit",
    bereich: "Kredit",
    beschreibung:
      "Gut verdienender Kunde, CHF 8'000 Monatslohn, wollte einen grossen Blankokredit. ZEK zeigte aber bereits CHF 45'000 Leasingverpflichtungen.",
    herausforderung: "Kreditfähigkeit prüfen obwohl Kunde sehr überzeugend war",
    gelernt: "Immer ZEK zuerst – egal wie seriös der Kunde wirkt. Zahlen lügen nicht.",
    timestamp: "2026-05-15T10:00:00Z",
    likes: 24,
    comments: [
      "Wichtiger Fall – ZEK rettet einen vor vielen Fehlern!",
      "Kenne das. Kunden sind oft sehr überzeugend.",
    ],
  },
  {
    id: "seed-2",
    titel: "Abgelaufener Pass beim Neukunden",
    bereich: "KYC",
    beschreibung:
      "Neukunde kam zur Kontoeröffnung, Ausweis war seit 2 Monaten abgelaufen. Wollte unbedingt heute noch eröffnen.",
    herausforderung: "Kunden ablehnen ohne ihn zu verprellen",
    gelernt:
      "VSB ist klar: kein gültiger Ausweis = keine Eröffnung. Freundlich aber bestimmt erklären.",
    timestamp: "2026-05-18T14:30:00Z",
    likes: 18,
    comments: [
      "Passiert öfter als man denkt.",
      "Gut erklärt. Die VSB lässt keinen Spielraum.",
    ],
  },
  {
    id: "seed-3",
    titel: "PEP Status vergessen nachzufragen",
    bereich: "KYC / Compliance",
    beschreibung:
      "Neukunde, schien normal, Konto eröffnet. Später festgestellt: war Verwandter eines Politikers.",
    herausforderung: "PEP-Frage wurde nicht gestellt",
    gelernt:
      "PEP-Frage ist IMMER zu stellen. Keine Ausnahmen. Compliance-Problem ist schwer rückgängig zu machen.",
    timestamp: "2026-05-20T09:15:00Z",
    likes: 31,
    comments: [
      "Kritischer Fall. PEP-Frage ist nicht optional!",
      "Danke für die Erinnerung. Audit-relevant.",
    ],
  },
  {
    id: "seed-4",
    titel: "Hypothek Verlängerung ohne Pricing",
    bereich: "Kredit",
    beschreibung:
      "Hypothek lief ab, Berater hat mündlich Konditionen besprochen aber kein Pricing ausgefüllt.",
    herausforderung: "Kunde bestand auf mündliche Zusage",
    gelernt:
      "Immer Pricing ausfüllen und unterschreiben lassen. Mündliche Zusagen sind nicht verbindlich.",
    timestamp: "2026-05-22T11:00:00Z",
    likes: 15,
    comments: ["Klassiker. Passiert leider häufig."],
  },
  {
    id: "seed-5",
    titel: "Formular A bei Sitzgesellschaft vergessen",
    bereich: "KYC",
    beschreibung:
      "Firmenkonto für Sitzgesellschaft eröffnet, Formular K ausgefüllt aber Formular A vergessen.",
    herausforderung: "Interner Audit hat den Fehler gefunden",
    gelernt: "Sitzgesellschaft = Formular A pflichtmässig. Formular K reicht nicht.",
    timestamp: "2026-05-25T16:00:00Z",
    likes: 22,
    comments: ["Super wichtig! Sitzgesellschaft hat spezielle Anforderungen."],
  },
];

const BEREICH_OPTIONS = [
  "KYC",
  "Kredit",
  "Zahlungsverkehr",
  "Compliance",
  "Hypotheken",
  "Firmenkunde",
  "Anlagekunde",
  "Sonstiges",
];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function BereichBadge({ bereich }: { bereich: string }) {
  if (bereich === "Kredit") {
    return (
      <span className="rounded-full border border-primary/20 bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
        {bereich}
      </span>
    );
  }
  if (bereich === "KYC" || bereich === "KYC / Compliance") {
    return (
      <span
        className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
        style={{ backgroundColor: "#E8EBF7", color: "#00C9B1" }}
      >
        {bereich}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
      {bereich}
    </span>
  );
}

export default function CommunityPage() {
  const [cases, setCases] = useState<CommunityCase[]>(SEED_CASES);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [titel, setTitel] = useState("");
  const [bereich, setBereich] = useState(BEREICH_OPTIONS[0]);
  const [beschreibung, setBeschreibung] = useState("");
  const [herausforderung, setHerausforderung] = useState("");
  const [gelernt, setGelernt] = useState("");

  // Load persisted data on mount
  useEffect(() => {
    try {
      const rawCases = localStorage.getItem("community-cases");
      const userCases: CommunityCase[] = rawCases ? JSON.parse(rawCases) : [];
      setCases([...SEED_CASES, ...userCases]);
    } catch {
      setCases(SEED_CASES);
    }

    try {
      const rawLiked = localStorage.getItem("community-liked-ids");
      const likedArr: string[] = rawLiked ? JSON.parse(rawLiked) : [];
      setLikedIds(new Set(likedArr));
    } catch {
      setLikedIds(new Set());
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newCase: CommunityCase = {
      id: crypto.randomUUID(),
      titel,
      bereich,
      beschreibung,
      herausforderung,
      gelernt,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    setCases((prev) => {
      const updated = [...prev, newCase];
      // Persist only user cases (non-seed)
      const userCases = updated.filter((c) => !c.id.startsWith("seed-"));
      try {
        localStorage.setItem("community-cases", JSON.stringify(userCases));
      } catch {}
      return updated;
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setTitel("");
      setBereich(BEREICH_OPTIONS[0]);
      setBeschreibung("");
      setHerausforderung("");
      setGelernt("");
    }, 2000);
  }

  function toggleLike(id: string) {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem("community-liked-ids", JSON.stringify([...next]));
      } catch {}
      return next;
    });

    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, likes: likedIds.has(id) ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  }

  function addComment(caseId: string) {
    const text = (newComment[caseId] ?? "").trim();
    if (!text) return;

    setCases((prev) => {
      const updated = prev.map((c) =>
        c.id === caseId ? { ...c, comments: [...c.comments, text] } : c
      );
      // Persist user cases
      const userCases = updated.filter((c) => !c.id.startsWith("seed-"));
      try {
        localStorage.setItem("community-cases", JSON.stringify(userCases));
      } catch {}
      return updated;
    });

    setNewComment((prev) => ({ ...prev, [caseId]: "" }));
  }

  const inputClass =
    "border border-border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary bg-white text-text-primary placeholder:text-text-secondary";

  return (
    <>
      <Header
        title="Praxisfälle"
        subtitle="Lerne aus realen anonymisierten Banking-Situationen"
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            {cases.length} {cases.length === 1 ? "Fall" : "Fälle"}
          </p>
          <button
            onClick={() => {
              setShowForm((v) => !v);
              setSubmitted(false);
            }}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Fall einreichen
          </button>
        </div>

        {/* Submit form */}
        {showForm && (
          <div className="mb-6 rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-text-primary">
              Fall einreichen
            </h2>

            {submitted ? (
              <div className="flex items-center gap-2 rounded-xl bg-accent-light px-4 py-3 text-sm font-semibold text-accent">
                ✓ Danke! Dein Fall wird geprüft.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">
                    Titel
                  </label>
                  <input
                    type="text"
                    required
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                    placeholder="Kurze Beschreibung des Falls"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">
                    Bereich
                  </label>
                  <select
                    value={bereich}
                    onChange={(e) => setBereich(e.target.value)}
                    className={inputClass}
                  >
                    {BEREICH_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">
                    Beschreibung
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={beschreibung}
                    onChange={(e) => setBeschreibung(e.target.value)}
                    placeholder="Beschreibe den Fall anonymisiert..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">
                    Herausforderung
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={herausforderung}
                    onChange={(e) => setHerausforderung(e.target.value)}
                    placeholder="Was war die Herausforderung?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-text-secondary">
                    Was hast du gelernt?
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={gelernt}
                    onChange={(e) => setGelernt(e.target.value)}
                    placeholder="Was hast du gelernt?"
                    className={inputClass}
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Fall einreichen →
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-gray-50"
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Cases list */}
        <div className="space-y-4">
          {cases.map((c) => {
            const isExpanded = expandedId === c.id;
            const isLiked = likedIds.has(c.id);
            const preview =
              c.beschreibung.length > 100
                ? c.beschreibung.slice(0, 100) + "…"
                : c.beschreibung;

            return (
              <div
                key={c.id}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                {/* Top row: badge + date */}
                <div className="mb-2 flex items-center justify-between gap-2">
                  <BereichBadge bereich={c.bereich} />
                  <span className="text-xs text-text-secondary">
                    {formatDate(c.timestamp)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base font-bold text-text-primary">
                  {c.titel}
                </h3>

                {/* Description preview / full */}
                {isExpanded ? (
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-text-primary">
                      {c.beschreibung}
                    </p>

                    <div className="rounded-xl border border-border bg-gray-50 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                        ⚡ Herausforderung
                      </p>
                      <p className="text-sm leading-relaxed text-text-primary">
                        {c.herausforderung}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-accent-light p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                        💡 Was ich gelernt habe
                      </p>
                      <p className="text-sm leading-relaxed text-text-primary">
                        {c.gelernt}
                      </p>
                    </div>

                    {/* Comments */}
                    {c.comments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                          Kommentare
                        </p>
                        {c.comments.map((comment, i) => (
                          <div
                            key={i}
                            className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-text-primary"
                          >
                            {comment}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add comment */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment[c.id] ?? ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [c.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addComment(c.id);
                        }}
                        placeholder="Kommentar hinzufügen..."
                        className="flex-1 rounded-xl border border-border px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        onClick={() => addComment(c.id)}
                        className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        Senden
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {preview}
                  </p>
                )}

                {/* Bottom row: toggle + like */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setExpandedId((prev) => (prev === c.id ? null : c.id))
                    }
                    className="text-xs font-semibold text-primary transition-opacity hover:opacity-75"
                  >
                    {isExpanded ? "Weniger" : "Mehr lesen"}
                  </button>

                  <button
                    onClick={() => toggleLike(c.id)}
                    className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-75"
                  >
                    <span style={{ color: isLiked ? "#00C9B1" : undefined }}>
                      {isLiked ? "❤️" : "🤍"}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isLiked ? "text-accent" : "text-text-secondary"
                      }`}
                    >
                      {c.likes}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
