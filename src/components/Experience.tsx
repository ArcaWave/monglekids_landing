import { Sparkles, MessageCircle, Palette, Mic } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Cloud from "./Cloud";
import { useLang, withBreaks } from "../i18n/LanguageContext";

const STEP_STYLES = [
  { icon: Sparkles, accent: "from-grape-300 to-rose-200", text: "text-grape-700" },
  { icon: MessageCircle, accent: "from-peach-200 to-sun-100", text: "text-peach-500" },
  { icon: Palette, accent: "from-mint-200 to-sky-200", text: "text-mint-500" },
  { icon: Mic, accent: "from-sky-200 to-grape-200", text: "text-sky-500" },
];

export default function Experience() {
  const { t } = useLang();
  const e = t.experience;
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #f0dfc8 0%, #f2d5c6 55%, #efe2d0 100%)",
      }}
    >
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

      <div className="pointer-events-none absolute inset-0">
        {[
          { left: "12%", top: "20%", s: 4, d: 0 },
          { left: "78%", top: "16%", s: 5, d: 0.6 },
          { left: "50%", top: "10%", s: 3, d: 1.2 },
        ].map((tw, i) => (
          <span
            key={i}
            className="animate-pulse-soft absolute rounded-full bg-white/80"
            style={{
              left: tw.left,
              top: tw.top,
              width: tw.s,
              height: tw.s,
              animationDelay: `${tw.d}s`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative">
        <SectionHeader
          eyebrow={e.eyebrow}
          title={
            <>
              {e.titlePre}
              <span className="text-grape-700">{e.titleHighlight}</span>
            </>
          }
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {e.steps.map((step, i) => {
            const s = STEP_STYLES[i];
            const Icon = s.icon;
            return (
              <div key={step.title} className="relative">
                <article className="group relative h-full overflow-hidden rounded-3xl bg-white/85 p-6 ring-1 ring-white/60 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white clay-shadow-sm">
                  <div className="flex items-start justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} ${s.text} clay-shadow-sm`}
                    >
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <span className="font-display text-[12px] font-semibold tracking-[0.18em] text-ink-400">
                      {e.stepLabel} {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[18px] font-semibold leading-snug text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">
                    {step.body}
                  </p>
                </article>

                {i < e.steps.length - 1 && (
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

        <div className="mt-14 grid grid-cols-1 items-center gap-8 rounded-[32px] bg-white/55 p-6 ring-1 ring-white/70 backdrop-blur md:grid-cols-12 md:p-8 clay-shadow-sm">
          <div className="md:col-span-5">
            <span className="font-display inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-white">
              <Sparkles className="h-3.5 w-3.5" /> {e.mock.chip}
            </span>
            <h3 className="mt-3 text-balance text-[22px] font-semibold leading-[1.35] text-ink-900 sm:text-[26px]">
              {withBreaks(e.mock.titlePre)}
              <span className="text-grape-700">{e.mock.titleHighlight}</span>
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
              {e.mock.body}
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="space-y-3 rounded-3xl bg-white p-5 ring-1 ring-grape-100 clay-shadow-sm sm:p-6">
              {e.mock.bubbles.map((b, i) => (
                <ChatBubble
                  key={i}
                  who={b.who as "ai" | "child"}
                  name={b.who === "ai" ? e.mock.aiName : e.mock.childName}
                >
                  {b.text}
                </ChatBubble>
              ))}
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
          <img
            src="/brand/moongi.png"
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain"
          />
        ) : (
          <span className="text-base">🧒</span>
        )}
      </span>
      <div className={`flex max-w-[80%] flex-col ${isAi ? "items-start" : "items-end"}`}>
        <span className="font-display mb-0.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-400">
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
