"use client";

import { useState } from "react";
import glossary from "@/lib/glossary";

export default function Term({ children }) {
  const [show, setShow] = useState(false);
  const text = typeof children === "string" ? children : "";
  const definition = glossary[text] || glossary[text.replace(/s$/, "")] || null;

  if (!definition) {
    return <span style={{ color: "#38bdf8", fontWeight: 700 }}>{children}</span>;
  }

  return (
    <span
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span style={{
        color: "#38bdf8",
        fontWeight: 700,
        borderBottom: "1px dashed #38bdf880",
        cursor: "help",
      }}>
        {children}
      </span>
      {show && (
        <span style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "0.8rem 1rem",
          width: "300px",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          color: "#cbd5e1",
          zIndex: 999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          pointerEvents: "none",
        }}>
          <span style={{ display: "block", fontWeight: 700, color: "#38bdf8", marginBottom: "0.3rem", fontSize: "0.85rem" }}>
            {text}
          </span>
          {definition}
          <span style={{
            position: "absolute",
            bottom: "-6px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            background: "#1e293b",
            border: "1px solid #334155",
            borderTop: "none",
            borderLeft: "none",
          }} />
        </span>
      )}
    </span>
  );
}
