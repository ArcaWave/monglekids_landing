import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "./SectionHeader";

const FAQS = [
  {
    q: "몇 살 아이에게 적합한가요?",
    a: "5–9세 아이를 중심으로 설계되어 있어요. 말하고 상상할 수 있다면 즐겁게 참여할 수 있어요.",
  },
  {
    q: "AI 튜터와는 어떻게 다른가요?",
    a: "정답을 알려주는 튜터가 아닌, 좋은 질문으로 아이의 생각을 펼쳐주는 창의 동반자입니다.",
  },
  {
    q: "성장 효과는 어떻게 확인하나요?",
    a: "부모 리포트로 아이의 관심사 · 질문 · 몰입 흐름을 한눈에 보여드려요.",
  },
  {
    q: "스크린 타임이 더 늘지 않나요?",
    a: "보는 시간이 아니라 말하고 만드는 시간을 만듭니다. 같은 화면 시간이 의미 있게 바뀌어요.",
  },
  {
    q: "베타에서는 무엇을 체험하나요?",
    a: "맞춤 창작 미션, AI와의 대화, 부모 리포트 샘플을 순차적으로 제공해요.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="FAQ"
          title={<>자주 묻는 질문</>}
        />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-grape-100/70 overflow-hidden rounded-[28px] bg-white ring-1 ring-grape-100/70 clay-shadow-sm">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-cream-100/40 sm:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15.5px] font-semibold text-ink-900 sm:text-[16.5px]">
                    {item.q}
                  </span>
                  <span
                    className={[
                      "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full transition",
                      isOpen
                        ? "bg-grape-600 text-white"
                        : "bg-grape-50 text-grape-700",
                    ].join(" ")}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={[
                    "grid overflow-hidden transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <p className="px-5 pb-6 text-[14.5px] leading-relaxed text-ink-600 sm:px-7">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
