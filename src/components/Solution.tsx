import { Brain, Wand2, Hand, BarChart3 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Cloud from "./Cloud";
import { useLang } from "../i18n/LanguageContext";

const STYLES = [
  {
    icon: Brain,
    accent: "from-grape-300 to-rose-200",
    text: "text-grape-700",
    soft: "from-grape-50",
  },
  {
    icon: Wand2,
    accent: "from-peach-200 to-sun-100",
    text: "text-peach-500",
    soft: "from-peach-100",
  },
  {
    icon: Hand,
    accent: "from-mint-200 to-sky-100",
    text: "text-mint-500",
    soft: "from-mint-100",
  },
  {
    icon: BarChart3,
    accent: "from-sky-200 to-grape-200",
    text: "text-sky-500",
    soft: "from-sky-100",
  },
];

export default function Solution() {
  const { t } = useLang();
  return (
    <section id="report" className="relative py-20 md:py-28">
      <span
        className="animate-drift cloud-shadow-sm pointer-events-none absolute right-4 top-12 hidden w-[120px] opacity-90 md:block"
        aria-hidden
      >
        <Cloud fill="#FFFFFF" highlight="#FBFAFF" className="block w-full" />
      </span>
      <span
        className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute -left-4 bottom-20 hidden w-[140px] opacity-80 md:block"
        aria-hidden
      >
        <Cloud fill="#DFEEFD" highlight="#F0F7FF" className="block w-full" />
      </span>

      <div className="container-page relative">
        <SectionHeader
          eyebrow={t.solution.eyebrow}
          title={
            <>
              {t.solution.titlePre}
              <span className="text-grape-700">{t.solution.titleHighlight}</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {t.solution.features.map((f, i) => {
            const s = STYLES[i];
            const Icon = s.icon;
            return (
              <article
                key={f.title}
                className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br ${s.soft} via-white to-white p-7 ring-1 ring-grape-100/80 transition hover:-translate-y-0.5 clay-shadow`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} ${s.text} clay-shadow-sm`}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <span className="font-display rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
                    {f.chip}
                  </span>
                </div>

                <h3 className="mt-5 text-[20px] font-semibold leading-snug text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  {f.body}
                </p>

                <span className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
