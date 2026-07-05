import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import LangToggle from "./LangToggle";
import { useLang } from "../i18n/LanguageContext";
import { useScrollToSection } from "../lib/useScrollToSection";

/**
 * The top nav. Some links are real pages (`/about`, `/method`, `/faq`),
 * others jump to a section on the home page (`#beta`, `#experience`).
 * Section links work from any page — `useScrollToSection` will navigate
 * home first if needed.
 */
export default function Header() {
  const { t } = useLang();
  const location = useLocation();
  const scrollTo = useScrollToSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  type NavItem =
    | { kind: "page"; to: string; label: string }
    | { kind: "section"; id: string; label: string };

  const NAV: NavItem[] = [
    { kind: "page", to: "/about", label: t.nav.why },
    { kind: "page", to: "/method", label: t.nav.experience },
    { kind: "section", id: "report", label: t.nav.report },
    { kind: "page", to: "/news", label: t.nav.news },
    { kind: "section", id: "beta", label: t.nav.beta },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on every route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const triggerCta = () => {
    scrollTo("beta");
    setOpen(false);
  };

  const onSectionClick = (id: string) => {
    scrollTo(id);
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
        <Link
          to="/"
          aria-label={t.nav.home}
          className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-grape-400"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.kind === "page" ? (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition hover:bg-grape-50 hover:text-grape-700"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition hover:bg-grape-50 hover:text-grape-700"
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LangToggle />
          <button
            onClick={triggerCta}
            className="group inline-flex items-center gap-1.5 rounded-full bg-grape-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-grape-800 clay-shadow-sm"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            aria-label={open ? t.nav.close : t.nav.open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 ring-1 ring-grape-100"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="container-page pb-4">
            <div className="flex flex-col gap-1 rounded-2xl bg-white p-2 ring-1 ring-grape-100 clay-shadow-sm">
              {NAV.map((item) =>
                item.kind === "page" ? (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-ink-700 hover:bg-grape-50"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => onSectionClick(item.id)}
                    className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-ink-700 hover:bg-grape-50"
                  >
                    {item.label}
                  </button>
                ),
              )}
              <button
                onClick={triggerCta}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-grape-700 px-3 py-3 text-sm font-semibold text-white"
              >
                {t.nav.cta} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
