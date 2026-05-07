import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

type Props = {
  onCtaClick: () => void;
  onNavClick: (id: string) => void;
};

const NAV = [
  { id: "why", label: "왜 몽글키즈인가" },
  { id: "experience", label: "아이 경험" },
  { id: "report", label: "부모 리포트" },
  { id: "beta", label: "베타 신청" },
];

export default function Header({ onCtaClick, onNavClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavClick(id);
    setOpen(false);
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-grape-100/70 bg-cream-50/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-[72px]">
        <button
          onClick={() => onNavClick("top")}
          aria-label="몽글키즈 홈"
          className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-grape-400"
        >
          <Logo />
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition hover:bg-grape-50 hover:text-grape-700"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onCtaClick}
            className="group inline-flex items-center gap-1.5 rounded-full bg-grape-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-grape-800 clay-shadow-sm"
          >
            베타 신청하기
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <button
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 ring-1 ring-grape-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="container-page pb-4">
            <div className="flex flex-col gap-1 rounded-2xl bg-white p-2 ring-1 ring-grape-100 clay-shadow-sm">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-ink-700 hover:bg-grape-50"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onCtaClick();
                  setOpen(false);
                }}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-grape-600 px-3 py-3 text-sm font-semibold text-white"
              >
                베타 신청하기 <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
