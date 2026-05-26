"use client";

import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getNotifications, markAllRead, type Notification } from "@/lib/progressData";

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "gerade eben";
  if (m < 60) return `vor ${m} Min.`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std.`;
  const d = Math.floor(h / 24);
  return `vor ${d} Tag${d > 1 ? "en" : ""}`;
}

const TYPE_ICON: Record<Notification["type"], string> = {
  achievement: "🏆",
  reminder: "⏰",
  info: "ℹ️",
};

export function NotificationBell() {
  const [notes, setNotes] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotes(getNotifications());
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const unread = notes.filter((n) => !n.read).length;

  function handleOpen() {
    setOpen((v) => !v);
    if (!open && unread > 0) {
      markAllRead();
      setNotes((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  }

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Benachrichtigungen"
        onClick={handleOpen}
        className="relative"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white leading-none">
            {unread}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-border bg-surface shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-text-primary">Benachrichtigungen</p>
            {notes.length > 0 && (
              <button
                onClick={() => {
                  markAllRead();
                  setNotes((prev) => prev.map((n) => ({ ...n, read: true })));
                }}
                className="text-xs text-text-secondary hover:text-text-primary"
              >
                Alle gelesen
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notes.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-text-secondary">
                Keine Benachrichtigungen
              </p>
            ) : (
              notes.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex gap-3 border-b border-border px-4 py-3 last:border-0",
                    !n.read && "bg-primary-light/40"
                  )}
                >
                  <span className="mt-0.5 text-base leading-none">{TYPE_ICON[n.type]}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-text-primary leading-snug">{n.message}</p>
                    <p className="mt-1 text-[11px] text-text-secondary">
                      {relativeTime(n.timestamp)}
                    </p>
                  </div>
                  {!n.read && (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
