"use client";

export interface ScenarioNote {
  scenarioId: string;
  moduleId: string;
  moduleName: string;
  content: string;
  updatedAt: string;
}

export function getNotes(): Record<string, ScenarioNote> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("scenario-notes");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveNote(note: ScenarioNote) {
  const notes = getNotes();
  if (note.content.trim()) {
    notes[note.scenarioId] = { ...note, updatedAt: new Date().toISOString() };
  } else {
    delete notes[note.scenarioId];
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("scenario-notes", JSON.stringify(notes));
  }
}

export function deleteNote(scenarioId: string) {
  const notes = getNotes();
  delete notes[scenarioId];
  if (typeof window !== "undefined") {
    localStorage.setItem("scenario-notes", JSON.stringify(notes));
  }
}
