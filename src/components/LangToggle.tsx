import { Globe } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

type Props = {
  className?: string;
};

export default function LangToggle({ className = "" }: Props) {
  const { t, toggle, lang } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.langToggle.ariaLabel}
      title={t.langToggle.full}
      className={[
        "font-display inline-flex items-center gap-1.5 rounded-full",
        "border border-grape-200 bg-white/70 px-3 py-2",
        "text-[12.5px] font-semibold tracking-[0.04em] text-ink-700",
        "transition hover:border-grape-300 hover:bg-white hover:text-grape-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grape-300",
        className,
      ].join(" ")}
    >
      <Globe className="h-3.5 w-3.5" aria-hidden />
      <span className="tabular">
        {lang === "ko" ? "EN" : "KR"}
      </span>
    </button>
  );
}
