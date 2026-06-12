import { Sparkles, Heart, Compass, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import Cloud from "../components/Cloud";
import { useLang } from "../i18n/LanguageContext";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "../seo/schema";
import { SITE } from "../seo/site";

const COPY = {
  ko: {
    eyebrow: "ABOUT MONGLEKIDS",
    title: "AI 시대 아이의 창의 성장을 위해.",
    sub: "Arcawave가 만드는 몽글키즈 이야기.",
    intro:
      "AI는 이미 모든 답을 갖고 있습니다. 그렇다면 지금 자라는 아이가 진짜로 갖춰야 할 능력은 무엇일까요? 우리의 답은 정답이 아니라, 스스로 질문하고 상상하고 표현하는 힘입니다.",
    sections: [
      {
        icon: Heart,
        title: "왜 만들었나",
        body: "아이를 위한 콘텐츠는 이미 충분합니다. 하지만 아이가 자기 생각을 펼칠 안전하고 따뜻한 공간은 여전히 부족합니다. 부모도 ‘영상을 더 보여줄까’와 ‘아예 화면을 줄일까’ 사이에서만 고민합니다. 몽글키즈는 화면 시간을 다르게 채울 수 있다는 가능성을 보여주려 시작했습니다.",
      },
      {
        icon: Sparkles,
        title: "우리가 믿는 것",
        body: "AI는 정답을 빨리 주는 도구가 아니라, 좋은 질문을 던지는 동반자가 되어야 합니다. 아이가 만든 작은 아이디어를 한 단계 더 키워주는 흐름 속에서 창의력 · 표현력 · 자기주도성이 자연스럽게 자랍니다.",
      },
      {
        icon: Compass,
        title: "어디로 가는가",
        body: "5–9세부터 시작해 점차 13세까지 확장합니다. 단편적 학습 앱이 아니라, 아이의 관심사와 표현이 시간 위에 쌓이는 ‘아이만의 성장 흐름’을 만드는 플랫폼이 우리의 목표입니다.",
      },
      {
        icon: Users,
        title: "누가 만드는가",
        body: `${SITE.operator.legalName}는 한국에서 시작한 작은 팀입니다. 대표 ${SITE.operator.founder}을 중심으로, 교육 · 디자인 · AI · 부모 입장을 모두 진지하게 보는 사람들이 모였습니다.`,
      },
    ],
    companyHeading: "회사 정보",
    companyRows: [
      { k: "법인명", v: SITE.operator.legalName },
      { k: "대표자", v: SITE.operator.founder },
      { k: "본사", v: SITE.operator.address.streetAddress },
      { k: "이메일", v: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
      { k: "웹사이트", v: SITE.url, href: SITE.url },
      { k: "개인정보처리방침", v: "/privacy", href: "/privacy" },
    ],
  },
  en: {
    eyebrow: "ABOUT MONGLEKIDS",
    title: "Built for kids growing up in the AI era.",
    sub: "The story behind MongleKids, made by Arcawave.",
    intro:
      "AI already has every answer. So what should the next generation actually grow up knowing how to do? Our answer isn't more facts — it's the power to ask, imagine, and express their own ideas.",
    sections: [
      {
        icon: Heart,
        title: "Why we built it",
        body: "There is already plenty of content made for children. What's missing is a warm, safe space where kids can put out their own ideas. Parents are stuck between “let them watch more” and “cut screen time entirely.” MongleKids exists to show that screen time can be filled differently.",
      },
      {
        icon: Sparkles,
        title: "What we believe",
        body: "AI shouldn't rush in with the answer. It should be a companion that asks better questions. Inside that quiet back-and-forth, a child's creativity, expression, and self-direction grow naturally.",
      },
      {
        icon: Compass,
        title: "Where we're going",
        body: "We start with kids 5–9 and gradually extend up to age 13. The goal isn't to be one more learning app — it's to become the platform where each child's interests and expressions accumulate over time into their own arc of growth.",
      },
      {
        icon: Users,
        title: "Who makes it",
        body: `${SITE.operator.legalName} is a small team that started in South Korea. Led by founder ${SITE.operator.founder}, the team brings together people who take education, design, AI, and the parent's perspective equally seriously.`,
      },
    ],
    companyHeading: "Company Information",
    companyRows: [
      { k: "Legal name", v: SITE.operator.legalName },
      { k: "Founder", v: SITE.operator.founder },
      { k: "Office", v: SITE.operator.address.streetAddress },
      { k: "Email", v: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
      { k: "Website", v: SITE.url, href: SITE.url },
      { k: "Privacy Policy", v: "/privacy", href: "/privacy" },
    ],
  },
} as const;

export default function AboutPage() {
  const { lang } = useLang();
  const c = COPY[lang];

  const seo =
    lang === "ko"
      ? {
          title: "About · 몽글키즈를 만드는 Arcawave 이야기 | 창의교육 · AI교육 · 에듀테크",
          description:
            "Arcawave가 만드는 몽글키즈는 5–9세 아이를 위한 AI 창의 성장 동반자입니다. 우리가 왜 만들었는지, 무엇을 믿는지, 어디로 가는지에 대한 이야기.",
        }
      : {
          title:
            "About · The Story of MongleKids by Arcawave | Creative Learning · AI Education · EdTech",
          description:
            "MongleKids by Arcawave is an AI creative growth companion for kids 5–9. Our story — why we built it, what we believe, and where we're going.",
        };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/about"
        jsonLd={[
          organizationSchema(),
          webPageSchema({
            url: "/about",
            name: seo.title,
            description: seo.description,
            inLanguage: lang === "ko" ? "ko-KR" : "en-US",
          }),
          breadcrumbSchema([
            { name: lang === "ko" ? "홈" : "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        ]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="blob -left-32 top-24 h-[420px] w-[420px] bg-grape-200" />
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
              <p className="mt-6 max-w-2xl text-balance text-[15.5px] leading-[1.78] text-ink-700 md:text-[16.5px]">
                {c.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Belief sections */}
        <section className="relative pb-16 md:pb-24">
          <div className="container-page">
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              {c.sections.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title}
                    className="rounded-3xl bg-white p-7 ring-1 ring-grape-100/70 clay-shadow-sm"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-grape-50 text-grape-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-[20px] font-semibold text-ink-900">
                      {s.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-[1.78] text-ink-600">
                      {s.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company info */}
        <section className="relative pb-24 md:pb-32">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-grape-700">
                {c.companyHeading}
              </h2>
              <dl className="mt-4 grid grid-cols-1 gap-3 rounded-3xl bg-white p-6 ring-1 ring-grape-100/70 clay-shadow-sm sm:p-7">
                {c.companyRows.map((row) => (
                  <div
                    key={row.k}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <dt className="font-display text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-400 sm:w-[180px] sm:flex-none">
                      {row.k}
                    </dt>
                    <dd className="text-[14.5px] text-ink-800">
                      {"href" in row && row.href ? (
                        <a
                          href={row.href}
                          className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
                        >
                          {row.v}
                        </a>
                      ) : (
                        row.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
