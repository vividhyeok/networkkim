import { getChapterContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import EncapsulationVisualizer from "@/components/Visualizers/EncapsulationVisualizer";
import SwitchingVisualizer from "@/components/Visualizers/SwitchingVisualizer";
import ProtocolStack from "@/components/Visualizers/ProtocolStack";
import KidsExplanation from "@/components/Visualizers/KidsExplanation";
import { BookOpen } from "lucide-react";

export default async function ChapterPage({ params }) {
  const { id } = await params;
  const content = getChapterContent(id);
  
  if (!content) {
    notFound();
  }
  
  const customRenderers = {
    h1: ({node, ...props}) => (
      <div style={{ marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "2px solid var(--border-color)" }}>
        <h1 style={{ fontSize: "2.5rem", margin: 0, color: "#f8fafc" }} {...props} />
      </div>
    ),
    h2: ({node, ...props}) => {
      // Extract string from children
      const extractText = (children) => {
        if (typeof children === "string") return children;
        if (Array.isArray(children)) return children.map(extractText).join("");
        if (children && children.props && children.props.children) return extractText(children.props.children);
        return "";
      };
      const text = extractText(props.children);
      
      return (
        <div style={{ marginTop: "4rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#e2e8f0", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.75rem" }} {...props}>
            <BookOpen size={24} color="var(--accent-blue)" />
            {props.children}
          </h2>
          {text.includes("3.5 Packet switching") && id === "ch01" && (
            <KidsExplanation title="패킷 스위칭이란? (핵심 요약)">
              <p>패킷 스위칭은 편지를 보낼 때 한 장의 긴 편지 대신, 여러 장의 엽서로 나눠서 보내는 것과 같아요! 라우터가 엽서 하나하나를 보고 가장 빠른 길로 목적지까지 보내주죠. 엽서가 중간에 순서가 섞여도 도착해서 다시 합치면 되니까 인터넷처럼 사람들이 한 번에 많이 몰리는 곳에서 효율적이에요.</p>
            </KidsExplanation>
          )}
          {text.includes("3.6 Circuit switching") && id === "ch01" && (
            <SwitchingVisualizer />
          )}
          {text.includes("3.8 Protocol layering") && id === "ch01" && (
            <>
              <KidsExplanation title="프로토콜 계층이란?">
                <p>학교에서 교장선생님 - 선생님 - 반장 - 학생 순으로 역할이 나눠져 있는 것처럼, 네트워크도 5개의 층으로 역할을 나눴어요! 각 층은 자기 할 일만 딱 끝나면 아래층으로 일을 넘겨요. 덕분에 하나가 고장나도 그 층만 고치면 돼서 편하답니다.</p>
              </KidsExplanation>
              <ProtocolStack />
              <EncapsulationVisualizer />
            </>
          )}
        </div>
      );
    },
    h3: ({node, ...props}) => (
      <h3 style={{ color: "#94a3b8", fontSize: "1.4rem", marginTop: "2.5rem", marginBottom: "1rem", display: "flex", alignItems: "center" }} {...props}>
        <span style={{ display: "inline-block", width: "8px", height: "8px", background: "var(--accent-blue)", borderRadius: "50%", marginRight: "10px" }}></span>
        {props.children}
      </h3>
    ),
    p: ({node, ...props}) => (
      <p style={{ fontSize: "1.05rem", lineHeight: "1.7", color: "#cbd5e1", marginBottom: "1.5rem" }} {...props} />
    ),
    strong: ({node, ...props}) => (
      <strong style={{ color: "#38bdf8", background: "rgba(56, 189, 248, 0.1)", padding: "0.1rem 0.3rem", borderRadius: "4px", fontWeight: "600" }} {...props} />
    ),
    img: ({node, ...props}) => (
      <span style={{ display: "block", margin: "2.5rem 0", textAlign: "center" }}>
        <img style={{ maxWidth: "100%", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }} {...props} />
      </span>
    ),
    ul: ({node, ...props}) => (
      <ul style={{ paddingLeft: "2rem", margin: "1.5rem 0", color: "#cbd5e1" }} {...props} />
    ),
    li: ({node, ...props}) => (
      <li style={{ marginBottom: "0.5rem", fontSize: "1.05rem", lineHeight: "1.6" }} {...props} />
    ),
    blockquote: ({node, ...props}) => (
      <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid var(--accent-blue)", margin: "2rem 0" }}>
        <blockquote style={{ margin: 0, fontSize: "1.1rem", fontStyle: "italic", color: "#e2e8f0" }} {...props} />
      </div>
    ),
    table: ({node, ...props}) => (
      <div style={{ overflowX: "auto", margin: "2.5rem 0", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--bg-panel)" }} {...props} />
      </div>
    ),
    th: ({node, style, ...props}) => <th style={{ padding: "1rem", background: "#1e293b", borderBottom: "2px solid var(--border-color)", color: "#e2e8f0", fontSize: "1rem", ...style }} {...props} />,
    td: ({node, style, ...props}) => <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "#cbd5e1", fontSize: "1rem", ...style }} {...props} />
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingBottom: "5rem" }}>
      <div className="glass-panel" style={{ padding: "4rem 5%", borderRadius: "24px", minHeight: "80vh" }}>
        {id !== "ch01" && (
          <KidsExplanation title="학습 가이드: 이 장을 읽는 방법">
            <p>이 장에서는 복잡한 네트워크 이론이 나옵니다. <strong>굵게 표시된 키워드</strong>를 위주로 읽으면서 전체적인 그림을 머릿속에 그려보세요. 각 장의 제목(h2)이 나타내는 핵심 주제를 이해하는 것이 중요합니다.</p>
          </KidsExplanation>
        )}
        {id === "ch01" && (
          <KidsExplanation title="1장 12살 요약: 네트워크의 첫 걸음!">
            인터넷은 전 세계의 컴퓨터들이 거미줄처럼 연결된 거대한 그물이에요. 이 그물을 통해 우리는 유튜브도 보고 게임도 할 수 있죠. 이번 장에서는 그물(네트워크)이 어떻게 생겼고, 데이터가 어떻게 안전하게 전달되는지 아주 큰 그림을 살펴볼 거예요!
          </KidsExplanation>
        )}
        
        <div className="markdown-body educational-content" style={{ marginTop: "3rem", fontSize: "1.1rem" }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={customRenderers}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
