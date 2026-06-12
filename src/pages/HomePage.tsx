import Header from "../components/Header";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import EnergyGap from "../components/EnergyGap";
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
            "몽글키즈 · AI 캐릭터와 소통하는 창의융합교육 | 5–9세 놀이 학습",
          description:
            "몽글키즈는 AI 캐릭터와 함께 소통하는 5–9세 창의융합교육 서비스입니다. 말하고, 만들고, 표현하는 놀이로 창의성 · 사고력 · 표현력 · 사회성 · 정서를 키워요. 부모를 위한 성장 리포트 제공.",
        }
      : {
          title:
            "MongleKids · Creative Learning with AI Characters for Ages 5–9 | Play-based Education",
          description:
            "MongleKids is a play-based creative learning service for ages 5–9. Kids talk, make, and express with AI characters — growing creativity, thinking, expression, and social-emotional skills. With reports parents can trust.",
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
        <EnergyGap />
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
