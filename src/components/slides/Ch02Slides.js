"use client";

import { Server, Users, Network, Globe, Mail, Database, Film, FileCode2, ArrowRight, ServerCrash, Share2, ShieldQuestion, ArrowDown } from "lucide-react";
import Term from "@/components/Term";
import { ch01Slides } from "./Ch01Slides"; // to copy styles

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch02
   ═══════════════════════════════════════════ */

const s = {
  slide: { background: "#1e2128", borderRadius: "16px", border: "1px solid #2d3748", padding: "3rem", marginBottom: "2rem", minHeight: "420px" },
  tag: (color) => ({ display: "inline-block", background: `${color}18`, color: color, padding: "0.25rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "1rem" }),
  title: { fontSize: "1.7rem", color: "#f1f5f9", fontWeight: 700, marginBottom: "1.5rem" },
  subtitle: { fontSize: "1.15rem", color: "#94a3b8", lineHeight: "1.7", marginBottom: "1.5rem" },
  grid2: { marginTop: "1rem" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "1rem" },
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

/* ── SLIDE: App Architectures ── */
function SlideArchitecture() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#3b82f6")}>아키텍처</span>
      <h2 style={s.title}>Client-Server vs P2P 구조</h2>
      <p style={s.subtitle}>네트워크 앱은 라우터가 아닌 <span style={s.keyword}><Term>End System</Term></span>에서 동작합니다.</p>
      
      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.vsBox("#3b82f6")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Server size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.3rem", margin: 0 }}>Client-Server</h3>
          </div>
          <Bullet>항상 켜져 있는 <Term>Server</Term> 중심</Bullet>
          <Bullet>고정 <Term>IP</Term> 주소 사용</Bullet>
          <Bullet>Client끼리는 직접 통신 불가</Bullet>
          <Bullet color="#22c55e">관리 용이, 높은 보안/안정성</Bullet>
          <Bullet color="#ef4444">서버 병목 (Scalability 한계)</Bullet>
        </div>
        
        <div style={s.vsBox("#f59e0b")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Share2 size={24} color="#f59e0b" />
            <h3 style={{ color: "#f59e0b", fontSize: "1.3rem", margin: 0 }}>P2P (Peer-to-Peer)</h3>
          </div>
          <Bullet>항상 켜진 중앙 서버 없음</Bullet>
          <Bullet>임의의 Peer들이 직접 통신</Bullet>
          <Bullet>동적 IP, 간헐적 연결</Bullet>
          <Bullet color="#22c55e"><Term>Self-scalability</Term>: Peer 증가 시 용량도 증가</Bullet>
          <Bullet color="#ef4444">관리 어려움, 보안 취약</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Process & Socket ── */
function SlideSocket() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#22c55e")}>통신 원리</span>
      <h2 style={s.title}>Process와 Socket</h2>
      <p style={s.subtitle}>프로세스는 문(<span style={s.keyword}><Term>Socket</Term></span>)을 통해 네트워크로 데이터를 내보냅니다.</p>

      <div style={{ background: "#161920", borderRadius: "12px", padding: "2rem", border: "1px solid #334155", display: "flex", alignItems: "center", gap: "1rem", justifyContent: "space-between" }}>
        {/* App Layer */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ background: "#1e3a5f", padding: "1rem", borderRadius: "8px", border: "1px solid #3b82f6" }}>
            <div style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.5rem" }}>Application Process</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>메시지 생성</div>
          </div>
        </div>

        {/* Socket */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#22c55e", fontWeight: 700 }}>
          <span>→ Socket →</span>
          <span style={{ fontSize: "0.8rem" }}>(API)</span>
        </div>

        {/* Transport Layer */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ background: "#1a3a2a", padding: "1rem", borderRadius: "8px", border: "1px solid #22c55e" }}>
            <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.5rem" }}>Transport Layer</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}><Term>TCP</Term> / <Term>UDP</Term></div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ color: "#f1f5f9", fontSize: "1.2rem", marginBottom: "0.8rem" }}>프로세스 식별 (Addressing)</h3>
        <Bullet>호스트 식별자 = <span style={s.keyword}><Term>IP</Term> 주소</span> (32-bit IPv4)</Bullet>
        <Bullet>프로세스 식별자 = <span style={s.keyword}><Term>Port</Term> 번호</span> (예: HTTP 80, Mail 25)</Bullet>
        <div style={{ ...s.codeBox, marginTop: "1rem", textAlign: "center", fontSize: "1.1rem" }}>
          목적지 = 192.168.1.10 : 80
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: HTTP/Web ── */
function SlideHTTP() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#a78bfa")}>웹 프로토콜</span>
      <h2 style={s.title}>HTTP 기본 & 메시지 구조</h2>
      <p style={s.subtitle}>웹은 <Term>TCP</Term> 위에서 동작하는 <span style={s.keyword}>Stateless</span> 프로토콜인 <Term>HTTP</Term>를 사용합니다.</p>

      <div className="grid-1-to-2" style={s.grid2}>
        {/* Request */}
        <div style={s.card("#a78bfa40")}>
          <h3 style={{ color: "#c084fc", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Request Message</h3>
          <div style={s.codeBox}>
            <span style={{ color: "#f472b6" }}>GET</span> /index.html HTTP/1.1<br/>
            Host: www.example.com<br/>
            User-Agent: Mozilla/5.0<br/>
            Accept-Language: ko-KR<br/>
            <br/>
            (entity body - POST인 경우)
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Bullet color="#c084fc">방식: GET, POST, HEAD, PUT</Bullet>
          </div>
        </div>

        {/* Response */}
        <div style={s.card("#22c55e40")}>
          <h3 style={{ color: "#4ade80", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Response Message</h3>
          <div style={s.codeBox}>
            HTTP/1.1 <span style={{ color: "#4ade80" }}>200 OK</span><br/>
            Date: Tue, 02 Jun 2026 09:00:00 GMT<br/>
            Server: Apache/2.4.41<br/>
            Content-Type: text/html<br/>
            <br/>
            &lt;html&gt;...&lt;/html&gt;
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Bullet color="#4ade80">상태: 200(OK), 301(Moved), 404(Not Found)</Bullet>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(167, 139, 250, 0.1)", borderRadius: "8px", borderLeft: "3px solid #a78bfa" }}>
        <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.3rem" }}>💡 Non-persistent vs Persistent HTTP</div>
        <div style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>Non-persistent는 객체마다 TCP 연결을 새로 맺어 <Term>RTT</Term>가 낭비되지만, Persistent는 연결 하나로 여러 객체를 주고받습니다.</div>
      </div>
    </div>
  );
}

/* ── SLIDE: Email & SMTP ── */
function SlideEmail() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#f472b6")}>이메일</span>
      <h2 style={s.title}>E-mail: SMTP, POP3, IMAP</h2>
      <p style={s.subtitle}>이메일 전송은 <span style={s.keyword}>Push</span>, 읽기는 <span style={s.keyword}>Pull</span> 방식입니다.</p>

      {/* Email Flow Diagram */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#161920", padding: "2rem", borderRadius: "12px", border: "1px solid #334155", marginBottom: "2rem" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🧑‍💻</div>
          <div style={{ color: "#f1f5f9", fontWeight: 700 }}>Sender (UA)</div>
        </div>
        
        <div style={{ flex: 1, textAlign: "center", position: "relative" }}>
          <div style={{ color: "#f472b6", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>Push (<Term>SMTP</Term>)</div>
          <div style={{ height: "2px", background: "#f472b6", width: "100%" }} />
          <div style={{ position: "absolute", right: 0, top: "22px", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #f472b6" }} />
        </div>

        <div style={{ textAlign: "center", padding: "0 1rem" }}>
          <Mail size={32} color="#94a3b8" style={{ marginBottom: "0.5rem" }} />
          <div style={{ color: "#f1f5f9", fontWeight: 700 }}>Sender Mail Server</div>
        </div>

        <div style={{ flex: 1, textAlign: "center", position: "relative" }}>
          <div style={{ color: "#f472b6", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>Push (<Term>SMTP</Term>)</div>
          <div style={{ height: "2px", background: "#f472b6", width: "100%" }} />
          <div style={{ position: "absolute", right: 0, top: "22px", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #f472b6" }} />
        </div>

        <div style={{ textAlign: "center", padding: "0 1rem" }}>
          <Mail size={32} color="#3b82f6" style={{ marginBottom: "0.5rem" }} />
          <div style={{ color: "#f1f5f9", fontWeight: 700 }}>Receiver Mail Server</div>
        </div>

        <div style={{ flex: 1, textAlign: "center", position: "relative" }}>
          <div style={{ color: "#3b82f6", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>Pull (POP3/IMAP)</div>
          <div style={{ height: "2px", background: "#3b82f6", width: "100%" }} />
          <div style={{ position: "absolute", left: 0, top: "22px", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderRight: "8px solid #3b82f6" }} />
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👱‍♀️</div>
          <div style={{ color: "#f1f5f9", fontWeight: 700 }}>Receiver (UA)</div>
        </div>
      </div>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.card("#334155")}>
          <h3 style={{ color: "#cbd5e1", fontSize: "1.1rem" }}>SMTP (Push)</h3>
          <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>TCP 포트 25 사용. 발신자 서버에서 수신자 서버로 메일을 밀어넣음.</div>
        </div>
        <div style={s.card("#334155")}>
          <h3 style={{ color: "#cbd5e1", fontSize: "1.1rem" }}>POP3 / IMAP (Pull)</h3>
          <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>수신자가 서버에서 메일을 읽어옴. IMAP은 폴더 동기화 상태 유지.</div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: DNS ── */
function SlideDNS() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#06b6d4")}>네임 시스템</span>
      <h2 style={s.title}>DNS (Domain Name System)</h2>
      <p style={s.subtitle}>도메인 이름을 IP 주소로 변환하는 분산 데이터베이스 시스템.</p>

      <div className="flex-col-to-row" style={{ alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#e2e8f0", fontSize: "1.1rem", marginBottom: "1rem" }}>중앙집중형이 아닌 이유</h3>
          <Bullet color="#ef4444">단일 장애점 (Single point of failure)</Bullet>
          <Bullet color="#ef4444">전 세계 트래픽 집중 (Traffic volume)</Bullet>
          <Bullet color="#ef4444">물리적 거리에 따른 지연 (Delay)</Bullet>
        </div>

        <div style={{ flex: 1, background: "#161920", border: "1px solid #334155", borderRadius: "12px", padding: "1.5rem" }}>
          <h3 style={{ color: "#06b6d4", fontSize: "1.1rem", marginBottom: "1rem", textAlign: "center" }}>DNS Hierarchy</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ background: "#1e3a5f", padding: "0.5rem 1rem", borderRadius: "6px", color: "#60a5fa", width: "100%", textAlign: "center" }}>Root DNS Servers</div>
            <ArrowDown size={16} color="#475569" />
            <div style={{ background: "#1a3a2a", padding: "0.5rem 1rem", borderRadius: "6px", color: "#4ade80", width: "100%", textAlign: "center" }}>TLD DNS Servers (.com, .kr)</div>
            <ArrowDown size={16} color="#475569" />
            <div style={{ background: "#3b2a1a", padding: "0.5rem 1rem", borderRadius: "6px", color: "#fb923c", width: "100%", textAlign: "center" }}>Authoritative DNS Servers</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ color: "#f1f5f9", fontSize: "1.1rem", marginBottom: "0.8rem" }}>주요 레코드(RR) 타입</h3>
        <div className="grid-1-to-2" style={s.grid2}>
          <div style={s.card()}><span style={s.keyword}>Type A</span> : 도메인 이름 → IPv4 주소</div>
          <div style={s.card()}><span style={s.keyword}>Type NS</span> : 도메인의 권한 네임서버</div>
          <div style={s.card()}><span style={s.keyword}>Type CNAME</span> : 별칭(Alias) → 정식 이름</div>
          <div style={s.card()}><span style={s.keyword}>Type MX</span> : 메일 서버 이름</div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: P2P & BitTorrent ── */
function SlideP2P() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#f59e0b")}>P2P 분산 공유</span>
      <h2 style={s.title}>BitTorrent & 파일 공유 구조</h2>
      <p style={s.subtitle}>서버 한 대가 고통받지 않고, 파일을 받는 사람들이 직접 조각(chunk)을 나눠줍니다.</p>

      <div style={{ background: "#161920", border: "1px solid #f59e0b40", borderRadius: "12px", padding: "2rem", borderTop: "3px solid #f59e0b", marginBottom: "1.5rem" }}>
        <h3 style={{ color: "#f59e0b", fontSize: "1.2rem", marginBottom: "1rem" }}>BitTorrent 핵심 메커니즘</h3>
        <Bullet>파일을 256KB 크기의 <strong>Chunk</strong>들로 나눕니다.</Bullet>
        <Bullet><strong>Tracker</strong>: 토렌트에 참여 중인 Peer들의 IP 목록을 관리하고 새 Peer에게 알려줍니다.</Bullet>
        <Bullet><strong>Rarest First</strong>: 네트워크에 가장 희귀한 조각을 먼저 요청하여 분산을 극대화합니다.</Bullet>
        <Bullet><strong>Tit-for-Tat</strong>: 나에게 데이터를 잘(빠르게) 보내주는 Peer 4명에게 우선적으로 데이터를 보냅니다. (이기적인 노드 배제)</Bullet>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1, background: "rgba(59,130,246,0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid #3b82f640" }}>
          <div style={{ fontWeight: 700, color: "#60a5fa", marginBottom: "0.5rem" }}>Client-Server 전송 시간</div>
          <div style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>클라이언트 수 N이 증가하면 서버 업로드 부담이 N배로 증가하여 <strong>O(N)</strong>으로 시간이 늦어집니다.</div>
        </div>
        <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid #f59e0b40" }}>
          <div style={{ fontWeight: 700, color: "#fbbf24", marginBottom: "0.5rem" }}>P2P 전송 시간</div>
          <div style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>클라이언트가 늘어나면 업로드 용량도 같이 늘어나 전송 시간이 <strong>일정 수준으로 수렴</strong>합니다.</div>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Video Streaming (DASH/CDN) ── */
function SlideVideo() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#ec4899")}>멀티미디어</span>
      <h2 style={s.title}>Video Streaming: <Term>DASH</Term> & <Term>CDN</Term></h2>
      <p style={s.subtitle}>Netflix, YouTube가 버퍼링 없이 고화질을 서비스하는 원리</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.vsBox("#ec4899")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Film size={24} color="#ec4899" />
            <h3 style={{ color: "#ec4899", fontSize: "1.3rem", margin: 0 }}>DASH</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "1rem" }}>Dynamic Adaptive Streaming over HTTP</div>
          <Bullet>동일한 영상을 <strong>여러 해상도/비트레이트</strong> 버전으로 쪼개서 서버에 저장</Bullet>
          <Bullet>클라이언트(브라우저)가 자신의 <strong>현재 네트워크 상태(대역폭)</strong>를 보고 적절한 화질의 조각(Chunk)을 요청</Bullet>
          <Bullet color="#22c55e">네트워크가 느려져도 영상이 끊기지 않고 화질만 낮아짐</Bullet>
        </div>
        
        <div style={s.vsBox("#8b5cf6")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Network size={24} color="#8b5cf6" />
            <h3 style={{ color: "#8b5cf6", fontSize: "1.3rem", margin: 0 }}>CDN</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "1rem" }}>Content Delivery Network</div>
          <Bullet>단일 거대 서버 대신, 전 세계 수많은 <strong>지역 엣지 서버(Node)</strong>에 콘텐츠 복사본 분산 배치</Bullet>
          <Bullet>유저가 접속 시 <strong>가장 가까운/빠른</strong> CDN 노드로 연결 (Request Routing)</Bullet>
          <Bullet color="#22c55e">글로벌 딜레이 감소, 본서버 부하 분산</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Exam Points ── */
function SlideExam() {
  const points = [
    "Client-server 구조와 P2P 구조의 확장성(scalability) 차이 분석",
    "Process 간 통신에서 Socket의 역할 (문, API)",
    "HTTP Request/Response 구조, 상태 코드 파악",
    "Stateless HTTP에서 Cookie의 역할과 Web Cache 동작 원리",
    "메일 서비스에서 Push(SMTP)와 Pull(POP3/IMAP)의 차이점",
    "DNS 계층 구조와 A, NS, CNAME, MX 레코드 구분",
    "DASH에서 클라이언트가 능동적으로 화질을 선택하는 원리 파악",
    "UDP 소켓과 TCP 소켓 프로그래밍 흐름(순서) 그리기",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>2장 시험/복습 체크리스트</h2>
      <p style={s.subtitle}>이 질문들에 대답할 수 있다면 Application Layer는 마스터한 것입니다.</p>
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
export const ch02Slides = [
  SlideArchitecture,
  SlideSocket,
  SlideHTTP,
  SlideEmail,
  SlideDNS,
  SlideP2P,
  SlideVideo,
  SlideExam,
];
