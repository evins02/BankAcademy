"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type KycFormData, EMPTY_FORM } from "./kyc-form-types";

const CUSTOMER_DOSSIER = [
  { label: "Name", value: "Thomas Kowalski" },
  { label: "Geburtsdatum", value: "14.06.1985" },
  { label: "Nationalität", value: "Polnisch" },
  { label: "Wohnsitz", value: "Bergstrasse 22, 3007 Bern" },
  { label: "Ausweistyp", value: "Ausländischer Reisepass" },
  { label: "Ausweisnummer", value: "X1234567" },
  { label: "Gültig bis", value: "14.05.2027" },
  { label: "Aufenthaltsbewilligung", value: "Ausweis B" },
  { label: "Wohnsitzbestätigung", value: "vorhanden" },
  { label: "Beruf", value: "Projektleiter IT, Swisscom AG (100%)" },
  { label: "Zivilstand", value: "Verheiratet, 2 Kinder" },
  { label: "Einkommen", value: "CHF 95'000/Jahr netto" },
  { label: "Vermögen", value: "ca. CHF 45'000 (Herkunft: Lohn)" },
  { label: "Andere Bankbeziehungen", value: "PostFinance" },
  { label: "Zweck", value: "Lohnkonto + Zahlungsverkehr" },
  { label: "WiBe", value: "Identisch mit Kontoinhaber" },
  { label: "PEP", value: "Nein" },
  { label: "US-Verbindung", value: "Keine" },
];

interface FieldRowProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  note?: string;
}

function FieldRow({ label, required, children, note }: FieldRowProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 items-start py-3 border-b border-border last:border-0">
      <label className="text-sm text-text-secondary pt-2 leading-snug">
        {label}
        {required && <span className="text-text-secondary ml-0.5">*</span>}
        {note && (
          <span className="block text-xs text-text-secondary mt-0.5">
            {note}
          </span>
        )}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 border-b border-border"
      style={{ background: "var(--background)" }}
    >
      <span
        className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
        style={{ background: "var(--primary, #0D1B4B)" }}
      >
        {num}
      </span>
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );
}

