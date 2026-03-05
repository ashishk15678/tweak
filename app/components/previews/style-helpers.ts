"use client";

import type { CSSProperties } from "react";
import type { DesignStyle } from "../../lib/design-store";

// ── HELPERS ──────────────────────────────────────────────────────────────────

export function hexToRgba(hex: string, alpha: number): string {
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) return hex;
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── STYLE GENERATORS ─────────────────────────────────────────────────────────

export function getCardStyle(
  design: DesignStyle,
  colors: Record<string, string>,
  radius: string,
  borderW: string,
  shadow: string,
): CSSProperties {
  const base: CSSProperties = {
    backgroundColor: colors.surface,
    borderRadius: radius,
    padding: "20px",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  };

  if (design === "neobrutalism") {
    base.border = `${borderW} solid ${colors.border}`;
    base.boxShadow = `${shadow} ${colors.shadow}`;
  } else if (design === "clayomorphism") {
    base.boxShadow = shadow;
    base.border = "none";
  } else if (design === "glassmorphism") {
    base.backgroundColor = colors.surface;
    base.backdropFilter = "blur(20px)";
    base.WebkitBackdropFilter = "blur(20px)";
    base.border = `1px solid ${colors.border}`;
    base.boxShadow = shadow;
  } else if (design === "neumorphism") {
    base.boxShadow = shadow;
    base.border = "none";
  } else if (design === "retro") {
    base.border = `${borderW} solid ${colors.border}`;
    base.boxShadow = `${shadow}`;
  } else if (design === "minimalist") {
    base.border = `${borderW} solid ${colors.border}`;
    base.boxShadow = shadow;
  } else if (design === "cyberpunk") {
    base.border = `${borderW} solid ${colors.border}`;
    base.boxShadow = shadow;
    base.clipPath =
      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))";
  } else if (design === "aurora") {
    base.border = `1px solid ${colors.border}`;
    base.boxShadow = shadow;
    base.background = `linear-gradient(145deg, ${colors.surface}, ${hexToRgba(colors.primary, 0.05)})`;
  }

  return base;
}

export function getButtonStyle(
  variant: "primary" | "secondary" | "outline" | "ghost" | "destructive",
  design: DesignStyle,
  colors: Record<string, string>,
  radius: string,
  borderW: string,
  shadow: string,
): CSSProperties {
  const base: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: "13px",
    padding: "8px 16px",
    borderRadius: radius,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    lineHeight: "1.2",
    border: "none",
    outline: "none",
    position: "relative",
    whiteSpace: "nowrap",
  };

  if (design === "neobrutalism") {
    base.border = `${borderW} solid ${colors.border}`;
    base.boxShadow = `${shadow} ${colors.shadow}`;
    base.fontWeight = 700;
    base.textTransform = "uppercase";
    base.letterSpacing = "0.5px";
  } else if (design === "clayomorphism") {
    base.boxShadow = shadow;
    base.border = "none";
  } else if (design === "glassmorphism") {
    base.backdropFilter = "blur(20px)";
    base.WebkitBackdropFilter = "blur(20px)";
    base.border = `1px solid ${colors.border}`;
  } else if (design === "neumorphism") {
    base.boxShadow = shadow;
    base.border = "none";
  } else if (design === "retro") {
    base.border = `${borderW} solid ${colors.border}`;
    base.boxShadow = `${shadow}`;
    base.fontFamily = "var(--font-heading)";
    base.textTransform = "uppercase";
    base.letterSpacing = "1px";
    base.fontSize = "12px";
  } else if (design === "minimalist") {
    base.border = `${borderW} solid transparent`;
    base.boxShadow = shadow;
    base.fontWeight = 500;
  } else if (design === "cyberpunk") {
    base.border = `${borderW} solid ${colors.border}`;
    base.fontFamily = "var(--font-heading)";
    base.textTransform = "uppercase";
    base.letterSpacing = "2px";
    base.fontSize = "11px";
  } else if (design === "aurora") {
    base.border = `1px solid ${colors.border}`;
    base.boxShadow = shadow;
  }

  switch (variant) {
    case "primary":
      base.backgroundColor = colors.primary;
      base.color = "#ffffff";
      if (design === "glassmorphism") {
        base.backgroundColor = hexToRgba(colors.primary, 0.4);
        base.borderColor = hexToRgba(colors.primary, 0.5);
      }
      if (design === "cyberpunk") {
        base.boxShadow = `0 0 15px ${hexToRgba(colors.primary, 0.4)}, inset 0 0 15px ${hexToRgba(colors.primary, 0.1)}`;
        base.color = colors.text;
        base.backgroundColor = hexToRgba(colors.primary, 0.2);
        base.borderColor = colors.primary;
      }
      if (design === "aurora") {
        base.background = `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`;
        base.border = "none";
      }
      break;
    case "secondary":
      base.backgroundColor = colors.secondary;
      base.color = "#ffffff";
      if (design === "neobrutalism") {
        base.backgroundColor = colors.accent;
        base.color = colors.text;
      }
      if (design === "glassmorphism") {
        base.backgroundColor = hexToRgba(colors.secondary, 0.2);
        base.borderColor = hexToRgba(colors.secondary, 0.3);
      }
      break;
    case "outline":
      base.backgroundColor = "transparent";
      base.color = colors.primary;
      base.border = `${borderW || "1px"} solid ${colors.primary}`;
      if (design === "neumorphism") {
        base.boxShadow =
          "inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff";
        base.color = colors.text;
      }
      break;
    case "ghost":
      base.backgroundColor = "transparent";
      base.color = colors.textSecondary;
      base.border = "none";
      base.boxShadow = "none";
      break;
    case "destructive":
      base.backgroundColor = colors.destructive;
      base.color = "#ffffff";
      if (design === "neobrutalism") {
        base.border = `${borderW} solid ${colors.border}`;
      }
      break;
  }

  return base;
}

