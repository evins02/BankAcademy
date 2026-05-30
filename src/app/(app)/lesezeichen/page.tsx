"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { getBookmarks, removeBookmark, type Bookmark as BookmarkType } from "@/lib/bookmarksData";

function relTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `vor ${m} Min.`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std.`;
  return `vor ${Math.floor(h / 24)} Tagen`;
}

const MODULE_HREFS: Record<string, string> = {
  fonds: "/privatkunde/basis/fonds",
  zahlungsverkehr: "/backoffice/banking-operations/zahlungsverkehr",
};

export default function LesezeichenPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);

  function load() {
    const all = Object.values(getBookmarks()).sort(
      (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    );
    setBookmarks(all);
  }

  useEffect(() => { load(); }, []);

  function handleDelete(id: string) {
    removeBookmark(id);
    load();
  }

  const grouped = bookmarks.reduce<Record<string, BookmarkType[]>>((acc, b) => {
    const key = b.moduleName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});

  return (
    <>
      <Header
        title="Lesezeichen"
        subtitle={`${bookmarks.length} gespeicherte${bookmarks.length !== 1 ? "" : "s"} Szenario${bookmarks.length !== 1 ? "s" : ""}`}
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Lesezeichen" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        {bookmarks.length === 0 ? (
          <EmptyState
            variant="default"
            title="Keine Lesezeichen"
            subtitle="Klicke auf das 🔖-Symbol in einem Szenario, um es zu speichern."
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([module, items]) => (
              <div key={module}>
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  <Bookmark size={12} />
                  {module}
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px]">
                    {items.length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {items.map((b) => {
                    const href = MODULE_HREFS[b.moduleId] ?? "/dashboard";
                    return (
                      <div
                        key={b.scenarioId}
                        className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-sm"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <Bookmark size={16} className="text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-text-primary">
                            {b.title}
                          </p>
                          <p className="text-xs text-text-secondary">{relTime(b.savedAt)}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Link href={href}>
                            <button className="rounded p-1.5 text-text-secondary hover:bg-primary-light hover:text-primary">
                              <ExternalLink size={14} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(b.scenarioId)}
                            className="rounded p-1.5 text-text-secondary hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
