"use client";

import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNotes, saveNote, deleteNote } from "@/lib/notesData";

interface NoteModalProps {
  scenarioId: string;
  moduleId: string;
  moduleName: string;
  onClose: () => void;
}

export function NoteModal({ scenarioId, moduleId, moduleName, onClose }: NoteModalProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const notes = getNotes();
    setContent(notes[scenarioId]?.content ?? "");
  }, [scenarioId]);

  function handleSave() {
    saveNote({ scenarioId, moduleId, moduleName, content, updatedAt: "" });
    onClose();
  }

  function handleDelete() {
    deleteNote(scenarioId);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md animate-scale-in rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-text-primary">📝 Notiz</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-text-secondary hover:bg-gray-100 hover:text-text-primary">
            <X size={16} />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Schreibe dir eine Notiz zu diesem Szenario…"
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          rows={5}
          autoFocus
        />

        <div className="mt-4 flex items-center gap-2">
          <Button onClick={handleSave} className="flex-1">Speichern</Button>
          <Button variant="secondary" onClick={onClose}>Abbrechen</Button>
          {content && (
            <button
              onClick={handleDelete}
              className="rounded-lg p-2 text-text-secondary hover:bg-red-50 hover:text-red-600"
              title="Notiz löschen"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
