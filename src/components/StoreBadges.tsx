import { SITE } from "../seo/site";
import { useLang } from "../i18n/LanguageContext";

function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" className="h-[22px] w-[22px] fill-current" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 26" className="h-[22px] w-[20px]" aria-hidden>
      <path d="M1.1.6 13.4 12.9 1.1 25.2C.7 25 .4 24.5.4 23.9V1.9C.4 1.3.7.8 1.1.6Z" fill="#00D7FE" />
      <path d="m17.5 8.8-4.1 4.1 4.1 4.1 4.7-2.7c1.3-.8 1.3-2 0-2.8l-4.7-2.7Z" fill="#FFCE00" />
      <path d="M17.5 17 13.4 12.9 1.1 25.2c.5.5 1.2.5 2.1 0L17.5 17Z" fill="#FF3A44" />
      <path d="M17.5 8.8 3.2.6C2.3.1 1.6.1 1.1.6l12.3 12.3 4.1-4.1Z" fill="#00F076" />
    </svg>
  );
}

function Badge({
  href,
  small,
  big,
  icon,
  label,
}: {
  href: string;
  small: string;
  big: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-[52px] items-center gap-2.5 rounded-[14px] bg-ink-900 px-4 text-white ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-black clay-shadow-sm"
    >
      {icon}
      <span className="flex flex-col leading-none">
        <span className="text-[10.5px] font-medium tracking-wide text-white/80">{small}</span>
        <span className="mt-1 text-[17px] font-semibold tracking-tight">{big}</span>
      </span>
    </a>
  );
}

export default function StoreBadges({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Badge
        href={SITE.stores.appStore}
        small={t.hero.appStoreSmall}
        big="App Store"
        icon={<AppleLogo />}
        label="App Store에서 몽글키즈 다운로드 / Download MongleKids on the App Store"
      />
      <Badge
        href={SITE.stores.googlePlay}
        small={t.hero.playStoreSmall}
        big="Google Play"
        icon={<PlayLogo />}
        label="Google Play에서 몽글키즈 다운로드 / Get MongleKids on Google Play"
      />
    </div>
  );
}
