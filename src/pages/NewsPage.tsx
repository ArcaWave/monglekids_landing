import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import Cloud from "../components/Cloud";
import SubscribeForm from "../components/SubscribeForm";
import { useLang } from "../i18n/LanguageContext";
import { breadcrumbSchema, webPageSchema } from "../seo/schema";
import { listIssues, formatDate } from "../lib/newsletters";

const COPY = {
  ko: {
    eyebrow: "MONGLE NEWS",
    title: "몽글 소식",
    sub: "제품 소식, 창의 교육 아이디어, 출시 이야기를 차곡차곡 담습니다.",
    archiveTitle: "지난 소식",
    read: "읽기",
    empty: "아직 발행된 소식이 없어요. 곧 첫 소식으로 찾아올게요!",
  },
  en: {
    eyebrow: "MONGLE NEWS",
    title: "MongleKids News",
    sub: "Product news, creative learning ideas, and launch stories — issue by issue.",
    archiveTitle: "Past issues",
    read: "Read",
    empty: "No issues published yet — the first one is coming soon!",
  },
} as const;

export default function NewsPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const issues = listIssues(lang);

  const seo =
    lang === "ko"
      ? {
          title: "소식 · 몽글키즈 뉴스레터 | 제품 소식 · 창의교육 아이디어",
          description:
            "몽글키즈 뉴스레터 아카이브. 제품 소식, 아이와 함께하는 창의 교육 아이디어, 베타 · 출시 소식을 이메일로 받아보세요.",
        }
      : {
          title: "News · MongleKids Newsletter | Product News & Learning Ideas",
          description:
            "The MongleKids newsletter archive. Subscribe for product news, creative learning ideas, and beta & launch updates.",
        };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/news"
        jsonLd={[
          webPageSchema({
            url: "/news",
            name: seo.title,
            description: seo.description,
            inLanguage: lang === "ko" ? "ko-KR" : "en-US",
          }),
          breadcrumbSchema([
            { name: lang === "ko" ? "홈" : "Home", url: "/" },
            { name: "News", url: "/news" },
          ]),
        ]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-10 md:pt-20 md:pb-14">
          <div className="blob -left-32 top-24 h-[420px] w-[420px] bg-sun-100" />
          <div className="blob right-[-120px] top-[-60px] h-[380px] w-[380px] bg-rose-200" />
          <span
            className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-6 top-28 hidden w-[140px] sm:block"
            aria-hidden
          >
            <Cloud fill="#FFFFFF" highlight="#FFFDF7" className="block w-full" />
          </span>

          <div className="container-page relative">
            <div className="max-w-3xl">
              <span className="font-display inline-flex items-center gap-2 rounded-full bg-grape-50 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
                {c.eyebrow}
              </span>
              <h1 className="mt-4 text-balance text-[32px] font-bold leading-[1.22] tracking-tight text-ink-900 sm:text-[40px] md:text-[48px]">
                {c.title}
              </h1>
              <p className="mt-3 text-balance text-[16px] text-ink-600 md:text-[18px]">
                {c.sub}
              </p>
            </div>
          </div>
        </section>

        {/* Subscribe card */}
        <section className="relative pb-14 md:pb-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl">
              <SubscribeForm />
            </div>
          </div>
        </section>

        {/* Archive */}
        <section className="relative pb-20 md:pb-28">
          <div className="container-page">
            <h2 className="font-display text-[12px] font-semibold uppercase tracking-[0.18em] text-grape-700">
              {c.archiveTitle}
            </h2>

            {issues.length === 0 ? (
              <p className="mt-6 rounded-3xl bg-white p-8 text-center text-[15px] text-ink-500 ring-1 ring-grape-100/70">
                {c.empty}
              </p>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                {issues.map((issue) => (
                  <Link
                    key={issue.slug}
                    to={`/news/${issue.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-grape-100/70 transition hover:-translate-y-0.5 hover:ring-grape-300 clay-shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-display rounded-full bg-sun-100 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-800">
                        {issue.tag}
                      </span>
                      <time className="text-[12px] text-ink-400" dateTime={issue.date}>
                        {formatDate(issue.date, lang)}
                      </time>
                    </div>
                    <h3 className="mt-3 text-[18px] font-bold leading-snug text-ink-900">
                      {issue.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-600">
                      {issue.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-grape-700">
                      {c.read}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
