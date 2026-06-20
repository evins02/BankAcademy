"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ConvMessage } from "./conv-types";

interface ChatPhaseProps {
  messages: ConvMessage[];
  isLoading: boolean;
  onSend: (text: string) => void;
  onFinish: () => void;
}

const MIN_EXCHANGES = 8;

export function ChatPhase({ messages, isLoading, onSend, onFinish }: ChatPhaseProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const studentMessages = messages.filter((m) => m.role === "student").length;
  const canFinish = messages.length >= MIN_EXCHANGES;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    onSend(text);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [input, isLoading, onSend]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Customer card */}
      <div className="shrink-0 border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
            style={{ background: "#6b7280" }}
          >
            TK
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Thomas Kowalski</p>
            <p className="text-xs text-text-secondary">Neukunde – Privatkonto eröffnen</p>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              In der Filiale
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-text-secondary">
              Begrüssen Sie den Kunden und stellen Sie die nötigen KYC-Fragen.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "student" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.role === "customer" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                style={{ background: "#6b7280" }}
              >
                TK
              </div>
            )}
            <div
              className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              style={
                msg.role === "student"
                  ? {
                      background: "var(--primary, #0D1B4B)",
                      color: "#fff",
                      borderBottomRightRadius: 4,
                    }
                  : {
                      background: "var(--surface, #f9fafb)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                      borderBottomLeftRadius: 4,
                    }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
              style={{ background: "#6b7280" }}
            >
              TK
            </div>
            <div
              className="rounded-2xl px-4 py-3 flex gap-1.5 items-center"
              style={{
                background: "var(--surface, #f9fafb)",
                border: "1px solid var(--border)",
                borderBottomLeftRadius: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border px-5 py-3 space-y-3">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors"
            placeholder="Ihre Frage an den Kunden…"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isLoading}
          />
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="shrink-0 h-10 px-4"
          >
            <Send size={15} />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            {studentMessages} Fragen gestellt
            {!canFinish && ` · noch ${Math.max(0, MIN_EXCHANGES - messages.length)} Nachrichten für Abschluss`}
          </p>
          <Button
            variant={canFinish ? "primary" : "secondary"}
            onClick={onFinish}
            disabled={!canFinish}
            className="text-sm"
          >
            Gespräch abschliessen →
          </Button>
        </div>
      </div>
    </div>
  );
}
