import { marked } from "marked";

/**
 * Newsletter archive loader.
 *
 * Issues live as markdown files in src/content/newsletters/, one file
 * per language: `<slug>.ko.md` + `<slug>.en.md`. They are inlined at
 * build time via import.meta.glob, so the /news pages prerender with
 * full content (SEO) and publishing a new issue = commit + deploy.
 *
 * Frontmatter (--- delimited):
 *   title:   issue title
 *   date:    YYYY-MM-DD
 *   tag:     Product | Ideas | News  (free text, shown as a chip)
 *   excerpt: one-line summary for the archive card
 */

export type Lang = "ko" | "en";

export type NewsletterIssue = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tag: string;
  excerpt: string;
  /** Rendered HTML body (from markdown). */
  html: string;
};

const RAW = import.meta.glob("../content/newsletters/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

/** Minimal frontmatter parser — enough for our flat key: value block. */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: raw.slice(match[0].length) };
}

function buildIndex(): Record<Lang, NewsletterIssue[]> {
  const byLang: Record<Lang, NewsletterIssue[]> = { ko: [], en: [] };

  for (const [path, raw] of Object.entries(RAW)) {
    const file = path.split("/").pop() ?? "";
    const m = /^(.+)\.(ko|en)\.md$/.exec(file);
    if (!m) continue;
    const [, slug, lang] = m;
    const { meta, body } = parseFrontmatter(raw);
    byLang[lang as Lang].push({
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      tag: meta.tag ?? "News",
      excerpt: meta.excerpt ?? "",
      html: marked.parse(body, { async: false }) as string,
    });
  }

  for (const lang of ["ko", "en"] as const) {
    byLang[lang].sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return byLang;
}

const INDEX = buildIndex();

export function listIssues(lang: Lang): NewsletterIssue[] {
  return INDEX[lang];
}

export function getIssue(lang: Lang, slug: string): NewsletterIssue | undefined {
  return INDEX[lang].find((i) => i.slug === slug);
}

/** All slugs (union of both languages) — used by SSG getStaticPaths. */
export function allSlugs(): string[] {
  const s = new Set<string>();
  for (const lang of ["ko", "en"] as const) {
    for (const issue of INDEX[lang]) s.add(issue.slug);
  }
  return [...s];
}

export function formatDate(date: string, lang: Lang): string {
  if (!date) return "";
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return lang === "ko"
    ? `${y}년 ${m}월 ${d}일`
    : new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
}
