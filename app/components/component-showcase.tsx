"use client";

import React, { useState, useRef, useEffect, type CSSProperties } from "react";
import { useDesign } from "../lib/design-context";
import {
  designPresets,
  type DesignStyle,
  generateComponentCSS,
  generateTailwindV4ComponentCode,
} from "../lib/design-store";
import {
  Copy,
  Check,
  ChevronDown,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  Plus,
  Star,
  Settings,
  Mail,
  Upload,
  Trash2,
  Edit,
  MoreHorizontal,
  Bell,
  ChevronsUpDown,
  RectangleHorizontal,
  CreditCard,
  TextCursorInput,
  FileText,
  ListFilter,
  Tag,
  ToggleLeft,
  CheckSquare,
  Circle,
  PanelTop,
  ChevronsDown,
  MessageSquare,
  UserCircle,
  MessageCircle,
  BarChart3,
  Table2,
  Minus,
  Loader,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function hexToRgba(hex: string, alpha: number): string {
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) return hex;
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLE GENERATORS (matching component-previews.tsx patterns)
// ═══════════════════════════════════════════════════════════════════════════

function getCardStyle(
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
    base.boxShadow = shadow;
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

function getButtonStyle(
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
    base.boxShadow = shadow;
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
      base.color = "#FFFFFF";
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
      base.color = "#FFFFFF";
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
          "inset 4px 4px 8px #B8B8C8, inset -4px -4px 8px #FFFFFF";
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
      base.color = "#FFFFFF";
      if (design === "neobrutalism") {
        base.border = `${borderW} solid ${colors.border}`;
      }
      break;
  }
  return base;
}

function getInputStyle(
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
    base.boxShadow = "inset 4px 4px 8px #B8B8C8, inset -4px -4px 8px #FFFFFF";
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

function getBadgeStyle(
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
      base.color = "#FFFFFF";
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
      base.color = "#FFFFFF";
      if (design === "cyberpunk") {
        base.backgroundColor = hexToRgba(colors.success, 0.15);
        base.borderColor = colors.success;
        base.color = colors.success;
      }
      break;
    case "warning":
      base.backgroundColor = colors.warning;
      base.color = "#1A1A2E";
      if (design === "cyberpunk") {
        base.backgroundColor = hexToRgba(colors.warning, 0.15);
        base.borderColor = colors.warning;
        base.color = colors.warning;
      }
      break;
    case "destructive":
      base.backgroundColor = colors.destructive;
      base.color = "#FFFFFF";
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

// ═══════════════════════════════════════════════════════════════════════════
// CODE GENERATION — React & Svelte for each component
// ═══════════════════════════════════════════════════════════════════════════

function generateReactCode(
  componentName: string,
  state: {
    activeDesign: DesignStyle;
    colors: Record<string, string>;
    borderRadius: string;
    borderWidth: string;
    themeMode: string;
    fontHeading: string;
    fontBody: string;
  },
): string {
  const c = state.colors;
  const preset = designPresets[state.activeDesign];
  const shadow = preset.shadowStyle[state.themeMode as "light" | "dark"];
  const design = state.activeDesign;
  const r = state.borderRadius;
  const bw = state.borderWidth;
  const fontH = `"${state.fontHeading}", system-ui, sans-serif`;
  const fontB = `"${state.fontBody}", system-ui, sans-serif`;

  switch (componentName) {
    case "Button":
      return `import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    fontFamily: '${fontB}',
    fontWeight: 600,
    fontSize: size === "sm" ? "12px" : size === "lg" ? "16px" : "14px",
    padding: size === "sm" ? "6px 14px" : size === "lg" ? "14px 28px" : size === "icon" ? "10px" : "10px 20px",
    borderRadius: "${r}",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    lineHeight: "1.2",
    border: "none",
    outline: "none",
    whiteSpace: "nowrap",${
      design === "neobrutalism"
        ? `
    border: "${bw} solid ${c.border}",
    boxShadow: "${shadow} ${c.shadow}",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",`
        : ""
    }${
      design === "glassmorphism"
        ? `
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid ${c.border}",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    fontFamily: '${fontH}',
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "12px",
    border: "${bw} solid ${c.border}",`
        : ""
    }${
      design === "neumorphism"
        ? `
    boxShadow: "${shadow}",
    border: "none",`
        : ""
    }${
      design === "aurora"
        ? `
    border: "1px solid ${c.border}",
    boxShadow: "${shadow}",`
        : ""
    }
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: "${c.primary}", color: "#FFFFFF"${design === "aurora" ? `, background: "linear-gradient(135deg, ${c.primary}, ${c.accent})", border: "none"` : ""} },
    secondary: { backgroundColor: "${c.secondary}", color: "#FFFFFF" },
    outline: { backgroundColor: "transparent", color: "${c.primary}", border: "${bw || "1px"} solid ${c.primary}" },
    ghost: { backgroundColor: "transparent", color: "${c.textSecondary}", border: "none", boxShadow: "none" },
    destructive: { backgroundColor: "${c.destructive}", color: "#FFFFFF" },
  };

  return (
    <button style={{ ...baseStyle, ...variants[variant] }} {...props}>
      {children}
    </button>
  );
}`;

    case "Card":
      return `import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, style }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: "${c.surface}",
        borderRadius: "${r}",
        padding: "24px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",${
          design === "neobrutalism"
            ? `
        border: "${bw} solid ${c.border}",
        boxShadow: "${shadow} ${c.shadow}",`
            : ""
        }${
          design === "glassmorphism"
            ? `
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid ${c.border}",
        boxShadow: "${shadow}",`
            : ""
        }${
          design === "neumorphism"
            ? `
        boxShadow: "${shadow}",
        border: "none",`
            : ""
        }${
          design === "cyberpunk"
            ? `
        border: "${bw} solid ${c.border}",
        boxShadow: "${shadow}",
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",`
            : ""
        }${
          design === "aurora"
            ? `
        border: "1px solid ${c.border}",
        boxShadow: "${shadow}",
        background: "linear-gradient(145deg, ${c.surface}, ${hexToRgba(c.primary, 0.05)})",`
            : ""
        }${
          design === "minimalist" || design === "retro"
            ? `
        border: "${bw} solid ${c.border}",
        boxShadow: "${shadow}",`
            : ""
        }${
          design === "clayomorphism"
            ? `
        boxShadow: "${shadow}",
        border: "none",`
            : ""
        }
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: '${fontH}', fontSize: "18px", fontWeight: 700, color: "${c.text}", lineHeight: 1.3 }}>
      {children}
    </h3>
  );
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: '${fontB}', fontSize: "14px", color: "${c.textSecondary}", lineHeight: 1.5 }}>
      {children}
    </p>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid ${c.border}" }}>
      {children}
    </div>
  );
}`;

    case "Input":
      return `import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, style, ...props }: InputProps) {
  const inputStyle: React.CSSProperties = {
    fontFamily: '${fontB}',
    fontSize: "14px",
    padding: "10px 14px",
    borderRadius: "${r}",
    width: "100%",
    outline: "none",
    transition: "all 0.2s ease",
    color: "${c.text}",
    backgroundColor: "${c.surface}",${
      design === "neobrutalism"
        ? `
    border: "${bw} solid ${c.border}",
    boxShadow: "3px 3px 0px 0px ${c.shadow}",
    backgroundColor: "${c.background}",`
        : ""
    }${
      design === "glassmorphism"
        ? `
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid ${c.border}",
    backdropFilter: "blur(10px)",`
        : ""
    }${
      design === "neumorphism"
        ? `
    border: "none",
    boxShadow: "inset 4px 4px 8px ${c.shadow}, inset -4px -4px 8px #FFFFFF",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    border: "1px solid ${c.border}",
    fontFamily: '${fontH}',
    letterSpacing: "0.5px",`
        : ""
    }${
      design === "minimalist" || design === "retro"
        ? `
    border: "${bw} solid ${c.border}",`
        : ""
    }${
      design === "clayomorphism"
        ? `
    border: "none",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
    backgroundColor: "${c.muted}",`
        : ""
    }${
      design === "aurora"
        ? `
    border: "1px solid ${c.border}",
    backgroundColor: "${c.muted}",`
        : ""
    }
    ...style,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label style={{ fontFamily: '${fontB}', fontSize: "14px", fontWeight: 500, color: "${c.text}" }}>
          {label}
        </label>
      )}
      <input style={inputStyle} {...props} />
    </div>
  );
}`;

    case "Textarea":
      return `import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, style, ...props }: TextareaProps) {
  const textareaStyle: React.CSSProperties = {
    fontFamily: '${fontB}',
    fontSize: "14px",
    padding: "10px 14px",
    borderRadius: "${r}",
    width: "100%",
    minHeight: "80px",
    outline: "none",
    transition: "all 0.2s ease",
    color: "${c.text}",
    backgroundColor: "${c.surface}",
    resize: "vertical",${
      design === "neobrutalism"
        ? `
    border: "${bw} solid ${c.border}",
    boxShadow: "3px 3px 0px 0px ${c.shadow}",`
        : ""
    }${
      design === "glassmorphism"
        ? `
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid ${c.border}",
    backdropFilter: "blur(10px)",`
        : ""
    }${
      design === "neumorphism"
        ? `
    border: "none",
    boxShadow: "inset 4px 4px 8px ${c.shadow}, inset -4px -4px 8px #FFFFFF",`
        : ""
    }${
      design === "minimalist" || design === "retro" || design === "cyberpunk"
        ? `
    border: "${bw} solid ${c.border}",`
        : ""
    }${
      design === "clayomorphism"
        ? `
    border: "none",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.08)",
    backgroundColor: "${c.muted}",`
        : ""
    }${
      design === "aurora"
        ? `
    border: "1px solid ${c.border}",
    backgroundColor: "${c.muted}",`
        : ""
    }
    ...style,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label style={{ fontFamily: '${fontB}', fontSize: "14px", fontWeight: 500, color: "${c.text}" }}>
          {label}
        </label>
      )}
      <textarea style={textareaStyle} {...props} />
    </div>
  );
}`;

    case "Badge":
      return `import React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
  children: React.ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  const base: React.CSSProperties = {
    fontFamily: '${fontB}',
    fontSize: "12px",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: "${design === "retro" ? "0px" : "999px"}",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    lineHeight: "1.4",
    whiteSpace: "nowrap",${
      design === "neobrutalism"
        ? `
    border: "2px solid ${c.border}",
    boxShadow: "2px 2px 0px 0px ${c.shadow}",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    border: "1px solid",
    fontFamily: '${fontH}',
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontSize: "10px",
    borderRadius: "2px",`
        : ""
    }
  };

  const variants: Record<string, React.CSSProperties> = {
    default: { backgroundColor: "${c.primary}", color: "#FFFFFF" },
    success: { backgroundColor: "${c.success}", color: "#FFFFFF" },
    warning: { backgroundColor: "${c.warning}", color: "#1A1A2E" },
    destructive: { backgroundColor: "${c.destructive}", color: "#FFFFFF" },
    outline: { backgroundColor: "transparent", color: "${c.text}", border: "1.5px solid ${c.border}" },
  };

  return <span style={{ ...base, ...variants[variant] }}>{children}</span>;
}`;

    case "Toggle":
      return `import React, { useState } from "react";

interface ToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export function Toggle({ defaultChecked = false, onChange, label, description }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  const trackStyle: React.CSSProperties = {
    width: "44px",
    height: "24px",
    borderRadius: "${design === "retro" ? "4px" : "12px"}",
    backgroundColor: checked ? "${c.primary}" : "${c.muted}",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.3s ease",
    flexShrink: 0,${
      design === "neobrutalism"
        ? `
    border: "2px solid ${c.border}",`
        : ""
    }${
      design === "neumorphism"
        ? `
    boxShadow: checked
      ? "inset 2px 2px 4px ${hexToRgba(c.shadow, 0.5)}"
      : "inset 4px 4px 8px #B8B8C8, inset -4px -4px 8px #FFFFFF",`
        : ""
    }${
      design === "cyberpunk" &&
      `
    border: "1px solid " + (checked ? "${c.primary}" : "${c.border}"),
    backgroundColor: checked ? "${hexToRgba(c.primary, 0.2)}" : "${c.surface}",
    boxShadow: checked ? "0 0 10px ${hexToRgba(c.primary, 0.3)}" : "none",`
    }
  };

  const thumbStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    borderRadius: "${design === "retro" ? "2px" : "50%"}",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: "3px",
    left: checked ? "23px" : "3px",
    transition: "all 0.3s ease",${
      design === "neobrutalism"
        ? `
    border: "2px solid ${c.border}",
    backgroundColor: checked ? "${c.accent}" : "#FFFFFF",`
        : ""
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={trackStyle} onClick={handleToggle} role="switch" aria-checked={checked}>
        <div style={thumbStyle} />
      </div>
      {(label || description) && (
        <div>
          {label && <div style={{ fontFamily: '${fontB}', fontSize: "14px", fontWeight: 500, color: "${c.text}" }}>{label}</div>}
          {description && <div style={{ fontFamily: '${fontB}', fontSize: "12px", color: "${c.textSecondary}", marginTop: "2px" }}>{description}</div>}
        </div>
      )}
    </div>
  );
}`;

    case "Alert":
      return `import React from "react";

