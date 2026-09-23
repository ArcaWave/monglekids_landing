import { CheckCircle2, Mail, Sparkles } from "lucide-react";
import Cloud from "./Cloud";
import SubscribeForm from "./SubscribeForm";
import { useLang, withBreaks } from "../i18n/LanguageContext";

/**
 * Home-page newsletter block. Occupies the slot of the pre-launch beta
 * waitlist: same two-panel card, but the right side is the newsletter
 * SubscribeForm (→ /api/subscribe → `subscribers` table + welcome mail).
 */
export default function NewsletterSection() {
  const { t } = useLang();
  const n = t.newsletter;

  return (
    <section id="newsletter" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="blob -left-10 top-10 h-72 w-72 bg-peach-200" />
      <div className="blob -right-10 bottom-10 h-72 w-72 bg-grape-200" />

      <div className="container-page relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[36px] bg-white ring-1 ring-grape-100/70 clay-shadow lg:grid-cols-12">
          <aside
            className="relative overflow-hidden p-8 text-ink-900 md:p-10 lg:col-span-5"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #f8ecd4 0%, #f5d8cc 55%, #dceaed 100%)",
            }}
          >
            <div className="blob -left-10 -top-10 h-56 w-56 bg-white/60" />
            <div className="blob -right-10 bottom-0 h-72 w-72 bg-sun-100/70" />

            <span
              className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-3 top-3 w-[110px] opacity-90"
              aria-hidden
            >
              <Cloud fill="#FFFFFF" highlight="#FFFDF7" className="block w-full" />
            </span>
            <span
              className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute bottom-4 right-4 w-[130px] opacity-80"
              aria-hidden
            >
              <Cloud fill="rgba(255,255,255,0.9)" highlight="#FFFDF7" className="block w-full" />
            </span>

            <div className="relative">
              <span className="font-display inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {n.eyebrow}
              </span>
              <h3 className="mt-4 text-balance text-[24px] font-bold leading-[1.28] tracking-tight sm:text-[28px]">
                {withBreaks(n.title)}
              </h3>

              <ul className="mt-8 space-y-3 text-[14.5px]">
                {n.bullets.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-none text-grape-600" />
                    <span className="text-ink-700">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-white/90 backdrop-blur clay-shadow-sm">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-grape-50 text-grape-700 ring-1 ring-grape-100">
                  <Mail className="h-4 w-4" />
                </span>
                <p className="text-[12.5px] leading-relaxed text-ink-700">{n.note}</p>
              </div>
            </div>
          </aside>

          <div className="p-8 md:p-10 lg:col-span-7">
            <SubscribeForm bare />
          </div>
        </div>
      </div>
    </section>
  );
}
