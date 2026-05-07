import { ArrowRight, BookOpen, MessageCircleQuestion, PaintbrushVertical, Compass, LineChart, Repeat } from "lucide-react";
import SectionHeader from "./SectionHeader";

const SHIFTS = [
  {
    fromIcon: BookOpen,
    toIcon: MessageCircleQuestion,
    from: "지식 암기",
    to: "질문하는 힘",
    body: "정답을 외우는 대신, 좋은 질문을 던지는 아이로.",
    accent: "from-grape-300 to-rose-200",
    text: "text-grape-700",
    soft: "from-grape-50 to-white",
  },
  {
    fromIcon: Repeat,
    toIcon: PaintbrushVertical,
    from: "콘텐츠 소비",
    to: "창작과 표현",
    body: "보는 시간을, 직접 만드는 시간으로.",
    accent: "from-peach-200 to-sun-100",
    text: "text-peach-500",
    soft: "from-peach-100 to-white",
  },
  {
    fromIcon: Compass,
    toIcon: LineChart,
    from: "일회성 학습",
    to: "아이별 성장 궤적",
    body: "한 번의 학습이 아닌, 아이만의 성장 흐름으로.",
    accent: "from-mint-200 to-sky-100",
    text: "text-mint-500",
    soft: "from-mint-100 to-white",
  },
];

export default function Shift() {
  return (
    <section className="relative bg-gradient-to-b from-cream-50 via-cream-100/60 to-cream-50 py-20 md:py-28">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="EDUCATION PARADIGM"
          title={
            <>
              ‘정답 찾기’에서{" "}
              <span className="text-grape-700">‘생각 만들기’</span>로.
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SHIFTS.map((s) => {
            const From = s.fromIcon;
            const To = s.toIcon;
            return (
              <article
                key={s.from}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${s.soft} p-6 ring-1 ring-grape-100/70 clay-shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink-400 ring-1 ring-grape-100">
                      <From className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-semibold text-ink-400">이전</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-ink-300" aria-hidden />
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} ${s.text} clay-shadow-sm`}
                    >
                      <To className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-semibold text-grape-700">미래</span>
                  </div>
                </div>

                <h3 className="mt-5 text-[18px] font-semibold leading-snug text-ink-900">
                  <span className="text-ink-400">{s.from}</span>
                  <span className="mx-1.5 text-ink-300">→</span>
                  <span className="text-grape-700">{s.to}</span>
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">
                  {s.body}
                </p>

                <span className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/40 blur-3xl" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
