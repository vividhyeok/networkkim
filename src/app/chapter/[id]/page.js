import { getChapterContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import EncapsulationVisualizer from "@/components/Visualizers/EncapsulationVisualizer";
import SwitchingVisualizer from "@/components/Visualizers/SwitchingVisualizer";
import ProtocolStack from "@/components/Visualizers/ProtocolStack";
import KidsExplanation from "@/components/Visualizers/KidsExplanation";

export default async function ChapterPage({ params }) {
  const { id } = await params;
  const content = getChapterContent(id);
  
  if (!content) {
    notFound();
  }

  // Pre-process markdown to insert Visualizers if we wanted to dynamically, 
  // but for a clean 12-year-old educational site, we can insert them at specific sections 
  // or just render them at the top/bottom of ch01.
  // Actually, we can use a custom component map in react-markdown.
  
  const customRenderers = {
    h2: ({node, ...props}) => {
      const text = props.children;
      // We can insert components after specific headings based on the text.
      return (
        <>
          <h2 {...props}>{text}</h2>
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
        </>
      );
    }
  };

  return (
    <div className="glass-panel" style={{ padding: "3rem", maxWidth: "100%", margin: "0 auto" }}>
      <div className="markdown-body">
        {id === "ch01" && (
          <KidsExplanation title="1장 12살 요약: 네트워크의 첫 걸음!">
            인터넷은 전 세계의 컴퓨터들이 거미줄처럼 연결된 거대한 그물이에요. 이 그물을 통해 우리는 유튜브도 보고 게임도 할 수 있죠. 이번 장에서는 그물(네트워크)이 어떻게 생겼고, 데이터가 어떻게 안전하게 전달되는지 아주 큰 그림을 살펴볼 거예요!
          </KidsExplanation>
        )}
        <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
