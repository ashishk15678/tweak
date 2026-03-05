// Design System Store - manages active design style, color tokens, and font selections

export type DesignStyle =
  | "neobrutalism"
  | "clayomorphism"
  | "glassmorphism"
  | "neumorphism"
  | "retro"
  | "minimalist"
  | "cyberpunk"
  | "aurora";

export type FontFamily =
  | "Inter"
  | "Space Grotesk"
  | "JetBrains Mono"
  | "Playfair Display"
  | "Poppins"
  | "DM Sans"
  | "Outfit"
  | "Satoshi"
  | "Cabinet Grotesk"
  | "General Sans";

export type ThemeMode = "light" | "dark";

export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  muted: string;
  destructive: string;
  success: string;
  warning: string;
}

export interface DesignPreset {
  id: DesignStyle;
  name: string;
  description: string;
  colors: { light: ColorTokens; dark: ColorTokens };
  borderRadius: string;
  borderWidth: string;
  shadowStyle: { light: string; dark: string };
  fontHeading: FontFamily;
  fontBody: FontFamily;
  extraCSS?: Record<string, string>;
}

export interface DesignState {
  activeDesign: DesignStyle;
  themeMode: ThemeMode;
  colors: ColorTokens;
  fontHeading: FontFamily;
  fontBody: FontFamily;
  borderRadius: string;
  borderWidth: string;
}

// Serializable blob for import/export
export interface ExportPayload {
  version: 1;
  activeDesign: DesignStyle;
  themeMode: ThemeMode;
  colors: ColorTokens;
  fontHeading: FontFamily;
  fontBody: FontFamily;
  borderRadius: string;
  borderWidth: string;
}

// ─── DESIGN PRESETS ──────────────────────────────────────────────────────────

