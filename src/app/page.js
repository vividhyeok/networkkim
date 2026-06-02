"use client";

import Link from "next/link";
import { BookOpen, Layers, Activity, Database, Network, Wifi, Shield } from "lucide-react";

const chapters = [
  { id: "ch01", title: "Introduction", desc: "인터넷 구조, 프로토콜, 계층, 성능 지표 전체 조감도", icon: BookOpen },
  { id: "ch02", title: "Application Layer", desc: "HTTP, DNS, SMTP, P2P, CDN 등 응용 계층 프로토콜", icon: Layers },
  { id: "ch03", title: "Transport Layer", desc: "TCP, UDP, 신뢰적 전송, 혼잡 제어", icon: Activity },
  { id: "ch04", title: "Network Data Plane", desc: "IP, 라우팅 테이블, NAT, DHCP", icon: Database },
  { id: "ch05", title: "Network Control Plane", desc: "라우팅 알고리즘, OSPF, BGP, SDN", icon: Network },
  { id: "ch06", title: "Link Layer & LANs", desc: "Ethernet, ARP, MAC, 스위칭", icon: Network },
  { id: "ch07", title: "Wireless & Mobile", desc: "Wi-Fi, 셀룰러, 이동성 관리", icon: Wifi },
  { id: "ch08", title: "Blockchain & P2P", desc: "분산 원장, 합의 알고리즘, P2P 네트워크", icon: Shield },
];

function ChapterCard({ ch }) {
  const Icon = ch.icon;
  return (
    <Link href={`/chapter/${ch.id}`}>
      <div style={{
        background: "#1a1d24",
        border: "1px solid #2d3748",
        borderRadius: "10px",
        padding: "1.25rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        transition: "border-color 0.15s",
        cursor: "pointer",
      }}
      className="chapter-card"
      >
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "rgba(59,130,246,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#3b82f6", flexShrink: 0,
        }}>
          <Icon size={18} />
        </div>
        <div>
          <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1px", margin: "0 0 0.2rem" }}>
            {ch.id.replace("ch", "CH")}
          </p>
          <h3 style={{ fontSize: "1.05rem", color: "#e2e8f0", margin: "0 0 0.3rem", fontWeight: 600 }}>
            {ch.title}
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0, lineHeight: 1.4 }}>
            {ch.desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 0" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
          네트워크 학습 노트
        </h1>
        <p style={{ color: "#64748b", fontSize: "1rem", margin: 0 }}>
          정보통신 핵심 개념을 슬라이드별로 정리한 인터랙티브 학습 자료입니다. ← / → 키로 넘겨보세요.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "0.75rem" }}>
        {chapters.map((ch) => (
          <ChapterCard key={ch.id} ch={ch} />
        ))}
      </div>

      <style jsx>{`
        .chapter-card:hover {
          border-color: #3b82f6 !important;
        }
      `}</style>
    </div>
  );
}
