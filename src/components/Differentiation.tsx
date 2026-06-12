import { X, Check, Play, SkipForward } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

/**
 * Differentiation — not a comparison table, but two little worlds.
 *
 * Left: the gray, autoplaying world of typical learning apps — a muted
 * video-player mock and ✕ rows. Right: the warm clay world of MongleKids —
 * Moongi (talking animation) asks a question, ✓ rows glow. A tilted clay
 * VS badge sits between them. Show, don't tabulate.
 */

const LOCAL = {
  ko: {
    leftScene: { title: "오늘의 학습 영상", next: "다음 영상 자동재생" },
    leftMood: "아이는 조용히 봅니다.",
    rightBubble: "오늘은 뭘 만들어볼까?",
    rightMood: "아이는 신나게 대답합니다.",
    vs: "VS",
  },
  en: {
    leftScene: { title: "Today's lesson video", next: "Autoplaying next" },
    leftMood: "The child quietly watches.",
    rightBubble: "What shall we make today?",
    rightMood: "The child answers out loud.",
    vs: "VS",
  },
} as const;

export default function Differentiation() {
  const { t, lang } = useLang();
  const d = t.differentiation;
  const L = LOCAL[lang];

  return (
    <section className="relative bg-gradient-to-b from-cream-50 to-cream-100/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={d.eyebrow}
          title={
            <>
              {d.titlePre}
              <span className="text-grape-700">{d.titleHighlight}</span>
            </>
          }
        />

        <div className="relative mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-6">
          {/* ---- Left: the gray world ---- */}
          <article className="rounded-[28px] bg-[#efece5] p-6 ring-1 ring-[#dcd7cc] sm:p-7">
            <h3 className="flex items-center gap-2 text-[17px] font-semibold text-[#8a8478]">
              <X className="h-4.5 w-4.5 text-[#a8a193]" />
              {d.legacyHeader}
            </h3>

            {/* Muted autoplay video player */}
            <div className="mt-5 overflow-hidden rounded-2xl bg-[#e3dfd5] ring-1 ring-[#d3cec2]">
              <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-b from-[#d8d3c8] to-[#cfc9bc]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#bfb9ab]">
                  <Play className="ml-0.5 h-5 w-5 fill-[#8a8478] text-[#8a8478]" />
                </span>
                <span className="absolute left-3 top-3 rounded-md bg-[#bfb9ab]/60 px-2 py-0.5 text-[10.5px] font-medium text-[#6f695e]">
                  {L.leftScene.title}
                </span>
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-[#bfb9ab]/60 px-2 py-0.5 text-[10.5px] font-medium text-[#6f695e]">
                  <SkipForward className="h-3 w-3" /> {L.leftScene.next}
                </span>
                {/* dull progress bar */}
                <span className="absolute inset-x-3 bottom-1 h-1 rounded-full bg-[#bfb9ab]/50">
                  <span className="block h-full w-2/3 rounded-full bg-[#9a9385]" />
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-[12.5px] font-medium text-[#a8a193]">
              {L.leftMood}
            </p>

            <ul className="mt-5 space-y-2.5">
              {d.rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-start gap-2.5 rounded-2xl bg-[#e8e4da] px-4 py-3 text-[13.5px] leading-relaxed text-[#7d7669]"
                >
                  <X className="mt-0.5 h-4 w-4 flex-none text-[#a8a193]" />
                  {row.legacy}
                </li>
              ))}
            </ul>
          </article>

          {/* ---- VS badge ---- */}
          <div className="pointer-events-none absolute left-1/2 top-[calc(50%-12px)] z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="font-display flex h-14 w-14 rotate-[-8deg] items-center justify-center rounded-full bg-white text-[16px] font-bold text-grape-700 ring-4 ring-sun-100 clay-shadow">
              {L.vs}
            </span>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <span className="font-display flex h-12 w-12 rotate-[-8deg] items-center justify-center rounded-full bg-white text-[14px] font-bold text-grape-700 ring-4 ring-sun-100 clay-shadow">
              {L.vs}
            </span>
          </div>

          {/* ---- Right: the Mongle world ---- */}
          <article className="relative rounded-[28px] bg-gradient-to-b from-white via-cream-50 to-peach-100/60 p-6 ring-2 ring-sun-300/60 clay-shadow sm:p-7 md:-rotate-[0.5deg]">
            <h3 className="flex items-center gap-2 text-[17px] font-semibold text-ink-900">
              <Check className="h-4.5 w-4.5 text-grape-600" />
              {d.mongleHeader}
            </h3>

            {/* Moongi talks — the child talks back */}
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100/70 to-cream-50 ring-1 ring-grape-100/70">
              <div className="relative flex aspect-[16/9] items-end justify-center">
                <span className="absolute left-3 top-3 rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[12.5px] font-semibold text-ink-800 ring-1 ring-grape-100 clay-shadow-sm">
                  {L.rightBubble}
                </span>
                <img
                  src="/media/moong-talking.webp"
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="h-[72%] select-none object-contain"
                />
                {/* sparkles */}
                <span className="animate-pulse-soft absolute right-5 top-5 h-2 w-2 rounded-full bg-sun-300" />
                <span className="animate-pulse-soft absolute right-10 top-10 h-1.5 w-1.5 rounded-full bg-rose-300" style={{ animationDelay: "0.7s" }} />
              </div>
            </div>
            <p className="mt-3 text-center text-[12.5px] font-semibold text-grape-700">
              {L.rightMood}
            </p>

            <ul className="mt-5 space-y-2.5">
              {d.rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-[13.5px] font-medium leading-relaxed text-ink-800 ring-1 ring-grape-100/70 clay-shadow-sm"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-grape-600" />
                  {row.mongle}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
