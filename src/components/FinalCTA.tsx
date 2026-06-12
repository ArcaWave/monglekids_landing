import { ArrowRight, Sparkles } from "lucide-react";
import Cloud from "./Cloud";
import CloudScape from "./CloudScape";
import { useLang, withBreaks } from "../i18n/LanguageContext";
import { useScrollToSection } from "../lib/useScrollToSection";

export default function FinalCTA() {
  const { t } = useLang();
  const f = t.finalCta;
  const scrollTo = useScrollToSection();
  return (
    <section className="relative px-5 pb-20 md:pb-28">
      <div className="container-page">
        <div
          className="relative overflow-hidden rounded-[36px] p-10 pb-32 text-center clay-shadow md:p-16 md:pb-44"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #f7ead2 0%, #f4d8cb 50%, #dce9ec 100%)",
          }}
        >
          <div className="blob -left-10 -top-10 h-72 w-72 bg-sun-100/70" />
          <div className="blob -right-10 bottom-[-40px] h-80 w-80 bg-rose-200/70" />
          <div className="blob left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-peach-100/60" />

          {/* Paper-cut cloud wall along the bottom of the card */}
          <CloudScape
            className="absolute inset-x-0 bottom-0"
            frontFill="#fdfaf2"
          />

          <span
            className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-6 top-8 hidden w-[150px] sm:block"
            aria-hidden
          >
            <Cloud fill="#FFFFFF" highlight="#FFFDF7" className="block w-full" />
          </span>
          <span
            className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute -right-4 top-16 hidden w-[140px] sm:block"
            aria-hidden
          >
            <Cloud fill="rgba(250,228,222,0.92)" highlight="#FFF6F1" className="block w-full" />
          </span>

          <div className="pointer-events-none absolute inset-0">
            {[
              { left: "14%", top: "22%", size: 4 },
              { left: "78%", top: "20%", size: 5 },
              { left: "50%", top: "14%", size: 3 },
            ].map((s, i) => (
              <span
                key={i}
                className="animate-pulse-soft absolute rounded-full bg-white/80"
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            <span className="font-display inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {f.chip}
            </span>
            <h2 className="mt-5 text-balance text-[28px] font-bold leading-[1.25] tracking-tight text-ink-900 sm:text-[36px] md:text-[44px]">
              {withBreaks(f.titlePre)}
              <span className="text-grape-700">{f.titleHighlight}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-balance text-[15.5px] leading-relaxed text-ink-600">
              {f.body}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("beta")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-grape-700 px-7 py-4 text-[15px] font-semibold text-white transition hover:bg-grape-800 clay-shadow"
              >
                {f.cta}
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-[12.5px] text-ink-600">
                {f.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
