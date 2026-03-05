"use client";

import React, { useState, type CSSProperties } from "react";
import { useDesign } from "../../lib/design-context";
import { Layers, Sliders, Mail } from "lucide-react";
import { useChromeColors, useIsMobile } from "./hooks";
import { DesignPicker } from "./design-picker";
import { DashboardPreview } from "../previews/dashboard-preview";
import { MailsPreview } from "../previews/mails-preview";
import { ComponentShowcase } from "../component-showcase";

type ViewTab = "dashboard" | "mails" | "components";

export function CenterArea() {
  const c = useChromeColors();
  const { state } = useDesign();
  const isMobile = useIsMobile();
  const [activeView, setActiveView] = useState<ViewTab>("dashboard");

  const tabStyle = (active: boolean): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: isMobile ? "8px 14px" : "9px 20px",
    borderRadius: "9px",
    border: active ? `1.5px solid ${c.accent}` : `1px solid ${c.panelBorder}`,
    backgroundColor: active ? c.activeBg : "transparent",
    color: active ? c.accentText : c.textSecondary,
    fontSize: isMobile ? "12px" : "13px",
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
  });

  return (
    <main
      style={{
        flex: 1,
        minWidth: 0,
        height: isMobile ? "auto" : "calc(100vh - 56px)",
        overflowY: "auto",
        backgroundColor: c.pageBg,
        fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
        scrollbarWidth: "thin",
        scrollbarColor: `${c.inputBorder} transparent`,
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          padding: isMobile ? "16px 12px" : "24px 28px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <DesignPicker />

        {/* View switcher tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <button
            onClick={() => setActiveView("dashboard")}
            style={tabStyle(activeView === "dashboard")}
          >
            <Layers size={14} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveView("mails")}
            style={tabStyle(activeView === "mails")}
          >
            <Mail size={14} />
            Mails
          </button>
          <button
            onClick={() => setActiveView("components")}
            style={tabStyle(activeView === "components")}
          >
            <Sliders size={14} />
            Components
          </button>
          {activeView === "components" && !isMobile && (
            <span
              style={{
                fontSize: "11px",
                color: c.textMuted,
                marginLeft: "4px",
                fontStyle: "italic",
              }}
            >
              Copy-paste ready for React, Svelte & Tailwind v4
            </span>
          )}
        </div>

        {activeView === "dashboard" ? (
          /* Dashboard preview - uses the active design's own background */
          <div
            style={{
              borderRadius: "14px",
              border: `1px solid ${c.panelBorder}`,
              backgroundColor: state.colors.background,
              color: state.colors.text,
              fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
              overflow: "auto",
              padding: isMobile ? "12px" : "20px",
              WebkitOverflowScrolling: "touch",
              transition: "all 0.3s ease",
            }}
          >
            <DashboardPreview />
          </div>
        ) : activeView === "mails" ? (
          /* Mails preview - uses the active design's own background */
          <div
            style={{
              borderRadius: "14px",
              border: `1px solid ${c.panelBorder}`,
              backgroundColor: state.colors.background,
              color: state.colors.text,
              fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
              overflow: "auto",
              padding: isMobile ? "12px" : "20px",
              WebkitOverflowScrolling: "touch",
              transition: "all 0.3s ease",
            }}
          >
            <MailsPreview />
          </div>
        ) : (
          /* Components showcase with copy-paste code */
          <div
            style={{
              borderRadius: "14px",
              border: `1px solid ${c.panelBorder}`,
              backgroundColor: state.colors.background,
              color: state.colors.text,
              fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
              overflow: "auto",
              padding: isMobile ? "12px" : "20px",
              WebkitOverflowScrolling: "touch",
              transition: "all 0.3s ease",
            }}
          >
            <ComponentShowcase />
          </div>
        )}

        <div style={{ height: "40px" }} />
      </div>
    </main>
  );
}
