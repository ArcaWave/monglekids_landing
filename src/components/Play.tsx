import { ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Cloud from "./Cloud";
import { useLang } from "../i18n/LanguageContext";

/**
 * Play — how a session with Moongi actually goes. One real conversation
 * (ending on Moongi recalling last week's creation) next to real footage,
 * so the section shows the product instead of describing it.
 */

const CLIPS = [
  { src: "/media/play-tablet.webp", badge: "family" as const },
  { src: "/media/moong-listening.webp", badge: null },
  { src: "/media/play-balance.webp", badge: "app" as const },
];

export default function Play() {
  const { t } = useLang();
  const p = t.play;

  return (
    <section
      id="experience"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage: "linear-gradient(180deg, #f0dfc8 0%, #f2d5c6 55%, #efe2d0 100%)",
      }}
    >
      <span
        className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-8 top-16 hidden w-[180px] opacity-90 sm:block"
        aria-hidden
      >
        <Cloud fill="rgba(255,255,255,0.92)" highlight="rgba(255,255,255,1)" className="block w-full" />
      </span>
      <span
        className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute right-2 top-24 hidden w-[150px] opacity-90 md:block"
        aria-hidden
      >
        <Cloud fill="rgba(255,231,220,0.95)" highlight="#FFF6EE" className="block w-full" />
      </span>

      <div className="container-page relative">
        <SectionHeader
          eyebrow={p.eyebrow}
          title={
            <>
              {p.titlePre}
              <span className="text-grape-700">{p.titleHighlight}</span>
            </>
          }
          description={p.sub}
          tone="dark"
        />

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-12">
          {/* The conversation */}
          <div className="flex flex-col justify-center rounded-[28px] bg-white/90 p-5 ring-1 ring-white/70 backdrop-blur clay-shadow sm:p-6 lg:col-span-5">
            <div className="space-y-3">
              {p.bubbles.map((b, i) => (
                <Bubble
                  key={i}
                  ai={b.who === "ai"}
                  name={b.who === "ai" ? p.aiName : p.childName}
                  tag={b.memory ? p.memoryTag : undefined}
                >
                  {b.text}
                </Bubble>
              ))}
            </div>
          </div>

          {/* Real footage */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            {CLIPS.map((c, i) => (
              <figure
                key={c.src}
                className={[
                  "overflow-hidden rounded-[24px] bg-white ring-1 ring-white/70 clay-shadow-sm",
                  i === 0 ? "col-span-2" : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative overflow-hidden",
                    i === 0 ? "aspect-[16/9]" : "aspect-[4/3]",
                    c.badge ? "" : "bg-gradient-to-b from-grape-50 to-cream-50",
                  ].join(" ")}
                >
                  <img
                    src={c.src}
                    alt={p.clips[i]}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={[
                      "absolute select-none",
                      c.badge
                        ? "inset-0 h-full w-full object-cover"
                        : "bottom-0 left-1/2 h-[82%] -translate-x-1/2 object-contain",
                    ].join(" ")}
                  />
                  {c.badge && (
                    <span className="font-display absolute left-2.5 top-2.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-grape-700 ring-1 ring-white backdrop-blur">
                      {c.badge === "family" ? p.badgeFamily : p.badgeApp}
                    </span>
                  )}
                </div>
                <figcaption className="px-4 py-3 text-[13.5px] font-medium text-ink-700">
                  {p.clips[i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-ink-600">
          <ShieldCheck className="h-3.5 w-3.5 flex-none text-mint-500" />
          {p.privacy}
        </p>
      </div>
    </section>
  );
}

function Bubble({
  ai,
  name,
  tag,
  children,
}: {
  ai: boolean;
  name: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-start gap-2.5 ${ai ? "" : "flex-row-reverse"}`}>
      <span
        className={[
          "relative inline-flex h-10 w-10 flex-none items-center justify-center",
          ai ? "" : "rounded-2xl bg-gradient-to-br from-sun-100 to-peach-200 ring-2 ring-white",
        ].join(" ")}
        aria-hidden
      >
        {ai ? (
          <img
            src="/brand/moongi.png"
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain"
          />
        ) : (
          <span className="text-base">🧒</span>
        )}
      </span>
      <div className={`flex max-w-[82%] flex-col ${ai ? "items-start" : "items-end"}`}>
        <span className="mb-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-ink-400">
          {name}
          {tag && (
            <span className="rounded-full bg-sun-100 px-2 py-0.5 text-[10.5px] font-semibold text-ink-800 ring-1 ring-sun-300">
              {tag}
            </span>
          )}
        </span>
        <div
          className={[
            "rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-snug ring-1",
            ai
              ? tag
                ? "rounded-tl-md bg-sun-100/70 text-ink-900 ring-sun-300"
                : "rounded-tl-md bg-grape-50 text-ink-800 ring-grape-100"
              : "rounded-tr-md bg-gradient-to-br from-peach-200 to-rose-200 font-semibold text-ink-900 ring-rose-100",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
