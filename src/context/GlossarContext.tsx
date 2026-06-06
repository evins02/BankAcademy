"use client";

import { createContext, useContext, useState } from "react";

interface GlossarContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const GlossarContext = createContext<GlossarContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function GlossarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <GlossarContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </GlossarContext.Provider>
  );
}

export function useGlossar() {
  return useContext(GlossarContext);
}
