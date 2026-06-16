import { ArrowRight, BookOpen, MessageCircleQuestion, PaintbrushVertical, Compass, LineChart, Repeat, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

/**
 * Shift — "learning habits are built now." Card 1 carries real beta-family
 * footage (face-free, filmed from behind); cards 2–3 show mini Moongi chat
 * mocks until more consented clips arrive.
 */

const STYLES = [
  {
    fromIcon: BookOpen,
    toIcon: MessageCircleQuestion,
    accent: "from-grape-300 to-rose-200",
    text: "text-grape-700",
    soft: "from-grape-50 to-white",
  },
  {
    fromIcon: Repeat,
    toIcon: PaintbrushVertical,
    accent: "from-peach-200 to-sun-100",
    text: "text-peach-500",
    soft: "from-peach-100 to-white",
  },
  {
    fromIcon: Compass,
    toIcon: LineChart,
    accent: "from-mint-200 to-sky-100",
    text: "text-mint-500",
    soft: "from-mint-100 to-white",
  },
];

/** Media slot per card: real clip, animated listening Moongi, or chat mock. */
type Media =
  | { kind: "clip"; src: string; badge: "family" | "app"; altKo: string; altEn: string }
  | { kind: "moongi" }
  | { kind: "chat"; variant: "think" | "together" };

const MEDIA: Media[] = [
  {
    kind: "clip",
    src: "/media/play-tablet.webp",
    badge: "family",
    altKo: "베타 가족 아이가 뭉이와 주고받으며 코끼리 이야기를 만들어가는 플레이 장면 (뒷모습)",
    altEn: "A beta-family child building an elephant story with Moongi, seen from behind",
  },
  { kind: "moongi" },
  {
    kind: "clip",
    src: "/media/play-balance.webp",
    badge: "app",
    altKo: "몽글키즈 균형잡기 게임 장면 — 다리 위 코끼리를 좌우 버튼으로 함께 움직이는 놀이",
    altEn: "MongleKids balance game — moving the elephant on the bridge together with left/right buttons",
  },
];

const LOCAL = {
  ko: {
    badge: { family: "베타 가족", app: "실제 앱 화면" },
    chat: {
      think: { ai: "넌 어떻게 생각해?", child: "내 생각엔요…!" },
      together: { ai: "같이 만들어볼까?", child: "좋아, 같이 하자!" },
    },
    privacy: "실제 앱 화면과 베타 가족의 플레이 장면이에요. 아이의 얼굴이 나오지 않는 장면만 사용해요.",
  },
  en: {
    badge: { family: "Beta family", app: "Real app" },
    chat: {
      think: { ai: "What do you think?", child: "I think…!" },
      together: { ai: "Shall we build it together?", child: "Yes, together!" },
    },
    privacy: "Real app screens and beta-family play moments. We only use footage that doesn't show children's faces.",
  },
} as const;

export default function Shift() {
  const { t, lang } = useLang();
  const L = LOCAL[lang];

  return (
    <section className="relative bg-gradient-to-b from-cream-50 via-cream-100/60 to-cream-50 py-20 md:py-28">
      <div className="container-page relative">
        <SectionHeader
          eyebrow={t.shift.eyebrow}
          title={
            <>
              {t.shift.titlePre}
              <span className="text-grape-700">{t.shift.titleHighlight}</span>
              {t.shift.titlePost}
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {t.shift.cards.map((card, i) => {
            const s = STYLES[i];
            const m = MEDIA[i];
            const From = s.fromIcon;
            const To = s.toIcon;
            return (
              <article
                key={card.from}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${s.soft} p-5 ring-1 ring-grape-100/70 clay-shadow-sm`}
              >
                {/* Real footage (or mini chat) showing the habit in action */}
                <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-grape-100/70">
                  {m.kind === "clip" ? (
                    <>
                      <img
                        src={m.src}
                        alt={lang === "ko" ? m.altKo : m.altEn}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 h-full w-full select-none object-cover"
                      />
                      <span className="font-display absolute left-2.5 top-2.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-grape-700 ring-1 ring-white backdrop-blur">
                        {L.badge[m.badge]}
                      </span>
                    </>
                  ) : m.kind === "moongi" ? (
                    /* Moongi asks, then listens — the child is thinking */
                    <div className="absolute inset-0 bg-gradient-to-b from-grape-50 to-cream-50">
                      <span className="absolute left-3 top-3 rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[13px] font-medium text-ink-800 ring-1 ring-grape-100 clay-shadow-sm">
                        {L.chat.think.ai}
                      </span>
                      <img
                        src="/media/moong-listening.webp"
                        alt=""
                        aria-hidden
                        draggable={false}
                        className="absolute bottom-0 left-1/2 h-[78%] -translate-x-1/2 select-none object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`absolute inset-0 flex flex-col justify-center gap-2.5 px-4 ${
                        m.variant === "together" ? "bg-sky-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <img
                          src="/brand/moongi.png"
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="h-9 w-9 flex-none select-none object-contain"
                        />
                        <span className="rounded-2xl rounded-tl-md bg-grape-50 px-3 py-2 text-[13px] font-medium text-ink-800 ring-1 ring-grape-100">
                          {L.chat[m.variant].ai}
                        </span>
                      </div>
                      <div className="flex items-start justify-end gap-2">
                        <span className="rounded-2xl rounded-tr-md bg-gradient-to-br from-peach-200 to-rose-200 px-3 py-2 text-[13px] font-semibold text-ink-900 ring-1 ring-rose-100">
                          {L.chat[m.variant].child}
                        </span>
                        <span
                          className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-sun-100 to-peach-200 text-[15px] ring-2 ring-white"
                          aria-hidden
                        >
                          🧒
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink-400 ring-1 ring-grape-100">
                      <From className="h-5 w-5" />
                    </span>
                    <span className="font-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                      {t.shift.before}
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-ink-300" aria-hidden />
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} ${s.text} clay-shadow-sm`}
                    >
                      <To className="h-5 w-5" />
                    </span>
                    <span className="font-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-grape-700">
                      {t.shift.after}
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 text-[18px] font-semibold leading-snug text-ink-900">
                  <span className="text-ink-400">{card.from}</span>
                  <span className="mx-1.5 text-ink-300">→</span>
                  <span className="text-grape-700">{card.to}</span>
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">
                  {card.body}
                </p>

                <span className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/40 blur-3xl" />
              </article>
            );
          })}
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-ink-500">
          <ShieldCheck className="h-3.5 w-3.5 flex-none text-mint-500" />
          {L.privacy}
        </p>
      </div>
    </section>
  );
}
