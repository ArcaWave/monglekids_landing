import { HelpCircle, Tv, MessageSquareQuote, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";

const QUESTIONS = [
  {
    icon: HelpCircle,
    color: "from-grape-100 to-white",
    accent: "text-grape-600",
    text: "AI 시대에 뒤처지지 않을까?",
  },
  {
    icon: Tv,
    color: "from-peach-100 to-white",
    accent: "text-peach-500",
    text: "영상만 보는 시간이 너무 길지 않을까?",
  },
  {
    icon: MessageSquareQuote,
    color: "from-mint-100 to-white",
    accent: "text-mint-500",
    text: "스스로 질문하고 표현하고 있을까?",
  },
  {
    icon: Layers,
    color: "from-rose-100 to-white",
    accent: "text-rose-500",
    text: "우리 아이의 성장을 기억해주는 곳이 있을까?",
  },
];

export default function Problem() {
  return (
    <section id="why" className="relative py-20 md:py-28">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="THE NEW PARENT QUESTION"
          title={
            <>
              부모의 고민은
              <span className="text-grape-700"> 바뀌고 있습니다.</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {QUESTIONS.map((q) => {
            const Icon = q.icon;
            return (
              <div
                key={q.text}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${q.color} p-6 ring-1 ring-grape-100/70 transition hover:-translate-y-0.5 clay-shadow-sm`}
              >
                <span
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-grape-100 ${q.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-[15px] font-semibold leading-snug text-ink-800">
                  “{q.text}”
                </p>
                <span className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/40 blur-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
