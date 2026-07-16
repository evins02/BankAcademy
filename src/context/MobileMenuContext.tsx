"use client";

import { createContext, useContext, useState } from "react";

interface MobileMenuContextValue {
  mobileOpen: boolean;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextValue>({
  mobileOpen: false,
  toggleMobile: () => {},
  closeMobile: () => {},
});

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <MobileMenuContext.Provider
      value={{
        mobileOpen,
        toggleMobile: () => setMobileOpen((v) => !v),
        closeMobile: () => setMobileOpen(false),
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}
