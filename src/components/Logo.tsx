import { useLang } from "../i18n/LanguageContext";

/**
 * Brand logo — orange clay cloud outline with the wordmark inside.
 * Korean mode shows the 몽글키즈 lockup; English mode swaps to the
 * "mongle kids" lockup. Both are 320px-tall PNGs (≈1.6:1), so the logo
 * needs more height than a flat wordmark for the text to stay legible.
 */
type Props = {
  /** Tailwind height class; width follows the image's aspect ratio. */
  className?: string;
};

export default function Logo({ className = "h-[52px] md:h-[70px]" }: Props) {
  const { lang } = useLang();
  const isEn = lang === "en";
  return (
    <img
      src={isEn ? "/brand/logo-en-orange.png" : "/brand/logo-ko-orange.png"}
      alt={isEn ? "Monglekids" : "몽글키즈 MongleKids"}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
