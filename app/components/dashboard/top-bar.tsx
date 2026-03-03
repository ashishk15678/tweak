"use client";

import React, { type CSSProperties } from "react";
import { useDesign } from "../../lib/design-context";
import { designPresets } from "../../lib/design-store";
import {
  Sun,
  Moon,
  RotateCcw,
  Download,
  Upload,
  SwatchBook,
  Type,
  Layers,
} from "lucide-react";
import { useChromeColors, useIsMobile } from "./hooks";

export function TopBar({
  onToggleColors,
  onToggleFonts,
  colorsOpen,
  fontsOpen,
}: {
  onToggleColors: () => void;
  onToggleFonts: () => void;
  colorsOpen: boolean;
  fontsOpen: boolean;
}) {
  const { state, toggleThemeMode, resetAll, openModal } = useDesign();
  const c = useChromeColors();
  const isMobile = useIsMobile();
  const preset = designPresets[state.activeDesign];

  const btnBase: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: isMobile ? "8px 10px" : "7px 14px",
    borderRadius: "9px",
    border: `1px solid ${c.panelBorder}`,
    backgroundColor: c.panelBg,
    color: c.textSecondary,
    fontSize: isMobile ? "11px" : "12px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 12px" : "0 24px",
        height: isMobile ? "52px" : "56px",
        backgroundColor: c.pageBg,
        borderBottom: `1px solid ${c.panelBorder}`,
        fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
        backdropFilter: "blur(12px)",
        gap: "8px",
      }}
    >
      {/* Left: Logo + mobile toggles */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "6px" : "10px",
          minWidth: 0,
          flex: isMobile ? 1 : "unset",
        }}
      >
        {/* Mobile panel toggles */}
        {isMobile && (
          <>
            <button
              onClick={onToggleColors}
              style={{
                ...btnBase,
                padding: "8px",
                backgroundColor: colorsOpen ? c.activeBg : c.panelBg,
                borderColor: colorsOpen ? c.activeBorder : c.panelBorder,
                color: colorsOpen ? c.accentText : c.textSecondary,
              }}
              title="Colors"
            >
              <SwatchBook size={16} />
            </button>
            <button
              onClick={onToggleFonts}
              style={{
                ...btnBase,
                padding: "8px",
                backgroundColor: fontsOpen ? c.activeBg : c.panelBg,
                borderColor: fontsOpen ? c.activeBorder : c.panelBorder,
                color: fontsOpen ? c.accentText : c.textSecondary,
              }}
              title="Fonts"
            >
              <Type size={16} />
            </button>
          </>
        )}
        <Layers
          size={isMobile ? 16 : 18}
          style={{ color: c.accent, flexShrink: 0 }}
        />
        {!isMobile && (
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: c.textPrimary,
              letterSpacing: "-0.3px",
            }}
          >
            DesignTweak
          </span>
        )}
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: 600,
            color: c.accentText,
            backgroundColor: c.activeBg,
            border: `1px solid ${c.activeBorder}`,
            letterSpacing: "0.3px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: isMobile ? "100px" : "none",
          }}
        >
          {preset.name}
        </span>
      </div>

      {/* Right: controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "4px" : "8px",
          flexShrink: 0,
        }}
      >
        {/* Dark / Light toggle */}
        <button
          onClick={toggleThemeMode}
          style={{
            ...btnBase,
            padding: isMobile ? "8px" : "7px 14px",
          }}
          title={`Switch to ${state.themeMode === "dark" ? "light" : "dark"} mode`}
        >
          {state.themeMode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          {!isMobile && (state.themeMode === "dark" ? "Light" : "Dark")}
        </button>

        {/* Import */}
        <button
          onClick={() => openModal("import")}
          style={{
            ...btnBase,
            padding: isMobile ? "8px" : "7px 14px",
          }}
          title="Import theme"
        >
          <Upload size={14} />
          {!isMobile && "Import"}
        </button>

        {/* Export */}
        <button
          onClick={() => openModal("export")}
          style={{
            ...btnBase,
            backgroundColor: c.accent,
            borderColor: c.accent,
            color: "#fff",
            padding: isMobile ? "8px 10px" : "7px 14px",
          }}
          title="Export theme"
        >
          <Download size={14} />
          {!isMobile && "Export"}
        </button>

        {/* Reset */}
        <button
          onClick={resetAll}
          style={{
            ...btnBase,
            borderColor: "transparent",
            padding: isMobile ? "8px" : "7px 10px",
          }}
          title="Reset All"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </header>
  );
}
