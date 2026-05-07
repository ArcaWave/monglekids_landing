import { X, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

export default function Differentiation() {
  const { t } = useLang();
  const d = t.differentiation;
  return (
    <section className="relative bg-gradient-to-b from-cream-50 to-cream-100/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={d.eyebrow}
          title={
            <>
              {d.titlePre}
              <span className="text-grape-700">{d.titleHighlight}</span>
            </>
          }
        />

        <div className="mt-12 overflow-hidden rounded-[28px] ring-1 ring-grape-100 clay-shadow">
          <div className="grid grid-cols-12 bg-white">
            <div className="font-display col-span-12 hidden border-r border-grape-100/70 bg-cream-100/60 px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-400 md:col-span-3 md:block">
              {d.aspect}
            </div>
            <div className="col-span-6 border-r border-grape-100/70 px-5 py-4 md:col-span-4">
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-600">
                <X className="h-4 w-4 text-rose-400" /> {d.legacyHeader}
              </span>
            </div>
            <div className="col-span-6 bg-gradient-to-br from-grape-50 to-white px-5 py-4 md:col-span-5">
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-grape-700">
                <Check className="h-4 w-4 text-grape-600" /> {d.mongleHeader}
              </span>
            </div>
          </div>

          {d.rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-12 ${
                i % 2 === 0 ? "bg-cream-50" : "bg-white"
              }`}
            >
              <div className="col-span-12 hidden border-r border-grape-100/60 px-5 py-5 text-[13px] font-semibold text-ink-700 md:col-span-3 md:block">
                {row.label}
              </div>
              <div className="font-display col-span-12 px-5 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400 md:hidden">
                {row.label}
              </div>
              <div className="col-span-6 border-r border-grape-100/60 px-5 py-5 text-[14.5px] leading-relaxed text-ink-600 md:col-span-4">
                {row.legacy}
              </div>
              <div className="col-span-6 bg-gradient-to-br from-grape-50/60 to-transparent px-5 py-5 text-[14.5px] font-semibold leading-relaxed text-ink-900 md:col-span-5">
                {row.mongle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
