import { Sparkles, MessageCircle, Palette, Mic } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Cloud from "./Cloud";

const STEPS = [
  {
    n: "01",
    icon: Sparkles,
    title: "오늘의 상상 미션",
    body: "매일 아이만을 위한 작은 상상이 도착해요.",
    accent: "from-grape-300 to-rose-200",
    text: "text-grape-700",
  },
  {
    n: "02",
    icon: MessageCircle,
    title: "AI 친구와 대화",
    body: "정답 대신, 좋은 질문으로 생각을 넓혀요.",
    accent: "from-peach-200 to-sun-100",
    text: "text-peach-500",
  },
  {
    n: "03",
    icon: Palette,
    title: "직접 만들고 표현하기",
    body: "캐릭터 · 이야기 · 장면을 아이가 직접 그려요.",
    accent: "from-mint-200 to-sky-200",
    text: "text-mint-500",
  },
  {
    n: "04",
    icon: Mic,
    title: "다음 모험으로 이어지기",
    body: "AI가 표현을 기억하고, 다음 미션으로 이어줘요.",
    accent: "from-sky-200 to-grape-200",
    text: "text-sky-500",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #d6cdf1 0%, #e1cee2 55%, #f6d3d3 100%)",
      }}
    >
      {/* three calm drifting clouds */}
      <span
        className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-8 top-16 hidden w-[180px] opacity-90 sm:block"
        aria-hidden
      >
        <Cloud fill="rgba(255,255,255,0.92)" highlight="rgba(255,255,255,1)" className="block w-full" />
      </span>
      <span
        className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute right-2 top-28 hidden w-[150px] opacity-90 md:block"
        aria-hidden
      >
        <Cloud fill="rgba(255,231,220,0.95)" highlight="#FFF6EE" className="block w-full" />
      </span>
      <span
        className="animate-drift cloud-shadow-sm pointer-events-none absolute -right-8 bottom-24 hidden w-[180px] opacity-90 lg:block"
        aria-hidden
      >
        <Cloud fill="rgba(255,255,255,0.85)" highlight="rgba(255,255,255,1)" className="block w-full" />
      </span>

      {/* a few quiet stars */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { left: "12%", top: "20%", s: 4, d: 0 },
          { left: "78%", top: "16%", s: 5, d: 0.6 },
          { left: "50%", top: "10%", s: 3, d: 1.2 },
        ].map((t, i) => (
          <span
            key={i}
            className="animate-pulse-soft absolute rounded-full bg-white/80"
            style={{
              left: t.left,
              top: t.top,
              width: t.s,
              height: t.s,
              animationDelay: `${t.d}s`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative">
        <SectionHeader
          eyebrow="CHILD EXPERIENCE"
          title={
            <>
              시청자가 아닌,{" "}
              <span className="text-grape-700">창작자로.</span>
            </>
          }
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative">
                <article className="group relative h-full overflow-hidden rounded-3xl bg-white/85 p-6 ring-1 ring-white/60 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white clay-shadow-sm">
                  <div className="flex items-start justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} ${s.text} clay-shadow-sm`}
                    >
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <span className="font-display text-[12px] font-semibold tracking-[0.18em] text-ink-400">
                      STEP {s.n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[18px] font-semibold leading-snug text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">
                    {s.body}
                  </p>
                </article>

                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-white/70 lg:block"
                  >
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Mock interaction */}
        <div className="mt-14 grid grid-cols-1 items-center gap-8 rounded-[32px] bg-white/55 p-6 ring-1 ring-white/70 backdrop-blur md:grid-cols-12 md:p-8 clay-shadow-sm">
          <div className="md:col-span-5">
            <span className="font-display inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-white">
              <Sparkles className="h-3.5 w-3.5" /> 대화 예시
            </span>
            <h3 className="mt-3 text-balance text-[22px] font-semibold leading-[1.35] text-ink-900 sm:text-[26px]">
              정답 대신,
              <br />
              <span className="text-grape-700">좋은 질문을 던져요.</span>
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
              아이의 작은 아이디어를 한 단계 더 키워주는 대화.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="space-y-3 rounded-3xl bg-white p-5 ring-1 ring-grape-100 clay-shadow-sm sm:p-6">
              <ChatBubble who="ai" name="몽글이">
                오늘은 구름으로 만든 동물원을 상상해볼까?
              </ChatBubble>
              <ChatBubble who="child" name="우리 아이">
                나는 번개를 먹는 코끼리를 만들래!
              </ChatBubble>
              <ChatBubble who="ai" name="몽글이">
                멋진 상상이야. 화가 나면 어떤 소리를 낼까?
              </ChatBubble>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({
  who,
  name,
  children,
}: {
  who: "ai" | "child";
  name: string;
  children: React.ReactNode;
}) {
  const isAi = who === "ai";
  return (
    <div className={`flex items-start gap-2.5 ${isAi ? "" : "flex-row-reverse"}`}>
      <span
        className={[
          "relative inline-flex h-10 w-10 flex-none items-center justify-center cloud-shadow-sm",
          isAi ? "" : "rounded-2xl bg-gradient-to-br from-sun-100 to-peach-200 ring-2 ring-white",
        ].join(" ")}
        aria-hidden
      >
        {isAi ? (
          <Cloud
            fill="#FFFFFF"
            rim="#EBE4FF"
            highlight="#FBFAFF"
            face
            mood="happy"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <span className="text-base">🧒</span>
        )}
      </span>
      <div className={`flex max-w-[80%] flex-col ${isAi ? "items-start" : "items-end"}`}>
        <span className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
          {name}
        </span>
        <div
          className={[
            "rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ring-1",
            isAi
              ? "rounded-tl-md bg-grape-50 text-ink-800 ring-grape-100"
              : "rounded-tr-md bg-gradient-to-br from-peach-200 to-rose-200 text-ink-900 ring-rose-100",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
