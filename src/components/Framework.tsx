import { Sparkles, Brain, MessageCircle, Compass, Bot, Heart } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

const STYLES = [
  { icon: Sparkles, accent: "from-grape-200 to-rose-100", text: "text-grape-700" },
  { icon: Brain, accent: "from-sky-200 to-grape-100", text: "text-sky-500" },
  { icon: MessageCircle, accent: "from-rose-200 to-peach-100", text: "text-rose-500" },
  { icon: Compass, accent: "from-mint-200 to-sky-100", text: "text-mint-500" },
  { icon: Bot, accent: "from-peach-200 to-sun-100", text: "text-peach-500" },
  { icon: Heart, accent: "from-sun-100 to-rose-100", text: "text-sun-500" },
];

export default function Framework() {
  const { t } = useLang();
  const f = t.framework;
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={f.eyebrow}
          title={
            <>
              {f.titlePre}
              <span className="text-grape-700">{f.titleHighlight}</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {f.pillars.map((p, i) => {
            const s = STYLES[i];
            const Icon = s.icon;
            return (
              <div
                key={p.ko}
                className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl bg-white p-5 ring-1 ring-grape-100/70 transition hover:-translate-y-0.5 clay-shadow-sm"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} ${s.text} clay-shadow-sm`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14.5px] font-semibold leading-tight text-ink-900">
                    {p.ko}
                  </p>
                  <p className="font-display mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
                    {p.en}
                  </p>
                </div>
                <span className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-grape-100/60 blur-2xl transition group-hover:bg-grape-200/60" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
