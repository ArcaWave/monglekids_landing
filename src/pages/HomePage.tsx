import Header from "../components/Header";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Shift from "../components/Shift";
import Solution from "../components/Solution";
import Experience from "../components/Experience";
import ParentValue from "../components/ParentValue";
import Differentiation from "../components/Differentiation";
import Framework from "../components/Framework";
import BetaForm from "../components/BetaForm";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLang } from "../i18n/LanguageContext";
import {
  educationalAppSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "../seo/schema";

export default function HomePage() {
  const { lang } = useLang();

  const seo =
    lang === "ko"
      ? {
          title:
            "몽글키즈 · AI 시대의 5–9세 창의 성장 동반자 | STEAM · AI 교육 앱",
          description:
            "몽글키즈는 5–9세 아이를 위한 AI 창의 성장 동반자입니다. 매일의 작은 미션으로 창의력 · 질문력 · 표현력 · 자기주도성을 키우는 STEAM · AI 교육 경험. 부모를 위한 성장 리포트 제공.",
        }
      : {
          title:
            "MongleKids · The AI Creative Growth Companion for Kids 5–9 | STEAM, AI Education",
          description:
            "MongleKids is an AI creative growth companion for kids aged 5–9. Daily mission-based STEAM and AI learning that grows creativity, curiosity, expression, and self-direction — with reports parents can trust.",
        };

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    educationalAppSchema(),
    webPageSchema({
      url: "/",
      name: seo.title,
      description: seo.description,
      inLanguage: lang === "ko" ? "ko-KR" : "en-US",
    }),
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/"
        jsonLd={jsonLd}
      />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Shift />
        <Solution />
        <Experience />
        <ParentValue />
        <Differentiation />
        <Framework />
        <BetaForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
