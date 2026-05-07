type CloudProps = {
  className?: string;
  /** Pastel color (or "url(#id)") for the cloud body */
  fill?: string;
  /** Optional darker rim that gives the clay feel */
  rim?: string;
  /** Optional inner highlight band on top */
  highlight?: string;
  /** Make it a face cloud (mascot) */
  face?: boolean;
  /** "happy" | "wink" | "wonder" — only when face=true */
  mood?: "happy" | "wink" | "wonder";
  /** Add cheeks */
  cheeks?: boolean;
  ariaLabel?: string;
};

/**
 * A chubby, clay-like cloud. Used everywhere from background decorations
 * to the Mongle mascot.
 */
export default function Cloud({
  className,
  fill = "#FFFFFF",
  rim,
  highlight,
  face = false,
  mood = "happy",
  cheeks = true,
  ariaLabel,
}: CloudProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {/* Soft drop body for clay depth */}
      {rim && (
        <path
          d={CLOUD_PATH}
          fill={rim}
          transform="translate(0 4)"
          opacity={0.55}
        />
      )}

      {/* Main body */}
      <path d={CLOUD_PATH} fill={fill} />

      {/* Top highlight strip — clay catches light up top */}
      {highlight && (
        <path
          d="M58 36 C72 22 96 18 110 30 C124 18 152 22 158 42 C140 30 110 32 96 42 C82 32 70 32 58 36 Z"
          fill={highlight}
          opacity={0.85}
        />
      )}

      {face && (
        <g>
          {cheeks && (
            <>
              <ellipse cx="84" cy="92" rx="11" ry="6" fill="#FFB1C1" opacity={0.7} />
              <ellipse cx="160" cy="92" rx="11" ry="6" fill="#FFB1C1" opacity={0.7} />
            </>
          )}

          {/* Eyes */}
          {mood === "wink" ? (
            <>
              <circle cx="100" cy="78" r="4.6" fill="#2A2440" />
              <path
                d="M138 78 Q146 82 154 78"
                stroke="#2A2440"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : mood === "wonder" ? (
            <>
              <circle cx="100" cy="78" r="5.2" fill="#2A2440" />
              <circle cx="146" cy="78" r="5.2" fill="#2A2440" />
              <circle cx="101.6" cy="76.4" r="1.4" fill="#FFFFFF" />
              <circle cx="147.6" cy="76.4" r="1.4" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <circle cx="100" cy="80" r="4.6" fill="#2A2440" />
              <circle cx="146" cy="80" r="4.6" fill="#2A2440" />
            </>
          )}

          {/* Smile */}
          <path
            d="M112 100 Q123 110 134 100"
            stroke="#2A2440"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
}

/** Chubby 6-bump cloud silhouette path (viewBox 240×160). */
const CLOUD_PATH =
  "M50 132 C26 132 12 116 22 100 C6 96 10 72 30 70 C22 50 44 36 60 44 C66 24 96 18 106 36 C118 18 150 24 154 46 C180 38 204 56 198 78 C218 80 222 102 206 110 C224 118 214 142 188 134 L50 132 Z";

/** Floating cluster of pastel clouds for backgrounds. */
export function CloudField({
  className,
  variant = "warm",
}: {
  className?: string;
  variant?: "warm" | "cool" | "twilight";
}) {
  const palettes = {
    warm: [
      { fill: "#FFFFFF", top: "8%", left: "4%", w: 240, anim: "animate-drift" },
      { fill: "#FFE7DC", top: "30%", left: "78%", w: 200, anim: "animate-drift-reverse" },
      { fill: "#EBE4FF", top: "62%", left: "10%", w: 180, anim: "animate-drift" },
      { fill: "#FFE1E8", top: "82%", left: "68%", w: 220, anim: "animate-drift-reverse" },
    ],
    cool: [
      { fill: "#FFFFFF", top: "10%", left: "6%", w: 230, anim: "animate-drift" },
      { fill: "#DFEEFD", top: "22%", left: "76%", w: 210, anim: "animate-drift-reverse" },
      { fill: "#EBE4FF", top: "68%", left: "12%", w: 180, anim: "animate-drift" },
      { fill: "#DDF5E8", top: "78%", left: "70%", w: 200, anim: "animate-drift-reverse" },
    ],
    twilight: [
      { fill: "rgba(255,255,255,0.18)", top: "12%", left: "4%", w: 260, anim: "animate-drift" },
      { fill: "rgba(255,209,220,0.22)", top: "30%", left: "78%", w: 220, anim: "animate-drift-reverse" },
      { fill: "rgba(216,204,255,0.28)", top: "70%", left: "8%", w: 200, anim: "animate-drift" },
      { fill: "rgba(255,255,255,0.14)", top: "82%", left: "68%", w: 240, anim: "animate-drift-reverse" },
    ],
  } as const;

  const items = palettes[variant];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {items.map((c, i) => (
        <span
          key={i}
          className={`absolute ${c.anim} cloud-shadow-sm`}
          style={{ top: c.top, left: c.left, width: c.w }}
        >
          <Cloud fill={c.fill} className="block w-full" />
        </span>
      ))}
    </div>
  );
}
