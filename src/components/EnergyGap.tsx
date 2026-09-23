import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

/**
 * EnergyGap — one evening, parent vs. child energy.
 *
 * Two batteries say the state at a glance; the chart underneath shows
 * the whole evening: the space between the lines is the gap, it widens
 * at dinner time, and closes once the child falls asleep. Inside the
 * MongleKids moments the gap turns yellow and Moongi pops in.
 *
 * The SVG is drawn at the container's real pixel width (not a scaled
 * viewBox), so labels stay readable on phones.
 */

/* ---------------- data ---------------- */

const X0 = 16; // 4 PM
const X1 = 22; // 10 PM
const REST_T = 18.6; // where the intro stops: the widest gap

type Pts = [number, number][];

const PARENT_PTS: Pts = [
  [16, 0.62], [17, 0.46], [18, 0.3], [18.6, 0.22], [19.5, 0.25],
  [20.5, 0.22], [21.5, 0.3], [22, 0.31],
];
const CHILD_PTS: Pts = [
  [16, 0.9], [17, 0.86], [18, 0.88], [18.6, 0.9], [19.5, 0.83],
  [20.5, 0.66], [21.3, 0.34], [22, 0.18],
];

/** Monotone cubic interpolation (Fritsch–Carlson): smooth, no overshoot. */
function monotone(pts: Pts): (x: number) => number {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const n = pts.length;
  const d = xs.slice(0, -1).map((_, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  const m = new Array<number>(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = m[i + 1] = 0;
      continue;
    }
    const a = m[i] / d[i];
    const b = m[i + 1] / d[i];
    const s = a * a + b * b;
    if (s > 9) {
      const k = 3 / Math.sqrt(s);
      m[i] = k * a * d[i];
      m[i + 1] = k * b * d[i];
    }
  }
  return (x) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0;
    while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i];
    const t = (x - xs[i]) / h;
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      (2 * t3 - 3 * t2 + 1) * ys[i] +
      (t3 - 2 * t2 + t) * h * m[i] +
      (-2 * t3 + 3 * t2) * ys[i + 1] +
      (t3 - t2) * h * m[i + 1]
    );
  };
}

const parentAt = monotone(PARENT_PTS);
const childAt = monotone(CHILD_PTS);

const SAMPLES = Array.from({ length: 121 }, (_, i) => X0 + (i * (X1 - X0)) / 120);

/* ---------------- copy ---------------- */

type Activity = { from: number; emoji: string; ko: string; en: string };

const PARENT_DAY: Activity[] = [
  { from: 16, emoji: "💻", ko: "업무 마무리", en: "Wrapping up work" },
  { from: 17, emoji: "🚇", ko: "퇴근길", en: "Commute home" },
  { from: 18, emoji: "🍳", ko: "저녁 준비", en: "Making dinner" },
  { from: 19, emoji: "🍽️", ko: "저녁 먹고 설거지", en: "Dinner and dishes" },
  { from: 20, emoji: "🛁", ko: "씻기고 재울 준비", en: "Bath and bedtime" },
  { from: 21.3, emoji: "🛋️", ko: "드디어 쉬는 시간", en: "Finally, a break" },
];

const CHILD_DAY: Activity[] = [
  { from: 16, emoji: "⚽", ko: "하원, 신나요!", en: "Out of school, buzzing!" },
  { from: 17, emoji: "🍪", ko: "간식 먹고 또 놀기", en: "Snack, then more play" },
  { from: 18, emoji: "🙋", ko: "“엄마, 놀아줘!”", en: "“Play with me!”" },
  { from: 19.5, emoji: "✨", ko: "아직 쌩쌩해요", en: "Still wide awake" },
  { from: 20.3, emoji: "🌙", ko: "“한 번만 더!”", en: "“Just one more!”" },
  { from: 21.3, emoji: "😴", ko: "쿨쿨", en: "Fast asleep" },
];

const activityAt = (day: Activity[], h: number): Activity => {
  let cur = day[0];
  for (const a of day) if (h >= a.from) cur = a;
  return cur;
};

type Moment = {
  from: number;
  to: number;
  emoji: string;
  /** who Moongi is with during this moment */
  with: "child" | "parent";
  ko: { label: string; bubble: string; line: string };
  en: { label: string; bubble: string; line: string };
};

