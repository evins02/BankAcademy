"use client";

import { useState, useCallback, useEffect } from "react";
import { ChatPhase } from "./ChatPhase";
import { EvalFeedbackCard } from "./EvalFeedbackCard";
import {
  type ConvMessage,
  type CustomerApiResponse,
  type ConvEvaluation,
  DEMO_MESSAGES,
  DEMO_EVALUATION,
} from "./conv-types";
import { KycFormCard } from "@/components/modules/kyc-form/KycFormCard";
import type { KycFormData } from "@/components/modules/kyc-form/kyc-form-types";
import { addXP } from "@/lib/xpData";
import { Confetti } from "@/components/shared/Confetti";

type Phase = "chat" | "transition" | "form" | "evaluating" | "feedback";

interface KycConversationRunnerProps {
  onBack: () => void;
}

export function KycConversationRunner({ onBack }: KycConversationRunnerProps) {
  const [phase, setPhase] = useState<Phase>("chat");
  const [messages, setMessages] = useState<ConvMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<ConvEvaluation | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // Demo mode: index into DEMO_MESSAGES
  const [demoIdx, setDemoIdx] = useState(0);

  const handleSend = useCallback(
    async (text: string) => {
      const studentMsg: ConvMessage = { role: "student", content: text };
      const newMessages = [...messages, studentMsg];
      setMessages(newMessages);
      setIsLoading(true);

      try {
        const res = await fetch("/api/kyc-conversation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok) throw new Error(`API ${res.status}`);
        const data: CustomerApiResponse = await res.json();

        if (!data.customerMessage) throw new Error("Bad response");

        setMessages((prev) => [
          ...prev,
          { role: "customer", content: data.customerMessage },
        ]);
      } catch {
        // Demo mode fallback
        setIsDemo(true);
        const idx = demoIdx % DEMO_MESSAGES.length;
        const demo = DEMO_MESSAGES[idx];
        setMessages((prev) => [
          ...prev,
          { role: "customer", content: demo.customer },
        ]);
        setDemoIdx((i) => i + 1);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, demoIdx]
  );

  const handleFinishChat = useCallback(() => {
    setPhase("transition");
    // Auto-advance to form after 3s
    setTimeout(() => setPhase("form"), 3000);
  }, []);

  const handleFormSubmit = useCallback(
    async (formData: KycFormData) => {
      setPhase("evaluating");

      try {
        const res = await fetch("/api/kyc-evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages, formData }),
        });

        if (!res.ok) throw new Error(`API ${res.status}`);
        const data: ConvEvaluation = await res.json();

        if (data.result !== undefined) {
          setEvaluation(data);
        } else {
          throw new Error("Bad evaluation response");
        }
      } catch {
        setEvaluation(DEMO_EVALUATION);
        setIsDemo(true);
      }

      setPhase("feedback");
    },
    [messages]
  );

  // Award XP when feedback arrives
  useEffect(() => {
    if (phase !== "feedback" || !evaluation) return;
    const passed = evaluation.result === "BESTANDEN";
    addXP(passed ? 200 : 40);
    if (passed) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleRetry = useCallback(() => {
    setMessages([]);
    setEvaluation(null);
    setIsDemo(false);
    setDemoIdx(0);
    setIsLoading(false);
    setPhase("chat");
    setAttempt((a) => a + 1);
  }, []);

  // ── Transition screen ──────────────────────────────────────────────────────
  if (phase === "transition") {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm text-center space-y-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
            style={{ background: "rgba(13,27,75,0.08)" }}
          >
            <span className="text-2xl">📋</span>
          </div>
          <h2 className="text-lg font-bold text-text-primary">Gespräch abgeschlossen</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Füllen Sie nun das KYC-Formular aus –{" "}
            <strong className="text-text-primary">ohne zurück zum Gespräch zu schauen.</strong>
          </p>
          <p className="text-sm text-text-secondary">Das Formular erscheint in Kürze…</p>
          <div className="flex justify-center">
            <div
              className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
              style={{
                borderColor: "var(--primary, #0D1B4B)",
                borderTopColor: "transparent",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Form phase ─────────────────────────────────────────────────────────────
  if (phase === "form") {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl mb-4">
          <div
            className="rounded-DEFAULT p-4 flex items-start gap-3"
            style={{
              background: "rgba(13,27,75,0.04)",
              border: "1px solid rgba(13,27,75,0.1)",
            }}
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
        <KycFormCard
          key={attempt}
          onSubmit={handleFormSubmit}
          hideDossier
        />
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
            style={{
              borderColor: "var(--primary, #0D1B4B)",
              borderTopColor: "transparent",
            }}
          />
          <div>
            <p className="text-base font-semibold text-text-primary">Formular wird geprüft…</p>
            <p className="text-sm text-text-secondary mt-1">
              Gespräch und Formular werden gleichzeitig ausgewertet
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Feedback ───────────────────────────────────────────────────────────────
  if (phase === "feedback" && evaluation) {
    return (
      <>
        <Confetti active={showConfetti} />
        <div className="flex-1 overflow-y-auto p-6">
          <EvalFeedbackCard
            evaluation={evaluation}
            isDemo={isDemo}
            onRetry={handleRetry}
            onBack={onBack}
          />
        </div>
      </>
    );
  }

  // ── Chat phase (default) ───────────────────────────────────────────────────
  return (
    <>
      <Confetti active={showConfetti} />
      <ChatPhase
        key={attempt}
        messages={messages}
        isLoading={isLoading}
        onSend={handleSend}
        onFinish={handleFinishChat}
      />
    </>
  );
}
