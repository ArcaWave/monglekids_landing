import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Pause } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

/**
 * EnergyGap — "the evening, as a storybook scene."
 *
 * Instead of a dashboard chart, the evening plays out inside a sky that
 * actually sets: late-afternoon powder blue melts into golden hour, dusk,
 * and a starry night as time advances. Two thick clay curves draw
 * themselves as the scrubber passes, the sun sinks, the moon rises, and
 * Moongi walks along the timeline as the drag handle. One short cinematic
 * sweep (~3.5 s) plays on first view, then the user explores.
 */

/* ---------------- geometry ---------------- */

const X0 = 16; // 4 PM
const X1 = 22; // 10 PM
const REST_T = 18.5;
const W = 840;
const H = 340;
const PAD_L = 16;
const PAD_R = 16;
const PAD_B = 46;

const SKY = { x: 8, y: 8, w: W - 16, h: H - PAD_B - 16, rx: 24 };
const HORIZON = SKY.y + SKY.h;

const xOf = (h: number) => PAD_L + ((h - X0) / (X1 - X0)) * (W - PAD_L - PAD_R);
const yOf = (e: number) => SKY.y + 26 + (1 - e) * (SKY.h - 48);

const PARENT_PTS: [number, number][] = [
  [16, 0.55], [17, 0.42], [18, 0.27], [18.8, 0.33], [19.5, 0.29],
  [20, 0.23], [21, 0.2], [22, 0.13],
];
const CHILD_PTS: [number, number][] = [
  [16, 0.92], [17, 0.86], [18, 0.8], [19, 0.84], [20, 0.85],
  [21, 0.68], [22, 0.36],
];

