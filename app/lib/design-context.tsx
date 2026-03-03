"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import {
  type DesignStyle,
  type DesignState,
  type ColorTokens,
  type FontFamily,
  type ThemeMode,
  type ExportPayload,
  designPresets,
  getDefaultState,
  getPresetColors,
  generateCSSVariables,
  stateToExportPayload,
  importPayloadToState,
  fontOptions,
} from "./design-store";

// ─── Modal types ─────────────────────────────────────────────────────────────

export type ModalKind = "export" | "import" | null;

// ─── Context shape ───────────────────────────────────────────────────────────

interface DesignContextValue {
  state: DesignState;
  cssVariables: Record<string, string>;

  // Theme mode
  toggleThemeMode: () => void;

  // Design switching
  setDesign: (style: DesignStyle) => void;

  // Color overrides
  setColor: (token: keyof ColorTokens, value: string) => void;
  setColors: (colors: Partial<ColorTokens>) => void;
  resetColors: () => void;

  // Font controls
  setFontHeading: (font: FontFamily) => void;
  setFontBody: (font: FontFamily) => void;

  // Border radius / width
  setBorderRadius: (radius: string) => void;
  setBorderWidth: (width: string) => void;

  // Modal state for export/import popups
  modal: ModalKind;
  openModal: (kind: ModalKind) => void;
  closeModal: () => void;

  // Export helpers
  getExportPayload: () => ExportPayload;
  importFromPayload: (payload: ExportPayload) => boolean;

  // Reset
  resetAll: () => void;
}

const DesignContext = createContext<DesignContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function DesignProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DesignState>(() =>
    getDefaultState("dark"),
  );
  const [modal, setModal] = useState<ModalKind>(null);

  // ── Theme mode toggle ────────────────────────────────────────────────────

  const toggleThemeMode = useCallback(() => {
    setState((prev) => {
      const newMode: ThemeMode = prev.themeMode === "dark" ? "light" : "dark";
      const newColors = getPresetColors(prev.activeDesign, newMode);
      return {
        ...prev,
        themeMode: newMode,
        colors: newColors,
      };
    });
  }, []);

  // ── Design switching ─────────────────────────────────────────────────────

  const setDesign = useCallback((style: DesignStyle) => {
    setState((prev) => {
      const preset = designPresets[style];
      return {
        activeDesign: style,
        themeMode: prev.themeMode,
        colors: { ...preset.colors[prev.themeMode] },
        fontHeading: preset.fontHeading,
        fontBody: preset.fontBody,
        borderRadius: preset.borderRadius,
        borderWidth: preset.borderWidth,
      };
    });
  }, []);

  // ── Color overrides ──────────────────────────────────────────────────────

  const setColor = useCallback((token: keyof ColorTokens, value: string) => {
    setState((prev) => ({
      ...prev,
      colors: { ...prev.colors, [token]: value },
    }));
  }, []);

  const setColors = useCallback((colors: Partial<ColorTokens>) => {
    setState((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }));
  }, []);

  const resetColors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      colors: getPresetColors(prev.activeDesign, prev.themeMode),
    }));
  }, []);

  // ── Font controls ────────────────────────────────────────────────────────

  const setFontHeading = useCallback((font: FontFamily) => {
    setState((prev) => ({ ...prev, fontHeading: font }));
  }, []);

  const setFontBody = useCallback((font: FontFamily) => {
    setState((prev) => ({ ...prev, fontBody: font }));
  }, []);

  // ── Shape controls ───────────────────────────────────────────────────────

  const setBorderRadius = useCallback((radius: string) => {
    setState((prev) => ({ ...prev, borderRadius: radius }));
  }, []);

  const setBorderWidth = useCallback((width: string) => {
    setState((prev) => ({ ...prev, borderWidth: width }));
  }, []);

  // ── Modal ────────────────────────────────────────────────────────────────

  const openModal = useCallback((kind: ModalKind) => setModal(kind), []);
  const closeModal = useCallback(() => setModal(null), []);

  // ── Export / Import ──────────────────────────────────────────────────────

  const getExportPayload = useCallback((): ExportPayload => {
    return stateToExportPayload(state);
  }, [state]);

  const importFromPayload = useCallback((payload: ExportPayload): boolean => {
    const newState = importPayloadToState(payload);
    if (!newState) return false;
    setState(newState);
    setModal(null);
    return true;
  }, []);

  // ── Reset ────────────────────────────────────────────────────────────────

  const resetAll = useCallback(() => {
    setState((prev) => getDefaultState(prev.themeMode));
    setModal(null);
  }, []);

  // ── CSS variables (memoised) ─────────────────────────────────────────────

  const cssVariables = useMemo(() => generateCSSVariables(state), [state]);

  // ── Dynamic Google Fonts loader ──────────────────────────────────────────

  useEffect(() => {
    const fontsNeeded = new Set<string>();
    fontsNeeded.add(state.fontHeading);
    fontsNeeded.add(state.fontBody);
    // Also preload every font so the picker can show previews
    fontOptions.forEach((f) => fontsNeeded.add(f.name));

    const families = Array.from(fontsNeeded)
      .map((name) => {
        const def = fontOptions.find((f) => f.name === name);
        return def
          ? def.googleFont
          : `${name.replace(/ /g, "+")}:wght@400;500;600;700`;
      })
      .join("&family=");

    const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;

    const existing = document.querySelector(
      "link[data-dt-fonts]",
    ) as HTMLLinkElement | null;
    if (existing && existing.href === href) return;
    if (existing) existing.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-dt-fonts", "true");
    document.head.appendChild(link);
  }, [state.fontHeading, state.fontBody]);

  // ── Provide ──────────────────────────────────────────────────────────────

  const value = useMemo<DesignContextValue>(
    () => ({
      state,
      cssVariables,
      toggleThemeMode,
      setDesign,
      setColor,
      setColors,
      resetColors,
      setFontHeading,
      setFontBody,
      setBorderRadius,
      setBorderWidth,
      modal,
      openModal,
      closeModal,
      getExportPayload,
      importFromPayload,
      resetAll,
    }),
    [
      state,
      cssVariables,
      toggleThemeMode,
      setDesign,
      setColor,
      setColors,
      resetColors,
      setFontHeading,
      setFontBody,
      setBorderRadius,
      setBorderWidth,
      modal,
      openModal,
      closeModal,
      getExportPayload,
      importFromPayload,
      resetAll,
    ],
  );

  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useDesign(): DesignContextValue {
  const ctx = useContext(DesignContext);
  if (!ctx) {
    throw new Error("useDesign must be used within a <DesignProvider>");
  }
  return ctx;
}
