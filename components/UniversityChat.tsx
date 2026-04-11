"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import { chatWithUniversityBot } from "@/app/actions/chat";
import { Content } from "@google/genai";
import { parseMessage, type TableData, type ParsedPart } from "@/lib/Ai/parseMessage";

type Message = { role: "user" | "bot"; text: string };

const md: Record<string, React.ComponentType<{ children?: React.ReactNode }>> = {
  p: ({ children }) => (
    <p style={{ margin: "0 0 6px", lineHeight: 1.55, fontSize: 12.5 }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ margin: "4px 0 6px", paddingLeft: 16 }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: "4px 0 6px", paddingLeft: 16 }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: 4, lineHeight: 1.5, fontSize: 12.5 }}>{children}</li>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 600, color: "#0f172a" }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: "#475569" }}>{children}</em>
  ),
  code: ({ children }) => (
    <code style={{
      background: "#e2e8f0",
      borderRadius: 4,
      padding: "1px 5px",
      fontSize: 11.5,
      fontFamily: "monospace",
      color: "#0f172a",
    }}>
      {children}
    </code>
  ),
};

function ChatTable({ data }: { data: TableData }) {
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "6px 0" }}>
      {data.caption && (
        <p style={{
          fontSize: 10.5,
          color: "#64748b",
          marginBottom: 6,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {data.caption}
        </p>
      )}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 11.5,
        tableLayout: "auto",
        borderRadius: 8,
        overflow: "hidden",
      }}>
        <thead>
          <tr>
            {data.headers.map((h, i) => (
              <th key={i} style={{
                background: "#0f172a",
                color: "#f1f5f9",
                padding: "7px 10px",
                textAlign: "left",
                fontWeight: 600,
                fontSize: 11,
                whiteSpace: "nowrap",
                borderRight: i < data.headers.length - 1 ? "1px solid #1e293b" : "none",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "6px 10px",
                  color: ci === 0 ? "#0f172a" : "#334155",
                  fontWeight: ci === 0 ? 600 : 400,
                  borderBottom: "1px solid #e2e8f0",
                  borderRight: ci < row.length - 1 ? "1px solid #e2e8f0" : "none",
                  whiteSpace: "nowrap",
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BotBubbleContent({ text }: { text: string }) {
  const parts = parseMessage(text);
  return (
    <>
      {parts.map((part, i) =>
        part.type === "table" ? (
          <ChatTable key={i} data={part.content as TableData} />
        ) : (
          <ReactMarkdown key={i} components={md}>
            {part.content as string}
          </ReactMarkdown>
        )
      )}
    </>
  );
}

function BotIcon({ size = 18, color = "#60a5fa" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

// ── NEW: expand/collapse icons ──────────────────────────────────────────────
function ExpandIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
    </svg>
  );
}

const QUICK_CHIPS = [
  "Compare MIT and Stanford",
  "Best CS programs",
  "Which fits my profile?",
];

const COMPACT_WIDTH = 340;
const WIDE_WIDTH = 540;

export default function UniversityChat() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  // ── NEW state ──
  const [isWide, setIsWide] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I can compare universities, find programs, and match options to your profile. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Content[]>([]);
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 220);
    }
  }, [open]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || isPending) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    startTransition(async () => {
      const reply = await chatWithUniversityBot(history, msg);
      setHistory((prev) => [
        ...prev,
        { role: "user", parts: [{ text: msg }] },
        { role: "model", parts: [{ text: reply }] },
      ]);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      if (!open) setUnread((n) => n + 1);
    });
  }

  const panelWidth = isWide ? WIDE_WIDTH : COMPACT_WIDTH;

  return (
    <>
      {/* ── Chat panel ── */}
      <div style={{
        position: "fixed",
        bottom: 88,
        right: 24,
        width: panelWidth,          // ← driven by state
        zIndex: 50,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #e2e2df",
        background: "#ffffff",
        transformOrigin: "bottom right",
        // ── width is now part of the transition ──
        transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.22s, width 0.25s cubic-bezier(0.4,0,0.2,1)",
        transform: open ? "scale(1) translateY(0)" : "scale(0.88) translateY(8px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{
          background: "#0f172a",
          padding: "16px 16px 14px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#1e3a5f", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <BotIcon size={18} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 13, fontWeight: 600,
              color: "#f8fafc", margin: 0, letterSpacing: "0.01em",
            }}>
              University Advisor
            </p>
            <div style={{
              fontSize: 11, color: "#94a3b8", marginTop: 1,
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#22c55e", display: "inline-block",
              }}/>
              Online · Gemini powered
            </div>
          </div>

          {/* ── NEW: expand/collapse button ── */}
          <button
            onClick={() => setIsWide((w) => !w)}
            title={isWide ? "Compact view" : "Expand for better readability"}
            style={{
              background: isWide ? "rgba(255,255,255,0.08)" : "none",
              border: "0.5px solid #334155",
              borderRadius: 6,
              cursor: "pointer",
              color: "#94a3b8",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              fontWeight: 500,
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
          >
            {isWide ? <CollapseIcon /> : <ExpandIcon />}
            {isWide ? "Compact" : "Expand"}
          </button>

          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#64748b", padding: 4, borderRadius: 6,
              display: "flex", lineHeight: 1,
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Quick chips */}
        <div style={{
          padding: "10px 12px 0",
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          background: "#ffffff",
          flexShrink: 0,
        }}>
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => send(chip)}
              disabled={isPending}
              style={{
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                borderRadius: 20,
                padding: "5px 11px",
                fontSize: 11,
                fontWeight: 500,
                color: "#475569",
                cursor: isPending ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{
          padding: "12px 14px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxHeight: 380,
          overflowY: "auto",
          background: "#ffffff",
          flex: 1,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              flexDirection: m.role === "user" ? "row-reverse" : "row",
            }}>
              {m.role === "bot" && (
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "#0f172a", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <BotIcon size={13} />
                </div>
              )}
              <div style={{
                padding: "9px 12px",
                borderRadius: 14,
                borderBottomRightRadius: m.role === "user" ? 4 : 14,
                borderBottomLeftRadius: m.role === "bot" ? 4 : 14,
                maxWidth: "82%",
                wordBreak: "break-word",
                background: m.role === "user" ? "#0f172a" : "#f8fafc",
                color: m.role === "user" ? "#f1f5f9" : "#1e293b",
                border: m.role === "bot" ? "1px solid #e2e8f0" : "none",
                fontSize: 12.5,
                lineHeight: 1.55,
              }}>
                {m.role === "bot"
                  ? <BotBubbleContent text={m.text} />
                  : m.text
                }
              </div>
            </div>
          ))}

          {isPending && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "#0f172a", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <BotIcon size={13} />
              </div>
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "10px 14px",
                borderRadius: 14,
                borderBottomLeftRadius: 4,
                display: "flex",
                gap: 4,
                alignItems: "center",
              }}>
                {[0, 0.18, 0.36].map((delay, i) => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#94a3b8", display: "inline-block",
                    animation: `blink 1.3s ${delay}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div style={{
          borderTop: "1px solid #f1f5f9",
          padding: "10px 10px 10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#ffffff",
          flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything about universities…"
            disabled={isPending}
            style={{
              flex: 1,
              border: "1px solid #e8eaed",
              background: "#f8fafc",
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: 13,
              color: "#1e293b",
              outline: "none",
            }}
          />
          <button
            onClick={() => send()}
            disabled={isPending}
            style={{
              width: 36, height: 36, flexShrink: 0,
              borderRadius: 10,
              background: isPending ? "#e2e8f0" : "#0f172a",
              border: "none",
              cursor: isPending ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24,
          width: 52, height: 52, borderRadius: "50%",
          background: "#1d6bd8", border: "none",
          cursor: "pointer", zIndex: 51,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.15s, background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <ChatIcon />
        )}
      </button>

      <style>{`
        @keyframes blink { 0%,70%,100%{opacity:.2} 35%{opacity:1} }
      `}</style>
    </>
  );
}