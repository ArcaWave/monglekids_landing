import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, MailX, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import Cloud from "../components/Cloud";
import { useLang } from "../i18n/LanguageContext";
import { submitUnsubscribe } from "../lib/subscribe";

/**
 * /unsubscribe?token=<uuid>
 *
 * Requires an explicit button click before calling the API, so email
 * security scanners that prefetch links can't unsubscribe anyone.
 */

const COPY = {
  ko: {
    title: "뉴스레터 수신거부",
    confirmBody:
      "몽글키즈 소식 이메일을 더 이상 받지 않으시겠어요? 아래 버튼을 누르면 수신이 중단됩니다.",
    confirm: "수신거부 확인",
    working: "처리 중…",
    doneTitle: "수신거부가 완료되었어요",
    doneBody:
      "이제 뉴스레터가 발송되지 않습니다. 마음이 바뀌면 언제든 다시 구독할 수 있어요.",
    invalidTitle: "링크가 올바르지 않아요",
    invalidBody:
      "수신거부 링크가 만료되었거나 잘못되었어요. 이메일 하단의 최신 링크를 사용하거나 help@arcawave.xyz 로 알려주세요.",
    back: "홈으로",
    news: "소식 보러가기",
  },
  en: {
    title: "Unsubscribe",
    confirmBody:
      "Stop receiving MongleKids newsletter emails? Click the button below to confirm.",
    confirm: "Confirm unsubscribe",
    working: "Working…",
    doneTitle: "You've been unsubscribed",
    doneBody:
      "You won't receive our newsletter anymore. If you change your mind, you can subscribe again anytime.",
    invalidTitle: "This link isn't valid",
    invalidBody:
      "The unsubscribe link is expired or malformed. Please use the latest link at the bottom of any email, or contact help@arcawave.xyz.",
    back: "Back to home",
    news: "Browse issues",
  },
} as const;

type Phase = "confirm" | "working" | "done" | "invalid";

export default function UnsubscribePage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const validToken = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token);

  const [phase, setPhase] = useState<Phase>(validToken ? "confirm" : "invalid");

  const onConfirm = async () => {
    setPhase("working");
    const ok = await submitUnsubscribe(token);
    setPhase(ok ? "done" : "invalid");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={lang === "ko" ? "수신거부 · 몽글키즈" : "Unsubscribe · MongleKids"}
        description="MongleKids newsletter unsubscribe."
        path="/unsubscribe"
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
          {phase === "done" ? (
            <CheckCircle2 className="relative h-9 w-9 text-grape-600" />
          ) : (
            <MailX className="relative h-9 w-9 text-grape-600" />
          )}
        </span>

        {phase === "invalid" ? (
          <>
            <h1 className="mt-6 text-[24px] font-bold text-ink-900">{c.invalidTitle}</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{c.invalidBody}</p>
          </>
        ) : phase === "done" ? (
          <>
            <h1 className="mt-6 text-[24px] font-bold text-ink-900">{c.doneTitle}</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{c.doneBody}</p>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-[24px] font-bold text-ink-900">{c.title}</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{c.confirmBody}</p>
            <button
              onClick={onConfirm}
              disabled={phase === "working"}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-grape-700 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-grape-800 disabled:cursor-not-allowed disabled:opacity-60 clay-shadow"
            >
              {phase === "working" ? c.working : c.confirm}
            </button>
          </>
        )}

        <div className="mt-8 flex items-center gap-4">
          <Link
            to="/"
            className="font-display inline-flex items-center gap-1.5 text-[13px] font-semibold text-grape-700 transition hover:text-grape-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {c.back}
          </Link>
          <Link
            to="/news"
            className="font-display text-[13px] font-semibold text-ink-500 transition hover:text-grape-700"
          >
            {c.news}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
