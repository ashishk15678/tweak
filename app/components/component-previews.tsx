"use client";

// Re-export everything from the split preview files
// This file is kept for backward compatibility with existing imports

export {
  DashboardPreview,
  MailsPreview,
  hexToRgba,
  getCardStyle,
  getButtonStyle,
  getInputStyle,
  getBadgeStyle,
  Sparkline,
  MiniBarChart,
  ProgressBar,
  ToggleSwitch,
} from "./previews";

// ── COMPONENT MAP (kept for backward compat with dashboard.tsx) ──────────────

import React from "react";
import { DashboardPreview } from "./previews/dashboard-preview";
import { MailsPreview } from "./previews/mails-preview";

export const componentPreviews: Record<
  string,
  { component: React.FC; label: string; description: string }
> = {
  Dashboard: {
    component: DashboardPreview,
    label: "Dashboard",
    description: "Full dashboard with stats, charts, tables, and controls",
  },
  Mails: {
    component: MailsPreview,
    label: "Mails",
    description: "Email client with folders, mail list, and message detail",
  },
};
