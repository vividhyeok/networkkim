"use client";

import { Wifi, Radio, Smartphone, Activity, MapPin, Repeat, ShieldCheck, Forward, RadioTower } from "lucide-react";
import Term from "@/components/Term";

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch07
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

/* ── SLIDE: Wireless Characteristics ── */
function SlideWireless() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#3b82f6")}>무선 통신의 한계</span>
      <h2 style={s.title}>Wireless Link Characteristics</h2>
      <p style={s.subtitle}>무선은 유선(케이블)보다 훨씬 열악한 환경입니다. 신호가 공기 중으로 흩어지기 때문입니다.</p>

      <div className="flex-col-to-row" style={{}}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#3b82f6", fontSize: "1.2rem", marginBottom: "1rem" }}>무선 링크의 3대 장애물</h3>
          <Bullet><strong>Path Loss:</strong> 전파가 이동하면서 에너지가 분산되어 신호가 약해짐</Bullet>
          <Bullet><strong>Interference:</strong> 같은 주파수를 쓰는 다른 기기나 전자레인지 등의 간섭</Bullet>
          <Bullet><strong>Multipath Propagation:</strong> 물체에 반사된 전파들이 서로 다른 시간에 도착하여 간섭 발생</Bullet>
        </div>

        <div style={{ flex: 1, background: "#161920", border: "1px solid #ef444440", borderRadius: "12px", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <ShieldCheck size={20} color="#ef4444" />
            <h3 style={{ color: "#ef4444", fontSize: "1.1rem", margin: 0 }}>Hidden Terminal Problem</h3>
          </div>
          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>
            A와 C는 서로 멀리 떨어져 있어 서로의 전송 소리를 듣지 못합니다 (Hidden).
            그래서 둘 다 B가 조용하다고 착각하고 <strong>동시에 B에게 전송하다가 B에서 충돌(Collision)이 발생</strong>합니다.
          </p>
          <div style={{ textAlign: "center", color: "#94a3b8" }}>
            A (전송) &rarr; <span style={{ color: "#ef4444", fontWeight: "bold" }}>[ B: 충돌! ]</span> &larr; (전송) C
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: 802.11 Wi-Fi ── */
function SlideWiFi() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#22c55e")}>근거리 무선망</span>
      <h2 style={s.title}>802.11 Wi-Fi: CSMA/CA</h2>
      <p style={s.subtitle}>무선은 충돌 감지(Collision Detection)가 불가능합니다. 내 목소리가 너무 커서 남의 소리가 안 들리기 때문입니다.</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.card("#22c55e40")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Wifi size={24} color="#22c55e" />
            <h3 style={{ color: "#22c55e", fontSize: "1.2rem", margin: 0 }}>CSMA/CA (Collision Avoidance)</h3>
          </div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1rem" }}>충돌을 '회피'하는 방식</div>
          <Bullet>보내기 전에 채널이 비어있는지 확인</Bullet>
          <Bullet>채널이 비어있어도 <strong>랜덤한 시간(Backoff)만큼 무조건 기다림</strong> (동시 전송 방지)</Bullet>
          <Bullet color="#ef4444">전송 후에는 반드시 수신자로부터 <strong>ACK(응답)</strong>를 받아야 성공으로 간주</Bullet>
        </div>

        <div style={s.card("#f59e0b40")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Radio size={24} color="#f59e0b" />
            <h3 style={{ color: "#f59e0b", fontSize: "1.2rem", margin: 0 }}>RTS / CTS</h3>
          </div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1rem" }}>Hidden Terminal 문제 해결책</div>
          <div className="code-box" style={s.codeBox}>
            <strong>단말:</strong> "공유기야, 나 긴 데이터 보낼 건데 채널 예약해 줘!" (RTS)<br/><br/>
            <strong>공유기:</strong> "그래! 주변 단말들아, 얘 보낼 때까지 조용히 해!" (CTS)
          </div>
          <div style={{ marginTop: "1rem", color: "#cbd5e1", fontSize: "0.95rem" }}>작은 제어 메시지로 채널을 미리 예약해 대형 데이터 충돌을 막습니다.</div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Cellular Networks ── */
function SlideCellular() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#06b6d4")}>광역 무선망</span>
      <h2 style={s.title}>Cellular Networks (4G/LTE)</h2>
      <p style={s.subtitle}>이동통신망은 기지국(RAN)과 코어 네트워크(EPC)로 구성됩니다.</p>

      <div className="component-row" style={{ background: "#161920", border: "1px solid #334155", borderRadius: "12px", padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ background: "#1a3a2a", padding: "1.5rem 1rem", borderRadius: "8px", border: "1px solid #22c55e" }}>
            <Smartphone size={32} color="#4ade80" style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ color: "#4ade80", fontWeight: 700 }}>UE (User Equipment)</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>스마트폰, 무선 단말</div>
          </div>
        </div>

        <div style={{ color: "#475569" }}>&rarr;</div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ background: "#1e3a5f", padding: "1.5rem 1rem", borderRadius: "8px", border: "1px solid #3b82f6" }}>
            <RadioTower size={32} color="#60a5fa" style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ color: "#60a5fa", fontWeight: 700 }}>eNodeB (기지국)</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Radio Access Network (RAN)</div>
          </div>
        </div>

        <div style={{ color: "#475569" }}>&rarr;</div>

        <div style={{ flex: 2, textAlign: "center" }}>
          <div style={{ background: "#3b1a3a", padding: "1.5rem 1rem", borderRadius: "8px", border: "1px solid #f472b6" }}>
            <Activity size={32} color="#f472b6" style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ color: "#f472b6", fontWeight: 700 }}>EPC (All-IP Core Network)</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>MME(이동성 제어), S-GW/P-GW(인터넷 라우팅)</div>
          </div>
        </div>

      </div>

      <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(6,182,212,0.1)", borderRadius: "8px", borderLeft: "3px solid #06b6d4" }}>
        <strong style={{ color: "#06b6d4" }}>4G LTE의 핵심 변화:</strong> 3G까지 분리되어 있던 음성망(Circuit)과 데이터망(Packet)이 4G부터는 <strong>All-IP 기반의 단일 패킷 코어 네트워크</strong>로 통합되었습니다.
      </div>
    </div>
  );
}

