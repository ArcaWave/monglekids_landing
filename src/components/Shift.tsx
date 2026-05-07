import { ArrowRight, BookOpen, MessageCircleQuestion, PaintbrushVertical, Compass, LineChart, Repeat } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

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

export default function Shift() {
  const { t } = useLang();
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
            const From = s.fromIcon;
            const To = s.toIcon;
            return (
              <article
                key={card.from}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${s.soft} p-6 ring-1 ring-grape-100/70 clay-shadow-sm`}
              >
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
      </div>
    </section>
  );
}