const MOMENTS: Moment[] = [
  {
    from: 18, to: 19, emoji: "🍳", with: "child",
    ko: { label: "저녁 준비할 때", bubble: "같이 놀자!", line: "뭉이가 아이와 놀아줘요" },
    en: { label: "While you cook", bubble: "Let's play!", line: "Moongi plays with your child" },
  },
  {
    from: 20, to: 21, emoji: "🌙", with: "child",
    ko: { label: "자기 전", bubble: "오늘 이야기 만들까?", line: "영상 대신 직접 만든 이야기로 마무리해요" },
    en: { label: "Before bed", bubble: "Make a story?", line: "The day ends with a story they made" },
  },
  {
    from: 21.3, to: 22, emoji: "💛", with: "parent",
    ko: { label: "아이가 잠든 뒤", bubble: "오늘의 리포트 💛", line: "오늘 아이가 한 말을 리포트로 읽어요" },
    en: { label: "After they sleep", bubble: "Today's report 💛", line: "Read what your child said today" },
  },
];

const COPY = {
  ko: {
    eyebrow: "저녁 6시",
    titlePre: "부모는 쉬고 싶고, ",
    titleHighlight: "아이는 더 놀고 싶어요.",
    description: "저녁 준비하다 결국 영상을 틀어준 날, 있으시죠? 그 시간을 뭉이가 맡을게요.",
    parent: "부모",
    child: "아이",
    parentLine: "부모 에너지",
    childLine: "아이 에너지",
    gap: "에너지 차이",
    parentState: ["방전 직전", "지쳐가요", "괜찮아요"],
    childState: ["쿨쿨", "졸려요", "아직 쌩쌩", "에너지 가득"],
    gapWide: "차이가 가장 크게 벌어지는 시간",
    gapGrowing: "차이가 점점 벌어져요",
    gapShrinking: "차이가 줄어들어요",
    gapClosed: "아이는 꿈나라, 차이 끝",
    hour: (h: number) => `${h - 12}시`,
    time: (hh: number, mm: number) => `오후 ${hh - 12}시${mm ? ` ${mm}분` : ""}`,
    play: "재생",
    pause: "일시 정지",
    replay: "처음부터 다시",
    slider: "시간 옮기기",
    chartAria:
      "오후 4시부터 10시까지 부모와 아이의 에너지 그래프. 저녁 준비 시간에 차이가 가장 크고, 아이가 잠들면 차이가 사라져요.",
  },
  en: {
    eyebrow: "6 PM",
    titlePre: "You're running on empty. ",
    titleHighlight: "They want to keep playing.",
    description: "Ever put on a video just to get dinner done? Let Moongi take that half hour.",
    parent: "Parent",
    child: "Child",
    parentLine: "Parent energy",
    childLine: "Child energy",
    gap: "Energy gap",
    parentState: ["Running on empty", "Getting tired", "Doing okay"],
    childState: ["Asleep", "Sleepy", "Still going", "Full of energy"],
    gapWide: "The gap is at its widest",
    gapGrowing: "The gap keeps growing",
    gapShrinking: "The gap is closing",
    gapClosed: "They're asleep. Gap closed.",
    hour: (h: number) => `${h - 12}PM`,
    time: (hh: number, mm: number) => `${hh - 12}:${String(mm).padStart(2, "0")} PM`,
    play: "Play",
    pause: "Pause",
    replay: "Replay",
    slider: "Move through the evening",
    chartAria:
      "Parent and child energy from 4 PM to 10 PM. The gap is widest while dinner is being made and closes once the child falls asleep.",
  },
} as const;

const PARENT_C = "#e39a8a";
const PARENT_DARK = "#c4705f";
const CHILD_C = "#6aa7b2";
const CHILD_DARK = "#43838f";

function parentState(e: number): number {
  return e < 0.3 ? 0 : e < 0.45 ? 1 : 2;
}
function childState(e: number): number {
  return e < 0.3 ? 0 : e < 0.5 ? 1 : e < 0.8 ? 2 : 3;
}

/* ---------------- component ---------------- */

