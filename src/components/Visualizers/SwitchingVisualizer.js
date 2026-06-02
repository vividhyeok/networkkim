"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SwitchingVisualizer() {
  const [mode, setMode] = useState("packet"); // "packet" or "circuit"
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 4000);
  };

  return (
    <div className="glass-panel" style={{ padding: "2rem", margin: "2rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0, color: "var(--accent-pink)" }}>네트워크 스위칭 방식 비교</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button 
            onClick={() => setMode("packet")}
            style={{ 
              padding: "0.5rem 1rem", 
              borderRadius: "8px", 
              border: "1px solid var(--accent-pink)",
              background: mode === "packet" ? "var(--accent-pink)" : "transparent",
              color: mode === "packet" ? "#fff" : "var(--accent-pink)",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Packet Switching
          </button>
          <button 
            onClick={() => setMode("circuit")}
            style={{ 
              padding: "0.5rem 1rem", 
              borderRadius: "8px", 
              border: "1px solid var(--accent-blue)",
              background: mode === "circuit" ? "var(--accent-blue)" : "transparent",
              color: mode === "circuit" ? "#fff" : "var(--accent-blue)",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Circuit Switching
          </button>
        </div>
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "2rem" }}>
        {mode === "packet" 
          ? "패킷 스위칭: 데이터를 작은 패킷으로 쪼개서 각자 최적의 경로를 찾아 이동합니다. (인터넷 방식)"
          : "서킷 스위칭: 통신 전에 전용 경로(회선)를 예약하고 그 경로로만 데이터를 보냅니다. (전화망 방식)"}
      </p>

      <div style={{ position: "relative", height: "150px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem" }}>
        {/* Nodes */}
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>A</div>
        
        {/* Middle Router */}
        <div style={{ width: "50px", height: "50px", background: "var(--bg-panel)", border: "2px solid var(--accent-purple)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, color: "var(--accent-purple)", fontSize: "0.8rem", fontWeight: "bold" }}>Router</div>

        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>B</div>

        {/* Path Lines */}
        <div style={{ position: "absolute", top: "75px", left: "60px", right: "60px", height: "2px", background: mode === "circuit" && isSending ? "var(--accent-blue)" : "var(--glass-border)", zIndex: 1, boxShadow: mode === "circuit" && isSending ? "0 0 10px var(--accent-blue)" : "none", transition: "all 0.3s" }}></div>

        {/* Animated Data */}
        {isSending && mode === "packet" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`packet-${i}`}
                initial={{ left: "60px", opacity: 0 }}
                animate={{ left: ["60px", "50%", "calc(100% - 60px)"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.4, ease: "linear" }}
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  background: "var(--accent-pink)",
                  borderRadius: "4px",
                  top: "65px",
                  zIndex: 5,
                  boxShadow: "0 0 10px var(--accent-pink)"
                }}
              />
            ))}
          </>
        )}

        {isSending && mode === "circuit" && (
          <motion.div
            initial={{ left: "60px", width: "0%" }}
            animate={{ width: "calc(100% - 120px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              height: "10px",
              background: "rgba(0, 240, 255, 0.5)",
              top: "71px",
              zIndex: 5,
              borderRadius: "5px",
              boxShadow: "0 0 15px var(--accent-blue)"
            }}
          />
        )}
      </div>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <button 
          onClick={handleSend}
          disabled={isSending}
          style={{
            padding: "0.8rem 2rem",
            background: isSending ? "var(--glass-border)" : "linear-gradient(90deg, var(--accent-purple), var(--accent-pink))",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: isSending ? "not-allowed" : "pointer"
          }}
        >
          데이터 전송 시뮬레이션
        </button>
      </div>
    </div>
  );
}
