import Cloud from "./Cloud";
import { useLang } from "../i18n/LanguageContext";

type Props = {
  size?: number;
};

export default function Logo({ size = 44 }: Props) {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="relative inline-flex items-center justify-center cloud-shadow-sm"
        style={{ width: size, height: size * 0.78 }}
        aria-hidden
      >
        <Cloud
          fill="#FFFFFF"
          rim="#E7DEFA"
          highlight="#FBFAFF"
          face
          mood="happy"
          className="block h-full w-full"
        />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-300 ring-2 ring-cream-50" />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[15px] font-bold tracking-tight text-ink-900">
          {t.logo.primary}
        </span>
        <span className="font-display text-[10px] font-medium uppercase tracking-[0.18em] text-ink-400">
          {t.logo.secondary}
        </span>
      </div>
    </div>
  );
}
