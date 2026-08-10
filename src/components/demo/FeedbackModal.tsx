"use client";

import { useEffect, useState } from "react";

const TEAL = "#1ddba0";
const DARK = "#0a1628";
const CARD = "#091425";
const BORDER = "#1e3155";
const TEXT = "#e2e8f0";
const MUTED = "#7e93b0";

type Answers = {
  easeOfUse: number;
  scenarioRelevance: number;
  usageFrequency: string;
  bestModule: string;
  betterPrepared: string;
  difficultyRating: string;
  bestFeatures: string[];
  likedMost: string;
  improvements: string;
  wouldRecommend: string;
  apprenticeshipYear: string;
  bankName: string;
  contactConsent: boolean;
};

const INITIAL: Answers = {
  easeOfUse: 0,
  scenarioRelevance: 0,
  usageFrequency: "",
  bestModule: "",
  betterPrepared: "",
  difficultyRating: "",
  bestFeatures: [],
  likedMost: "",
  improvements: "",
  wouldRecommend: "",
  apprenticeshipYear: "",
  bankName: "",
  contactConsent: false,
};

function StarRating({
  value,
  onChange,
  hint,
}: {
  value: number;
  onChange: (v: number) => void;
  hint: string;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 30,
              color: n <= (hover || value) ? TEAL : BORDER,
              padding: "0 2px",
              lineHeight: 1,
              transition: "color 0.1s",
            }}
          >
            ★
          </button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: MUTED }}>{hint}</div>
    </div>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: string[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const selected = multi ? (value as string[]) : [value as string];
  const toggle = (opt: string) => {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(opt) ? arr.filter((x) => x !== opt) : [...arr, opt]);
    } else {
      onChange((value as string) === opt ? "" : opt);
    }
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            style={{
              padding: "7px 16px",
              borderRadius: 50,
              border: `1.5px solid ${active ? TEAL : BORDER}`,
              background: active ? `${TEAL}26` : "transparent",
              color: active ? TEAL : TEXT,
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Q({ num, label, children }: { num: number; label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 12, color: MUTED, fontWeight: 600, marginBottom: 4, letterSpacing: "0.05em" }}>
        FRAGE {num}
      </div>
      <div style={{ fontSize: 15, color: TEXT, fontWeight: 600, marginBottom: 12, lineHeight: 1.4 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

interface Props {
  onClose: () => void;
  onSubmitted: () => void;
  sessionId?: string;
  email?: string;
  vorname?: string;
}

export function FeedbackModal({ onClose, onSubmitted, sessionId, email, vorname }: Props) {
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => {
      onSubmitted();
      onClose();
    }, 3000);
    return () => clearTimeout(t);
  }, [submitted, onClose, onSubmitted]);

  function setField<K extends keyof Answers>(key: K, val: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/pilot-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId ?? null,
          email: email ?? null,
          vorname: vorname ?? null,
          easeOfUse: answers.easeOfUse || null,
          scenarioRelevance: answers.scenarioRelevance || null,
          usageFrequency: answers.usageFrequency || null,
          bestModule: answers.bestModule || null,
          betterPrepared: answers.betterPrepared || null,
          difficultyRating: answers.difficultyRating || null,
          bestFeatures: answers.bestFeatures.length ? answers.bestFeatures : null,
          likedMost: answers.likedMost || null,
          improvements: answers.improvements || null,
          wouldRecommend: answers.wouldRecommend || null,
          apprenticeshipYear: answers.apprenticeshipYear || null,
          bankName: answers.bankName || null,
          contactConsent: answers.contactConsent,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const taStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: `1.5px solid ${BORDER}`,
    background: CARD,
    color: TEXT,
    fontSize: 14,
    resize: "vertical",
    minHeight: 80,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    lineHeight: 1.5,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: `1.5px solid ${BORDER}`,
    background: CARD,
    color: TEXT,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237e93b0' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: 38,
  };

  // Success screen
  if (submitted) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(4px)",
          padding: 16,
        }}
      >
        <div
          style={{
            background: DARK,
            border: `1.5px solid ${BORDER}`,
            borderRadius: 20,
            padding: "48px 40px",
            textAlign: "center",
            maxWidth: 400,
            width: "100%",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: `${TEAL}20`,
              border: `2px solid ${TEAL}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 32,
            }}
          >
            ✓
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 10 }}>
            Vielen Dank für dein Feedback!
          </div>
          <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
            Dein Input hilft uns, BankAcademy zu verbessern. 🎉
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        padding: 16,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: DARK,
          border: `1.5px solid ${BORDER}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 560,
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px 18px",
            borderBottom: `1px solid ${BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>
              Pilot-Feedback 💬
            </div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>
              Hilf uns, BankAcademy zu verbessern
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: MUTED,
              fontSize: 20,
              lineHeight: 1,
              padding: "4px 8px",
              borderRadius: 8,
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable form */}
        <div style={{ overflowY: "auto", padding: "24px 24px 8px", flex: 1 }}>
          <Q num={1} label="Wie einfach war die App zu bedienen?">
            <StarRating
              value={answers.easeOfUse}
              onChange={(v) => setField("easeOfUse", v)}
              hint="1 = schwierig · 5 = sehr einfach"
            />
          </Q>

          <Q num={2} label="Wie praxisnah waren die Szenarien?">
            <StarRating
              value={answers.scenarioRelevance}
              onChange={(v) => setField("scenarioRelevance", v)}
              hint="1 = wenig praxisnah · 5 = sehr praxisnah"
            />
          </Q>

          <Q num={3} label="Wie oft wirst du BankAcademy nutzen?">
            <ChipGroup
              options={["Täglich", "Wöchentlich", "Vor Prüfungen"]}
              value={answers.usageFrequency}
              onChange={(v) => setField("usageFrequency", v as string)}
            />
          </Q>

          <Q num={4} label="Welches Modul hat dir am meisten geholfen?">
            <select
              value={answers.bestModule}
              onChange={(e) => setField("bestModule", e.target.value)}
              style={selectStyle}
            >
              <option value="">– Modul auswählen –</option>
              <option>Privatkunde</option>
              <option>Firmenkunde</option>
              <option>Anlagekunde</option>
              <option>Banking Operations</option>
              <option>Credit Operations</option>
              <option>Credit Office</option>
            </select>
          </Q>

          <Q num={5} label="Fühlst du dich besser auf den Bankalltag vorbereitet?">
            <ChipGroup
              options={["Ja", "Weiss nicht", "Nein"]}
              value={answers.betterPrepared}
              onChange={(v) => setField("betterPrepared", v as string)}
            />
          </Q>

          <Q num={6} label="Waren die Szenarien schwierig genug?">
            <ChipGroup
              options={["Zu einfach", "Genau richtig", "Zu schwierig"]}
              value={answers.difficultyRating}
              onChange={(v) => setField("difficultyRating", v as string)}
            />
          </Q>

          <Q num={7} label="Welches Feature hat dir am besten gefallen? (Mehrfachauswahl)">
            <ChipGroup
              options={["Szenarien", "Fehler finden", "KI-Gespräch", "Challenge-Modus"]}
              value={answers.bestFeatures}
              onChange={(v) => setField("bestFeatures", v as string[])}
              multi
            />
          </Q>

          <Q num={8} label="Was hat dir am besten gefallen?">
            <textarea
              style={taStyle}
              value={answers.likedMost}
              onChange={(e) => setField("likedMost", e.target.value)}
              placeholder="Dein Feedback…"
            />
          </Q>

          <Q num={9} label="Was würdest du verbessern?">
            <textarea
              style={taStyle}
              value={answers.improvements}
              onChange={(e) => setField("improvements", e.target.value)}
              placeholder="Deine Ideen…"
            />
          </Q>

          <Q num={10} label="Würdest du BankAcademy weiterempfehlen?">
            <ChipGroup
              options={["Ja", "Vielleicht", "Nein"]}
              value={answers.wouldRecommend}
              onChange={(v) => setField("wouldRecommend", v as string)}
            />
          </Q>

          <Q num={11} label="In welchem Lehrjahr bist du?">
            <ChipGroup
              options={["1.", "2.", "3.", "Quereinsteiger"]}
              value={answers.apprenticeshipYear}
              onChange={(v) => setField("apprenticeshipYear", v as string)}
            />
          </Q>

          <Q num={12} label="Bei welcher Bank machst du die Lehre? (optional)">
            <input
              type="text"
              style={inputStyle}
              value={answers.bankName}
              onChange={(e) => setField("bankName", e.target.value)}
              placeholder="z.B. Kantonalbank, Raiffeisen, UBS…"
            />
          </Q>

          {/* Q13: Checkbox */}
          <div style={{ marginBottom: 28 }}>
            <label
              style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
            >
              <div
                role="checkbox"
                aria-checked={answers.contactConsent}
                tabIndex={0}
                onClick={() => setField("contactConsent", !answers.contactConsent)}
                onKeyDown={(e) =>
                  (e.key === " " || e.key === "Enter") &&
                  setField("contactConsent", !answers.contactConsent)
                }
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  flexShrink: 0,
                  marginTop: 1,
                  border: `2px solid ${answers.contactConsent ? TEAL : BORDER}`,
                  background: answers.contactConsent ? TEAL : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s",
                  cursor: "pointer",
                }}
              >
                {answers.contactConsent && (
                  <span style={{ fontSize: 11, color: DARK, fontWeight: 800, lineHeight: 1 }}>
                    ✓
                  </span>
                )}
              </div>
              <span style={{ fontSize: 13, color: TEXT, lineHeight: 1.6 }}>
                BankAcademy darf mich für weitere Fragen kontaktieren
              </span>
            </label>
          </div>

          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                background: "#3f0a0a",
                border: "1px solid #7f1d1d",
                color: "#fca5a5",
                fontSize: 13,
                marginBottom: 16,
              }}
            >
              Fehler beim Speichern. Bitte nochmals versuchen.
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: submitting ? "#0f8c65" : TEAL,
              color: DARK,
              fontSize: 15,
              fontWeight: 700,
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "background 0.2s, opacity 0.2s",
              marginBottom: 24,
            }}
          >
            {submitting ? "Wird gespeichert…" : "Feedback absenden"}
          </button>
        </div>
      </div>
    </div>
  );
}
