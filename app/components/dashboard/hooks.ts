"use client";

import { useState, useEffect } from "react";
import { useDesign } from "../../lib/design-context";

export function useChromeColors() {
  const { state } = useDesign();
  const dark = state.themeMode === "dark";
  return {
    pageBg: dark ? "#09090B" : "#F4F4F5",
    panelBg: dark ? "#111113" : "#FFFFFF",
    panelBorder: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    textPrimary: dark ? "#FAFAFA" : "#09090B",
    textSecondary: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    textMuted: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
    hoverBg: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    activeBg: dark ? "rgba(124,92,252,0.10)" : "rgba(124,92,252,0.08)",
    activeBorder: dark ? "rgba(124,92,252,0.35)" : "rgba(124,92,252,0.3)",
    accent: "#7C5CFC",
    accentText: dark ? "#C4B5FD" : "#6D28D9",
    inputBg: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    inputBorder: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
    codeBg: dark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.04)",
    dark,
  };
}

export type ChromeColors = ReturnType<typeof useChromeColors>;

export function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}
