import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

/**
 * Framework — the six abilities as one circulating system.
 *
 * Six soft 3D icons (Fluent Emoji, MIT) sit on a ring, joined edge-to-edge.
 * A gentle pulse travels around the circle: each ability lights up in turn
 * and passes the energy to the next — growth that loops, not a checklist.
 * No mascot in the middle; the ring itself is the story.
 */

/** Per-node icon + halo tint. Icons live in /public/icons (Fluent 3D). */
const NODES = [
  { src: "/icons/creativity.png", halo: "bg-rose-100" },
  { src: "/icons/interaction.png", halo: "bg-sky-100" },
  { src: "/icons/social.png", halo: "bg-sun-100" },
  { src: "/icons/emotion.png", halo: "bg-rose-100" },
  { src: "/icons/expression.png", halo: "bg-grape-100" },
  { src: "/icons/thinking.png", halo: "bg-sun-100" },
];

const CENTER = 50;
const RADIUS = 36; // % of the stage

const POS = Array.from({ length: 6 }, (_, i) => {
  const a = ((i * 60 - 90) * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(a),
    y: CENTER + RADIUS * Math.sin(a),
  };
});

export default function Framework() {
  const { t } = useLang();
  const f = t.framework;

  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(-1);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % 6), 1500);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="blob -left-24 top-32 h-72 w-72 bg-sun-100" />
      <div className="blob -right-24 bottom-16 h-72 w-72 bg-sky-100" />

      <div className="container-page relative">
        <SectionHeader
          eyebrow={f.eyebrow}
          title={
            <>
              {f.titlePre}
              <span className="text-grape-700">{f.titleHighlight}</span>
            </>
          }
        />

        {/* The ring */}
        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[540px] md:mt-14">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* Soft connecting ring */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#eccdbb"
              strokeWidth={1.2}
              vectorEffect="non-scaling-stroke"
              opacity={0.5}
            />
            {/* Edge currently carrying the pulse: active → next */}
            {active >= 0 &&
              (() => {
                const p = POS[active];
                const q = POS[(active + 1) % 6];
                return (
                  <line
                    x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                    stroke="#e3c264"
                    strokeWidth={2.5}
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="animate-flow"
                  />
                );
              })()}
          </svg>

          {NODES.map((n, i) => {
            const hot = i === active;
            const next = active >= 0 && i === (active + 1) % 6;
            const p = f.pillars[i];
            return (
              <div
                key={p.ko}
                className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
              >
                <span className="relative flex items-center justify-center">
                  {/* Soft halo behind the icon disc */}
                  <span
                    className={[
                      "absolute rounded-full blur-md transition-all duration-500",
                      n.halo,
                      hot ? "h-20 w-20 opacity-90 sm:h-24 sm:w-24" : "h-12 w-12 opacity-0",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "relative flex items-center justify-center rounded-full bg-white transition-all duration-500",
                      hot
                        ? "h-[72px] w-[72px] ring-4 ring-sun-300/70 clay-shadow sm:h-20 sm:w-20"
                        : next
                          ? "h-16 w-16 ring-2 ring-sun-100 clay-shadow-sm sm:h-[72px] sm:w-[72px]"
                          : "h-16 w-16 ring-2 ring-cream-100 clay-shadow-sm sm:h-[72px] sm:w-[72px]",
                    ].join(" ")}
                  >
                    <img
                      src={n.src}
                      alt=""
                      aria-hidden
                      draggable={false}
                      className={[
                        "select-none object-contain transition-transform duration-500",
                        hot ? "h-11 w-11 sm:h-12 sm:w-12" : "h-9 w-9 sm:h-10 sm:w-10",
                      ].join(" ")}
                    />
                  </span>
                </span>
                <span
                  className={[
                    "mt-2 rounded-full px-2.5 py-1 text-[12px] font-semibold transition-all duration-500 sm:text-[13px]",
                    hot
                      ? "bg-sun-100 text-ink-900 ring-1 ring-sun-300"
                      : "bg-white/85 text-ink-800 ring-1 ring-grape-100/70",
                  ].join(" ")}
                >
                  {p.ko}
                </span>
                <span className="font-display mt-1 hidden text-[9.5px] font-medium uppercase tracking-[0.14em] text-ink-400 sm:block">
                  {p.en}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