// ── Formular A (read-only official document) ───────────────────────────────
function FormularADocument() {
  const today = new Date().toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      className="rounded-lg overflow-hidden text-sm"
      style={{
        border: "2px solid #9ca3af",
        background: "#fff",
        color: "#111",
      }}
    >
      {/* Document header */}
      <div
        className="flex items-start justify-between px-5 py-4"
        style={{ borderBottom: "2px solid #9ca3af", background: "#f9fafb" }}
      >
        <div>
          <p className="font-bold tracking-wide" style={{ fontSize: 15 }}>
            FORMULAR A
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
            Feststellung des wirtschaftlich Berechtigten – VSB 20 Art. 4
          </p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="text-xs font-bold" style={{ color: "#374151" }}>MUSTERBANK AG</p>
          <p className="mt-0.5" style={{ fontSize: 10, color: "#6b7280" }}>
            Formular-Nr. VSB20-A / 2024
          </p>
        </div>
      </div>

      {/* 1. Kontoinhaber */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <p
          className="font-bold uppercase mb-3"
          style={{ fontSize: 10, letterSpacing: "0.08em", color: "#6b7280" }}
        >
          1. Angaben zum Kontoinhaber
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <div>
            <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Name / Vorname
            </p>
            <p
              className="font-medium mt-0.5 pb-1"
              style={{ fontSize: 13, color: "#111", borderBottom: "1px solid #d1d5db" }}
            >
              Kowalski, Thomas
            </p>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Geburtsdatum
            </p>
            <p
              className="font-medium mt-0.5 pb-1"
              style={{ fontSize: 13, color: "#111", borderBottom: "1px solid #d1d5db" }}
            >
              14.05.1989
            </p>
          </div>
          <div className="col-span-2">
            <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Wohnadresse
            </p>
            <p
              className="font-medium mt-0.5 pb-1"
              style={{ fontSize: 13, color: "#111", borderBottom: "1px solid #d1d5db" }}
            >
              Langstrasse 84, 8004 Zürich
            </p>
          </div>
        </div>
      </div>

      {/* 2. Wirtschaftlich Berechtigte Person */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <p
          className="font-bold uppercase mb-3"
          style={{ fontSize: 10, letterSpacing: "0.08em", color: "#6b7280" }}
        >
          2. Wirtschaftlich Berechtigte Person
        </p>
        <div className="space-y-2.5">
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 mt-0.5 flex items-center justify-center rounded"
              style={{ width: 16, height: 16, border: "2px solid #111", background: "#111" }}
            >
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1 }}>✓</span>
            </div>
            <span style={{ fontSize: 13, color: "#111" }}>
              Der Kontoinhaber ist gleichzeitig die wirtschaftlich berechtigte Person.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 mt-0.5 rounded"
              style={{ width: 16, height: 16, border: "1px solid #d1d5db" }}
            />
            <span style={{ fontSize: 13, color: "#9ca3af" }}>
              Die wirtschaftlich berechtigte Person ist eine Drittperson:{" "}
              <span
                className="inline-block"
                style={{ width: 120, borderBottom: "1px solid #d1d5db", verticalAlign: "bottom" }}
              />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Erklärung */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
        <p
          className="font-bold uppercase mb-2"
          style={{ fontSize: 10, letterSpacing: "0.08em", color: "#6b7280" }}
        >
          3. Erklärung des Kontoinhabers
        </p>
        <p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.6 }}>
          Ich bestätige hiermit die Richtigkeit der obenstehenden Angaben. Ich bin mir bewusst,
          dass die Bank gestützt auf das Geldwäschereigesetz (GwG) und die Vereinbarung über die
          Standesregeln zur Sorgfaltspflicht (VSB 20) zur Feststellung des wirtschaftlich
          Berechtigten verpflichtet ist. Ich verpflichte mich, der Bank Änderungen unverzüglich
          mitzuteilen (VSB 20 Art. 7).
        </p>
      </div>

      {/* Signature row */}
      <div className="px-5 py-5">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Unterschrift Kunde
            </p>
            <div
              className="mt-1 relative"
              style={{ height: 36, borderBottom: "1px solid #6b7280" }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: 4,
                  left: 0,
                  fontSize: 9,
                  color: "#d1d5db",
                  fontStyle: "italic",
                }}
              >
                Originalunterschrift
              </span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Unterschrift Berater
            </p>
            <div
              className="mt-1 relative"
              style={{ height: 36, borderBottom: "1px solid #6b7280" }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: 4,
                  left: 0,
                  fontSize: 9,
                  color: "#d1d5db",
                  fontStyle: "italic",
                }}
              >
                Originalunterschrift
              </span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Ort und Datum
            </p>
            <div
              className="mt-1 pb-1"
              style={{ borderBottom: "1px solid #6b7280" }}
            >
              <span style={{ fontSize: 13, color: "#111" }}>Zürich, {today}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors";

const selectCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors";

interface KycFormCardProps {
  onSubmit: (data: KycFormData) => void;
  isDemo?: boolean;
  hideDossier?: boolean;
}

