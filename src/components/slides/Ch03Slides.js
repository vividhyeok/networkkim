"use client";

import { ArrowRight, Box, Boxes, ArrowDownUp, ShieldAlert, Activity, RefreshCw, Zap } from "lucide-react";
import Term from "@/components/Term";

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch03
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

/* ── SLIDE: Mux / Demux ── */
function SlideDemux() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#3b82f6")}>기본 역할</span>
      <h2 style={s.title}>Multiplexing & Demultiplexing</h2>
      <p style={s.subtitle}>네트워크 계층(IP)이 호스트를 찾았다면, 트랜스포트 계층은 적절한 <strong>프로세스(소켓)</strong>를 찾습니다.</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.card("#3b82f640")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Box size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.2rem", margin: 0 }}><Term>Multiplexing</Term> (보낼 때)</h3>
          </div>
          <Bullet>여러 소켓에서 생성된 데이터를 모음</Bullet>
          <Bullet>트랜스포트 <strong>헤더(Source/Dest Port 등)</strong>를 붙여 네트워크 계층으로 전달</Bullet>
        </div>

        <div style={s.card("#22c55e40")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Boxes size={24} color="#22c55e" />
            <h3 style={{ color: "#22c55e", fontSize: "1.2rem", margin: 0 }}><Term>Demultiplexing</Term> (받을 때)</h3>
          </div>
          <Bullet>수신된 세그먼트의 헤더를 검사</Bullet>
          <Bullet>올바른 수신 소켓(프로세스)으로 데이터를 분배</Bullet>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", background: "rgba(59,130,246,0.1)", padding: "1.2rem", borderRadius: "8px", borderLeft: "3px solid #3b82f6" }}>
        <div style={{ fontWeight: 700, color: "#60a5fa", marginBottom: "0.3rem" }}>소켓 식별 방식의 차이</div>
        <div className="grid-1-to-2" style={{ gap: "1rem" }}>
          <div>
            <div style={{ color: "#cbd5e1", fontSize: "0.95rem", fontWeight: 700 }}>UDP (Connectionless)</div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Dest IP, Dest Port만으로 식별. 출발지가 달라도 목적지가 같으면 <strong>같은 소켓</strong>으로 들어옴.</div>
          </div>
          <div>
            <div style={{ color: "#cbd5e1", fontSize: "0.95rem", fontWeight: 700 }}>TCP (Connection-oriented)</div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Src IP, Src Port, Dest IP, Dest Port <strong>4-tuple</strong>로 식별. 클라이언트마다 <strong>다른 소켓</strong> 할당.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: UDP vs TCP 요약 ── */
function SlideUdpTcp() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#a78bfa")}>핵심 비교</span>
      <h2 style={s.title}><Term>UDP</Term> vs <Term>TCP</Term></h2>
      <p style={s.subtitle}>인터넷의 두 가지 주요 트랜스포트 프로토콜</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div className="vs-box" style={s.vsBox("#f59e0b")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Zap size={24} color="#f59e0b" />
            <h3 style={{ color: "#f59e0b", fontSize: "1.3rem", margin: 0 }}>UDP (User Datagram Protocol)</h3>
          </div>
          <Bullet>"No-frills" (기능 최소화) 프로토콜</Bullet>
          <Bullet><strong>연결 설정(Handshake) 없음</strong></Bullet>
          <Bullet>신뢰성 보장 안함 (<Term>Packet loss</Term> 발생 가능)</Bullet>
          <Bullet>순서 보장 안함</Bullet>
          <Bullet color="#22c55e">헤더가 작고(8 bytes) 속도가 빠름</Bullet>
          <Bullet color="#22c55e">실시간 스트리밍, DNS 등에 사용</Bullet>
        </div>

        <div className="vs-box" style={s.vsBox("#3b82f6")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <ShieldAlert size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.3rem", margin: 0 }}>TCP (Transmission Control Protocol)</h3>
          </div>
          <Bullet><strong>Connection-oriented</strong> (3-way handshake)</Bullet>
          <Bullet><strong>신뢰적 데이터 전송 (Reliable)</strong></Bullet>
          <Bullet>패킷 순서 보장 (In-order byte stream)</Bullet>
          <Bullet><Term>Flow control</Term> (수신자 버퍼 오버플로우 방지)</Bullet>
          <Bullet><Term>Congestion control</Term> (네트워크 혼잡 방지)</Bullet>
          <Bullet color="#ef4444">헤더가 크고(기본 20 bytes) 오버헤드 존재</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: RDT Pipeline ── */
function SlideRDT() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#f472b6")}>이론 모델</span>
      <h2 style={s.title}>Reliable Data Transfer & Pipelining</h2>
      <p style={s.subtitle}>불안정한 채널에서 신뢰성을 확보하기 위한 메커니즘과 성능 최적화</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={s.card("#334155")}>
          <h3 style={{ color: "#cbd5e1", fontSize: "1.1rem", marginBottom: "0.5rem" }}>RDT 진화 과정</h3>
          <div className="flex-col-to-row" style={{ display: "flex", gap: "1rem", fontSize: "0.95rem" }}>
            <div style={{ flex: 1 }}><strong>rdt 2.0 (Bit Error 처리):</strong> Checksum, ACK, NAK, 재전송 도입</div>
            <div style={{ flex: 1 }}><strong>rdt 2.1/2.2 (ACK 손실 처리):</strong> Sequence Number 도입, 중복 패킷 버림</div>
            <div style={{ flex: 1 }}><strong>rdt 3.0 (Packet Loss 처리):</strong> Timer와 Timeout 도입</div>
          </div>
        </div>

        <div style={{ background: "#161920", border: "1px solid #f472b640", borderRadius: "12px", padding: "1.5rem", borderLeft: "4px solid #f472b6" }}>
          <h3 style={{ color: "#f472b6", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Pipelining (파이프라이닝)</h3>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1rem" }}>
            rdt 3.0(Stop-and-wait)은 하나 보내고 ACK를 기다려야 해서 링크 활용도가 극히 낮습니다. <strong>Pipelining</strong>은 ACK를 기다리지 않고 연속으로 패킷을 보내 성능을 높입니다.
          </p>
          
          <div className="grid-1-to-2" style={{ gap: "1rem" }}>
            <div style={{ background: "#0c1220", padding: "1rem", borderRadius: "8px" }}>
              <div style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.3rem" }}>Go-Back-N (GBN)</div>
              <div style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>수신자는 순서대로만 받음(Cumulative ACK). 손실 발생 시 손실된 패킷부터 뒤에 보낸 모든 패킷을 <strong>전부 다시 전송</strong>.</div>
            </div>
            <div style={{ background: "#0c1220", padding: "1rem", borderRadius: "8px" }}>
              <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.3rem" }}>Selective Repeat (SR)</div>
              <div style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>수신자가 버퍼를 유지. 손실된 <strong>특정 패킷만</strong> 다시 전송(Individual ACK).</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: TCP 3-Way Handshake ── */
function SlideHandshake() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#22c55e")}>연결 관리</span>
      <h2 style={s.title}>TCP 3-Way Handshake</h2>
      <p style={s.subtitle}>데이터를 보내기 전에 클라이언트와 서버가 서로의 상태(Sequence Number 등)를 동기화합니다.</p>

      <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
        <div style={{ width: "100%", maxWidth: "600px", position: "relative" }}>
          {/* Vertical Lines */}
          <div style={{ position: "absolute", left: "10%", top: 0, bottom: 0, width: "2px", background: "#334155" }} />
          <div style={{ position: "absolute", right: "10%", top: 0, bottom: 0, width: "2px", background: "#334155" }} />
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div style={{ fontWeight: 700, color: "#f1f5f9", zIndex: 1 }}>Client</div>
            <div style={{ fontWeight: 700, color: "#f1f5f9", zIndex: 1 }}>Server</div>
          </div>

          {/* Step 1 */}
          <div style={{ position: "relative", height: "60px" }}>
            <div style={{ position: "absolute", left: "10%", right: "10%", top: "10px", height: "2px", background: "#3b82f6" }} />
            <div style={{ position: "absolute", right: "10%", top: "6px", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #3b82f6" }} />
            <div style={{ position: "absolute", width: "100%", textAlign: "center", top: "-10px", color: "#60a5fa", fontSize: "0.9rem", fontWeight: 700 }}>SYN (seq=x)</div>
          </div>

          {/* Step 2 */}
          <div style={{ position: "relative", height: "60px" }}>
            <div style={{ position: "absolute", left: "10%", right: "10%", top: "10px", height: "2px", background: "#22c55e" }} />
            <div style={{ position: "absolute", left: "10%", top: "6px", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderRight: "8px solid #22c55e" }} />
            <div style={{ position: "absolute", width: "100%", textAlign: "center", top: "-10px", color: "#4ade80", fontSize: "0.9rem", fontWeight: 700 }}>SYN + ACK (seq=y, ack=x+1)</div>
          </div>

          {/* Step 3 */}
          <div style={{ position: "relative", height: "60px" }}>
            <div style={{ position: "absolute", left: "10%", right: "10%", top: "10px", height: "2px", background: "#3b82f6" }} />
            <div style={{ position: "absolute", right: "10%", top: "6px", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #3b82f6" }} />
            <div style={{ position: "absolute", width: "100%", textAlign: "center", top: "-10px", color: "#60a5fa", fontSize: "0.9rem", fontWeight: 700 }}>ACK (ack=y+1)</div>
            <div style={{ position: "absolute", width: "100%", textAlign: "center", top: "15px", color: "#94a3b8", fontSize: "0.8rem" }}>(이때부터 데이터 포함 가능)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Congestion Control ── */
function SlideCongestion() {
  return (
    <div className="slide-card" style={s.slide}>
      <span style={s.tag("#ef4444")}>핵심 알고리즘</span>
      <h2 style={s.title}>TCP <Term>Congestion control</Term></h2>
      <p style={s.subtitle}>네트워크 붕괴를 막기 위해 송신자가 알아서 보내는 양을 조절합니다.</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.card("#ef444440")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Activity size={24} color="#ef4444" />
            <h3 style={{ color: "#ef4444", fontSize: "1.2rem", margin: 0 }}>AIMD</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>Additive Increase, Multiplicative Decrease</div>
          <Bullet><strong>AI:</strong> 손실이 없으면 Congestion Window(cwnd)를 1 RTT마다 1 MSS씩 선형 증가</Bullet>
          <Bullet><strong>MD:</strong> 패킷 손실 감지 시 cwnd를 크게(절반 또는 1로) 감소</Bullet>
        </div>

        <div style={s.card("#3b82f640")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <RefreshCw size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.2rem", margin: 0 }}>Loss Reaction (손실 감지)</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>손실 유형에 따라 대처가 다름</div>
          <Bullet><strong>Timeout 발생:</strong> 매우 심각한 혼잡. cwnd를 1로 줄이고 Slow Start 시작.</Bullet>
          <Bullet><strong>3 Duplicate ACKs:</strong> 일부 패킷만 유실. cwnd를 절반으로만 줄임 (Fast Recovery).</Bullet>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", padding: "1.2rem", background: "#161920", borderRadius: "8px", border: "1px solid #334155" }}>
        <h3 style={{ color: "#f1f5f9", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Slow Start</h3>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
          연결 초기에는 cwnd를 1에서 시작하지만, ACK를 받을 때마다 증가시켜 <strong>RTT마다 지수적으로(2배씩)</strong> 증가시킵니다. 임계값(ssthresh)에 도달하면 선형 증가(AIMD)로 전환합니다.
        </p>
      </div>
    </div>
  );
}

/* ── SLIDE: Exam Points ── */
function SlideExam() {
  const points = [
    "UDP와 TCP의 특징과 차이점 (신뢰성, 연결형, 제어 유무)",
    "Demultiplexing 시 UDP(Port만)와 TCP(4-tuple)의 소켓 식별 차이",
    "Pipelining(GBN, SR)이 Stop-and-Wait의 문제점을 어떻게 해결하는가",
    "TCP Sequence Number가 '바이트 번호'라는 개념 이해",
    "Flow Control (수신자 보호) vs Congestion Control (네트워크 보호) 구분",
    "TCP 3-Way Handshake 과정 (SYN, SYN+ACK, ACK)",
    "Congestion Control의 3단계: Slow Start, AIMD, Fast Recovery",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>3장 시험/복습 체크리스트</h2>
      <p style={s.subtitle}>이 질문들에 대답할 수 있다면 Transport Layer는 완벽합니다.</p>
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
export const ch03Slides = [
  SlideDemux,
  SlideUdpTcp,
  SlideRDT,
  SlideHandshake,
  SlideCongestion,
  SlideExam,
];
