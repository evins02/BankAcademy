"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type KycFormData, EMPTY_FORM } from "./kyc-form-types";

const CUSTOMER_DOSSIER = [
  { label: "Name", value: "Thomas Kowalski" },
  { label: "Geburtsdatum", value: "14.06.1985" },
  { label: "Nationalität", value: "Schweizer" },
  { label: "Wohnsitz", value: "Bergstrasse 22, 3007 Bern" },
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
      style={{ background: "var(--surface-2, #f9fafb)" }}
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
      ausweisTyp: "Pass",
      ausweisNummer: "X1234567",
      ausweisGueltigBis: "2024-03-12", // TRAP: expired
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
      unterschriftVorhanden: true,
      usPerson: "Nein",
      usTin: "",
      geburtsorUSA: "Nein",
      greencardInhaber: "Nein",
    });
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
              style={{ background: "var(--primary, #0D1B4B)" }}
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
              <option>Pass</option>
              <option>ID</option>
              <option>Aufenthaltsbewilligung</option>
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
          <FieldRow
            label="Ausweis gültig bis"
            required
          >
            <input
              type="date"
              className={inputCls}
              value={form.ausweisGueltigBis}
              onChange={(e) => set("ausweisGueltigBis", e.target.value)}
            />
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

        {/* Section 6 */}
        <SectionHeader num="6" title="Dokumente & Steuerstatus" />
        <div className="px-6">
          {/* Checkboxes */}
          <div className="py-3 border-b border-border space-y-3">
            {[
              { key: "ausweisVorhanden" as const, label: "Ausweis vorhanden und geprüft" },
              {
                key: "formularAAusgefuellt" as const,
                label: "Formular A ausgefüllt",
                note: "Pflicht gemäss VSB 20 – auch wenn WiBe = Kontoinhaber",
                isTrap: true,
              },
              { key: "unterschriftVorhanden" as const, label: "Unterschrift des Kunden vorhanden" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={form[item.key]}
                  onChange={(e) => set(item.key, e.target.checked)}
                  className="mt-1 accent-primary w-4 h-4"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    {item.label}
                  </span>
                  {item.note && (
                    <p className="text-xs text-text-secondary mt-0.5">{item.note}</p>
                  )}
                </div>
              </label>
            ))}
          </div>

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

        {/* Footer */}
        <div className="px-6 py-5 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            * Pflichtfelder · Rechtsgrundlage: VSB 20 · GwG Art. 3-5
          </p>
          <Button type="submit" variant="primary" className="shrink-0 min-w-36">
            KYC einreichen →
          </Button>
        </div>
      </div>
    </form>
  );
}
