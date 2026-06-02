import { getChapterContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import EncapsulationVisualizer from "@/components/Visualizers/EncapsulationVisualizer";
import SwitchingVisualizer from "@/components/Visualizers/SwitchingVisualizer";
import ProtocolStack from "@/components/Visualizers/ProtocolStack";
import KidsExplanation from "@/components/Visualizers/KidsExplanation";
import ChapterContent from "@/components/ChapterContent";

export default async function ChapterPage({ params }) {
  const { id } = await params;
  const content = getChapterContent(id);
  
  if (!content) {
    notFound();
  }

  // Parse markdown into sections by h2
  const sections = [];
  const lines = content.split("\n");
  let currentSection = { title: "", level: 0, lines: [] };
  let chapterTitle = "";

  for (const line of lines) {
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      chapterTitle = line.replace("# ", "").trim();
      continue;
    }
    if (line.startsWith("## ")) {
      if (currentSection.title || currentSection.lines.length > 0) {
        sections.push({ ...currentSection, body: currentSection.lines.join("\n").trim() });
      }
      currentSection = { title: line.replace("## ", "").trim(), level: 2, lines: [] };
    } else {
      currentSection.lines.push(line);
    }
  }
  if (currentSection.title || currentSection.lines.length > 0) {
    sections.push({ ...currentSection, body: currentSection.lines.join("\n").trim() });
  }

  // Filter out noise sections (page-level reading mode tables, etc.)
  const noiseTitles = ["1. 읽기 전략", "5. 페이지별 판독 모드", "11. 페이지별 판독 모드", "12. 페이지별 판독 모드"];
  const filteredSections = sections.filter(s => {
    if (noiseTitles.some(n => s.title.includes(n.replace(/^\d+\.\s*/, "")))) return false;
    if (s.title.includes("페이지별 판독 모드")) return false;
    if (s.title.includes("읽기 전략")) return false;
    return true;
  });

  return (
    <div style={{ width: "100%", paddingBottom: "5rem" }}>
      {/* Chapter Header */}
      <div style={{
        padding: "3rem 0 2rem",
        marginBottom: "2rem",
        borderBottom: "1px solid var(--border-color)"
      }}>
        <p style={{ color: "var(--accent-blue)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          {id.replace("ch", "CHAPTER ")}
        </p>
        <h1 style={{ fontSize: "2.2rem", color: "#f1f5f9", margin: 0, fontWeight: 700 }}>
          {chapterTitle || `Chapter ${id.replace("ch", "")}`}
        </h1>
      </div>

      {/* Sections as Cards */}
      <ChapterContent
        sections={filteredSections}
        chapterId={id}
      />
    </div>
  );
}
