"use client";

import React, { useState, useEffect } from "react";
import { useDesign } from "../../lib/design-context";
import {
  designPresets,
  type ExportPayload,
  generateExportCSS,
  generateTailwindV4Theme,
  generateComponentCSS,
} from "../../lib/design-store";
import {
  X,
  Copy,
  Check,
  Upload,
  FileCode2,
  Paintbrush,
  FileJson2,
  Layers,
} from "lucide-react";
import { useChromeColors, useIsMobile } from "./hooks";

/* ═══════════════════════════════════════════════════════════════════════════
   DRAWER OVERLAY (mobile side panels)
   ═══════════════════════════════════════════════════════════════════════════ */

export function DrawerOverlay({
  open,
  onClose,
  side,
  children,
}: {
  open: boolean;
  onClose: () => void;
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const c = useChromeColors();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open, isMobile]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: side === "left" ? "flex-start" : "flex-end",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(320px, 85vw)",
          height: "100%",
          backgroundColor: c.panelBg,
          borderRight: side === "left" ? `1px solid ${c.panelBorder}` : "none",
          borderLeft: side === "right" ? `1px solid ${c.panelBorder}` : "none",
          boxShadow:
            side === "left"
              ? "8px 0 24px rgba(0,0,0,0.2)"
              : "-8px 0 24px rgba(0,0,0,0.2)",
          animation:
            side === "left"
              ? "slideInLeft 0.2s ease"
              : "slideInRight 0.2s ease",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODAL BACKDROP
   ═══════════════════════════════════════════════════════════════════════════ */

export function ModalBackdrop({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const c = useChromeColors();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isMobile ? "100%" : "560px",
          maxWidth: isMobile ? "100%" : "90vw",
          maxHeight: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "16px 16px 0 0" : "16px",
          backgroundColor: c.panelBg,
          border: isMobile ? "none" : `1px solid ${c.panelBorder}`,
          borderTop: `1px solid ${c.panelBorder}`,
          boxShadow: "0 -8px 64px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: isMobile ? "slideUp 0.25s ease" : "modalIn 0.2s ease",
        }}
      >
        {/* Drag handle for mobile */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "8px 0 4px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "4px",
                borderRadius: "2px",
                backgroundColor: c.textMuted,
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORT MODAL
   ═══════════════════════════════════════════════════════════════════════════ */

export function ExportModal() {
  const { state, closeModal, getExportPayload } = useDesign();
  const c = useChromeColors();
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<
    "css" | "tailwind" | "json" | "components"
  >("components");
  const [copied, setCopied] = useState(false);

  const outputs: Record<string, string> = {
    css: generateExportCSS(state),
    tailwind: generateTailwindV4Theme(state),
    json: JSON.stringify(getExportPayload(), null, 2),
    components: generateComponentCSS(state),
  };

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputs[tab]);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = outputs[tab];
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "components" as const, label: "Components", icon: Layers },
    { id: "css" as const, label: "CSS Vars", icon: FileCode2 },
    { id: "tailwind" as const, label: "Tailwind v4", icon: Paintbrush },
    { id: "json" as const, label: "JSON", icon: FileJson2 },
  ];

  const preset = designPresets[state.activeDesign];

  return (
    <ModalBackdrop onClose={closeModal}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "12px 16px" : "16px 20px",
          borderBottom: `1px solid ${c.panelBorder}`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: 700,
              color: c.textPrimary,
            }}
          >
            Export Theme
          </div>
          <div
            style={{
              fontSize: "11px",
              color: c.textMuted,
              marginTop: "2px",
            }}
          >
            Plug-and-play styles for your project
          </div>
        </div>
        <button
          onClick={closeModal}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "7px",
            border: `1px solid ${c.panelBorder}`,
            backgroundColor: "transparent",
            color: c.textMuted,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "8px" : "16px",
          padding: isMobile ? "10px 16px" : "12px 20px",
          borderBottom: `1px solid ${c.panelBorder}`,
          flexWrap: "wrap",
          fontSize: "10px",
        }}
      >
        {[
          { l: "Design", v: preset.name },
          { l: "Mode", v: state.themeMode },
          ...(isMobile
            ? []
            : [
                { l: "Heading", v: state.fontHeading },
                { l: "Body", v: state.fontBody },
              ]),
          { l: "Radius", v: state.borderRadius },
        ].map((item) => (
          <div
            key={item.l}
            style={{ display: "flex", gap: "4px", alignItems: "center" }}
          >
            <span style={{ color: c.textMuted }}>{item.l}:</span>
            <span
              style={{
                color: c.accentText,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}
            >
              {item.v}
            </span>
          </div>
        ))}
        <div
          style={{
            marginLeft: isMobile ? "0" : "auto",
            width: "80px",
            height: "6px",
            borderRadius: "3px",
            overflow: "hidden",
            background: `linear-gradient(90deg, ${state.colors.primary}, ${state.colors.secondary}, ${state.colors.accent}, ${state.colors.success})`,
            border: `1px solid ${c.panelBorder}`,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          padding: isMobile ? "8px 12px 0" : "12px 20px 0",
          overflowX: "auto",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {tabs.map((t) => {
          const act = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: isMobile ? "8px 10px" : "7px 14px",
                borderRadius: "8px 8px 0 0",
                border: "none",
                backgroundColor: act ? c.activeBg : "transparent",
                color: act ? c.accentText : c.textMuted,
                fontSize: "11px",
                fontWeight: act ? 600 : 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <Icon size={12} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Code */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "8px 16px" : "8px 20px",
            borderBottom: `1px solid ${c.panelBorder}`,
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: c.textMuted,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {tab === "css"
              ? "styles.css"
              : tab === "tailwind"
                ? "globals.css (Tailwind v4)"
                : tab === "components"
                  ? "components.css"
                  : "theme.json"}
          </span>
          <button
            onClick={doCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : c.inputBorder}`,
              backgroundColor: copied ? "rgba(34,197,94,0.08)" : "transparent",
              color: copied ? "#22C55E" : c.textSecondary,
              fontSize: "11px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
              minHeight: "32px",
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre
          style={{
            flex: 1,
            margin: 0,
            padding: isMobile ? "12px 14px" : "16px 20px",
            fontSize: isMobile ? "10px" : "11px",
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            color: c.textSecondary,
            lineHeight: 1.7,
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            backgroundColor: c.codeBg,
            scrollbarWidth: "thin",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {outputs[tab]}
        </pre>
      </div>

      {/* Hint for components tab */}
      {tab === "components" && (
        <div
          style={{
            padding: isMobile ? "8px 14px" : "10px 20px",
            borderTop: `1px solid ${c.panelBorder}`,
            fontSize: "10px",
            color: c.textMuted,
            lineHeight: 1.5,
          }}
        >
          <strong>Usage:</strong> Copy this CSS into your project. Use classes
          like{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            .btn .btn-primary
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            .card
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            .input
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            .badge
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            .alert
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            .avatar
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            .tooltip
          </code>{" "}
          etc. in your HTML. Fully styled, plug-and-play.
        </div>
      )}

      {/* Hint for tailwind tab */}
      {tab === "tailwind" && (
        <div
          style={{
            padding: isMobile ? "8px 14px" : "10px 20px",
            borderTop: `1px solid ${c.panelBorder}`,
            fontSize: "10px",
            color: c.textMuted,
            lineHeight: 1.5,
          }}
        >
          <strong>Tailwind CSS v4:</strong> Paste this into your{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            globals.css
          </code>{" "}
          file. Then use classes like{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            bg-primary
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            text-accent
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            border-border
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            rounded-base
          </code>
          ,{" "}
          <code
            style={{
              padding: "1px 4px",
              borderRadius: "3px",
              backgroundColor: c.codeBg,
              fontSize: "10px",
            }}
          >
            font-heading
          </code>{" "}
          etc. in your components.
        </div>
      )}

      {/* Google Fonts snippet */}
      <div
        style={{
          padding: isMobile ? "10px 14px 14px" : "12px 20px 16px",
          borderTop: `1px solid ${c.panelBorder}`,
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: c.textMuted,
            marginBottom: "6px",
          }}
        >
          Google Fonts &lt;link&gt;
        </div>
        <code
          style={{
            display: "block",
            padding: "8px 10px",
            borderRadius: "8px",
            backgroundColor: c.codeBg,
            fontSize: "9px",
            fontFamily: "'JetBrains Mono', monospace",
            color: c.textMuted,
            lineHeight: 1.5,
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
          }}
        >
          {`<link href="https://fonts.googleapis.com/css2?family=${state.fontHeading.replace(/ /g, "+")}:wght@400;500;600;700&family=${state.fontBody.replace(/ /g, "+")}:wght@300;400;500;600&display=swap" rel="stylesheet">`}
        </code>
      </div>
    </ModalBackdrop>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   IMPORT MODAL
   ═══════════════════════════════════════════════════════════════════════════ */

export function ImportModal() {
  const { closeModal, importFromPayload } = useDesign();
  const c = useChromeColors();
  const isMobile = useIsMobile();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const doImport = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input) as ExportPayload;
      const ok = importFromPayload(parsed);
      if (!ok) {
        setError(
          "Invalid payload format. Make sure it was exported from DesignTweak.",
        );
      }
    } catch {
      setError("Could not parse JSON. Please paste a valid export.");
    }
  };

  return (
    <ModalBackdrop onClose={closeModal}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "12px 16px" : "16px 20px",
          borderBottom: `1px solid ${c.panelBorder}`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: 700,
              color: c.textPrimary,
            }}
          >
            Import Theme
          </div>
          <div
            style={{ fontSize: "11px", color: c.textMuted, marginTop: "2px" }}
          >
            Paste a JSON export to load a style
          </div>
        </div>
        <button
          onClick={closeModal}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "7px",
            border: `1px solid ${c.panelBorder}`,
            backgroundColor: "transparent",
            color: c.textMuted,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          padding: isMobile ? "16px" : "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder={`Paste JSON here...\n\n{\n  "version": 1,\n  "activeDesign": "neobrutalism",\n  ...\n}`}
          rows={isMobile ? 8 : 12}
          style={{
            flex: 1,
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: `1px solid ${error ? "rgba(239,68,68,0.4)" : c.inputBorder}`,
            backgroundColor: c.codeBg,
            color: c.textPrimary,
            fontSize: "12px",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.6,
            resize: "none",
            outline: "none",
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = c.accent;
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = c.inputBorder;
          }}
        />

        {error && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              backgroundColor: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#EF4444",
              fontSize: "12px",
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          padding: isMobile ? "12px 16px 20px" : "12px 20px 16px",
          borderTop: `1px solid ${c.panelBorder}`,
        }}
      >
        <button
          onClick={closeModal}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: `1px solid ${c.panelBorder}`,
            backgroundColor: "transparent",
            color: c.textSecondary,
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            minHeight: "40px",
          }}
        >
          Cancel
        </button>
        <button
          onClick={doImport}
          disabled={!input.trim()}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: !input.trim() ? c.inputBg : c.accent,
            color: !input.trim() ? c.textMuted : "#FFFFFF",
            fontSize: "12px",
            fontWeight: 600,
            cursor: !input.trim() ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            minHeight: "40px",
          }}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
          >
            <Upload size={13} />
            Import
          </span>
        </button>
      </div>
    </ModalBackdrop>
  );
}
