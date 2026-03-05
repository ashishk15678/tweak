"use client";

import React, { type CSSProperties } from "react";
import type { DesignStyle } from "../../lib/design-store";
import { hexToRgba } from "./style-helpers";

// ── MINI SPARKLINE (SVG) ─────────────────────────────────────────────────────

export function Sparkline({
  data,
  color,
  height = 40,
  width = 120,
}: {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padding = 2;
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data
    .map((v, i) => {
      const x = padding + i * stepX;
      const y =
        height - padding - ((v - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block" }}
    >
      <polygon points={areaPoints} fill={hexToRgba(color, 0.1)} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── MINI BAR CHART ───────────────────────────────────────────────────────────

export function MiniBarChart({
  data,
  color,
  secondaryColor,
  height = 100,
  barRadius,
}: {
  data: { label: string; value: number; prev: number }[];
  color: string;
  secondaryColor: string;
  height?: number;
  barRadius: string;
}) {
  const max = Math.max(...data.map((d) => Math.max(d.value, d.prev)));
  const br =
    parseInt(barRadius) > 8
      ? "6px"
      : parseInt(barRadius) > 0
        ? `${Math.min(parseInt(barRadius), 4)}px`
        : "0px";

  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: "8px", height }}
    >
      {data.map((d) => (
        <div
          key={d.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2px",
              height: height - 20,
            }}
          >
            <div
              style={{
                width: "14px",
                height: `${(d.prev / max) * (height - 20)}px`,
                backgroundColor: hexToRgba(secondaryColor, 0.3),
                borderRadius: `${br} ${br} 0 0`,
                transition: "all 0.3s ease",
              }}
            />
            <div
              style={{
                width: "14px",
                height: `${(d.value / max) * (height - 20)}px`,
                backgroundColor: color,
                borderRadius: `${br} ${br} 0 0`,
                transition: "all 0.3s ease",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "9px",
              color: "inherit",
              opacity: 0.5,
              fontFamily: "var(--font-body)",
            }}
          >
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────

export function ProgressBar({
  value,
  color,
  bgColor,
  radius,
  design,
  borderColor,
}: {
  value: number;
  color: string;
  bgColor: string;
  radius: string;
  design: DesignStyle;
  borderColor: string;
}) {
  const br =
    parseInt(radius) > 0 ? `${Math.min(parseInt(radius), 8)}px` : "0px";
  const trackStyle: CSSProperties = {
    width: "100%",
    height: "8px",
    backgroundColor: bgColor,
    borderRadius: br,
    overflow: "hidden",
    position: "relative",
  };

  if (design === "neobrutalism") {
    trackStyle.border = `2px solid ${borderColor}`;
    trackStyle.height = "12px";
  } else if (design === "neumorphism") {
    trackStyle.boxShadow = `inset 2px 2px 4px ${hexToRgba(borderColor, 0.3)}, inset -2px -2px 4px rgba(255,255,255,0.5)`;
  } else if (design === "cyberpunk") {
    trackStyle.border = `1px solid ${hexToRgba(color, 0.3)}`;
  }

  const fillStyle: CSSProperties = {
    height: "100%",
    width: `${Math.min(value, 100)}%`,
    backgroundColor: color,
    borderRadius: br,
    transition: "width 0.5s ease",
  };

  if (design === "aurora") {
    fillStyle.background = `linear-gradient(90deg, ${color}, ${hexToRgba(color, 0.6)})`;
  } else if (design === "cyberpunk") {
    fillStyle.boxShadow = `0 0 8px ${hexToRgba(color, 0.4)}`;
  }

  return (
    <div style={trackStyle}>
      <div style={fillStyle} />
    </div>
  );
}

// ── TOGGLE SWITCH ────────────────────────────────────────────────────────────

export function ToggleSwitch({
  checked,
  onChange,
  design,
  colors,
}: {
  checked: boolean;
  onChange: () => void;
  design: DesignStyle;
  colors: Record<string, string>;
}) {
  const trackStyle: CSSProperties = {
    width: "40px",
    height: "22px",
    borderRadius: design === "retro" ? "4px" : "999px",
    backgroundColor: checked ? colors.primary : colors.muted,
    cursor: "pointer",
    position: "relative",
    transition: "all 0.3s ease",
    flexShrink: 0,
  };

  const thumbStyle: CSSProperties = {
    width: "16px",
    height: "16px",
    borderRadius: design === "retro" ? "2px" : "999px",
    backgroundColor: "#ffffff",
    position: "absolute",
    top: "3px",
    left: checked ? "21px" : "3px",
    transition: "all 0.3s ease",
  };

  if (design === "neobrutalism") {
    trackStyle.border = `2px solid ${colors.border}`;
    thumbStyle.border = `2px solid ${colors.border}`;
    thumbStyle.backgroundColor = checked ? colors.accent : "#ffffff";
  } else if (design === "neumorphism") {
    trackStyle.boxShadow = checked
      ? `inset 2px 2px 4px ${hexToRgba(colors.shadow, 0.5)}`
      : "inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff";
  } else if (design === "cyberpunk") {
    trackStyle.border = `1px solid ${checked ? colors.primary : colors.border}`;
    trackStyle.backgroundColor = checked
      ? hexToRgba(colors.primary, 0.2)
      : colors.surface;
    if (checked)
      trackStyle.boxShadow = `0 0 10px ${hexToRgba(colors.primary, 0.3)}`;
    thumbStyle.backgroundColor = checked
      ? colors.primary
      : colors.textSecondary;
  } else if (design === "glassmorphism") {
    trackStyle.backgroundColor = checked
      ? hexToRgba(colors.primary, 0.4)
      : "rgba(255,255,255,0.08)";
    trackStyle.border = `1px solid ${checked ? hexToRgba(colors.primary, 0.4) : colors.border}`;
    trackStyle.backdropFilter = "blur(10px)";
  } else if (design === "aurora" && checked) {
    trackStyle.background = `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`;
  }

  return (
    <div
      style={trackStyle}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <div style={thumbStyle} />
    </div>
  );
}
