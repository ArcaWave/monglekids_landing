import { BarChart3, Heart } from "lucide-react";
import { useLang, withBreaks } from "../i18n/LanguageContext";

export default function HeroMock() {
  const { t, lang } = useLang();
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

      {/* Tablet frame — the real app intro plays inside */}
      <div className="relative rounded-[36px] bg-gradient-to-br from-white via-grape-50 to-rose-100 p-3 ring-1 ring-grape-100/80 clay-shadow">
        <div className="relative overflow-hidden rounded-[26px] ring-1 ring-grape-100/60">
          <video
            src="/media/hero-app.mp4"
            poster="/media/hero-app-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={
              lang === "ko"
                ? "몽글키즈 앱 실제 화면 — 프로필 선택부터 오늘의 놀이 시작까지"
                : "MongleKids app preview — from profile select to starting today's play"
            }
            className="block aspect-[2388/1668] w-full object-cover"
          />
          <span className="font-display absolute bottom-3 right-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-white backdrop-blur">
            {lang === "ko" ? "실제 앱 화면" : "Real app footage"}
          </span>
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
