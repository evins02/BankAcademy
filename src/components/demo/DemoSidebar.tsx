"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
  ChevronDown,
  ChevronRight,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { NAV_GROUPS } from "@/lib/constants";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  User, Building2, TrendingUp, Settings2, Landmark, Scale,
  LayoutDashboard, BarChart2, Award, AlertCircle, Trophy, MessageSquare,
  FileText, Bookmark, GraduationCap, Map, ClipboardList,
};

const DEMO_UNLOCKED = new Set([
  "/privatkunde/basis/kontoeröffnung",
  "/privatkunde/basis/sparen-konto",
  "/privatkunde/basis/zahlungsverkehr",
  "/privatkunde/basis/fonds",
  "/anlagekunde/anlegerprofil",
  "/backoffice/banking-operations/kyc",
  "/backoffice/banking-operations/zahlungsverkehr",
  "/backoffice/banking-operations/mahnwesen",
  "/demo",
]);

function isUnlocked(href: string) {
  return DEMO_UNLOCKED.has(href);
}

function hasUnlockedChild(item: NavItem): boolean {
  if (!item.sections) return false;
  return item.sections.some((s) => s.items.some((sub) => isUnlocked(sub.href)));
}

export function DemoSidebar({ onLock, onClose }: { onLock: () => void; onClose?: () => void }) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const open = new Set<string>();
    for (const group of NAV_GROUPS) {
      for (const item of group.items) {
        if (hasUnlockedChild(item)) open.add(item.label);
      }
    }
    return open;
  });

  useEffect(() => {
    onClose?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function toggle(label: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  return (
    <aside
      className="flex h-full shrink-0 flex-col border-r border-border bg-surface overflow-hidden"
      style={{ width: 240 }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/demo" className="flex-1 min-w-0">
          <BankingLabLogo size="md" />
        </Link>
        <span
          style={{
            marginLeft: 8,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "#fef3c7",
            color: "#92400e",
            padding: "2px 7px",
            borderRadius: 100,
            flexShrink: 0,
          }}
        >
          Demo
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = ICONS[item.icon];
                const isOpen = openItems.has(item.label);

                if (item.sections) {
                  const anyUnlocked = hasUnlockedChild(item);

                  if (!anyUnlocked) {
                    return (
                      <li key={item.label}>
                        <button
                          onClick={onLock}
                          className="flex w-full items-center gap-3 rounded-pill px-2 py-2 text-sm font-semibold transition-colors"
                          style={{ color: "#9ca3af", cursor: "pointer" }}
                        >
                          {Icon && <Icon size={18} className="shrink-0" style={{ color: "#9ca3af" }} />}
                          <span className="flex-1 text-left">{item.label}</span>
                          <Lock size={13} style={{ color: "#d1d5db", flexShrink: 0 }} />
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => toggle(item.label)}
                        className="flex w-full items-center gap-3 rounded-pill px-2 py-2 text-sm font-semibold transition-colors text-text-primary hover:bg-gray-100"
                      >
                        {Icon && <Icon size={18} className="shrink-0" />}
                        <span className="flex-1 text-left">{item.label}</span>
                        {isOpen ? (
                          <ChevronDown size={13} className="shrink-0 opacity-70" />
                        ) : (
                          <ChevronRight size={13} className="shrink-0 opacity-70" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="ml-3 mt-0.5 border-l-2 border-border pl-3">
                          {item.sections.map((section) => (
                            <div key={section.label || "_"} className="mb-1 mt-1">
                              {section.label && (
                                <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                                  {section.label}
                                </p>
                              )}
                              {section.items.map((sub) => {
                                const unlocked = isUnlocked(sub.href);
                                const demoSubHref = "/demo" + sub.href;
                                const subActive =
                                  pathname === demoSubHref ||
                                  pathname.startsWith(demoSubHref + "/");
                                if (unlocked) {
                                  return (
                                    <Link
                                      key={sub.href}
                                      href={demoSubHref}
                                      className={cn(
                                        "flex items-center gap-2 rounded-pill px-2 py-1.5 text-xs transition-colors",
                                        subActive
                                          ? "bg-gray-100 font-medium text-text-primary"
                                          : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                                      )}
                                    >
                                      {sub.label}
                                    </Link>
                                  );
                                }
                                return (
                                  <button
                                    key={sub.href}
                                    onClick={onLock}
                                    className="flex w-full items-center gap-2 rounded-pill px-2 py-1.5 text-xs transition-colors"
                                    style={{ color: "#9ca3af", cursor: "pointer" }}
                                  >
                                    <span className="flex-1 text-left">{sub.label}</span>
                                    <Lock size={11} style={{ color: "#d1d5db", flexShrink: 0 }} />
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

                const isDemo = item.href === "/dashboard";
                const demoHref = isDemo ? "/demo" : item.href!;
                const unlocked = isUnlocked(demoHref);
                const isActive =
                  pathname === demoHref || pathname.startsWith(demoHref + "/");

                if (!unlocked && !isDemo) {
                  return (
                    <li key={item.label}>
                      <button
                        onClick={onLock}
                        className="flex w-full items-center gap-3 rounded-pill px-2 py-2 text-sm font-semibold transition-colors"
                        style={{ color: "#9ca3af", cursor: "pointer" }}
                      >
                        {Icon && <Icon size={18} className="shrink-0" style={{ color: "#9ca3af" }} />}
                        <span className="flex-1 text-left">{item.label}</span>
                        <Lock size={13} style={{ color: "#d1d5db", flexShrink: 0 }} />
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={demoHref}
                      className={cn(
                        "flex items-center gap-3 rounded-pill px-2 py-2 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-text-primary text-white"
                          : "text-text-primary hover:bg-gray-100"
                      )}
                    >
                      {Icon && <Icon size={18} className="shrink-0" />}
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer CTA */}
      <div className="border-t border-border px-3 py-4">
        <Link
          href="/kontakt"
          style={{
            display: "block",
            padding: "10px 14px",
            borderRadius: 10,
            background: "#0D1B4B",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Vollzugang anfragen →
        </Link>
        <p className="mt-2 text-center text-[10px] text-text-secondary">
          Alle Module · 150+ Szenarien · Challenge-Modus
        </p>
      </div>
    </aside>
  );
}
