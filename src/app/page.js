import Link from "next/link";
import { BookOpen, Activity, Network, Shield } from "lucide-react";

export default function Home() {
  return (
    <div style={{ padding: "2rem 0", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
          Explore the <br />
          <span style={{ color: "var(--accent-pink)" }}>Network</span> Universe
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
          복잡한 네트워크(정보통신) 이론을 아름다운 시각화와 12살도 이해할 수 있는 쉬운 설명으로 마스터하세요.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
        <div className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
          <BookOpen size={40} color="var(--accent-blue)" style={{ margin: "0 auto 1rem auto" }} />
          <h3>초보자 맞춤 설명</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>어려운 전문 용어를 일상생활의 비유로 풀어서 설명합니다.</p>
        </div>
        <div className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
          <Activity size={40} color="var(--accent-purple)" style={{ margin: "0 auto 1rem auto" }} />
          <h3>인터랙티브 시각화</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>단순 텍스트가 아닌, 눈으로 움직이는 애니메이션을 통해 원리를 파악합니다.</p>
        </div>
        <div className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
          <Network size={40} color="var(--accent-pink)" style={{ margin: "0 auto 1rem auto" }} />
          <h3>5계층 아키텍처</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>애플리케이션 계층부터 물리 계층까지 모든 과정을 한 번에 훑어봅니다.</p>
        </div>
      </div>

      <section className="glass-panel" style={{ padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ borderBottom: "none", margin: 0, padding: 0 }}>지금 바로 시작하세요</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>1장부터 8장까지의 완벽한 요약본과 시각화 자료가 준비되어 있습니다.</p>
        <Link href="/chapter/ch01" style={{
          display: "inline-block",
          padding: "1rem 2.5rem",
          background: "linear-gradient(90deg, var(--accent-blue), var(--accent-purple))",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "30px",
          fontSize: "1.1rem",
          boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)",
          transition: "transform 0.2s"
        }}>
          1장. Introduction 학습하기
        </Link>
      </section>
    </div>
  );
}
