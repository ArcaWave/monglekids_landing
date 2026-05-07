import { ArrowRight, Check, ShieldCheck, Sparkles, LineChart, Clock } from "lucide-react";
import SectionHeader from "./SectionHeader";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "AI 시대 핵심 역량",
    body: "창의성 · 질문력 · 표현력을 일상에서.",
    accent: "text-grape-700 bg-grape-50",
  },
  {
    icon: ShieldCheck,
    title: "아이에게 맞춰지는 경험",
    body: "정해진 커리큘럼이 아닌, 아이만의 흐름.",
    accent: "text-rose-500 bg-rose-100",
  },
  {
    icon: LineChart,
    title: "성장을 보는 부모 리포트",
    body: "‘무엇을 했나’ 대신 ‘어떻게 자라나’를.",
    accent: "text-sky-500 bg-sky-100",
  },
  {
    icon: Clock,
    title: "의미 있는 디지털 시간",
    body: "보는 시간을, 만드는 시간으로.",
    accent: "text-mint-500 bg-mint-100",
  },
];

type Props = { onCta: () => void };

export default function ParentValue({ onCta }: Props) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            align="left"
            eyebrow="FOR PARENTS"
            title={
              <>
                부모에게 필요한 건{" "}
                <span className="text-grape-700">안심.</span>
              </>
            }
          />

          <div className="mt-7 rounded-3xl bg-gradient-to-br from-cream-100 via-white to-grape-50 p-6 ring-1 ring-grape-100/70 clay-shadow-sm">
            <p className="text-[14.5px] font-semibold leading-relaxed text-ink-700">
              “화면 시간이 ‘만드는 시간’으로 바뀌었어요.”
            </p>
            <p className="mt-3 text-[12.5px] font-semibold text-ink-400">
              — 7세 자녀를 둔 베타 부모
            </p>
          </div>

          <button
            onClick={onCta}
            className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-grape-700 px-5 py-3.5 text-[15px] font-semibold text-white transition hover:bg-grape-800 clay-shadow-sm"
          >
            우리 아이 베타 신청하기
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid grid-cols-1 gap-3 sm:gap-4">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <li
                  key={b.title}
                  className="group flex items-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-grape-100/70 transition hover:-translate-y-0.5 clay-shadow-sm"
                >
                  <span
                    className={`inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl ${b.accent} ring-1 ring-white`}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 flex-none text-grape-600" />
                      <h3 className="text-[16px] font-semibold text-ink-900">
                        {b.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">
                      {b.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
