import { X, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ROWS = [
  {
    label: "콘텐츠 형태",
    legacy: "정해진 콘텐츠 제공",
    mongle: "아이와 함께 생성되는 창의 경험",
  },
  {
    label: "학습 방식",
    legacy: "문제 풀이 / 반복 학습 중심",
    mongle: "질문 · 상상 · 표현 · 만들기 중심",
  },
  {
    label: "아이의 맥락",
    legacy: "아이의 장기 성장 맥락 부족",
    mongle: "아이의 관심사와 창작 흐름을 기억",
  },
  {
    label: "부모가 보는 것",
    legacy: "완료 여부 확인",
    mongle: "성장 패턴과 역량 변화 확인",
  },
];

export default function Differentiation() {
  return (
    <section className="relative bg-gradient-to-b from-cream-50 to-cream-100/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="WHY WE'RE DIFFERENT"
          title={
            <>
              또 하나의 교육 앱이{" "}
              <span className="text-grape-700">아닙니다.</span>
            </>
          }
        />

        <div className="mt-12 overflow-hidden rounded-[28px] ring-1 ring-grape-100 clay-shadow">
          {/* Header row */}
          <div className="grid grid-cols-12 bg-white">
            <div className="col-span-12 hidden border-r border-grape-100/70 bg-cream-100/60 px-5 py-4 text-[12px] font-bold uppercase tracking-widest text-ink-400 md:col-span-3 md:block">
              비교 항목
            </div>
            <div className="col-span-6 border-r border-grape-100/70 px-5 py-4 md:col-span-4">
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-ink-600">
                <X className="h-4 w-4 text-rose-400" /> 기존 교육 앱
              </span>
            </div>
            <div className="col-span-6 bg-gradient-to-br from-grape-50 to-white px-5 py-4 md:col-span-5">
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-grape-700">
                <Check className="h-4 w-4 text-grape-600" /> 몽글키즈
              </span>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-12 ${
                i % 2 === 0 ? "bg-cream-50" : "bg-white"
              }`}
            >
              <div className="col-span-12 hidden border-r border-grape-100/60 px-5 py-5 text-[13px] font-bold text-ink-700 md:col-span-3 md:block">
                {row.label}
              </div>
              <div className="col-span-12 px-5 pt-4 text-[11px] font-bold uppercase tracking-widest text-ink-400 md:hidden">
                {row.label}
              </div>
              <div className="col-span-6 border-r border-grape-100/60 px-5 py-5 text-[14.5px] leading-relaxed text-ink-600 md:col-span-4">
                {row.legacy}
              </div>
              <div className="col-span-6 bg-gradient-to-br from-grape-50/60 to-transparent px-5 py-5 text-[14.5px] font-semibold leading-relaxed text-ink-900 md:col-span-5">
                {row.mongle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
