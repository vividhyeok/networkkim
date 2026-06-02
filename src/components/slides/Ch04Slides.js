"use client";

import { Map, ArrowRightLeft, Search, Combine, Server, Waypoints, KeySquare, TrainTrack, SplitSquareHorizontal } from "lucide-react";
import Term from "@/components/Term";

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch04
   ═══════════════════════════════════════════ */

const s = {
  slide: { background: "#1e2128", borderRadius: "16px", border: "1px solid #2d3748", padding: "3rem", marginBottom: "2rem", minHeight: "420px" },
  tag: (color) => ({ display: "inline-block", background: `${color}18`, color: color, padding: "0.25rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "1rem" }),
  title: { fontSize: "1.7rem", color: "#f1f5f9", fontWeight: 700, marginBottom: "1.5rem" },
  subtitle: { fontSize: "1.15rem", color: "#94a3b8", lineHeight: "1.7", marginBottom: "1.5rem" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1rem" },
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

/* ── SLIDE: Forwarding vs Routing ── */
function SlidePlanes() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#3b82f6")}>네트워크 계층 핵심</span>
      <h2 style={s.title}>Data Plane vs Control Plane</h2>
      <p style={s.subtitle}>네트워크 계층은 길을 <strong>찾는 것</strong>과 길로 <strong>보내는 것</strong> 두 가지 역할을 합니다.</p>

      <div style={s.grid2}>
        <div style={s.vsBox("#3b82f6")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <ArrowRightLeft size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.3rem", margin: 0 }}>Forwarding (<Term>Data Plane</Term>)</h3>
          </div>
          <Bullet><strong>로컬 동작:</strong> 라우터 입력 포트로 들어온 패킷을 적절한 출력 포트로 내보냄</Bullet>
          <Bullet>하드웨어에서 매우 빠르게 (나노초 단위) 처리</Bullet>
          <Bullet color="#94a3b8">비유: 교차로에서 어느 출구로 나갈지 즉각 결정하는 것</Bullet>
        </div>

        <div style={s.vsBox("#f59e0b")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Map size={24} color="#f59e0b" />
            <h3 style={{ color: "#f59e0b", fontSize: "1.3rem", margin: 0 }}>Routing (<Term>Control Plane</Term>)</h3>
          </div>
          <Bullet><strong>네트워크 전역 동작:</strong> 송신지에서 수신지까지 전체 경로(Route)를 계산</Bullet>
          <Bullet>소프트웨어에서 상대적으로 느리게 (밀리초 단위) 처리</Bullet>
          <Bullet color="#94a3b8">비유: 여행 출발 전 내비게이션으로 전체 경로를 계획하는 것</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Router Architecture ── */
function SlideRouter() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#22c55e")}>라우터 내부</span>
      <h2 style={s.title}>Router Architecture</h2>
      <p style={s.subtitle}>패킷이 라우터를 통과하는 과정 (Input Port → Switching Fabric → Output Port)</p>

      <div style={{ background: "#161920", border: "1px solid #334155", borderRadius: "12px", padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        
        {/* Input Port */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ background: "#1a3a2a", padding: "1.5rem 1rem", borderRadius: "8px", border: "1px solid #22c55e" }}>
            <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.5rem" }}>Input Port</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>물리 계층 수신<br/>+<br/>Lookup / Forwarding</div>
          </div>
        </div>

        {/* Switching Fabric */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ background: "#1e3a5f", padding: "2rem 1rem", borderRadius: "8px", border: "2px dashed #3b82f6" }}>
            <div style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.5rem" }}>Switching Fabric</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Memory / Bus / Crossbar<br/>(패킷 이동 경로)</div>
          </div>
        </div>

        {/* Output Port */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ background: "#3b2a1a", padding: "1.5rem 1rem", borderRadius: "8px", border: "1px solid #f59e0b" }}>
            <div style={{ color: "#fbbf24", fontWeight: 700, marginBottom: "0.5rem" }}>Output Port</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Queueing / Scheduling<br/>+<br/>물리 계층 송신</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem", background: "rgba(34,197,94,0.1)", padding: "1.2rem", borderRadius: "8px", borderLeft: "3px solid #22c55e" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <Search size={20} color="#22c55e" />
          <div style={{ fontWeight: 700, color: "#4ade80" }}>Longest Prefix Matching (가장 긴 접두사 매칭)</div>
        </div>
        <div style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
          Input Port에서 Forwarding Table을 찾을 때, 여러 개의 IP 대역(Prefix) 조건에 일치한다면 그 중 <strong>가장 길게 일치하는(가장 구체적인)</strong> 범위를 선택하여 Output Port를 결정합니다.
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: IP & DHCP & NAT ── */
function SlideAddress() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#a78bfa")}>주소 할당과 변환</span>
      <h2 style={s.title}>IPv4, <Term>DHCP</Term>, 그리고 <Term>NAT</Term></h2>

      <div style={s.grid2}>
        <div style={s.card("#a78bfa40")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Waypoints size={24} color="#a78bfa" />
            <h3 style={{ color: "#a78bfa", fontSize: "1.2rem", margin: 0 }}>DHCP (동적 할당)</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>호스트가 네트워크에 접속할 때 자동으로 IP와 설정을 받아오는 과정 (DORA)</div>
          <div style={s.codeBox}>
            1. <strong>D</strong>iscover: "DHCP 서버 있나요?" (Broadcast)<br/>
            2. <strong>O</strong>ffer: "이 IP 쓸래?"<br/>
            3. <strong>R</strong>equest: "네, 그 IP 쓸게요!"<br/>
            4. <strong>A</strong>CK: "그래, 완료!"
          </div>
        </div>

        <div style={s.card("#ec489940")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <SplitSquareHorizontal size={24} color="#ec4899" />
            <h3 style={{ color: "#ec4899", fontSize: "1.2rem", margin: 0 }}>NAT (네트워크 주소 변환)</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>내부 사설 IP들을 하나의 외부 공인 IP로 숨겨서 공유하는 기술</div>
          <Bullet>NAT 공유기는 내부 IP:Port 와 외부 공인 IP:새로운Port 의 매핑 테이블을 관리합니다.</Bullet>
          <Bullet color="#22c55e">장점: IPv4 주소 부족 해결, 보안 향상</Bullet>
          <Bullet color="#ef4444">단점: End-to-End 원칙 위배 (포트 번호 임의 변경)</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: IPv6 & Tunneling ── */
function SlideIPv6() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#06b6d4")}>차세대 네트워크</span>
      <h2 style={s.title}>IPv6와 Tunneling</h2>
      <p style={s.subtitle}>IPv4 주소 고갈 문제를 해결하고 헤더 처리를 효율화하기 위한 새로운 체계</p>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#06b6d4", fontSize: "1.2rem", marginBottom: "1rem" }}>IPv6의 주요 변화</h3>
          <Bullet><strong>128-bit 주소:</strong> 거의 무한대에 가까운 주소 공간</Bullet>
          <Bullet><strong>고정 40-byte 헤더:</strong> 라우터의 처리 속도 향상</Bullet>
          <Bullet color="#ef4444"><strong>Fragmentation 금지:</strong> 라우터는 쪼개지 않음 (너무 크면 패킷 폐기 후 송신자에게 알림)</Bullet>
          <Bullet color="#ef4444"><strong>Checksum 제거:</strong> 속도를 위해 트랜스포트/링크 계층에 검사 위임</Bullet>
        </div>

        <div style={{ flex: 1, background: "#161920", border: "1px solid #334155", borderRadius: "12px", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <TrainTrack size={20} color="#06b6d4" />
            <h3 style={{ color: "#06b6d4", fontSize: "1.1rem", margin: 0 }}>Tunneling (터널링)</h3>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1rem" }}>전 세계 모든 라우터가 일시에 IPv6로 바뀔 수 없으므로, IPv4 라우터 구간을 통과할 때는 <strong>IPv6 패킷 전체를 IPv4 데이터(Payload) 안에 캡슐화</strong>해서 보냅니다.</p>
          
          <div style={{ display: "flex", alignItems: "center", background: "#0c1220", padding: "1rem", borderRadius: "8px", border: "1px solid #1e293b" }}>
            <div style={{ background: "#f59e0b", padding: "0.5rem", color: "#fff", fontWeight: 700, borderRadius: "4px 0 0 4px", fontSize: "0.8rem" }}>IPv4 헤더</div>
            <div style={{ background: "#3b82f6", padding: "0.5rem", color: "#fff", fontWeight: 700, borderLeft: "1px solid #1e2128", fontSize: "0.8rem" }}>IPv6 헤더</div>
            <div style={{ flex: 1, background: "#64748b", padding: "0.5rem", color: "#fff", fontWeight: 700, borderRadius: "0 4px 4px 0", fontSize: "0.8rem", textAlign: "center" }}>실제 데이터</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Exam Points ── */
function SlideExam() {
  const points = [
    "Data Plane(Forwarding)과 Control Plane(Routing)의 역할 구분",
    "라우터 내부 구조 (Input -> Switch Fabric -> Output)와 큐잉 발생 위치",
    "Longest Prefix Matching 원리 이해 (서브넷 겹칠 때 구체적인 쪽 선택)",
    "IPv4 단편화(Fragmentation) 시 ID, Flag, Offset 값 해석",
    "CIDR 표기법(예: /20)을 보고 Subnet 범위 계산하기",
    "DHCP DORA 4단계 메세지 교환 과정",
    "NAT 동작 원리와 한계 (End-to-End 원칙 위반)",
    "IPv6의 헤더 변경점과 IPv4 호환을 위한 Tunneling 방식",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>4장 시험/복습 체크리스트</h2>
      <p style={s.subtitle}>Data Plane의 핵심 라우터 동작과 IP 프로토콜을 점검합니다.</p>
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
   Export
   ═══════════════════════════════════════════ */
export const ch04Slides = [
  SlidePlanes,
  SlideRouter,
  SlideAddress,
  SlideIPv6,
  SlideExam,
];
