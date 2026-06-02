"use client";

import { ch01Slides } from "@/components/slides/Ch01Slides";
import { ch02Slides } from "@/components/slides/Ch02Slides";
import { ch03Slides } from "@/components/slides/Ch03Slides";
import { ch04Slides } from "@/components/slides/Ch04Slides";
import { ch05Slides } from "@/components/slides/Ch05Slides";
import { ch06Slides } from "@/components/slides/Ch06Slides";
import { ch07Slides } from "@/components/slides/Ch07Slides";
import { ch08Slides } from "@/components/slides/Ch08Slides";

const slidesMap = {
  ch01: ch01Slides,
  ch02: ch02Slides,
  ch03: ch03Slides,
  ch04: ch04Slides,
  ch05: ch05Slides,
  ch06: ch06Slides,
  ch07: ch07Slides,
  ch08: ch08Slides,
};

export default function ChapterContent({ chapterId }) {
  const Slides = slidesMap[chapterId] || [];

  if (Slides.length === 0) {
    return (
      <div style={{ color: "#94a3b8", textAlign: "center", padding: "4rem" }}>
        아직 준비된 슬라이드가 없습니다.
      </div>
    );
  }

  return (
    <div>
      {Slides.map((SlideComponent, i) => (
        <SlideComponent key={i} />
      ))}
    </div>
  );
}
