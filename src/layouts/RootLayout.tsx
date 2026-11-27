import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../i18n/LanguageContext";
import { HEADER_OFFSET } from "../lib/useScrollToSection";
import { looksLikeAuthReturn } from "../lib/authReturn";

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
      <AuthReturnRedirect />
      <ScrollManager />
      <Outlet />
    </LanguageProvider>
  );
}

/**
 * On every route change, scroll to top — unless the URL contains a #hash,
 * in which case smooth-scroll to the matching element. This handles deep
 * links like `/#newsletter` from the header when the user is on a non-home
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
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }, 80);
      return () => window.clearTimeout(handle);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

/**
 * 앱 가입 확인 메일의 링크는 인증을 끝낸 뒤 첫 화면(/)으로 돌아온다(앱이 돌아갈 주소를 따로 넘기지 않으면
 * Supabase 의 기본 주소). 그대로 두면 홈페이지만 떠서 인증이 안 된 것처럼 보이므로 결과 화면으로 넘긴다.
 */
function AuthReturnRedirect() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/" || !looksLikeAuthReturn(search, hash)) return;
    navigate(`/auth/confirmed${search}${hash}`, { replace: true });
  }, [pathname, search, hash, navigate]);

  return null;
}