/* ── SLIDE: Mobility ── */
function SlideMobility() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#a78bfa")}>이동성</span>
      <h2 style={s.title}>Mobility (이동성 관리)</h2>
      <p style={s.subtitle}>사용자가 이동하여 접속하는 망이 바뀌어도, 통신이 끊기지 않아야 합니다.</p>

      <div className="flex-col-to-row" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ flex: 1, background: "#161920", padding: "1rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <div style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.5rem" }}>Home Network</div>
          <div style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>스마트폰이 원래 가입되어 있는 고향 네트워크. 여기서 발급받은 영구적인 IP를 가집니다.</div>
        </div>
        <div style={{ flex: 1, background: "#161920", padding: "1rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <div style={{ color: "#f59e0b", fontWeight: 700, marginBottom: "0.5rem" }}>Visited Network</div>
          <div style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>여행이나 이동 중에 현재 접속해 있는 임시 네트워크. 여기서 쓸 임시 주소(<Term>Care-of address</Term>)를 발급받습니다.</div>
        </div>
      </div>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.card("#334155")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Repeat size={20} color="#a78bfa" />
            <h3 style={{ color: "#a78bfa", fontSize: "1.1rem", margin: 0 }}>Indirect Routing (우회)</h3>
          </div>
          <Bullet>상대방은 내 영구 IP로 전송</Bullet>
          <Bullet>Home Network의 <strong>Home Agent</strong>가 이를 받아 현재 내 위치(Visited Network)로 터널링</Bullet>
          <Bullet color="#22c55e">상대방은 내가 이동한 사실을 몰라도 됨</Bullet>
          <Bullet color="#ef4444">Triangle Routing (경로가 비효율적)</Bullet>
        </div>

        <div style={s.card("#334155")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Forward size={20} color="#a78bfa" />
            <h3 style={{ color: "#a78bfa", fontSize: "1.1rem", margin: 0 }}>Direct Routing (직행)</h3>
          </div>
          <Bullet>상대방이 Home Agent에게 내 현재 임시 주소(Care-of address)를 물어봄</Bullet>
          <Bullet>상대방이 내 현재 위치로 직접 데이터 전송</Bullet>
          <Bullet color="#22c55e">경로가 짧고 효율적</Bullet>
          <Bullet color="#ef4444">이동할 때마다 상대방에게 위치를 갱신해야 함</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Exam Points ── */
function SlideExam() {
  const points = [
    "무선 링크의 3대 장애 요인 (Path loss, Interference, Multipath) 설명",
    "Hidden Terminal Problem의 개념과 왜 충돌이 발생하는지 이해",
    "802.11 Wi-Fi가 CSMA/CD를 쓰지 못하는 이유와 CSMA/CA 방식의 차이",
    "RTS/CTS 교환이 어떻게 Hidden Terminal 문제를 해결하는지 숙지",
    "4G LTE 네트워크 코어(EPC)가 All-IP 기반이라는 점 이해",
    "모바일 네트워킹의 Home Agent, Foreign Agent, Care-of-address 개념 구분",
    "이동성 라우팅에서 Indirect routing의 Triangle Routing 문제 설명",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>7장 시험/복습 체크리스트</h2>
      <p style={s.subtitle}>불안정한 무선 환경과 이동성 처리 방식을 점검합니다.</p>
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
export const ch07Slides = [
  SlideWireless,
  SlideWiFi,
  SlideCellular,
  SlideMobility,
  SlideExam,
];
