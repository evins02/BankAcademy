"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Building2,
  TrendingUp,
  Settings2,
  Settings,
  Landmark,
  Scale,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  BarChart2,
  Award,
  AlertCircle,
  Trophy,
  MessageSquare,
  Search,
  X,
  BookOpen,
  FileText,
  Bookmark,
  GraduationCap,
  Map,
  ClipboardList,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_GROUPS } from "@/lib/constants";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import { useGlossar } from "@/context/GlossarContext";
import type { NavItem } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  User,
  Building2,
  TrendingUp,
  Settings2,
  Landmark,
  Scale,
  LayoutDashboard,
  BarChart2,
  Award,
  AlertCircle,
  Trophy,
  MessageSquare,
  FileText,
  Bookmark,
  GraduationCap,
  Map,
  ClipboardList,
};

interface UserProfile {
  name?: string;
  role?: string;
}

function initials(name?: string) {
  if (!name) return "G";
  return name.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function isChildActive(item: NavItem, pathname: string): boolean {
  if (item.sections) {
    return item.sections.some((section) =>
      section.items.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/"))
    );
  }
  return false;
}

function flatNavLinks(): { label: string; href: string }[] {
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

export function Sidebar() {
  const pathname = usePathname();
  const { open: openGlossar } = useGlossar();
  const [profile, setProfile] = useState<UserProfile>({});
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user-profile");
      if (raw) setProfile(JSON.parse(raw));
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved === "true") setCollapsed(true);
    } catch {}
  }, []);

  function toggleCollapse() {
    setCollapsed((v) => {
      localStorage.setItem("sidebar-collapsed", String(!v));
      return !v;
    });
  }

  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const open = new Set<string>();
    for (const group of NAV_GROUPS) {
      for (const item of group.items) {
        if (item.sections && isChildActive(item, pathname)) open.add(item.label);
      }
    }
    return open;
  });

  useEffect(() => {
    for (const group of NAV_GROUPS) {
      for (const item of group.items) {
        if (item.sections && isChildActive(item, pathname)) {
          setOpenItems((prev) => {
            const next = new Set(prev);
            next.add(item.label);
            return next;
          });
        }
      }
    }
  }, [pathname]);

  const toggle = (label: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const searchResults =
    search.trim().length > 0
      ? flatNavLinks().filter((l) => l.label.toLowerCase().includes(search.toLowerCase()))
      : [];

  return (
    <aside
      className="flex h-screen shrink-0 flex-col border-r border-border bg-surface overflow-hidden"
      style={{ width: collapsed ? 60 : 240, transition: "width 250ms ease" }}
    >
      {/* Logo + collapse toggle */}
      <div className="flex h-16 items-center border-b border-border px-3 gap-2">
        {!collapsed && (
          <Link href="/dashboard" className="flex-1 min-w-0">
            <BankingLabLogo size="md" />
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 mx-auto" style={{ background: "#0D1B4B" }}>
            <span className="text-[10px] font-black text-white">BA</span>
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={toggleCollapse}
            className="shrink-0 rounded-lg p-1.5 text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
            title="Sidebar einklappen"
          >
            <PanelLeftClose size={15} />
          </button>
        )}
      </div>

      {/* Expand button (shown when collapsed) */}
      {collapsed && (
        <button
          onClick={toggleCollapse}
          className="flex items-center justify-center py-2 text-text-secondary hover:text-text-primary transition-colors border-b border-border"
          title="Sidebar ausklappen"
        >
          <PanelLeftOpen size={15} />
        </button>
      )}

      {/* Search (hidden when collapsed) */}
      {!collapsed && (
        <div className="relative px-3 pt-3">
          <Search size={14} className="absolute left-6 top-1/2 mt-1.5 -translate-y-1/2 text-text-secondary pointer-events-none" />
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen…"
            className="w-full rounded-pill border border-border bg-background py-1.5 pl-7 pr-7 text-xs text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-5 top-1/2 mt-1.5 -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <X size={12} />
            </button>
          )}
        </div>
      )}

      {/* Search results */}
      {!collapsed && searchResults.length > 0 && (
        <div className="mx-3 mt-1 rounded-lg border border-border bg-surface shadow-lg z-50">
          {searchResults.slice(0, 8).map((r) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={() => setSearch("")}
              className="flex items-center gap-2 px-3 py-2 text-xs text-text-primary hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <Search size={11} className="shrink-0 text-text-secondary" />
              {r.label}
            </Link>
          ))}
        </div>
      )}
      {!collapsed && search.trim().length > 0 && searchResults.length === 0 && (
        <p className="px-5 py-2 text-xs text-text-secondary">Keine Ergebnisse</p>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                {group.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.label === "Mein Lernen" && (
                <li>
                  <button
                    onClick={openGlossar}
                    title="Glossar"
                    className={cn(
                      "flex w-full items-center gap-3 rounded-pill px-2 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-100",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <BookOpen size={18} className="shrink-0" />
                    {!collapsed && <span className="flex-1 text-left">Glossar</span>}
                  </button>
                </li>
              )}
              {group.items.map((item) => {
                const Icon = ICONS[item.icon];
                const isOpen = openItems.has(item.label);
                const hasActiveChild = isChildActive(item, pathname);
                const isDirectlyActive =
                  item.href &&
                  (pathname === item.href || pathname.startsWith(item.href + "/"));

                if (item.sections) {
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => { if (!collapsed) toggle(item.label); }}
                        title={item.label}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-pill px-2 py-2 text-sm font-semibold transition-colors",
                          collapsed && "justify-center px-0",
                          hasActiveChild
                            ? "bg-text-primary text-white"
                            : "text-text-primary hover:bg-gray-100"
                        )}
                      >
                        {Icon && <Icon size={18} className="shrink-0" />}
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {isOpen ? (
                              <ChevronDown size={13} className="shrink-0 opacity-70" />
                            ) : (
                              <ChevronRight size={13} className="shrink-0 opacity-70" />
                            )}
                          </>
                        )}
                      </button>

                      {!collapsed && isOpen && (
                        <div className="ml-3 mt-0.5 border-l-2 border-border pl-3">
                          {item.sections.map((section) => (
                            <div key={section.label || "_"} className="mb-1 mt-1">
                              {section.label && (
                                <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                                  {section.label}
                                </p>
                              )}
                              {section.items.map((sub) => {
                                const subActive =
                                  pathname === sub.href || pathname.startsWith(sub.href + "/");
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className={cn(
                                      "flex items-center rounded-pill px-2 py-1.5 text-xs transition-colors",
                                      subActive
                                        ? "bg-gray-100 font-medium text-text-primary"
                                        : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                                    )}
                                  >
                                    {sub.label}
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      title={item.label}
                      className={cn(
                        "flex items-center gap-3 rounded-pill px-2 py-2 text-sm font-semibold transition-colors",
                        collapsed && "justify-center px-0",
                        isDirectlyActive
                          ? "bg-text-primary text-white"
                          : "text-text-primary hover:bg-gray-100"
                      )}
                    >
                      {Icon && <Icon size={18} className="shrink-0" />}
                      {!collapsed && <span className="flex-1">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-2 py-3">
        {!collapsed && (
          <Link
            href="/einstellungen"
            className="flex items-center gap-3 rounded-pill px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary"
          >
            <Settings size={18} className="shrink-0" />
            Einstellungen
          </Link>
        )}

        <Link
          href="/einstellungen"
          title={profile.name || "Gast"}
          className={cn(
            "mt-1 flex items-center gap-3 rounded-pill px-2 py-2 transition-colors hover:bg-gray-100",
            collapsed && "justify-center"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
            {initials(profile.name)}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-text-primary">
                {profile.name || "Gast"}
              </p>
              <p className="truncate text-[11px] text-text-secondary">
                {profile.role || "Profil einrichten"}
              </p>
            </div>
          )}
        </Link>

        {!collapsed && (
          <div className="mt-2 flex flex-wrap gap-3 px-3 pb-0.5">
            <Link href="/impressum" className="text-[10px] text-text-secondary transition-colors hover:text-text-primary">
              Impressum
            </Link>
            <span className="text-[10px] text-text-secondary opacity-40">·</span>
            <Link href="/datenschutz" className="text-[10px] text-text-secondary transition-colors hover:text-text-primary">
              Datenschutz
            </Link>
            <span className="text-[10px] text-text-secondary opacity-40">·</span>
            <Link href="/kontakt" className="text-[10px] text-text-secondary transition-colors hover:text-text-primary">
              Kontakt
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
