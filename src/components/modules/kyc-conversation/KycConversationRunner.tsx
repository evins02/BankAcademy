"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowUp, AlertCircle, CheckCircle, XCircle,
  Mic, MicOff, Volume2, VolumeX, PenLine,
} from "lucide-react";
import { KycFormCard } from "@/components/modules/kyc-form/KycFormCard";
import type { KycFormData } from "@/components/modules/kyc-form/kyc-form-types";
import { addXP } from "@/lib/xpData";
import { Confetti } from "@/components/shared/Confetti";
import { KYC_PFLICHTFRAGEN } from "@/lib/kyc-conversation";

type Phase = "briefing" | "chat" | "summary" | "form" | "evaluating" | "feedback" | "aborted";
type Message = { role: "user" | "assistant"; content: string };
type Evaluation = {
  result: "BESTANDEN" | "NICHT BESTANDEN";
  conversationAsked: string[];
  conversationMissing: string[];
  formErrors: Array<{ field: string; message: string }>;
  formCorrect: string[];
  criticalErrors: string[];
  conversationScore: number;
  conversationTotal: number;
  formScore: number;
  formTotal: number;
  feedback: string;
};

const CHECKLIST_ITEMS = KYC_PFLICHTFRAGEN;

interface Props {
  onBack: () => void;
}

