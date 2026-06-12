/**
 * CloudScape — a layered "paper-cut cloud wall" band, inspired by pastel
 * play-café interiors: overlapping billowy silhouettes in powder blue,
 * butter yellow, and dusty pink, with a cream foreground that melts into
 * the page background. Purely decorative.
 */
type Props = {
  className?: string;
  /** Foreground (front-most layer) color. Defaults to the page cream. */
  frontFill?: string;
};

export default function CloudScape({ className = "", frontFill = "#fcf7ec" }: Props) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[130px] w-full sm:h-[160px] md:h-[200px]"
      >
        {/* Floating puffs above the wall */}
        <g opacity="0.95">
          <path
            d="M180 64 C166 64 158 54 164 44 C154 42 156 28 168 27 C164 16 178 9 187 14 C191 3 208 1 213 12 C220 2 238 6 240 19 C254 15 266 24 262 36 C273 38 275 50 266 55 C275 60 270 72 257 68 L180 64 Z"
            fill="#fffdf7"
          />
          <path
            d="M1130 52 C1120 52 1114 45 1118 38 C1111 36 1112 26 1121 25 C1118 17 1128 12 1135 16 C1138 8 1150 7 1153 15 C1158 8 1171 11 1172 20 C1182 17 1190 24 1187 32 C1195 34 1196 42 1190 46 C1196 50 1192 58 1183 55 L1130 52 Z"
            fill="#fae4de"
          />
        </g>

        {/* Gold stars */}
        <g fill="#e9c87b">
          <path d="M420 38 l3.2 7.6 8.2 0.8 -6.2 5.5 1.9 8 -7.1 -4.3 -7.1 4.3 1.9 -8 -6.2 -5.5 8.2 -0.8 Z" />
          <path d="M952 26 l2.4 5.7 6.2 0.6 -4.7 4.1 1.4 6 -5.3 -3.2 -5.3 3.2 1.4 -6 -4.7 -4.1 6.2 -0.6 Z" opacity="0.85" />
          <path d="M1338 70 l2 4.8 5.2 0.5 -3.9 3.5 1.2 5.1 -4.5 -2.7 -4.5 2.7 1.2 -5.1 -3.9 -3.5 5.2 -0.5 Z" opacity="0.7" />
        </g>

        {/* Back layer — powder blue */}
        <path
          d="M0 160 Q40 92 110 122 Q152 62 232 102 Q292 52 372 96 Q432 62 502 100 Q562 56 652 96 Q722 66 802 106 Q862 60 952 100 Q1012 56 1092 96 Q1152 66 1232 106 Q1302 70 1372 110 Q1410 92 1440 120 L1440 240 L0 240 Z"
          fill="#cde2e6"
          opacity="0.8"
        />

        {/* Mid layer — butter */}
        <path
          d="M0 192 Q60 132 142 162 Q212 112 302 152 Q372 116 452 152 Q532 112 612 152 Q692 122 772 156 Q852 116 932 152 Q1012 122 1092 156 Q1172 118 1252 154 Q1332 124 1440 152 L1440 240 L0 240 Z"
          fill="#f4e0a8"
          opacity="0.85"
        />

        {/* Near layer — dusty pink */}
        <path
          d="M0 216 Q70 162 152 192 Q232 152 322 186 Q402 152 482 186 Q562 154 642 186 Q722 156 802 190 Q882 154 962 186 Q1042 160 1122 190 Q1202 156 1282 188 Q1362 162 1440 190 L1440 240 L0 240 Z"
          fill="#f2cfc5"
          opacity="0.92"
        />

        {/* Front layer — cream, blends into the page */}
        <path
          d="M0 232 Q80 202 170 222 Q260 198 360 220 Q460 200 560 222 Q660 202 760 222 Q860 202 960 222 Q1060 202 1160 222 Q1260 202 1360 222 Q1412 210 1440 220 L1440 240 L0 240 Z"
          fill={frontFill}
        />
      </svg>
    </div>
  );
}
