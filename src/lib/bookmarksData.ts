"use client";

export interface Bookmark {
  scenarioId: string;
  moduleId: string;
  moduleName: string;
  title: string;
  savedAt: string;
}

function read(): Record<string, Bookmark> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("scenario-bookmarks");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function write(data: Record<string, Bookmark>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("scenario-bookmarks", JSON.stringify(data));
}

export function getBookmarks(): Record<string, Bookmark> {
  return read();
}

export function isBookmarked(scenarioId: string): boolean {
  return !!read()[scenarioId];
}

export function addBookmark(bookmark: Bookmark) {
  const all = read();
  all[bookmark.scenarioId] = { ...bookmark, savedAt: new Date().toISOString() };
  write(all);
}

export function removeBookmark(scenarioId: string) {
  const all = read();
  delete all[scenarioId];
  write(all);
}

export function toggleBookmark(bookmark: Bookmark): boolean {
  if (isBookmarked(bookmark.scenarioId)) {
    removeBookmark(bookmark.scenarioId);
    return false;
  } else {
    addBookmark(bookmark);
    return true;
  }
}
