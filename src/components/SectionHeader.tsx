import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: Props) {
  const isDark = tone === "dark";
  const isCenter = align === "center";

  return (
    <div
      className={[
        "flex flex-col gap-3.5",
        isCenter ? "items-center text-center" : "items-start text-left",
      ].join(" ")}
    >
      {eyebrow && (
        <span
          className={[
            "font-display inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em]",
            isDark
              ? "bg-white/55 text-grape-700 ring-1 ring-white/70 backdrop-blur"
              : "bg-grape-50 text-grape-700 ring-1 ring-grape-100",
          ].join(" ")}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={[
          "text-balance text-[27px] font-bold leading-[1.28] tracking-tight text-ink-900 sm:text-[32px] md:text-[38px]",
          isCenter ? "max-w-3xl" : "",
        ].join(" ")}
      >
        {title}
      </h2>
      {description && (
        <p
          className={[
            "text-balance text-[15.5px] leading-relaxed md:text-[16.5px]",
            isDark ? "text-ink-700" : "text-ink-600",
            isCenter ? "max-w-2xl" : "max-w-xl",
          ].join(" ")}
        >
          {description}
        </p>
      )}
    </div>
  );
}
