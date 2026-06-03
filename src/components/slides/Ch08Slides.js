"use client";

import { Link as LinkIcon, Bitcoin, Blocks, Network, Database, Pickaxe, HardDrive, Unlink } from "lucide-react";
import Term from "@/components/Term";

/* ═══════════════════════════════════════════
   Visual Slide Components for Ch08
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

/* ── SLIDE: Blockchain Concept ── */
function SlideBlockchain() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#3b82f6")}>기본 개념</span>
      <h2 style={s.title}>Blockchain 데이터 구조</h2>
      <p style={s.subtitle}>데이터가 담긴 "블록"들이 암호학적으로 "체인"처럼 연결된 장부(Ledger)입니다.</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#161920", padding: "3rem 2rem", borderRadius: "12px", border: "1px solid #334155", marginBottom: "1.5rem" }}>
        
        {/* Block N */}
        <div style={{ flex: 1, background: "#1e3a5f", border: "2px solid #3b82f6", borderRadius: "8px", padding: "1rem", position: "relative" }}>
          <div style={{ color: "#60a5fa", fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>Block N</div>
          <div style={{ background: "#0c1220", padding: "0.5rem", borderRadius: "4px", color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Prev Hash: (Genesis)</div>
          <div style={{ background: "#0c1220", padding: "0.5rem", borderRadius: "4px", color: "#cbd5e1", fontSize: "0.85rem" }}>Data (Transactions)</div>
        </div>

        <LinkIcon size={40} color="#3b82f6" style={{ margin: "0 1rem" }} />

        {/* Block N+1 */}
        <div style={{ flex: 1, background: "#1a3a2a", border: "2px solid #22c55e", borderRadius: "8px", padding: "1rem", position: "relative" }}>
          <div style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>Block N+1</div>
          <div style={{ background: "#0c1220", padding: "0.5rem", borderRadius: "4px", color: "#22c55e", fontSize: "0.8rem", marginBottom: "0.5rem", fontWeight: 700 }}>Prev Hash: [Block N Hash]</div>
          <div style={{ background: "#0c1220", padding: "0.5rem", borderRadius: "4px", color: "#cbd5e1", fontSize: "0.85rem" }}>Data (Transactions)</div>
        </div>

        <LinkIcon size={40} color="#22c55e" style={{ margin: "0 1rem" }} />

        {/* Block N+2 */}
        <div style={{ flex: 1, background: "#3b1a3a", border: "2px solid #f472b6", borderRadius: "8px", padding: "1rem", position: "relative" }}>
          <div style={{ color: "#f472b6", fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>Block N+2</div>
          <div style={{ background: "#0c1220", padding: "0.5rem", borderRadius: "4px", color: "#f472b6", fontSize: "0.8rem", marginBottom: "0.5rem", fontWeight: 700 }}>Prev Hash: [Block N+1 Hash]</div>
          <div style={{ background: "#0c1220", padding: "0.5rem", borderRadius: "4px", color: "#cbd5e1", fontSize: "0.85rem" }}>Data (Transactions)</div>
        </div>
      </div>

      <div style={{ background: "rgba(59,130,246,0.1)", padding: "1rem", borderRadius: "8px", borderLeft: "3px solid #3b82f6" }}>
        <strong style={{ color: "#60a5fa" }}>불변성 (Tamper-resistance):</strong> 누군가 과거의 Block N 데이터를 조작하면, 그 블록의 Hash 값이 바뀌어버립니다. 그럼 N+1 블록이 가진 Prev Hash와 맞지 않아 연결이 즉시 깨지게 됩니다.
      </div>
    </div>
  );
}

/* ── SLIDE: Bitcoin vs Blockchain ── */
function SlideBitcoin() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#f59e0b")}>핵심 차이</span>
      <h2 style={s.title}>Bitcoin ≠ Blockchain</h2>
      
      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.vsBox("#f59e0b")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Blocks size={24} color="#f59e0b" />
            <h3 style={{ color: "#f59e0b", fontSize: "1.3rem", margin: 0 }}>Blockchain</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>근간이 되는 "기반 기술"</div>
          <Bullet>데이터를 안전하게 분산 저장하는 아키텍처</Bullet>
          <Bullet>금융뿐만 아니라 물류, 계약(Smart Contract), 신원 인증 등 <strong>다양한 분야에 적용 가능</strong></Bullet>
        </div>

        <div style={s.vsBox("#ec4899")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Bitcoin size={24} color="#ec4899" />
            <h3 style={{ color: "#ec4899", fontSize: "1.3rem", margin: 0 }}>Bitcoin</h3>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: "1rem" }}>최초이자 가장 유명한 "앱(Application)"</div>
          <Bullet>블록체인 기술을 <strong>암호화폐(Cryptocurrency)</strong>에 적용한 첫 사례</Bullet>
          <Bullet>은행(Middleman) 없이 이중 지불(Double-spending) 문제를 해결</Bullet>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "#161920", padding: "1.5rem", borderRadius: "12px", border: "1px solid #334155" }}>
        <div style={{ textAlign: "center", color: "#94a3b8" }}>
          기존 결제: 나 &rarr; <span style={{ color: "#ef4444", fontWeight: 700, margin: "0 0.5rem" }}>은행 (Middleman)</span> &rarr; 너<br/><br/>
          비트코인: 나 &rarr; <span style={{ color: "#22c55e", fontWeight: 700, margin: "0 0.5rem" }}>P2P 네트워크 검증</span> &rarr; 너
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Torrent vs Blockchain ── */
function SlideP2P() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#a78bfa")}>P2P 비교</span>
      <h2 style={s.title}>Torrent vs Blockchain</h2>
      <p style={s.subtitle}>둘 다 서버 없이 개인들이 연결된 P2P 네트워크지만 목적이 다릅니다.</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.vsBox("#3b82f6")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Network size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.2rem", margin: 0 }}>Torrent</h3>
          </div>
          <Bullet><strong>목적:</strong> 무거운 파일을 조각내서 빠르게 다운로드/배포</Bullet>
          <Bullet><strong>대상:</strong> 수많은 서로 다른 파일들</Bullet>
          <Bullet>신뢰 구조: 조각을 모아 내 컴퓨터에서 완성하면 끝</Bullet>
        </div>

        <div style={s.vsBox("#a78bfa")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <LinkIcon size={24} color="#a78bfa" />
            <h3 style={{ color: "#a78bfa", fontSize: "1.2rem", margin: 0 }}>Blockchain</h3>
          </div>
          <Bullet><strong>목적:</strong> 장부(Ledger)의 일관성과 위변조 방지 (Consensus)</Bullet>
          <Bullet><strong>대상:</strong> 전 세계가 공유하는 <strong>하나의 역사(One shared ledger)</strong></Bullet>
          <Bullet>신뢰 구조: 네트워크 과반수(Majority)의 합의가 필요</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Mining ── */
function SlideMining() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#22c55e")}>합의 증명</span>
      <h2 style={s.title}>Mining (채굴) 원리</h2>
      <p style={s.subtitle}>서버가 없는데 누가 거래 내역을 확정(Write)할까요? 수학 문제를 가장 먼저 푸는 사람에게 권한을 줍니다.</p>

      <div style={{ background: "#161920", border: "1px solid #22c55e40", borderRadius: "12px", padding: "2rem", borderTop: "3px solid #22c55e", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <Pickaxe size={32} color="#22c55e" />
          <h3 style={{ color: "#4ade80", fontSize: "1.3rem", margin: 0 }}>Proof of Work (작업 증명)</h3>
        </div>
        
        <div style={s.codeBox}>
          Hash ( Block Data + Prev Hash + <span style={{ color: "#f59e0b", fontWeight: 700 }}>Nonce</span> ) &lt; <span style={{ color: "#ef4444", fontWeight: 700 }}>Target</span>
        </div>
        
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <Bullet><strong>Target:</strong> 네트워크가 정해준 난이도 (이 값보다 작은 Hash를 찾아야 함)</Bullet>
          <Bullet><strong>Nonce:</strong> 채굴자가 Hash 값을 바꾸기 위해 무작위로 계속 대입해보는 임의의 숫자</Bullet>
          <Bullet>수많은 계산(전력 소모) 끝에 조건을 만족하는 Nonce를 먼저 찾은 채굴자가 블록을 확정!</Bullet>
          <Bullet color="#f59e0b"><strong>보상 (Reward):</strong> 블록을 찾은 수고비로 새로 발행된 비트코인을 받음</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: DB vs Blockchain ── */
function SlideDB() {
  return (
    <div style={s.slide}>
      <span style={s.tag("#06b6d4")}>저장소 비교</span>
      <h2 style={s.title}>Database vs Blockchain</h2>
      <p style={s.subtitle}>블록체인이 무조건 좋은 것은 아닙니다. 신뢰를 얻기 위해 효율성을 포기한 구조입니다.</p>

      <div className="grid-1-to-2" style={s.grid2}>
        <div style={s.vsBox("#3b82f6")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <HardDrive size={24} color="#3b82f6" />
            <h3 style={{ color: "#3b82f6", fontSize: "1.3rem", margin: 0 }}>Centralized DB</h3>
          </div>
          <Bullet>관리자(Admin)가 모든 통제권 보유</Bullet>
          <Bullet>관리자 허락(권한)이 있어야 읽기/쓰기 가능</Bullet>
          <Bullet color="#22c55e">처리 속도가 매우 <strong>빠름</strong></Bullet>
          <Bullet color="#ef4444">관리자가 악의적으로 조작하면 막기 어려움</Bullet>
        </div>

        <div style={s.vsBox("#06b6d4")}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Unlink size={24} color="#06b6d4" />
            <h3 style={{ color: "#06b6d4", fontSize: "1.3rem", margin: 0 }}>Blockchain Ledger</h3>
          </div>
          <Bullet>누구 한 명이 통제하지 않음 (분산형)</Bullet>
          <Bullet>(Public의 경우) 누구나 접근/참여 가능</Bullet>
          <Bullet>네트워크의 <strong>합의(Consensus)</strong>로만 쓰기 가능</Bullet>
          <Bullet color="#ef4444">합의 과정 때문에 속도가 <strong>느림</strong> (비트코인은 약 10분 소요)</Bullet>
        </div>
      </div>
    </div>
  );
}

/* ── SLIDE: Exam Points ── */
function SlideExam() {
  const points = [
    "블록체인 구조에서 '이전 블록의 해시(Prev Hash)'가 데이터 위변조를 막는 원리",
    "비트코인(앱)과 블록체인(기반 기술)의 개념적 차이 구분",
    "비트코인이 중앙 은행(Middleman) 없이 이중 지불(Double-spending)을 해결한 의의",
    "토렌트(파일 조각 배포)와 블록체인(하나의 장부 합의)의 P2P 목적 차이",
    "마이닝(Mining)에서 Nonce를 변경하며 Target보다 작은 Hash를 찾는 과정(PoW)",
    "기존 데이터베이스(빠르고 중앙화)와 블록체인(느리지만 분산/위변조 방지)의 장단점 비교",
  ];
  return (
    <div style={{ ...s.slide, borderColor: "rgba(245,158,11,0.3)", borderTop: "3px solid #f59e0b" }}>
      <span style={s.tag("#f59e0b")}>시험 대비</span>
      <h2 style={s.title}>8장 시험/복습 체크리스트</h2>
      <p style={s.subtitle}>블록체인의 분산 원장 개념과 마이닝 동작 원리를 점검합니다.</p>
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
export const ch08Slides = [
  SlideBlockchain,
  SlideBitcoin,
  SlideP2P,
  SlideMining,
  SlideDB,
  SlideExam,
];
