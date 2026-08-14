"use client";

import { useState } from "react";
import {
  Download, Users, MessageSquare, CheckCircle2, XCircle,
  Loader2, Lock, Star,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  total_users: number;
  total_feedback: number;
  total_opt_ins: number;
  avg_ease: string | null;
  avg_relevance: string | null;
}

interface UserRow {
  id: number;
  vorname: string;
  email: string;
  opt_in: boolean;
  created_at: string;
  apprenticeship_year: string | null;
  bank_name: string | null;
  has_feedback: boolean;
}

interface FeedbackRow {
  id: number;
  vorname: string | null;
  email: string | null;
  created_at: string;
  ease_of_use: number | null;
  scenario_relevance: number | null;
  usage_frequency: string | null;
  best_module: string | null;
  better_prepared: string | null;
  difficulty_rating: string | null;
  best_features: string | null;
  liked_most: string | null;
  improvements: string | null;
  would_recommend: string | null;
  apprenticeship_year: string | null;
  bank_name: string | null;
  contact_consent: boolean;
}

type Tab = "users" | "feedback" | "export";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(iso: string) {
  return new Date(iso).toLocaleString("de-CH", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function Stars({ n }: { n: number | null }) {
  if (!n) return <span className="text-gray-400">–</span>;
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={i <= n ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500">{n}</span>
    </span>
  );
}

function Badge({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
      <CheckCircle2 size={10} /> Ja
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
      <XCircle size={10} /> Nein
    </span>
  );
}

function truncate(s: string | null, n = 60) {
  if (!s) return "–";
  return s.length > n ? s.slice(0, n) + "…" : s;
}

function downloadCsv(content: string, filename: string) {
  const bom = "﻿"; // UTF-8 BOM for Excel
  const blob = new Blob([bom + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function esc(v: unknown) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

function exportUsersCsv(rows: UserRow[]) {
  const header = "Datum,Vorname,E-Mail,Lehrjahr,Bank,Opt-in,Feedback";
  const lines = rows.map((r) =>
    [fmt(r.created_at), r.vorname, r.email,
      r.apprenticeship_year ?? "", r.bank_name ?? "",
      r.opt_in ? "Ja" : "Nein", r.has_feedback ? "Ja" : "Nein"]
      .map(esc).join(",")
  );
  downloadCsv([header, ...lines].join("\n"),
    `nutzer-${new Date().toISOString().slice(0, 10)}.csv`);
}

function exportFeedbackCsv(rows: FeedbackRow[]) {
  const header = "Datum,Vorname,E-Mail,Lehrjahr,Bank,Bedienung,Praxisnähe,Nutzung,Modul,Vorbereitet,Schwierigkeit,Weiterempfehlen,Features,Liked,Verbesserungen,Kontakt";
  const lines = rows.map((r) =>
    [fmt(r.created_at), r.vorname ?? "", r.email ?? "",
      r.apprenticeship_year ?? "", r.bank_name ?? "",
      r.ease_of_use ?? "", r.scenario_relevance ?? "",
      r.usage_frequency ?? "", r.best_module ?? "",
      r.better_prepared ?? "", r.difficulty_rating ?? "",
      r.would_recommend ?? "", r.best_features ?? "",
      r.liked_most ?? "", r.improvements ?? "",
      r.contact_consent ? "Ja" : "Nein"]
      .map(esc).join(",")
  );
  downloadCsv([header, ...lines].join("\n"),
    `feedback-${new Date().toISOString().slice(0, 10)}.csv`);
}

function exportCombinedCsv(users: UserRow[], feedback: FeedbackRow[]) {
  const fbMap = new Map(feedback.map((f) => [f.email?.toLowerCase(), f]));
  const header = "Datum,Vorname,E-Mail,Opt-in,Lehrjahr,Bank,Bedienung,Praxisnähe,Nutzung,Modul,Vorbereitet,Schwierigkeit,Weiterempfehlen,Kontakt,Feedback Datum";
  const lines = users.map((u) => {
    const f = fbMap.get(u.email.toLowerCase());
    return [fmt(u.created_at), u.vorname, u.email,
      u.opt_in ? "Ja" : "Nein",
      u.apprenticeship_year ?? f?.apprenticeship_year ?? "",
      u.bank_name ?? f?.bank_name ?? "",
      f?.ease_of_use ?? "", f?.scenario_relevance ?? "",
      f?.usage_frequency ?? "", f?.best_module ?? "",
      f?.better_prepared ?? "", f?.difficulty_rating ?? "",
      f?.would_recommend ?? "", f?.contact_consent ? "Ja" : "Nein",
      f ? fmt(f.created_at) : ""]
      .map(esc).join(",");
  });
  downloadCsv([header, ...lines].join("\n"),
    `export-kombiniert-${new Date().toISOString().slice(0, 10)}.csv`);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("users");
  const [filterYear, setFilterYear] = useState("");
  const [filterBank, setFilterBank] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/registrations", {
        headers: { "x-admin-code": code },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? `Fehler ${res.status}`);
        return;
      }
      setStats(data.stats);
      setUsers(data.users ?? []);
      setFeedback(data.feedback ?? []);
      setAuthed(true);
    } finally {
      setLoading(false);
    }
  }

  // ── Login gate ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Lock size={18} className="text-gray-600" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Admin</h1>
              <p className="text-xs text-gray-500">BankAcademy Pilot</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Admin-Code"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : "Einloggen"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Derived data ───────────────────────────────────────────────────────────
  const allYears = [...new Set(users.map((u) => u.apprenticeship_year).filter(Boolean))] as string[];
  const allBanks = [...new Set(users.map((u) => u.bank_name).filter(Boolean))] as string[];

  const filteredUsers = users.filter((u) =>
    (!filterYear || u.apprenticeship_year === filterYear) &&
    (!filterBank || u.bank_name?.toLowerCase().includes(filterBank.toLowerCase()))
  );

  const avgEase = stats?.avg_ease ? parseFloat(stats.avg_ease) : null;
  const avgRelevance = stats?.avg_relevance ? parseFloat(stats.avg_relevance) : null;

  const TABS: { key: Tab; label: string }[] = [
    { key: "users", label: `Nutzer (${users.length})` },
    { key: "feedback", label: `Feedback (${feedback.length})` },
    { key: "export", label: "Export" },
  ];

  // ── Main UI ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-bold text-gray-900">BankAcademy – Admin</h1>
        <p className="text-xs text-gray-500">Pilot-Daten Übersicht</p>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { icon: Users, label: "Anmeldungen", value: stats?.total_users ?? 0 },
            { icon: MessageSquare, label: "Feedback", value: stats?.total_feedback ?? 0 },
            { icon: CheckCircle2, label: "Opt-ins", value: stats?.total_opt_ins ?? 0 },
            { icon: Star, label: "Ø Bedienung", value: avgEase ? `${avgEase} / 5` : "–" },
            { icon: Star, label: "Ø Praxisnähe", value: avgRelevance ? `${avgRelevance} / 5` : "–" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-gray-100 p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab 1: Nutzer ─────────────────────────────────────────────────── */}
        {tab === "users" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              >
                <option value="">Alle Lehrjahre</option>
                {allYears.map((y) => <option key={y}>{y}</option>)}
              </select>
              <select
                value={filterBank}
                onChange={(e) => setFilterBank(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              >
                <option value="">Alle Banken</option>
                {allBanks.map((b) => <option key={b}>{b}</option>)}
              </select>
              {(filterYear || filterBank) && (
                <button
                  onClick={() => { setFilterYear(""); setFilterBank(""); }}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
                >
                  Filter zurücksetzen
                </button>
              )}
              <span className="ml-auto self-center text-xs text-gray-400">
                {filteredUsers.length} von {users.length} Einträge
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {filteredUsers.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-400">Keine Einträge.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50 text-left">
                        {["Datum", "Vorname", "E-Mail", "Lehrjahr", "Bank", "Opt-in", "Feedback"].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((r, i) => (
                        <tr key={r.id} className={`border-b border-gray-50 ${i % 2 ? "bg-gray-50/40" : ""}`}>
                          <td className="px-4 py-2.5 text-xs text-gray-400 tabular-nums whitespace-nowrap">{fmt(r.created_at)}</td>
                          <td className="px-4 py-2.5 font-medium text-gray-900">{r.vorname}</td>
                          <td className="px-4 py-2.5 text-gray-600">{r.email}</td>
                          <td className="px-4 py-2.5 text-gray-600">{r.apprenticeship_year ?? "–"}</td>
                          <td className="px-4 py-2.5 text-gray-600">{r.bank_name ?? "–"}</td>
                          <td className="px-4 py-2.5"><Badge yes={r.opt_in} /></td>
                          <td className="px-4 py-2.5"><Badge yes={r.has_feedback} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab 2: Feedback ───────────────────────────────────────────────── */}
        {tab === "feedback" && (
          <div className="space-y-4">
            {/* Avg stars */}
            {feedback.length > 0 && (
              <div className="flex gap-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Ø Bedienung</p>
                  <Stars n={avgEase} />
                </div>
                <div className="border-l border-gray-100 pl-6">
                  <p className="text-xs text-gray-500 mb-1">Ø Praxisnähe</p>
                  <Stars n={avgRelevance} />
                </div>
                <div className="border-l border-gray-100 pl-6">
                  <p className="text-xs text-gray-500 mb-1">Weiterempfehlung</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {feedback.filter((f) => f.would_recommend === "Ja").length} / {feedback.length} Ja
                  </p>
                </div>
                <div className="border-l border-gray-100 pl-6">
                  <p className="text-xs text-gray-500 mb-1">Kontakt-Einwilligung</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {feedback.filter((f) => f.contact_consent).length} / {feedback.length}
                  </p>
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {feedback.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-400">Noch kein Feedback.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50 text-left">
                        {["Datum", "Name", "E-Mail", "Lehrjahr", "Bank",
                          "Bedienung", "Praxisnähe", "Modul", "Vorbereitet",
                          "Schwierigkeit", "Weiterempf.", "Kontakt",
                          "Was gefallen", "Verbesserungen"].map((h) => (
                          <th key={h} className="px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {feedback.map((r, i) => (
                        <tr key={r.id} className={`border-b border-gray-50 ${i % 2 ? "bg-gray-50/40" : ""}`}>
                          <td className="px-3 py-2.5 text-xs text-gray-400 tabular-nums whitespace-nowrap">{fmt(r.created_at)}</td>
                          <td className="px-3 py-2.5 font-medium text-gray-900 whitespace-nowrap">{r.vorname ?? "–"}</td>
                          <td className="px-3 py-2.5 text-gray-600 text-xs">{r.email ?? "–"}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.apprenticeship_year ?? "–"}</td>
                          <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.bank_name ?? "–"}</td>
                          <td className="px-3 py-2.5"><Stars n={r.ease_of_use} /></td>
                          <td className="px-3 py-2.5"><Stars n={r.scenario_relevance} /></td>
                          <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.best_module ?? "–"}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.better_prepared ?? "–"}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.difficulty_rating ?? "–"}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.would_recommend ?? "–"}</td>
                          <td className="px-3 py-2.5"><Badge yes={r.contact_consent} /></td>
                          <td className="px-3 py-2.5 text-gray-600 max-w-[160px]">
                            <span title={r.liked_most ?? ""}>{truncate(r.liked_most)}</span>
                          </td>
                          <td className="px-3 py-2.5 text-gray-600 max-w-[160px]">
                            <span title={r.improvements ?? ""}>{truncate(r.improvements)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab 3: Export ─────────────────────────────────────────────────── */}
        {tab === "export" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                title: "Nutzer",
                desc: `${users.length} Einträge · Vorname, E-Mail, Lehrjahr, Bank, Opt-in, Feedback`,
                onClick: () => exportUsersCsv(users),
              },
              {
                title: "Feedback",
                desc: `${feedback.length} Einträge · Alle Antworten inkl. Freitext`,
                onClick: () => exportFeedbackCsv(feedback),
              },
              {
                title: "Kombiniert",
                desc: `${users.length} Einträge · Nutzer + zugehöriges Feedback in einer Zeile`,
                onClick: () => exportCombinedCsv(users, feedback),
              },
            ].map((btn) => (
              <button
                key={btn.title}
                onClick={btn.onClick}
                className="flex flex-col items-start gap-3 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Download size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{btn.title} exportieren</p>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{btn.desc}</p>
                </div>
                <span className="mt-auto rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
                  CSV herunterladen
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
