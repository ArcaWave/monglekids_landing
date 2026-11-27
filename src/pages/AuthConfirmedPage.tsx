import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MailCheck, MailWarning } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import Cloud from "../components/Cloud";
import { useLang } from "../i18n/LanguageContext";
import { readAuthReturn, type AuthReturn } from "../lib/authReturn";

/**
 * /auth/confirmed — 앱 가입 확인 메일의 링크를 누른 뒤 보이는 화면
 *
 * 인증은 링크를 누를 때 Supabase 서버가 이미 끝냈다. 이 화면은 결과를 알려 주고
 * "앱으로 돌아가 로그인" 으로 안내만 한다(여기서 로그인하지 않는다).
 * 첫 화면(/)에 인증 값이 붙어 오면 RootLayout 이 이리로 넘긴다 — 규칙은 src/lib/authReturn.ts.
 * (2026-11-26 — 인증 링크를 누르면 홈페이지 첫 화면만 떠서 인증이 안 된 것처럼 보였다)
 */

const COPY = {
  ko: {
    seo: "이메일 인증 · 몽글키즈",
    loading: "확인하는 중이에요…",
    okTitle: "이메일 인증이 끝났어요",
    okBody:
      "몽글키즈 앱으로 돌아가 가입한 이메일과 비밀번호로 로그인해 주세요. 이 창은 닫아도 돼요.",
    expiredTitle: "이미 쓴 링크이거나 시간이 지난 링크예요",
    expiredBody:
      "인증이 이미 끝났을 수도 있어요. 먼저 앱에서 로그인해 보세요. '이메일 인증이 필요해요'가 나오면 앱에서 같은 이메일로 다시 가입해 새 메일을 받아 주세요.",
    errorTitle: "인증을 마치지 못했어요",
    errorBody:
      "잠시 뒤 메일의 링크를 다시 눌러 보시거나, 앱에서 같은 이메일로 다시 가입해 새 메일을 받아 주세요. 계속 안 되면 help@arcawave.xyz 로 알려 주세요.",
    noneTitle: "이메일 인증",
    noneBody:
      "가입 확인 메일의 링크를 누르면 이 화면에서 결과를 알려 드려요. 앱에서 로그인이 되면 인증이 끝난 거예요.",
    back: "홈으로",
  },
  en: {
    seo: "Email verification · MongleKids",
    loading: "Checking…",
    okTitle: "Your email is verified",
    okBody:
      "Go back to the MongleKids app and sign in with the email and password you signed up with. You can close this window.",
    expiredTitle: "This link was already used or has expired",
    expiredBody:
      "Your email may already be verified. Try signing in to the app first. If it says your email still needs verification, sign up again in the app with the same email to get a new link.",
    errorTitle: "We couldn't finish verifying",
    errorBody:
      "Please try the link in the email again in a moment, or sign up again in the app with the same email to get a new link. If it keeps failing, write to help@arcawave.xyz.",
    noneTitle: "Email verification",
    noneBody:
      "Open the link in your sign-up email and this page will show the result. If you can sign in to the app, you're verified.",
    back: "Back to home",
  },
} as const;

export default function AuthConfirmedPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // 미리 만든 화면(SSG)엔 주소 값이 없다 — 브라우저에서 읽기 전까지는 '확인하는 중'
  const [result, setResult] = useState<AuthReturn | null>(null);

  useEffect(() => {
    const r = readAuthReturn(window.location.search, window.location.hash);
    setResult(r);
    // 주소에 남은 code·토큰을 지우고 결과만 남긴다 (공유·방문 기록에 남지 않게)
    if (r !== "none" && window.location.search + window.location.hash !== `?r=${r}`) {
      navigate({ pathname, search: `?r=${r}` }, { replace: true });
    }
  }, [navigate, pathname]);

  const view =
    result === null
      ? { title: c.loading, body: "", Icon: Mail }
      : result === "ok"
        ? { title: c.okTitle, body: c.okBody, Icon: MailCheck }
        : result === "expired"
          ? { title: c.expiredTitle, body: c.expiredBody, Icon: MailWarning }
          : result === "error"
            ? { title: c.errorTitle, body: c.errorBody, Icon: MailWarning }
            : { title: c.noneTitle, body: c.noneBody, Icon: Mail };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={c.seo}
        description="MongleKids sign-up email verification."
        path="/auth/confirmed"
        noindex
      />
      <Header />

      <main className="container-page flex min-h-[60vh] max-w-xl flex-col items-center justify-center py-16 text-center">
        <span className="cloud-shadow relative inline-flex h-24 w-24 items-center justify-center">
          <Cloud
            fill="#FFFFFF"
            rim="#F0DCCB"
            highlight="#FFFDF7"
            className="absolute inset-0 h-full w-full"
          />
          <view.Icon className="relative h-9 w-9 text-grape-600" />
        </span>

        <h1 className="mt-6 text-[24px] font-bold text-ink-900">{view.title}</h1>
        {view.body ? (
          <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{view.body}</p>
        ) : null}

        <div className="mt-8 flex items-center gap-4">
          <Link
            to="/"
            className="font-display inline-flex items-center gap-1.5 text-[13px] font-semibold text-grape-700 transition hover:text-grape-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {c.back}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