export const designPresets: Record<DesignStyle, DesignPreset> = {
  neobrutalism: {
    id: "neobrutalism",
    name: "Neobrutalism",
    description: "Bold borders, raw shadows, loud colors",
    colors: {
      light: {
        primary: "#f87171",
        secondary: "#2dd4bf",
        accent: "#fde047",
        background: "#fafaf9",
        surface: "#ffffff",
        text: "#18181b",
        textSecondary: "#52525b",
        border: "#18181b",
        shadow: "#18181b",
        muted: "#f5f5f4",
        destructive: "#ef4444",
        success: "#22c55e",
        warning: "#f97316",
      },
      dark: {
        primary: "#f87171",
        secondary: "#2dd4bf",
        accent: "#fde047",
        background: "#18181b",
        surface: "#27272a",
        text: "#fafafa",
        textSecondary: "#a1a1aa",
        border: "#fafafa",
        shadow: "#09090b",
        muted: "#3f3f46",
        destructive: "#ef4444",
        success: "#22c55e",
        warning: "#f97316",
      },
    },
    borderRadius: "12px",
    borderWidth: "3px",
    shadowStyle: {
      light: "5px 5px 0px 0px",
      dark: "5px 5px 0px 0px",
    },
    fontHeading: "Space Grotesk",
    fontBody: "Inter",
    extraCSS: {
      "--neo-translate": "translate(2px, 2px)",
      "--neo-shadow-hover": "3px 3px 0px 0px",
    },
  },

  clayomorphism: {
    id: "clayomorphism",
    name: "Clayomorphism",
    description: "Soft, inflated 3D clay-like surfaces",
    colors: {
      light: {
        primary: "#8b5cf6",
        secondary: "#fca5a5",
        accent: "#67e8f9",
        background: "#f5f3ff",
        surface: "#ffffff",
        text: "#1e1b4b",
        textSecondary: "#6366f1",
        border: "transparent",
        shadow: "#c4b5fd",
        muted: "#ede9fe",
        destructive: "#ef4444",
        success: "#34d399",
        warning: "#fbbf24",
      },
      dark: {
        primary: "#a78bfa",
        secondary: "#fca5a5",
        accent: "#67e8f9",
        background: "#1e1b4b",
        surface: "#312e81",
        text: "#ede9fe",
        textSecondary: "#a5b4fc",
        border: "transparent",
        shadow: "#0a0a0a",
        muted: "#312e81",
        destructive: "#ef4444",
        success: "#34d399",
        warning: "#fbbf24",
      },
    },
    borderRadius: "24px",
    borderWidth: "0px",
    shadowStyle: {
      light:
        "inset 0 -8px 16px rgba(0,0,0,0.08), 0 8px 24px rgba(124,92,252,0.15)",
      dark: "inset 0 -8px 16px rgba(0,0,0,0.25), 0 8px 24px rgba(124,92,252,0.2)",
    },
    fontHeading: "Poppins",
    fontBody: "DM Sans",
  },

  glassmorphism: {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Frosted glass, blur, elegant depth",
    colors: {
      light: {
        primary: "#6366f1",
        secondary: "#ec4899",
        accent: "#8b5cf6",
        background: "#eef2ff",
        surface: "rgba(255, 255, 255, 0.55)",
        text: "#1e1b4b",
        textSecondary: "#6366f1",
        border: "rgba(255, 255, 255, 0.5)",
        shadow: "rgba(99, 102, 241, 0.15)",
        muted: "rgba(255, 255, 255, 0.3)",
        destructive: "#ef4444",
        success: "#10b981",
        warning: "#f59e0b",
      },
      dark: {
        primary: "#818cf8",
        secondary: "#ec4899",
        accent: "#a78bfa",
        background: "#1e1b4b",
        surface: "rgba(255, 255, 255, 0.08)",
        text: "#e0e7ff",
        textSecondary: "#a5b4fc",
        border: "rgba(255, 255, 255, 0.12)",
        shadow: "rgba(99, 102, 241, 0.2)",
        muted: "rgba(255, 255, 255, 0.04)",
        destructive: "#ef4444",
        success: "#10b981",
        warning: "#f59e0b",
      },
    },
    borderRadius: "16px",
    borderWidth: "1px",
    shadowStyle: {
      light: "0 8px 32px rgba(99, 102, 241, 0.12)",
      dark: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
    fontHeading: "Outfit",
    fontBody: "Inter",
    extraCSS: {
      "--glass-blur": "20px",
      "--glass-opacity": "0.08",
    },
  },

  neumorphism: {
    id: "neumorphism",
    name: "Neumorphism",
    description: "Soft extruded shadows, tactile feel",
    colors: {
      light: {
        primary: "#6366f1",
        secondary: "#fb7185",
        accent: "#4ade80",
        background: "#e5e7eb",
        surface: "#e5e7eb",
        text: "#1f2937",
        textSecondary: "#6b7280",
        border: "transparent",
        shadow: "#d1d5db",
        muted: "#d1d5db",
        destructive: "#ef4444",
        success: "#10b981",
        warning: "#fbbf24",
      },
      dark: {
        primary: "#818cf8",
        secondary: "#fb7185",
        accent: "#4ade80",
        background: "#27272a",
        surface: "#27272a",
        text: "#e5e7eb",
        textSecondary: "#9ca3af",
        border: "transparent",
        shadow: "#171717",
        muted: "#3f3f46",
        destructive: "#ef4444",
        success: "#10b981",
        warning: "#fbbf24",
      },
    },
    borderRadius: "20px",
    borderWidth: "0px",
    shadowStyle: {
      light: "8px 8px 16px #B8B8C8, -8px -8px 16px #FFFFFF",
      dark: "8px 8px 16px #1A1A22, -8px -8px 16px #3E3E48",
    },
    fontHeading: "Poppins",
    fontBody: "Inter",
    extraCSS: {
      "--neu-inset": "inset 4px 4px 8px #B8B8C8, inset -4px -4px 8px #FFFFFF",
    },
  },

  retro: {
    id: "retro",
    name: "Retro Pixel",
    description: "8-bit nostalgia, pixel borders, arcade",
    colors: {
      light: {
        primary: "#e11d48",
        secondary: "#38bdf8",
        accent: "#22c55e",
        background: "#fffbeb",
        surface: "#ffffff",
        text: "#1e3a8a",
        textSecondary: "#64748b",
        border: "#1e3a8a",
        shadow: "#09090b",
        muted: "#fef3c7",
        destructive: "#e11d48",
        success: "#22c55e",
        warning: "#facc15",
      },
      dark: {
        primary: "#e11d48",
        secondary: "#38bdf8",
        accent: "#22c55e",
        background: "#1e3a8a",
        surface: "#1e40af",
        text: "#fef3c7",
        textSecondary: "#d1d5db",
        border: "#fef3c7",
        shadow: "#09090b",
        muted: "#1e3a8a",
        destructive: "#e11d48",
        success: "#22c55e",
        warning: "#facc15",
      },
    },
    borderRadius: "0px",
    borderWidth: "3px",
    shadowStyle: {
      light: "4px 4px 0px 0px #1D2B53",
      dark: "4px 4px 0px 0px #000000",
    },
    fontHeading: "JetBrains Mono",
    fontBody: "JetBrains Mono",
    extraCSS: {
      "--pixel-size": "4px",
    },
  },

  minimalist: {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean lines, whitespace, restrained",
    colors: {
      light: {
        primary: "#18181b",
        secondary: "#71717a",
        accent: "#2563eb",
        background: "#fafafa",
        surface: "#ffffff",
        text: "#09090b",
        textSecondary: "#71717a",
        border: "#e4e4e7",
        shadow: "rgba(0, 0, 0, 0.05)",
        muted: "#f4f4f5",
        destructive: "#dc2626",
        success: "#16a34a",
        warning: "#ca8a04",
      },
      dark: {
        primary: "#fafafa",
        secondary: "#a1a1aa",
        accent: "#60a5fa",
        background: "#09090b",
        surface: "#18181b",
        text: "#fafafa",
        textSecondary: "#a1a1aa",
        border: "#27272a",
        shadow: "rgba(0, 0, 0, 0.3)",
        muted: "#18181b",
        destructive: "#ef4444",
        success: "#22c55e",
        warning: "#eab308",
      },
    },
    borderRadius: "8px",
    borderWidth: "1px",
    shadowStyle: {
      light: "0 1px 3px rgba(0, 0, 0, 0.08)",
      dark: "0 1px 3px rgba(0, 0, 0, 0.3)",
    },
    fontHeading: "Inter",
    fontBody: "Inter",
  },

  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon glow, dark backgrounds, electric",
    colors: {
      light: {
        primary: "#0891b2",
        secondary: "#c026d3",
        accent: "#65a30d",
        background: "#f0fdfa",
        surface: "#ffffff",
        text: "#09090b",
        textSecondary: "#52525b",
        border: "#0891b2",
        shadow: "#0891b2",
        muted: "#ccfbf1",
        destructive: "#e11d48",
        success: "#059669",
        warning: "#d97706",
      },
      dark: {
        primary: "#22d3ee",
        secondary: "#e879f9",
        accent: "#a3e635",
        background: "#09090b",
        surface: "#18181b",
        text: "#e0e7ff",
        textSecondary: "#71717a",
        border: "#22d3ee",
        shadow: "#22d3ee",
        muted: "#27272a",
        destructive: "#f43f5e",
        success: "#4ade80",
        warning: "#fbbf24",
      },
    },
    borderRadius: "4px",
    borderWidth: "1px",
    shadowStyle: {
      light: "0 2px 8px rgba(8, 145, 178, 0.15)",
      dark: "0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)",
    },
    fontHeading: "JetBrains Mono",
    fontBody: "Space Grotesk",
    extraCSS: {
      "--neon-glow": "0 0 10px currentColor, 0 0 20px currentColor",
      "--scanline-opacity": "0.03",
    },
  },

  aurora: {
    id: "aurora",
    name: "Aurora",
    description: "Dreamy gradients, northern lights feel",
    colors: {
      light: {
        primary: "#7c3aed",
        secondary: "#10b981",
        accent: "#ec4899",
        background: "#faf5ff",
        surface: "#ffffff",
        text: "#171717",
        textSecondary: "#6b7280",
        border: "rgba(124, 58, 237, 0.15)",
        shadow: "rgba(124, 58, 237, 0.1)",
        muted: "#f3e8ff",
        destructive: "#ef4444",
        success: "#10b981",
        warning: "#f97316",
      },
      dark: {
        primary: "#7c3aed",
        secondary: "#10b981",
        accent: "#ec4899",
        background: "#171717",
        surface: "#262626",
        text: "#fafafa",
        textSecondary: "#9ca3af",
        border: "rgba(124, 58, 237, 0.2)",
        shadow: "rgba(124, 58, 237, 0.15)",
        muted: "#262626",
        destructive: "#ef4444",
        success: "#10b981",
        warning: "#f97316",
      },
    },
    borderRadius: "16px",
    borderWidth: "1px",
    shadowStyle: {
      light: "0 4px 24px rgba(124, 58, 237, 0.1)",
      dark: "0 4px 24px rgba(124, 58, 237, 0.15)",
    },
    fontHeading: "Outfit",
    fontBody: "Inter",
    extraCSS: {
      "--aurora-gradient": "linear-gradient(135deg, #7c3aed, #10b981, #ec4899)",
    },
  },
};

// ─── FONT DEFINITIONS ────────────────────────────────────────────────────────

export interface FontOption {
  name: FontFamily;
  category: "sans-serif" | "monospace" | "serif" | "display";
  googleFont: string;
  weights: number[];
  preview: string;
}