interface AlertProps {
  variant?: "info" | "success" | "warning" | "destructive";
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Alert({ variant = "info", title, description }: AlertProps) {
  const colorMap: Record<string, string> = {
    info: "${c.primary}",
    success: "${c.success}",
    warning: "${c.warning}",
    destructive: "${c.destructive}",
  };
  const color = colorMap[variant];

  const baseStyle: React.CSSProperties = {
    padding: "16px",
    borderRadius: "${r}",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    fontFamily: '${fontB}',
    transition: "all 0.2s ease",
    backgroundColor: color + "14",
    borderColor: color + "4D",${
      design === "neobrutalism"
        ? `
    border: "${bw} solid ${c.border}",
    boxShadow: "4px 4px 0px 0px ${c.shadow}",`
        : ""
    }${
      design === "glassmorphism"
        ? `
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid ${c.border}",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    border: "1px solid " + color,
    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",`
        : `
    border: "1px solid " + color + "4D",`
    }
  };

  return (
    <div style={baseStyle}>
      <div style={{ flexShrink: 0, marginTop: "2px", color }}>⬤</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: "14px", color: "${c.text}", marginBottom: "4px", fontFamily: '${fontH}' }}>{title}</div>
        {description && <div style={{ fontSize: "13px", color: "${c.textSecondary}", lineHeight: 1.5 }}>{description}</div>}
      </div>
    </div>
  );
}`;

    case "Avatar":
      return `import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, alt, fallback = "?", size = "md" }: AvatarProps) {
  const sizes = { sm: "32px", md: "40px", lg: "48px" };
  const fontSizes = { sm: "12px", md: "14px", lg: "18px" };

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "${design === "neobrutalism" ? "8px" : design === "retro" ? "0px" : design === "cyberpunk" ? "4px" : "50%"}",
    fontFamily: '${fontB}',
    fontWeight: 600,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: "${c.primary}",
    color: "#FFFFFF",
    width: sizes[size],
    height: sizes[size],
    fontSize: fontSizes[size],${
      design === "neobrutalism"
        ? `
    border: "2px solid ${c.border}",
    boxShadow: "2px 2px 0px 0px ${c.shadow}",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    border: "1px solid ${c.primary}",
    boxShadow: "0 0 8px ${hexToRgba(c.primary, 0.3)}",`
        : ""
    }${
      design === "neumorphism"
        ? `
    boxShadow: "4px 4px 8px ${c.shadow}, -4px -4px 8px #FFFFFF",`
        : ""
    }
  };

  return (
    <div style={style}>
      {src ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : fallback}
    </div>
  );
}`;

    case "Tooltip":
      return `import React, { useState, useRef } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "8px 14px",
    borderRadius: "${r}",
    fontSize: "13px",
    fontFamily: '${fontB}',
    fontWeight: 500,
    whiteSpace: "nowrap",
    zIndex: 50,
    color: "#FFFFFF",
    backgroundColor: "${c.text}",
    opacity: visible ? 1 : 0,
    pointerEvents: "none",
    transition: "opacity 0.15s ease",${
      design === "neobrutalism"
        ? `
    border: "2px solid ${c.border}",
    boxShadow: "3px 3px 0px 0px ${c.shadow}",
    backgroundColor: "${c.primary}",
    fontWeight: 700,`
        : ""
    }${
      design === "glassmorphism"
        ? `
    backgroundColor: "${hexToRgba(c.surface, 0.8)}",
    backdropFilter: "blur(16px)",
    border: "1px solid ${c.border}",
    color: "${c.text}",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    backgroundColor: "${c.surface}",
    border: "1px solid ${c.primary}",
    color: "${c.primary}",
    boxShadow: "0 0 10px ${hexToRgba(c.primary, 0.3)}",
    fontFamily: '${fontH}',
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "11px",`
        : ""
    }${
      design === "aurora"
        ? `
    background: "linear-gradient(135deg, ${c.primary}, ${c.accent})",
    border: "none",`
        : ""
    }
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div style={tooltipStyle}>{content}</div>
      {children}
    </div>
  );
}`;

    case "Select":
      return `import React, { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function Select({ options, value, onChange, placeholder = "Select...", label }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const triggerStyle: React.CSSProperties = {
    fontFamily: '${fontB}',
    fontSize: "14px",
    padding: "10px 14px",
    borderRadius: "${r}",
    width: "100%",
    outline: "none",
    transition: "all 0.2s ease",
    color: selected ? "${c.text}" : "${c.textSecondary}",
    backgroundColor: "${c.surface}",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",${
      design === "neobrutalism"
        ? `
    border: "${bw} solid ${c.border}",
    boxShadow: "3px 3px 0px 0px ${c.shadow}",`
        : `
    border: "${bw || "1px"} solid ${c.border}",`
    }
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    backgroundColor: "${c.surface}",
    border: "1px solid ${c.border}",
    borderRadius: "${r}",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    zIndex: 50,
    overflow: "hidden",
    display: open ? "block" : "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <label style={{ fontFamily: '${fontB}', fontSize: "14px", fontWeight: 500, color: "${c.text}" }}>{label}</label>}
      <div ref={ref} style={{ position: "relative" }}>
        <div style={triggerStyle} onClick={() => setOpen(!open)}>
          <span>{selected ? selected.label : placeholder}</span>
          <span style={{ fontSize: "10px" }}>▼</span>
        </div>
        <div style={dropdownStyle}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange?.(opt.value); setOpen(false); }}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                color: opt.value === value ? "${c.primary}" : "${c.text}",
                backgroundColor: opt.value === value ? "${hexToRgba(c.primary, 0.08)}" : "transparent",
                fontSize: "14px",
                fontFamily: '${fontB}',
                transition: "background-color 0.15s ease",
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

    case "Checkbox":
      return `import React, { useState } from "react";

interface CheckboxProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export function Checkbox({ defaultChecked = false, onChange, label, description }: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  const boxStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    borderRadius: "${parseInt(r) > 8 ? "4px" : Math.min(parseInt(r), 4) + "px"}",
    border: checked ? "none" : "2px solid ${c.border}",
    backgroundColor: checked ? "${c.primary}" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s ease",
    flexShrink: 0,${
      design === "neobrutalism"
        ? `
    border: "2px solid ${c.border}",
    boxShadow: checked ? "none" : "2px 2px 0px 0px ${c.shadow}",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    borderRadius: "2px",
    boxShadow: checked ? "0 0 8px ${hexToRgba(c.primary, 0.4)}" : "none",`
        : ""
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }} onClick={handleToggle}>
      <div style={boxStyle}>
        {checked && <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700, lineHeight: 1 }}>✓</span>}
      </div>
      {(label || description) && (
        <div>
          {label && <div style={{ fontFamily: '${fontB}', fontSize: "14px", fontWeight: 500, color: "${c.text}" }}>{label}</div>}
          {description && <div style={{ fontFamily: '${fontB}', fontSize: "12px", color: "${c.textSecondary}", marginTop: "2px" }}>{description}</div>}
        </div>
      )}
    </div>
  );
}`;

    case "Radio":
      return `import React from "react";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {
  const outerStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "2px solid ${c.border}",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s ease",
    flexShrink: 0,${
      design === "neobrutalism"
        ? `
    boxShadow: "2px 2px 0px 0px ${c.shadow}",`
        : ""
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {options.map((opt) => (
        <div
          key={opt.value}
          style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}
          onClick={() => onChange?.(opt.value)}
        >
          <div style={{ ...outerStyle, borderColor: opt.value === value ? "${c.primary}" : "${c.border}" }}>
            {opt.value === value && (
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "${c.primary}" }} />
            )}
          </div>
          <div>
            <div style={{ fontFamily: '${fontB}', fontSize: "14px", fontWeight: 500, color: "${c.text}" }}>{opt.label}</div>
            {opt.description && <div style={{ fontFamily: '${fontB}', fontSize: "12px", color: "${c.textSecondary}", marginTop: "2px" }}>{opt.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}`;

    case "Accordion":
      return `import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
}

export function Accordion({ items, type = "single" }: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (type === "single") {
      setOpenItems(openItems.includes(index) ? [] : [index]);
    } else {
      setOpenItems(
        openItems.includes(index) ? openItems.filter((i) => i !== index) : [...openItems, index]
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "${r}", overflow: "hidden" }}>
      {items.map((item, i) => {
        const isOpen = openItems.includes(i);
        return (
          <div key={i} style={{ borderBottom: "1px solid ${c.border}" }}>
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: '${fontH}',
                fontSize: "14px",
                fontWeight: 600,
                color: "${c.text}",
                transition: "background-color 0.15s ease",
              }}
            >
              {item.title}
              <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", fontSize: "12px" }}>▼</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 16px 14px", fontFamily: '${fontB}', fontSize: "14px", color: "${c.textSecondary}", lineHeight: 1.6 }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}`;

    case "Dialog":
      return `import React from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Dialog({ open, onClose, title, description, children, footer }: DialogProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "480px",
          backgroundColor: "${c.surface}",
          borderRadius: "${r}",
          overflow: "hidden",${
            design === "neobrutalism"
              ? `
          border: "${bw} solid ${c.border}",
          boxShadow: "8px 8px 0px 0px ${c.shadow}",`
              : ""
          }${
            design === "glassmorphism"
              ? `
          backdropFilter: "blur(20px)",
          border: "1px solid ${c.border}",`
              : ""
          }${
            design === "cyberpunk"
              ? `
          border: "${bw} solid ${c.border}",
          clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",`
              : `
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",`
          }
        }}
      >
        <div style={{ padding: "24px 24px 0" }}>
          <h2 style={{ fontFamily: '${fontH}', fontSize: "18px", fontWeight: 700, color: "${c.text}", marginBottom: "8px" }}>{title}</h2>
          {description && <p style={{ fontFamily: '${fontB}', fontSize: "14px", color: "${c.textSecondary}", lineHeight: 1.5 }}>{description}</p>}
        </div>
        {children && <div style={{ padding: "16px 24px" }}>{children}</div>}
        {footer && (
          <div style={{ padding: "16px 24px", borderTop: "1px solid ${c.border}", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}`;

    case "Tabs":
      return `import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      <div style={{ display: "flex", gap: "0", borderBottom: "2px solid ${c.border}", marginBottom: "16px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              border: "none",
              borderBottom: tab.id === activeTab ? "2px solid ${c.primary}" : "2px solid transparent",
              marginBottom: "-2px",
              backgroundColor: "transparent",
              color: tab.id === activeTab ? "${c.primary}" : "${c.textSecondary}",
              fontFamily: '${fontB}',
              fontSize: "14px",
              fontWeight: tab.id === activeTab ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}`;

    case "Progress":
      return `import React from "react";

interface ProgressProps {
  value: number;
  color?: string;
  showLabel?: boolean;
}

export function Progress({ value, color = "${c.primary}", showLabel = false }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const br = ${parseInt(r) > 0 ? `"${Math.min(parseInt(r), 8)}px"` : `"0px"`};

  const trackStyle: React.CSSProperties = {
    width: "100%",
    height: "8px",
    backgroundColor: "${c.muted}",
    borderRadius: br,
    overflow: "hidden",
    position: "relative",${
      design === "neobrutalism"
        ? `
    border: "2px solid ${c.border}",
    height: "12px",`
        : ""
    }${
      design === "neumorphism"
        ? `
    boxShadow: "inset 2px 2px 4px ${hexToRgba(c.shadow, 0.3)}, inset -2px -2px 4px rgba(255,255,255,0.5)",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    border: "1px solid " + color + "4D",`
        : ""
    }
  };

  const fillStyle: React.CSSProperties = {
    height: "100%",
    width: clampedValue + "%",
    backgroundColor: color,
    borderRadius: br,
    transition: "width 0.5s ease",${
      design === "aurora"
        ? `
    background: "linear-gradient(90deg, " + color + ", " + color + "99)",`
        : ""
    }${
      design === "cyberpunk"
        ? `
    boxShadow: "0 0 8px " + color + "66",`
        : ""
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={trackStyle}>
        <div style={fillStyle} />
      </div>
      {showLabel && <span style={{ fontFamily: '${fontB}', fontSize: "12px", color: "${c.textSecondary}", fontWeight: 600, whiteSpace: "nowrap" }}>{clampedValue}%</span>}
    </div>
  );
}`;

    case "Separator":
      return `import React from "react";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export function Separator({ orientation = "horizontal", label }: SeparatorProps) {
  if (orientation === "vertical") {
    return <div style={{ width: "1px", alignSelf: "stretch", backgroundColor: "${c.border}" }} />;
  }

  if (label) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: "${c.border}" }} />
        <span style={{ fontFamily: '${fontB}', fontSize: "12px", color: "${c.textSecondary}", whiteSpace: "nowrap" }}>{label}</span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "${c.border}" }} />
      </div>
    );
  }

  return <div style={{ width: "100%", height: "1px", backgroundColor: "${c.border}", margin: "16px 0" }} />;
}`;

    case "Skeleton":
      return `import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width = "100%", height = "20px", borderRadius = "${r}", style }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "${c.muted}",
        animation: "pulse 2s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

