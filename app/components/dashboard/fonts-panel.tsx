"use client";

import React from "react";
import { useDesign } from "../../lib/design-context";
import { fontOptions, type FontFamily } from "../../lib/design-store";
import { X, Type } from "lucide-react";
import { useChromeColors, useIsMobile } from "./hooks";

function FontCard({
  font,
  selected,
  onSelect,
}: {
  font: (typeof fontOptions)[number];
  selected: boolean;
  onSelect: (name: FontFamily) => void;
}) {
  const c = useChromeColors();
  return (
    <button
      onClick={() => onSelect(font.name)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "10px 10px",
        borderRadius: "9px",
        border: `1px solid ${selected ? c.activeBorder : "transparent"}`,
        backgroundColor: selected ? c.activeBg : "transparent",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
        textAlign: "left",
        minHeight: "44px",
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.backgroundColor = c.hoverBg;
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: selected ? c.accentText : c.textPrimary,
            fontFamily: `"${font.name}", system-ui, sans-serif`,
            lineHeight: 1.3,
          }}
        >
          {font.name}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: c.textMuted,
            fontFamily: `"${font.name}", system-ui, sans-serif`,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          {font.preview} — {font.category}
        </div>
      </div>
      {selected && (
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: c.accent,
            boxShadow: `0 0 6px ${c.accent}`,
            flexShrink: 0,
          }}
        />
      )}
    </button>
  );
}

export function FontsPanel({ onClose }: { onClose?: () => void }) {
  const { state, setFontHeading, setFontBody } = useDesign();
  const c = useChromeColors();
  const isMobile = useIsMobile();

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
            <Type size={14} />
            Fonts
          </div>
          <div style={{ fontSize: "11px", color: c.textMuted }}>
            Pick heading & body typefaces
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

      {/* Heading font */}
      <div style={{ padding: "12px 10px 4px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: c.textMuted,
            marginBottom: "6px",
            paddingLeft: "4px",
          }}
        >
          Heading Font
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {fontOptions.map((f) => (
            <FontCard
              key={`h-${f.name}`}
              font={f}
              selected={state.fontHeading === f.name}
              onSelect={setFontHeading}
            />
          ))}
        </div>
      </div>

      {/* Body font */}
      <div style={{ padding: "12px 10px 4px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: c.textMuted,
            marginBottom: "6px",
            paddingLeft: "4px",
          }}
        >
          Body Font
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {fontOptions.map((f) => (
            <FontCard
              key={`b-${f.name}`}
              font={f}
              selected={state.fontBody === f.name}
              onSelect={setFontBody}
            />
          ))}
        </div>
      </div>

      {/* Live preview */}
      <div
        style={{
          margin: "8px 10px 16px",
          padding: "16px",
          borderRadius: "12px",
          border: `1px solid ${c.panelBorder}`,
          backgroundColor: c.hoverBg,
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: c.textMuted,
            marginBottom: "10px",
          }}
        >
          Preview
        </div>
        <div
          style={{
            fontFamily: `"${state.fontHeading}", system-ui, sans-serif`,
            fontSize: "18px",
            fontWeight: 700,
            color: c.textPrimary,
            marginBottom: "6px",
            lineHeight: 1.3,
          }}
        >
          The Quick Brown Fox
        </div>
        <div
          style={{
            fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
            fontSize: "13px",
            color: c.textSecondary,
            lineHeight: 1.6,
          }}
        >
          The quick brown fox jumps over the lazy dog. Pack my box with five
          dozen liquor jugs.
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "12px",
          }}
        >
          <div>
            <span
              style={{ fontSize: "9px", color: c.textMuted, display: "block" }}
            >
              Heading
            </span>
            <span
              style={{
                fontSize: "11px",
                color: c.accentText,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {state.fontHeading}
            </span>
          </div>
          <div>
            <span
              style={{ fontSize: "9px", color: c.textMuted, display: "block" }}
            >
              Body
            </span>
            <span
              style={{
                fontSize: "11px",
                color: c.accentText,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {state.fontBody}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
