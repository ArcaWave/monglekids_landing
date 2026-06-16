import { useLang } from "../i18n/LanguageContext";

/**
 * Brand logo — the real clay lockup (cloud mascot + wordmark).
 * Korean mode shows the 몽글키즈 lockup; English mode swaps to the
 * "Monglekids" lockup. Both are 800w PNGs, retina-ready for ~h-10 display.
 */
type Props = {
  /** Tailwind height class; width follows the image's aspect ratio. */
  className?: string;
};

export default function Logo({ className = "h-9 md:h-10" }: Props) {
  const { lang } = useLang();
  const isEn = lang === "en";
  return (
    <img
      src={isEn ? "/brand/logo-en.png" : "/brand/logo.png"}
      alt={isEn ? "Monglekids" : "몽글키즈 MongleKids"}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