// Add this to your global CSS:
// @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`;

    case "Table":
      return `import React from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function Table<T extends Record<string, unknown>>({ columns, data }: TableProps<T>) {
  const cellStyle: React.CSSProperties = {
    padding: "12px 16px",
    fontFamily: '${fontB}',
    fontSize: "14px",
    color: "${c.text}",
    borderBottom: "1px solid ${c.border}",
    whiteSpace: "nowrap",
  };

  const thStyle: React.CSSProperties = {
    ...cellStyle,
    fontWeight: 600,
    fontSize: "12px",
    color: "${c.textSecondary}",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backgroundColor: "${c.surface}",
    textAlign: "left",
  };

  return (
    <div style={{ overflowX: "auto", borderRadius: "${r}", border: "1px solid ${c.border}" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} style={thStyle}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "transparent" : "${hexToRgba(c.muted, 0.3)}" }}>
              {columns.map((col) => (
                <td key={String(col.key)} style={cellStyle}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`;

    default:
      return `// Component "${componentName}" — code not yet generated`;
  }
}

function generateSvelteCode(
  componentName: string,
  state: {
    activeDesign: DesignStyle;
    colors: Record<string, string>;
    borderRadius: string;
    borderWidth: string;
    themeMode: string;
    fontHeading: string;
    fontBody: string;
  },
): string {
  const c = state.colors;
  const preset = designPresets[state.activeDesign];
  const shadow = preset.shadowStyle[state.themeMode as "light" | "dark"];
  const design = state.activeDesign;
  const r = state.borderRadius;
  const bw = state.borderWidth;
  const fontH = `'${state.fontHeading}', system-ui, sans-serif`;
  const fontB = `'${state.fontBody}', system-ui, sans-serif`;

  const neoB = design === "neobrutalism";
  const glass = design === "glassmorphism";
  const cyber = design === "cyberpunk";
  const neu = design === "neumorphism";
  const aur = design === "aurora";
  const clay = design === "clayomorphism";

  switch (componentName) {
    case "Button":
      return `<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<button
  class="btn btn-{variant} btn-{size}"
  on:click
  {...$$restProps}
>
  <slot />
</button>

<style>
  .btn {
    font-family: ${fontB};
    font-weight: 600;
    border-radius: ${r};
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    line-height: 1.2;
    border: none;
    outline: none;
    white-space: nowrap;${
      neoB
        ? `
    border: ${bw} solid ${c.border};
    box-shadow: ${shadow} ${c.shadow};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;`
        : ""
    }${
      glass
        ? `
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid ${c.border};`
        : ""
    }${
      cyber
        ? `
    font-family: ${fontH};
    text-transform: uppercase;
    letter-spacing: 2px;
    border: ${bw} solid ${c.border};`
        : ""
    }${
      neu
        ? `
    box-shadow: ${shadow};
    border: none;`
        : ""
    }${
      aur
        ? `
    border: 1px solid ${c.border};
    box-shadow: ${shadow};`
        : ""
    }
  }
  .btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }
  .btn-sm { padding: 6px 14px; font-size: 12px; }
  .btn-md { padding: 10px 20px; font-size: 14px; }
  .btn-lg { padding: 14px 28px; font-size: 16px; }
  .btn-primary { background-color: ${c.primary}; color: #FFFFFF;${aur ? ` background: linear-gradient(135deg, ${c.primary}, ${c.accent}); border: none;` : ""} }
  .btn-secondary { background-color: ${c.secondary}; color: #FFFFFF; }
  .btn-outline { background-color: transparent; color: ${c.primary}; border: ${bw || "1px"} solid ${c.primary}; }
  .btn-ghost { background-color: transparent; color: ${c.textSecondary}; border: none; box-shadow: none; }
  .btn-destructive { background-color: ${c.destructive}; color: #FFFFFF; }
</style>`;

    case "Card":
      return `<script lang="ts">
  export let padding: string = '24px';
</script>

<div class="card" style:padding={padding}>
  <slot />
</div>

<style>
  .card {
    background-color: ${c.surface};
    border-radius: ${r};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;${
      neoB
        ? `
    border: ${bw} solid ${c.border};
    box-shadow: ${shadow} ${c.shadow};`
        : ""
    }${
      glass
        ? `
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid ${c.border};
    box-shadow: ${shadow};`
        : ""
    }${
      neu
        ? `
    box-shadow: ${shadow};
    border: none;`
        : ""
    }${
      cyber
        ? `
    border: ${bw} solid ${c.border};
    box-shadow: ${shadow};
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));`
        : ""
    }${
      aur
        ? `
    border: 1px solid ${c.border};
    box-shadow: ${shadow};
    background: linear-gradient(145deg, ${c.surface}, ${hexToRgba(c.primary, 0.05)});`
        : ""
    }${
      clay
        ? `
    box-shadow: ${shadow};
    border: none;`
        : ""
    }${
      design === "minimalist" || design === "retro"
        ? `
    border: ${bw} solid ${c.border};
    box-shadow: ${shadow};`
        : ""
    }
  }
</style>`;

    case "Input":
      return `<script lang="ts">
  export let label: string = '';
  export let placeholder: string = '';
  export let type: string = 'text';
  export let value: string = '';
</script>

<div class="input-group">
  {#if label}
    <label class="input-label">{label}</label>
  {/if}
  <input class="input" {type} {placeholder} bind:value {...$$restProps} />
</div>

<style>
  .input-group { display: flex; flex-direction: column; gap: 6px; }
  .input-label { font-family: ${fontB}; font-size: 14px; font-weight: 500; color: ${c.text}; }
  .input {
    font-family: ${fontB};
    font-size: 14px;
    padding: 10px 14px;
    border-radius: ${r};
    width: 100%;
    outline: none;
    transition: all 0.2s ease;
    color: ${c.text};
    background-color: ${c.surface};${
      neoB
        ? `
    border: ${bw} solid ${c.border};
    box-shadow: 3px 3px 0px 0px ${c.shadow};
    background-color: ${c.background};`
        : ""
    }${
      glass
        ? `
    background-color: rgba(255,255,255,0.06);
    border: 1px solid ${c.border};
    backdrop-filter: blur(10px);`
        : ""
    }${
      neu
        ? `
    border: none;
    box-shadow: inset 4px 4px 8px ${c.shadow}, inset -4px -4px 8px #FFFFFF;`
        : ""
    }${
      cyber
        ? `
    border: 1px solid ${c.border};
    font-family: ${fontH};
    letter-spacing: 0.5px;`
        : ""
    }${
      design === "minimalist" || design === "retro"
        ? `
    border: ${bw} solid ${c.border};`
        : ""
    }${
      clay
        ? `
    border: none;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.08);
    background-color: ${c.muted};`
        : ""
    }${
      aur
        ? `
    border: 1px solid ${c.border};
    background-color: ${c.muted};`
        : ""
    }
  }
  .input:focus { border-color: ${c.primary}; box-shadow: 0 0 0 3px ${hexToRgba(c.primary, 0.15)}; }
  .input::placeholder { color: ${c.textSecondary}; }
</style>`;

    case "Badge":
      return `<script lang="ts">
  export let variant: 'default' | 'success' | 'warning' | 'destructive' | 'outline' = 'default';
</script>

<span class="badge badge-{variant}">
  <slot />
</span>

