import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLang } from "../i18n/LanguageContext";
import { SITE } from "../seo/site";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-grape-100/70 bg-cream-50">
      <div className="container-page py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink-600">
              {t.footer.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13.5px] font-semibold text-ink-700 sm:grid-cols-4"
          >
            <Link className="transition hover:text-grape-700" to="/about">
              {t.footer.nav.about}
            </Link>
            <Link className="transition hover:text-grape-700" to="/#beta">
              {t.footer.nav.beta}
            </Link>
            <Link className="transition hover:text-grape-700" to="/method">
              {t.footer.nav.experience}
            </Link>
            <Link className="transition hover:text-grape-700" to="/news">
              {t.nav.news}
            </Link>
            <a
              className="transition hover:text-grape-700"
              href={`mailto:${SITE.contact.email}`}
            >
              {t.footer.nav.contact}
            </a>
            <Link className="transition hover:text-grape-700" to="/privacy">
              {t.footer.nav.privacy}
            </Link>
            <Link className="transition hover:text-grape-700" to="/privacy">
              {t.footer.nav.terms}
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-grape-100/60 pt-6 text-[12px] text-ink-400 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.operator.legalName} · 몽글키즈.{" "}
            {t.footer.rights}
          </p>
          <p>{t.footer.made}</p>
        </div>
      </div>
    </footer>
  );
}
