"use client";

import { useState } from "react";
import { MessageSquare, HelpCircle, BookOpen, Users, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";

export default function CommunityPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/community-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  const PREVIEW_CARDS = [
    { icon: HelpCircle, title: t.community.card1Title, desc: t.community.card1Desc },
    { icon: BookOpen, title: t.community.card2Title, desc: t.community.card2Desc },
    { icon: Users, title: t.community.card3Title, desc: t.community.card3Desc },
  ];

  return (
    <>
      <Header title={t.community.title} subtitle={t.community.subtitle} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl">

          {/* Hero */}
          <div className="mb-8 flex flex-col items-center text-center pt-4">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
              <MessageSquare size={30} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">{t.community.heroTitle}</h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              {t.community.heroDesc}
            </p>
          </div>

          {/* Preview cards */}
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {PREVIEW_CARDS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-surface p-4 opacity-50 select-none"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <Icon size={18} className="text-text-secondary" />
                </div>
                <p className="text-sm font-semibold text-text-primary">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>

          {/* Waitlist */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="mb-4 text-sm font-semibold text-text-primary">
              {t.community.waitlistTitle}
            </p>
            {state === "done" ? (
              <div className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <CheckCircle2 size={16} className="shrink-0 text-green-600" />
                <p className="text-sm font-medium text-green-700">
                  {t.community.successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.community.emailPlaceholder}
                  required
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={state === "loading" || !email.trim()}
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-50"
                  style={{ background: "#0D1B4B" }}
                >
                  {state === "loading" ? t.community.loadingBtn : t.community.notifyBtn}
                </button>
              </form>
            )}
            {state === "error" && (
              <p className="mt-2 text-xs text-red-500">{t.community.errorMsg}</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
