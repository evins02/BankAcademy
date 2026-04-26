"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Building2,
  TrendingUp,
  Settings2,
  Settings,
  Landmark,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_GROUPS } from "@/lib/constants";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import type { NavItem } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  User,
  Building2,
  TrendingUp,
  Settings2,
  Landmark,
};

function isChildActive(item: NavItem, pathname: string): boolean {
  if (item.sections) {
    return item.sections.some((section) =>
      section.items.some(
        (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")
      )
    );
  }
  return false;
}

export function Sidebar() {
  const pathname = usePathname();

  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const open = new Set<string>();
    for (const group of NAV_GROUPS) {
      for (const item of group.items) {
        if (item.sections && isChildActive(item, pathname)) {
          open.add(item.label);
        }
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

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link href="/dashboard">
          <BankingLabLogo size="md" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = ICONS[item.icon];
                const isOpen = openItems.has(item.label);
                const hasActiveChild = isChildActive(item, pathname);
                const isDirectlyActive =
                  item.href &&
                  (pathname === item.href ||
                    pathname.startsWith(item.href + "/"));

                if (item.sections) {
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => toggle(item.label)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-pill px-3 py-2 text-sm font-semibold transition-colors",
                          hasActiveChild
                            ? "bg-text-primary text-white"
                            : "text-text-primary hover:bg-gray-100"
                        )}
                      >
                        {Icon && <Icon size={16} />}
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
                                const subActive =
                                  pathname === sub.href ||
                                  pathname.startsWith(sub.href + "/");
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
                      className={cn(
                        "flex items-center gap-3 rounded-pill px-3 py-2 text-sm font-semibold transition-colors",
                        isDirectlyActive
                          ? "bg-text-primary text-white"
                          : "text-text-primary hover:bg-gray-100"
                      )}
                    >
                      {Icon && <Icon size={16} />}
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-pill px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary"
        >
          <Settings size={16} />
          Einstellungen
        </Link>
        <div className="mt-3 flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
            ML
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-text-primary">Max Lernender</p>
            <p className="truncate text-[11px] text-text-secondary">Lehrjahr 2</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
