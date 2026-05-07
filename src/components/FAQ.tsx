import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageContext";

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow={t.faq.eyebrow}
          title={<>{t.faq.title}</>}
        />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-grape-100/70 overflow-hidden rounded-[28px] bg-white ring-1 ring-grape-100/70 clay-shadow-sm">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-cream-100/40 sm:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15.5px] font-semibold text-ink-900 sm:text-[16.5px]">
                    {item.q}
                  </span>
                  <span
                    className={[
                      "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full transition",
                      isOpen
                        ? "bg-grape-600 text-white"
                        : "bg-grape-50 text-grape-700",
                    ].join(" ")}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={[
                    "grid overflow-hidden transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <p className="px-5 pb-6 text-[14.5px] leading-relaxed text-ink-600 sm:px-7">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
