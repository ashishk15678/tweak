"use client";

import React, { useState } from "react";
import { DesignProvider, useDesign } from "../../lib/design-context";
import { useChromeColors, useIsMobile } from "./hooks";
import { GlobalStyles } from "./global-styles";
import { TopBar } from "./top-bar";
import { ColorsPanel } from "./colors-panel";
import { FontsPanel } from "./fonts-panel";
import { CenterArea } from "./center-area";
import { DrawerOverlay, ExportModal, ImportModal } from "./modals";

function DashboardInner() {
  const { state, modal } = useDesign();
  const c = useChromeColors();
  const isMobile = useIsMobile();

  const [colorsOpen, setColorsOpen] = useState(false);
  const [fontsOpen, setFontsOpen] = useState(false);

  const toggleColors = () => {
    setColorsOpen(!colorsOpen);
    setFontsOpen(false);
  };

  const toggleFonts = () => {
    setFontsOpen(!fontsOpen);
    setColorsOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: c.pageBg,
        color: c.textPrimary,
        fontFamily: `"${state.fontBody}", system-ui, sans-serif`,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <GlobalStyles />
      <TopBar
        onToggleColors={toggleColors}
        onToggleFonts={toggleFonts}
        colorsOpen={colorsOpen}
        fontsOpen={fontsOpen}
      />

      {isMobile ? (
        <>
          {/* Mobile: full-width center, drawers for panels */}
          <CenterArea />

          {/* Colors drawer */}
          <DrawerOverlay
            open={colorsOpen}
            onClose={() => setColorsOpen(false)}
            side="left"
          >
            <ColorsPanel onClose={() => setColorsOpen(false)} />
          </DrawerOverlay>

          {/* Fonts drawer */}
          <DrawerOverlay
            open={fontsOpen}
            onClose={() => setFontsOpen(false)}
            side="right"
          >
            <FontsPanel onClose={() => setFontsOpen(false)} />
          </DrawerOverlay>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            height: "calc(100vh - 56px)",
            overflow: "hidden",
          }}
        >
          {/* Left: Colors */}
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              height: "100%",
              position: "sticky",
              top: "56px",
              borderRight: `1px solid ${c.panelBorder}`,
              overflow: "hidden",
            }}
          >
            <ColorsPanel />
          </aside>

          {/* Center: Design picker + component previews */}
          <CenterArea />

          {/* Right: Fonts */}
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              height: "100%",
              position: "sticky",
              top: "56px",
              borderLeft: `1px solid ${c.panelBorder}`,
              overflow: "hidden",
            }}
          >
            <FontsPanel />
          </aside>
        </div>
      )}

      {/* Modals */}
      {modal === "export" && <ExportModal />}
      {modal === "import" && <ImportModal />}
    </div>
  );
}

export default function Dashboard() {
  return (
    <DesignProvider>
      <DashboardInner />
    </DesignProvider>
  );
}