export const fontOptions: FontOption[] = [
  {
    name: "Inter",
    category: "sans-serif",
    googleFont: "Inter:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "Space Grotesk",
    category: "sans-serif",
    googleFont: "Space+Grotesk:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "JetBrains Mono",
    category: "monospace",
    googleFont: "JetBrains+Mono:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "Playfair Display",
    category: "serif",
    googleFont: "Playfair+Display:wght@400;500;600;700",
    weights: [400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "Poppins",
    category: "sans-serif",
    googleFont: "Poppins:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "DM Sans",
    category: "sans-serif",
    googleFont: "DM+Sans:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "Outfit",
    category: "sans-serif",
    googleFont: "Outfit:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "Satoshi",
    category: "sans-serif",
    googleFont: "Satoshi:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "Cabinet Grotesk",
    category: "display",
    googleFont: "Cabinet+Grotesk:wght@400;500;700",
    weights: [400, 500, 700],
    preview: "The quick brown fox jumps",
  },
  {
    name: "General Sans",
    category: "sans-serif",
    googleFont: "General+Sans:wght@300;400;500;600;700",
    weights: [300, 400, 500, 600, 700],
    preview: "The quick brown fox jumps",
  },
];

// ─── COLOR PRESETS (quick color schemes to swap into any design) ─────────────

export interface ColorPreset {
  id: string;
  name: string;
  colors: Partial<ColorTokens>;
}

export const colorPresets: ColorPreset[] = [
  {
    id: "ocean",
    name: "Ocean",
    colors: { primary: "#0284c7", secondary: "#06b6d4", accent: "#7dd3fc" },
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: { primary: "#ea580c", secondary: "#fdba74", accent: "#fef9c3" },
  },
  {
    id: "forest",
    name: "Forest",
    colors: { primary: "#15803d", secondary: "#22c55e", accent: "#bbf7d0" },
  },
  {
    id: "berry",
    name: "Berry",
    colors: { primary: "#7e22ce", secondary: "#d946ef", accent: "#f5d0fe" },
  },
  {
    id: "ember",
    name: "Ember",
    colors: { primary: "#dc2626", secondary: "#f97316", accent: "#fde047" },
  },
  {
    id: "arctic",
    name: "Arctic",
    colors: { primary: "#3b82f6", secondary: "#93c5fd", accent: "#dbeafe" },
  },
  {
    id: "noir",
    name: "Noir",
    colors: { primary: "#18181b", secondary: "#52525b", accent: "#a1a1aa" },
  },
  {
    id: "sakura",
    name: "Sakura",
    colors: { primary: "#db2777", secondary: "#f472b6", accent: "#fbcfe8" },
  },
];

// ─── HELPER: Get colors for a preset in a given mode ─────────────────────────

export function getPresetColors(
  designId: DesignStyle,
  mode: ThemeMode,
): ColorTokens {
  return { ...designPresets[designId].colors[mode] };
}

export function getPresetShadow(
  designId: DesignStyle,
  mode: ThemeMode,
): string {
  return designPresets[designId].shadowStyle[mode];
}

// ─── HELPER: Generate CSS custom properties from state ───────────────────────

export function generateCSSVariables(
  state: DesignState,
): Record<string, string> {
  const preset = designPresets[state.activeDesign];
  return {
    "--color-primary": state.colors.primary,
    "--color-secondary": state.colors.secondary,
    "--color-accent": state.colors.accent,
    "--color-background": state.colors.background,
    "--color-surface": state.colors.surface,
    "--color-text": state.colors.text,
    "--color-text-secondary": state.colors.textSecondary,
    "--color-border": state.colors.border,
    "--color-shadow": state.colors.shadow,
    "--color-muted": state.colors.muted,
    "--color-destructive": state.colors.destructive,
    "--color-success": state.colors.success,
    "--color-warning": state.colors.warning,
    "--radius": state.borderRadius,
    "--border-w": state.borderWidth,
    "--shadow": preset.shadowStyle[state.themeMode],
    "--font-heading": `"${state.fontHeading}", system-ui, sans-serif`,
    "--font-body": `"${state.fontBody}", system-ui, sans-serif`,
    ...(preset.extraCSS || {}),
  };
}

// ─── HELPER: Generate exportable CSS string ──────────────────────────────────

export function generateExportCSS(state: DesignState): string {
  const vars = generateCSSVariables(state);
  const lines = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
  return `:root {\n${lines}\n}`;
}

// ─── HELPER: Generate Tailwind v4 compatible theme tokens ────────────────────

export function generateTailwindV4Theme(state: DesignState): string {
  return `@import "tailwindcss";

@theme {
  --color-primary: ${state.colors.primary};
  --color-secondary: ${state.colors.secondary};
  --color-accent: ${state.colors.accent};
  --color-background: ${state.colors.background};
  --color-surface: ${state.colors.surface};
  --color-text: ${state.colors.text};
  --color-text-secondary: ${state.colors.textSecondary};
  --color-border: ${state.colors.border};
  --color-muted: ${state.colors.muted};
  --color-destructive: ${state.colors.destructive};
  --color-success: ${state.colors.success};
  --color-warning: ${state.colors.warning};
  --radius-base: ${state.borderRadius};
  --font-heading: "${state.fontHeading}", system-ui, sans-serif;
  --font-body: "${state.fontBody}", system-ui, sans-serif;
}`;
}

// ─── HELPER: Generate Tailwind v4 component code (utility classes) ───────────

export function generateTailwindV4ComponentCode(
  component: string,
  state: DesignState,
): string {
  const design = state.activeDesign;
  const r = state.borderRadius;
  const isRounded = parseInt(r) >= 999;
  const rClass = isRounded
    ? "rounded-full"
    : r === "0px"
      ? "rounded-none"
      : `rounded-base`;

  switch (component) {
    case "Button":
      return `<!-- Tailwind v4 Button -->
<!-- Requires @theme tokens from the "Tailwind v4" export tab -->

<!-- Primary -->
<button class="inline-flex items-center gap-2 px-5 py-2.5 ${rClass} bg-primary text-white font-semibold text-sm font-body cursor-pointer transition-all duration-200 hover:opacity-90">
  Primary
</button>

<!-- Secondary -->
<button class="inline-flex items-center gap-2 px-5 py-2.5 ${rClass} bg-secondary text-white font-semibold text-sm font-body cursor-pointer transition-all duration-200 hover:opacity-90">
  Secondary
</button>

<!-- Outline -->
<button class="inline-flex items-center gap-2 px-5 py-2.5 ${rClass} bg-transparent border border-primary text-primary font-semibold text-sm font-body cursor-pointer transition-all duration-200 hover:bg-primary/10">
  Outline
</button>

<!-- Ghost -->
<button class="inline-flex items-center gap-2 px-5 py-2.5 ${rClass} bg-transparent text-text-secondary font-semibold text-sm font-body cursor-pointer transition-all duration-200 hover:bg-muted">
  Ghost
</button>

<!-- Destructive -->
<button class="inline-flex items-center gap-2 px-5 py-2.5 ${rClass} bg-destructive text-white font-semibold text-sm font-body cursor-pointer transition-all duration-200 hover:opacity-90">
  Destructive
</button>`;

    case "Card":
      return `<!-- Tailwind v4 Card -->
<div class="${rClass} bg-surface border border-border p-6 transition-all duration-200${design === "neobrutalism" ? " shadow-[4px_4px_0px_var(--color-border)]" : ""}">
  <h3 class="text-lg font-bold text-text font-heading mb-1">Card Title</h3>
  <p class="text-sm text-text-secondary font-body mb-4">Card description goes here.</p>
  <div class="flex gap-2">
    <button class="px-4 py-2 ${rClass} bg-primary text-white text-sm font-semibold font-body">Action</button>
    <button class="px-4 py-2 ${rClass} bg-transparent border border-border text-text-secondary text-sm font-body">Cancel</button>
  </div>
</div>`;

    case "Input":
      return `<!-- Tailwind v4 Input -->
<div>
  <label class="block text-sm font-semibold text-text font-body mb-1.5">Label</label>
  <input
    type="text"
    placeholder="Enter text..."
    class="w-full px-3 py-2.5 ${rClass} border border-border bg-surface text-text text-sm font-body outline-none transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-secondary/50"
  />
</div>

<!-- Disabled -->
<div>
  <label class="block text-sm font-semibold text-text font-body mb-1.5">Disabled</label>
  <input
    type="text"
    disabled
    placeholder="Disabled..."
    class="w-full px-3 py-2.5 ${rClass} border border-border bg-muted text-text-secondary text-sm font-body outline-none opacity-50 cursor-not-allowed"
  />
</div>`;

    case "Textarea":
      return `<!-- Tailwind v4 Textarea -->
<div>
  <label class="block text-sm font-semibold text-text font-body mb-1.5">Message</label>
  <textarea
    rows="4"
    placeholder="Write your message..."
    class="w-full px-3 py-2.5 ${rClass} border border-border bg-surface text-text text-sm font-body outline-none resize-y transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-text-secondary/50"
  ></textarea>
</div>`;

    case "Badge":
      return `<!-- Tailwind v4 Badge -->
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 ${rClass} bg-primary/15 text-primary text-xs font-semibold font-body">
  Default
</span>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 ${rClass} bg-success/15 text-success text-xs font-semibold font-body">
  Success
</span>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 ${rClass} bg-warning/15 text-warning text-xs font-semibold font-body">
  Warning
</span>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 ${rClass} bg-destructive/15 text-destructive text-xs font-semibold font-body">
  Destructive
</span>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 ${rClass} border border-border text-text-secondary text-xs font-semibold font-body">
  Outline
</span>`;

    case "Toggle":
      return `<!-- Tailwind v4 Toggle (requires JS for state) -->
<!-- Off state -->
<button class="relative w-11 h-6 rounded-full bg-muted border border-border cursor-pointer transition-all duration-200">
  <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200 shadow-sm"></span>
</button>

<!-- On state -->
<button class="relative w-11 h-6 rounded-full bg-primary cursor-pointer transition-all duration-200">
  <span class="absolute top-0.5 left-5 w-5 h-5 rounded-full bg-white transition-all duration-200 shadow-sm"></span>
</button>`;

    case "Alert":
      return `<!-- Tailwind v4 Alert -->
<!-- Info -->
<div class="flex gap-3 items-start p-4 ${rClass} bg-primary/10 border border-primary/20 font-body">
  <span class="text-primary mt-0.5 shrink-0"><!-- Info icon --></span>
  <div>
    <p class="font-semibold text-sm text-text font-heading mb-1">Information</p>
    <p class="text-sm text-text-secondary">This is an informational message.</p>
  </div>
</div>

<!-- Success -->
<div class="flex gap-3 items-start p-4 ${rClass} bg-success/10 border border-success/20 font-body">
  <span class="text-success mt-0.5 shrink-0"><!-- Check icon --></span>
  <div>
    <p class="font-semibold text-sm text-text font-heading mb-1">Success</p>
    <p class="text-sm text-text-secondary">Operation completed successfully.</p>
  </div>
</div>

<!-- Warning -->
<div class="flex gap-3 items-start p-4 ${rClass} bg-warning/10 border border-warning/20 font-body">
  <span class="text-warning mt-0.5 shrink-0"><!-- Warning icon --></span>
  <div>
    <p class="font-semibold text-sm text-text font-heading mb-1">Warning</p>
    <p class="text-sm text-text-secondary">Please review before continuing.</p>
  </div>
</div>

<!-- Destructive -->
<div class="flex gap-3 items-start p-4 ${rClass} bg-destructive/10 border border-destructive/20 font-body">
  <span class="text-destructive mt-0.5 shrink-0"><!-- Alert icon --></span>
  <div>
    <p class="font-semibold text-sm text-text font-heading mb-1">Error</p>
    <p class="text-sm text-text-secondary">Something went wrong.</p>
  </div>
</div>`;

    case "Avatar":
      return `<!-- Tailwind v4 Avatar -->
<!-- Small -->
<div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold font-body shrink-0 overflow-hidden">
  AB
</div>

<!-- Medium -->
<div class="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-semibold font-body shrink-0 overflow-hidden">
  CD
</div>

<!-- Large -->
<div class="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-lg font-semibold font-body shrink-0 overflow-hidden">
  EF
</div>`;

    case "Tooltip":
      return `<!-- Tailwind v4 Tooltip -->
<!-- Tooltip wrapper (use JS or group-hover for visibility) -->
<div class="relative inline-block group">
  <button class="px-4 py-2 ${rClass} bg-primary text-white text-sm font-body">
    Hover me
  </button>
  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 ${rClass} bg-text text-background text-xs font-medium font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
    Tooltip text
  </div>
</div>`;

    case "Select":
      return `<!-- Tailwind v4 Select -->
<div>
  <label class="block text-sm font-semibold text-text font-body mb-1.5">Select</label>
  <div class="relative">
    <select class="w-full appearance-none px-3 py-2.5 pr-10 ${rClass} border border-border bg-surface text-text text-sm font-body outline-none cursor-pointer transition-all duration-200 focus:border-primary">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
      <!-- ChevronDown icon -->
    </span>
  </div>
</div>`;

    case "Checkbox":
      return `<!-- Tailwind v4 Checkbox -->
<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" class="sr-only peer" />
  <div class="w-5 h-5 ${rClass} border-2 border-border bg-surface flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary transition-all duration-200">
    <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
  <span class="text-sm text-text font-body">Checkbox label</span>
</label>`;

    case "Radio":
      return `<!-- Tailwind v4 Radio -->
<label class="flex items-center gap-3 cursor-pointer">
  <input type="radio" name="radio-group" class="sr-only peer" />
  <div class="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center peer-checked:border-primary transition-all duration-200">
    <div class="w-2.5 h-2.5 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
  </div>
  <span class="text-sm text-text font-body">Radio option</span>
</label>`;

    case "Tabs":
      return `<!-- Tailwind v4 Tabs -->
<div class="flex gap-0 border-b border-border mb-4">
  <!-- Active tab -->
  <button class="px-4 py-2 border-b-2 border-primary text-primary font-semibold text-sm font-body bg-transparent -mb-px">
    Tab 1
  </button>
  <!-- Inactive tab -->
  <button class="px-4 py-2 border-b-2 border-transparent text-text-secondary text-sm font-body bg-transparent -mb-px hover:text-text transition-colors">
    Tab 2
  </button>
  <button class="px-4 py-2 border-b-2 border-transparent text-text-secondary text-sm font-body bg-transparent -mb-px hover:text-text transition-colors">
    Tab 3
  </button>
</div>
<div class="p-4 text-sm text-text-secondary font-body">
  Tab content goes here.
</div>`;

    case "Accordion":
      return `<!-- Tailwind v4 Accordion -->
<div class="${rClass} border border-border overflow-hidden">
  <!-- Accordion Item (open) -->
  <div class="border-b border-border">
    <button class="w-full px-4 py-3 flex items-center justify-between bg-transparent text-left font-heading text-sm font-semibold text-text">
      Accordion Item 1
      <span class="text-text-secondary transition-transform duration-200 rotate-180"><!-- ChevronDown --></span>
    </button>
    <div class="px-4 pb-3 text-sm text-text-secondary font-body leading-relaxed">
      Content for the first accordion item goes here.
    </div>
  </div>
  <!-- Accordion Item (closed) -->
  <div>
    <button class="w-full px-4 py-3 flex items-center justify-between bg-transparent text-left font-heading text-sm font-semibold text-text">
      Accordion Item 2
      <span class="text-text-secondary transition-transform duration-200"><!-- ChevronDown --></span>
    </button>
  </div>
</div>`;

    case "Dialog":
      return `<!-- Tailwind v4 Dialog -->
<!-- Backdrop -->
<div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
  <!-- Dialog panel -->
  <div class="w-full max-w-md ${rClass} bg-surface border border-border shadow-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-text font-heading">Dialog Title</h3>
      <button class="text-text-secondary hover:text-text"><!-- X icon --></button>
    </div>
    <p class="text-sm text-text-secondary font-body mb-6">
      Dialog description or content goes here.
    </p>
    <div class="flex justify-end gap-2">
      <button class="px-4 py-2 ${rClass} border border-border text-text-secondary text-sm font-body">Cancel</button>
      <button class="px-4 py-2 ${rClass} bg-primary text-white text-sm font-semibold font-body">Confirm</button>
    </div>
  </div>
</div>`;

    case "Progress":
      return `<!-- Tailwind v4 Progress Bar -->
<div class="space-y-4">
  <div>
    <div class="flex justify-between mb-1">
      <span class="text-sm font-medium text-text font-body">Progress</span>
      <span class="text-sm text-text-secondary font-body">72%</span>
    </div>
    <div class="w-full h-2 ${rClass} bg-muted overflow-hidden">
      <div class="h-full bg-primary ${rClass} transition-all duration-500" style="width: 72%"></div>
    </div>
  </div>
</div>`;

    case "Separator":
      return `<!-- Tailwind v4 Separator -->
<!-- Horizontal -->
<hr class="w-full h-px bg-border border-none my-4" />

<!-- With text -->
<div class="flex items-center gap-4 my-4">
  <div class="flex-1 h-px bg-border"></div>
  <span class="text-xs text-text-secondary font-body">OR</span>
  <div class="flex-1 h-px bg-border"></div>
</div>

<!-- Vertical (inside a flex row) -->
<div class="flex items-center gap-4 h-8">
  <span class="text-sm text-text font-body">Left</span>
  <div class="w-px self-stretch bg-border"></div>
  <span class="text-sm text-text font-body">Right</span>
</div>`;

    case "Skeleton":
      return `<!-- Tailwind v4 Skeleton -->
<div class="flex gap-3 animate-pulse">
  <!-- Avatar skeleton -->
  <div class="w-10 h-10 rounded-full bg-muted shrink-0"></div>
  <div class="flex-1 space-y-2">
    <div class="h-4 w-3/4 ${rClass} bg-muted"></div>
    <div class="h-3 w-full ${rClass} bg-muted"></div>
    <div class="h-3 w-5/6 ${rClass} bg-muted"></div>
  </div>
</div>`;

    case "Table":
      return `<!-- Tailwind v4 Table -->
<div class="overflow-x-auto ${rClass} border border-border">
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary bg-muted/50 font-body border-b border-border">Name</th>
        <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary bg-muted/50 font-body border-b border-border">Status</th>
        <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-secondary bg-muted/50 font-body border-b border-border">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border">
        <td class="px-4 py-3 text-sm text-text font-body">John Doe</td>
        <td class="px-4 py-3"><span class="px-2 py-0.5 text-xs ${rClass} bg-success/15 text-success font-semibold">Active</span></td>
        <td class="px-4 py-3 text-sm text-text font-body text-right font-semibold">$1,200</td>
      </tr>
      <tr class="border-b border-border">
        <td class="px-4 py-3 text-sm text-text font-body">Jane Smith</td>
        <td class="px-4 py-3"><span class="px-2 py-0.5 text-xs ${rClass} bg-warning/15 text-warning font-semibold">Pending</span></td>
        <td class="px-4 py-3 text-sm text-text font-body text-right font-semibold">$850</td>
      </tr>
    </tbody>
  </table>
</div>`;

    default:
      return `<!-- No Tailwind v4 template available for "${component}" yet -->`;
  }
}

// ─── HELPER: Export / Import payload ─────────────────────────────────────────

export function stateToExportPayload(state: DesignState): ExportPayload {
  return {
    version: 1,
    activeDesign: state.activeDesign,
    themeMode: state.themeMode,
    colors: { ...state.colors },
    fontHeading: state.fontHeading,
    fontBody: state.fontBody,
    borderRadius: state.borderRadius,
    borderWidth: state.borderWidth,
  };
}

export function importPayloadToState(
  payload: ExportPayload,
): DesignState | null {
  try {
    if (payload.version !== 1) return null;
    if (!designPresets[payload.activeDesign]) return null;
    return {
      activeDesign: payload.activeDesign,
      themeMode: payload.themeMode || "dark",
      colors: { ...payload.colors },
      fontHeading: payload.fontHeading,
      fontBody: payload.fontBody,
      borderRadius: payload.borderRadius,
      borderWidth: payload.borderWidth,
    };
  } catch {
    return null;
  }
}

// ─── DEFAULT STATE ───────────────────────────────────────────────────────────

export function getDefaultState(mode: ThemeMode = "dark"): DesignState {
  const preset = designPresets.neobrutalism;
  return {
    activeDesign: preset.id,
    themeMode: mode,
    colors: { ...preset.colors[mode] },
    fontHeading: preset.fontHeading,
    fontBody: preset.fontBody,
    borderRadius: preset.borderRadius,
    borderWidth: preset.borderWidth,
  };
}

// ─── COMPONENT NAMES (the set of components we showcase) ─────────────────────

export const componentNames = [
  "Button",
  "Card",
  "Input",
  "Badge",
  "Toggle",
  "Alert",
  "Avatar",
  "Tooltip",
] as const;

export type ComponentName = (typeof componentNames)[number];

// ─── HELPER: Generate plug-and-play component CSS classes ────────────────────

export function generateComponentCSS(state: DesignState): string {
  const preset = designPresets[state.activeDesign];
  const c = state.colors;
  const r = state.borderRadius;
  const bw = state.borderWidth;
  const shadow = preset.shadowStyle[state.themeMode];
  const design = state.activeDesign;
  const fontH = `"${state.fontHeading}", system-ui, sans-serif`;
  const fontB = `"${state.fontBody}", system-ui, sans-serif`;

  // helper: hex → rgba string
  const hexToRgba = (hex: string, alpha: number): string => {
    if (hex.startsWith("rgba") || hex.startsWith("rgb")) return hex;
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    const rv = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${rv},${g},${b},${alpha})`;
  };

  // ── .btn base ──────────────────────────────────────────────────────────
  const btnBase = `  font-family: ${fontB};
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: ${r};
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  line-height: 1.2;
  border: none;
  outline: none;
  position: relative;
  white-space: nowrap;`;

  let btnDesignExtra = "";
  if (design === "neobrutalism") {
    btnDesignExtra = `  border: ${bw} solid ${c.border};
  box-shadow: ${shadow} ${c.shadow};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;`;
  } else if (design === "clayomorphism") {
    btnDesignExtra = `  box-shadow: ${shadow};
  font-weight: 600;
  border: none;`;
  } else if (design === "glassmorphism") {
    btnDesignExtra = `  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${c.border};`;
  } else if (design === "neumorphism") {
    btnDesignExtra = `  box-shadow: ${shadow};
  border: none;`;
  } else if (design === "retro") {
    btnDesignExtra = `  border: ${bw} solid ${c.border};
  box-shadow: ${shadow};
  font-family: ${fontH};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;`;
  } else if (design === "minimalist") {
    btnDesignExtra = `  border: ${bw} solid transparent;
  box-shadow: ${shadow};
  font-weight: 500;`;
  } else if (design === "cyberpunk") {
    btnDesignExtra = `  border: ${bw} solid ${c.border};
  font-family: ${fontH};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));`;
  } else if (design === "aurora") {
    btnDesignExtra = `  border: 1px solid ${c.border};
  box-shadow: ${shadow};`;
  }

  // ── .btn-primary etc ───────────────────────────────────────────────────
  let btnPrimary = `  background-color: ${c.primary};
  color: #FFFFFF;`;
  if (design === "glassmorphism") {
    btnPrimary = `  background-color: ${hexToRgba(c.primary, 0.4)};
  border-color: ${hexToRgba(c.primary, 0.5)};
  color: #FFFFFF;`;
  } else if (design === "cyberpunk") {
    btnPrimary = `  background-color: ${hexToRgba(c.primary, 0.2)};
  border-color: ${c.primary};
  color: ${c.text};
  box-shadow: 0 0 15px ${hexToRgba(c.primary, 0.4)}, inset 0 0 15px ${hexToRgba(c.primary, 0.1)};`;
  } else if (design === "aurora") {
    btnPrimary = `  background: linear-gradient(135deg, ${c.primary}, ${c.accent});
  border: none;
  color: #FFFFFF;`;
  }

  let btnSecondary = `  background-color: ${c.secondary};
  color: #FFFFFF;`;
  if (design === "neobrutalism") {
    btnSecondary = `  background-color: ${c.accent};
  color: ${c.text};`;
  } else if (design === "glassmorphism") {
    btnSecondary = `  background-color: ${hexToRgba(c.secondary, 0.2)};
  border-color: ${hexToRgba(c.secondary, 0.3)};
  color: #FFFFFF;`;
  } else if (design === "cyberpunk") {
    btnSecondary = `  background-color: ${hexToRgba(c.secondary, 0.1)};
  border-color: ${c.secondary};
  color: ${c.secondary};
  box-shadow: 0 0 15px ${hexToRgba(c.secondary, 0.3)};`;
  }

  let btnOutline = `  background-color: transparent;
  color: ${c.primary};
  border: ${bw || "1px"} solid ${c.primary};`;
  if (design === "neumorphism") {
    btnOutline = `  background-color: transparent;
  color: ${c.text};
  box-shadow: inset 4px 4px 8px ${c.shadow}, inset -4px -4px 8px #FFFFFF;`;
  } else if (design === "glassmorphism") {
    btnOutline = `  background-color: transparent;
  border-color: ${hexToRgba(c.primary, 0.4)};
  color: ${c.primary};`;
  }

  const btnGhost = `  background-color: transparent;
  color: ${c.textSecondary};
  border: none;
  box-shadow: none;`;

  let btnDestructive = `  background-color: ${c.destructive};
  color: #FFFFFF;`;
  if (design === "neobrutalism") {
    btnDestructive += `\n  border: ${bw} solid ${c.border};`;
  } else if (design === "cyberpunk") {
    btnDestructive = `  background-color: ${hexToRgba(c.destructive, 0.2)};
  border-color: ${c.destructive};
  color: #FFFFFF;
  box-shadow: 0 0 15px ${hexToRgba(c.destructive, 0.4)};`;
  }

  // ── .card ──────────────────────────────────────────────────────────────
  let cardStyles = `  background-color: ${c.surface};
  border-radius: ${r};
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;`;

  if (design === "neobrutalism") {
    cardStyles += `\n  border: ${bw} solid ${c.border};
  box-shadow: ${shadow} ${c.shadow};`;
  } else if (design === "clayomorphism") {
    cardStyles += `\n  box-shadow: ${shadow};
  border: none;`;
  } else if (design === "glassmorphism") {
    cardStyles += `\n  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${c.border};
  box-shadow: ${shadow};`;
  } else if (design === "neumorphism") {
    cardStyles += `\n  box-shadow: ${shadow};
  border: none;`;
  } else if (design === "retro") {
    cardStyles += `\n  border: ${bw} solid ${c.border};
  box-shadow: ${shadow};`;
  } else if (design === "minimalist") {
    cardStyles += `\n  border: ${bw} solid ${c.border};
  box-shadow: ${shadow};`;
  } else if (design === "cyberpunk") {
    cardStyles += `\n  border: ${bw} solid ${c.border};
  box-shadow: ${shadow};
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));`;
  } else if (design === "aurora") {
    cardStyles += `\n  border: 1px solid ${c.border};
  box-shadow: ${shadow};
  background: linear-gradient(145deg, ${c.surface}, ${hexToRgba(c.primary, 0.05)});`;
  }

  // ── .card-header, .card-title, .card-description ───────────────────────
  const cardHeader = `  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;`;

  const cardTitle = `  font-family: ${fontH};
  font-size: 18px;
  font-weight: 700;
  color: ${c.text};
  line-height: 1.3;`;

  const cardDescription = `  font-family: ${fontB};
  font-size: 14px;
  color: ${c.textSecondary};
  line-height: 1.5;`;

  // ── .input ─────────────────────────────────────────────────────────────
  let inputStyles = `  font-family: ${fontB};
  font-size: 14px;
  padding: 10px 14px;
  border-radius: ${r};
  width: 100%;
  outline: none;
  transition: all 0.2s ease;
  color: ${c.text};
  background-color: ${c.surface};`;

  if (design === "neobrutalism") {
    inputStyles += `\n  border: ${bw} solid ${c.border};
  box-shadow: 3px 3px 0px 0px ${c.shadow};
  background-color: ${c.background};`;
  } else if (design === "clayomorphism") {
    inputStyles += `\n  border: none;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
  background-color: ${c.muted};`;
  } else if (design === "glassmorphism") {
    inputStyles += `\n  background-color: rgba(255,255,255,0.06);
  border: 1px solid ${c.border};
  backdrop-filter: blur(10px);`;
  } else if (design === "neumorphism") {
    inputStyles += `\n  border: none;
  box-shadow: inset 4px 4px 8px ${c.shadow}, inset -4px -4px 8px #FFFFFF;`;
  } else if (design === "retro") {
    inputStyles += `\n  border: ${bw} solid ${c.border};
  font-family: ${fontH};
  font-size: 13px;`;
  } else if (design === "minimalist") {
    inputStyles += `\n  border: ${bw} solid ${c.border};`;
  } else if (design === "cyberpunk") {
    inputStyles += `\n  border: 1px solid ${c.border};
  font-family: ${fontH};
  letter-spacing: 0.5px;
  font-size: 13px;`;
  } else if (design === "aurora") {
    inputStyles += `\n  border: 1px solid ${c.border};
  background-color: ${c.muted};`;
  }

  const inputLabel = `  font-family: ${fontB};
  font-size: 14px;
  font-weight: 500;
  color: ${c.text};
  margin-bottom: 6px;
  display: block;`;

  // ── .badge ─────────────────────────────────────────────────────────────
  let badgeBase = `  font-family: ${fontB};
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: ${design === "retro" ? "0px" : "999px"};
  display: inline-flex;
  align-items: center;
  gap: 4px;
  line-height: 1.4;
  white-space: nowrap;`;

  if (design === "neobrutalism") {
    badgeBase += `\n  border: 2px solid ${c.border};
  box-shadow: 2px 2px 0px 0px ${c.shadow};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 11px;`;
  } else if (design === "retro") {
    badgeBase += `\n  border: 2px solid ${c.border};
  font-family: ${fontH};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;`;
  } else if (design === "cyberpunk") {
    badgeBase += `\n  border: 1px solid;
  font-family: ${fontH};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 10px;
  border-radius: 2px;`;
  }

  let badgeDefault = `  background-color: ${c.primary};
  color: #FFFFFF;`;
  if (design === "cyberpunk") {
    badgeDefault = `  background-color: ${hexToRgba(c.primary, 0.2)};
  border-color: ${c.primary};
  color: ${c.primary};
  box-shadow: 0 0 8px ${hexToRgba(c.primary, 0.3)};`;
  } else if (design === "glassmorphism") {
    badgeDefault = `  background-color: ${hexToRgba(c.primary, 0.25)};
  border: 1px solid ${hexToRgba(c.primary, 0.3)};
  backdrop-filter: blur(10px);
  color: #FFFFFF;`;
  }

  let badgeSuccess = `  background-color: ${c.success};
  color: #FFFFFF;`;
  if (design === "cyberpunk") {
    badgeSuccess = `  background-color: ${hexToRgba(c.success, 0.15)};
  border-color: ${c.success};
  color: ${c.success};
  box-shadow: 0 0 8px ${hexToRgba(c.success, 0.3)};`;
  }

  let badgeWarning = `  background-color: ${c.warning};
  color: #1A1A2E;`;
  if (design === "cyberpunk") {
    badgeWarning = `  background-color: ${hexToRgba(c.warning, 0.15)};
  border-color: ${c.warning};
  color: ${c.warning};`;
  }

  let badgeDestructive = `  background-color: ${c.destructive};
  color: #FFFFFF;`;
  if (design === "cyberpunk") {
    badgeDestructive = `  background-color: ${hexToRgba(c.destructive, 0.15)};
  border-color: ${c.destructive};
  color: ${c.destructive};
  box-shadow: 0 0 8px ${hexToRgba(c.destructive, 0.3)};`;
  }

  const badgeOutline = `  background-color: transparent;
  color: ${c.text};
  border: 1.5px solid ${c.border};`;

  // ── .toggle / .switch ──────────────────────────────────────────────────
  let toggleTrack = `  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: ${c.muted};
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;
  flex-shrink: 0;`;

  let toggleTrackChecked = `  background-color: ${c.primary};`;
  if (design === "cyberpunk") {
    toggleTrackChecked = `  background-color: ${hexToRgba(c.primary, 0.3)};
  box-shadow: 0 0 10px ${hexToRgba(c.primary, 0.4)};
  border: 1px solid ${c.primary};`;
  }

  let toggleThumb = `  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #FFFFFF;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s ease;`;

  const toggleThumbChecked = `  transform: translateX(20px);`;

  if (design === "neobrutalism") {
    toggleTrack += `\n  border: 2px solid ${c.border};
  border-radius: 4px;`;
    toggleThumb = `  width: 18px;
  height: 18px;
  border-radius: 2px;
  background-color: ${c.primary};
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s ease;`;
  } else if (design === "neumorphism") {
    toggleTrack += `\n  box-shadow: inset 3px 3px 6px ${c.shadow}, inset -3px -3px 6px #FFFFFF;`;
  }

  // ── .alert ─────────────────────────────────────────────────────────────
  let alertBase = `  padding: 16px;
  border-radius: ${r};
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-family: ${fontB};
  transition: all 0.2s ease;`;

  if (design === "neobrutalism") {
    alertBase += `\n  border: ${bw} solid ${c.border};
  box-shadow: 4px 4px 0px 0px ${c.shadow};`;
  } else if (design === "glassmorphism") {
    alertBase += `\n  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${c.border};`;
  } else if (design === "neumorphism") {
    alertBase += `\n  box-shadow: ${shadow};`;
  } else if (design === "cyberpunk") {
    alertBase += `\n  border: 1px solid;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));`;
  } else if (design === "retro") {
    alertBase += `\n  border: ${bw} solid ${c.border};
  box-shadow: ${shadow};`;
  } else {
    alertBase += `\n  border: 1px solid ${c.border};`;
  }

  const alertInfo = `  background-color: ${hexToRgba(c.primary, 0.08)};
  border-color: ${hexToRgba(c.primary, 0.3)};`;

  const alertSuccess = `  background-color: ${hexToRgba(c.success, 0.08)};
  border-color: ${hexToRgba(c.success, 0.3)};`;

  const alertWarning = `  background-color: ${hexToRgba(c.warning, 0.08)};
  border-color: ${hexToRgba(c.warning, 0.3)};`;

  const alertDestructive = `  background-color: ${hexToRgba(c.destructive, 0.08)};
  border-color: ${hexToRgba(c.destructive, 0.3)};`;

  const alertTitle = `  font-weight: 600;
  font-size: 14px;
  color: ${c.text};
  margin-bottom: 4px;
  font-family: ${fontH};`;

  const alertDescription = `  font-size: 13px;
  color: ${c.textSecondary};
  line-height: 1.5;`;

  // ── .avatar ────────────────────────────────────────────────────────────
  const avatarBase = `  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: ${fontB};
  font-weight: 600;
  flex-shrink: 0;
  overflow: hidden;
  background-color: ${c.primary};
  color: #FFFFFF;`;

  const avatarSm = `  width: 32px;
  height: 32px;
  font-size: 12px;`;

  const avatarMd = `  width: 40px;
  height: 40px;
  font-size: 14px;`;

  const avatarLg = `  width: 48px;
  height: 48px;
  font-size: 18px;`;

  let avatarDesignExtra = "";
  if (design === "neobrutalism") {
    avatarDesignExtra = `  border: 2px solid ${c.border};
  box-shadow: 2px 2px 0px 0px ${c.shadow};
  border-radius: 8px;`;
  } else if (design === "cyberpunk") {
    avatarDesignExtra = `  border-radius: 4px;
  border: 1px solid ${c.primary};
  box-shadow: 0 0 8px ${hexToRgba(c.primary, 0.3)};`;
  } else if (design === "retro") {
    avatarDesignExtra = `  border-radius: 0;
  border: 2px solid ${c.border};`;
  } else if (design === "glassmorphism") {
    avatarDesignExtra = `  backdrop-filter: blur(10px);
  border: 1px solid ${c.border};`;
  } else if (design === "neumorphism") {
    avatarDesignExtra = `  box-shadow: 4px 4px 8px ${c.shadow}, -4px -4px 8px #FFFFFF;`;
  }

  // ── .tooltip ───────────────────────────────────────────────────────────
  let tooltipStyles = `  padding: 8px 14px;
  border-radius: ${r};
  font-size: 13px;
  font-family: ${fontB};
  font-weight: 500;
  white-space: nowrap;
  position: absolute;
  z-index: 50;
  color: #FFFFFF;
  background-color: ${c.text};`;

  if (design === "neobrutalism") {
    tooltipStyles += `\n  border: 2px solid ${c.border};
  box-shadow: 3px 3px 0px 0px ${c.shadow};
  background-color: ${c.primary};
  font-weight: 700;`;
  } else if (design === "glassmorphism") {
    tooltipStyles += `\n  background-color: ${hexToRgba(c.surface, 0.8)};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${c.border};
  color: ${c.text};`;
  } else if (design === "cyberpunk") {
    tooltipStyles += `\n  background-color: ${c.surface};
  border: 1px solid ${c.primary};
  color: ${c.primary};
  box-shadow: 0 0 10px ${hexToRgba(c.primary, 0.3)};
  font-family: ${fontH};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;`;
  } else if (design === "neumorphism") {
    tooltipStyles += `\n  background-color: ${c.surface};
  color: ${c.text};
  box-shadow: 4px 4px 8px ${c.shadow}, -4px -4px 8px #FFFFFF;`;
  } else if (design === "retro") {
    tooltipStyles += `\n  border: 2px solid ${c.border};
  background-color: ${c.surface};
  color: ${c.text};
  font-family: ${fontH};
  border-radius: 0;`;
  } else if (design === "aurora") {
    tooltipStyles += `\n  background: linear-gradient(135deg, ${c.primary}, ${c.accent});
  border: none;`;
  }

  // ── Assemble ───────────────────────────────────────────────────────────
  return `/* ═══════════════════════════════════════════════════════════════════
   ${preset.name} Component Styles — generated by DesignTweak
   Design: ${design} | Mode: ${state.themeMode}
   ═══════════════════════════════════════════════════════════════════ */

/* ── Base body / page ──────────────────────────────────────── */
body {
  font-family: ${fontB};
  background-color: ${c.background};
  color: ${c.text};
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${fontH};
  color: ${c.text};
}

/* ── Button ────────────────────────────────────────────────── */
.btn {
${btnBase}
${btnDesignExtra}
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
${btnPrimary}
}

.btn-secondary {
${btnSecondary}
}

.btn-outline {
${btnOutline}
}

.btn-ghost {
${btnGhost}
}

.btn-destructive {
${btnDestructive}
}

.btn-sm {
  padding: 6px 14px;
  font-size: 12px;
}

.btn-lg {
  padding: 14px 28px;
  font-size: 16px;
}

.btn-icon {
  padding: 10px;
  aspect-ratio: 1;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Card ──────────────────────────────────────────────────── */
.card {
${cardStyles}
}

.card-header {
${cardHeader}
}

.card-title {
${cardTitle}
}

.card-description {
${cardDescription}
}

.card-content {
  padding: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${c.border};
}

/* ── Input ─────────────────────────────────────────────────── */
.input {
${inputStyles}
}

.input:focus {
  border-color: ${c.primary};
  box-shadow: 0 0 0 3px ${hexToRgba(c.primary, 0.15)};
}

.input::placeholder {
  color: ${c.textSecondary};
}

.input-label {
${inputLabel}
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

textarea.input {
  min-height: 80px;
  resize: vertical;
}

select.input {
  appearance: none;
  padding-right: 36px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

/* ── Badge ─────────────────────────────────────────────────── */
.badge {
${badgeBase}
}

.badge-default {
${badgeDefault}
}

.badge-success {
${badgeSuccess}
}

.badge-warning {
${badgeWarning}
}

.badge-destructive {
${badgeDestructive}
}

.badge-outline {
${badgeOutline}
}

/* ── Toggle / Switch ───────────────────────────────────────── */
.toggle-track {
${toggleTrack}
}

.toggle-track[aria-checked="true"],
.toggle-track.active {
${toggleTrackChecked}
}

.toggle-thumb {
${toggleThumb}
}

.toggle-track[aria-checked="true"] .toggle-thumb,
.toggle-track.active .toggle-thumb {
${toggleThumbChecked}
}

.toggle-label {
  font-family: ${fontB};
  font-size: 14px;
  font-weight: 500;
  color: ${c.text};
  cursor: pointer;
}

.toggle-description {
  font-family: ${fontB};
  font-size: 12px;
  color: ${c.textSecondary};
  margin-top: 2px;
}

/* ── Alert ─────────────────────────────────────────────────── */
.alert {
${alertBase}
}

.alert-info {
${alertInfo}
}

.alert-success {
${alertSuccess}
}

.alert-warning {
${alertWarning}
}

.alert-destructive {
${alertDestructive}
}

.alert-title {
${alertTitle}
}

.alert-description {
${alertDescription}
}

.alert-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

/* ── Avatar ────────────────────────────────────────────────── */
.avatar {
${avatarBase}
${avatarDesignExtra}
}

.avatar-sm {
${avatarSm}
}

.avatar-md {
${avatarMd}
}

.avatar-lg {
${avatarLg}
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group .avatar + .avatar {
  margin-left: -8px;
  border: 2px solid ${c.background};
}

/* ── Tooltip ───────────────────────────────────────────────── */
.tooltip {
${tooltipStyles}
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: ${design === "neobrutalism" ? c.primary : c.text};
}

/* ── Utility classes ───────────────────────────────────────── */
.text-primary { color: ${c.primary}; }
.text-secondary { color: ${c.secondary}; }
.text-accent { color: ${c.accent}; }
.text-muted { color: ${c.textSecondary}; }
.text-destructive { color: ${c.destructive}; }
.text-success { color: ${c.success}; }
.text-warning { color: ${c.warning}; }

.bg-primary { background-color: ${c.primary}; }
.bg-secondary { background-color: ${c.secondary}; }
.bg-surface { background-color: ${c.surface}; }
.bg-muted { background-color: ${c.muted}; }
.bg-background { background-color: ${c.background}; }

.border-default { border: ${bw} solid ${c.border}; }
.rounded-base { border-radius: ${r}; }
.shadow-base { box-shadow: ${shadow}; }
.font-heading { font-family: ${fontH}; }
.font-body { font-family: ${fontB}; }
`;
}
