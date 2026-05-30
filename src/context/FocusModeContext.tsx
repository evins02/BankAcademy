"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface FocusModeContextValue {
  focusMode: boolean;
  toggleFocusMode: () => void;
  exitFocusMode: () => void;
}

const FocusModeContext = createContext<FocusModeContextValue>({
  focusMode: false,
  toggleFocusMode: () => {},
  exitFocusMode: () => {},
});

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && focusMode) {
        setFocusMode(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusMode]);

  function toggleFocusMode() {
    setFocusMode((v) => !v);
  }

  function exitFocusMode() {
    setFocusMode(false);
  }

  return (
    <FocusModeContext.Provider value={{ focusMode, toggleFocusMode, exitFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  );
}

export function useFocusMode() {
  return useContext(FocusModeContext);
}
