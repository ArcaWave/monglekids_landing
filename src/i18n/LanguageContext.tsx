import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dict, type Dict, type Lang } from "./dictionary";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "mongle-lang";

/**
 * Default language is English. We only switch to Korean when there's a
 * clear Korean signal:
 *   1. the visitor previously chose a language (localStorage), or
 *   2. their browser's languages include a Korean locale.
 * Everything else — including the prerendered SSG HTML, which has no
 * `window` — falls back to English.
 */
function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ko" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  const nav = window.navigator;
  const langs = [nav?.language, ...(nav?.languages ?? [])].filter(Boolean);
  const prefersKorean = langs.some((l) => l!.toLowerCase().startsWith("ko"));
  return prefersKorean ? "ko" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "ko" ? "en" : "ko");
  }, [lang, setLang]);

  // Reflect current language on the <html> tag and document title.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang].meta.docTitle;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, toggle, t: dict[lang] }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}

/** Render a string that contains literal `\n` characters as multi-line text. */
export function withBreaks(text: string) {
  const parts = text.split("\n");
  return parts.map((line, i) => (
    <span key={i}>
      {line}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  ));
}
