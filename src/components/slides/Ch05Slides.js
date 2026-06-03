"use client";

import { Map, Cpu, Share2, ServerCog, Activity, Route, GitMerge, FileSearch } from "lucide-react";
import Term from "@/components/Term";

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch05
   ═══════════════════════════════════════════ */

const s = {
  slide: { background: "#1e2128", borderRadius: "16px", border: "1px solid #2d3748", padding: "3rem", marginBottom: "2rem", minHeight: "420px" },
  tag: (color) => ({ display: "inline-block", background: `${color}18`, color: color, padding: "0.25rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "1rem" }),
  title: { fontSize: "1.7rem", color: "#f1f5f9", fontWeight: 700, marginBottom: "1.5rem" },
  subtitle: { fontSize: "1.15rem", color: "#94a3b8", lineHeight: "1.7", marginBottom: "1.5rem" },
  grid2: { marginTop: "1rem" },
  card: (borderColor = "#334155") => ({ background: "#161920", border: `1px solid ${borderColor}`, borderRadius: "12px", padding: "1.5rem" }),
  keyword: { color: "#38bdf8", fontWeight: 700 },
  bullet: { fontSize: "1.1rem", color: "#cbd5e1", lineHeight: "1.8", margin: "0.4rem 0", paddingLeft: "1.2rem", position: "relative" },
  dot: (color = "#3b82f6") => ({ position: "absolute", left: 0, top: "0.6rem", width: "7px", height: "7px", borderRadius: "50%", background: color }),
  vsBox: (color) => ({ flex: 1, background: "#161920", border: `1px solid ${color}40`, borderRadius: "12px", padding: "2rem", borderTop: `3px solid ${color}` }),
  codeBox: { background: "#0c1220", border: "1px solid #1e293b", padding: "1rem", borderRadius: "8px", fontFamily: "monospace", color: "#7dd3fc", fontSize: "0.95rem", lineHeight: "1.5" }
};

function Bullet({ children, color = "#3b82f6" }) {
  return <div style={s.bullet}><span style={s.dot(color)} />{children}</div>;
}

/* ── SLIDE: Control Plane Approaches ── */
function SlideControlPlane() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#3b82f6")}>제어 평면</span>
      <h2 style={s.title}>Control Plane 구현 방식</h2>
      <p style={s.subtitle}>네트워크 전체를 보고 어떻게 최적의 경로를 찾을 것인가?</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div className="vs-box" style={s.vsBox("#3b82f6")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Share2 size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.3rem", margin: 0 }}>Per-router Control</h3>
          </div>
          <Bullet>전통적인 라우팅 방식</Bullet>
          <Bullet>각 라우터가 개별적으로 라우팅 알고리즘(OSPF, BGP 등)을 실행</Bullet>
          <Bullet>라우터끼리 정보를 교환하여 각자 <strong>자신만의 Forwarding Table 계산</strong></Bullet>
          <Bullet color="#94a3b8">분산적이고 안정적이지만, 일괄 제어가 어려움</Bullet>
        </div>

        <div className="vs-box" style={s.vsBox("#f59e0b")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <ServerCog size={24} color="#f59e0b" />
            <h3 style={{ color: "#f59e0b", fontSize: "1.3rem", margin: 0 }}>Logically Centralized (<Term>SDN</Term>)</h3>
          </div>
          <Bullet>원격의 중앙 <strong>Controller</strong>가 네트워크 전체 상태를 수집</Bullet>
          <Bullet>서버에서 최적 경로를 계산한 뒤, 각 라우터/스위치에 결과만 <strong>내려줌</strong></Bullet>
          <Bullet color="#22c55e">트래픽 엔지니어링 용이, 프로그래밍 가능(Programmable)</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: LS vs DV ── */
function SlideAlgorithms() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#22c55e")}>알고리즘 비교</span>
      <h2 style={s.title}>Link State vs Distance Vector</h2>
      <p style={s.subtitle}>어떤 정보를 바탕으로 최단 경로(Shortest Path)를 계산하는가?</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div className="vs-box" style={s.vsBox("#22c55e")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Map size={24} color="#22c55e" />
            <h3 style={{ color: "#22c55e", fontSize: "1.3rem", margin: 0 }}>Link State (LS) / <Term>Dijkstra</Term></h3>
          </div>
          <Bullet><strong>전체 지도(Topology)</strong>와 모든 링크 비용을 파악</Bullet>
          <Bullet>Link State Broadcast를 통해 정보 전파</Bullet>
          <Bullet>각자 다익스트라(Dijkstra) 알고리즘 돌려서 계산</Bullet>
          <Bullet color="#ef4444">네트워크가 커지면 메시지 Flooding과 계산 부하(Overhead) 큼</Bullet>
        </div>

        <div className="vs-box" style={s.vsBox("#a78bfa")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Route size={24} color="#a78bfa" />
            <h3 style={{ color: "#a78bfa", fontSize: "1.3rem", margin: 0 }}>Distance Vector (DV) / Bellman-Ford</h3>
          </div>
          <Bullet>내 전체 지도는 모르고, <strong>이웃이 알려준 거리(Distance) 정보</strong>만 믿고 계산</Bullet>
          <Bullet>D_x(y) = min_v {`{ c(x,v) + D_v(y) }`}</Bullet>
          <Bullet>이웃과 비동기적(Asynchronous)으로 반복 갱신</Bullet>
          <Bullet color="#ef4444">루프(Loop) 및 Count-to-Infinity 문제 발생 가능</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: AS Hierarchy ── */
function SlideHierarchy() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#f472b6")}>확장성 문제</span>
      <h2 style={s.title}>Autonomous System (AS) 계층 구조</h2>
      <p style={s.subtitle}>전 세계 수십억 개 공유기를 하나의 알고리즘으로 돌릴 순 없습니다. 인터넷은 <strong>AS(자율 시스템)</strong> 단위로 묶여 있습니다.</p>

      <div className="flex-col-to-row" style={{ background: "#161920", border: "1px solid #334155", borderRadius: "12px", padding: "2rem", display: "flex", alignItems: "center", gap: "2rem" }}>
        
        {/* Intra-AS */}
        <div style={{ flex: 1, background: "#1e3a5f", padding: "1.5rem", borderRadius: "8px", border: "1px solid #3b82f6" }}>
          <h3 style={{ color: "#60a5fa", fontSize: "1.2rem", marginBottom: "1rem", textAlign: "center" }}>Intra-AS Routing</h3>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem", textAlign: "center" }}>AS "내부"에서의 경로 탐색</div>
          <Bullet>목표: 비용 최소화 (성능 중심)</Bullet>
          <Bullet>관리자가 알고리즘 마음대로 선택</Bullet>
          <Bullet color="#60a5fa">대표 프로토콜: <Term>OSPF</Term> (Link State 기반)</Bullet>
        </div>

        <div style={{ color: "#475569", fontSize: "2rem" }}>+</div>

        {/* Inter-AS */}
        <div style={{ flex: 1, background: "#3b1a3a", padding: "1.5rem", borderRadius: "8px", border: "1px solid #f472b6" }}>
          <h3 style={{ color: "#f472b6", fontSize: "1.2rem", marginBottom: "1rem", textAlign: "center" }}>Inter-AS Routing</h3>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem", textAlign: "center" }}>AS "사이"의 경로 탐색</div>
          <Bullet>목표: <strong>정책(Policy)</strong> 준수</Bullet>
          <Bullet>"저 경쟁사 망은 안 지나갈래!" 같은 비즈니스 규칙 중요</Bullet>
          <Bullet color="#f472b6">대표 프로토콜: <Term>BGP</Term></Bullet>
        </div>

      </div>
    </div>
  );
}

/* ── SLIDE: BGP ── */
function SlideBGP() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#06b6d4")}>인터넷의 접착제</span>
      <h2 style={s.title}><Term>BGP</Term> (Border Gateway Protocol)</h2>
      <p style={s.subtitle}>인터넷 라우팅의 핵심. 단순히 "가장 빠른 길"이 아니라 "정책상 갈 수 있는 길"을 찾습니다.</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.card("#06b6d440")}>
          <h3 style={{ color: "#06b6d4", fontSize: "1.1rem", marginBottom: "0.8rem" }}>eBGP vs iBGP</h3>
          <Bullet><strong>eBGP:</strong> 다른 AS에 있는 라우터 간 연결. "우린 이런 IP 대역을 갖고 있어!" 라고 외부에 광고(Advertisement).</Bullet>
          <Bullet><strong>iBGP:</strong> 같은 AS 내부 라우터 간 연결. eBGP로 받아온 외부 정보를 AS 내부 전체에 전파.</Bullet>
        </div>

        <div style={s.card("#06b6d440")}>
          <h3 style={{ color: "#06b6d4", fontSize: "1.1rem", marginBottom: "0.8rem" }}>BGP 주요 속성(Attributes)</h3>
          <Bullet><strong>AS-PATH:</strong> 목적지까지 거쳐온 AS 번호들의 목록 (루프 감지용)</Bullet>
          <Bullet><strong>NEXT-HOP:</strong> 해당 경로로 가기 위해 데이터를 보낼 다음 라우터/인터페이스 주소</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: SDN & OpenFlow ── */
function SlideSDN() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#f59e0b")}>차세대 네트워크</span>
      <h2 style={s.title}>SDN (Software Defined Networking) 구조</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        {/* App Layer */}
        <div style={{ background: "#161920", border: "1px solid #f59e0b", borderRadius: "8px", padding: "1.2rem", textAlign: "center" }}>
          <div style={{ color: "#fbbf24", fontWeight: 700, marginBottom: "0.5rem" }}>Network-Control Applications</div>
          <div style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>Routing, Access Control, Load Balancing 등 소프트웨어 로직</div>
        </div>

        <div style={{ textAlign: "center", color: "#f59e0b" }}>↕ Northbound API</div>

        {/* Controller */}
        <div style={{ background: "#1e3a5f", border: "1px solid #3b82f6", borderRadius: "8px", padding: "1.2rem", textAlign: "center" }}>
          <div style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.5rem" }}>SDN Controller (네트워크 뇌)</div>
          <div style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>네트워크 상태(State) 통합 관리, Flow Table 생성 계산</div>
        </div>

        <div style={{ textAlign: "center", color: "#22c55e", fontWeight: 700 }}>
          ↕ Southbound API (예: <Term>OpenFlow</Term>)
        </div>

        {/* Data Plane */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, background: "#1a3a2a", border: "1px solid #22c55e", borderRadius: "8px", padding: "1.2rem", textAlign: "center" }}>
              <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.5rem" }}>Switch {i}</div>
              <div style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>(단순 Forwarding 머신)</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Exam Points ── */
function SlideExam() {
  const points = [
    "Link State(전체 지형 파악)와 Distance Vector(이웃 정보 의존)의 차이점 파악",
    "Dijkstra 테이블 알고리즘 원리 파악",
    "Count-to-Infinity 문제와 왜 발생하는지 설명",
    "AS 개념 도입 이유 (Scalability, Policy)",
    "OSPF(내부 비용 최적화)와 BGP(외부 정책 준수)의 목적 차이",
    "SDN 구조: Data Plane 장비의 단순화와 Centralized Controller의 역할",
    "ICMP (에러/제어 메시지)와 Traceroute 원리(TTL 활용) 이해",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>5장 시험/복습 체크리스트</h2>
      <p style={s.subtitle}>네트워크 제어의 핵심 알고리즘과 프로토콜을 점검합니다.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {points.map((p, i) => (
          <label className="exam-label" key={i} style={{
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
   Export
   ═══════════════════════════════════════════ */
export const ch05Slides = [
  SlideControlPlane,
  SlideAlgorithms,
  SlideHierarchy,
  SlideBGP,
  SlideSDN,
  SlideExam,
];
