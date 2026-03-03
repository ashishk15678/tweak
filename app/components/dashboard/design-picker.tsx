"use client";

import React from "react";
import { useDesign } from "../../lib/design-context";
import { designPresets } from "../../lib/design-store";
import { useChromeColors, useIsMobile } from "./hooks";

export function DesignPicker() {
  const { state, setDesign } = useDesign();
  const c = useChromeColors();
  const isMobile = useIsMobile();
  const designs = Object.values(designPresets);

  return (
    <div style={{ marginBottom: "20px" }}>
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
        Design Style
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {designs.map((preset) => {
          const active = state.activeDesign === preset.id;
          const presetColors = preset.colors[state.themeMode];
          return (
            <button
              key={preset.id}
              onClick={() => setDesign(preset.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "0",
                padding: "0",
                borderRadius: "12px",
                border: `1.5px solid ${active ? c.activeBorder : c.panelBorder}`,
                backgroundColor: active ? c.activeBg : c.panelBg,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                minWidth: isMobile ? "90px" : "110px",
                flexShrink: 0,
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = c.hoverBg;
                  e.currentTarget.style.borderColor = c.inputBorder;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = c.panelBg;
                  e.currentTarget.style.borderColor = c.panelBorder;
                }
              }}
            >
              {/* Color bar at top */}
              <div
                style={{
                  height: "4px",
                  background: `linear-gradient(90deg, ${presetColors.primary}, ${presetColors.secondary}, ${presetColors.accent})`,
                  width: "100%",
                }}
              />
              <div
                style={{
                  padding: isMobile ? "10px 12px" : "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: 600,
                    color: active ? c.accentText : c.textPrimary,
                    whiteSpace: "nowrap",
                  }}
                >
                  {preset.name}
                </span>
                {!isMobile && (
                  <span
                    style={{
                      fontSize: "10px",
                      color: active ? c.accentText : c.textMuted,
                      lineHeight: 1.3,
                      textAlign: "center",
                      maxWidth: "120px",
                    }}
                  >
                    {preset.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
