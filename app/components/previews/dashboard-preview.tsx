"use client";

import React, { useState, type CSSProperties } from "react";
import { useDesign } from "../../lib/design-context";
import { designPresets } from "../../lib/design-store";
import {
  X,
  Search,
  Plus,
  Settings,
  Info,
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Bell,
  Home,
  Layers,
  Clock,
  MoreHorizontal,
  ChevronRight,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
  LogOut,
  CreditCard,
  Package,
} from "lucide-react";
import {
  hexToRgba,
  getCardStyle,
  getButtonStyle,
  getInputStyle,
  getBadgeStyle,
} from "./style-helpers";
import { Sparkline, MiniBarChart, ProgressBar, ToggleSwitch } from "./widgets";

export function DashboardPreview() {
  const { state } = useDesign();
  const { activeDesign, colors, borderRadius, borderWidth, themeMode } = state;
  const preset = designPresets[activeDesign];
  const shadow = preset.shadowStyle[themeMode];
  const c = colors as unknown as Record<string, string>;

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

  const iconBox = (color: string): CSSProperties => ({
    width: "36px",
    height: "36px",
    borderRadius:
      activeDesign === "retro"
        ? "0px"
        : activeDesign === "cyberpunk"
          ? "4px"
          : parseInt(borderRadius) > 12
            ? "10px"
            : borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: hexToRgba(color, 0.12),
    color: color,
    flexShrink: 0,
  });

  // Data
  const stats = [
    {
      label: "Revenue",
      value: "$48,290",
      change: "+12.5%",
      up: true,
      icon: DollarSign,
      color: c.primary,
      sparkData: [30, 35, 32, 40, 38, 42, 48, 45, 50, 52],
    },
    {
      label: "Orders",
      value: "1,429",
      change: "+8.2%",
      up: true,
      icon: ShoppingCart,
      color: c.secondary,
      sparkData: [20, 22, 18, 25, 28, 24, 30, 32, 35, 34],
    },
    {
      label: "Users",
      value: "12,847",
      change: "+23.1%",
      up: true,
      icon: Users,
      color: c.accent,
      sparkData: [50, 55, 52, 60, 58, 62, 68, 65, 70, 75],
    },
    {
      label: "Bounce Rate",
      value: "24.3%",
      change: "-3.1%",
      up: false,
      icon: Activity,
      color: c.destructive,
      sparkData: [35, 32, 34, 30, 28, 31, 27, 25, 26, 24],
    },
  ];

  const tableData = [
    {
      id: "INV-001",
      customer: "Sarah Chen",
      amount: "$2,400",
      status: "success" as const,
      statusLabel: "Paid",
      date: "Dec 14",
    },
    {
      id: "INV-002",
      customer: "Marcus Johnson",
      amount: "$1,890",
      status: "warning" as const,
      statusLabel: "Pending",
      date: "Dec 13",
    },
    {
      id: "INV-003",
      customer: "Aisha Patel",
      amount: "$3,200",
      status: "success" as const,
      statusLabel: "Paid",
      date: "Dec 12",
    },
    {
      id: "INV-004",
      customer: "David Kim",
      amount: "$950",
      status: "destructive" as const,
      statusLabel: "Overdue",
      date: "Dec 11",
    },
    {
      id: "INV-005",
      customer: "Elena Rodriguez",
      amount: "$4,100",
      status: "success" as const,
      statusLabel: "Paid",
      date: "Dec 10",
    },
  ];

  const activityItems = [
    {
      user: "SC",
      name: "Sarah Chen",
      action: "completed project Alpha",
      time: "2m ago",
      color: c.primary,
    },
    {
      user: "MJ",
      name: "Marcus Johnson",
      action: "uploaded 3 new files",
      time: "18m ago",
      color: c.secondary,
    },
    {
      user: "AP",
      name: "Aisha Patel",
      action: "commented on invoice INV-003",
      time: "1h ago",
      color: c.accent,
    },
    {
      user: "DK",
      name: "David Kim",
      action: "joined team Engineering",
      time: "3h ago",
      color: c.success,
    },
    {
      user: "ER",
      name: "Elena Rodriguez",
      action: "created a new campaign",
      time: "5h ago",
      color: c.warning,
    },
  ];

  const barChartData = [
    { label: "Mon", value: 65, prev: 45 },
    { label: "Tue", value: 80, prev: 60 },
    { label: "Wed", value: 55, prev: 70 },
    { label: "Thu", value: 90, prev: 50 },
    { label: "Fri", value: 75, prev: 85 },
    { label: "Sat", value: 40, prev: 30 },
    { label: "Sun", value: 60, prev: 55 },
  ];

  const navItems = [
    { icon: Home, label: "Overview", active: true },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: ShoppingCart, label: "Orders", active: false },
    { icon: Users, label: "Customers", active: false },
    { icon: Package, label: "Products", active: false },
    { icon: CreditCard, label: "Billing", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const projects = [
    { name: "Website Redesign", progress: 85, color: c.primary },
    { name: "Mobile App v2", progress: 62, color: c.secondary },
    { name: "API Integration", progress: 43, color: c.accent },
    { name: "Database Migration", progress: 91, color: c.success },
  ];

  const [toggles, setToggles] = useState([true, false, true]);
  const toggleAt = (i: number) =>
    setToggles((prev) => prev.map((v, j) => (j === i ? !v : v)));

  const headingFont = `"${state.fontHeading}", system-ui, sans-serif`;
  const bodyFont = `"${state.fontBody}", system-ui, sans-serif`;

  const sectionTitleStyle: CSSProperties = {
    fontFamily: headingFont,
    fontSize: "15px",
    fontWeight: 700,
    color: c.text,
    marginBottom: "14px",
  };

  const subtleStyle: CSSProperties = {
    fontFamily: bodyFont,
    fontSize: "12px",
    color: c.textSecondary,
  };

  // Table cell style
  const cellStyle: CSSProperties = {
    padding: "10px 12px",
    fontFamily: bodyFont,
    fontSize: "13px",
    color: c.text,
    borderBottom: `1px solid ${hexToRgba(c.border, 0.5)}`,
    whiteSpace: "nowrap",
  };

  const thStyle: CSSProperties = {
    ...cellStyle,
    fontWeight: 600,
    fontSize: "11px",
    color: c.textSecondary,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    position: "sticky" as const,
    top: 0,
    backgroundColor: c.surface,
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0",
        fontFamily: bodyFont,
        color: c.text,
        minHeight: "600px",
      }}
    >
      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <div
        style={{
          ...card({
            padding: "0",
            overflow: "hidden",
            borderRadius: borderRadius,
          }),
          width: "200px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          marginRight: "16px",
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            padding: "16px",
            borderBottom: `1px solid ${hexToRgba(c.border, 0.5)}`,
          }}
        >
          <div
            style={{
              fontFamily: headingFont,
              fontSize: "16px",
              fontWeight: 700,
              color: c.text,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Layers size={18} style={{ color: c.primary }} />
            Acme Inc
          </div>
          <div
            style={{
              fontSize: "11px",
              color: c.textSecondary,
              marginTop: "2px",
            }}
          >
            Dashboard
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ padding: "8px", flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius:
                    parseInt(borderRadius) > 0
                      ? `${Math.min(parseInt(borderRadius), 8)}px`
                      : "0px",
                  border: "none",
                  backgroundColor: item.active
                    ? hexToRgba(c.primary, 0.1)
                    : "transparent",
                  color: item.active ? c.primary : c.textSecondary,
                  fontFamily: bodyFont,
                  fontSize: "13px",
                  fontWeight: item.active ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  marginBottom: "2px",
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: `1px solid ${hexToRgba(c.border, 0.5)}`,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: activeDesign === "retro" ? "4px" : "6px",
              backgroundColor: c.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: "12px",
              flexShrink: 0,
            }}
          >
            A
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: c.text }}>
              Admin
            </div>
            <div style={{ fontSize: "10px", color: c.textSecondary }}>
              admin@acme.com
            </div>
          </div>
          <LogOut
            size={14}
            style={{
              color: c.textSecondary,
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Top bar inside the dashboard preview */}
        <div
          style={{
            ...card({ padding: "12px 16px" }),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: c.textSecondary,
                }}
              />
              <input
                type="text"
                placeholder="Search anything..."
                style={{
                  ...inp({
                    paddingLeft: "32px",
                    fontSize: "12px",
                    padding: "7px 12px 7px 32px",
                  }),
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={btn("ghost", { padding: "6px" })}>
              <Bell size={16} />
            </button>
            <button style={btn("ghost", { padding: "6px" })}>
              <Inbox size={16} />
            </button>
            <button
              style={btn("primary", { fontSize: "12px", padding: "6px 14px" })}
            >
              <Plus size={14} />
              New
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={card()}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: c.textSecondary,
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: headingFont,
                        fontSize: "22px",
                        fontWeight: 700,
                        color: c.text,
                        lineHeight: 1.1,
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                  <div style={iconBox(s.color)}>
                    <Icon size={18} />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {s.up ? (
                      <ArrowUpRight size={14} style={{ color: c.success }} />
                    ) : (
                      <ArrowDownRight
                        size={14}
                        style={{ color: c.destructive }}
                      />
                    )}
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: s.up ? c.success : c.destructive,
                      }}
                    >
                      {s.change}
                    </span>
                    <span style={{ fontSize: "11px", color: c.textSecondary }}>
                      vs last month
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Sparkline
                    data={s.sparkData}
                    color={s.color}
                    width={140}
                    height={32}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle row: Chart + Activity */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "12px",
          }}
        >
          {/* Bar chart card */}
          <div style={card()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div>
                <div style={sectionTitleStyle}>Weekly Performance</div>
                <div style={subtleStyle}>
                  Revenue comparison: this week vs last week
                </div>
              </div>
              <button
                style={btn("outline", {
                  fontSize: "11px",
                  padding: "5px 10px",
                })}
              >
                <Filter size={12} />
                Filter
              </button>
            </div>
            <MiniBarChart
              data={barChartData}
              color={c.primary}
              secondaryColor={c.textSecondary}
              height={130}
              barRadius={borderRadius}
            />
            <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: c.primary,
                  }}
                />
                <span style={{ fontSize: "11px", color: c.textSecondary }}>
                  This week
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: hexToRgba(c.textSecondary, 0.3),
                  }}
                />
                <span style={{ fontSize: "11px", color: c.textSecondary }}>
                  Last week
                </span>
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div style={card({ padding: "0", overflow: "hidden" })}>
            <div
              style={{
                padding: "16px 16px 12px",
                borderBottom: `1px solid ${hexToRgba(c.border, 0.5)}`,
              }}
            >
              <div style={sectionTitleStyle}>Recent Activity</div>
              <div style={subtleStyle}>Latest team updates</div>
            </div>
            <div style={{ padding: "0" }}>
              {activityItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px 16px",
                    borderBottom:
                      i < activityItems.length - 1
                        ? `1px solid ${hexToRgba(c.border, 0.3)}`
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius:
                        activeDesign === "retro" ? "4px" : "6px",
                      backgroundColor: hexToRgba(item.color, 0.15),
                      color: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: headingFont,
                      fontWeight: 700,
                      fontSize: "11px",
                      flexShrink: 0,
                    }}
                  >
                    {item.user}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "12px",
                        color: c.text,
                        lineHeight: 1.4,
                      }}
                    >
                      <strong>{item.name}</strong> {item.action}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: c.textSecondary,
                        marginTop: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={10} />
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Table + Projects + Settings */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "12px",
          }}
        >
          {/* Invoices table */}
          <div style={card({ padding: "0", overflow: "hidden" })}>
            <div
              style={{
                padding: "16px 16px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${hexToRgba(c.border, 0.5)}`,
              }}
            >
              <div>
                <div style={sectionTitleStyle}>Recent Invoices</div>
                <div style={subtleStyle}>
                  Latest transactions and their status
                </div>
              </div>
              <button
                style={btn("outline", {
                  fontSize: "11px",
                  padding: "5px 10px",
                })}
              >
                View All
                <ChevronRight size={12} />
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
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
                  {tableData.map((row) => (
                    <tr key={row.id}>
                      <td
                        style={{
                          ...cellStyle,
                          fontWeight: 600,
                          fontSize: "12px",
                        }}
                      >
                        {row.id}
                      </td>
                      <td style={cellStyle}>{row.customer}</td>
                      <td style={{ ...cellStyle, fontWeight: 600 }}>
                        {row.amount}
                      </td>
                      <td style={cellStyle}>
                        <span style={badge(row.status)}>
                          {row.statusLabel}
                        </span>
                      </td>
                      <td
                        style={{
                          ...cellStyle,
                          color: c.textSecondary,
                          fontSize: "12px",
                        }}
                      >
                        {row.date}
                      </td>
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
          </div>

          {/* Right column: Projects + Quick settings */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Projects progress */}
            <div style={card()}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <div style={sectionTitleStyle}>Active Projects</div>
                <button style={btn("ghost", { padding: "4px" })}>
                  <MoreHorizontal size={14} />
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {projects.map((p) => (
                  <div key={p.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: c.text,
                        }}
                      >
                        {p.name}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: p.color,
                        }}
                      >
                        {p.progress}%
                      </span>
                    </div>
                    <ProgressBar
                      value={p.progress}
                      color={p.color}
                      bgColor={c.muted}
                      radius={borderRadius}
                      design={activeDesign}
                      borderColor={c.border}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick settings */}
            <div style={card()}>
              <div
                style={{
                  ...sectionTitleStyle,
                  marginBottom: "12px",
                }}
              >
                Quick Settings
              </div>
              {[
                {
                  label: "Email notifications",
                  desc: "Receive alerts via email",
                },
                { label: "Two-factor auth", desc: "Extra layer of security" },
                {
                  label: "Auto-save drafts",
                  desc: "Save work automatically",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom:
                      i < 2
                        ? `1px solid ${hexToRgba(c.border, 0.3)}`
                        : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: c.text,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: c.textSecondary,
                        marginTop: "1px",
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={toggles[i]}
                    onChange={() => toggleAt(i)}
                    design={activeDesign}
                    colors={c}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert banner at bottom */}
        <div
          style={{
            ...card({ padding: "14px 16px" }),
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: hexToRgba(c.primary, 0.06),
            borderLeft: `3px solid ${c.primary}`,
          }}
        >
          <Info size={18} style={{ color: c.primary, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: c.text }}>
              System Update Available
            </div>
            <div
              style={{
                fontSize: "12px",
                color: c.textSecondary,
                marginTop: "2px",
              }}
            >
              Version 2.4.1 is ready to install. Includes performance
              improvements and bug fixes.
            </div>
          </div>
          <button
            style={btn("primary", {
              fontSize: "12px",
              padding: "6px 14px",
              flexShrink: 0,
            })}
          >
            Update Now
          </button>
          <button style={btn("ghost", { padding: "4px", flexShrink: 0 })}>
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
