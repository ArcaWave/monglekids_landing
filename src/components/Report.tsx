import { ArrowRight, Clock, Quote, Sprout } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";
import { useDownloadCta } from "../lib/useDownloadCta";

/**
 * Report — what a parent sees after bedtime. The real report screenshot
 * carries the section; the list only names what's on it.
 */

const ITEM_ICONS = [Quote, Clock, Sprout];

/** Same order as t.report.abilities. Icons: Fluent 3D, /public/icons. */
const ABILITY_ICONS = [
  "/icons/creativity.png",
  "/icons/expression.png",
  "/icons/thinking.png",
  "/icons/social.png",
  "/icons/emotion.png",
  "/icons/interaction.png",
];

export default function Report() {
  const { t } = useLang();
  const r = t.report;
  const download = useDownloadCta();

  return (
    <section id="report" className="relative overflow-hidden py-20 md:py-28">
      <div className="blob -left-24 top-32 h-72 w-72 bg-sun-100" />
      <div className="blob -right-24 bottom-16 h-72 w-72 bg-sky-100" />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeader
            align="left"
            eyebrow={r.eyebrow}
            title={
              <>
                {r.titlePre}
                <span className="text-grape-700">{r.titleHighlight}</span>
              </>
            }
          />

          <ul className="mt-8 space-y-3">
            {r.items.map((item, i) => {
              const Icon = ITEM_ICONS[i];
              return (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-3xl bg-white p-4 ring-1 ring-grape-100/70 clay-shadow-sm sm:p-5"
                >
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-grape-50 text-grape-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15.5px] font-semibold text-ink-900">{item.title}</h3>
                    {item.body ? (
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-600">{item.body}</p>
                    ) : (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {r.abilities.map((name, k) => (
                          <span
                            key={name}
                            className="inline-flex items-center gap-1.5 rounded-full bg-cream-100/80 py-1 pl-1 pr-2.5 text-[12.5px] font-medium text-ink-800 ring-1 ring-grape-100/70"
                          >
                            <img
                              src={ABILITY_ICONS[k]}
                              alt=""
                              aria-hidden
                              draggable={false}
                              className="h-5 w-5 select-none object-contain"
                            />
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={download}
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-grape-700 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-grape-800 clay-shadow-sm"
          >
            {r.cta}
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* The real report, like a phone left on the table */}
        <div className="relative flex flex-col items-center lg:col-span-6">
          <figure className="relative w-[230px] rotate-[-2deg] sm:w-[260px]">
            <div className="overflow-hidden rounded-[28px] ring-[6px] ring-white clay-shadow">
              <img
                src="/media/parent-report.webp"
                alt={r.imageAlt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block w-full select-none"
              />
            </div>
            <figcaption className="font-display mt-3 text-center text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {r.imageCaption}
            </figcaption>
          </figure>

          <blockquote className="relative -mt-2 max-w-[300px] rotate-[1.5deg] rounded-3xl bg-white p-5 ring-1 ring-grape-100/70 clay-shadow-sm sm:absolute sm:-right-2 sm:bottom-16 sm:mt-0 lg:-right-4">
            <p className="text-[14.5px] font-semibold leading-relaxed text-ink-800">{r.quote}</p>
            <footer className="mt-2 text-[12px] font-medium text-ink-400">{r.quoteBy}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
