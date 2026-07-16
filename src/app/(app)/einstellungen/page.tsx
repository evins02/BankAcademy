"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getSettings, saveSettings, applyTheme, type AppSettings } from "@/lib/settingsData";
import { getProgress, getStreak, computeBadges } from "@/lib/progressData";
import { getXP, getXPLevel } from "@/lib/xpData";
import { getAverageRating } from "@/lib/ratingsData";
import { Check, RotateCcw, Printer } from "lucide-react";

const AVATAR_COLORS = [
  { hex: "#0D1B4B", label: "Navy" },
  { hex: "#16A34A", label: "Grün" },
  { hex: "#7C3AED", label: "Lila" },
  { hex: "#F97316", label: "Orange" },
  { hex: "#2563EB", label: "Blau" },
  { hex: "#DC2626", label: "Rot" },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-secondary">
      {children}
    </h2>
  );
}

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="mt-0.5 text-xs text-text-secondary">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function EinstellungenPage() {
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const [profile, setProfile] = useState({ name: "", role: "", focus: "", avatarColor: "#0D1B4B", abteilung: "", lehrjahr: "", ziel: "" });
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Stats
  const [xp, setXp] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [streakRecord, setStreakRecord] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    setSettings(getSettings());
    try {
      const raw = localStorage.getItem("user-profile");
      if (raw) {
        const p = JSON.parse(raw);
        setProfile({
          name: p.name ?? "",
          role: p.role ?? "",
          focus: p.focus ?? "",
          avatarColor: p.avatarColor ?? "#0D1B4B",
          abteilung: p.abteilung ?? "",
          lehrjahr: p.lehrjahr ?? "",
          ziel: p.ziel ?? "",
        });
      }
    } catch {}
    const prog = getProgress();
    setTotalCompleted(Object.values(prog).reduce((s, m) => s + m.completed, 0));
    const str = getStreak();
    setStreakRecord(str.longest);
    const badges = computeBadges();
    setEarnedBadges(badges.filter((b) => b.earnedAt).length);
    setXp(getXP());
    setAvgRating(getAverageRating());
  }, []);

  function patch(key: keyof AppSettings, value: AppSettings[keyof AppSettings]) {
    const next = saveSettings({ [key]: value });
    setSettings(next);
    if (key === "theme") applyTheme(next.theme);
  }

  function saveProfile() {
    localStorage.setItem("user-profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    ["progress", "streak", "notifications", "badge-dates", "mock-seeded", "total-xp", "scenario-notes"].forEach((k) =>
      localStorage.removeItem(k)
    );
    window.location.reload();
  }

  const xpLevel = getXPLevel(xp);

  return (
    <>
      <Header title="Einstellungen" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Einstellungen" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-8">

          {/* 1. Profil */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <SectionHeader>Profil</SectionHeader>

            {/* Avatar */}
            <div className="mb-6 flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
                style={{ background: profile.avatarColor }}
              >
                {profile.name ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?"}
              </div>
              <div className="flex gap-2">
                {AVATAR_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setProfile((p) => ({ ...p, avatarColor: c.hex }))}
                    className="relative h-7 w-7 rounded-full transition-transform hover:scale-110"
                    style={{ background: c.hex }}
                    title={c.label}
                  >
                    {profile.avatarColor === c.hex && (
                      <Check size={12} className="absolute inset-0 m-auto text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: "name", label: "Name", placeholder: "Vorname Nachname" },
                { key: "role", label: "Rolle", placeholder: "z.B. Kundenberater/in" },
                { key: "focus", label: "Fokus", placeholder: "z.B. Hypotheken, KMU" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={profile[key as keyof typeof profile] as string}
                    onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
            </div>

            {/* Onboarding-Angaben */}
            <div className="mt-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Lernprofil
              </p>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Abteilung
                </label>
                <select
                  value={profile.abteilung}
                  onChange={(e) => setProfile((p) => ({ ...p, abteilung: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">– nicht gesetzt –</option>
                  <option value="privatkunde">Privatkunde</option>
                  <option value="firmenkunde">Firmenkunde</option>
                  <option value="anlagekunde">Anlagekunde</option>
                  <option value="backoffice">Backoffice &amp; Zahlungsverkehr</option>
                  <option value="kreditgeschaeft">Kreditgeschäft</option>
                  <option value="credit-office">Credit Office</option>
                  <option value="keine">Noch nicht zugewiesen</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Lehrjahr
                </label>
                <select
                  value={profile.lehrjahr}
                  onChange={(e) => setProfile((p) => ({ ...p, lehrjahr: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">– nicht gesetzt –</option>
                  <option value="lj1">1. Lehrjahr</option>
                  <option value="lj2">2. Lehrjahr</option>
                  <option value="lj3">3. Lehrjahr</option>
                  <option value="quereinsteiger">Quereinsteiger / Praktikant</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Ziel
                </label>
                <select
                  value={profile.ziel}
                  onChange={(e) => setProfile((p) => ({ ...p, ziel: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">– nicht gesetzt –</option>
                  <option value="neueinstieg">Neueinstieg – Grundlagen aufbauen</option>
                  <option value="auffrischung">Auffrischung – Wissen festigen</option>
                  <option value="pruefung">Prüfungsvorbereitung – gezielt üben</option>
                  <option value="challenge">Challenge – alles auf höchstem Level</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Button onClick={saveProfile} className="gap-2">
                {saved ? <><Check size={14} /> Gespeichert!</> : "Speichern"}
              </Button>
            </div>
          </section>

          {/* 2. Lerneinstellungen */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <SectionHeader>Lerneinstellungen</SectionHeader>
            <SettingsRow label="Timer anzeigen" description="Zeigt die verstrichene Zeit pro Szenario an">
              <Toggle checked={settings.timerEnabled} onChange={(v) => patch("timerEnabled", v)} />
            </SettingsRow>
            <SettingsRow label="Auto-Advance" description="Nächster Fall startet automatisch nach 5 Sekunden">
              <Toggle checked={settings.autoAdvance} onChange={(v) => patch("autoAdvance", v)} />
            </SettingsRow>
            <SettingsRow label="Tastaturkürzel" description="1–4 zum Auswählen, ↵ zum Bestätigen">
              <Toggle checked={settings.keyboardShortcuts} onChange={(v) => patch("keyboardShortcuts", v)} />
            </SettingsRow>
            <SettingsRow label="Schwierigkeitspräferenz" description="Filtert Szenarien nach deinem Level">
              <select
                value={settings.difficultyPreference}
                onChange={(e) => patch("difficultyPreference", e.target.value as AppSettings["difficultyPreference"])}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="einsteiger">Einsteiger</option>
                <option value="alle">Alle Level</option>
                <option value="challenge">Challenge-Niveau</option>
              </select>
            </SettingsRow>
          </section>

          {/* 3. Erscheinungsbild */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <SectionHeader>Erscheinungsbild</SectionHeader>
            <SettingsRow label="Farbschema" description="Helles oder dunkles Design">
              <div className="flex gap-2">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => patch("theme", t)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      settings.theme === t
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border text-text-secondary hover:border-primary/50"
                    }`}
                  >
                    {t === "light" ? "☀️ Hell" : t === "dark" ? "🌙 Dunkel" : "💻 System"}
                  </button>
                ))}
              </div>
            </SettingsRow>
            <SettingsRow label="Sprache" description="Weitere Sprachen folgen">
              <span className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-secondary">
                🇩🇪 Deutsch
              </span>
            </SettingsRow>
          </section>

          {/* 4. Fortschritt */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <SectionHeader>Fortschritt</SectionHeader>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Gesamt-XP", value: xp, sub: xpLevel.title },
                { label: "Badges", value: earnedBadges },
                { label: "Szenarien", value: totalCompleted },
                { label: "Streak-Rekord", value: `${streakRecord}🔥` },
                { label: "Ø Bewertung", value: avgRating > 0 ? `${avgRating}⭐` : "–" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-background p-4 text-center">
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{stat.label}</p>
                  {stat.sub && <p className="mt-0.5 text-[10px] font-medium text-primary">{stat.sub}</p>}
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-800">Fortschritt zurücksetzen</p>
              <p className="mt-1 text-xs text-red-700">
                Löscht alle Lernfortschritte, XP, Badges und Notizen. Nicht rückgängig zu machen.
              </p>
              <button
                onClick={handleReset}
                className={`mt-3 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  confirmReset
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "border border-red-300 text-red-700 hover:bg-red-100"
                }`}
              >
                <RotateCcw size={12} />
                {confirmReset ? "Wirklich zurücksetzen?" : "Zurücksetzen"}
              </button>
            </div>
          </section>

          {/* 5. Export */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <SectionHeader>Export & Druck</SectionHeader>
            <SettingsRow label="Lernbericht exportieren" description="Erstellt einen druckbaren Lernbericht mit deinem Fortschritt, Badges und XP">
              <button
                onClick={() => {
                  const prog = getProgress();
                  const badges = computeBadges();
                  const earned = badges.filter((b) => b.earnedAt);
                  const modules = Object.entries(prog).map(([id, m]) => ({
                    id,
                    completed: m.completed,
                    accuracy: m.accuracy,
                  }));
                  const date = new Date().toLocaleDateString("de-CH", { year: "numeric", month: "long", day: "numeric" });
                  const win = window.open("", "_blank");
                  if (!win) return;
                  win.document.write(`<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Lernbericht BankAcademy</title><style>
                    body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 24px;color:#111827}
                    h1{font-size:26px;font-weight:800;letter-spacing:-0.5px;color:#0D1B4B;margin:0 0 4px}
                    .subtitle{color:#6b7280;font-size:14px;margin:0 0 32px}
                    .section{margin-bottom:28px;border:1px solid #e5e7eb;border-radius:12px;padding:20px 24px}
                    .section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin:0 0 14px}
                    .row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px}
                    .row:last-child{border-bottom:none}
                    .badge{display:inline-block;background:#eff6ff;color:#1d4ed8;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600}
                    .xp{font-size:32px;font-weight:800;color:#0D1B4B}
                    .footer{margin-top:40px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;display:flex;justify-content:space-between}
                    @media print{body{margin:20px auto}}
                  </style></head><body>
                    <h1>BankAcademy Lernbericht</h1>
                    <p class="subtitle">Erstellt am ${date}</p>
                    <div class="section">
                      <p class="section-title">Lernender</p>
                      <div class="row"><span>Name</span><strong>${profile.name || "–"}</strong></div>
                      <div class="row"><span>Rolle</span><strong>${profile.role || "–"}</strong></div>
                      ${profile.focus ? `<div class="row"><span>Fokus</span><strong>${profile.focus}</strong></div>` : ""}
                    </div>
                    <div class="section">
                      <p class="section-title">Übersicht</p>
                      <div class="row"><span>Gesamt-XP</span><span class="xp">${xp}</span></div>
                      <div class="row"><span>Level</span><strong>${xpLevel.title}</strong></div>
                      <div class="row"><span>Abgeschlossene Szenarien</span><strong>${totalCompleted}</strong></div>
                      <div class="row"><span>Verdiente Badges</span><strong>${earnedBadges}</strong></div>
                      <div class="row"><span>Streak-Rekord</span><strong>${streakRecord} Tage</strong></div>
                    </div>
                    ${modules.length > 0 ? `<div class="section"><p class="section-title">Module</p>${modules.map(m => `<div class="row"><span>${m.id}</span><strong>${m.completed} Szenarien · ${m.accuracy}% Genauigkeit</strong></div>`).join("")}</div>` : ""}
                    ${earned.length > 0 ? `<div class="section"><p class="section-title">Badges</p><div style="display:flex;flex-wrap:wrap;gap:8px">${earned.map(b => `<span class="badge">${b.title || b.id}</span>`).join("")}</div></div>` : ""}
                    <div class="footer"><span>BankAcademy – Der digitale Praxisausbildner für die Banklehre</span><span>${date}</span></div>
                  </body></html>`);
                  win.document.close();
                  win.print();
                }}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-gray-50"
              >
                <Printer size={13} />
                Lernbericht erstellen
              </button>
            </SettingsRow>
          </section>

          {/* 6. Über BankAcademy */}
          <section className="rounded-2xl border border-border bg-surface p-6">
            <SectionHeader>Über BankAcademy</SectionHeader>
            <div className="space-y-3 text-sm text-text-secondary">
              <div className="flex items-center justify-between">
                <span>Version</span>
                <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Beta v0.1
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Feedback senden</span>
                <a
                  href="mailto:feedback@bankacademy.ch"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  feedback@bankacademy.ch
                </a>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a href="/impressum" className="text-xs hover:text-text-primary hover:underline">
                  Impressum
                </a>
                <a href="/datenschutz" className="text-xs hover:text-text-primary hover:underline">
                  Datenschutz
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