export function KycFormCard({ onSubmit, isDemo, hideDossier }: KycFormCardProps) {
  const [dossierOpen, setDossierOpen] = useState(true);
  const [form, setForm] = useState<KycFormData>(EMPTY_FORM);

  const set = useCallback(
    <K extends keyof KycFormData>(field: K, value: KycFormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleZweck = useCallback((val: string) => {
    setForm((prev) => {
      const cur = prev.zweckGeschaeftsbeziehung;
      return {
        ...prev,
        zweckGeschaeftsbeziehung: cur.includes(val)
          ? cur.filter((v) => v !== val)
          : [...cur, val],
      };
    });
  }, []);

  const fillDemo = useCallback(() => {
    setForm({
      name: "Thomas Kowalski",
      geburtsdatum: "1985-06-14",
      nationalitaet: "Schweizer",
      wohnsitz: "Bergstrasse 22, 3007 Bern",
      ausweisTyp: "Ausländischer Reisepass",
      ausweisNummer: "X1234567",
      ausweisGueltigBis: "2024-03-12", // TRAP: expired
      aufenthaltsbewilligung: "Ausweis B",
      beruf: "Projektleiter IT",
      arbeitgeber: "Swisscom AG",
      beschaeftigungsgrad: "100%",
      jahreseinkommen: "95000",
      vermoegen: "45000",
      herkunftMittel: "Lohn",
      andereBankbeziehungen: "PostFinance",
      zivilstand: "Verheiratet",
      anzahlKinder: "2",
      wirtschaftlichBerechtigter: "Identisch mit Kontoinhaber",
      wibeName: "",
      pepStatus: "Nein",
      pepErklaerung: "",
      zweckGeschaeftsbeziehung: ["Lohnkonto", "Zahlungsverkehr"],
      artGeschaeftsbeziehung: "Einfache Bankbeziehung",
      ausweisVorhanden: true,
      formularAAusgefuellt: false, // TRAP: missing
      wohnsitzbestaetigung: false, // TRAP: missing for Ausweis B
      unterschriftVorhanden: true,
      usPerson: "Nein",
      usTin: "",
      geburtsorUSA: "Nein",
      greencardInhaber: "Nein",
    });
  }, []);

  const requiresWohnsitz = form.aufenthaltsbewilligung === "Ausweis B";
  const allChecked =
    form.ausweisVorhanden &&
    form.formularAAusgefuellt &&
    form.unterschriftVorhanden &&
    (!requiresWohnsitz || form.wohnsitzbestaetigung);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allChecked) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-5 pb-8">
      {/* Demo notice */}
      {isDemo && (
        <div className="flex items-start gap-3 rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Demo-Modus</p>
            <p className="text-sm text-amber-700 mt-0.5">
              Kein API-Key konfiguriert. Du kannst das Formular trotzdem ausfüllen – die Auswertung
              erfolgt mit einem Beispiel-Ergebnis.{" "}
              <button
                type="button"
                onClick={fillDemo}
                className="underline font-semibold hover:text-amber-900"
              >
                Demo-Daten einfügen
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Customer dossier */}
      {!hideDossier && <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setDossierOpen((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "#6b7280" }}
            >
              TK
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-text-primary">Kundendossier – Thomas Kowalski</p>
              <p className="text-xs text-text-secondary">
                Ihr nächster Kunde betritt die Filiale. Er möchte ein Privatkonto eröffnen.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <User size={15} />
            {dossierOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {dossierOpen && (
          <div className="border-t border-border">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
              {CUSTOMER_DOSSIER.map((item, i) => (
                <div
                  key={item.label}
                  className="px-4 py-3 border-b border-r border-border"
                  style={{ borderRight: i % 3 === 2 ? "none" : undefined }}
                >
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-text-primary font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>}

      {/* KYC Form document */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        {/* Document header */}
        <div
          className="px-6 py-5 border-b border-border"
          style={{ background: "var(--primary, #0D1B4B)" }}
        >
          <p className="text-base font-bold text-white">KYC Formular – Neueröffnung Privatkonto</p>
          <p className="text-sm text-white/65 mt-0.5">Bitte alle Pflichtfelder vollständig ausfüllen</p>
        </div>

        {/* Section 1 */}
        <SectionHeader num="1" title="Zur Person" />
        <div className="px-6">
          <FieldRow label="Name, Vorname" required>
            <input
              className={inputCls}
              placeholder="Nachname Vorname"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Geburtsdatum" required>
            <input
              type="date"
              className={inputCls}
              value={form.geburtsdatum}
              onChange={(e) => set("geburtsdatum", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Nationalität" required>
            <input
              className={inputCls}
              placeholder="Nationalität"
              value={form.nationalitaet}
              onChange={(e) => set("nationalitaet", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Wohnsitz / Adresse" required>
            <input
              className={inputCls}
              placeholder="Strasse Nr, PLZ Ort"
              value={form.wohnsitz}
              onChange={(e) => set("wohnsitz", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Ausweis Typ" required>
            <select
              className={selectCls}
              value={form.ausweisTyp}
              onChange={(e) => set("ausweisTyp", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Schweizer Pass</option>
              <option>Identitätskarte</option>
              <option>Ausländischer Reisepass</option>
              <option>Ausländische ID</option>
            </select>
          </FieldRow>
          <FieldRow label="Ausweis Nummer" required>
            <input
              className={inputCls}
              placeholder="Ausweisnummer"
              value={form.ausweisNummer}
              onChange={(e) => set("ausweisNummer", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Ausweis gültig bis" required>
            <input
              type="date"
              className={inputCls}
              value={form.ausweisGueltigBis}
              onChange={(e) => set("ausweisGueltigBis", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Aufenthaltsbewilligung">
            <select
              className={selectCls}
              value={form.aufenthaltsbewilligung}
              onChange={(e) => set("aufenthaltsbewilligung", e.target.value)}
            >
              <option value="">— keine / nicht zutreffend —</option>
              <option>Ausweis B</option>
              <option>Ausweis C</option>
              <option>Ausweis L</option>
              <option>Ausweis G</option>
            </select>
          </FieldRow>
        </div>

        {/* Section 2 */}
        <SectionHeader num="2" title="Beruflich" />
        <div className="px-6">
          <FieldRow label="Beruf / Funktion" required>
            <input
              className={inputCls}
              placeholder="Berufsbezeichnung"
              value={form.beruf}
              onChange={(e) => set("beruf", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Arbeitgeber / Firma" required>
            <input
              className={inputCls}
              placeholder="Firma / Arbeitgebername"
              value={form.arbeitgeber}
              onChange={(e) => set("arbeitgeber", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Beschäftigungsgrad" required>
            <select
              className={selectCls}
              value={form.beschaeftigungsgrad}
              onChange={(e) => set("beschaeftigungsgrad", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>100%</option>
              <option>80%</option>
              <option>60%</option>
              <option>50%</option>
              <option>andere</option>
            </select>
          </FieldRow>
        </div>

        {/* Section 3 */}
        <SectionHeader num="3" title="Finanziell" />
        <div className="px-6">
          <FieldRow label="Jahreseinkommen (Netto)" required>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-text-secondary">CHF</span>
              <input
                className={inputCls + " pl-10"}
                placeholder="Betrag in CHF"
                value={form.jahreseinkommen}
                onChange={(e) => set("jahreseinkommen", e.target.value)}
              />
            </div>
          </FieldRow>
          <FieldRow label="Vermögen (ca.)" required>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-text-secondary">CHF</span>
              <input
                className={inputCls + " pl-10"}
                placeholder="Betrag in CHF"
                value={form.vermoegen}
                onChange={(e) => set("vermoegen", e.target.value)}
              />
            </div>
          </FieldRow>
          <FieldRow label="Herkunft der Mittel" required>
            <select
              className={selectCls}
              value={form.herkunftMittel}
              onChange={(e) => set("herkunftMittel", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Lohn</option>
              <option>Ersparnisse</option>
              <option>Erbschaft</option>
              <option>Schenkung</option>
              <option>Andere</option>
            </select>
          </FieldRow>
          <FieldRow label="Andere Bankbeziehungen">
            <input
              className={inputCls}
              placeholder="z.B. keine / Bank A, Bank B"
              value={form.andereBankbeziehungen}
              onChange={(e) => set("andereBankbeziehungen", e.target.value)}
            />
          </FieldRow>
        </div>

        {/* Section 4 */}
        <SectionHeader num="4" title="Familiär" />
        <div className="px-6">
          <FieldRow label="Zivilstand" required>
            <select
              className={selectCls}
              value={form.zivilstand}
              onChange={(e) => set("zivilstand", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Ledig</option>
              <option>Verheiratet</option>
              <option>Geschieden</option>
              <option>Verwitwet</option>
            </select>
          </FieldRow>
          <FieldRow label="Anzahl Kinder">
            <input
              type="number"
              min="0"
              max="20"
              className={inputCls}
              placeholder="0"
              value={form.anzahlKinder}
              onChange={(e) => set("anzahlKinder", e.target.value)}
            />
          </FieldRow>
        </div>

        {/* Section 5 */}
        <SectionHeader num="5" title="Compliance" />
        <div className="px-6">
          <FieldRow label="Wirtschaftlich Berechtigter" required>
            <select
              className={selectCls}
              value={form.wirtschaftlichBerechtigter}
              onChange={(e) => set("wirtschaftlichBerechtigter", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Identisch mit Kontoinhaber</option>
              <option>Dritte Person</option>
            </select>
          </FieldRow>

          {form.wirtschaftlichBerechtigter === "Dritte Person" && (
            <FieldRow label="WiBe Name (Dritte)" required>
              <input
                className={inputCls}
                placeholder="Name der wirtschaftlich berechtigten Person"
                value={form.wibeName}
                onChange={(e) => set("wibeName", e.target.value)}
              />
            </FieldRow>
          )}

          <FieldRow label="PEP Status" required>
            <select
              className={selectCls}
              value={form.pepStatus}
              onChange={(e) => set("pepStatus", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Nein</option>
              <option>Ja – selbst</option>
              <option>Ja – Familienangehöriger</option>
            </select>
          </FieldRow>

          {form.pepStatus.startsWith("Ja") && (
            <FieldRow label="PEP Erklärung" required>
              <input
                className={inputCls}
                placeholder="Funktion / Position beschreiben"
                value={form.pepErklaerung}
                onChange={(e) => set("pepErklaerung", e.target.value)}
              />
            </FieldRow>
          )}

          <FieldRow label="Zweck Geschäftsbeziehung" required>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Lohnkonto", "Sparkonto", "Zahlungsverkehr", "Geschäftskonto", "Andere"].map(
                (opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border cursor-pointer hover:bg-surface/60 transition-colors text-sm select-none"
                    style={{
                      background: form.zweckGeschaeftsbeziehung.includes(opt)
                        ? "rgba(13,27,75,0.08)"
                        : undefined,
                      borderColor: form.zweckGeschaeftsbeziehung.includes(opt)
                        ? "var(--primary, #0D1B4B)"
                        : undefined,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.zweckGeschaeftsbeziehung.includes(opt)}
                      onChange={() => toggleZweck(opt)}
                      className="accent-primary"
                    />
                    <span className="text-text-primary">{opt}</span>
                  </label>
                )
              )}
            </div>
          </FieldRow>

          <FieldRow label="Art Geschäftsbeziehung" required>
            <select
              className={selectCls}
              value={form.artGeschaeftsbeziehung}
              onChange={(e) => set("artGeschaeftsbeziehung", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Einfache Bankbeziehung</option>
              <option>Beratungsmandat</option>
              <option>Verwaltungsmandat</option>
            </select>
          </FieldRow>
        </div>

        {/* Section 6 – Formular A */}
        <SectionHeader num="6" title="Formular A – Wirtschaftlich Berechtigter (VSB 20)" />
        <div className="px-6 py-5">
          <FormularADocument />
          <p className="text-xs text-text-secondary mt-3 flex items-start gap-1.5">
            <span className="shrink-0">ℹ️</span>
            <span>
              Dieses Dokument wurde vom Kunden ausgefüllt und vorgelegt. Prüfen Sie alle Angaben
              sorgfältig auf Übereinstimmung mit dem Gespräch und dem vorgelegten Ausweis.
            </span>
          </p>
        </div>

        {/* Section 7 */}
        <SectionHeader num="7" title="Dokumente & Steuerstatus" />
        <div className="px-6">
          <FieldRow label="US-Person (FATCA)" required>
            <select
              className={selectCls}
              value={form.usPerson}
              onChange={(e) => set("usPerson", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Nein</option>
              <option>Ja</option>
            </select>
          </FieldRow>

          {form.usPerson === "Ja" && (
            <FieldRow label="US Steuernummer (TIN)" required>
              <input
                className={inputCls}
                placeholder="Steuernummer eingeben"
                value={form.usTin}
                onChange={(e) => set("usTin", e.target.value)}
              />
            </FieldRow>
          )}

          <FieldRow label="Geburtsort USA" required>
            <select
              className={selectCls}
              value={form.geburtsorUSA}
              onChange={(e) => set("geburtsorUSA", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Nein</option>
              <option>Ja</option>
            </select>
          </FieldRow>

          <FieldRow label="Greencard Inhaber" required>
            <select
              className={selectCls}
              value={form.greencardInhaber}
              onChange={(e) => set("greencardInhaber", e.target.value)}
            >
              <option value="">— bitte wählen —</option>
              <option>Nein</option>
              <option>Ja</option>
            </select>
          </FieldRow>
        </div>

        {/* Checklist */}
        <div className="px-6 pt-2 pb-5">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: `2px solid ${allChecked ? "var(--primary, #0D1B4B)" : "#f59e0b"}`,
            }}
          >
            <div
              className="px-5 py-3 border-b"
              style={{
                borderColor: allChecked ? "var(--primary, #0D1B4B)" : "#f59e0b",
                background: allChecked ? "rgba(13,27,75,0.05)" : "#fffbeb",
              }}
            >
              <p className="text-sm font-bold text-text-primary">
                Abschlusskontrolle – Pflichtbestätigungen
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Alle drei Punkte müssen vor dem Einreichen bestätigt werden.
              </p>
            </div>
            <div className="px-5 py-4 space-y-4 bg-surface">
              {(
                [
                  {
                    key: "ausweisVorhanden" as const,
                    label: "Ausweis vorhanden und geprüft – Ausländischer Reisepass, Nr. X1234567, gültig bis 14.05.2027",
                    note: "Typ + Nummer sichtbar, Gültigkeit geprüft",
                    show: true,
                  },
                  {
                    key: "formularAAusgefuellt" as const,
                    label: "Formular A geprüft – wirtschaftlich Berechtigter korrekt erfasst",
                    note: "Pflicht gemäss VSB 20 – auch wenn WiBe identisch mit Kontoinhaber",
                    show: true,
                  },
                  {
                    key: "unterschriftVorhanden" as const,
                    label: "Unterschrift des Kunden vorhanden",
                    note: "Originalunterschrift auf Formular A",
                    show: true,
                  },
                  {
                    key: "wohnsitzbestaetigung" as const,
                    label: "Wohnsitzbestätigung vorhanden (Pflicht bei Ausweis B)",
                    note: "Bei Aufenthaltsbewilligung B ist eine aktuelle Wohnsitzbestätigung/Meldebestätigung zwingend – der Wohnsitz auf dem Ausländerausweis ist nicht immer aktuell.",
                    show: requiresWohnsitz,
                  },
                ] as { key: keyof typeof form; label: string; note: string; show: boolean }[]
              )
                .filter((item) => item.show)
                .map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={form[item.key] as boolean}
                      onChange={(e) => set(item.key, e.target.checked as KycFormData[typeof item.key])}
                      className="mt-0.5 accent-primary w-4 h-4 shrink-0"
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">
                        {item.label}
                      </span>
                      <p className="text-xs text-text-secondary mt-0.5">{item.note}</p>
                    </div>
                  </label>
                ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            * Pflichtfelder · Rechtsgrundlage: VSB 20 · GwG Art. 3-5
          </p>
          <div className="shrink-0 flex flex-col items-end gap-1.5">
            <Button
              type="submit"
              variant="primary"
              className="min-w-40"
              disabled={!allChecked}
              title={!allChecked ? "Bitte alle Pflichtbestätigungen anhaken" : undefined}
            >
              KYC abschliessen →
            </Button>
            {!allChecked && (
              <p className="text-xs text-amber-600">
                Bitte alle Pflichtbestätigungen anhaken
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
