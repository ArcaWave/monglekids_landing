import { Sparkles, Brain, MessageCircle, Compass, Bot, Heart } from "lucide-react";
import SectionHeader from "./SectionHeader";

const PILLARS = [
  {
    icon: Sparkles,
    label: "Creativity",
    ko: "창의성",
    accent: "from-grape-200 to-rose-100",
    text: "text-grape-700",
  },
  {
    icon: Brain,
    label: "Critical Thinking",
    ko: "비판적 사고",
    accent: "from-sky-200 to-grape-100",
    text: "text-sky-500",
  },
  {
    icon: MessageCircle,
    label: "Communication",
    ko: "표현 · 소통",
    accent: "from-rose-200 to-peach-100",
    text: "text-rose-500",
  },
  {
    icon: Compass,
    label: "Self-directed Learning",
    ko: "자기주도성",
    accent: "from-mint-200 to-sky-100",
    text: "text-mint-500",
  },
  {
    icon: Bot,
    label: "Human-AI Collaboration",
    ko: "AI 협력 능력",
    accent: "from-peach-200 to-sun-100",
    text: "text-peach-500",
  },
  {
    icon: Heart,
    label: "Social-emotional",
    ko: "감정 · 사회성 표현",
    accent: "from-sun-100 to-rose-100",
    text: "text-sun-500",
  },
];

export default function Framework() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="OUR FRAMEWORK"
          title={
            <>
              미래 역량을 중심으로{" "}
              <span className="text-grape-700">설계합니다.</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl bg-white p-5 ring-1 ring-grape-100/70 transition hover:-translate-y-0.5 clay-shadow-sm"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} ${p.text} clay-shadow-sm`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14.5px] font-bold leading-tight text-ink-900">
                    {p.ko}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                    {p.label}
                  </p>
                </div>
                <span className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-grape-100/60 blur-2xl transition group-hover:bg-grape-200/60" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
