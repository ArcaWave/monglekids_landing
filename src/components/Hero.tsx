import { ArrowRight, Sparkles, Play } from "lucide-react";
import HeroMock from "./HeroMock";
import Cloud from "./Cloud";

type Props = {
  onPrimary: () => void;
  onSecondary: () => void;
};

export default function Hero({ onPrimary, onSecondary }: Props) {
  return (
    <section id="top" className="relative overflow-hidden pt-12 md:pt-20">
      {/* soft pastel ambient blobs (lighter, calmer) */}
      <div className="blob -left-32 top-24 h-[420px] w-[420px] bg-grape-200" />
      <div className="blob right-[-120px] top-[-60px] h-[380px] w-[380px] bg-rose-200" />

      {/* two drifting clay clouds — calmer than before */}
      <span
        className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-6 top-28 hidden w-[140px] sm:block"
        aria-hidden
      >
        <Cloud fill="#FFFFFF" highlight="#FBFAFF" className="block w-full" />
      </span>
      <span
        className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute right-8 top-10 hidden w-[110px] md:block"
        aria-hidden
      >
        <Cloud fill="#FFE7DC" highlight="#FFF6EE" className="block w-full" />
      </span>

      <div className="container-page relative z-10 grid grid-cols-1 items-center gap-14 pb-24 md:gap-12 md:pb-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="font-display inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-grape-700 ring-1 ring-grape-100 backdrop-blur clay-shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            5–9세 아이를 위한 AI 창의 성장 베타
          </div>

          <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.22] tracking-tight text-ink-900 sm:text-[40px] md:text-[50px]">
            AI 시대, 아이에게 필요한 건
            <br className="hidden sm:inline" />{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-grape-700">더 많은 콘텐츠</span>
              <span
                aria-hidden
                className="absolute bottom-1 left-0 z-0 h-2.5 w-full rounded-full bg-sun-100/80"
              />
            </span>
            가 아니라
            <br />
            스스로 상상하고 만드는 힘입니다.
          </h1>

          <p className="mt-5 max-w-md text-balance text-[16px] leading-[1.7] text-ink-600 md:text-[17px]">
            아이가 AI와 함께 상상하고 만드는 창의 성장 동반자.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onPrimary}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-grape-700 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-grape-800 clay-shadow"
            >
              베타 신청하기
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onSecondary}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white/80 px-5 py-3.5 text-[15px] font-semibold text-ink-800 ring-1 ring-grape-100 backdrop-blur transition hover:bg-white clay-shadow-sm"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-grape-100 text-grape-700">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              아이 경험 미리보기
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-600">
            <div className="flex -space-x-2">
              {[
                "from-grape-300 to-rose-200",
                "from-peach-200 to-sun-100",
                "from-mint-200 to-sky-200",
                "from-rose-200 to-grape-200",
              ].map((g, i) => (
                <span
                  key={i}
                  className={`inline-block h-7 w-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-cream-50`}
                />
              ))}
            </div>
            <p>
              <span className="tabular font-semibold text-ink-800">+1,200명</span>
              의 부모가 먼저 베타를 기다리고 있어요
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <HeroMock />
        </div>
      </div>
    </section>
  );
}
