"use client";

import { Search, Maximize2, Minimize2, User, Settings, RotateCcw, LogOut, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { NAV_GROUPS } from "@/lib/constants";
import { getStreak } from "@/lib/progressData";
import { getXP, getXPLevel, getXPProgress } from "@/lib/xpData";
import { useFocusMode } from "@/context/FocusModeContext";
import { useMobileMenu } from "@/context/MobileMenuContext";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

function flatLinks() {
  const links: { label: string; href: string }[] = [];
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      if (item.href) links.push({ label: item.label, href: item.href });
      if (item.sections) {
        for (const section of item.sections) {
          for (const sub of section.items) {
            links.push({ label: sub.label, href: sub.href });
          }
        }
      }
    }
  }
  return links;
}

const ALL_LINKS = flatLinks();

export function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter();
  const { focusMode, toggleFocusMode } = useFocusMode();
  const { toggleMobile } = useMobileMenu();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [xpProgress, setXpProgress] = useState(0);
  const [xpLevelTitle, setXpLevelTitle] = useState("");
  const [initials, setInitials] = useState("?");
  const [avatarColor, setAvatarColor] = useState("#0D1B4B");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const str = getStreak();
      setStreak(str.current);
      const totalXP = getXP();
      setXp(totalXP);
      setXpProgress(getXPProgress(totalXP));
      setXpLevelTitle(getXPLevel(totalXP).title);
      const raw = localStorage.getItem("user-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        const name = profile.name?.trim();
        if (name) {
          setInitials(name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase());
        }
        if (profile.avatarColor) setAvatarColor(profile.avatarColor);
      }
    } catch {}
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
        setProfileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function navigate(href: string) {
    router.push(href);
    setSearchOpen(false);
    setQuery("");
  }

  function resetProgress() {
    if (!confirm("Möchtest du deinen Fortschritt wirklich zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.")) return;
    ["progress", "streak", "notifications", "badge-dates", "total-xp", "mock-seeded", "activity-dates"].forEach((k) =>
      localStorage.removeItem(k)
    );
    setProfileOpen(false);
    router.push("/dashboard");
    router.refresh();
  }

  function abmelden() {
    localStorage.clear();
    setProfileOpen(false);
    router.push("/");
  }

  const results = query.trim()
    ? ALL_LINKS.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden rounded-lg p-1.5 text-text-secondary hover:bg-gray-100 transition-colors"
          onClick={toggleMobile}
          aria-label="Menü öffnen"
        >
          <Menu size={20} />
        </button>
        <BankingLabLogo size="sm" />
        <div>
          <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
          {subtitle && <p className="text-xs text-text-secondary">{subtitle}</p>}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Streak – clickable */}
        {streak > 0 && (
          <Link
            href="/statistiken"
            className="hidden items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600 transition-opacity hover:opacity-80 sm:flex"
          >
            🔥 {streak}
          </Link>
        )}

        {/* XP + Level – clickable */}
        {xp > 0 && (
          <Link href="/statistiken" className="hidden flex-col items-end hover:opacity-80 sm:flex">
            <div className="flex items-center gap-1 text-xs font-semibold text-primary">
              ⚡ {xp} XP
              <span className="font-normal text-text-secondary">· {xpLevelTitle}</span>
            </div>
            <div className="mt-0.5 h-1 w-20 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </Link>
        )}

        {/* Search */}
        <div ref={searchRef} className="relative">
          <Button variant="ghost" size="icon" aria-label="Suche" onClick={() => setSearchOpen((v) => !v)}>
            <Search size={18} />
          </Button>
          {searchOpen && (
            <div className="absolute right-0 top-10 z-50 w-72 rounded-xl border border-border bg-surface shadow-xl">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Seite suchen… (⌘K)"
                className="w-full rounded-t-xl border-b border-border bg-transparent px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
              />
              <div className="max-h-60 overflow-y-auto">
                {results.length === 0 && query.trim() && (
                  <p className="px-4 py-4 text-center text-sm text-text-secondary">Keine Ergebnisse</p>
                )}
                {results.length === 0 && !query.trim() && (
                  <p className="px-4 py-4 text-center text-xs text-text-secondary">Suchbegriff eingeben</p>
                )}
                {results.slice(0, 8).map((r) => (
                  <button
                    key={r.href}
                    onClick={() => navigate(r.href)}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50 last:rounded-b-xl"
                  >
                    <Search size={13} className="shrink-0 text-text-secondary" />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label={focusMode ? "Fokus-Modus beenden" : "Fokus-Modus"}
          onClick={toggleFocusMode}
          title={focusMode ? "Fokus-Modus beenden (ESC)" : "Fokus-Modus"}
        >
          {focusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Button>

        <NotificationBell />

        {/* Profile avatar + dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: avatarColor }}
            aria-label="Profil"
          >
            {initials}
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-10 z-50 w-52 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
              <div className="px-4 py-3 border-b border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white mb-2" style={{ background: avatarColor }}>
                  {initials}
                </div>
                <p className="text-xs font-semibold text-text-primary">Mein Konto</p>
              </div>
              <div className="py-1">
                <Link
                  href="/einstellungen"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50"
                >
                  <User size={14} className="text-text-secondary" />
                  Mein Profil
                </Link>
                <Link
                  href="/einstellungen"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50"
                >
                  <Settings size={14} className="text-text-secondary" />
                  Einstellungen
                </Link>
                <button
                  onClick={resetProgress}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50"
                >
                  <RotateCcw size={14} className="text-text-secondary" />
                  Fortschritt zurücksetzen
                </button>
              </div>
              <div className="border-t border-border py-1">
                <button
                  onClick={abmelden}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={14} />
                  Abmelden
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