export function KycConversationRunner({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>(
    Array(CHECKLIST_ITEMS.length).fill(false)
  );
  const [checklistLoading, setChecklistLoading] = useState(false);

  // Speech state
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [micPermission, setMicPermission] = useState<PermissionState | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const pendingTranscriptRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSpeechSupported(
      !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
    );
    navigator.permissions?.query({ name: "microphone" as PermissionName }).then((status) => {
      setMicPermission(status.state);
      status.onchange = () => setMicPermission(status.state);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!loading && phase === "chat") textareaRef.current?.focus();
  }, [loading, phase]);

  useEffect(() => {
    if (phase !== "feedback" || !evaluation) return;
    const passed = evaluation.result === "BESTANDEN";
    addXP(passed ? 200 : 40);
    if (passed) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [phase, evaluation]);

  // TTS: read Thomas's response aloud
  const lastThomas = [...messages].reverse().find((m) => m.role === "assistant");
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (loading) { window.speechSynthesis.cancel(); return; }
    if (!ttsEnabled || !lastThomas) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(lastThomas.content);
    utterance.lang = "de-CH";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, [lastThomas, ttsEnabled, loading]);

  async function sendMessage(textOverride?: string) {
    const text = (textOverride !== undefined ? textOverride : input).trim();
    if (!text || loading) return;

    const snapshot = messages;
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/kyc-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);

      const finalMessages: Message[] = [...newMessages, { role: "assistant", content: data.message }];
      setMessages(finalMessages);
      if (data.conversationAborted) {
        setTimeout(() => setPhase("aborted"), 1800);
      }
    } catch (e) {
      setMessages(snapshot);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function toggleListening() {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    setSpeechError(null);

    const SpeechRec =
      (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechError("Spracherkennung wird von diesem Browser nicht unterstützt (Chrome empfohlen).");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setSpeechError("Mikrofon-Zugriff verweigert – bitte in den Browser-Einstellungen erlauben.");
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = "de-DE";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      const capped = text.slice(0, 500);
      setInput(capped);
      pendingTranscriptRef.current = capped;
    };

    recognition.onend = () => {
      setIsListening(false);
      pendingTranscriptRef.current = "";
    };

    recognition.onerror = (event: any) => {
      const msgs: Record<string, string> = {
        "not-allowed": "Mikrofon-Zugriff verweigert – bitte in den Browser-Einstellungen erlauben.",
        "no-speech": "Kein Ton erkannt – bitte nochmals versuchen.",
        "network": "Netzwerkfehler bei der Spracherkennung.",
        "audio-capture": "Kein Mikrofon gefunden.",
      };
      setSpeechError(msgs[event.error] ?? `Fehler: ${event.error}`);
      setIsListening(false);
      pendingTranscriptRef.current = "";
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      setSpeechError(`Spracherkennung konnte nicht gestartet werden: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  async function handleFinishChat() {
    setChecklistLoading(true);
    try {
      const res = await fetch("/api/kyc-checklist-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      const covered: string[] = Array.isArray(data?.covered) ? data.covered : [];
      setChecklist(CHECKLIST_ITEMS.map((item) => covered.includes(item)));
    } catch {
      // leave checklist as-is (all unchecked) if the check fails
    }
    setChecklistLoading(false);
    setPhase("summary");
  }

  async function handleFormSubmit(formData: KycFormData) {
    setPhase("evaluating");
    try {
      const res = await fetch("/api/kyc-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, formData }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      if (data.result) {
        setEvaluation(data);
      } else {
        throw new Error("Bad response");
      }
    } catch {
      setEvaluation({
        result: "NICHT BESTANDEN",
        conversationAsked: [],
        conversationMissing: ["Auswertung nicht verfügbar"],
        formErrors: [],
        formCorrect: [],
        criticalErrors: [],
        conversationScore: 0,
        conversationTotal: 9,
        formScore: 0,
        formTotal: 8,
        feedback: "Die Auswertung ist momentan nicht verfügbar. Bitte erneut versuchen.",
      });
    }
    setPhase("feedback");
  }

  function handleRetry() {
    setMessages([]);
    setEvaluation(null);
    setLoading(false);
    setError(null);
    setPhase("briefing");
    setAttempt((a) => a + 1);
    setChecklist(Array(CHECKLIST_ITEMS.length).fill(false));
    setNotes("");
  }

  const questionCount = messages.filter((m) => m.role === "user").length;

  // ── Briefing ───────────────────────────────────────────────────────────────
  if (phase === "briefing") {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-lg w-full space-y-5">
          <button
            onClick={onBack}
            className="text-xs text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            ← Zurück zur Übersicht
          </button>

          <div className="text-center py-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(37,99,235,0.1)" }}
            >
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary">KYC Gespräch</h2>
            <p className="text-text-secondary mt-2 text-sm leading-relaxed">
              Du bist Bankberater. Thomas Kowalski möchte ein Privatkonto eröffnen.
              Stelle gezielte Fragen und sammle alle nötigen KYC-Informationen.
            </p>
          </div>

          <div
            className="rounded-xl p-4 flex items-start gap-3"
            style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
          >
            <span className="text-lg shrink-0">💡</span>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#92400e" }}>Tipp</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "#78350f" }}>
                Du hast genau <strong>9 Fragen</strong>. Thomas antwortet nur auf das, was du direkt fragst –
                plane deine Fragen sorgfältig. Nutze das Notizbuch-Symbol im Gespräch, um Antworten festzuhalten.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-surface border border-border p-5">
            <p className="text-sm font-bold text-text-primary mb-3">
              Folgende Informationen musst du sammeln:
            </p>
            <div className="space-y-2">
              {CHECKLIST_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                  <div
                    className="w-4 h-4 rounded flex-shrink-0 border-2 border-border"
                    style={{ marginTop: 1 }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPhase("chat")}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: "#2563eb" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
          >
            Gespräch starten →
          </button>
        </div>
      </div>
    );
  }

  // ── Aborted ───────────────────────────────────────────────────────────────
  if (phase === "aborted") {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="mx-auto max-w-md w-full space-y-5 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            style={{ background: "rgba(220,38,38,0.1)" }}
          >
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#dc2626" }}>
            Gespräch abgebrochen
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Thomas Kowalski hat das Gespräch aufgrund eines <strong>respektlosen oder unangemessenen Verhaltens</strong> sofort beendet.
          </p>
          <div
            className="rounded-xl p-4 text-left text-sm leading-relaxed"
            style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)" }}
          >
            <p className="font-semibold mb-2" style={{ color: "#dc2626" }}>Was ist schiefgelaufen?</p>
            <ul className="space-y-1 text-text-secondary list-disc list-inside">
              <li>Unangemessene oder beleidigende Wortwahl</li>
              <li>Diskriminierende oder abwertende Bemerkungen</li>
              <li>Aggressiver oder herablassender Ton</li>
              <li>Fragen ohne KYC-Bezug / Eingriff in die Privatsphäre</li>
            </ul>
          </div>
          <p className="text-xs text-text-secondary">
            Professionelle Kommunikation ist in der Bankenbranche nicht optional.
            Ein realer Kunde würde die Bank verlassen und Beschwerde einreichen.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ background: "#dc2626" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#dc2626")}
            >
              Nochmals versuchen
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-text-primary hover:bg-surface transition-colors"
            >
              Zurück zur Übersicht
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  if (phase === "summary") {
    const checked = checklist.filter(Boolean).length;
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-lg space-y-5">
          <div className="text-center py-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(37,99,235,0.1)" }}
            >
              <span className="text-2xl">📋</span>
            </div>
            <h2 className="text-xl font-bold text-text-primary">Gespräch beendet</h2>
            <p className="text-sm text-text-secondary mt-1">
              Prüfe deine Checkliste – dann füllst du das Formular aus dem Gedächtnis aus.
            </p>
          </div>

          <div className="rounded-xl bg-surface border border-border p-5">
            <p className="text-sm font-bold text-text-primary mb-3">
              Gesammelte Informationen ({checked}/{CHECKLIST_ITEMS.length})
            </p>
            <div className="space-y-2">
              {CHECKLIST_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: checklist[i] ? "#15803d" : "#dc2626" }}
                >
                  {checklist[i] ? (
                    <CheckCircle size={14} className="shrink-0" />
                  ) : (
                    <XCircle size={14} className="shrink-0" />
                  )}
                  {item}
                </div>
              ))}
            </div>
          </div>

          {notes.trim() && (
            <div
              className="rounded-xl p-4"
              style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
            >
              <p className="text-sm font-bold mb-2" style={{ color: "#92400e" }}>Deine Notizen</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#78350f" }}>
                {notes}
              </p>
            </div>
          )}

          <div
            className="rounded-xl p-4"
            style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
          >
            <p className="text-sm" style={{ color: "#1d4ed8" }}>
              <strong>Jetzt:</strong> Fülle das KYC-Formular aus dem Gedächtnis aus.
              Das Gespräch ist nicht mehr sichtbar.
            </p>
          </div>

          <button
            onClick={() => setPhase("form")}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: "#2563eb" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
          >
            Formular ausfüllen →
          </button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  if (phase === "form") {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl mb-4">
          <div
            className="rounded-DEFAULT p-4 flex items-start gap-3"
            style={{ background: "rgba(13,27,75,0.04)", border: "1px solid rgba(13,27,75,0.1)" }}
          >
            <span className="text-base shrink-0">📋</span>
            <div>
              <p className="text-sm font-bold text-text-primary">Phase 2 – Formular ausfüllen</p>
              <p className="text-sm text-text-secondary mt-0.5">
                Füllen Sie das KYC-Formular aus dem Gedächtnis aus. Das Gespräch ist abgeschlossen
                und nicht mehr sichtbar.
              </p>
            </div>
          </div>
        </div>
        <KycFormCard key={attempt} onSubmit={handleFormSubmit} hideDossier />

        {notes.trim() && (
          <div
            className="fixed bottom-6 right-6 z-40 w-72 rounded-xl p-4 shadow-2xl"
            style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
          >
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold" style={{ color: "#92400e" }}>
              <PenLine size={12} /> Deine Notizen
            </p>
            <p
              className="max-h-48 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed"
              style={{ color: "#78350f" }}
            >
              {notes}
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── Evaluating ─────────────────────────────────────────────────────────────
  if (phase === "evaluating") {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div
            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto"
            style={{ borderColor: "var(--primary, #0D1B4B)", borderTopColor: "transparent" }}
          />
          <p className="text-base font-semibold text-text-primary">Formular wird geprüft…</p>
          <p className="text-sm text-text-secondary mt-1">
            Gespräch und Formular werden gleichzeitig ausgewertet
          </p>
        </div>
      </div>
    );
  }

  // ── Feedback ───────────────────────────────────────────────────────────────
  if (phase === "feedback" && evaluation) {
    const passed = evaluation.result === "BESTANDEN";
    return (
      <>
        <Confetti active={showConfetti} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl space-y-4">
            <div
              className={`rounded-DEFAULT p-5 flex items-start gap-4 ${
                passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              {passed ? (
                <CheckCircle className="text-green-600 shrink-0" size={24} />
              ) : (
                <XCircle className="text-red-600 shrink-0" size={24} />
              )}
              <div>
                <p className={`font-bold text-lg ${passed ? "text-green-800" : "text-red-800"}`}>
                  {evaluation.result}
                </p>
                <p className="text-sm mt-1 text-text-secondary">{evaluation.feedback}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
                <p className="text-xs text-text-secondary mb-1">Gespräch</p>
                <p className="text-2xl font-bold text-text-primary">
                  {evaluation.conversationScore}/{evaluation.conversationTotal}
                </p>
                <p className="text-xs text-text-secondary mt-1">Pflichtfragen gestellt</p>
              </div>
              <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
                <p className="text-xs text-text-secondary mb-1">Formular</p>
                <p className="text-2xl font-bold text-text-primary">
                  {evaluation.formScore}/{evaluation.formTotal}
                </p>
                <p className="text-xs text-text-secondary mt-1">Punkte korrekt</p>
              </div>
            </div>

            {evaluation.conversationMissing.length > 0 && (
              <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
                <p className="text-sm font-bold text-text-primary mb-2">Fehlende Pflichtfragen</p>
                <ul className="space-y-1">
                  {evaluation.conversationMissing.map((q, i) => (
                    <li key={i} className="text-sm text-red-600 flex items-center gap-2">
                      <XCircle size={13} className="shrink-0" /> {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {evaluation.formErrors.length > 0 && (
              <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
                <p className="text-sm font-bold text-text-primary mb-2">Formularfehler</p>
                <ul className="space-y-2">
                  {evaluation.formErrors.map((err, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-semibold text-red-700">{err.field}:</span>{" "}
                      <span className="text-text-secondary">{err.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 py-2.5 rounded-DEFAULT border border-border text-sm font-medium text-text-primary hover:bg-surface transition-colors"
              >
                Nochmals versuchen
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-2.5 rounded-DEFAULT text-sm font-medium text-white transition-colors"
                style={{ background: "var(--primary, #0D1B4B)" }}
              >
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Chat ───────────────────────────────────────────────────────────────────
  const counterColor = questionCount >= 9 ? "#f87171" : questionCount >= 8 ? "#fb923c" : "#93c5fd";

  return (
    <>
      <Confetti active={showConfetti} />

      {/* Notebook overlay */}
      {notesOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-stretch justify-end">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setNotesOpen(false)}
          />
          <div
            className="relative rounded-t-2xl p-5 shadow-2xl"
            style={{ background: "#1a1a2e", maxHeight: "60vh" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <PenLine size={14} /> Notizen
              </p>
              <button
                onClick={() => setNotesOpen(false)}
                className="text-gray-400 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notiere dir die Antworten von Thomas…"
              className="w-full resize-none rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: "rgba(255,255,255,0.08)", minHeight: 160 }}
              rows={7}
              autoFocus
            />
            <p className="text-[10px] text-gray-500 mt-2">
              Diese Notizen siehst du nach dem Gespräch noch einmal.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left: conversation history only (checklist intentionally hidden during chat) */}
        <div
          className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#111111]"
          style={{ userSelect: "none" }}
        >
          <div className="border-b border-white/10 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Gesprächsverlauf
            </p>
          </div>
          <div ref={historyRef} className="flex-1 space-y-2 overflow-y-auto p-3 min-h-0">
            {messages.length === 0 && (
              <p className="text-[11px] text-gray-600 text-center pt-4">
                Begrüssen Sie den Kunden und stellen Sie die KYC-Fragen.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-xl px-3 py-2 text-xs ${
                    msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <p className="mb-0.5 text-[9px] font-semibold text-gray-400">Thomas</p>
                  )}
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-xl bg-gray-700 px-3 py-2 text-xs text-gray-400">
                  <span>tippt</span>
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="inline-block h-1 w-1 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right: office background */}
        <div
          className="relative flex flex-1 flex-col overflow-hidden text-white"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/evins02/BankAcademy/main/public/bankacademy_kyc_final.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Question counter – top right */}
          <div className="absolute right-4 top-4 z-10 flex flex-col items-center rounded-xl border border-blue-500/40 bg-black/40 px-3 py-2 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Fragen
            </p>
            <p className="text-xl font-bold tabular-nums" style={{ color: counterColor }}>
              {questionCount}/9
            </p>
            <p className="text-[9px]" style={{ color: counterColor }}>
              {questionCount >= 9 ? "Maximum!" : questionCount >= 8 ? "Letzte Frage" : "gestellt"}
            </p>
          </div>

          {/* Speech bubble */}
          <div
            className="absolute left-1/2 z-10 w-full max-w-sm -translate-x-1/2 px-4"
            style={{ top: "17%" }}
          >
            <div
              className={`relative rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-lg ${
                loading ? "animate-pulse" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-sm">Thomas tippt</span>
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-relaxed">
                  {lastThomas?.content ?? "Guten Tag, ich möchte ein Konto eröffnen."}
                </p>
              )}
              <span
                className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "12px solid white",
                  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))",
                }}
              />
            </div>
          </div>

          {/* Input area */}
          <div className="absolute bottom-16 left-0 right-0 z-10 space-y-2 px-4">
            {speechError && (
              <div className="flex items-center gap-2 rounded-xl bg-orange-600/90 px-4 py-2 text-xs text-white shadow-lg">
                <AlertCircle size={12} className="shrink-0" />
                {speechError}
                <button className="ml-auto underline" onClick={() => setSpeechError(null)}>✕</button>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-600/90 px-4 py-2 text-xs text-white shadow-lg">
                <AlertCircle size={12} className="shrink-0" />
                {error} · Bitte nochmals senden.
              </div>
            )}
            <div className="flex items-end gap-2">
              {/* Mic button */}
              {speechSupported && (
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={toggleListening}
                    disabled={loading}
                    aria-label={isListening ? "Aufnahme stoppen" : "Spracheingabe starten"}
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                      isListening
                        ? "bg-red-500"
                        : micPermission === "denied"
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {isListening && (
                      <span className="absolute inset-0 rounded-xl animate-ping bg-red-500/50" />
                    )}
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  {micPermission === "denied" && (
                    <span className="text-[9px] text-red-400 text-center leading-tight w-14">Blockiert</span>
                  )}
                  {micPermission === "granted" && !isListening && (
                    <span className="text-[9px] text-green-400 text-center leading-tight w-14">Bereit</span>
                  )}
                </div>
              )}

              {/* Textarea */}
              <div className="relative flex-1">
                {isListening && (
                  <div className="absolute -top-6 left-0 flex items-center gap-1.5 text-[11px] text-red-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                    Spreche jetzt…
                  </div>
                )}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 500))}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={3}
                  placeholder={
                    isListening
                      ? "Höre zu…"
                      : "Was sagst du als Berater? Stelle deine KYC-Fragen..."
                  }
                  className="w-full resize-none rounded-xl bg-white/95 px-4 py-3 pb-6 text-sm text-gray-900 placeholder-gray-400 shadow-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                />
                <p className="absolute bottom-2 right-3 text-[10px] text-gray-400">
                  {input.length}/500
                </p>
              </div>

              {/* Send button */}
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Senden"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>

          {/* Control bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-white/10 bg-[#111111]/95 px-6 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* TTS toggle */}
              <button
                onClick={() => {
                  if (ttsEnabled && typeof window !== "undefined") window.speechSynthesis?.cancel();
                  setTtsEnabled((v) => !v);
                }}
                aria-label={ttsEnabled ? "Stimme ausschalten" : "Stimme einschalten"}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/20"
              >
                {ttsEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span>Stimme {ttsEnabled ? "an" : "aus"}</span>
              </button>

              {/* Notebook button */}
              <button
                onClick={() => setNotesOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/20"
              >
                <PenLine size={13} />
                <span>Notizen{notes.trim() ? " ●" : ""}</span>
              </button>
            </div>

            <button
              onClick={handleFinishChat}
              disabled={checklistLoading}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checklistLoading ? "Wird geprüft…" : "Weiter zum Formular →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
