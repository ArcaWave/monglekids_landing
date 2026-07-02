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
      // Street/locality omitted until the registered address is finalized.
      ...(SITE.operator.address.streetAddress
        ? {
            streetAddress: SITE.operator.address.streetAddress,
            addressLocality: SITE.operator.address.addressLocality,
            addressRegion: SITE.operator.address.addressRegion,
            postalCode: SITE.operator.address.postalCode,
          }
        : {}),
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
      "AI 캐릭터와 함께 소통하는 5–9세 창의융합교육 서비스. 몽글키즈는 아이가 말하고, 만들고, 표현하는 놀이로 창의성 · 사고력 · 표현력 · 사회성 · 정서를 키우는 플랫폼입니다.",
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
      "몽글키즈(MongleKids)는 AI 캐릭터와 함께 소통하는 5–9세 창의융합교육 서비스입니다. 매일의 놀이 미션 속에서 아이가 말하고, 만들고, 표현하며 창의성 · 사고력 · 표현력 · 사회성 · 정서를 키울 수 있도록 설계되었습니다.",
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
