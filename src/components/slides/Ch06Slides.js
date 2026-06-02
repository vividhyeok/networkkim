"use client";

import { Link as LinkIcon, AlertTriangle, RadioTower, Search, Laptop, SwitchCamera, Server, Network } from "lucide-react";
import Term from "@/components/Term";

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch06
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

/* ── SLIDE: Link Layer ── */
function SlideLink() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#3b82f6")}>물리적 연결</span>
      <h2 style={s.title}>Link Layer의 역할</h2>
      <p style={s.subtitle}>네트워크 계층(IP)이 출발지부터 목적지까지의 "여행 전체"를 계획한다면, 링크 계층은 <strong>"한 정거장(One-hop)"</strong> 이동을 책임집니다.</p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#161920", padding: "2rem", borderRadius: "12px", border: "1px solid #334155", marginBottom: "2rem" }}>
        <div style={{ textAlign: "center" }}>
          <Laptop size={40} color="#60a5fa" />
          <div style={{ color: "#f1f5f9", fontWeight: 700, marginTop: "0.5rem" }}>내 컴퓨터</div>
        </div>
        
        <div style={{ flex: 1, textAlign: "center", position: "relative", padding: "0 1rem" }}>
          <div style={{ color: "#3b82f6", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.2rem" }}>Frame 전달 (One-hop)</div>
          <div style={{ height: "4px", background: "#3b82f6", width: "100%", borderRadius: "2px" }} />
          <div style={{ position: "absolute", right: "10px", top: "22px", borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid #3b82f6" }} />
        </div>

        <div style={{ textAlign: "center" }}>
          <Server size={40} color="#f59e0b" />
          <div style={{ color: "#f1f5f9", fontWeight: 700, marginTop: "0.5rem" }}>공유기 (라우터)</div>
        </div>
      </div>

      <div style={s.grid2}>
        <div style={s.card("#334155")}>
          <h3 style={{ color: "#cbd5e1", fontSize: "1.1rem" }}>주요 서비스</h3>
          <Bullet><strong>Framing:</strong> IP 데이터그램 앞뒤에 헤더와 트레일러(MAC 주소 등) 부착</Bullet>
          <Bullet><strong>Link Access:</strong> 누가 케이블/전파를 사용할지 결정 (MAC 프로토콜)</Bullet>
        </div>
        <div style={s.card("#334155")}>
          <h3 style={{ color: "#cbd5e1", fontSize: "1.1rem" }}>오류 제어</h3>
          <Bullet><strong>CRC:</strong> 강력한 에러 검출 (데이터를 다항식으로 나누어 나머지 확인)</Bullet>
          <Bullet>물리적 신호 오류를 NIC(랜카드) 하드웨어 단에서 걸러냄</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: MAC Protocols ── */
function SlideMAC() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#f59e0b")}>다중 접속</span>
      <h2 style={s.title}>Multiple Access Protocols</h2>
      <p style={s.subtitle}>하나의 선(또는 공기)을 여러 기기가 동시에 쓰면 충돌(Collision)이 발생합니다. 어떻게 해결할까요?</p>

      <div style={s.grid2}>
        <div style={s.vsBox("#f59e0b")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <SwitchCamera size={24} color="#f59e0b" />
            <h3 style={{ color: "#f59e0b", fontSize: "1.3rem", margin: 0 }}>Channel Partitioning</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>도로에 차선을 그어 나누는 방식</div>
          <Bullet><strong>TDMA:</strong> 시간을 나눠서 쓴다</Bullet>
          <Bullet><strong>FDMA:</strong> 주파수를 나눠서 쓴다</Bullet>
          <Bullet color="#ef4444">기기가 전송할 데이터가 없어도 차선을 비워두어 낭비 발생</Bullet>
        </div>

        <div style={s.vsBox("#22c55e")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <RadioTower size={24} color="#22c55e" />
            <h3 style={{ color: "#22c55e", fontSize: "1.3rem", margin: 0 }}>Random Access (<Term>CSMA/CD</Term>)</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>눈치 게임 (이더넷 방식)</div>
          <Bullet><strong>CS (Carrier Sense):</strong> 남이 말하고 있는지(선이 사용 중인지) 듣기</Bullet>
          <Bullet><strong>CD (Collision Detection):</strong> 말하는 도중 충돌이 나면 즉시 중단</Bullet>
          <Bullet>충돌 후 랜덤한 시간 대기 후 다시 시도 (Backoff)</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: MAC & ARP ── */
function SlideARP() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#a78bfa")}>주소 변환</span>
      <h2 style={s.title}>MAC Address와 <Term>ARP</Term></h2>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#a78bfa", fontSize: "1.2rem", marginBottom: "1rem" }}>IP vs MAC 주소</h3>
          <div style={{ background: "#161920", padding: "1rem", borderRadius: "8px", border: "1px solid #334155", marginBottom: "1rem" }}>
            <div style={{ color: "#cbd5e1", fontWeight: 700 }}>IP 주소 (예: 192.168.1.10)</div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>계층적 주소. 우편번호처럼 최종 목적지를 향한 <strong>전체 경로 안내용</strong>.</div>
          </div>
          <div style={{ background: "#161920", padding: "1rem", borderRadius: "8px", border: "1px solid #334155" }}>
            <div style={{ color: "#cbd5e1", fontWeight: 700 }}>MAC 주소 (예: 1A-23-F9-CD-06-9B)</div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>NIC(랜카드)에 구워진 48-bit 물리 주소. 주민등록번호처럼 <strong>같은 LAN(방 안) 안에서 서로를 찾을 때</strong> 사용.</div>
          </div>
        </div>

        <div style={{ flex: 1, background: "rgba(167,139,250,0.1)", border: "1px solid #a78bfa40", borderRadius: "12px", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Search size={20} color="#a78bfa" />
            <h3 style={{ color: "#a78bfa", fontSize: "1.1rem", margin: 0 }}>ARP (Address Resolution Protocol)</h3>
          </div>
          <p style={{ color: "#e2e8f0", fontSize: "0.95rem", marginBottom: "1rem" }}>
            IP 주소는 아는데, 그 기기의 MAC 주소를 모를 때 사용합니다.
          </p>
          <div style={s.codeBox}>
            <strong>내 PC:</strong> (모두에게 외침 - Broadcast)<br/>
            "IP 192.168.1.1 가진 분, MAC 주소 뭡니까?"<br/><br/>
            <strong>라우터:</strong> (나에게만 대답 - Unicast)<br/>
            "그 IP 접니다. 제 MAC은 AA-BB-... 입니다."
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Switch ── */
function SlideSwitch() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#06b6d4")}>네트워크 장비</span>
      <h2 style={s.title}>Ethernet <Term>Switch</Term></h2>
      <p style={s.subtitle}>스위치는 들어오는 프레임의 목적지 MAC 주소를 보고, 갈 길만 열어주는 똑똑한 장비입니다.</p>

      <div style={{ background: "#161920", border: "1px solid #06b6d440", borderRadius: "12px", padding: "2rem", borderTop: "3px solid #06b6d4", marginBottom: "1.5rem" }}>
        <h3 style={{ color: "#06b6d4", fontSize: "1.2rem", marginBottom: "1rem" }}>Self-learning (스위치는 어떻게 길을 알까?)</h3>
        <Bullet>1. A가 B에게 프레임을 보냅니다. (스위치 Port 1로 들어옴)</Bullet>
        <Bullet>2. 스위치는 <strong>"아하, MAC A는 Port 1에 있구나"</strong> 하고 자신의 테이블에 <strong>자동 기록(Self-learning)</strong>합니다.</Bullet>
        <Bullet>3. 목적지 MAC B가 어디 있는지 테이블에 없으면, 모든 포트로 뿌립니다 (Flood).</Bullet>
        <Bullet>4. 나중에 B가 대답하면, B의 위치도 학습하여 다음부터는 A와 B 사이만 길을 열어줍니다.</Bullet>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1, background: "#0c1220", padding: "1rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <div style={{ fontWeight: 700, color: "#cbd5e1" }}>Switch (스위치)</div>
          <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Link Layer 장비. MAC 주소로 동작. 같은 LAN 내부 연결.</div>
        </div>
        <div style={{ flex: 1, background: "#0c1220", padding: "1rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <div style={{ fontWeight: 700, color: "#cbd5e1" }}>Router (라우터)</div>
          <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Network Layer 장비. IP 주소로 동작. 다른 네트워크 간 연결.</div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Web Request Lifecycle ── */
function SlideLifecycle() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#ef4444")}>종합 시나리오</span>
      <h2 style={s.title}>A Day in the Life of a Web Request</h2>
      <p style={s.subtitle}>노트북을 켜서 구글에 접속하기까지, 배운 모든 프로토콜이 총동원됩니다.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <div style={{ background: "#161920", padding: "0.8rem 1rem", borderRadius: "8px", borderLeft: "4px solid #a78bfa" }}>
          <strong style={{ color: "#a78bfa" }}>1. DHCP:</strong> 네트워크에 접속해 IP, 서브넷 마스크, 게이트웨이(공유기), DNS 서버 주소를 받아옵니다.
        </div>
        <div style={{ background: "#161920", padding: "0.8rem 1rem", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
          <strong style={{ color: "#f59e0b" }}>2. ARP (공유기 찾기):</strong> 외부로 나가기 위해 게이트웨이(공유기)의 MAC 주소를 ARP로 알아냅니다.
        </div>
        <div style={{ background: "#161920", padding: "0.8rem 1rem", borderRadius: "8px", borderLeft: "4px solid #06b6d4" }}>
          <strong style={{ color: "#06b6d4" }}>3. DNS:</strong> google.com의 IP 주소를 알기 위해 DNS 서버에 쿼리를 날려 IP를 얻어옵니다.
        </div>
        <div style={{ background: "#161920", padding: "0.8rem 1rem", borderRadius: "8px", borderLeft: "4px solid #22c55e" }}>
          <strong style={{ color: "#22c55e" }}>4. TCP Handshake:</strong> 구글 서버의 IP 주소를 향해 3-way Handshake를 맺어 연결을 수립합니다.
        </div>
        <div style={{ background: "#161920", padding: "0.8rem 1rem", borderRadius: "8px", borderLeft: "4px solid #3b82f6" }}>
          <strong style={{ color: "#3b82f6" }}>5. HTTP Request/Response:</strong> GET 요청을 보내고, HTML 페이지 데이터를 받아 브라우저에 그립니다.
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Exam Points ── */
function SlideExam() {
  const points = [
    "네트워크 계층(IP)과 링크 계층(MAC)의 전달 범위 차이 (End-to-End vs One-hop)",
    "다중 접속 프로토콜(CSMA/CD)에서 충돌 감지 및 대처 방법",
    "IP 주소는 목적지까지 바뀌지 않고, MAC 주소는 공유기(라우터)를 넘을 때마다 변경됨을 이해",
    "ARP 프로토콜이 Broadcast로 질의하여 Unicast로 응답받는 과정",
    "스위치(Switch)의 Self-learning 알고리즘과 Flooding 과정",
    "VLAN 도입 목적과 Trunk port (802.1Q tag) 역할",
    "웹 페이지 접속 시나리오 (DHCP -> ARP -> DNS -> TCP -> HTTP) 순서 숙지",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>6장 시험/복습 체크리스트</h2>
      <p style={s.subtitle}>LAN 환경에서의 물리적 패킷 이동 규칙을 점검합니다.</p>
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
export const ch06Slides = [
  SlideLink,
  SlideMAC,
  SlideARP,
  SlideSwitch,
  SlideLifecycle,
  SlideExam,
];
