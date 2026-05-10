import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n/LanguageContext";
import { SITE, abs } from "../seo/site";

type Props = {
  title: string;
  description: string;
  /** Canonical path (with leading `/`). */
  path: string;
  /** Override the OG image (default: site OG image). */
  image?: string;
  /** Optional JSON-LD blocks to include in <head>. Each block becomes a script tag. */
  jsonLd?: object | object[];
  /** Default `website`; use `article` for blog/posts. */
  type?: "website" | "article";
  /** Hreflang alternates. Defaults to ko + en at the same path. */
  alternates?: { hrefLang: string; href: string }[];
  /** If true, do not allow indexing (e.g., success pages). */
  noindex?: boolean;
};

export default function SEO({
  title,
  description,
  path,
  image,
  jsonLd,
  type = "website",
  alternates,
  noindex,
}: Props) {
  const { lang } = useLang();
  const url = abs(path);
  const ogImage = abs(image ?? SITE.ogImage);

  const blocks = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  const defaultAlternates = alternates ?? [
    { hrefLang: "ko", href: url },
    { hrefLang: "en", href: url },
    { hrefLang: "x-default", href: url },
  ];

  const ogLocale = lang === "ko" ? SITE.defaultLocale : SITE.altLocale;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.brandKo} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />
      <meta
        property="og:locale:alternate"
        content={lang === "ko" ? SITE.altLocale : SITE.defaultLocale}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {SITE.twitterHandle && (
        <meta name="twitter:site" content={SITE.twitterHandle} />
      )}

      {/* Hreflang */}
      {defaultAlternates.map((a) => (
        <link
          key={a.hrefLang}
          rel="alternate"
          hrefLang={a.hrefLang}
          href={a.href}
        />
      ))}

      {/* Search console verification — values come from src/seo/site.ts */}
      {SITE.verification.google && (
        <meta name="google-site-verification" content={SITE.verification.google} />
      )}
      {SITE.verification.naver && (
        <meta name="naver-site-verification" content={SITE.verification.naver} />
      )}
      {SITE.verification.bing && (
        <meta name="msvalidate.01" content={SITE.verification.bing} />
      )}

      {/* JSON-LD blocks */}
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
