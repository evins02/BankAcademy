"use client";

const SESSION_KEY = "ba-sid";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function ls(key: string): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(`${getSessionId()}::${key}`); } catch { return null; }
}

export function lsSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(`${getSessionId()}::${key}`, value); } catch {}
}

export function lsRemove(key: string): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(`${getSessionId()}::${key}`); } catch {}
}

export function lsClearSession(): void {
  if (typeof window === "undefined") return;
  const prefix = `${getSessionId()}::`;
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
}
