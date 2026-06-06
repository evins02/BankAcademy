"use client";

import { useEffect } from "react";
import { getSettings, applyTheme } from "@/lib/settingsData";

export function ThemeApplier() {
  useEffect(() => {
    applyTheme(getSettings().theme);
  }, []);

  return null;
}
