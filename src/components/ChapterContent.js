"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ch01Slides } from "@/components/slides/Ch01Slides";
import Term from "@/components/Term";

/* ── Compact markdown renderers ── */
const md = {
  p: ({ node, ...props }) => <p style={{ fontSize: "1.1rem", lineHeight: "1.75", color: "#cbd5e1", margin: "0.5rem 0" }} {...props} />,
  strong: ({ node, ...props }) => <Term>{props.children}</Term>,
  ul: ({ node, ...props }) => <ul style={{ paddingLeft: "0", margin: "0.5rem 0", listStyle: "none" }} {...props} />,
  ol: ({ node, ...props }) => <ol style={{ paddingLeft: "1.2rem", margin: "0.5rem 0", color: "#cbd5e1" }} {...props} />,
  li: ({ node, ...props }) => (
    <li style={{ marginBottom: "0.4rem", fontSize: "1.1rem", lineHeight: "1.7", paddingLeft: "1.3rem", position: "relative", color: "#cbd5e1" }} {...props}>
      <span style={{ position: "absolute", left: 0, top: "0.55rem", width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
      {props.children}
    </li>
  ),
  blockquote: ({ node, ...props }) => (
    <div style={{ background: "rgba(59,130,246,0.06)", padding: "1rem 1.2rem", borderRadius: "8px", borderLeft: "3px solid #3b82f6", margin: "0.8rem 0" }}>
      <blockquote style={{ margin: 0, color: "#e2e8f0", fontStyle: "normal", fontSize: "1.1rem" }} {...props} />
    </div>
  ),
  code: ({ node, inline, ...props }) => inline
    ? <code style={{ background: "#1e293b", padding: "0.1rem 0.4rem", borderRadius: "4px", fontSize: "0.9em", color: "#7dd3fc" }} {...props} />
    : <code {...props} />,
  pre: ({ node, ...props }) => <pre style={{ background: "#0c1220", border: "1px solid #1e293b", padding: "1rem", borderRadius: "8px", overflow: "auto", margin: "0.8rem 0", fontSize: "1rem", lineHeight: "1.6" }} {...props} />,
  table: ({ node, ...props }) => (
    <div style={{ overflowX: "auto", margin: "0.8rem 0", borderRadius: "8px", border: "1px solid #1e293b" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }} {...props} />
    </div>
  ),
  th: ({ node, style, ...props }) => <th style={{ padding: "0.6rem 1rem", background: "#1e293b", borderBottom: "2px solid #334155", color: "#e2e8f0", textAlign: "left", fontSize: "1rem", fontWeight: 600, ...style }} {...props} />,
  td: ({ node, style, ...props }) => <td style={{ padding: "0.6rem 1rem", borderBottom: "1px solid #1e293b", color: "#cbd5e1", fontSize: "1rem", ...style }} {...props} />,
  h3: ({ node, ...props }) => <h3 style={{ color: "#e2e8f0", fontSize: "1.2rem", marginTop: "1.5rem", marginBottom: "0.5rem", paddingBottom: "0.4rem", borderBottom: "1px solid #1e293b" }} {...props} />,
};

/* ── Fallback: render markdown sections as compact cards ── */
function MarkdownCard({ title, body }) {
  if (!body || body.trim().length === 0) return null;
  return (
    <div style={{
      background: "#1e2128",
      borderRadius: "12px",
      border: "1px solid #2d3748",
      padding: "1.5rem 2rem",
      marginBottom: "1rem",
    }}>
      {title && (
        <h3 style={{ fontSize: "1.2rem", color: "#f1f5f9", margin: "0 0 0.8rem", fontWeight: 700 }}>
          {title}
        </h3>
      )}
      <div className="slide-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

function FallbackSection({ section }) {
  // Split section body by h3
  const lines = section.body.split("\n");
  const subs = [];
  let cur = { title: "", lines: [] };
  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (cur.title || cur.lines.length > 0) subs.push({ title: cur.title, body: cur.lines.join("\n").trim() });
      cur = { title: line.replace("### ", "").trim(), lines: [] };
    } else {
      cur.lines.push(line);
    }
  }
  if (cur.title || cur.lines.length > 0) subs.push({ title: cur.title, body: cur.lines.join("\n").trim() });
  const filtered = subs.filter(s => s.body.length > 0);

  const isExam = section.title.includes("시험") || section.title.includes("복습") || section.title.includes("포인트");

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
        <div style={{ width: "4px", height: "22px", borderRadius: "2px", background: isExam ? "#f59e0b" : "#3b82f6" }} />
        <h2 style={{ fontSize: "1.4rem", color: "#f1f5f9", margin: 0, fontWeight: 700 }}>{section.title}</h2>
      </div>
      {filtered.length > 0
        ? filtered.map((sub, i) => <MarkdownCard key={i} title={sub.title} body={sub.body} />)
        : <MarkdownCard title="" body={section.body} />
      }
    </div>
  );
}

/* ── Main ── */
export default function ChapterContent({ sections, chapterId }) {
  // ch01 → use visual slides
  if (chapterId === "ch01") {
    return (
      <div>
        {ch01Slides.map((SlideComponent, i) => <SlideComponent key={i} />)}
      </div>
    );
  }

  // Other chapters → compact scrollable cards
  return (
    <div>
      {sections.map((section, i) => <FallbackSection key={i} section={section} />)}
    </div>
  );
}
