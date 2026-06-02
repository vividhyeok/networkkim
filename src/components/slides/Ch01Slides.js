"use client";

import { useState } from "react";
import { Monitor, Radio, Wifi, Server, ArrowRight, ArrowDown, Shield, Bug, Eye, UserX, Clock, Layers, Zap, BarChart3 } from "lucide-react";
import Term from "@/components/Term";
import { StoreForwardViz, QueueingViz } from "@/components/Visualizers/NetworkViz";

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch01
   ═══════════════════════════════════════════ */

const s = {
  slide: {
    background: "#1e2128",
    borderRadius: "16px",
    border: "1px solid #2d3748",
    padding: "3rem",
    marginBottom: "2rem",
    minHeight: "420px",
  },
  tag: (color) => ({
    display: "inline-block",
    background: `${color}18`,
    color: color,
    padding: "0.25rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: 600,
    letterSpacing: "0.5px",
    marginBottom: "1rem",
  }),
  title: {
    fontSize: "1.7rem",
    color: "#f1f5f9",
    fontWeight: 700,
    marginBottom: "1.5rem",
  },
  subtitle: {
    fontSize: "1.15rem",
    color: "#94a3b8",
    lineHeight: "1.7",
    marginBottom: "1.5rem",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "1rem",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: (borderColor = "#334155") => ({
    background: "#161920",
    border: `1px solid ${borderColor}`,
    borderRadius: "12px",
    padding: "1.5rem",
  }),
  keyword: {
    color: "#38bdf8",
    fontWeight: 700,
  },
  label: (color) => ({
    fontSize: "0.8rem",
    fontWeight: 600,
    color: color,
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  }),
  bullet: {
    fontSize: "1.1rem",
    color: "#cbd5e1",
    lineHeight: "1.8",
    margin: "0.3rem 0",
    paddingLeft: "1.2rem",
    position: "relative",
  },
  dot: (color = "#3b82f6") => ({
    position: "absolute",
    left: 0,
    top: "0.6rem",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: color,
  }),
  formula: {
    background: "#0c1220",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "1.2rem 1.5rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "1.1rem",
    color: "#7dd3fc",
    margin: "1rem 0",
    textAlign: "center",
  },
  stackLayer: (bg, color) => ({
    padding: "1rem 1.5rem",
    background: bg,
    color: color,
    fontWeight: 600,
    fontSize: "1.1rem",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  vsBox: (color) => ({
    flex: 1,
    background: "#161920",
    border: `1px solid ${color}40`,
    borderRadius: "12px",
    padding: "2rem",
    borderTop: `3px solid ${color}`,
  }),
};

function Bullet({ children, color = "#3b82f6" }) {
  return (
    <div style={s.bullet}>
      <span style={s.dot(color)} />
      {children}
    </div>
  );
}

/* ── SLIDE: 인터넷 구성요소 ── */
function SlideComponents() {
  const items = [
    { icon: <Monitor size={28} />, label: <><Term>Host</Term> (<Term>End System</Term>)</>, desc: "PC, 스마트폰, 서버 등 앱이 실행되는 끝 장치", color: "#3b82f6" },
    { icon: <Radio size={28} />, label: "Communication Link", desc: "fiber, copper, radio 등 bit를 전달하는 물리 매체", color: "#22c55e" },
    { icon: <Server size={28} />, label: <><Term>Packet</Term> Switch</>, desc: <><Term>Router</Term>와 <Term>Switch</Term>. 패킷을 받아 다음 방향으로 전달</>, color: "#f59e0b" },
    { icon: <Layers size={28} />, label: <Term>Protocol</Term>, desc: "메시지의 형식, 순서, 동작 규칙을 정의", color: "#a78bfa" },
  ];
  return (
    <div style={s.slide}>
      <span style={s.tag("#3b82f6")}>핵심 개념</span>
      <h2 style={s.title}>인터넷의 구성요소</h2>
      <p style={s.subtitle}>인터넷은 단일 거대망이 아니라 여러 <Term>ISP</Term>와 기관망이 서로 연결된 <span style={s.keyword}>Network of Networks</span>다.</p>
      <div style={s.grid2}>
        {items.map((item, i) => (
          <div key={i} style={{ ...s.card(item.color + "40"), display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ color: item.color, flexShrink: 0, marginTop: "0.2rem" }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "1.1rem", marginBottom: "0.3rem" }}>{item.label}</div>
              <div style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.5" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SLIDE: Network Edge ── */
function SlideEdge() {
  const items = [
    { label: "DSL", desc: "전화선 기반, 주파수 대역 분리", type: "dedicated" },
    { label: "Cable", desc: "케이블 TV망, 공유 매체 → 혼잡 가능", type: "shared" },
    { label: "Home Network", desc: "modem + router + Wi-Fi AP 조합", type: "shared" },
    { label: "Enterprise Ethernet", desc: "회사/학교 LAN, switch 중심", type: "dedicated" },
    { label: "Wireless", desc: "Wi-Fi, cellular. AP/기지국 경유", type: "shared" },
  ];
  return (
    <div style={s.slide}>
      <span style={s.tag("#22c55e")}>네트워크 가장자리</span>
      <h2 style={s.title}>Access Network 유형</h2>
      <p style={s.subtitle}>핵심 구분: <span style={s.keyword}>Dedicated Access</span> vs <span style={s.keyword}>Shared Access</span> — 공유 매체에서는 충돌/혼잡/접속 제어 문제 발생</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.8rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{
            ...s.card(item.type === "dedicated" ? "#3b82f640" : "#f59e0b40"),
            borderTop: `3px solid ${item.type === "dedicated" ? "#3b82f6" : "#f59e0b"}`,
          }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: item.type === "dedicated" ? "#3b82f6" : "#f59e0b", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              {item.type}
            </div>
            <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "1.1rem", marginBottom: "0.3rem" }}>{item.label}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SLIDE: Packet vs Circuit Switching ── */
function SlideSwitching() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#a78bfa")}>핵심 비교</span>
      <h2 style={s.title}>Packet Switching vs Circuit Switching</h2>
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem" }}>
        <div style={s.vsBox("#3b82f6")}>
          <h3 style={{ color: "#3b82f6", fontSize: "1.3rem", marginBottom: "1rem" }}>📦 Packet Switching</h3>
          <Bullet>메시지를 <span style={s.keyword}><Term>Packet</Term></span>으로 쪼개서 전송</Bullet>
          <Bullet>링크를 <span style={s.keyword}>예약하지 않음</span></Bullet>
          <Bullet><span style={s.keyword}><Term>Store-and-forward</Term></span>: 전체 패킷 도착 후 전달</Bullet>
          <Bullet color="#22c55e">Bursty traffic에 효율적</Bullet>
          <Bullet color="#ef4444"><Term>Queueing delay</Term>, <Term>Packet loss</Term> 가능</Bullet>
          <div style={s.formula}>transmission delay = L / R</div>
        </div>
        <div style={s.vsBox("#f59e0b")}>
          <h3 style={{ color: "#f59e0b", fontSize: "1.3rem", marginBottom: "1rem" }}>📞 Circuit Switching</h3>
          <Bullet>통신 전에 <span style={s.keyword}>회선 자원을 예약</span></Bullet>
          <Bullet>전화망식 사고방식</Bullet>
          <Bullet><span style={s.keyword}><Term>FDM</Term></span>: 주파수 대역 분할</Bullet>
          <Bullet><span style={s.keyword}><Term>TDM</Term></span>: 시간 슬롯 분할</Bullet>
          <Bullet color="#22c55e">보장된 자원 (일정 품질)</Bullet>
          <Bullet color="#ef4444">안 쓸 때도 자원이 묶임</Bullet>
        </div>
      </div>
      <div style={{ marginTop: "1.5rem", background: "rgba(59,130,246,0.06)", padding: "1rem 1.5rem", borderRadius: "10px", borderLeft: "3px solid var(--accent-blue)", fontSize: "1.1rem", color: "#e2e8f0" }}>
        💡 결론: 인터넷의 bursty data에는 <span style={s.keyword}>Packet Switching</span>이 일반적으로 더 적합하다.
      </div>
    </div>
  );
}

/* ── SLIDE: Delay ── */
function SlideDelay() {
  const delays = [
    { label: "Processing", desc: "header 확인, 오류 검사, forwarding 결정", icon: <Zap size={20} />, color: "#3b82f6" },
    { label: "Queueing", desc: "output link 앞 queue 대기. 혼잡 시 급증", icon: <Clock size={20} />, color: "#f59e0b" },
    { label: "Transmission", desc: "패킷 bit를 link에 밀어넣는 시간 = L/R", icon: <ArrowRight size={20} />, color: "#22c55e" },
    { label: "Propagation", desc: "신호가 매체를 따라 이동 = d/s", icon: <Radio size={20} />, color: "#a78bfa" },
  ];
  return (
    <div style={s.slide}>
      <span style={s.tag("#f59e0b")}>성능 지표</span>
      <h2 style={s.title}>Packet Delay의 4요소</h2>
      <div style={s.formula}>nodal delay = d_proc + d_queue + d_trans + d_prop</div>
      <div style={{ display: "flex", gap: "0", marginTop: "1.5rem", borderRadius: "12px", overflow: "hidden", border: "1px solid #2d3748" }}>
        {delays.map((d, i) => (
          <div key={i} style={{
            flex: 1,
            padding: "1.5rem 1rem",
            background: "#161920",
            borderRight: i < 3 ? "1px solid #2d3748" : "none",
            textAlign: "center",
          }}>
            <div style={{ color: d.color, marginBottom: "0.5rem", display: "flex", justifyContent: "center" }}>{d.icon}</div>
            <div style={{ fontWeight: 700, color: d.color, fontSize: "1rem", marginBottom: "0.5rem" }}>{d.label}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.4" }}>{d.desc}</div>
            {i < 3 && <div style={{ position: "absolute", right: "-12px", top: "50%", color: "#475569" }}></div>}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <Bullet><span style={s.keyword}><Term>Packet loss</Term></span> = queue가 꽉 찼을 때 발생</Bullet>
        <Bullet><span style={s.keyword}><Term>Throughput</Term></span> = end-to-end 실제 전달 속도. 가장 느린 link가 <span style={s.keyword}>병목(bottleneck)</span></Bullet>
      </div>
    </div>
  );
}

/* ── SLIDE: Protocol Stack ── */
function SlideProtocol() {
  const layers = [
    { name: "Application", role: "앱 간 메시지 의미", ex: "HTTP, SMTP, DNS", bg: "#1e3a5f", color: "#60a5fa" },
    { name: "Transport", role: "process 간 논리 통신", ex: "TCP, UDP", bg: "#1a3a2a", color: "#4ade80" },
    { name: "Network", role: "host 간 packet 전달", ex: "IP", bg: "#3b2a1a", color: "#fb923c" },
    { name: "Link", role: "인접 node 간 frame 전달", ex: "Ethernet, Wi-Fi", bg: "#3b1a3a", color: "#c084fc" },
    { name: "Physical", role: "bit의 물리적 전송", ex: "copper, fiber, radio", bg: "#3b1a1a", color: "#f87171" },
  ];
  return (
    <div style={s.slide}>
      <span style={s.tag("#a78bfa")}>계층 구조</span>
      <h2 style={s.title}>Internet Protocol Stack (5계층)</h2>
      <p style={s.subtitle}>핵심 그림은 <span style={s.keyword}><Term>Encapsulation</Term></span> — 위 계층 데이터에 아래 계층 header가 계속 붙는다.</p>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #2d3748", maxWidth: "700px" }}>
        {layers.map((l, i) => (
          <div key={i} style={s.stackLayer(l.bg, l.color)}>
            <span style={{ fontWeight: 800, fontSize: "1.2rem" }}>{l.name}</span>
            <span style={{ fontSize: "0.95rem", opacity: 0.9 }}>{l.role}</span>
            <span style={{ fontSize: "0.85rem", opacity: 0.7, fontFamily: "monospace" }}>{l.ex}</span>
          </div>
        ))}
      </div>
      {/* Encapsulation visual */}
      <div style={{ marginTop: "2rem" }}>
        <p style={{ ...s.label("#94a3b8"), marginBottom: "1rem" }}>Encapsulation 과정</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "700px" }}>
          {[
            { headers: [], data: "Message", color: "#60a5fa" },
            { headers: ["Ht"], data: "Message", color: "#4ade80" },
            { headers: ["Hn", "Ht"], data: "Message", color: "#fb923c" },
            { headers: ["Hl", "Hn", "Ht"], data: "Message", color: "#c084fc" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", borderRadius: "6px", overflow: "hidden", fontSize: "0.95rem" }}>
              {row.headers.map((h, j) => (
                <div key={j} style={{ padding: "0.5rem 0.8rem", background: `${row.color}30`, color: row.color, fontWeight: 600, borderRight: "1px solid #0f1115" }}>{h}</div>
              ))}
              <div style={{ flex: 1, padding: "0.5rem 1rem", background: "#1e293b", color: "#cbd5e1" }}>{row.data}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Security ── */
function SlideSecurity() {
  const threats = [
    { icon: <Bug size={24} />, label: <Term>Malware</Term>, desc: "host 침투 → 데이터 탈취/파괴, 봇넷 구성", color: "#ef4444" },
    { icon: <BarChart3 size={24} />, label: <Term>DDoS</Term>, desc: "과도한 트래픽으로 서버/네트워크 마비", color: "#f59e0b" },
    { icon: <Eye size={24} />, label: <><Term>Sniffing</Term></>, desc: "shared media에서 패킷을 엿봄", color: "#a78bfa" },
    { icon: <UserX size={24} />, label: <><Term>Spoofing</Term></>, desc: "source address를 위조하여 패킷 전송", color: "#f472b6" },
  ];
  return (
    <div style={s.slide}>
      <span style={s.tag("#ef4444")}>보안</span>
      <h2 style={s.title}>Network Security 위협</h2>
      <div style={s.grid2}>
        {threats.map((t, i) => (
          <div key={i} style={{ ...s.card(t.color + "40"), display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ color: t.color, flexShrink: 0, marginTop: "0.2rem" }}>{t.icon}</div>
            <div>
              <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "1.15rem", marginBottom: "0.3rem" }}>{t.label}</div>
              <div style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: "1.5" }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SLIDE: 시험 포인트 ── */
function SlideExam() {
  const points = [
    "Internet을 nuts-and-bolts view와 service view로 각각 설명",
    "Protocol 정의를 \"format, order, actions\"로 설명",
    "Packet switching과 circuit switching의 차이를 FDM/TDM까지 연결",
    "L/R, d/s, nodal delay 4요소를 구분",
    "Throughput에서 병목 link 찾기",
    "5계층과 encapsulation 방향 설명",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>시험/복습 체크리스트</h2>
      <p style={s.subtitle}>아래 항목을 모두 설명할 수 있으면 이 장은 완벽합니다.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {points.map((p, i) => (
          <label key={i} style={{
            display: "flex", alignItems: "center", gap: "0.8rem",
            background: "#161920", borderRadius: "8px", padding: "1rem 1.2rem",
            border: "1px solid #2d3748", cursor: "pointer", fontSize: "1.1rem", color: "#cbd5e1",
          }}>
            <input type="checkbox" style={{ width: "18px", height: "18px", accentColor: "#f59e0b" }} />
            {p}
          </label>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Export: ch01 visual slides
   ═══════════════════════════════════════════ */
export const ch01Slides = [
  SlideComponents,
  SlideEdge,
  SlideSwitching,
  StoreForwardViz,
  SlideDelay,
  QueueingViz,
  SlideProtocol,
  SlideSecurity,
  SlideExam,
];
