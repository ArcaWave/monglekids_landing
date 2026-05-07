import { Brain, Wand2, Hand, BarChart3 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Cloud from "./Cloud";

const FEATURES = [
  {
    icon: Brain,
    title: "아이를 기억하는 AI",
    body: "관심사와 창작물을 기억해 다음 경험으로 이어줘요.",
    accent: "from-grape-300 to-rose-200",
    text: "text-grape-700",
    chip: "Personal Memory",
    soft: "from-grape-50",
  },
  {
    icon: Wand2,
    title: "상상력을 깨우는 창작 미션",
    body: "이야기, 캐릭터, 역할놀이로 직접 생각을 펼쳐요.",
    accent: "from-peach-200 to-sun-100",
    text: "text-peach-500",
    chip: "Creative Mission",
    soft: "from-peach-100",
  },
  {
    icon: Hand,
    title: "보는 시간이 아닌, 만드는 시간",
    body: "말하고, 고르고, 만들고, 설명하며 직접 참여해요.",
    accent: "from-mint-200 to-sky-100",
    text: "text-mint-500",
    chip: "Active Play",
    soft: "from-mint-100",
  },
  {
    icon: BarChart3,
    title: "부모를 위한 성장 리포트",
    body: "관심사 · 질문 · 몰입의 흐름을 한눈에 보여드려요.",
    accent: "from-sky-200 to-grape-200",
    text: "text-sky-500",
    chip: "Parent Report",
    soft: "from-sky-100",
  },
];

export default function Solution() {
  return (
    <section id="report" className="relative py-20 md:py-28">
      <span
        className="animate-drift cloud-shadow-sm pointer-events-none absolute right-4 top-12 hidden w-[120px] opacity-90 md:block"
        aria-hidden
      >
        <Cloud fill="#FFFFFF" highlight="#FBFAFF" className="block w-full" />
      </span>
      <span
        className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute -left-4 bottom-20 hidden w-[140px] opacity-80 md:block"
        aria-hidden
      >
        <Cloud fill="#DFEEFD" highlight="#F0F7FF" className="block w-full" />
      </span>

      <div className="container-page relative">
        <SectionHeader
          eyebrow="WHAT WE BUILT"
          title={
            <>
              아이만의{" "}
              <span className="text-grape-700">AI 창의 동반자.</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.title}
                className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br ${f.soft} via-white to-white p-7 ring-1 ring-grape-100/80 transition hover:-translate-y-0.5 clay-shadow`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.accent} ${f.text} clay-shadow-sm`}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <span className="font-display rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
                    {f.chip}
                  </span>
                </div>

                <h3 className="mt-5 text-[20px] font-semibold leading-snug text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  {f.body}
                </p>

                <span className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
