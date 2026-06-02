"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft, ChevronRight, List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EncapsulationVisualizer from "@/components/Visualizers/EncapsulationVisualizer";
import SwitchingVisualizer from "@/components/Visualizers/SwitchingVisualizer";
import ProtocolStack from "@/components/Visualizers/ProtocolStack";

/* ── Markdown renderers (slide-optimized) ── */
const mdComponents = {
  p: ({ node, ...props }) => (
    <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#cbd5e1", margin: "0.6rem 0" }} {...props} />
  ),
  strong: ({ node, ...props }) => (
    <strong style={{ color: "#38bdf8", fontWeight: 700 }} {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul style={{ paddingLeft: "0", margin: "0.8rem 0", listStyle: "none" }} {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol style={{ paddingLeft: "1.2rem", margin: "0.8rem 0", color: "#cbd5e1" }} {...props} />
  ),
  li: ({ node, ...props }) => (
    <li style={{
      marginBottom: "0.6rem", fontSize: "1.05rem", lineHeight: "1.7",
      paddingLeft: "1.4rem", position: "relative", color: "#cbd5e1",
    }} {...props}>
      <span style={{
        position: "absolute", left: 0, top: "0.55rem",
        width: "6px", height: "6px", borderRadius: "50%",
        background: "var(--accent-blue)",
      }} />
      {props.children}
    </li>
  ),
  blockquote: ({ node, ...props }) => (
    <div style={{
      background: "rgba(59,130,246,0.06)", padding: "1.2rem 1.5rem",
      borderRadius: "10px", borderLeft: "3px solid var(--accent-blue)",
      margin: "1.2rem 0", fontSize: "1.1rem",
    }}>
      <blockquote style={{ margin: 0, color: "#e2e8f0", fontStyle: "normal" }} {...props} />
    </div>
  ),
  code: ({ node, inline, ...props }) => {
    if (inline) {
      return <code style={{ background: "#1e293b", padding: "0.15rem 0.4rem", borderRadius: "4px", fontSize: "0.9em", color: "#7dd3fc" }} {...props} />;
    }
    return <code {...props} />;
  },
  pre: ({ node, ...props }) => (
    <pre style={{
      background: "#0c1220", border: "1px solid #1e293b",
      padding: "1.2rem", borderRadius: "10px", overflow: "auto",
      margin: "1rem 0", fontSize: "0.95rem", lineHeight: "1.6",
    }} {...props} />
  ),
  table: ({ node, ...props }) => (
    <div style={{ overflowX: "auto", margin: "1.2rem 0", borderRadius: "10px", border: "1px solid #1e293b" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }} {...props} />
    </div>
  ),
  th: ({ node, style, ...props }) => (
    <th style={{
      padding: "0.8rem 1rem", background: "#1e293b",
      borderBottom: "2px solid #334155", color: "#e2e8f0",
      textAlign: "left", fontSize: "0.95rem", fontWeight: 600, ...style
    }} {...props} />
  ),
  td: ({ node, style, ...props }) => (
    <td style={{
      padding: "0.8rem 1rem", borderBottom: "1px solid #1e293b",
      color: "#cbd5e1", fontSize: "0.95rem", ...style
    }} {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 style={{
      color: "#e2e8f0", fontSize: "1.2rem",
      marginTop: "2rem", marginBottom: "0.8rem",
      paddingBottom: "0.5rem", borderBottom: "1px solid #1e293b",
    }} {...props} />
  ),
};

/* ── Parse subsections (h3) within a section body ── */
function parseSubSlides(body) {
  const lines = body.split("\n");
  const slides = [];
  let current = { title: "", lines: [] };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (current.title || current.lines.length > 0) {
        slides.push({ title: current.title, body: current.lines.join("\n").trim() });
      }
      current = { title: line.replace("### ", "").trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.title || current.lines.length > 0) {
    slides.push({ title: current.title, body: current.lines.join("\n").trim() });
  }
  return slides.filter(s => s.body.length > 0);
}

/* ── Single Slide Component ── */
function Slide({ subSlide, chapterId, sectionTitle }) {
  const needsSwitching = sectionTitle.includes("핵심") && subSlide.title.includes("Circuit switching") && chapterId === "ch01";
  const needsProtocol = sectionTitle.includes("핵심") && subSlide.title.includes("Protocol layering") && chapterId === "ch01";

  return (
    <div style={{
      background: "var(--bg-slide)",
      borderRadius: "16px",
      border: "1px solid var(--border-color)",
      padding: "2.5rem 3rem",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      {subSlide.title && (
        <h2 style={{
          fontSize: "1.5rem", color: "#f1f5f9", marginBottom: "1.5rem",
          paddingBottom: "0.8rem", borderBottom: "2px solid var(--accent-blue)",
          display: "inline-block",
        }}>
          {subSlide.title}
        </h2>
      )}

      <div className="slide-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {subSlide.body}
        </ReactMarkdown>
      </div>

      {needsSwitching && (
        <div style={{ marginTop: "2rem" }}>
          <SwitchingVisualizer />
        </div>
      )}
      {needsProtocol && (
        <div style={{ marginTop: "2rem" }}>
          <ProtocolStack />
          <div style={{ marginTop: "1.5rem" }}><EncapsulationVisualizer /></div>
        </div>
      )}
    </div>
  );
}

/* ── Main Chapter Content (Slide Viewer) ── */
export default function ChapterContent({ sections, chapterId }) {
  // Flatten sections → slides
  const allSlides = [];
  for (const section of sections) {
    const subs = parseSubSlides(section.body);
    if (subs.length === 0) {
      // Section has no h3 subsections → treat entire body as one slide
      allSlides.push({ title: "", body: section.body, sectionTitle: section.title, sectionIdx: allSlides.length });
    } else {
      for (const sub of subs) {
        allSlides.push({ ...sub, sectionTitle: section.title, sectionIdx: allSlides.length });
      }
    }
  }

  const [current, setCurrent] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const slide = allSlides[current];

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(allSlides.length - 1, c + 1));

  // Keyboard navigation
  if (typeof window !== "undefined") {
    if (!window.__slideKeyBound) {
      window.__slideKeyBound = true;
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          document.querySelector("[data-slide-next]")?.click();
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          document.querySelector("[data-slide-prev]")?.click();
        }
      });
    }
  }

  // Group slides by sectionTitle for TOC
  const tocGroups = [];
  let lastSection = "";
  for (let i = 0; i < allSlides.length; i++) {
    if (allSlides[i].sectionTitle !== lastSection) {
      tocGroups.push({ section: allSlides[i].sectionTitle, startIdx: i, slides: [] });
      lastSection = allSlides[i].sectionTitle;
    }
    tocGroups[tocGroups.length - 1].slides.push({ idx: i, title: allSlides[i].title });
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Progress Bar */}
      <div style={{
        height: "3px", background: "#1e293b", borderRadius: "2px", marginBottom: "1.5rem",
      }}>
        <div style={{
          height: "100%", background: "var(--accent-blue)", borderRadius: "2px",
          width: `${((current + 1) / allSlides.length) * 100}%`,
          transition: "width 0.3s ease",
        }} />
      </div>

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "1rem", fontSize: "0.85rem", color: "#64748b",
      }}>
        <button
          onClick={() => setShowToc(!showToc)}
          style={{
            background: "none", border: "1px solid #334155", borderRadius: "6px",
            color: "#94a3b8", padding: "0.4rem 0.8rem", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem",
          }}
        >
          <List size={14} /> 목차
        </button>
        <span>{current + 1} / {allSlides.length}</span>
      </div>

      {/* TOC overlay */}
      <AnimatePresence>
        {showToc && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute", top: "5rem", left: 0, right: 0, zIndex: 50,
              background: "#1a1d24", border: "1px solid #2d3748", borderRadius: "12px",
              padding: "1.5rem", maxHeight: "60vh", overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 600, color: "#e2e8f0" }}>목차</span>
              <button onClick={() => setShowToc(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>
            {tocGroups.map((group, gi) => (
              <div key={gi} style={{ marginBottom: "1rem" }}>
                <p style={{ color: "var(--accent-blue)", fontSize: "0.8rem", fontWeight: 600, margin: "0 0 0.4rem", letterSpacing: "0.5px" }}>
                  {group.section}
                </p>
                {group.slides.map((s) => (
                  <button
                    key={s.idx}
                    onClick={() => { setCurrent(s.idx); setShowToc(false); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: s.idx === current ? "rgba(59,130,246,0.1)" : "transparent",
                      border: "none", borderRadius: "6px",
                      padding: "0.4rem 0.8rem", margin: "2px 0",
                      color: s.idx === current ? "var(--accent-blue)" : "#94a3b8",
                      fontSize: "0.9rem", cursor: "pointer",
                    }}
                  >
                    {s.title || "(본문)"}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Label */}
      {slide.sectionTitle && (
        <p style={{
          color: "var(--accent-blue)", fontSize: "0.8rem", fontWeight: 600,
          letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.8rem",
        }}>
          {slide.sectionTitle}
        </p>
      )}

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <Slide subSlide={slide} chapterId={chapterId} sectionTitle={slide.sectionTitle} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: "1.5rem",
      }}>
        <button
          data-slide-prev
          onClick={prev}
          disabled={current === 0}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: current === 0 ? "transparent" : "#1e293b",
            border: `1px solid ${current === 0 ? "#1e293b" : "#334155"}`,
            borderRadius: "8px", padding: "0.6rem 1.2rem",
            color: current === 0 ? "#334155" : "#e2e8f0",
            cursor: current === 0 ? "default" : "pointer",
            fontSize: "0.9rem",
          }}
        >
          <ChevronLeft size={16} /> 이전
        </button>

        <button
          data-slide-next
          onClick={next}
          disabled={current === allSlides.length - 1}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: current === allSlides.length - 1 ? "transparent" : "var(--accent-blue)",
            border: "none", borderRadius: "8px", padding: "0.6rem 1.2rem",
            color: current === allSlides.length - 1 ? "#334155" : "#fff",
            cursor: current === allSlides.length - 1 ? "default" : "pointer",
            fontSize: "0.9rem", fontWeight: 600,
          }}
        >
          다음 <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
