/**
 * Schema.org JSON-LD generators.
 *
 * Each function returns a plain object that should be JSON.stringify'd into
 * a `<script type="application/ld+json">` tag. Keep them small, factual,
 * and aligned with what the page actually says — Google penalises mismatched
 * structured data.
 */

import { SITE, abs } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.operator.legalName,
    legalName: SITE.operator.legalName,
    alternateName: [SITE.operator.shortName, SITE.brandKo, SITE.brandEn],
    url: SITE.url,
    logo: abs(SITE.logo),
    foundingDate: String(SITE.operator.foundingYear),
    founder: {
      "@type": "Person",
      name: SITE.operator.founder,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.operator.address.streetAddress,
      addressLocality: SITE.operator.address.addressLocality,
      addressRegion: SITE.operator.address.addressRegion,
      postalCode: SITE.operator.address.postalCode,
      addressCountry: SITE.operator.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.contact.email,
      contactType: "customer support",
      availableLanguage: ["Korean", "English"],
    },
    sameAs: [...SITE.sameAs],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.brandKo,
    alternateName: SITE.brandEn,
    description:
      "AI 시대의 5–9세 아이를 위한 창의 성장 동반자. 몽글키즈는 아이가 AI와 함께 상상하고, 만들고, 표현하며 자라는 STEAM 교육 플랫폼입니다.",
    inLanguage: ["ko-KR", "en-US"],
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function educationalAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    "@id": `${SITE.url}/#app`,
    name: SITE.brandKo,
    alternateName: SITE.brandEn,
    operatingSystem: "iOS, Android, Web",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "STEAM, Creativity, AI Companion",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Children aged 5–12, Parents",
    },
    educationalUse: [
      "Creativity development",
      "Problem solving",
      "Self-directed learning",
      "Expression",
      "STEAM",
      "AI literacy",
    ],
    learningResourceType: "Interactive mission",
    typicalAgeRange: "5-12",
    isAccessibleForFree: true,
    inLanguage: ["ko-KR", "en-US"],
    publisher: { "@id": `${SITE.url}/#organization` },
    description:
      "몽글키즈(MongleKids)는 5–9세 아이를 위한 AI 창의 성장 동반자입니다. 아이가 AI와 함께 질문하고, 상상하고, 직접 만들며 STEAM 역량을 키울 수 있도록 설계된 매일의 미션 기반 교육 경험을 제공합니다.",
  };
}

type Crumb = { name: string; url: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  };
}

type Faq = { q: string; a: string };

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs(opts.url)}#webpage`,
    url: abs(opts.url),
    name: opts.name,
    description: opts.description,
    inLanguage: opts.inLanguage ?? "ko-KR",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}