<style>
  .badge {
    font-family: ${fontB};
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: ${design === "retro" ? "0px" : "999px"};
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1.4;
    white-space: nowrap;${
      neoB
        ? `
    border: 2px solid ${c.border};
    box-shadow: 2px 2px 0px 0px ${c.shadow};
    font-weight: 700;
    text-transform: uppercase;`
        : ""
    }${
      cyber
        ? `
    border: 1px solid;
    font-family: ${fontH};
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 10px;
    border-radius: 2px;`
        : ""
    }
  }
  .badge-default { background-color: ${c.primary}; color: #FFFFFF; }
  .badge-success { background-color: ${c.success}; color: #FFFFFF; }
  .badge-warning { background-color: ${c.warning}; color: #1A1A2E; }
  .badge-destructive { background-color: ${c.destructive}; color: #FFFFFF; }
  .badge-outline { background-color: transparent; color: ${c.text}; border: 1.5px solid ${c.border}; }
</style>`;

    case "Toggle":
      return `<script lang="ts">
  export let checked: boolean = false;
  export let label: string = '';
  export let description: string = '';

  function toggle() { checked = !checked; }
</script>

<div class="toggle-wrapper" on:click={toggle} role="switch" aria-checked={checked}>
  <div class="track" class:active={checked}>
    <div class="thumb" class:active={checked} />
  </div>
  {#if label || description}
    <div>
      {#if label}<div class="label">{label}</div>{/if}
      {#if description}<div class="desc">{description}</div>{/if}
    </div>
  {/if}
</div>

<style>
  .toggle-wrapper { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .track {
    width: 44px; height: 24px;
    border-radius: ${design === "retro" ? "4px" : "12px"};
    background-color: ${c.muted};
    position: relative;
    transition: all 0.3s ease;
    flex-shrink: 0;${neoB ? ` border: 2px solid ${c.border};` : ""}
  }
  .track.active { background-color: ${c.primary}; }
  .thumb {
    width: 18px; height: 18px;
    border-radius: ${design === "retro" ? "2px" : "50%"};
    background-color: #FFFFFF;
    position: absolute; top: 3px; left: 3px;
    transition: all 0.3s ease;${neoB ? ` border: 2px solid ${c.border};` : ""}
  }
  .thumb.active { left: 23px;${neoB ? ` background-color: ${c.accent};` : ""} }
  .label { font-family: ${fontB}; font-size: 14px; font-weight: 500; color: ${c.text}; }
  .desc { font-family: ${fontB}; font-size: 12px; color: ${c.textSecondary}; margin-top: 2px; }
</style>`;

    case "Alert":
      return `<script lang="ts">
  export let variant: 'info' | 'success' | 'warning' | 'destructive' = 'info';
  export let title: string;
  export let description: string = '';

  const colorMap = {
    info: '${c.primary}',
    success: '${c.success}',
    warning: '${c.warning}',
    destructive: '${c.destructive}',
  };
  $: color = colorMap[variant];
</script>

<div class="alert" style="background-color: {color}14; border-color: {color}4D;">
  <div class="icon" style="color: {color}">●</div>
  <div>
    <div class="title">{title}</div>
    {#if description}<div class="desc">{description}</div>{/if}
  </div>
</div>

<style>
  .alert {
    padding: 16px; border-radius: ${r}; display: flex; gap: 12px;
    align-items: flex-start; font-family: ${fontB}; border: 1px solid;${
      neoB
        ? `
    border: ${bw} solid ${c.border}; box-shadow: 4px 4px 0px 0px ${c.shadow};`
        : ""
    }${
      cyber
        ? `
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));`
        : ""
    }
  }
  .icon { flex-shrink: 0; margin-top: 2px; }
  .title { font-weight: 600; font-size: 14px; color: ${c.text}; margin-bottom: 4px; font-family: ${fontH}; }
  .desc { font-size: 13px; color: ${c.textSecondary}; line-height: 1.5; }
</style>`;

    case "Avatar":
      return `<script lang="ts">
  export let src: string = '';
  export let alt: string = '';
  export let fallback: string = '?';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const sizes = { sm: '32px', md: '40px', lg: '48px' };
  const fontSizes = { sm: '12px', md: '14px', lg: '18px' };
</script>

<div class="avatar" style="width: {sizes[size]}; height: {sizes[size]}; font-size: {fontSizes[size]};">
  {#if src}
    <img {src} {alt} />
  {:else}
    {fallback}
  {/if}
</div>

<style>
  .avatar {
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: ${design === "neobrutalism" ? "8px" : design === "retro" ? "0px" : design === "cyberpunk" ? "4px" : "50%"};
    font-family: ${fontB}; font-weight: 600; flex-shrink: 0;
    overflow: hidden; background-color: ${c.primary}; color: #FFFFFF;${
      neoB
        ? `
    border: 2px solid ${c.border}; box-shadow: 2px 2px 0px 0px ${c.shadow};`
        : ""
    }${
      cyber
        ? `
    border: 1px solid ${c.primary}; box-shadow: 0 0 8px ${hexToRgba(c.primary, 0.3)};`
        : ""
    }
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
</style>`;

    case "Tooltip":
      return `<script lang="ts">
  export let content: string;
  let visible = false;
</script>

<div
  class="tooltip-wrapper"
  on:mouseenter={() => visible = true}
  on:mouseleave={() => visible = false}
>
  <div class="tooltip" class:visible>{content}</div>
  <slot />
</div>

<style>
  .tooltip-wrapper { position: relative; display: inline-block; }
  .tooltip {
    position: absolute; bottom: calc(100% + 8px); left: 50%;
    transform: translateX(-50%); padding: 8px 14px; border-radius: ${r};
    font-size: 13px; font-family: ${fontB}; font-weight: 500;
    white-space: nowrap; z-index: 50; color: #FFFFFF;
    background-color: ${c.text}; opacity: 0; pointer-events: none;
    transition: opacity 0.15s ease;${
      neoB
        ? `
    border: 2px solid ${c.border}; box-shadow: 3px 3px 0px 0px ${c.shadow};
    background-color: ${c.primary}; font-weight: 700;`
        : ""
    }${
      glass
        ? `
    background-color: ${hexToRgba(c.surface, 0.8)};
    backdrop-filter: blur(16px); border: 1px solid ${c.border}; color: ${c.text};`
        : ""
    }${
      aur
        ? `
    background: linear-gradient(135deg, ${c.primary}, ${c.accent}); border: none;`
        : ""
    }
  }
  .tooltip.visible { opacity: 1; }
</style>`;

    case "Select":
      return `<script lang="ts">
  export let options: { value: string; label: string }[] = [];
  export let value: string = '';
  export let placeholder: string = 'Select...';
  export let label: string = '';
  let open = false;

  $: selected = options.find(o => o.value === value);
  function pick(v: string) { value = v; open = false; }
</script>

<svelte:window on:click={() => open = false} />

<div class="select-group">
  {#if label}<label class="label">{label}</label>{/if}
  <div class="wrapper" on:click|stopPropagation>
    <button class="trigger" on:click={() => open = !open}>
      <span>{selected ? selected.label : placeholder}</span>
      <span class="arrow">▼</span>
    </button>
    {#if open}
      <div class="dropdown">
        {#each options as opt}
          <div class="option" class:active={opt.value === value} on:click={() => pick(opt.value)}>
            {opt.label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .select-group { display: flex; flex-direction: column; gap: 6px; }
  .label { font-family: ${fontB}; font-size: 14px; font-weight: 500; color: ${c.text}; }
  .wrapper { position: relative; }
  .trigger {
    font-family: ${fontB}; font-size: 14px; padding: 10px 14px; border-radius: ${r};
    width: 100%; outline: none; color: ${c.text}; background-color: ${c.surface};
    cursor: pointer; display: flex; align-items: center; justify-content: space-between;
    border: ${bw || "1px"} solid ${c.border};${neoB ? ` box-shadow: 3px 3px 0px 0px ${c.shadow};` : ""}
  }
  .arrow { font-size: 10px; }
  .dropdown {
    position: absolute; top: calc(100% + 4px); left: 0; right: 0;
    background-color: ${c.surface}; border: 1px solid ${c.border}; border-radius: ${r};
    box-shadow: 0 8px 24px rgba(0,0,0,0.15); z-index: 50; overflow: hidden;
  }
  .option { padding: 10px 14px; cursor: pointer; font-size: 14px; font-family: ${fontB}; color: ${c.text}; }
  .option:hover { background-color: ${hexToRgba(c.primary, 0.08)}; }
  .option.active { color: ${c.primary}; background-color: ${hexToRgba(c.primary, 0.08)}; }
</style>`;

    case "Checkbox":
      return `<script lang="ts">
  export let checked: boolean = false;
  export let label: string = '';
  export let description: string = '';
  function toggle() { checked = !checked; }
</script>

<div class="checkbox-wrapper" on:click={toggle}>
  <div class="box" class:checked>
    {#if checked}<span class="check">✓</span>{/if}
  </div>
  {#if label || description}
    <div>
      {#if label}<div class="label">{label}</div>{/if}
      {#if description}<div class="desc">{description}</div>{/if}
    </div>
  {/if}
</div>

<style>
  .checkbox-wrapper { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
  .box {
    width: 18px; height: 18px; border-radius: ${parseInt(r) > 8 ? "4px" : Math.min(parseInt(r), 4) + "px"};
    border: 2px solid ${c.border}; display: flex; align-items: center;
    justify-content: center; transition: all 0.15s ease; flex-shrink: 0;
  }
  .box.checked { background-color: ${c.primary}; border-color: ${c.primary}; }
  .check { color: #fff; font-size: 12px; font-weight: 700; line-height: 1; }
  .label { font-family: ${fontB}; font-size: 14px; font-weight: 500; color: ${c.text}; }
  .desc { font-family: ${fontB}; font-size: 12px; color: ${c.textSecondary}; margin-top: 2px; }
</style>`;

    case "Radio":
      return `<script lang="ts">
  export let options: { value: string; label: string; description?: string }[] = [];
  export let value: string = '';
</script>

<div class="radio-group">
  {#each options as opt}
    <div class="radio-item" on:click={() => value = opt.value}>
      <div class="outer" class:active={opt.value === value}>
        {#if opt.value === value}
          <div class="inner" />
        {/if}
      </div>
      <div>
        <div class="label">{opt.label}</div>
        {#if opt.description}<div class="desc">{opt.description}</div>{/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .radio-group { display: flex; flex-direction: column; gap: 12px; }
  .radio-item { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
  .outer {
    width: 18px; height: 18px; border-radius: 50%; border: 2px solid ${c.border};
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.15s ease;${neoB ? ` box-shadow: 2px 2px 0px 0px ${c.shadow};` : ""}
  }
  .outer.active { border-color: ${c.primary}; }
  .inner { width: 8px; height: 8px; border-radius: 50%; background-color: ${c.primary}; }
  .label { font-family: ${fontB}; font-size: 14px; font-weight: 500; color: ${c.text}; }
  .desc { font-family: ${fontB}; font-size: 12px; color: ${c.textSecondary}; margin-top: 2px; }
</style>`;

    case "Accordion":
      return `<script lang="ts">
  export let items: { title: string; content: string }[] = [];
  let openIndex: number | null = null;
  function toggle(i: number) { openIndex = openIndex === i ? null : i; }
</script>

<div class="accordion">
  {#each items as item, i}
    <div class="item">
      <button class="trigger" on:click={() => toggle(i)}>
        {item.title}
        <span class="arrow" class:open={openIndex === i}>▼</span>
      </button>
      {#if openIndex === i}
        <div class="content">{item.content}</div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .accordion { display: flex; flex-direction: column; border-radius: ${r}; overflow: hidden; }
  .item { border-bottom: 1px solid ${c.border}; }
  .trigger {
    width: 100%; padding: 14px 16px; display: flex; align-items: center;
    justify-content: space-between; background: transparent; border: none;
    cursor: pointer; font-family: ${fontH}; font-size: 14px; font-weight: 600; color: ${c.text};
  }
  .arrow { font-size: 12px; transition: transform 0.2s ease; }
  .arrow.open { transform: rotate(180deg); }
  .content { padding: 0 16px 14px; font-family: ${fontB}; font-size: 14px; color: ${c.textSecondary}; line-height: 1.6; }
</style>`;

    case "Dialog":
      return `<script lang="ts">
  export let open: boolean = false;
  export let title: string;
  export let description: string = '';
  function close() { open = false; }
</script>

{#if open}
  <div class="backdrop" on:click={close}>
    <div class="dialog" on:click|stopPropagation>
      <div class="header">
        <h2 class="title">{title}</h2>
        {#if description}<p class="desc">{description}</p>{/if}
      </div>
      <div class="body"><slot /></div>
      <div class="footer"><slot name="footer" /></div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background-color: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
  }
  .dialog {
    width: 90%; max-width: 480px; background-color: ${c.surface};
    border-radius: ${r}; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);${
      neoB
        ? `
    border: ${bw} solid ${c.border}; box-shadow: 8px 8px 0px 0px ${c.shadow};`
        : ""
    }${
      cyber
        ? `
    border: ${bw} solid ${c.border};
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));`
        : ""
    }
  }
  .header { padding: 24px 24px 0; }
  .title { font-family: ${fontH}; font-size: 18px; font-weight: 700; color: ${c.text}; margin: 0 0 8px; }
  .desc { font-family: ${fontB}; font-size: 14px; color: ${c.textSecondary}; line-height: 1.5; margin: 0; }
  .body { padding: 16px 24px; }
  .footer { padding: 16px 24px; border-top: 1px solid ${c.border}; display: flex; justify-content: flex-end; gap: 8px; }
</style>`;

    case "Tabs":
      return `<script lang="ts">
  export let tabs: { id: string; label: string }[] = [];
  export let active: string = tabs[0]?.id ?? '';
</script>

<div class="tabs">
  <div class="tab-list">
    {#each tabs as tab}
      <button
        class="tab-trigger"
        class:active={tab.id === active}
        on:click={() => active = tab.id}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div class="tab-content">
    <slot name={active} />
  </div>
</div>

<style>
  .tab-list { display: flex; gap: 0; border-bottom: 2px solid ${c.border}; margin-bottom: 16px; }
  .tab-trigger {
    padding: 10px 20px; border: none; border-bottom: 2px solid transparent;
    margin-bottom: -2px; background: transparent; color: ${c.textSecondary};
    font-family: ${fontB}; font-size: 14px; cursor: pointer; transition: all 0.15s ease;
  }
  .tab-trigger.active { border-bottom-color: ${c.primary}; color: ${c.primary}; font-weight: 600; }
</style>`;

    case "Progress":
      return `<script lang="ts">
  export let value: number = 0;
  export let color: string = '${c.primary}';
  export let showLabel: boolean = false;
  $: clamped = Math.min(100, Math.max(0, value));
</script>

<div class="progress-wrapper">
  <div class="track">
    <div class="fill" style="width: {clamped}%; background-color: {color};" />
  </div>
  {#if showLabel}
    <span class="label">{clamped}%</span>
  {/if}
</div>

<style>
  .progress-wrapper { display: flex; align-items: center; gap: 12px; }
  .track {
    width: 100%; height: 8px; background-color: ${c.muted};
    border-radius: ${parseInt(r) > 0 ? Math.min(parseInt(r), 8) + "px" : "0px"};
    overflow: hidden; position: relative;${neoB ? ` border: 2px solid ${c.border}; height: 12px;` : ""}
  }
  .fill { height: 100%; border-radius: inherit; transition: width 0.5s ease; }
  .label { font-family: ${fontB}; font-size: 12px; color: ${c.textSecondary}; font-weight: 600; white-space: nowrap; }
</style>`;

    case "Separator":
      return `<script lang="ts">
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let label: string = '';
</script>

{#if orientation === 'vertical'}
  <div class="separator-v" />
{:else if label}
  <div class="separator-labeled">
    <div class="line" />
    <span class="text">{label}</span>
    <div class="line" />
  </div>
{:else}
  <div class="separator-h" />
{/if}

<style>
  .separator-h { width: 100%; height: 1px; background-color: ${c.border}; margin: 16px 0; }
  .separator-v { width: 1px; align-self: stretch; background-color: ${c.border}; }
  .separator-labeled { display: flex; align-items: center; gap: 16px; }
  .line { flex: 1; height: 1px; background-color: ${c.border}; }
  .text { font-family: ${fontB}; font-size: 12px; color: ${c.textSecondary}; white-space: nowrap; }
</style>`;

    case "Skeleton":
      return `<script lang="ts">
  export let width: string = '100%';
  export let height: string = '20px';
  export let borderRadius: string = '${r}';
</script>

<div class="skeleton" style="width: {width}; height: {height}; border-radius: {borderRadius};" />

<style>
  .skeleton {
    background-color: ${c.muted};
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
</style>`;

    case "Textarea":
      return `<script lang="ts">
  export let label: string = '';
  export let placeholder: string = '';
  export let value: string = '';
</script>

<div class="textarea-group">
  {#if label}<label class="label">{label}</label>{/if}
  <textarea class="textarea" {placeholder} bind:value {...$$restProps} />
</div>

<style>
  .textarea-group { display: flex; flex-direction: column; gap: 6px; }
  .label { font-family: ${fontB}; font-size: 14px; font-weight: 500; color: ${c.text}; }
  .textarea {
    font-family: ${fontB}; font-size: 14px; padding: 10px 14px; border-radius: ${r};
    width: 100%; min-height: 80px; outline: none; transition: all 0.2s ease;
    color: ${c.text}; background-color: ${c.surface}; resize: vertical;${
      neoB
        ? `
    border: ${bw} solid ${c.border}; box-shadow: 3px 3px 0px 0px ${c.shadow};`
        : ""
    }${
      glass
        ? `
    background-color: rgba(255,255,255,0.06); border: 1px solid ${c.border}; backdrop-filter: blur(10px);`
        : ""
    }${
      neu
        ? `
    border: none; box-shadow: inset 4px 4px 8px ${c.shadow}, inset -4px -4px 8px #FFFFFF;`
        : `
    border: ${bw || "1px"} solid ${c.border};`
    }
  }
  .textarea:focus { border-color: ${c.primary}; }
</style>`;

    case "Table":
      return `<script lang="ts">
  export let columns: { key: string; header: string }[] = [];
  export let data: Record<string, string>[] = [];
</script>

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        {#each columns as col}
          <th>{col.header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row, i}
        <tr class:alt={i % 2 === 1}>
          {#each columns as col}
            <td>{row[col.key] ?? ''}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrapper { overflow-x: auto; border-radius: ${r}; border: 1px solid ${c.border}; }
  table { width: 100%; border-collapse: collapse; }
  th {
    padding: 12px 16px; font-family: ${fontB}; font-size: 12px; font-weight: 600;
    color: ${c.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px;
    background-color: ${c.surface}; text-align: left; border-bottom: 1px solid ${c.border};
  }
  td {
    padding: 12px 16px; font-family: ${fontB}; font-size: 14px;
    color: ${c.text}; border-bottom: 1px solid ${c.border}; white-space: nowrap;
  }
  tr.alt { background-color: ${hexToRgba(c.muted, 0.3)}; }
</style>`;

    default:
      return `<!-- Component "${componentName}" — code not yet generated -->`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COPY BUTTON
// ═══════════════════════════════════════════════════════════════════════════

function CopyButton({
  text,
  label,
  colors,
}: {
  text: string;
  label: string;
  colors: Record<string, string>;
}) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={doCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 12px",
        borderRadius: "6px",
        border: `1px solid ${colors.border}`,
        backgroundColor: copied
          ? hexToRgba(colors.success, 0.15)
          : hexToRgba(colors.surface, 0.8),
        color: copied ? colors.success : colors.textSecondary,
        fontSize: "11px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s ease",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CODE PREVIEW PANEL
// ═══════════════════════════════════════════════════════════════════════════

function CodePreview({
  reactCode,
  svelteCode,
  cssCode,
  tailwindCode,
  colors,
}: {
  reactCode: string;
  svelteCode: string;
  cssCode: string;
  tailwindCode?: string;
  colors: Record<string, string>;
}) {
  const [tab, setTab] = useState<"react" | "svelte" | "css" | "tailwind">(
    "react",
  );
  const [expanded, setExpanded] = useState(false);
  const code =
    tab === "react"
      ? reactCode
      : tab === "svelte"
        ? svelteCode
        : tab === "tailwind"
          ? tailwindCode || ""
          : cssCode;

  return (
    <div
      style={{
        marginTop: "12px",
        borderRadius: "8px",
        border: `1px solid ${colors.border}`,
        overflow: "hidden",
        backgroundColor: hexToRgba(colors.surface, 0.5),
      }}
    >
      {/* Tabs row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 10px",
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: hexToRgba(colors.muted, 0.3),
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {(
            [
              "react",
              "svelte",
              "css",
              ...(tailwindCode ? ["tailwind" as const] : []),
            ] as const
          ).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "4px 12px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: tab === t ? colors.primary : "transparent",
                color: tab === t ? "#FFFFFF" : colors.textSecondary,
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s ease",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {t === "react"
                ? "React"
                : t === "svelte"
                  ? "Svelte"
                  : t === "tailwind"
                    ? "Tailwind v4"
                    : "CSS"}
            </button>
          ))}
        </div>
        <CopyButton
          text={code}
          label={`Copy ${tab === "react" ? "React" : tab === "svelte" ? "Svelte" : tab === "tailwind" ? "Tailwind" : "CSS"}`}
          colors={colors}
        />
      </div>
      {/* Code */}
      <div
        style={{
          padding: "12px",
          maxHeight: expanded ? "none" : "200px",
          overflowY: expanded ? "auto" : "hidden",
          position: "relative",
        }}
      >
        <pre
          style={{
            margin: 0,
            fontSize: "12px",
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            color: colors.textSecondary,
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {code}
        </pre>
        {!expanded && code.split("\n").length > 12 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: `linear-gradient(transparent, ${colors.surface})`,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "8px",
            }}
          >
            <button
              onClick={() => setExpanded(true)}
              style={{
                padding: "4px 16px",
                borderRadius: "6px",
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surface,
                color: colors.textSecondary,
                fontSize: "11px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Show more ▼
            </button>
          </div>
        )}
        {expanded && code.split("\n").length > 12 && (
          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <button
              onClick={() => setExpanded(false)}
              style={{
                padding: "4px 16px",
                borderRadius: "6px",
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surface,
                color: colors.textSecondary,
                fontSize: "11px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Show less ▲
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INDIVIDUAL COMPONENT SHOWCASES
// ═══════════════════════════════════════════════════════════════════════════

interface ShowcaseProps {
  design: DesignStyle;
  colors: Record<string, string>;
  radius: string;
  borderW: string;
  shadow: string;
  fontH: string;
  fontB: string;
  card: (extra?: CSSProperties) => CSSProperties;
  btn: (
    v: "primary" | "secondary" | "outline" | "ghost" | "destructive",
    extra?: CSSProperties,
  ) => CSSProperties;
  inp: (extra?: CSSProperties) => CSSProperties;
  badge: (
    v: "default" | "success" | "warning" | "destructive" | "outline",
  ) => CSSProperties;
  state: ReturnType<typeof useDesign>["state"];
}

function ButtonShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, shadow, btn, state, fontH, fontB } =
    props;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <button style={btn("primary")}>Primary</button>
        <button style={btn("secondary")}>Secondary</button>
        <button style={btn("outline")}>Outline</button>
        <button style={btn("ghost")}>Ghost</button>
        <button style={btn("destructive")}>Destructive</button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <button
          style={btn("primary", { padding: "6px 14px", fontSize: "12px" })}
        >
          Small
        </button>
        <button style={btn("primary")}>Medium</button>
        <button
          style={btn("primary", { padding: "12px 24px", fontSize: "15px" })}
        >
          Large
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button style={btn("primary")}>
          <Mail size={14} /> With Icon
        </button>
        <button style={btn("outline")}>
          <Upload size={14} /> Upload
        </button>
        <button
          style={{ ...btn("primary"), opacity: 0.5, cursor: "not-allowed" }}
        >
          Disabled
        </button>
        <button style={btn("primary", { padding: "8px", aspectRatio: "1" })}>
          <Plus size={14} />
        </button>
      </div>
      <CodePreview
        reactCode={generateReactCode("Button", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Button", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Button", state)}
        tailwindCode={generateTailwindV4ComponentCode("Button", state)}
        colors={colors}
      />
    </div>
  );
}

function CardShowcase(props: ShowcaseProps) {
  const {
    design,
    colors,
    radius,
    borderW,
    shadow,
    card,
    btn,
    state,
    fontH,
    fontB,
  } = props;
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        <div style={card()}>
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontFamily: fontH,
                fontSize: "16px",
                fontWeight: 700,
                color: colors.text,
                marginBottom: "4px",
              }}
            >
              Card Title
            </div>
            <div style={{ fontSize: "13px", color: colors.textSecondary }}>
              Card description goes here
            </div>
          </div>
          <div
            style={{ fontSize: "13px", color: colors.text, lineHeight: 1.6 }}
          >
            This is the card content area. You can put any content inside a card
            component.
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: `1px solid ${hexToRgba(colors.border, 0.5)}`,
            }}
          >
            <button
              style={btn("primary", { fontSize: "12px", padding: "6px 14px" })}
            >
              Action
            </button>
            <button
              style={btn("ghost", { fontSize: "12px", padding: "6px 14px" })}
            >
              Cancel
            </button>
          </div>
        </div>
        <div style={card()}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              JD
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontH,
                  fontWeight: 600,
                  fontSize: "14px",
                  color: colors.text,
                }}
              >
                John Doe
              </div>
              <div style={{ fontSize: "12px", color: colors.textSecondary }}>
                Software Engineer
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "13px",
              color: colors.textSecondary,
              lineHeight: 1.6,
            }}
          >
            Building amazing user interfaces with modern design systems and
            component libraries.
          </div>
        </div>
      </div>
      <CodePreview
        reactCode={generateReactCode("Card", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Card", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Card", state)}
        tailwindCode={generateTailwindV4ComponentCode("Card", state)}
        colors={colors}
      />
    </div>
  );
}

function InputShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, shadow, inp, state, fontH, fontB } =
    props;
  const [val, setVal] = useState("");
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: colors.text,
              marginBottom: "6px",
              fontFamily: fontB,
            }}
          >
            Email
          </label>
          <input
            style={inp()}
            placeholder="name@example.com"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: colors.text,
              marginBottom: "6px",
              fontFamily: fontB,
            }}
          >
            Password
          </label>
          <input style={inp()} type="password" placeholder="Enter password" />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: colors.text,
              marginBottom: "6px",
              fontFamily: fontB,
            }}
          >
            Disabled
          </label>
          <input
            style={{ ...inp(), opacity: 0.5, cursor: "not-allowed" }}
            placeholder="Disabled input"
            disabled
          />
        </div>
      </div>
      <div>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 500,
            color: colors.text,
            marginBottom: "6px",
            fontFamily: fontB,
          }}
        >
          Message
        </label>
        <textarea
          style={
            { ...inp(), minHeight: "80px", resize: "vertical" } as CSSProperties
          }
          placeholder="Type your message..."
        />
      </div>
      <CodePreview
        reactCode={generateReactCode("Input", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Input", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Input", state)}
        tailwindCode={generateTailwindV4ComponentCode("Input", state)}
        colors={colors}
      />
    </div>
  );
}

function BadgeShowcase(props: ShowcaseProps) {
  const { design, colors, badge, state, radius, borderW } = props;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <span style={badge("default")}>Default</span>
        <span style={badge("success")}>Success</span>
        <span style={badge("warning")}>Warning</span>
        <span style={badge("destructive")}>Destructive</span>
        <span style={badge("outline")}>Outline</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <span style={badge("default")}>
          <Star size={10} /> Featured
        </span>
        <span style={badge("success")}>
          <CheckCircle2 size={10} /> Active
        </span>
        <span style={badge("warning")}>
          <AlertTriangle size={10} /> Pending
        </span>
        <span style={badge("destructive")}>
          <AlertCircle size={10} /> Error
        </span>
      </div>
      <CodePreview
        reactCode={generateReactCode("Badge", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Badge", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Badge", state)}
        tailwindCode={generateTailwindV4ComponentCode("Badge", state)}
        colors={colors}
      />
    </div>
  );
}

function ToggleShowcase(props: ShowcaseProps) {
  const { design, colors, state, radius, borderW, fontB } = props;
  const [toggles, setToggles] = useState([true, false, true]);
  const toggle = (i: number) => {
    const n = [...toggles];
    n[i] = !n[i];
    setToggles(n);
  };

  const trackStyle = (checked: boolean): CSSProperties => ({
    width: "44px",
    height: "24px",
    borderRadius: design === "retro" ? "4px" : "999px",
    backgroundColor: checked ? colors.primary : colors.muted,
    cursor: "pointer",
    position: "relative",
    transition: "all 0.3s ease",
    flexShrink: 0,
    ...(design === "neobrutalism"
      ? { border: `2px solid ${colors.border}` }
      : {}),
    ...(design === "cyberpunk" && checked
      ? {
          boxShadow: `0 0 10px ${hexToRgba(colors.primary, 0.3)}`,
          border: `1px solid ${colors.primary}`,
        }
      : {}),
    ...(design === "cyberpunk" && !checked
      ? {
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
        }
      : {}),
    ...(design === "neumorphism" && !checked
      ? { boxShadow: `inset 4px 4px 8px #B8B8C8, inset -4px -4px 8px #FFFFFF` }
      : {}),
    ...(design === "glassmorphism"
      ? {
          backgroundColor: checked
            ? hexToRgba(colors.primary, 0.4)
            : "rgba(255,255,255,0.08)",
          border: `1px solid ${checked ? hexToRgba(colors.primary, 0.4) : colors.border}`,
          backdropFilter: "blur(10px)",
        }
      : {}),
    ...(design === "aurora" && checked
      ? {
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
        }
      : {}),
  });

  const thumbStyle = (checked: boolean): CSSProperties => ({
    width: "18px",
    height: "18px",
    borderRadius: design === "retro" ? "2px" : "999px",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: "3px",
    left: checked ? "23px" : "3px",
    transition: "all 0.3s ease",
    ...(design === "neobrutalism"
      ? {
          border: `2px solid ${colors.border}`,
          backgroundColor: checked ? colors.accent : "#FFFFFF",
        }
      : {}),
    ...(design === "cyberpunk"
      ? { backgroundColor: checked ? colors.primary : colors.textSecondary }
      : {}),
  });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          { label: "Email notifications", desc: "Receive email updates" },
          { label: "Two-factor authentication", desc: "Add extra security" },
          { label: "Auto-save", desc: "Automatically save changes" },
        ].map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: colors.text,
                  fontFamily: fontB,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginTop: "2px",
                  fontFamily: fontB,
                }}
              >
                {item.desc}
              </div>
            </div>
            <div
              style={trackStyle(toggles[i])}
              onClick={() => toggle(i)}
              role="switch"
              aria-checked={toggles[i]}
            >
              <div style={thumbStyle(toggles[i])} />
            </div>
          </div>
        ))}
      </div>
      <CodePreview
        reactCode={generateReactCode("Toggle", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Toggle", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Toggle", state)}
        tailwindCode={generateTailwindV4ComponentCode("Toggle", state)}
        colors={colors}
      />
    </div>
  );
}

function AlertShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, shadow, state, fontH, fontB } =
    props;

  const alertBase = (color: string): CSSProperties => ({
    padding: "16px",
    borderRadius: radius,
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    fontFamily: fontB,
    backgroundColor: hexToRgba(color, 0.08),
    border: `1px solid ${hexToRgba(color, 0.3)}`,
    ...(design === "neobrutalism"
      ? {
          border: `${borderW} solid ${colors.border}`,
          boxShadow: `4px 4px 0px 0px ${colors.shadow}`,
        }
      : {}),
    ...(design === "cyberpunk"
      ? {
          border: `1px solid ${color}`,
          clipPath:
            "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
        }
      : {}),
    ...(design === "glassmorphism"
      ? { backdropFilter: "blur(16px)", border: `1px solid ${colors.border}` }
      : {}),
  });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={alertBase(colors.primary)}>
          <Info
            size={18}
            style={{ color: colors.primary, flexShrink: 0, marginTop: "1px" }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "14px",
                color: colors.text,
                fontFamily: fontH,
                marginBottom: "4px",
              }}
            >
              Information
            </div>
            <div
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                lineHeight: 1.5,
              }}
            >
              This is an informational alert message.
            </div>
          </div>
        </div>
        <div style={alertBase(colors.success)}>
          <CheckCircle2
            size={18}
            style={{ color: colors.success, flexShrink: 0, marginTop: "1px" }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "14px",
                color: colors.text,
                fontFamily: fontH,
                marginBottom: "4px",
              }}
            >
              Success
            </div>
            <div
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Your changes have been saved successfully.
            </div>
          </div>
        </div>
        <div style={alertBase(colors.warning)}>
          <AlertTriangle
            size={18}
            style={{ color: colors.warning, flexShrink: 0, marginTop: "1px" }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "14px",
                color: colors.text,
                fontFamily: fontH,
                marginBottom: "4px",
              }}
            >
              Warning
            </div>
            <div
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Please review before proceeding.
            </div>
          </div>
        </div>
        <div style={alertBase(colors.destructive)}>
          <AlertCircle
            size={18}
            style={{
              color: colors.destructive,
              flexShrink: 0,
              marginTop: "1px",
            }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "14px",
                color: colors.text,
                fontFamily: fontH,
                marginBottom: "4px",
              }}
            >
              Error
            </div>
            <div
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Something went wrong. Please try again.
            </div>
          </div>
        </div>
      </div>
      <CodePreview
        reactCode={generateReactCode("Alert", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Alert", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Alert", state)}
        tailwindCode={generateTailwindV4ComponentCode("Alert", state)}
        colors={colors}
      />
    </div>
  );
}

function AvatarShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, state, fontB } = props;

  const avatarStyle = (
    size: number,
    color: string,
    initials: string,
  ): CSSProperties => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius:
      design === "neobrutalism"
        ? "8px"
        : design === "retro"
          ? "0px"
          : design === "cyberpunk"
            ? "4px"
            : "50%",
    backgroundColor: color,
    color: "#FFFFFF",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: `${size * 0.35}px`,
    fontFamily: fontB,
    flexShrink: 0,
    overflow: "hidden",
    ...(design === "neobrutalism"
      ? {
          border: `2px solid ${colors.border}`,
          boxShadow: `2px 2px 0px 0px ${colors.shadow}`,
        }
      : {}),
    ...(design === "cyberpunk"
      ? {
          border: `1px solid ${color}`,
          boxShadow: `0 0 8px ${hexToRgba(color, 0.3)}`,
        }
      : {}),
    ...(design === "neumorphism"
      ? { boxShadow: `4px 4px 8px ${colors.shadow}, -4px -4px 8px #FFFFFF` }
      : {}),
    ...(design === "glassmorphism"
      ? { backdropFilter: "blur(10px)", border: `1px solid ${colors.border}` }
      : {}),
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div style={avatarStyle(32, colors.primary, "A")}>A</div>
        <div style={avatarStyle(40, colors.secondary, "BK")}>BK</div>
        <div style={avatarStyle(48, colors.accent || colors.primary, "CD")}>
          CD
        </div>
        <div style={avatarStyle(56, colors.success, "EF")}>EF</div>
      </div>
      {/* Avatar group */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {["SC", "MJ", "AP", "DK", "+3"].map((init, i) => (
          <div
            key={init}
            style={{
              ...avatarStyle(
                36,
                i === 4
                  ? colors.muted
                  : [
                      colors.primary,
                      colors.secondary,
                      colors.success,
                      colors.warning,
                    ][i],
                init,
              ),
              marginLeft: i > 0 ? "-8px" : "0",
              border: `2px solid ${colors.background}`,
              color: i === 4 ? colors.textSecondary : "#FFFFFF",
              fontSize: "12px",
            }}
          >
            {init}
          </div>
        ))}
      </div>
      <CodePreview
        reactCode={generateReactCode("Avatar", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Avatar", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Avatar", state)}
        tailwindCode={generateTailwindV4ComponentCode("Avatar", state)}
        colors={colors}
      />
    </div>
  );
}

function SelectShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, inp, state, fontH, fontB } = props;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { value: "react", label: "React" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ];

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  return (
    <div>
      <div style={{ maxWidth: "300px" }}>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 500,
            color: colors.text,
            marginBottom: "6px",
            fontFamily: fontB,
          }}
        >
          Framework
        </label>
        <div ref={ref} style={{ position: "relative" }}>
          <div
            onClick={() => setOpen(!open)}
            style={{
              ...inp(),
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: selected ? colors.text : colors.textSecondary,
            }}
          >
            <span>{selectedLabel || "Select a framework..."}</span>
            <ChevronsUpDown size={14} style={{ opacity: 0.5 }} />
          </div>
          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: radius,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 50,
                overflow: "hidden",
              }}
            >
              {options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setSelected(opt.value);
                    setOpen(false);
                  }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    color:
                      opt.value === selected ? colors.primary : colors.text,
                    backgroundColor:
                      opt.value === selected
                        ? hexToRgba(colors.primary, 0.08)
                        : "transparent",
                    fontSize: "13px",
                    fontFamily: fontB,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {opt.label}
                  {opt.value === selected && <Check size={14} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CodePreview
        reactCode={generateReactCode("Select", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Select", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Select", state)}
        tailwindCode={generateTailwindV4ComponentCode("Select", state)}
        colors={colors}
      />
    </div>
  );
}

function CheckboxShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, state, fontB } = props;
  const [checks, setChecks] = useState([true, false, true]);

  const boxStyle = (checked: boolean): CSSProperties => ({
    width: "18px",
    height: "18px",
    borderRadius:
      parseInt(radius) > 8 ? "4px" : `${Math.min(parseInt(radius), 4)}px`,
    border: checked ? "none" : `2px solid ${colors.border}`,
    backgroundColor: checked ? colors.primary : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s ease",
    flexShrink: 0,
    ...(design === "neobrutalism"
      ? {
          border: `2px solid ${colors.border}`,
          boxShadow: checked ? "none" : `2px 2px 0px 0px ${colors.shadow}`,
        }
      : {}),
    ...(design === "cyberpunk"
      ? {
          borderRadius: "2px",
          boxShadow: checked
            ? `0 0 8px ${hexToRgba(colors.primary, 0.4)}`
            : "none",
        }
      : {}),
  });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {[
          {
            label: "Accept terms and conditions",
            desc: "You agree to our Terms of Service",
          },
          {
            label: "Send me marketing emails",
            desc: "We'll send occasional updates",
          },
          {
            label: "Remember my preferences",
            desc: "Save settings for next visit",
          },
        ].map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              const n = [...checks];
              n[i] = !n[i];
              setChecks(n);
            }}
          >
            <div style={boxStyle(checks[i])}>
              {checks[i] && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: colors.text,
                  fontFamily: fontB,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginTop: "2px",
                  fontFamily: fontB,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <CodePreview
        reactCode={generateReactCode("Checkbox", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Checkbox", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Checkbox", state)}
        tailwindCode={generateTailwindV4ComponentCode("Checkbox", state)}
        colors={colors}
      />
    </div>
  );
}

function RadioShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, state, fontB } = props;
  const [value, setValue] = useState("option1");

  const outerStyle = (active: boolean): CSSProperties => ({
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: `2px solid ${active ? colors.primary : colors.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s ease",
    flexShrink: 0,
    ...(design === "neobrutalism"
      ? { boxShadow: `2px 2px 0px 0px ${colors.shadow}` }
      : {}),
  });

  const opts = [
    {
      value: "option1",
      label: "Default plan",
      desc: "Best for personal projects",
    },
    { value: "option2", label: "Pro plan", desc: "For teams and businesses" },
    {
      value: "option3",
      label: "Enterprise",
      desc: "Custom solutions and support",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {opts.map((opt) => (
          <div
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => setValue(opt.value)}
          >
            <div style={outerStyle(opt.value === value)}>
              {opt.value === value && (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </div>
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: colors.text,
                  fontFamily: fontB,
                }}
              >
                {opt.label}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginTop: "2px",
                  fontFamily: fontB,
                }}
              >
                {opt.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <CodePreview
        reactCode={generateReactCode("Radio", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Radio", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Radio", state)}
        tailwindCode={generateTailwindV4ComponentCode("Radio", state)}
        colors={colors}
      />
    </div>
  );
}

function TabsShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, state, fontH, fontB } = props;
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account" },
    { id: "password", label: "Password" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "0",
            borderBottom: `2px solid ${colors.border}`,
            marginBottom: "16px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 20px",
                border: "none",
                borderBottom:
                  tab.id === activeTab
                    ? `2px solid ${colors.primary}`
                    : "2px solid transparent",
                marginBottom: "-2px",
                backgroundColor: "transparent",
                color:
                  tab.id === activeTab ? colors.primary : colors.textSecondary,
                fontFamily: fontB,
                fontSize: "13px",
                fontWeight: tab.id === activeTab ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          style={{
            padding: "12px 0",
            fontSize: "13px",
            color: colors.textSecondary,
            lineHeight: 1.6,
            fontFamily: fontB,
          }}
        >
          {activeTab === "account" &&
            "Make changes to your account here. Click save when you're done."}
          {activeTab === "password" &&
            "Change your password here. After saving, you'll be logged out."}
          {activeTab === "notifications" &&
            "Configure how and when you receive notifications."}
        </div>
      </div>
      <CodePreview
        reactCode={generateReactCode("Tabs", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Tabs", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Tabs", state)}
        tailwindCode={generateTailwindV4ComponentCode("Tabs", state)}
        colors={colors}
      />
    </div>
  );
}

function AccordionShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, state, fontH, fontB } = props;
  const [openItem, setOpenItem] = useState<number | null>(0);

  const items = [
    {
      title: "Is it accessible?",
      content:
        "Yes. It adheres to the WAI-ARIA design pattern and supports keyboard navigation.",
    },
    {
      title: "Is it styled?",
      content:
        "Yes. It comes with default styles that matches the other components' aesthetic, fully customizable.",
    },
    {
      title: "Is it animated?",
      content:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ];

  return (
    <div>
      <div
        style={{
          borderRadius: radius,
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              borderBottom:
                i < items.length - 1 ? `1px solid ${colors.border}` : "none",
            }}
          >
            <button
              onClick={() => setOpenItem(openItem === i ? null : i)}
              style={{
                width: "100%",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: fontH,
                fontSize: "14px",
                fontWeight: 600,
                color: colors.text,
              }}
            >
              {item.title}
              <ChevronDown
                size={14}
                style={{
                  transition: "transform 0.2s ease",
                  transform: openItem === i ? "rotate(180deg)" : "rotate(0deg)",
                  color: colors.textSecondary,
                }}
              />
            </button>
            {openItem === i && (
              <div
                style={{
                  padding: "0 16px 14px",
                  fontFamily: fontB,
                  fontSize: "13px",
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <CodePreview
        reactCode={generateReactCode("Accordion", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Accordion", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Accordion", state)}
        tailwindCode={generateTailwindV4ComponentCode("Accordion", state)}
        colors={colors}
      />
    </div>
  );
}

function DialogShowcase(props: ShowcaseProps) {
  const {
    design,
    colors,
    radius,
    borderW,
    shadow,
    card,
    btn,
    state,
    fontH,
    fontB,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button style={btn("primary")} onClick={() => setOpen(true)}>
        Open Dialog
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              ...card({ maxWidth: "420px", width: "90%" } as CSSProperties),
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontFamily: fontH,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: colors.text,
                }}
              >
                Edit Profile
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: colors.textSecondary,
                  padding: "4px",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                marginBottom: "16px",
                fontFamily: fontB,
              }}
            >
              Make changes to your profile here. Click save when you&apos;re
              done.
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: colors.text,
                    marginBottom: "6px",
                    fontFamily: fontB,
                  }}
                >
                  Name
                </label>
                <input style={props.inp()} defaultValue="John Doe" />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: colors.text,
                    marginBottom: "6px",
                    fontFamily: fontB,
                  }}
                >
                  Email
                </label>
                <input style={props.inp()} defaultValue="john@example.com" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                paddingTop: "12px",
                borderTop: `1px solid ${hexToRgba(colors.border, 0.5)}`,
              }}
            >
              <button
                style={btn("ghost", { fontSize: "12px" })}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                style={btn("primary", { fontSize: "12px" })}
                onClick={() => setOpen(false)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
      <CodePreview
        reactCode={generateReactCode("Dialog", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Dialog", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Dialog", state)}
        tailwindCode={generateTailwindV4ComponentCode("Dialog", state)}
        colors={colors}
      />
    </div>
  );
}

function ProgressShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, state, fontB } = props;

  const trackStyle = (extraBorder?: string): CSSProperties => ({
    width: "100%",
    height: design === "neobrutalism" ? "12px" : "8px",
    backgroundColor: colors.muted,
    borderRadius:
      parseInt(radius) > 0 ? `${Math.min(parseInt(radius), 8)}px` : "0px",
    overflow: "hidden",
    position: "relative",
    ...(design === "neobrutalism"
      ? { border: `2px solid ${colors.border}` }
      : {}),
    ...(design === "neumorphism"
      ? {
          boxShadow: `inset 2px 2px 4px ${hexToRgba(colors.shadow, 0.3)}, inset -2px -2px 4px rgba(255,255,255,0.5)`,
        }
      : {}),
    ...(extraBorder
      ? { border: `1px solid ${hexToRgba(extraBorder, 0.3)}` }
      : {}),
  });

  const fillStyle = (width: number, color: string): CSSProperties => ({
    height: "100%",
    width: `${width}%`,
    backgroundColor: color,
    borderRadius: "inherit",
    transition: "width 0.5s ease",
    ...(design === "aurora"
      ? {
          background: `linear-gradient(90deg, ${color}, ${hexToRgba(color, 0.6)})`,
        }
      : {}),
    ...(design === "cyberpunk"
      ? { boxShadow: `0 0 8px ${hexToRgba(color, 0.4)}` }
      : {}),
  });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {[
          { label: "Project Alpha", value: 75, color: colors.primary },
          { label: "Project Beta", value: 45, color: colors.secondary },
          { label: "Project Gamma", value: 90, color: colors.success },
          { label: "Project Delta", value: 20, color: colors.warning },
        ].map((p) => (
          <div key={p.label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: colors.text,
                  fontFamily: fontB,
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: p.color,
                  fontFamily: fontB,
                }}
              >
                {p.value}%
              </span>
            </div>
            <div
              style={trackStyle(design === "cyberpunk" ? p.color : undefined)}
            >
              <div style={fillStyle(p.value, p.color)} />
            </div>
          </div>
        ))}
      </div>
      <CodePreview
        reactCode={generateReactCode("Progress", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Progress", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Progress", state)}
        tailwindCode={generateTailwindV4ComponentCode("Progress", state)}
        colors={colors}
      />
    </div>
  );
}

function SeparatorShowcase(props: ShowcaseProps) {
  const { colors, radius, borderW, state, fontB, design } = props;
  return (
    <div>
      <div
        style={{
          fontSize: "13px",
          color: colors.text,
          fontFamily: fontB,
          marginBottom: "8px",
        }}
      >
        Content above the separator
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: colors.border,
          margin: "16px 0",
        }}
      />
      <div
        style={{
          fontSize: "13px",
          color: colors.text,
          fontFamily: fontB,
          marginBottom: "20px",
        }}
      >
        Content below the separator
      </div>

      {/* Labeled separator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          margin: "20px 0",
        }}
      >
        <div
          style={{ flex: 1, height: "1px", backgroundColor: colors.border }}
        />
        <span
          style={{
            fontSize: "12px",
            color: colors.textSecondary,
            fontFamily: fontB,
          }}
        >
          OR
        </span>
        <div
          style={{ flex: 1, height: "1px", backgroundColor: colors.border }}
        />
      </div>

      {/* Vertical separator demo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          height: "40px",
        }}
      >
        <span
          style={{ fontSize: "13px", color: colors.text, fontFamily: fontB }}
        >
          Left
        </span>
        <div
          style={{
            width: "1px",
            alignSelf: "stretch",
            backgroundColor: colors.border,
          }}
        />
        <span
          style={{ fontSize: "13px", color: colors.text, fontFamily: fontB }}
        >
          Center
        </span>
        <div
          style={{
            width: "1px",
            alignSelf: "stretch",
            backgroundColor: colors.border,
          }}
        />
        <span
          style={{ fontSize: "13px", color: colors.text, fontFamily: fontB }}
        >
          Right
        </span>
      </div>
      <CodePreview
        reactCode={generateReactCode("Separator", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Separator", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Separator", state)}
        tailwindCode={generateTailwindV4ComponentCode("Separator", state)}
        colors={colors}
      />
    </div>
  );
}

function SkeletonShowcase(props: ShowcaseProps) {
  const { colors, radius, borderW, state, fontB, design } = props;

  const skeletonStyle = (w: string, h: string, br?: string): CSSProperties => ({
    width: w,
    height: h,
    borderRadius: br || radius,
    backgroundColor: colors.muted,
    animation: "dtPulse 2s ease-in-out infinite",
  });

  return (
    <div>
      {/* Card skeleton */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <div style={skeletonStyle("48px", "48px", "50%")} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={skeletonStyle("60%", "16px")} />
          <div style={skeletonStyle("80%", "12px")} />
          <div style={skeletonStyle("40%", "12px")} />
        </div>
      </div>
      {/* Text skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={skeletonStyle("100%", "14px")} />
        <div style={skeletonStyle("90%", "14px")} />
        <div style={skeletonStyle("70%", "14px")} />
      </div>
      <CodePreview
        reactCode={generateReactCode("Skeleton", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Skeleton", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Skeleton", state)}
        tailwindCode={generateTailwindV4ComponentCode("Skeleton", state)}
        colors={colors}
      />
    </div>
  );
}

function TableShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, badge, btn, state, fontH, fontB } =
    props;

  const cellStyle: CSSProperties = {
    padding: "10px 14px",
    fontFamily: fontB,
    fontSize: "13px",
    color: colors.text,
    borderBottom: `1px solid ${hexToRgba(colors.border, 0.5)}`,
    whiteSpace: "nowrap",
  };

  const thStyle: CSSProperties = {
    ...cellStyle,
    fontWeight: 600,
    fontSize: "11px",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backgroundColor: colors.surface,
    textAlign: "left",
  };

  const data = [
    {
      id: "INV-001",
      customer: "Sarah Chen",
      amount: "$2,400",
      status: "success",
      statusLabel: "Paid",
      date: "Dec 14",
    },
    {
      id: "INV-002",
      customer: "Marcus Johnson",
      amount: "$1,800",
      status: "warning",
      statusLabel: "Pending",
      date: "Dec 13",
    },
    {
      id: "INV-003",
      customer: "Aisha Patel",
      amount: "$3,200",
      status: "success",
      statusLabel: "Paid",
      date: "Dec 12",
    },
    {
      id: "INV-004",
      customer: "David Kim",
      amount: "$960",
      status: "destructive",
      statusLabel: "Overdue",
      date: "Dec 10",
    },
  ];

  return (
    <div>
      <div
        style={{
          overflowX: "auto",
          borderRadius: radius,
          border: `1px solid ${colors.border}`,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Invoice</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor:
                    i % 2 === 1 ? hexToRgba(colors.muted, 0.2) : "transparent",
                }}
              >
                <td style={{ ...cellStyle, fontWeight: 600 }}>{row.id}</td>
                <td style={cellStyle}>{row.customer}</td>
                <td style={{ ...cellStyle, fontWeight: 600 }}>{row.amount}</td>
                <td style={cellStyle}>
                  <span
                    style={badge(
                      row.status as "success" | "warning" | "destructive",
                    )}
                  >
                    {row.statusLabel}
                  </span>
                </td>
                <td style={cellStyle}>{row.date}</td>
                <td style={{ ...cellStyle, textAlign: "right" }}>
                  <button style={btn("ghost", { padding: "4px" })}>
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CodePreview
        reactCode={generateReactCode("Table", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Table", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Table", state)}
        tailwindCode={generateTailwindV4ComponentCode("Table", state)}
        colors={colors}
      />
    </div>
  );
}

function TooltipShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, shadow, btn, state, fontH, fontB } =
    props;

  const tooltipStyle: CSSProperties = {
    position: "absolute",
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "8px 14px",
    borderRadius: radius,
    fontSize: "12px",
    fontFamily: fontB,
    fontWeight: 500,
    whiteSpace: "nowrap",
    zIndex: 50,
    color: "#FFFFFF",
    backgroundColor: colors.text,
    ...(design === "neobrutalism"
      ? {
          border: `2px solid ${colors.border}`,
          boxShadow: `3px 3px 0px 0px ${colors.shadow}`,
          backgroundColor: colors.primary,
          fontWeight: 700,
        }
      : {}),
    ...(design === "glassmorphism"
      ? {
          backgroundColor: hexToRgba(colors.surface, 0.8),
          backdropFilter: "blur(16px)",
          border: `1px solid ${colors.border}`,
          color: colors.text,
        }
      : {}),
    ...(design === "cyberpunk"
      ? {
          backgroundColor: colors.surface,
          border: `1px solid ${colors.primary}`,
          color: colors.primary,
          boxShadow: `0 0 10px ${hexToRgba(colors.primary, 0.3)}`,
          fontFamily: fontH,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontSize: "10px",
        }
      : {}),
    ...(design === "aurora"
      ? {
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          border: "none",
        }
      : {}),
  };

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          padding: "40px 0 20px",
        }}
      >
        {[
          { label: "Edit", icon: Edit },
          { label: "Delete", icon: Trash2 },
          { label: "Settings", icon: Settings },
          { label: "Notifications", icon: Bell },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {hoveredIdx === i && <div style={tooltipStyle}>{item.label}</div>}
              <button style={btn("outline", { padding: "8px" })}>
                <Icon size={16} />
              </button>
            </div>
          );
        })}
      </div>
      <CodePreview
        reactCode={generateReactCode("Tooltip", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Tooltip", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Tooltip", state)}
        tailwindCode={generateTailwindV4ComponentCode("Tooltip", state)}
        colors={colors}
      />
    </div>
  );
}

function TextareaShowcase(props: ShowcaseProps) {
  const { design, colors, radius, borderW, inp, state, fontH, fontB } = props;
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: colors.text,
              marginBottom: "6px",
              fontFamily: fontB,
            }}
          >
            Bio
          </label>
          <textarea
            style={
              {
                ...inp(),
                minHeight: "100px",
                resize: "vertical",
              } as CSSProperties
            }
            placeholder="Tell us about yourself..."
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: colors.text,
              marginBottom: "6px",
              fontFamily: fontB,
            }}
          >
            Feedback
          </label>
          <textarea
            style={
              {
                ...inp(),
                minHeight: "100px",
                resize: "vertical",
              } as CSSProperties
            }
            placeholder="Share your feedback..."
          />
        </div>
      </div>
      <CodePreview
        reactCode={generateReactCode("Textarea", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        svelteCode={generateSvelteCode("Textarea", {
          activeDesign: design,
          colors,
          borderRadius: radius,
          borderWidth: borderW,
          themeMode: state.themeMode,
          fontHeading: state.fontHeading,
          fontBody: state.fontBody,
        })}
        cssCode={extractComponentCSS("Textarea", state)}
        tailwindCode={generateTailwindV4ComponentCode("Textarea", state)}
        colors={colors}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CSS EXTRACTION HELPER
// ═══════════════════════════════════════════════════════════════════════════

function extractComponentCSS(
  componentName: string,
  state: ReturnType<typeof useDesign>["state"],
): string {
  const fullCSS = generateComponentCSS(state);
  // Extract the relevant section
  const sections: Record<string, { start: string; end: string }> = {
    Button: { start: "/* ── Button", end: "/* ── Card" },
    Card: { start: "/* ── Card", end: "/* ── Input" },
    Input: { start: "/* ── Input", end: "/* ── Badge" },
    Badge: { start: "/* ── Badge", end: "/* ── Toggle" },
    Toggle: { start: "/* ── Toggle", end: "/* ── Alert" },
    Alert: { start: "/* ── Alert", end: "/* ── Avatar" },
    Avatar: { start: "/* ── Avatar", end: "/* ── Tooltip" },
    Tooltip: { start: "/* ── Tooltip", end: "/* ── Utility" },
    Select: { start: "/* ── Input", end: "/* ── Badge" },
    Checkbox: { start: "/* ── Toggle", end: "/* ── Alert" },
    Radio: { start: "/* ── Toggle", end: "/* ── Alert" },
    Accordion: { start: "/* ── Card", end: "/* ── Input" },
    Dialog: { start: "/* ── Card", end: "/* ── Input" },
    Tabs: { start: "/* ── Base body", end: "/* ── Button" },
    Progress: { start: "/* ── Toggle", end: "/* ── Alert" },
    Separator: { start: "/* ── Utility", end: "ENDOFFILE" },
    Skeleton: { start: "/* ── Utility", end: "ENDOFFILE" },
    Table: { start: "/* ── Base body", end: "/* ── Button" },
    Textarea: { start: "/* ── Input", end: "/* ── Badge" },
  };

  const section = sections[componentName];
  if (!section) return fullCSS;

  const startIdx = fullCSS.indexOf(section.start);
  let endIdx =
    section.end === "ENDOFFILE" ? fullCSS.length : fullCSS.indexOf(section.end);
  if (startIdx === -1) return `/* ${componentName} CSS */\n${fullCSS}`;
  if (endIdx === -1) endIdx = fullCSS.length;

  return fullCSS.slice(startIdx, endIdx).trim();
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT: ComponentShowcase
// ═══════════════════════════════════════════════════════════════════════════

const COMPONENT_LIST: {
  id: string;
  label: string;
  icon: React.ReactNode;
  desc: string;
}[] = [
  {
    id: "Button",
    label: "Button",
    icon: <RectangleHorizontal size={12} />,
    desc: "Clickable action elements in multiple variants",
  },
  {
    id: "Card",
    label: "Card",
    icon: <CreditCard size={12} />,
    desc: "Container for content and actions",
  },
  {
    id: "Input",
    label: "Input",
    icon: <TextCursorInput size={12} />,
    desc: "Text input fields with labels",
  },
  {
    id: "Textarea",
    label: "Textarea",
    icon: <FileText size={12} />,
    desc: "Multi-line text input",
  },
  {
    id: "Select",
    label: "Select",
    icon: <ListFilter size={12} />,
    desc: "Dropdown selection component",
  },
  {
    id: "Badge",
    label: "Badge",
    icon: <Tag size={12} />,
    desc: "Status labels and tags",
  },
  {
    id: "Toggle",
    label: "Toggle",
    icon: <ToggleLeft size={12} />,
    desc: "Switch controls for settings",
  },
  {
    id: "Checkbox",
    label: "Checkbox",
    icon: <CheckSquare size={12} />,
    desc: "Multi-select checkboxes",
  },
  {
    id: "Radio",
    label: "Radio",
    icon: <Circle size={12} />,
    desc: "Single selection radio buttons",
  },
  {
    id: "Tabs",
    label: "Tabs",
    icon: <PanelTop size={12} />,
    desc: "Tabbed content navigation",
  },
  {
    id: "Accordion",
    label: "Accordion",
    icon: <ChevronsDown size={12} />,
    desc: "Collapsible content sections",
  },
  {
    id: "Dialog",
    label: "Dialog",
    icon: <MessageSquare size={12} />,
    desc: "Modal dialog overlay",
  },
  {
    id: "Alert",
    label: "Alert",
    icon: <AlertTriangle size={12} />,
    desc: "Notification and alert messages",
  },
  {
    id: "Avatar",
    label: "Avatar",
    icon: <UserCircle size={12} />,
    desc: "User profile images and initials",
  },
  {
    id: "Tooltip",
    label: "Tooltip",
    icon: <MessageCircle size={12} />,
    desc: "Hover information popups",
  },
  {
    id: "Progress",
    label: "Progress",
    icon: <BarChart3 size={12} />,
    desc: "Progress bar indicators",
  },
  {
    id: "Table",
    label: "Table",
    icon: <Table2 size={12} />,
    desc: "Data table with columns",
  },
  {
    id: "Separator",
    label: "Separator",
    icon: <Minus size={12} />,
    desc: "Visual dividers",
  },
  {
    id: "Skeleton",
    label: "Skeleton",
    icon: <Loader size={12} />,
    desc: "Loading placeholder animations",
  },
];

export function ComponentShowcase() {
  const { state } = useDesign();
  const { activeDesign, colors, borderRadius, borderWidth, themeMode } = state;
  const preset = designPresets[activeDesign];
  const shadow = preset.shadowStyle[themeMode];
  const c = colors as unknown as Record<string, string>;

  const [activeComponent, setActiveComponent] = useState("Button");

  const fontH = `"${state.fontHeading}", system-ui, sans-serif`;
  const fontB = `"${state.fontBody}", system-ui, sans-serif`;

  const card = (extra?: CSSProperties) => ({
    ...getCardStyle(activeDesign, c, borderRadius, borderWidth, shadow),
    ...extra,
  });

  const btn = (
    v: "primary" | "secondary" | "outline" | "ghost" | "destructive",
    extra?: CSSProperties,
  ) => ({
    ...getButtonStyle(v, activeDesign, c, borderRadius, borderWidth, shadow),
    ...extra,
  });

  const inp = (extra?: CSSProperties) => ({
    ...getInputStyle(activeDesign, c, borderRadius, borderWidth),
    ...extra,
  });

  const badge = (
    v: "default" | "success" | "warning" | "destructive" | "outline",
  ) => getBadgeStyle(v, activeDesign, c);

  const showcaseProps: ShowcaseProps = {
    design: activeDesign,
    colors: c,
    radius: borderRadius,
    borderW: borderWidth,
    shadow,
    fontH,
    fontB,
    card,
    btn,
    inp,
    badge,
    state,
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Button":
        return <ButtonShowcase {...showcaseProps} />;
      case "Card":
        return <CardShowcase {...showcaseProps} />;
      case "Input":
        return <InputShowcase {...showcaseProps} />;
      case "Textarea":
        return <TextareaShowcase {...showcaseProps} />;
      case "Select":
        return <SelectShowcase {...showcaseProps} />;
      case "Badge":
        return <BadgeShowcase {...showcaseProps} />;
      case "Toggle":
        return <ToggleShowcase {...showcaseProps} />;
      case "Checkbox":
        return <CheckboxShowcase {...showcaseProps} />;
      case "Radio":
        return <RadioShowcase {...showcaseProps} />;
      case "Tabs":
        return <TabsShowcase {...showcaseProps} />;
      case "Accordion":
        return <AccordionShowcase {...showcaseProps} />;
      case "Dialog":
        return <DialogShowcase {...showcaseProps} />;
      case "Alert":
        return <AlertShowcase {...showcaseProps} />;
      case "Avatar":
        return <AvatarShowcase {...showcaseProps} />;
      case "Tooltip":
        return <TooltipShowcase {...showcaseProps} />;
      case "Progress":
        return <ProgressShowcase {...showcaseProps} />;
      case "Table":
        return <TableShowcase {...showcaseProps} />;
      case "Separator":
        return <SeparatorShowcase {...showcaseProps} />;
      case "Skeleton":
        return <SkeletonShowcase {...showcaseProps} />;
      default:
        return <div>Select a component</div>;
    }
  };

  const activeInfo = COMPONENT_LIST.find((c) => c.id === activeComponent);

  return (
    <div style={{ fontFamily: fontB }}>
      {/* Skeleton animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes dtPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`,
        }}
      />

      {/* Component navigation */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "20px",
          padding: "12px",
          borderRadius: borderRadius,
          border: `1px solid ${hexToRgba(c.border, 0.5)}`,
          backgroundColor: hexToRgba(c.surface, 0.3),
        }}
      >
        {COMPONENT_LIST.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setActiveComponent(comp.id)}
            style={{
              padding: "6px 14px",
              borderRadius: parseInt(borderRadius) > 8 ? "8px" : borderRadius,
              border:
                comp.id === activeComponent
                  ? `1.5px solid ${c.primary}`
                  : `1px solid ${hexToRgba(c.border, 0.5)}`,
              backgroundColor:
                comp.id === activeComponent
                  ? hexToRgba(c.primary, 0.12)
                  : "transparent",
              color: comp.id === activeComponent ? c.primary : c.textSecondary,
              fontSize: "12px",
              fontWeight: comp.id === activeComponent ? 600 : 400,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {comp.icon}
            {comp.label}
          </button>
        ))}
      </div>

      {/* Component header */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "4px",
          }}
        >
          <h2
            style={{
              fontFamily: fontH,
              fontSize: "20px",
              fontWeight: 700,
              color: c.text,
              margin: 0,
            }}
          >
            {activeInfo?.label}
          </h2>
        </div>
        <p style={{ fontSize: "13px", color: c.textSecondary, margin: 0 }}>
          {activeInfo?.desc}
        </p>
      </div>

      {/* Component preview */}
      <div
        style={{
          ...card({ padding: "20px" }),
          marginBottom: "8px",
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
}
