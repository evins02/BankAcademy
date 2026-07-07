"use client";

import { useState } from "react";
import { Download, Users, CheckCircle2, XCircle, Loader2, Lock } from "lucide-react";

interface Registration {
  id: number;
  vorname: string;
  nachname: string;
  email: string;
  opt_in: boolean;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function exportCsv(rows: Registration[]) {
  const header = "Datum,Vorname,Nachname,E-Mail,Kontakt-Opt-in";
  const lines = rows.map(
    (r) =>
      `"${formatDate(r.created_at)}","${r.vorname}","${r.nachname}","${r.email}","${r.opt_in ? "Ja" : "Nein"}"`
  );
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bankacademy-anmeldungen-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/registrations", {
      headers: { "x-admin-code": code },
    });

    if (!res.ok) {
      setError("Falscher Code.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setRows(data.registrations);
    setAuthed(true);
    setLoading(false);
  }

  const optInCount = rows.filter((r) => r.opt_in).length;

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
              <p className="text-xs text-gray-500">BankAcademy Testlauf</p>
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Anmeldungen — August-Testlauf</h1>
            <p className="text-sm text-gray-500">BankAcademy 2025</p>
          </div>
          <button
            onClick={() => exportCsv(rows)}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Download size={14} />
            CSV exportieren
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: "Anmeldungen total", value: rows.length, icon: Users },
            { label: "Kontakt-Opt-in", value: optInCount, icon: CheckCircle2 },
            { label: "Kein Opt-in", value: rows.length - optInCount, icon: XCircle },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {rows.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">
              Noch keine Anmeldungen.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500">Datum</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500">E-Mail</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500">Opt-in</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}
                    >
                      <td className="px-4 py-3 text-xs text-gray-500 tabular-nums">
                        {formatDate(r.created_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {r.vorname} {r.nachname}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{r.email}</td>
                      <td className="px-4 py-3">
                        {r.opt_in ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                            <CheckCircle2 size={10} />
                            Ja
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                            <XCircle size={10} />
                            Nein
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
