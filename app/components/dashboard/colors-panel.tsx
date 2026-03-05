"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDesign } from "../../lib/design-context";
import { colorPresets, type ColorTokens } from "../../lib/design-store";
import {
  RotateCcw,
  X,
  ChevronDown,
  ChevronUp,
  SwatchBook,
  Sliders,
} from "lucide-react";
import { useChromeColors, useIsMobile } from "./hooks";

const COLOR_TOKEN_META: Record<
  keyof ColorTokens,
  { label: string; desc: string }
> = {
  primary: { label: "Primary", desc: "Main brand / CTAs" },
  secondary: { label: "Secondary", desc: "Supporting brand" },
  accent: { label: "Accent", desc: "Highlights" },
  background: { label: "Background", desc: "Page background" },
  surface: { label: "Surface", desc: "Cards & panels" },
  text: { label: "Text", desc: "Primary text" },
  textSecondary: { label: "Text 2nd", desc: "Muted text" },
  border: { label: "Border", desc: "Outlines / dividers" },
  shadow: { label: "Shadow", desc: "Box-shadow color" },
  muted: { label: "Muted", desc: "Subtle backgrounds" },
  destructive: { label: "Destructive", desc: "Error / delete" },
  success: { label: "Success", desc: "Positive states" },
  warning: { label: "Warning", desc: "Caution states" },
};

function ColorSwatch({
  token,
  value,
  onChange,
}: {
  token: keyof ColorTokens;
  value: string;
  onChange: (t: keyof ColorTokens, v: string) => void;
}) {
  const c = useChromeColors();
  const meta = COLOR_TOKEN_META[token];
  const pickerRef = useRef<HTMLInputElement>(null);
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const isHex = (v: string) => /^#[0-9A-Fa-f]{3,8}$/.test(v);
  const displayHex = isHex(value) ? value : "#888888";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 8px",
        borderRadius: "8px",
        transition: "background 0.15s",
        minHeight: "44px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = c.hoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        onClick={() => pickerRef.current?.click()}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "7px",
          backgroundColor: displayHex,
          border: `2px solid ${c.panelBorder}`,
          cursor: "pointer",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <input
          ref={pickerRef}
          type="color"
          value={displayHex}
          onChange={(e) => {
            setLocal(e.target.value);
            onChange(token, e.target.value);
          }}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: c.textPrimary,
            lineHeight: 1.2,
          }}
        >
          {meta.label}
        </div>
        <div style={{ fontSize: "10px", color: c.textMuted, lineHeight: 1.2 }}>
          {meta.desc}
        </div>
      </div>
      <input
        type="text"
        value={local}
        onChange={(e) => {
          setLocal(e.target.value);
          if (isHex(e.target.value) || /^rgba?\(/.test(e.target.value)) {
            onChange(token, e.target.value);
          }
        }}
        style={{
          width: "72px",
          padding: "4px 6px",
          borderRadius: "5px",
          border: `1px solid ${c.inputBorder}`,
          backgroundColor: c.inputBg,
          color: c.textSecondary,
          fontSize: "10px",
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
          outline: "none",
          flexShrink: 0,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = c.accent)}
        onBlur={(e) => (e.currentTarget.style.borderColor = c.inputBorder)}
      />
    </div>
  );
}