export function getInputStyle(
  design: DesignStyle,
  colors: Record<string, string>,
  radius: string,
  borderW: string,
): CSSProperties {
  const base: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    padding: "8px 12px",
    borderRadius: radius,
    width: "100%",
    outline: "none",
    transition: "all 0.2s ease",
    color: colors.text,
    backgroundColor: colors.surface,
  };

  if (design === "neobrutalism") {
    base.border = `${borderW} solid ${colors.border}`;
    base.boxShadow = `3px 3px 0px 0px ${colors.shadow}`;
    base.backgroundColor = colors.background;
  } else if (design === "clayomorphism") {
    base.border = "none";
    base.boxShadow =
      "inset 0 2px 6px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)";
    base.backgroundColor = colors.muted;
  } else if (design === "glassmorphism") {
    base.backgroundColor = "rgba(255,255,255,0.06)";
    base.border = `1px solid ${colors.border}`;
    base.backdropFilter = "blur(10px)";
  } else if (design === "neumorphism") {
    base.border = "none";
    base.boxShadow = "inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff";
  } else if (design === "retro") {
    base.border = `${borderW} solid ${colors.border}`;
    base.fontFamily = "var(--font-heading)";
    base.fontSize = "12px";
  } else if (design === "minimalist") {
    base.border = `${borderW} solid ${colors.border}`;
  } else if (design === "cyberpunk") {
    base.border = `1px solid ${colors.border}`;
    base.fontFamily = "var(--font-heading)";
    base.letterSpacing = "0.5px";
    base.fontSize = "12px";
  } else if (design === "aurora") {
    base.border = `1px solid ${colors.border}`;
    base.backgroundColor = colors.muted;
  }

  return base;
}

export function getBadgeStyle(
  variant: "default" | "success" | "warning" | "destructive" | "outline",
  design: DesignStyle,
  colors: Record<string, string>,
): CSSProperties {
  const base: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: design === "retro" ? "0px" : "999px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    lineHeight: "1.4",
    whiteSpace: "nowrap",
  };

  if (design === "neobrutalism") {
    base.border = `2px solid ${colors.border}`;
    base.fontWeight = 700;
    base.textTransform = "uppercase";
    base.letterSpacing = "0.5px";
    base.fontSize = "10px";
  } else if (design === "retro") {
    base.border = `2px solid ${colors.border}`;
    base.fontFamily = "var(--font-heading)";
    base.textTransform = "uppercase";
    base.letterSpacing = "1px";
    base.fontSize = "10px";
  } else if (design === "cyberpunk") {
    base.border = `1px solid`;
    base.fontFamily = "var(--font-heading)";
    base.textTransform = "uppercase";
    base.letterSpacing = "1.5px";
    base.fontSize = "9px";
    base.borderRadius = "2px";
  }

  switch (variant) {
    case "default":
      base.backgroundColor = colors.primary;
      base.color = "#ffffff";
      if (design === "cyberpunk") {
        base.backgroundColor = hexToRgba(colors.primary, 0.2);
        base.borderColor = colors.primary;
        base.color = colors.primary;
      }
      if (design === "glassmorphism") {
        base.backgroundColor = hexToRgba(colors.primary, 0.25);
        base.border = `1px solid ${hexToRgba(colors.primary, 0.3)}`;
        base.backdropFilter = "blur(10px)";
      }
      break;
    case "success":
      base.backgroundColor = colors.success;
      base.color = "#ffffff";
      if (design === "cyberpunk") {
        base.backgroundColor = hexToRgba(colors.success, 0.15);
        base.borderColor = colors.success;
        base.color = colors.success;
      }
      break;
    case "warning":
      base.backgroundColor = colors.warning;
      base.color = "#18181b";
      if (design === "cyberpunk") {
        base.backgroundColor = hexToRgba(colors.warning, 0.15);
        base.borderColor = colors.warning;
        base.color = colors.warning;
      }
      break;
    case "destructive":
      base.backgroundColor = colors.destructive;
      base.color = "#ffffff";
      if (design === "cyberpunk") {
        base.backgroundColor = hexToRgba(colors.destructive, 0.15);
        base.borderColor = colors.destructive;
        base.color = colors.destructive;
      }
      break;
    case "outline":
      base.backgroundColor = "transparent";
      base.color = colors.text;
      base.border = `1.5px solid ${colors.border}`;
      break;
  }

  return base;
}

// ── MINI SPARKLINE (SVG) ─────────────────────────────────────────────────────

export interface SparklineProps {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}

// ── MINI BAR CHART ───────────────────────────────────────────────────────────

export interface MiniBarChartProps {
  data: { label: string; value: number; prev: number }[];
  color: string;
  secondaryColor: string;
  height?: number;
  barRadius: string;
}

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────

export interface ProgressBarProps {
  value: number;
  color: string;
  bgColor: string;
  radius: string;
  design: DesignStyle;
  borderColor: string;
}

// ── TOGGLE SWITCH ────────────────────────────────────────────────────────────

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  design: DesignStyle;
  colors: Record<string, string>;
}
