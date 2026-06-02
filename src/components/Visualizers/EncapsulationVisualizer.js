"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const layers = [
  { id: "app", name: "Application", color: "#ff0055", label: "Message" },
  { id: "transport", name: "Transport", color: "#9d4edd", label: "Segment", header: "TCP/UDP Header" },
  { id: "network", name: "Network", color: "#00f0ff", label: "Datagram", header: "IP Header" },
  { id: "link", name: "Link", color: "#00ff88", label: "Frame", header: "MAC Header" },
];

export default function EncapsulationVisualizer() {
  const [currentLayer, setCurrentLayer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLayer((prev) => (prev + 1) % (layers.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: "2rem", margin: "2rem 0", textAlign: "center" }}>
      <h3 style={{ marginBottom: "1rem", color: "var(--accent-blue)" }}>데이터 캡슐화 (Encapsulation) 시각화</h3>
      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
        데이터가 위에서 아래로 내려올 때마다 각 계층의 <strong>헤더(Header)</strong>가 추가됩니다.
      </p>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {/* Layer Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "200px" }}>
          {layers.map((layer, idx) => (
            <div 
              key={layer.id}
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                backgroundColor: currentLayer >= idx ? layer.color : "var(--glass-border)",
                color: currentLayer >= idx ? "#fff" : "var(--text-secondary)",
                fontWeight: "bold",
                transition: "all 0.3s",
                boxShadow: currentLayer === idx ? `0 0 15px ${layer.color}` : "none",
                opacity: currentLayer >= idx ? 1 : 0.5
              }}
            >
              {layer.name} Layer
            </div>
          ))}
          <div style={{ padding: "0.8rem", borderRadius: "8px", backgroundColor: "var(--glass-border)", color: "var(--text-secondary)", opacity: 0.5 }}>
            Physical Layer (Bits)
          </div>
        </div>

        {/* Packet Data Visualization */}
        <div style={{ display: "flex", alignItems: "center", minHeight: "250px", minWidth: "350px", border: "1px dashed var(--glass-border)", borderRadius: "12px", padding: "1rem" }}>
          <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
            <motion.div
              layout
              style={{
                display: "flex",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid var(--glass-border)",
              }}
            >
              {layers.map((layer, idx) => {
                if (idx > currentLayer || !layer.header) return null;
                return (
                  <motion.div
                    key={`header-${layer.id}`}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    style={{
                      padding: "1rem 0.5rem",
                      backgroundColor: layer.color,
                      color: "#fff",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {layer.header}
                  </motion.div>
                );
              }).reverse()}
              
              <div style={{
                padding: "1rem 2rem",
                backgroundColor: layers[0].color,
                color: "#fff",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center"
              }}>
                Data (Message)
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: "1rem", fontSize: "1.1rem", fontWeight: "bold", color: "#fff" }}>
        현재 상태: <span style={{ color: currentLayer < layers.length ? layers[currentLayer].color : "#fff" }}>
          {currentLayer < layers.length ? layers[currentLayer].label : "Bits 전송 중..."}
        </span>
      </div>
    </div>
  );
}
