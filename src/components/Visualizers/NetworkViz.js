"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   Store-and-Forward 애니메이션
   패킷이 라우터를 거치며 전달되는 과정을
   단계별로 보여준다.
   ═══════════════════════════════════════ */
export function StoreForwardViz() {
  const [step, setStep] = useState(0);
  const maxStep = 5;

  const steps = [
    "송신 호스트가 메시지를 3개 패킷으로 분할합니다.",
    "패킷 1이 링크를 통해 Router 1로 전송됩니다. (transmission delay = L/R)",
    "Router 1이 패킷 1 전체를 수신 완료 → 저장 후 Router 2로 전달 시작. 동시에 패킷 2가 Router 1로 전송됩니다.",
    "파이프라이닝: Router 2가 패킷 1을 수신자에게 전달하는 동안, Router 1은 패킷 2를, 송신자는 패킷 3을 전송합니다.",
    "모든 패킷이 수신 호스트에 도착합니다. 패킷들은 원래 순서대로 재조립됩니다.",
    "핵심: store-and-forward이므로 패킷 '전체'가 도착해야 다음 링크로 전달 시작!",
  ];

  const nodes = ["송신자", "Router 1", "Router 2", "수신자"];
  
  // Packet positions based on step
  const getPackets = () => {
    switch (step) {
      case 0: return [{ id: 1, at: 0 }, { id: 2, at: 0 }, { id: 3, at: 0 }];
      case 1: return [{ id: 1, at: 0.5 }, { id: 2, at: 0 }, { id: 3, at: 0 }];
      case 2: return [{ id: 1, at: 1.5 }, { id: 2, at: 0.5 }, { id: 3, at: 0 }];
      case 3: return [{ id: 1, at: 2.5 }, { id: 2, at: 1.5 }, { id: 3, at: 0.5 }];
      case 4: return [{ id: 1, at: 3 }, { id: 2, at: 3 }, { id: 3, at: 3 }];
      case 5: return [{ id: 1, at: 3 }, { id: 2, at: 3 }, { id: 3, at: 3 }];
      default: return [];
    }
  };

  const colors = ["#3b82f6", "#22c55e", "#f59e0b"];

  return (
    <div style={{
      background: "#1e2128", borderRadius: "16px", border: "1px solid #2d3748",
      padding: "2rem 2.5rem", marginBottom: "2rem",
    }}>
      <span style={{ display: "inline-block", background: "#3b82f618", color: "#3b82f6", padding: "0.25rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem" }}>
        인터랙티브
      </span>
      <h2 style={{ fontSize: "1.5rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>
        Store-and-Forward 전송 과정
      </h2>
      <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "1.5rem" }}>
        아래 버튼을 클릭하여 패킷이 라우터를 거쳐 전달되는 과정을 단계별로 확인하세요.
      </p>

      {/* Network diagram */}
      <div style={{ position: "relative", height: "120px", margin: "1rem 0 2rem" }}>
        {/* Links */}
        <div style={{ position: "absolute", top: "24px", left: "10%", right: "10%", height: "2px", background: "#334155" }} />
        
        {/* Nodes */}
        {nodes.map((name, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, left: `${10 + i * 26.6}%`, transform: "translateX(-50%)",
            textAlign: "center",
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "10px",
              background: i === 0 || i === 3 ? "#1e293b" : "#0c1220",
              border: `2px solid ${i === 0 || i === 3 ? "#3b82f6" : "#f59e0b"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 0.4rem", fontSize: "1.2rem",
            }}>
              {i === 0 ? "💻" : i === 3 ? "🖥️" : "📡"}
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600 }}>{name}</div>
          </div>
        ))}

        {/* Packets */}
        {getPackets().map((pkt) => (
          <motion.div
            key={pkt.id}
            animate={{ left: `${10 + pkt.at * 26.6}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "12px",
              transform: "translateX(-50%)",
              width: "28px", height: "28px", borderRadius: "6px",
              background: colors[pkt.id - 1],
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: 700, color: "#fff",
              boxShadow: `0 0 12px ${colors[pkt.id - 1]}60`,
              zIndex: 10,
            }}
          >
            P{pkt.id}
          </motion.div>
        ))}
      </div>

      {/* Step description */}
      <div style={{
        background: "#0c1220", borderRadius: "8px", padding: "1rem 1.5rem",
        border: "1px solid #1e293b", marginBottom: "1.5rem",
        minHeight: "50px", display: "flex", alignItems: "center",
      }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{ color: "#e2e8f0", fontSize: "1.05rem", margin: 0, lineHeight: "1.6" }}
          >
            <span style={{ color: "#3b82f6", fontWeight: 700, marginRight: "0.5rem" }}>Step {step + 1}.</span>
            {steps[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setStep(0)} style={{ background: "none", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.85rem" }}>
          처음으로
        </button>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ background: step === 0 ? "transparent" : "#1e293b", border: "1px solid #334155", borderRadius: "6px", color: step === 0 ? "#334155" : "#e2e8f0", padding: "0.4rem 0.8rem", cursor: step === 0 ? "default" : "pointer", fontSize: "0.85rem" }}>
          ← 이전
        </button>
        <button onClick={() => setStep(s => Math.min(maxStep, s + 1))} disabled={step === maxStep}
          style={{ background: step === maxStep ? "transparent" : "#3b82f6", border: "none", borderRadius: "6px", color: step === maxStep ? "#334155" : "#fff", padding: "0.4rem 1rem", cursor: step === maxStep ? "default" : "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
          다음 →
        </button>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════
   Queueing & Packet Loss 애니메이션
   큐에 패킷이 쌓이다가 넘치면 loss 발생
   ═══════════════════════════════════════ */
export function QueueingViz() {
  const [queue, setQueue] = useState([]);
  const [lost, setLost] = useState(0);
  const [processed, setProcessed] = useState(0);
  const maxQueue = 6;
  const nextId = useRef(1);

  const addPacket = () => {
    if (queue.length >= maxQueue) {
      setLost(l => l + 1);
    } else {
      setQueue(q => [...q, { id: nextId.current++ }]);
    }
  };

  const processPacket = () => {
    if (queue.length > 0) {
      setQueue(q => q.slice(1));
      setProcessed(p => p + 1);
    }
  };

  const burst = () => {
    let added = 0;
    let lostCount = 0;
    const newQueue = [...queue];
    for (let i = 0; i < 5; i++) {
      if (newQueue.length >= maxQueue) {
        lostCount++;
      } else {
        newQueue.push({ id: nextId.current++ });
        added++;
      }
    }
    setQueue(newQueue);
    setLost(l => l + lostCount);
  };

  const reset = () => {
    setQueue([]);
    setLost(0);
    setProcessed(0);
    nextId.current = 1;
  };

  return (
    <div style={{
      background: "#1e2128", borderRadius: "16px", border: "1px solid #2d3748",
      padding: "2rem 2.5rem", marginBottom: "2rem",
    }}>
      <span style={{ display: "inline-block", background: "#f59e0b18", color: "#f59e0b", padding: "0.25rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem" }}>
        인터랙티브
      </span>
      <h2 style={{ fontSize: "1.5rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>
        Queueing Delay & Packet Loss
      </h2>
      <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "1.5rem" }}>
        패킷을 추가하고 처리하면서 큐가 어떻게 동작하는지 직접 실험해보세요. 큐가 꽉 찬 상태에서 패킷이 도착하면 <span style={{ color: "#ef4444", fontWeight: 700 }}>loss</span>가 발생합니다.
      </p>

      {/* Router queue visualization */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", margin: "1.5rem 0" }}>
        {/* Incoming */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>📨</div>
          <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>도착</div>
        </div>

        <div style={{ fontSize: "1.2rem", color: "#475569" }}>→</div>

        {/* Queue */}
        <div style={{
          display: "flex", gap: "4px", padding: "8px",
          background: "#0c1220", borderRadius: "10px",
          border: `2px solid ${queue.length >= maxQueue ? "#ef4444" : "#334155"}`,
          minWidth: "250px", height: "56px", alignItems: "center",
          transition: "border-color 0.3s",
        }}>
          <AnimatePresence>
            {queue.map((pkt) => (
              <motion.div
                key={pkt.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{
                  width: "36px", height: "36px", borderRadius: "6px",
                  background: "#3b82f6", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 700, color: "#fff",
                }}
              >
                P{pkt.id}
              </motion.div>
            ))}
          </AnimatePresence>
          {queue.length === 0 && (
            <span style={{ color: "#475569", fontSize: "0.85rem", padding: "0 0.5rem" }}>큐가 비어있음</span>
          )}
        </div>
        <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
          {queue.length}/{maxQueue}
        </div>

        <div style={{ fontSize: "1.2rem", color: "#475569" }}>→</div>

        {/* Output */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>📤</div>
          <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>전송</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1rem", margin: "1rem 0 1.5rem" }}>
        <div style={{ background: "#0c1220", borderRadius: "8px", padding: "0.8rem 1.2rem", flex: 1, textAlign: "center" }}>
          <div style={{ color: "#22c55e", fontSize: "1.5rem", fontWeight: 700 }}>{processed}</div>
          <div style={{ color: "#64748b", fontSize: "0.8rem" }}>처리 완료</div>
        </div>
        <div style={{ background: "#0c1220", borderRadius: "8px", padding: "0.8rem 1.2rem", flex: 1, textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: "1.5rem", fontWeight: 700 }}>{queue.length}</div>
          <div style={{ color: "#64748b", fontSize: "0.8rem" }}>큐 대기중</div>
        </div>
        <div style={{ background: lost > 0 ? "#7f1d1d20" : "#0c1220", borderRadius: "8px", padding: "0.8rem 1.2rem", flex: 1, textAlign: "center", border: lost > 0 ? "1px solid #ef444440" : "none" }}>
          <div style={{ color: "#ef4444", fontSize: "1.5rem", fontWeight: 700 }}>{lost}</div>
          <div style={{ color: "#64748b", fontSize: "0.8rem" }}>패킷 손실</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button onClick={addPacket} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "6px", color: "#e2e8f0", padding: "0.5rem 1rem", cursor: "pointer", fontSize: "0.9rem" }}>
          + 패킷 1개 추가
        </button>
        <button onClick={burst} style={{ background: "#7c2d12", border: "none", borderRadius: "6px", color: "#fed7aa", padding: "0.5rem 1rem", cursor: "pointer", fontSize: "0.9rem" }}>
          ⚡ 버스트 (5개 한번에)
        </button>
        <button onClick={processPacket} disabled={queue.length === 0}
          style={{ background: queue.length === 0 ? "transparent" : "#166534", border: "none", borderRadius: "6px", color: queue.length === 0 ? "#334155" : "#bbf7d0", padding: "0.5rem 1rem", cursor: queue.length === 0 ? "default" : "pointer", fontSize: "0.9rem" }}>
          ✓ 패킷 1개 처리
        </button>
        <button onClick={reset} style={{ background: "none", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", padding: "0.5rem 0.8rem", cursor: "pointer", fontSize: "0.85rem" }}>
          초기화
        </button>
      </div>
    </div>
  );
}
