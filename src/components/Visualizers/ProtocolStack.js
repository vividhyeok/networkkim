"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const layers = [
  { id: "app", name: "Application Layer", color: "#ff0055", desc: "네트워크 애플리케이션과 사용자가 직접 만나는 계층. 앱 간의 메시지 교환을 담당합니다.", examples: "HTTP, SMTP, DNS" },
  { id: "transport", name: "Transport Layer", color: "#9d4edd", desc: "프로세스 간의 신뢰성 있는 또는 빠른 데이터 전달을 담당합니다. (포트 번호 사용)", examples: "TCP, UDP" },
  { id: "network", name: "Network Layer", color: "#00f0ff", desc: "출발지 호스트에서 목적지 호스트까지 패킷의 최적 경로를 찾아 전달합니다. (IP 주소 사용)", examples: "IP, Routing Protocols" },
  { id: "link", name: "Link Layer", color: "#00ff88", desc: "직접 연결된 이웃 노드 간에 안전하게 프레임을 전달합니다. (MAC 주소 사용)", examples: "Ethernet, Wi-Fi" },
  { id: "physical", name: "Physical Layer", color: "#fcd34d", desc: "비트(0과 1)를 전기적/광학적 신호로 변환하여 물리적 매체(케이블, 무선파)로 전송합니다.", examples: "Copper Wire, Fiber, Radio" },
];

export default function ProtocolStack() {
  const [activeLayer, setActiveLayer] = useState(null);

  return (
    <div className="glass-panel" style={{ padding: "2rem", margin: "2rem 0" }}>
      <h3 style={{ margin: "0 0 1.5rem 0", color: "#fff", textAlign: "center" }}>인터넷 5계층 프로토콜 스택</h3>
      
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "300px" }}>
          {layers.map((layer) => (
            <motion.div
              key={layer.id}
              onClick={() => setActiveLayer(layer.id === activeLayer ? null : layer.id)}
              whileHover={{ scale: 1.02, x: 5 }}
              style={{
                background: activeLayer === layer.id ? layer.color : "rgba(255, 255, 255, 0.05)",
                color: activeLayer === layer.id ? "#000" : "#fff",
                padding: "1rem",
                borderRadius: "8px",
                cursor: "pointer",
                border: `1px solid ${activeLayer === layer.id ? "transparent" : "var(--glass-border)"}`,
                fontWeight: "bold",
                textAlign: "center",
                transition: "background 0.3s, color 0.3s",
                boxShadow: activeLayer === layer.id ? `0 0 15px ${layer.color}` : "none"
              }}
            >
              {layer.name}
            </motion.div>
          ))}
        </div>

        {/* Details Panel */}
        <div style={{ width: "300px", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            {activeLayer ? (
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  padding: "1.5rem",
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: "12px",
                  borderLeft: `4px solid ${layers.find(l => l.id === activeLayer).color}`
                }}
              >
                <h4 style={{ color: layers.find(l => l.id === activeLayer).color, margin: "0 0 1rem 0" }}>
                  {layers.find(l => l.id === activeLayer).name}
                </h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1rem" }}>
                  {layers.find(l => l.id === activeLayer).desc}
                </p>
                <div style={{ fontSize: "0.85rem", color: "#fff", background: "rgba(255,255,255,0.1)", padding: "0.5rem", borderRadius: "4px" }}>
                  <strong>예시 프로토콜:</strong> {layers.find(l => l.id === activeLayer).examples}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: "var(--text-secondary)", textAlign: "center", fontStyle: "italic" }}
              >
                계층을 클릭하여 자세한 설명을 확인하세요.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
