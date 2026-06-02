"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

export default function KidsExplanation({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="kids-explanation glass-panel" style={{ cursor: "pointer", transition: "all 0.3s" }} onClick={() => setIsOpen(!isOpen)}>
      <div className="kids-explanation-title">
        <Lightbulb size={24} color="#fcd34d" />
        <span style={{ color: "#fff", flex: 1 }}>{title || "12살도 이해하는 쉬운 설명 보기"}</span>
        {isOpen ? <ChevronUp size={20} color="#fff" /> : <ChevronDown size={20} color="#fff" />}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
