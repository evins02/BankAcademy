"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { de } from "@/lib/i18n/de";
import { DICTS, type Lang } from "@/lib/i18n";
import { useUser } from "@clerk/nextjs";

type Translations = typeof de;

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: "de",
  setLang: () => {},
  t: de,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [lang, setLangState] = useState<Lang>("de");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ba-lang");
      if (saved && saved in DICTS) setLangState(saved as Lang);
    } catch {}
  }, []);

  // Sync from Clerk profile (overrides localStorage if set)
  useEffect(() => {
    if (!isLoaded || !user) return;
    const p = user.unsafeMetadata?.profile as { language?: string } | undefined;
    if (p?.language && p.language in DICTS) {
      setLangState(p.language as Lang);
      try { localStorage.setItem("ba-lang", p.language); } catch {}
    }
  }, [isLoaded, user]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("ba-lang", l); } catch {}
    if (user) {
      const current = (user.unsafeMetadata?.profile as Record<string, unknown>) ?? {};
      user.update({ unsafeMetadata: { profile: { ...current, language: l } } }).catch(() => {});
    }
  }, [user]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