export default function EnergyGap() {
  const { lang } = useLang();
  const c = COPY[lang];

  const [t, setT] = useState(REST_T);
  const [drawn, setDrawn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [W, setW] = useState(840);

  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const timerRef = useRef(0);

  // Chart width = real container width (so text isn't scaled down).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(300, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stop = () => {
    cancelAnimationFrame(rafRef.current);
    window.clearTimeout(timerRef.current);
    setPlaying(false);
  };

  /** Animate t from `from` to `to`. */
  const run = (from: number, to: number, ms: number, ease: boolean) => {
    cancelAnimationFrame(rafRef.current);
    setPlaying(true);
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const k = ease ? 1 - Math.pow(1 - p, 3) : p;
      setT(from + (to - from) * k);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else setPlaying(false);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // First view: lines draw in, then the evening plays up to the widest gap.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDrawn(false);
    setT(X0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setDrawn(true);
        timerRef.current = window.setTimeout(() => run(X0, REST_T, 2600, true), 1100);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrubTo = (h: number) => {
    stop();
    setDrawn(true);
    setT(Math.min(X1, Math.max(X0, Math.round(h * 20) / 20)));
  };

  const togglePlay = () => {
    if (playing) return stop();
    const from = t >= X1 - 0.01 ? X0 : t;
    run(from, X1, (X1 - from) * 1500, false);
  };

  /* ----- values at "now" ----- */
  const pE = parentAt(t);
  const cE = childAt(t);
  const gap = cE - pE;
  const trend = childAt(Math.min(X1, t + 0.1)) - parentAt(Math.min(X1, t + 0.1)) - gap;
  const moment = MOMENTS.find((m) => t >= m.from && t <= m.to) ?? null;
  const pa = activityAt(PARENT_DAY, t);
  const ca = activityAt(CHILD_DAY, t);

  const status = moment
    ? `${moment.emoji} ${moment[lang].label} · ${moment[lang].line}`
    : gap < 0.05
      ? c.gapClosed
      : gap >= 0.55
        ? c.gapWide
        : trend >= 0
          ? c.gapGrowing
          : c.gapShrinking;

  /* ----- geometry (real px) ----- */
  const narrow = W < 560;
  const H = narrow ? 300 : 340;
  const PAD_L = 14;
  const PAD_R = 14;
  const TOP = 42;
  const BOTTOM = H - 76;
  const xOf = (h: number) => PAD_L + ((h - X0) / (X1 - X0)) * (W - PAD_L - PAD_R);
  const yOf = (e: number) => TOP + (1 - e) * (BOTTOM - TOP);

  const paths = useMemo(() => {
    const line = (f: (x: number) => number) =>
      SAMPLES.map((h, i) => `${i ? "L" : "M"}${xOf(h).toFixed(1)},${yOf(f(h)).toFixed(1)}`).join("");
    // gap area: child on top going right, parent coming back, until they cross
    const until = SAMPLES.filter((h) => childAt(h) - parentAt(h) > 0);
    const area =
      until.map((h, i) => `${i ? "L" : "M"}${xOf(h).toFixed(1)},${yOf(childAt(h)).toFixed(1)}`).join("") +
      [...until].reverse().map((h) => `L${xOf(h).toFixed(1)},${yOf(parentAt(h)).toFixed(1)}`).join("") +
      "Z";
    return { parent: line(parentAt), child: line(childAt), area };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [W, H]);

  const nowX = xOf(t);
  const pY = yOf(pE);
  const cY = yOf(cE);

  const hh = Math.floor(t);
  const mm = Math.round(((t - hh) * 60) / 5) * 5;
  const timeText = mm === 60 ? c.time(hh + 1, 0) : c.time(hh, mm);
  const timeW = lang === "ko" ? 22 + timeText.length * 11 : 20 + timeText.length * 8;
  const timeX = Math.min(Math.max(nowX, PAD_L + timeW / 2), W - PAD_R - timeW / 2);

  // gap label sits in the gap early in the evening, clear of Moongi at rest
  const labelH = 17.1;
  const labelY = (yOf(childAt(labelH)) + yOf(parentAt(labelH))) / 2;

  // Moongi + bubble
  const mSize = narrow ? 40 : 48;
  const mX = Math.min(Math.max(nowX, PAD_L + mSize / 2), W - PAD_R - mSize / 2);
  const mY = moment?.with === "parent" ? pY - mSize - 6 : (cY + pY) / 2 - mSize / 2;
  const bubble = moment ? moment[lang].bubble : "";
  const bubbleW = lang === "ko" ? 24 + bubble.length * 12 : 22 + bubble.length * 7.4;
  const bubbleRight = mX + mSize / 2 + 6 + bubbleW <= W - PAD_R;
  const bubbleX = bubbleRight ? mX + mSize / 2 + 6 : mX - mSize / 2 - 6 - bubbleW;

  const pointerTo = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    scrubTo(X0 + ((e.clientX - rect.left - PAD_L) / (rect.width - PAD_L - PAD_R)) * (X1 - X0));
  };

  const sliderPct = ((t - X0) / (X1 - X0)) * 100;

  return (
    <section ref={sectionRef} id="why" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titlePre}
              <span className="text-grape-700">{c.titleHighlight}</span>
            </>
          }
          description={c.description}
        />

        <div className="mx-auto mt-12 max-w-5xl rounded-[32px] bg-white p-4 ring-1 ring-grape-100/70 clay-shadow sm:p-6">
          {/* Two batteries: the state right now */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Person
              label={c.parent}
              state={c.parentState[parentState(pE)]}
              level={pE}
              color={PARENT_C}
              dark={PARENT_DARK}
              tint="bg-rose-100/60"
              activity={pa}
              lang={lang}
            />
            <Person
              label={c.child}
              state={c.childState[childState(cE)]}
              level={cE}
              color={CHILD_C}
              dark={CHILD_DARK}
              tint="bg-sky-100/70"
              activity={ca}
              lang={lang}
            />
          </div>

          <p
            aria-live="polite"
            className={[
              "mt-3 rounded-2xl px-4 py-2.5 text-center text-[13.5px] font-semibold transition-colors",
              moment
                ? "bg-sun-100 text-ink-900 ring-1 ring-sun-300"
                : "bg-cream-100/80 text-ink-700 ring-1 ring-grape-100/70",
            ].join(" ")}
          >
            {status}
          </p>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[12.5px] font-semibold text-ink-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-[3px] w-5 rounded-full" style={{ background: CHILD_C }} /> {c.childLine}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-[3px] w-5 rounded-full" style={{ background: PARENT_C }} /> {c.parentLine}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-[4px] bg-[#f7d9c9]" /> {c.gap}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <img src="/brand/moongi.png" alt="" aria-hidden className="h-4 w-4 object-contain" /> {lang === "ko" ? "몽글키즈 시간" : "MongleKids time"}
            </span>
          </div>

          {/* Chart */}
          <div ref={wrapRef} className="mt-2">
            <svg
              width={W}
              height={H}
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label={c.chartAria}
              className="block cursor-grab select-none active:cursor-grabbing"
              style={{ touchAction: "pan-y", maxWidth: "100%" }}
              onPointerDown={pointerTo}
              onPointerMove={(e) => e.buttons === 1 && pointerTo(e)}
            >
              <defs>
                <linearGradient id="eg-bg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fdf7ec" />
                  <stop offset="100%" stopColor="#eef0f6" />
                </linearGradient>
                <clipPath id="eg-moments">
                  {MOMENTS.map((m) => (
                    <rect key={m.from} x={xOf(m.from)} y={0} width={xOf(m.to) - xOf(m.from)} height={H} />
                  ))}
                </clipPath>
              </defs>

              {/* plot background: afternoon → night */}
              <rect x={PAD_L} y={TOP - 14} width={W - PAD_L - PAD_R} height={BOTTOM - TOP + 28} rx={18} fill="url(#eg-bg)" />
              <text x={PAD_L + 12} y={TOP + 4} fontSize={15} aria-hidden>☀️</text>
              <text x={W - PAD_R - 12} y={TOP + 4} fontSize={15} textAnchor="end" aria-hidden>🌙</text>

              {/* the gap, and the MongleKids moments inside it */}
              <g className="transition-opacity duration-700" style={{ transitionDelay: drawn ? "600ms" : "0ms" }} opacity={drawn ? 1 : 0}>
                <path d={paths.area} fill="#f7d9c9" opacity={0.75} />
                <path d={paths.area} fill="#f6df95" opacity={0.85} clipPath="url(#eg-moments)" />
                <g transform={`translate(${xOf(labelH)},${labelY})`}>
                  <rect x={-44} y={-12} width={88} height={24} rx={12} fill="#fff" stroke="#f0cdbb" />
                  <text y={4.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#8e6a55">
                    ↕ {c.gap}
                  </text>
                </g>
              </g>

              {/* the two lines */}
              {[
                { d: paths.child, color: CHILD_C },
                { d: paths.parent, color: PARENT_C },
              ].map((l) => (
                <path
                  key={l.color}
                  d={l.d}
                  fill="none"
                  stroke={l.color}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={drawn ? 0 : 1}
                  style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
                />
              ))}

              {/* now */}
              <line x1={nowX} y1={TOP - 14} x2={nowX} y2={BOTTOM + 14} stroke="#b0a18e" strokeWidth={1.5} strokeDasharray="3 5" />
              <g transform={`translate(${timeX},${TOP - 26})`}>
                <rect x={-timeW / 2} y={-13} width={timeW} height={24} rx={12} fill="#54473a" />
                <text y={4} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
                  {timeText}
                </text>
              </g>
              <circle cx={nowX} cy={cY} r={7} fill={CHILD_C} stroke="#fff" strokeWidth={3} />
              <circle cx={nowX} cy={pY} r={7} fill={PARENT_C} stroke="#fff" strokeWidth={3} />

              {/* Moongi shows up in the MongleKids moments */}
              {moment && (
                <g>
                  <image href="/brand/moongi.png" x={mX - mSize / 2} y={mY} width={mSize} height={mSize} />
                  <g transform={`translate(${bubbleX},${mY + 4})`}>
                    <rect width={bubbleW} height={26} rx={13} fill="#fff" stroke="#f2dd9b" strokeWidth={1.5} />
                    <text x={bubbleW / 2} y={17.5} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="#54473a">
                      {bubble}
                    </text>
                  </g>
                </g>
              )}

              {/* hour axis */}
              {[16, 17, 18, 19, 20, 21, 22].map((h, i, all) => (
                <text
                  key={h}
                  x={xOf(h)}
                  y={BOTTOM + 34}
                  textAnchor={i === 0 ? "start" : i === all.length - 1 ? "end" : "middle"}
                  fontSize={12}
                  fontWeight={600}
                  fill="#8e7e6d"
                >
                  {c.hour(h)}
                </text>
              ))}

              {/* MongleKids moments along the bottom */}
              {MOMENTS.map((m) => {
                const x = xOf(m.from);
                const w = xOf(m.to) - x;
                const on = moment === m;
                const showText = w >= 96;
                return (
                  <g
                    key={m.from}
                    transform={`translate(${x},${BOTTOM + 46})`}
                    className="cursor-pointer"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      scrubTo((m.from + m.to) / 2);
                    }}
                  >
                    <rect width={w} height={26} rx={13} fill={on ? "#f6df95" : "#fbf1d4"} stroke={on ? "#e3c264" : "none"} />
                    <text x={w / 2} y={17.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#54473a">
                      {showText ? `${m.emoji} ${m[lang].label}` : m.emoji}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center gap-3 px-1">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? c.pause : t >= X1 - 0.01 ? c.replay : c.play}
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-grape-700 text-white transition hover:bg-grape-800 clay-shadow-sm"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : t >= X1 - 0.01 ? (
                <RotateCcw className="h-4 w-4" />
              ) : (
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              )}
            </button>
            <input
              type="range"
              min={X0}
              max={X1}
              step={0.05}
              value={t}
              aria-label={c.slider}
              aria-valuetext={timeText}
              onChange={(e) => scrubTo(Number(e.target.value))}
              className="mongle-range w-full"
              style={{
                background: `linear-gradient(to right, #e3c264 0%, #e3c264 ${sliderPct}%, #f0e0c4 ${sliderPct}%, #f0e0c4 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Person({
  label,
  state,
  level,
  color,
  dark,
  tint,
  activity,
  lang,
}: {
  label: string;
  state: string;
  level: number;
  color: string;
  dark: string;
  tint: string;
  activity: Activity;
  lang: "ko" | "en";
}) {
  const pct = Math.round(Math.max(0.04, Math.min(1, level)) * 100);
  return (
    <div className={`flex items-center gap-3 rounded-2xl p-3.5 ${tint}`}>
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white text-[24px] ring-1 ring-white clay-shadow-sm" aria-hidden>
        {activity.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[14px] font-bold text-ink-900">{label}</span>
          <span className="text-[12.5px] font-bold" style={{ color: dark }}>
            {state}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1" aria-hidden>
          <div className="h-[18px] flex-1 rounded-[7px] bg-white p-[3px] ring-1 ring-black/5">
            <div className="h-full rounded-[4px] transition-[width] duration-150" style={{ width: `${pct}%`, background: color }} />
          </div>
          <div className="h-2 w-1 rounded-r-sm bg-white ring-1 ring-black/5" />
        </div>
        <p className="mt-1.5 truncate text-[13px] text-ink-600">{lang === "ko" ? activity.ko : activity.en}</p>
      </div>
    </div>
  );
}