export function ColorsPanel({ onClose }: { onClose?: () => void }) {
  const {
    state,
    setColor,
    setColors,
    resetColors,
    setBorderRadius,
    setBorderWidth,
  } = useDesign();
  const c = useChromeColors();
  const isMobile = useIsMobile();

  const [openSection, setOpenSection] = useState<string>("brand");

  const groups: {
    key: string;
    label: string;
    tokens: (keyof ColorTokens)[];
  }[] = [
    {
      key: "brand",
      label: "Brand",
      tokens: ["primary", "secondary", "accent"],
    },
    {
      key: "surfaces",
      label: "Surfaces & Text",
      tokens: [
        "background",
        "surface",
        "text",
        "textSecondary",
        "border",
        "shadow",
        "muted",
      ],
    },
    {
      key: "semantic",
      label: "Semantic",
      tokens: ["destructive", "success", "warning"],
    },
  ];

  const radiusOpts = [
    "0px",
    "4px",
    "8px",
    "12px",
    "16px",
    "20px",
    "24px",
    "999px",
  ];
  const borderOpts = ["0px", "1px", "2px", "3px", "4px"];

  const sectionHeader = (label: string, key: string) => (
    <button
      key={`hdr-${key}`}
      onClick={() => setOpenSection(openSection === key ? "" : key)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "8px 2px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "inherit",
        color: c.textMuted,
        marginTop: "8px",
        minHeight: "36px",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {label}
      </span>
      {openSection === key ? (
        <ChevronUp size={12} />
      ) : (
        <ChevronDown size={12} />
      )}
    </button>
  );

  const pillBtn = (
    label: string,
    active: boolean,
    onClick: () => void,
  ): React.ReactNode => (
    <button
      key={label}
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: `1px solid ${active ? c.activeBorder : c.inputBorder}`,
        backgroundColor: active ? c.activeBg : "transparent",
        color: active ? c.accentText : c.textSecondary,
        fontSize: "11px",
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.15s",
        minHeight: "32px",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: c.panelBg,
        overflowY: "auto",
        overflowX: "hidden",
        fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
        display: "flex",
        flexDirection: "column",
        scrollbarWidth: "thin",
        scrollbarColor: `${c.inputBorder} transparent`,
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Title */}
      <div
        style={{
          padding: "16px 16px 8px",
          borderBottom: `1px solid ${c.panelBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 700,
              color: c.textPrimary,
              marginBottom: "2px",
            }}
          >
            <SwatchBook size={14} />
            Colors
          </div>
          <div style={{ fontSize: "11px", color: c.textMuted }}>
            Customize every color token
          </div>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: `1px solid ${c.panelBorder}`,
              backgroundColor: "transparent",
              color: c.textMuted,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Quick presets */}
      <div style={{ padding: "12px 12px 4px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: c.textMuted,
            marginBottom: "8px",
          }}
        >
          Quick Palettes
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "4px",
          }}
        >
          {colorPresets.map((p) => {
            const pColors = Object.values(p.colors).slice(0, 3) as string[];
            return (
              <button
                key={p.id}
                onClick={() => setColors(p.colors)}
                title={p.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "0",
                  padding: "0",
                  borderRadius: "8px",
                  border: `1px solid ${c.panelBorder}`,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                  minHeight: "4px",
                  overflow: "hidden",
                  background: `linear-gradient(90deg, ${pColors[0]}, ${pColors[1] || pColors[0]}, ${pColors[2] || pColors[0]})`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = c.hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: c.textPrimary,
                    fontWeight: 500,
                    padding: "6px 2px ",
                  }}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
        <button
          onClick={resetColors}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            width: "100%",
            marginTop: "8px",
            padding: "8px",
            borderRadius: "6px",
            border: `1px solid ${c.panelBorder}`,
            backgroundColor: "transparent",
            color: c.textMuted,
            fontSize: "11px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            minHeight: "36px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = c.hoverBg;
            e.currentTarget.style.color = c.textSecondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = c.textMuted;
          }}
        >
          <RotateCcw size={11} /> Reset colors
        </button>
      </div>

      {/* Color groups */}
      <div style={{ padding: "4px 12px", flex: 1 }}>
        {groups.map((g) => (
          <React.Fragment key={g.key}>
            {sectionHeader(g.label, g.key)}
            {openSection === g.key && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  marginBottom: "4px",
                }}
              >
                {g.tokens.map((tok) => (
                  <ColorSwatch
                    key={tok}
                    token={tok}
                    value={state.colors[tok]}
                    onChange={setColor}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Shape controls */}
      <div
        style={{
          padding: "12px",
          borderTop: `1px solid ${c.panelBorder}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: c.textMuted,
            marginBottom: "10px",
          }}
        >
          <Sliders size={11} /> Shape
        </div>
        <div style={{ marginBottom: "8px" }}>
          <div
            style={{
              fontSize: "11px",
              color: c.textSecondary,
              marginBottom: "5px",
            }}
          >
            Radius:{" "}
            <span
              style={{
                color: c.accentText,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {state.borderRadius}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {radiusOpts.map((r) =>
              pillBtn(r, state.borderRadius === r, () => setBorderRadius(r)),
            )}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "11px",
              color: c.textSecondary,
              marginBottom: "5px",
            }}
          >
            Border:{" "}
            <span
              style={{
                color: c.accentText,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {state.borderWidth}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {borderOpts.map((w) =>
              pillBtn(w, state.borderWidth === w, () => setBorderWidth(w)),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