function energyAt(pts: [number, number][], h: number): number {
  if (h <= pts[0][0]) return pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    if (h >= x1 && h <= x2) {
      const r = (h - x1) / (x2 - x1);
      const s = r * r * (3 - 2 * r);
      return y1 + (y2 - y1) * s;
    }
  }
  return pts[pts.length - 1][1];
}

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)},${c2x.toFixed(1)},${c2y.toFixed(1)},${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

const toPx = (pts: [number, number][]): [number, number][] =>
  pts.map(([h, e]) => [xOf(h), yOf(e)]);

/* ---------------- sky ---------------- */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lerpColor(a: string, b: string, p: number): string {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  return `rgb(${Math.round(lerp(ra[0], rb[0], p))},${Math.round(lerp(ra[1], rb[1], p))},${Math.round(lerp(ra[2], rb[2], p))})`;
}

/** [hour, skyTop, skyBottom] — afternoon → golden hour → dusk → night */
const SKY_KEYS: [number, string, string][] = [
  [16, "#dff0f4", "#fdf4e4"],
  [18, "#fae3c6", "#fbd9c9"],
  [19.5, "#cfd5e3", "#f3d8cd"],
  [22, "#9db1c9", "#dcc9c5"],
];

function skyAt(t: number): { top: string; bottom: string } {
  for (let i = 0; i < SKY_KEYS.length - 1; i++) {
    const [h1, t1, b1] = SKY_KEYS[i];
    const [h2, t2, b2] = SKY_KEYS[i + 1];
    if (t >= h1 && t <= h2) {
      const p = (t - h1) / (h2 - h1);
      return { top: lerpColor(t1, t2, p), bottom: lerpColor(b1, b2, p) };
    }
  }
  const last = SKY_KEYS[SKY_KEYS.length - 1];
  return { top: last[1], bottom: last[2] };
}

const STARS: { x: number; y: number; s: number; d: number }[] = [
  { x: xOf(16.9), y: 56, s: 2.4, d: 0 },
  { x: xOf(17.9), y: 40, s: 1.8, d: 0.5 },
  { x: xOf(18.8), y: 64, s: 2.2, d: 1.1 },
  { x: xOf(19.7), y: 38, s: 2.8, d: 0.3 },
  { x: xOf(20.4), y: 72, s: 1.8, d: 0.8 },
  { x: xOf(21), y: 46, s: 2.4, d: 1.4 },
  { x: xOf(21.6), y: 60, s: 2, d: 0.2 },
];

const sparkle = (cx: number, cy: number, s: number) =>
  `M${cx},${cy - s} Q${cx + s * 0.22},${cy - s * 0.22} ${cx + s},${cy} Q${cx + s * 0.22},${cy + s * 0.22} ${cx},${cy + s} Q${cx - s * 0.22},${cy + s * 0.22} ${cx - s},${cy} Q${cx - s * 0.22},${cy - s * 0.22} ${cx},${cy - s} Z`;

/* ---------------- copy ---------------- */

type Activity = { from: number; emoji: string; ko: string; en: string };

const PARENT_DAY: Activity[] = [
  { from: 16, emoji: "💻", ko: "업무 마무리", en: "Wrapping up work" },
  { from: 17, emoji: "🚇", ko: "퇴근길 — 이미 방전", en: "Commute home — already drained" },
  { from: 18, emoji: "🍳", ko: "저녁 준비 — 두 번째 출근", en: "Dinner prep — the second shift" },
  { from: 19, emoji: "🍽️", ko: "저녁 식사 · 설거지", en: "Dinner & dishes" },
  { from: 20, emoji: "🛁", ko: "재우기 준비", en: "Bedtime routine" },
  { from: 21, emoji: "🛋️", ko: "드디어 나의 시간…", en: "Finally, me-time…" },
];

const CHILD_DAY: Activity[] = [
  { from: 16, emoji: "⚽", ko: "하원 — 에너지 최고조!", en: "School's out — peak energy!" },
  { from: 17, emoji: "🍪", ko: "간식 먹고 또 놀 준비", en: "Snack, then ready for more" },
  { from: 18, emoji: "🙋", ko: "“엄마, 놀아줘!”", en: "“Mom, play with me!”" },
  { from: 19, emoji: "✨", ko: "아직 쌩쌩해요", en: "Still wide awake" },
  { from: 20, emoji: "🌙", ko: "“한 번만 더!”", en: "“Just one more!”" },
  { from: 21.3, emoji: "😴", ko: "꿈나라로", en: "Off to dreamland" },
];

const activityAt = (day: Activity[], h: number): Activity => {
  let cur = day[0];
  for (const a of day) if (h >= a.from) cur = a;
  return cur;
};

type Win = {
  from: number;
  to: number;
  emoji: string;
  titleKo: string;
  titleEn: string;
  timeKo: string;
  timeEn: string;
  bodyKo: string;
  bodyEn: string;
};

const WINDOWS: Win[] = [
  {
    from: 18, to: 19, emoji: "⏰",
    titleKo: "저녁 준비 시간", titleEn: "Dinner-prep window",
    timeKo: "오후 6–7시", timeEn: "6–7 PM",
    bodyKo: "요리하고 설거지하는 사이 “놀아줘”가 들려오는 시간. 아이는 뭉이와 오늘의 놀이를 시작해요.",
    bodyEn: "Cooking with one hand, hearing “play with me!” — that's when Moongi starts today's play.",
  },
  {
    from: 20, to: 21, emoji: "🌙",
    titleKo: "자기 전 창작 시간", titleEn: "Before-bed creation",
    timeKo: "오후 8–9시", timeEn: "8–9 PM",
    bodyKo: "하루의 마지막 고비. 영상 대신, 아이가 직접 만든 이야기로 차분하게 하루를 정리해요.",
    bodyEn: "The day's last stretch. Instead of a video, your child winds down with a story they made.",
  },
  {
    from: 21, to: 21.8, emoji: "💛",
    titleKo: "하루 회고 시간", titleEn: "Day-recap moment",
    timeKo: "오후 9시 무렵", timeEn: "around 9 PM",
    bodyKo: "아이가 잠든 뒤, 오늘 아이가 무엇을 만들고 어떤 말을 했는지 리포트로 확인해요.",
    bodyEn: "Once they're asleep, see what they made and said today in your parent report.",
  },
];

const COPY = {
  ko: {
    eyebrow: "THE EVENING GAP",
    titlePre: "부모는 쉬고 싶고, ",
    titleHighlight: "아이는 더 놀고 싶습니다.",
    description:
      "퇴근 후 저녁은 하루 중 에너지 격차가 가장 큰 시간이에요. 결국 영상을 틀어주고 마음 한켠이 불편했다면 — 그 30분을 바꿔드릴게요.",
    parentLabel: "부모",
    childLabel: "아이",
    insight: "부모에게는 죄책감 없는 30분, 아이에게는 의미 있는 몰입.",
    sliderAria: "저녁 시간 이동",
    replayAria: "다시 재생",
    pauseAria: "일시 정지",
    am: "오전",
    pm: "오후",
  },
  en: {
    eyebrow: "THE EVENING GAP",
    titlePre: "Parents are running on empty. ",
    titleHighlight: "Kids are still full of play.",
    description:
      "After-work evenings hold the day's biggest energy gap. If you've ever handed over a screen and felt that little pang of guilt — this half hour can be different.",
    parentLabel: "Parent",
    childLabel: "Child",
    insight: "Thirty guilt-free minutes for you. Real, meaningful focus for them.",
    sliderAria: "Scrub through the evening",
    replayAria: "Replay",
    pauseAria: "Pause",
    am: "AM",
    pm: "PM",
  },
} as const;

function formatTime(
  h: number,
  lang: "ko" | "en",
  c: { am: string; pm: string },
): string {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const isPm = hh >= 12;
  const h12 = hh > 12 ? hh - 12 : hh;
  return lang === "ko"
    ? `${isPm ? c.pm : c.am} ${h12}시${mm > 0 ? ` ${mm}분` : ""}`
    : `${h12}:${String(mm).padStart(2, "0")} ${isPm ? c.pm : c.am}`;
}

/* ---------------- component ---------------- */

export default function EnergyGap() {
  const { lang } = useLang();
  const c = COPY[lang];

  const [t, setT] = useState(X0);
  const [sweeping, setSweeping] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const playedRef = useRef(false);

  const cancelSweep = () => {
    cancelAnimationFrame(rafRef.current);
    setSweeping(false);
  };

  const sweep = () => {
    cancelAnimationFrame(rafRef.current);
    setSweeping(true);
    const dur = 3500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      setT(X0 + (REST_T - X0) * ease);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setSweeping(false);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || playedRef.current) return;
        playedRef.current = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setT(REST_T);
        } else {
          sweep();
        }
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrubTo = (h: number) => {
    cancelSweep();
    setT(Math.min(X1, Math.max(X0, Math.round(h * 20) / 20)));
  };

  const parentE = energyAt(PARENT_PTS, t);
  const childE = energyAt(CHILD_PTS, t);
  const gap = childE - parentE;
  const activeWin = WINDOWS.find((w) => t >= w.from && t <= w.to) ?? null;

  const parentPath = useMemo(() => smoothPath(toPx(PARENT_PTS)), []);
  const childPath = useMemo(() => smoothPath(toPx(CHILD_PTS)), []);

  const pa = activityAt(PARENT_DAY, t);
  const ca = activityAt(CHILD_DAY, t);
  const scrubX = xOf(t);

  const sky = skyAt(t);
  const night = clamp01((t - 19.3) / 1.6); // star/moon strength
  const sunP = clamp01((t - 16) / 3.8); // sun sinking progress
  const sunX = lerp(xOf(16.7), xOf(19.6), sunP);
  const sunY = lerp(SKY.y + 48, HORIZON + 34, sunP);
  const moonP = clamp01((t - 19.2) / 1.9);
  const moonX = lerp(xOf(20), xOf(21.1), moonP);
  const moonY = lerp(HORIZON + 28, SKY.y + 52, moonP);

  const sliderPct = ((t - X0) / (X1 - X0)) * 100;
  const axisHours = [16, 17, 18, 19, 20, 21, 22];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28">
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

        <div className="mx-auto mt-12 max-w-5xl">
          {/* Scene card */}
          <div className="relative rounded-[32px] bg-white p-3 ring-1 ring-grape-100/70 clay-shadow sm:p-4">
            {/* Replay — floats over the sky */}
            <button
              type="button"
              onClick={() => (sweeping ? cancelSweep() : sweep())}
              aria-label={sweeping ? c.pauseAria : c.replayAria}
              className="absolute right-6 top-6 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink-700 ring-1 ring-white backdrop-blur transition hover:bg-white clay-shadow-sm"
            >
              {sweeping ? <Pause className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
            </button>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="block w-full cursor-grab touch-none select-none active:cursor-grabbing"
              onPointerDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                scrubTo(X0 + ((e.clientX - rect.left) / rect.width) * (X1 - X0));
              }}
              onPointerMove={(e) => {
                if (e.buttons !== 1) return;
                const rect = e.currentTarget.getBoundingClientRect();
                scrubTo(X0 + ((e.clientX - rect.left) / rect.width) * (X1 - X0));
              }}
            >
              <defs>
                <linearGradient id="eg-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sky.top} />
                  <stop offset="100%" stopColor={sky.bottom} />
                </linearGradient>
                <clipPath id="eg-sky-clip">
                  <rect x={SKY.x} y={SKY.y} width={SKY.w} height={SKY.h} rx={SKY.rx} />
                </clipPath>
                <clipPath id="eg-past">
                  <rect x="0" y="0" width={scrubX} height={H} />
                </clipPath>
                <filter id="eg-drop" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#a6694c" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* ----- the evening sky ----- */}
              <rect
                x={SKY.x} y={SKY.y} width={SKY.w} height={SKY.h} rx={SKY.rx}
                fill="url(#eg-sky)"
              />

              <g clipPath="url(#eg-sky-clip)">
                {/* Golden-time bands — bottom layer, tinting the sky */}
                {WINDOWS.map((w) => {
                  const active = activeWin === w;
                  return (
                    <rect
                      key={w.from}
                      x={xOf(w.from)}
                      y={SKY.y + 10}
                      width={xOf(w.to) - xOf(w.from)}
                      height={SKY.h - 20}
                      rx={16}
                      className="transition-opacity duration-300"
                      fill="#faefc9"
                      opacity={active ? 0.7 : 0.28}
                      stroke={active ? "#f2dd9b" : "none"}
                      strokeWidth={active ? 2.5 : 0}
                    />
                  );
                })}

                {/* Stars come out at dusk */}
                {STARS.map((s, i) => (
                  <path
                    key={i}
                    d={sparkle(s.x, s.y, s.s * 2.6)}
                    fill="#fff7df"
                    opacity={night * 0.9}
                    className="animate-pulse-soft"
                    style={{ animationDelay: `${s.d}s` }}
                  />
                ))}

                {/* Sun sets… */}
                <g opacity={1 - night * 0.9}>
                  <circle cx={sunX} cy={sunY} r={30} fill="#f6dd96" opacity={0.45} />
                  <circle cx={sunX} cy={sunY} r={15} fill="#f2c94c" />
                </g>
                {/* …moon rises */}
                <g opacity={night}>
                  <circle cx={moonX} cy={moonY} r={24} fill="#fdf3d3" opacity={0.35} />
                  <circle cx={moonX} cy={moonY} r={13} fill="#fbf0d2" />
                  <circle cx={moonX - 4} cy={moonY - 3} r={3} fill="#efe2bb" opacity={0.7} />
                  <circle cx={moonX + 4} cy={moonY + 4} r={2} fill="#efe2bb" opacity={0.6} />
                </g>

                {/* Drifting clay clouds */}
                <g className="animate-drift" style={{ transformBox: "fill-box" }} opacity={0.85}>
                  <path
                    d="M120 70 C104 70 96 58 104 48 C92 46 94 30 108 29 C104 16 122 8 132 14 C137 1 157 0 162 12 C170 1 190 6 192 21 C207 17 220 27 215 40 C227 42 229 56 219 61 C229 67 222 80 208 76 L120 70 Z"
                    fill="rgba(255,255,255,0.9)"
                  />
                </g>
                <g className="animate-drift-reverse" style={{ transformBox: "fill-box" }} opacity={0.7}>
                  <path
                    d="M640 52 C630 52 624 45 629 38 C622 36 623 26 632 25 C629 17 640 12 646 16 C649 8 661 7 664 15 C669 8 681 11 682 20 C691 17 699 24 696 32 C704 34 705 42 699 46 C705 50 701 58 692 55 L640 52 Z"
                    fill="rgba(255,255,255,0.8)"
                  />
                </g>

                {/* Future curves — a faint promise of where the evening goes */}
                <path d={parentPath} fill="none" stroke="#e5a496" strokeWidth={7} strokeLinecap="round" opacity={0.22} />
                <path d={childPath} fill="none" stroke="#7fb1bb" strokeWidth={7} strokeLinecap="round" opacity={0.22} />

                {/* Past curves — thick clay strokes drawn up to "now" */}
                <g clipPath="url(#eg-past)">
                  <path d={parentPath} fill="none" stroke="#e5a496" strokeWidth={8} strokeLinecap="round" filter="url(#eg-drop)" />
                  <path d={childPath} fill="none" stroke="#7fb1bb" strokeWidth={8} strokeLinecap="round" filter="url(#eg-drop)" />
                </g>

                {/* Gap pulse between the two clay balls */}
                {gap > 0.25 && (
                  <g>
                    <line
                      x1={scrubX} y1={yOf(parentE) - 12}
                      x2={scrubX} y2={yOf(childE) + 12}
                      stroke="#e3c264" strokeWidth={3} strokeDasharray="1 7" strokeLinecap="round"
                    />
                    <g className="animate-pulse-soft" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                      <circle
                        cx={scrubX} cy={(yOf(parentE) + yOf(childE)) / 2}
                        r={13} fill="#fff" stroke="#f2dd9b" strokeWidth={2.5}
                      />
                      <text
                        x={scrubX} y={(yOf(parentE) + yOf(childE)) / 2 + 4.5}
                        textAnchor="middle" fontSize={13}
                      >
                        ⚡
                      </text>
                    </g>
                  </g>
                )}

                {/* Clay ball markers riding the curves */}
                <circle cx={scrubX} cy={yOf(parentE)} r={10} fill="#e5a496" stroke="#fff" strokeWidth={3.5} filter="url(#eg-drop)" />
                <ellipse cx={scrubX - 2.5} cy={yOf(parentE) - 3} rx={3.5} ry={2.5} fill="#fff" opacity={0.55} />
                <circle cx={scrubX} cy={yOf(childE)} r={10} fill="#7fb1bb" stroke="#fff" strokeWidth={3.5} filter="url(#eg-drop)" />
                <ellipse cx={scrubX - 2.5} cy={yOf(childE) - 3} rx={3.5} ry={2.5} fill="#fff" opacity={0.55} />
              </g>

              {/* Curve name tags at the right edge */}
              <g fontSize={12} fontWeight={700}>
                <rect x={W - 66} y={yOf(energyAt(PARENT_PTS, X1)) - 12} width={50} height={24} rx={12} fill="#e5a496" />
                <text x={W - 41} y={yOf(energyAt(PARENT_PTS, X1)) + 4} textAnchor="middle" fill="#fff">
                  {c.parentLabel}
                </text>
                <rect x={W - 66} y={yOf(energyAt(CHILD_PTS, X1)) - 12} width={50} height={24} rx={12} fill="#7fb1bb" />
                <text x={W - 41} y={yOf(energyAt(CHILD_PTS, X1)) + 4} textAnchor="middle" fill="#fff">
                  {c.childLabel}
                </text>
              </g>

              {/* Moongi walks the timeline as the handle */}
              <g
                className="animate-float-slow"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <image
                  href="/brand/moongi.png"
                  x={Math.min(Math.max(scrubX - 26, SKY.x + 2), W - 62)}
                  y={HORIZON - 50}
                  width={56}
                  height={56}
                />
                {activeWin && (
                  <g>
                    <circle
                      cx={Math.min(Math.max(scrubX + 26, SKY.x + 54), W - 10)}
                      cy={HORIZON - 52}
                      r={13}
                      fill="#fff"
                      stroke="#f2dd9b"
                      strokeWidth={2}
                    />
                    <text
                      x={Math.min(Math.max(scrubX + 26, SKY.x + 54), W - 10)}
                      y={HORIZON - 47.5}
                      textAnchor="middle"
                      fontSize={12}
                    >
                      {activeWin.emoji}
                    </text>
                  </g>
                )}
              </g>

              {/* Axis */}
              {axisHours.map((h) => (
                <text
                  key={h}
                  x={xOf(h)}
                  y={H - 14}
                  textAnchor="middle"
                  fontSize={12.5}
                  fill="#8e7e6d"
                  className="font-display"
                  fontWeight={600}
                >
                  {h - 12}PM
                </text>
              ))}
            </svg>

            {/* Live status row */}
            <div className="mt-1 flex flex-col items-stretch gap-2 px-2 pb-2 sm:flex-row sm:items-center">
              <div className="tabular inline-flex w-fit items-center rounded-full bg-cream-100 px-3.5 py-1.5 text-[14px] font-bold text-ink-900 ring-1 ring-grape-100">
                🕕 {formatTime(t, lang, c)}
              </div>
              <div className="flex flex-1 flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/70 px-3 py-1.5 text-[12.5px] font-medium text-ink-800 ring-1 ring-rose-200/70">
                  {pa.emoji} {c.parentLabel} · {lang === "ko" ? pa.ko : pa.en}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100/80 px-3 py-1.5 text-[12.5px] font-medium text-ink-800 ring-1 ring-sky-200/70">
                  {ca.emoji} {c.childLabel} · {lang === "ko" ? ca.ko : ca.en}
                </span>
              </div>
            </div>

            {/* Clay slider */}
            <div className="px-2 pb-2">
              <input
                type="range"
                min={X0}
                max={X1}
                step={0.05}
                value={t}
                aria-label={c.sliderAria}
                onChange={(e) => scrubTo(Number(e.target.value))}
                className="mongle-range w-full"
                style={{
                  background: `linear-gradient(to right, #e3c264 0%, #e3c264 ${sliderPct}%, #f0e0c4 ${sliderPct}%, #f0e0c4 100%)`,
                }}
              />
            </div>
          </div>

          {/* Window cards */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {WINDOWS.map((w) => {
              const active = activeWin === w;
              return (
                <button
                  key={w.from}
                  type="button"
                  onClick={() => scrubTo((w.from + w.to) / 2)}
                  className={[
                    "rounded-3xl p-5 text-left transition clay-shadow-sm",
                    active
                      ? "bg-sun-100 ring-2 ring-sun-300"
                      : "bg-white ring-1 ring-grape-100/70 hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[20px]">{w.emoji}</span>
                    <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                      {lang === "ko" ? w.timeKo : w.timeEn}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[16px] font-semibold text-ink-900">
                    {lang === "ko" ? w.titleKo : w.titleEn}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.7] text-ink-600">
                    {lang === "ko" ? w.bodyKo : w.bodyEn}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Insight line */}
          <p className="mt-8 text-center text-[15px] font-semibold text-ink-700">
            💡 {c.insight}
          </p>
        </div>
      </div>
    </section>
  );
}
