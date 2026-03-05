"use client";

import React, { useState, type CSSProperties } from "react";
import { useDesign } from "../../lib/design-context";
import { designPresets } from "../../lib/design-store";
import {
  Mail,
  Inbox,
  Send,
  Star,
  Trash2,
  Archive,
  Search,
  MoreHorizontal,
  Paperclip,
  Reply,
  ReplyAll,
  Forward,
  Clock,
  Tag,
  ChevronDown,
  Plus,
  AlertCircle,
  FileText,
  ArrowLeft,
  MailOpen,
  Edit3,
  RefreshCw,
  X,
} from "lucide-react";
import {
  hexToRgba,
  getCardStyle,
  getButtonStyle,
  getInputStyle,
  getBadgeStyle,
} from "./style-helpers";

interface MailItem {
  id: string;
  from: string;
  initials: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  date: string;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
  labels: { text: string; variant: "default" | "success" | "warning" | "destructive" }[];
}

const MAIL_DATA: MailItem[] = [
  {
    id: "1",
    from: "Sarah Chen",
    initials: "SC",
    email: "sarah.chen@acme.com",
    subject: "Q4 Design System Review",
    preview: "Hey team, I've finished the audit of our component library and have some recommendations for...",
    body: `Hey team,

I've finished the audit of our component library and have some recommendations for the Q4 update cycle. Here's a summary:

1. **Button variants** — We should consolidate from 12 variants down to 6. Many are rarely used and add maintenance burden.
2. **Color tokens** — The current palette has some contrast issues on dark mode. I've attached a revised palette using Tailwind colors.
3. **Typography scale** — Our heading sizes jump too aggressively. Proposed a more harmonious scale.

I've attached the full report and a Figma link with the proposed changes. Let's discuss in Thursday's sync.

Best,
Sarah`,
    time: "10:42 AM",
    date: "Today",
    read: false,
    starred: true,
    hasAttachment: true,
    labels: [{ text: "Design", variant: "default" }],
  },
  {
    id: "2",
    from: "Marcus Johnson",
    initials: "MJ",
    email: "marcus.j@acme.com",
    subject: "Re: API Rate Limiting Strategy",
    preview: "After running the load tests, I think we should go with the token bucket approach. The sliding...",
    body: `After running the load tests, I think we should go with the token bucket approach. The sliding window counter was causing too much memory pressure under peak load.

Here are the numbers:
- Token bucket: 2.3ms avg latency, 450MB memory @ 10k rps
- Sliding window: 4.1ms avg latency, 1.2GB memory @ 10k rps

I'll open a PR with the implementation by EOD tomorrow. We should also discuss the rate limit headers we want to expose to API consumers.

—Marcus`,
    time: "9:18 AM",
    date: "Today",
    read: false,
    starred: false,
    hasAttachment: false,
    labels: [{ text: "Engineering", variant: "success" }],
  },
  {
    id: "3",
    from: "Aisha Patel",
    initials: "AP",
    email: "aisha.p@acme.com",
    subject: "Customer onboarding flow — user testing results",
    preview: "Hi all, the user testing sessions for the new onboarding flow are complete. Key findings...",
    body: `Hi all,

The user testing sessions for the new onboarding flow are complete. Key findings:

- **Task completion rate**: Improved from 67% to 89% with the new stepped wizard.
- **Time to first value**: Reduced by 40% (from 12 min avg to 7.2 min).
- **Drop-off point**: Step 3 (team invitations) still has a 22% drop-off. Users find the bulk invite confusing.

Recommendations:
1. Simplify step 3 — allow skipping and prompt later
2. Add progress indicator (users responded well to knowing "step 2 of 4")
3. Consider adding a quick-start template option

Full report attached. Let's prioritize these for the next sprint.

Thanks,
Aisha`,
    time: "Yesterday",
    date: "Yesterday",
    read: true,
    starred: true,
    hasAttachment: true,
    labels: [{ text: "Product", variant: "warning" }],
  },
  {
    id: "4",
    from: "David Kim",
    initials: "DK",
    email: "david.kim@acme.com",
    subject: "Security Incident Report — Resolved",
    preview: "Team, the unauthorized access attempt we detected yesterday at 14:32 UTC has been fully...",
    body: `Team,

The unauthorized access attempt we detected yesterday at 14:32 UTC has been fully investigated and resolved. Here's the post-mortem summary:

**What happened**: A credential stuffing attack targeted our login endpoint using a list of compromised credentials from an unrelated breach.

**Impact**: No customer data was accessed. Our rate limiting caught the attempt after 47 failed logins. 3 accounts were temporarily locked as a precaution.

**Actions taken**:
- Rotated all affected credentials
- Added IP-based blocking rules
- Enabled enhanced monitoring for the next 72 hours

**Follow-up**: We should fast-track the MFA rollout for all admin accounts. I'll schedule a meeting for next week.

—David`,
    time: "Yesterday",
    date: "Yesterday",
    read: true,
    starred: false,
    hasAttachment: false,
    labels: [{ text: "Urgent", variant: "destructive" }],
  },
  {
    id: "5",
    from: "Elena Rodriguez",
    initials: "ER",
    email: "elena.r@acme.com",
    subject: "New partnership opportunity — CloudScale",
    preview: "I had a great call with the CloudScale team. They're interested in a co-marketing campaign...",
    body: `I had a great call with the CloudScale team. They're interested in a co-marketing campaign and potential integration partnership.

Key points from the discussion:
- They have 50k+ active users in our target segment
- Interested in a native integration with our API
- Willing to co-fund a launch event and joint case studies
- Timeline: Q1 next year for the integration, immediate for marketing

I think this could be a solid growth channel for us. Can we schedule a leadership sync to discuss terms?

Best,
Elena`,
    time: "Dec 14",
    date: "Dec 14",
    read: true,
    starred: false,
    hasAttachment: false,
    labels: [{ text: "Business", variant: "default" }],
  },
  {
    id: "6",
    from: "James Wright",
    initials: "JW",
    email: "james.w@acme.com",
    subject: "Sprint 24 Retrospective Notes",
    preview: "Here are the notes from today's retro. We had a productive discussion about improving our...",
    body: `Here are the notes from today's retro. We had a productive discussion about improving our deployment pipeline.

**What went well:**
- Shipped the new dashboard 2 days ahead of schedule
- Zero production incidents this sprint
- Great cross-team collaboration on the API project

**What could improve:**
- Code reviews taking too long (avg 2.3 days)
- Flaky tests blocking CI pipeline
- Better async communication for remote team members

**Action items:**
1. Set up code review SLA (24h turnaround) — Owner: Marcus
2. Dedicate 2 days next sprint to fix flaky tests — Owner: David
3. Adopt daily async standups in Slack — Owner: James

See you all in sprint planning Monday!`,
    time: "Dec 13",
    date: "Dec 13",
    read: true,
    starred: false,
    hasAttachment: false,
    labels: [{ text: "Engineering", variant: "success" }],
  },
  {
    id: "7",
    from: "Nina Torres",
    initials: "NT",
    email: "nina.t@acme.com",
    subject: "Brand guidelines update — feedback needed",
    preview: "The updated brand guidelines are ready for review. Major changes include a refreshed color...",
    body: `The updated brand guidelines are ready for review. Major changes include a refreshed color palette aligned with Tailwind CSS, updated typography rules, and new icon usage standards.

Please review by Friday and leave comments directly in the Figma file.

Thanks!
Nina`,
    time: "Dec 12",
    date: "Dec 12",
    read: true,
    starred: false,
    hasAttachment: true,
    labels: [{ text: "Design", variant: "default" }],
  },
];

