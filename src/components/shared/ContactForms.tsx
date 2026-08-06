"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const N = "#0A1628";
const CY = "#00D4B8";

type Tab = "lernender" | "bank";

interface LF {
  vorname: string; nachname: string; email: string;
  nachricht: string; einverstanden: boolean;
}
interface BF {
  vorname: string; nachname: string; institution: string;
  funktion: string; email: string; anzahlLernende: string;
  nachricht: string; einverstanden: boolean;
}

const EMPTY_LF: LF = { vorname: "", nachname: "", email: "", nachricht: "", einverstanden: false };
const EMPTY_BF: BF = { vorname: "", nachname: "", institution: "", funktion: "", email: "", anzahlLernende: "", nachricht: "", einverstanden: false };

const inp = (err: boolean): React.CSSProperties => ({
  width: "100%", padding: "12px 16px", borderRadius: 10,
  border: `1.5px solid ${err ? "#ef4444" : "#e5e7eb"}`,
  fontSize: 14, color: "#111827", background: "#fff",
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  transition: "border-color 0.15s",
});

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{label} *</label>
      {children}
      {error && <p style={{ margin: 0, fontSize: 12, color: "#ef4444" }}>{error}</p>}
    </div>
  );
}

export function ContactForms({ initialTab }: { initialTab?: Tab } = {}) {
  const [tab, setTab] = useState<Tab>(initialTab ?? "lernender");

  useEffect(() => {
    if (initialTab) setTab(initialTab);
  }, [initialTab]);
  const [lf, setLf] = useState<LF>(EMPTY_LF);
  const [bf, setBf] = useState<BF>(EMPTY_BF);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  function switchTab(t: Tab) {
    setTab(t);
    setErrors({});
    setServerError("");
  }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    const f = tab === "lernender" ? lf : bf;
    if (!f.vorname.trim()) e.vorname = "Pflichtfeld";
    if (!f.nachname.trim()) e.nachname = "Pflichtfeld";
    if (!f.email.trim()) e.email = "Pflichtfeld";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Ungültige E-Mail";
    if (!f.nachricht.trim()) e.nachricht = "Pflichtfeld";
    if (!f.einverstanden) e.einverstanden = "Pflichtfeld";
    if (tab === "bank") {
      const b = bf;
      if (!b.institution.trim()) e.institution = "Pflichtfeld";
      if (!b.funktion.trim()) e.funktion = "Pflichtfeld";
      if (!b.anzahlLernende) e.anzahlLernende = "Pflichtfeld";
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tab === "lernender" ? { type: "lernender", ...lf } : { type: "bank", ...bf }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setServerError("Ein Fehler ist aufgetreten. Bitte versuch es nochmals.");
      }
    } catch {
      setServerError("Ein Fehler ist aufgetreten. Bitte versuch es nochmals.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: `${CY}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          animation: "contactPopIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both",
        }}>
          <CheckCircle2 size={40} color={CY} />
        </div>
        <h2 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800, color: N }}>Vielen Dank!</h2>
        <p style={{ margin: 0, fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
          Wir melden uns so schnell wie möglich.
        </p>
        <style>{`@keyframes contactPopIn{0%{transform:scale(.5);opacity:0}100%{transform:scale(1);opacity:1}}`}</style>
      </div>
    );
  }

  const setL = (k: keyof LF, v: string | boolean) => { setLf(f => ({ ...f, [k]: v })); setErrors(e => { const n = {...e}; delete n[k as string]; return n; }); };
  const setB = (k: keyof BF, v: string | boolean) => { setBf(f => ({ ...f, [k]: v })); setErrors(e => { const n = {...e}; delete n[k as string]; return n; }); };
  const g = tab === "lernender" ? lf : bf;
  const setG = tab === "lernender"
    ? (k: string, v: string | boolean) => setL(k as keyof LF, v)
    : (k: string, v: string | boolean) => setB(k as keyof BF, v);

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb", marginBottom: 32 }}>
        {(["lernender", "bank"] as Tab[]).map(t => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => switchTab(t)}
              style={{
                flex: 1, padding: "12px 8px", border: "none", background: "none",
                fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? N : "#9ca3af", cursor: "pointer",
                borderBottom: `3px solid ${active ? CY : "transparent"}`,
                marginBottom: -2, transition: "all 0.2s",
              }}
            >
              {t === "lernender" ? "Ich bin Lernende/r" : "Ich bin eine Bank / Institution"}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: N, letterSpacing: "-0.3px" }}>
          Kontakt aufnehmen
        </h2>

        {/* Vorname + Nachname */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Vorname" error={errors.vorname}>
            <input type="text" value={g.vorname} onChange={e => setG("vorname", e.target.value)}
              style={inp(!!errors.vorname)} placeholder="Max" />
          </Field>
          <Field label="Nachname" error={errors.nachname}>
            <input type="text" value={g.nachname} onChange={e => setG("nachname", e.target.value)}
              style={inp(!!errors.nachname)} placeholder="Mustermann" />
          </Field>
        </div>

        {/* Bank-only fields */}
        {tab === "bank" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Institution / Bankname" error={errors.institution}>
              <input type="text" value={bf.institution} onChange={e => setB("institution", e.target.value)}
                style={inp(!!errors.institution)} placeholder="Musterbank AG" />
            </Field>
            <Field label="Funktion / Rolle" error={errors.funktion}>
              <input type="text" value={bf.funktion} onChange={e => setB("funktion", e.target.value)}
                style={inp(!!errors.funktion)} placeholder="Ausbildungsverantwortliche/r" />
            </Field>
          </div>
        )}

        {/* Email */}
        <Field label={tab === "bank" ? "E-Mail geschäftlich" : "E-Mail"} error={errors.email}>
          <input type="email" value={g.email} onChange={e => setG("email", e.target.value)}
            style={inp(!!errors.email)} placeholder="max@beispiel.ch" />
        </Field>

        {/* Bank: Anzahl Lernende */}
        {tab === "bank" && (
          <Field label="Anzahl Lernende" error={errors.anzahlLernende}>
            <select
              value={bf.anzahlLernende}
              onChange={e => setB("anzahlLernende", e.target.value)}
              style={{ ...inp(!!errors.anzahlLernende), cursor: "pointer" }}
            >
              <option value="">Bitte wählen…</option>
              <option value="1-50">1–50</option>
              <option value="51-200">51–200</option>
              <option value="201-500">201–500</option>
              <option value="500+">500+</option>
            </select>
          </Field>
        )}

        {/* Nachricht */}
        <Field label={tab === "bank" ? "Nachricht / Anliegen" : "Nachricht"} error={errors.nachricht}>
          <textarea
            value={g.nachricht} onChange={e => setG("nachricht", e.target.value)}
            style={{ ...inp(!!errors.nachricht), minHeight: 120, resize: "vertical" }}
            placeholder="Was möchtest du uns mitteilen?" rows={4}
          />
        </Field>

        {/* Einverständnis */}
        <div>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={g.einverstanden as boolean}
              onChange={e => setG("einverstanden", e.target.checked)}
              style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, accentColor: CY, cursor: "pointer" }}
            />
            <span style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.55 }}>
              Ich bin damit einverstanden dass BankAcademy mich kontaktieren darf *
            </span>
          </label>
          {errors.einverstanden && (
            <p style={{ margin: "4px 0 0 26px", fontSize: 12, color: "#ef4444" }}>
              Bitte bestätige dein Einverständnis.
            </p>
          )}
        </div>

        {serverError && <p style={{ margin: 0, fontSize: 13, color: "#ef4444" }}>{serverError}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", padding: "14px 24px", borderRadius: 100,
            fontSize: 15, fontWeight: 700,
            background: loading ? "#9ca3af" : N,
            color: "#fff", border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.01)"; } }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          {loading ? "Wird gesendet…" : "Kontakt aufnehmen →"}
        </button>
      </form>
    </div>
  );
}
