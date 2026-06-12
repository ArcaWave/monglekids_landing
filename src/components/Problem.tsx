import { HelpCircle, Tv, MessageSquareQuote, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

const STYLES = [
  { icon: HelpCircle, color: "from-grape-100 to-white", accent: "text-grape-600" },
  { icon: Tv, color: "from-peach-100 to-white", accent: "text-peach-500" },
  { icon: MessageSquareQuote, color: "from-mint-100 to-white", accent: "text-mint-500" },
  { icon: Layers, color: "from-rose-100 to-white", accent: "text-rose-500" },
];

export default function Problem() {
  const { t } = useLang();
  return (
    <section id="why" className="relative py-20 md:py-28">
      <div className="container-page relative">
        <SectionHeader
          eyebrow={t.problem.eyebrow}
          title={
            <>
              {t.problem.titlePre}
              <span className="text-grape-700">{t.problem.titleHighlight}</span>
              {t.problem.titlePost}
            </>
          }
          description={t.problem.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {t.problem.questions.map((text, i) => {
            const s = STYLES[i];
            const Icon = s.icon;
            return (
              <div
                key={text}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${s.color} p-6 ring-1 ring-grape-100/70 transition hover:-translate-y-0.5 clay-shadow-sm`}
              >
                <span
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-grape-100 ${s.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-[15px] font-semibold leading-snug text-ink-800">
                  “{text}”
                </p>
                <span className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/40 blur-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
