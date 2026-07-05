import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import SubscribeForm from "../components/SubscribeForm";
import { useLang } from "../i18n/LanguageContext";
import { breadcrumbSchema, webPageSchema } from "../seo/schema";
import { getIssue, formatDate } from "../lib/newsletters";

const COPY = {
  ko: { back: "소식 목록으로", ctaTitle: "다음 소식을 이메일로 받아보세요" },
  en: { back: "Back to all issues", ctaTitle: "Get the next issue by email" },
} as const;

export default function NewsIssuePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const c = COPY[lang];

  const issue = slug ? getIssue(lang, slug) ?? getIssue(lang === "ko" ? "en" : "ko", slug) : undefined;
  if (!issue) return <Navigate to="/news" replace />;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={`${issue.title} · 몽글키즈 소식`}
        description={issue.excerpt}
        path={`/news/${issue.slug}`}
        jsonLd={[
          webPageSchema({
            url: `/news/${issue.slug}`,
            name: issue.title,
            description: issue.excerpt,
            inLanguage: lang === "ko" ? "ko-KR" : "en-US",
          }),
          breadcrumbSchema([
            { name: lang === "ko" ? "홈" : "Home", url: "/" },
            { name: "News", url: "/news" },
            { name: issue.title, url: `/news/${issue.slug}` },
          ]),
        ]}
      />
      <Header />

      <main className="container-page max-w-3xl py-12 md:py-16">
        <Link
          to="/news"
          className="font-display mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-grape-700 transition hover:text-grape-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {c.back}
        </Link>

        <article>
          <header>
            <div className="flex items-center gap-2.5">
              <span className="font-display rounded-full bg-sun-100 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-800">
                {issue.tag}
              </span>
              <time className="text-[13px] text-ink-400" dateTime={issue.date}>
                {formatDate(issue.date, lang)}
              </time>
            </div>
            <h1 className="mt-4 text-balance text-[28px] font-bold leading-[1.25] tracking-tight text-ink-900 sm:text-[36px]">
              {issue.title}
            </h1>
          </header>

          <div
            className="newsletter-body mt-8"
            dangerouslySetInnerHTML={{ __html: issue.html }}
          />
        </article>

        <section className="mt-14">
          <h2 className="mb-4 text-center text-[17px] font-bold text-ink-900">
            {c.ctaTitle}
          </h2>
          <SubscribeForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
