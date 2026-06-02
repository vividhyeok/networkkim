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
      <div style={{ textAlign: "center", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--glass-border)" }}>
        <h1 style={{ fontSize: "3rem", margin: 0 }} {...props} />
      </div>
    ),
    h2: ({node, ...props}) => {
      const text = props.children;
      return (
        <div style={{ marginTop: "4rem" }}>
          <h2 style={{ color: "var(--accent-pink)", display: "flex", alignItems: "center", gap: "0.5rem" }} {...props}>
            <BookOpen size={28} />
            {text}
          </h2>
          {text === "3.5 Packet switching" && id === "ch01" && (
            <KidsExplanation title="패킷 스위칭이란? (12살 맞춤 설명)">
              <p>패킷 스위칭은 편지를 보낼 때 한 장의 긴 편지 대신, 여러 장의 엽서로 나눠서 보내는 것과 같아요! 우체국(라우터) 아저씨가 엽서 하나하나를 보고 가장 빠른 길로 목적지까지 보내주죠. 엽서가 중간에 순서가 섞여도 도착해서 다시 합치면 되니까 인터넷처럼 사람들이 한 번에 많이 몰리는 곳에서 효율적이에요.</p>
            </KidsExplanation>
          )}
          {text === "3.6 Circuit switching" && id === "ch01" && (
            <SwitchingVisualizer />
          )}
          {text === "3.8 Protocol layering" && id === "ch01" && (
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
    h3: ({node, ...props}) => <h3 style={{ color: "var(--accent-blue)", marginTop: "2rem" }} {...props} />,
    table: ({node, ...props}) => (
      <div style={{ overflowX: "auto", margin: "2rem 0", borderRadius: "12px", border: "1px solid var(--glass-border)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(0,0,0,0.2)" }} {...props} />
      </div>
    ),
    th: ({node, ...props}) => <th style={{ padding: "1rem", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--glass-border)", color: "var(--accent-blue)", textAlign: "left" }} {...props} />,
    td: ({node, ...props}) => <td style={{ padding: "1rem", borderBottom: "1px solid var(--glass-border)" }} {...props} />
  };

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", paddingBottom: "5rem" }}>
      <div className="glass-panel" style={{ padding: "4rem 3rem", borderRadius: "24px" }}>
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
        
        <div className="markdown-body educational-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={customRenderers}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