const FOLDERS = [
  { icon: Inbox, label: "Inbox", count: 12 },
  { icon: FileText, label: "Drafts", count: 3 },
  { icon: Send, label: "Sent", count: 0 },
  { icon: Star, label: "Starred", count: 4 },
  { icon: Archive, label: "Archive", count: 0 },
  { icon: Trash2, label: "Trash", count: 0 },
];

export function MailsPreview() {
  const { state } = useDesign();
  const { activeDesign, colors, borderRadius, borderWidth, themeMode } = state;
  const preset = designPresets[activeDesign];
  const shadow = preset.shadowStyle[themeMode];
  const c = colors as unknown as Record<string, string>;

  const [selectedMail, setSelectedMail] = useState<string>("1");
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [starredSet, setStarredSet] = useState<Set<string>>(
    new Set(MAIL_DATA.filter((m) => m.starred).map((m) => m.id)),
  );

  const toggleStar = (id: string) => {
    setStarredSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

  const headingFont = `"${state.fontHeading}", system-ui, sans-serif`;
  const bodyFont = `"${state.fontBody}", system-ui, sans-serif`;

  const selected = MAIL_DATA.find((m) => m.id === selectedMail) || MAIL_DATA[0];

  const avatarStyle = (color: string, size = 36): CSSProperties => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius:
      activeDesign === "retro"
        ? "4px"
        : activeDesign === "cyberpunk"
          ? "4px"
          : parseInt(borderRadius) > 12
            ? "10px"
            : borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: hexToRgba(color, 0.15),
    color: color,
    fontFamily: headingFont,
    fontWeight: 700,
    fontSize: `${Math.round(size * 0.33)}px`,
    flexShrink: 0,
  });

  const mailColors = [c.primary, c.secondary, c.accent, c.success, c.warning, c.destructive, c.primary];

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
          marginRight: "12px",
        }}
      >
        {/* Compose button */}
        <div style={{ padding: "16px 12px 8px" }}>
          <button
            style={{
              ...btn("primary", {
                width: "100%",
                justifyContent: "center",
                padding: "10px 16px",
                fontSize: "13px",
              }),
            }}
          >
            <Edit3 size={14} />
            Compose
          </button>
        </div>

        {/* Folder nav */}
        <nav style={{ padding: "4px 8px", flex: 1 }}>
          {FOLDERS.map((folder) => {
            const Icon = folder.icon;
            const active = activeFolder === folder.label;
            return (
              <button
                key={folder.label}
                onClick={() => setActiveFolder(folder.label)}
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
                  backgroundColor: active
                    ? hexToRgba(c.primary, 0.1)
                    : "transparent",
                  color: active ? c.primary : c.textSecondary,
                  fontFamily: bodyFont,
                  fontSize: "13px",
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  marginBottom: "2px",
                }}
              >
                <Icon size={16} />
                <span style={{ flex: 1 }}>{folder.label}</span>
                {folder.count > 0 && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: active ? c.primary : c.textSecondary,
                      backgroundColor: active
                        ? hexToRgba(c.primary, 0.1)
                        : hexToRgba(c.textSecondary, 0.1),
                      padding: "1px 7px",
                      borderRadius: "999px",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {folder.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Labels section */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: `1px solid ${hexToRgba(c.border, 0.5)}`,
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: c.textSecondary,
              marginBottom: "8px",
            }}
          >
            Labels
          </div>
          {[
            { name: "Design", color: c.primary },
            { name: "Engineering", color: c.success },
            { name: "Product", color: c.warning },
            { name: "Urgent", color: c.destructive },
          ].map((label) => (
            <div
              key={label.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 0",
                fontSize: "12px",
                color: c.textSecondary,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: label.color,
                  flexShrink: 0,
                }}
              />
              {label.name}
            </div>
          ))}
        </div>

        {/* Storage indicator */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: `1px solid ${hexToRgba(c.border, 0.5)}`,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: c.textSecondary,
              marginBottom: "6px",
            }}
          >
            Storage used
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: c.muted,
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "68%",
                height: "100%",
                backgroundColor: c.primary,
                borderRadius: "3px",
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "10px",
              color: c.textSecondary,
              marginTop: "4px",
            }}
          >
            6.8 GB of 10 GB
          </div>
        </div>
      </div>

      {/* ── MAIL LIST ───────────────────────────────────────────────────── */}
      <div
        style={{
          ...card({
            padding: "0",
            overflow: "hidden",
            borderRadius: borderRadius,
          }),
          width: "320px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          marginRight: "12px",
        }}
      >
        {/* Mail list header */}
        <div
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${hexToRgba(c.border, 0.5)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: headingFont,
                fontSize: "15px",
                fontWeight: 700,
                color: c.text,
              }}
            >
              Inbox
            </div>
            <div style={{ fontSize: "11px", color: c.textSecondary }}>
              {MAIL_DATA.filter((m) => !m.read).length} unread messages
            </div>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <button style={btn("ghost", { padding: "6px" })}>
              <RefreshCw size={14} />
            </button>
            <button style={btn("ghost", { padding: "6px" })}>
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: "8px 12px" }}>
          <div style={{ position: "relative" }}>
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
              placeholder="Search emails..."
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

        {/* Mail items */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {MAIL_DATA.map((mail, i) => {
            const isSelected = selectedMail === mail.id;
            const isStarred = starredSet.has(mail.id);
            const accentColor = mailColors[i % mailColors.length];
            return (
              <div
                key={mail.id}
                onClick={() => setSelectedMail(mail.id)}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  borderBottom:
                    i < MAIL_DATA.length - 1
                      ? `1px solid ${hexToRgba(c.border, 0.3)}`
                      : "none",
                  backgroundColor: isSelected
                    ? hexToRgba(c.primary, 0.06)
                    : "transparent",
                  borderLeft: isSelected
                    ? `3px solid ${c.primary}`
                    : "3px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div style={avatarStyle(accentColor, 32)}>
                    {mail.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: mail.read ? 400 : 700,
                          color: c.text,
                        }}
                      >
                        {mail.from}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: c.textSecondary,
                          flexShrink: 0,
                          marginLeft: "8px",
                        }}
                      >
                        {mail.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: mail.read ? 400 : 600,
                        color: c.text,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: "2px",
                      }}
                    >
                      {mail.subject}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: c.textSecondary,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.4,
                      }}
                    >
                      {mail.preview}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "6px",
                      }}
                    >
                      {mail.labels.map((l) => (
                        <span
                          key={l.text}
                          style={{
                            ...badge(l.variant),
                            fontSize: "9px",
                            padding: "1px 6px",
                          }}
                        >
                          {l.text}
                        </span>
                      ))}
                      {mail.hasAttachment && (
                        <Paperclip
                          size={10}
                          style={{ color: c.textSecondary }}
                        />
                      )}
                      <div style={{ flex: 1 }} />
                      <Star
                        size={12}
                        fill={isStarred ? c.warning : "none"}
                        style={{
                          color: isStarred ? c.warning : c.textSecondary,
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(mail.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MAIL DETAIL ─────────────────────────────────────────────────── */}
      <div
        style={{
          ...card({
            padding: "0",
            overflow: "hidden",
            borderRadius: borderRadius,
          }),
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Detail header */}
        <div
          style={{
            padding: "12px 20px",
            borderBottom: `1px solid ${hexToRgba(c.border, 0.5)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={btn("ghost", { padding: "6px" })}>
              <ArrowLeft size={16} />
            </button>
            <button style={btn("ghost", { padding: "6px" })}>
              <Archive size={16} />
            </button>
            <button style={btn("ghost", { padding: "6px" })}>
              <Trash2 size={16} />
            </button>
            <button style={btn("ghost", { padding: "6px" })}>
              <AlertCircle size={16} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={btn("ghost", { padding: "6px" })}>
              <Tag size={14} />
            </button>
            <button style={btn("ghost", { padding: "6px" })}>
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Mail content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* Subject */}
          <div
            style={{
              fontFamily: headingFont,
              fontSize: "20px",
              fontWeight: 700,
              color: c.text,
              marginBottom: "16px",
              lineHeight: 1.3,
            }}
          >
            {selected.subject}
          </div>

          {/* Sender info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: `1px solid ${hexToRgba(c.border, 0.3)}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={avatarStyle(
                  mailColors[MAIL_DATA.findIndex((m) => m.id === selected.id) % mailColors.length],
                  40,
                )}
              >
                {selected.initials}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: c.text,
                  }}
                >
                  {selected.from}
                </div>
                <div style={{ fontSize: "12px", color: c.textSecondary }}>
                  {selected.email}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  color: c.textSecondary,
                }}
              >
                <Clock size={12} />
                {selected.date} at {selected.time}
              </div>
              <Star
                size={16}
                fill={starredSet.has(selected.id) ? c.warning : "none"}
                style={{
                  color: starredSet.has(selected.id)
                    ? c.warning
                    : c.textSecondary,
                  cursor: "pointer",
                }}
                onClick={() => toggleStar(selected.id)}
              />
            </div>
          </div>

          {/* Labels */}
          {selected.labels.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginBottom: "20px",
              }}
            >
              {selected.labels.map((l) => (
                <span key={l.text} style={badge(l.variant)}>
                  <Tag size={10} />
                  {l.text}
                </span>
              ))}
            </div>
          )}

          {/* Body */}
          <div
            style={{
              fontSize: "14px",
              color: c.text,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              fontFamily: bodyFont,
            }}
          >
            {selected.body}
          </div>

          {/* Attachment */}
          {selected.hasAttachment && (
            <div
              style={{
                marginTop: "24px",
                padding: "12px 16px",
                borderRadius:
                  parseInt(borderRadius) > 0
                    ? `${Math.min(parseInt(borderRadius), 8)}px`
                    : "0px",
                border: `1px solid ${hexToRgba(c.border, 0.5)}`,
                backgroundColor: hexToRgba(c.muted, 0.5),
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius:
                    parseInt(borderRadius) > 0
                      ? `${Math.min(parseInt(borderRadius), 6)}px`
                      : "0px",
                  backgroundColor: hexToRgba(c.primary, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.primary,
                  flexShrink: 0,
                }}
              >
                <FileText size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: c.text,
                  }}
                >
                  {selected.subject.includes("Q4")
                    ? "design-system-audit-q4.pdf"
                    : selected.subject.includes("onboarding")
                      ? "onboarding-test-results.pdf"
                      : "brand-guidelines-v2.fig"}
                </div>
                <div style={{ fontSize: "11px", color: c.textSecondary }}>
                  {selected.subject.includes("Q4") ? "2.4 MB" : selected.subject.includes("onboarding") ? "1.8 MB" : "5.1 MB"} • PDF Document
                </div>
              </div>
              <button
                style={btn("outline", {
                  fontSize: "11px",
                  padding: "5px 12px",
                })}
              >
                Download
              </button>
            </div>
          )}
        </div>

        {/* Reply bar */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: `1px solid ${hexToRgba(c.border, 0.5)}`,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            style={btn("outline", {
              fontSize: "12px",
              padding: "7px 14px",
            })}
          >
            <Reply size={14} />
            Reply
          </button>
          <button
            style={btn("ghost", {
              fontSize: "12px",
              padding: "7px 14px",
            })}
          >
            <ReplyAll size={14} />
            Reply All
          </button>
          <button
            style={btn("ghost", {
              fontSize: "12px",
              padding: "7px 14px",
            })}
          >
            <Forward size={14} />
            Forward
          </button>
          <div style={{ flex: 1 }} />
          <button
            style={btn("primary", {
              fontSize: "12px",
              padding: "7px 16px",
            })}
          >
            <Send size={14} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
