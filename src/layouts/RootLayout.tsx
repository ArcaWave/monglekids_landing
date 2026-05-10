import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LanguageProvider } from "../i18n/LanguageContext";

/**
 * Root layout. Wraps every page with the language context.
 *
 * NOTE: We deliberately do NOT include <HelmetProvider> here — vite-react-ssg
 * wraps the app in its own HelmetProvider for SSG so it can capture per-page
 * <Helmet> output and inject it into the prerendered HTML's <head>. Wrapping
 * a second one here would create a nested context that vite-react-ssg can't
 * read, and per-page titles / OG meta would silently disappear.
 */
export default function RootLayout() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <Outlet />
    </LanguageProvider>
  );
}

/**
 * On every route change, scroll to top — unless the URL contains a #hash,
 * in which case smooth-scroll to the matching element. This handles deep
 * links like `/#beta` from the header CTA when the user is on a non-home
 * page.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const handle = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }, 80);
      return () => window.clearTimeout(handle);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
