/**
 * Brand logo — the real clay lockup (cloud mascot + 몽글키즈).
 * Served from /public/brand/logo.png (800w, retina-ready for ~h-10 display).
 */
type Props = {
  /** Tailwind height class; width follows the image's aspect ratio. */
  className?: string;
};

export default function Logo({ className = "h-9 md:h-10" }: Props) {
  return (
    <img
      src="/brand/logo.png"
      alt="몽글키즈 MongleKids"
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
