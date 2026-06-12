import { Sparkles, Wand2, BarChart3, Heart } from "lucide-react";
import Cloud from "./Cloud";
import { useLang, withBreaks } from "../i18n/LanguageContext";

export default function HeroMock() {
  const { t } = useLang();
  const m = t.heroMock;
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="blob bg-grape-200 -left-10 -top-10 h-56 w-56" />
      <div className="blob bg-rose-200 -right-12 top-24 h-60 w-60" />
      <div className="blob bg-sky-100 -bottom-12 left-10 h-56 w-56" />

      {/* Real brand mascot peeking over the product card */}
      <img
        src="/brand/mascot.png"
        alt=""
        aria-hidden
        draggable={false}
        className="animate-float-slow pointer-events-none absolute -left-4 -top-12 z-10 hidden w-[104px] select-none sm:block"
      />

      <div className="relative rounded-[36px] bg-gradient-to-br from-white via-grape-50 to-rose-100 p-3 ring-1 ring-grape-100/80 clay-shadow">
        <div className="rounded-[28px] bg-gradient-to-b from-cream-50 to-white p-5 sm:p-6 ring-1 ring-grape-100/60">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="cloud-shadow-sm relative inline-flex h-10 w-10 items-center justify-center" aria-hidden>
                <Cloud fill="#F0DCCB" highlight="#FFFDF7" className="absolute inset-0 h-full w-full" />
                <Sparkles className="relative h-4 w-4 text-grape-700" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-grape-600">
                  {m.todaysMissionLabel}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink-900">{m.todaysMissionTitle}</p>
              </div>
            </div>
            <span className="font-display rounded-full bg-mint-100 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-mint-500">
              {m.live}
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="cloud-shadow-sm relative inline-flex h-10 w-10 flex-none items-center justify-center" aria-hidden>
              <img src="/brand/moongi.png" alt="" draggable={false} className="h-full w-full select-none object-contain" />
            </span>
            <div className="rounded-2xl rounded-tl-md bg-grape-50 px-3.5 py-2.5 text-[13px] leading-snug text-ink-800 ring-1 ring-grape-100">
              {withBreaks(m.aiBubble1)}
            </div>
          </div>

          <div className="mt-2.5 flex items-start justify-end gap-2.5">
            <div className="rounded-2xl rounded-tr-md bg-gradient-to-br from-peach-300 to-rose-200 px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-ink-800">
              {withBreaks(m.childBubble1)}
            </div>
            <span
              className="cloud-shadow-sm inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-sun-100 to-peach-200 text-base ring-2 ring-white"
              aria-hidden
            >
              🧒
            </span>
          </div>

          <div className="mt-2.5 flex items-start gap-2.5">
            <span className="cloud-shadow-sm relative inline-flex h-10 w-10 flex-none items-center justify-center" aria-hidden>
              <img src="/brand/moongi.png" alt="" draggable={false} className="h-full w-full select-none object-contain" />
            </span>
            <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13px] leading-snug text-ink-700 ring-1 ring-grape-100">
              {withBreaks(m.aiBubble2)}
            </div>
          </div>

          <div className="mt-5 relative overflow-hidden rounded-2xl bg-gradient-to-br from-grape-400 via-grape-500 to-rose-300 p-4 text-white clay-shadow-sm">
            <span className="pointer-events-none absolute -top-3 -right-3 w-16 opacity-60" aria-hidden>
              <Cloud fill="rgba(255,255,255,0.45)" className="block w-full" />
            </span>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-white/25 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                <Wand2 className="h-3 w-3" /> {m.missionChip}
              </span>
              <span className="tabular text-[10.5px] font-medium opacity-90">{m.missionStep}</span>
            </div>
            <p className="text-[15px] font-semibold leading-snug">
              {withBreaks(m.missionTitle)}
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-sun-300 to-peach-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -right-3 -top-6 w-[230px] rounded-2xl bg-white p-3.5 ring-1 ring-grape-100 clay-shadow sm:-right-10">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-grape-700">
            <BarChart3 className="h-3.5 w-3.5" /> {m.parentReport}
          </span>
          <span className="text-[10.5px] font-medium text-ink-400">{m.thisWeek}</span>
        </div>
        <p className="tabular text-[14px] font-semibold text-ink-900">{m.imaginationStat}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-ink-600">
          {withBreaks(m.imaginationDesc)}
        </p>
        <div className="mt-2.5 flex items-end gap-1">
          {[20, 32, 18, 44, 28, 56, 38].map((h, i) => (
            <span
              key={i}
              className="w-3 rounded-t-md bg-gradient-to-t from-grape-200 to-grape-400"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      <div className="animate-float-slower absolute -left-3 bottom-10 w-[210px] rounded-2xl bg-white p-3 ring-1 ring-grape-100 clay-shadow sm:-left-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
            <Heart className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-rose-500">
              {m.childMemory}
            </p>
            <p className="text-[12.5px] font-semibold text-ink-900">
              {m.memoryTitle}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-ink-600">
          {withBreaks(m.memoryDesc)}
        </p>
      </div>
    </div>
  );
}
