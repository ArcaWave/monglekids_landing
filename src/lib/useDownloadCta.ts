import { useCallback } from "react";
import { SITE } from "../seo/site";
import { useScrollToSection } from "./useScrollToSection";

/** The store matching the visitor's device, or null on desktop/unknown. */
function deviceStoreUrl(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  // iPadOS reports itself as Macintosh; touch support tells it apart.
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  if (isIOS) return SITE.stores.appStore;
  if (/Android/i.test(ua)) return SITE.stores.googlePlay;
  return null;
}

/**
 * "Download the app" CTA handler. On a phone/tablet it goes straight to
 * the matching store listing; on desktop there's no single right store,
 * so it scrolls to the hero, where both store badges are shown.
 */
export function useDownloadCta() {
  const scrollTo = useScrollToSection();
  return useCallback(() => {
    const url = deviceStoreUrl();
    if (url) {
      window.location.href = url;
      return;
    }
    scrollTo("top");
  }, [scrollTo]);
}
