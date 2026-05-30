"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, StickyNote } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { getNotes, deleteNote, type ScenarioNote } from "@/lib/notesData";

function relTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `vor ${m} Min.`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std.`;
  return `vor ${Math.floor(h / 24)} Tagen`;
}

export default function NotizenPage() {
  const [notes, setNotes] = useState<ScenarioNote[]>([]);
  const [query, setQuery] = useState("");

  function load() {
    const all = Object.values(getNotes()).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setNotes(all);
  }

  useEffect(() => { load(); }, []);

  function handleDelete(id: string) {
    deleteNote(id);
    load();
  }

  const filtered = query.trim()
    ? notes.filter(
        (n) =>
          n.content.toLowerCase().includes(query.toLowerCase()) ||
          n.moduleName.toLowerCase().includes(query.toLowerCase())
      )
    : notes;

  const grouped = filtered.reduce<Record<string, ScenarioNote[]>>((acc, n) => {
    const key = n.moduleName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});

  return (
    <>
      <Header title="Notizen" subtitle={`${notes.length} Notiz${notes.length !== 1 ? "en" : ""} gespeichert`} />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Notizen" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">

        {notes.length === 0 ? (
          <EmptyState
            variant="default"
            title="Noch keine Notizen"
            subtitle="Klicke auf das 📝-Symbol in einem Szenario, um eine Notiz zu schreiben."
          />
        ) : (
          <>
            {/* Search */}
            <div className="relative mb-6">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Notizen durchsuchen…"
                className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-sm text-text-secondary">Keine Notizen für «{query}» gefunden.</p>
            )}

            {/* Groups */}
            <div className="space-y-6">
              {Object.entries(grouped).map(([module, moduleNotes]) => (
                <div key={module}>
                  <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
                    <StickyNote size={12} />
                    {module}
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px]">
                      {moduleNotes.length}
                    </span>
                  </h2>
                  <div className="space-y-3">
                    {moduleNotes.map((note) => (
                      <div
                        key={note.scenarioId}
                        className="group rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-sm"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                            {note.scenarioId}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-text-secondary">{relTime(note.updatedAt)}</span>
                            <button
                              onClick={() => handleDelete(note.scenarioId)}
                              className="hidden rounded p-1 text-text-secondary group-hover:flex hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
                          {note.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
