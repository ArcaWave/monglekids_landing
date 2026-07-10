import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";
import Cloud from "./Cloud";
import { useLang } from "../i18n/LanguageContext";
import { submitSubscription } from "../lib/subscribe";

/**
 * Newsletter subscribe form — email + consent up front, everything else
 * tucked behind an optional "tell us more" fold so the card stays light.
 */

const COPY = {
  ko: {
    eyebrow: "NEWSLETTER",
    title: "몽글키즈 소식 받기",
    sub: "제품 소식, 창의 교육 아이디어, 출시 소식을 이메일로 받아보세요.",
    email: "이메일",
    emailPh: "hello@example.com",
    moreOpen: "조금 더 알려주실래요? (선택)",
    moreClose: "선택 항목 접기",
    name: "이름 (선택)",
    namePh: "홍길동",
    phone: "연락처 (선택)",
    phonePh: "010-0000-0000",
    role: "어떤 분이세요? (선택)",
    rolePh: "선택해주세요",
    roles: [
      { value: "parent", label: "부모" },
      { value: "educator", label: "교사 · 교육자" },
      { value: "institution", label: "기관 · 단체" },
      { value: "other", label: "기타" },
    ],
    ageRange: "아이 나이 (선택)",
    ageRangePh: "선택해주세요",
    ageRanges: ["4–5세", "6–7세", "8–9세", "예비 · 기타"],
    interests: "관심 있는 소식 (선택)",
    interestOptions: ["제품 소식", "창의교육 아이디어", "베타 · 출시 소식"],
    consent:
      "몽글키즈 이메일 수신에 동의하며, 언제든 수신거부할 수 있음을 이해합니다.",
    submit: "구독하기",
    submitting: "구독 처리 중…",
    successTitle: "구독 완료!",
    successBody:
      "몽글키즈 소식과 얼리 액세스 소식을 가끔, 정성껏 보내드릴게요. 받은편지함에서 환영 인사를 확인해보세요.",
    successHint:
      "혹시 메일이 '프로모션' 탭에 들어가 있다면 기본 탭으로 옮겨주세요. 다음 소식부터 놓치지 않아요.",
    successReset: "다른 이메일로 구독하기",
    errors: {
      email: "이메일을 입력해주세요.",
      emailFormat: "이메일 형식을 확인해주세요.",
      consent: "수신 동의가 필요해요.",
      generic: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
    },
  },
  en: {
    eyebrow: "NEWSLETTER",
    title: "Get MongleKids updates",
    sub: "Subscribe to receive product news, creative learning ideas, and launch updates.",
    email: "Email",
    emailPh: "hello@example.com",
    moreOpen: "Tell us a bit more? (optional)",
    moreClose: "Hide optional fields",
    name: "Name (optional)",
    namePh: "Jane Doe",
    phone: "Phone (optional)",
    phonePh: "+82 10-0000-0000",
    role: "Who are you? (optional)",
    rolePh: "Please select",
    roles: [
      { value: "parent", label: "Parent" },
      { value: "educator", label: "Educator" },
      { value: "institution", label: "Institution" },
      { value: "other", label: "Other" },
    ],
    ageRange: "Child's age (optional)",
    ageRangePh: "Please select",
    ageRanges: ["Ages 4–5", "Ages 6–7", "Ages 8–9", "Expecting · Other"],
    interests: "What interests you? (optional)",
    interestOptions: ["Product news", "Learning ideas", "Beta & launch news"],
    consent:
      "I agree to receive MongleKids emails and understand I can unsubscribe at any time.",
    submit: "Subscribe",
    submitting: "Subscribing…",
    successTitle: "You're subscribed!",
    successBody:
      "We'll send occasional MongleKids updates and early access news. Check your inbox for a welcome note.",
    successHint:
      "If our email lands in the Promotions tab, drag it to Primary — you won't miss the next issue.",
    successReset: "Subscribe with another email",
    errors: {
      email: "Please enter your email.",
      emailFormat: "Please check the email format.",
      consent: "Consent is required to subscribe.",
      generic: "Something went wrong. Please try again in a moment.",
    },
  },
} as const;

type Errors = Partial<Record<"email" | "consent", string>>;

export default function SubscribeForm() {
  const { lang } = useLang();
  const c = COPY[lang];

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [more, setMore] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);

  const toggleInterest = (v: string) =>
    setInterests((cur) =>
      cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
    );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const v: Errors = {};
    if (!email.trim()) v.email = c.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      v.email = c.errors.emailFormat;
    if (!consent) v.consent = c.errors.consent;
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    setServerError(false);
    const result = await submitSubscription({
      email: email.trim().toLowerCase(),
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      role: (role || undefined) as
        | "parent"
        | "educator"
        | "institution"
        | "other"
        | undefined,
      child_age_range: ageRange || undefined,
      interests: interests.length ? interests : undefined,
      consent_marketing: true,
      lang,
    });
    setSubmitting(false);

    if (result === "error") {
      setServerError(true);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[28px] bg-white p-8 text-center ring-1 ring-grape-100/70 clay-shadow sm:p-10">
        <span className="cloud-shadow relative mx-auto inline-flex h-20 w-20 items-center justify-center">
          <Cloud
            fill="#FFFFFF"
            rim="#F0DCCB"
            highlight="#FFFDF7"
            className="absolute inset-0 h-full w-full"
          />
          <CheckCircle2 className="relative h-8 w-8 text-grape-600" />
        </span>
        <h3 className="mt-5 text-[22px] font-bold text-ink-900">
          {c.successTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-600">
          {c.successBody}
        </p>
        <p className="mx-auto mt-3 max-w-md rounded-2xl bg-sun-100/60 px-4 py-2.5 text-[12.5px] leading-relaxed text-ink-700 ring-1 ring-sun-300/50">
          💡 {c.successHint}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setEmail("");
            setName("");
            setPhone("");
            setRole("");
            setAgeRange("");
            setInterests([]);
            setConsent(false);
            setMore(false);
          }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-cream-100 px-5 py-2.5 text-[13.5px] font-semibold text-ink-700 ring-1 ring-grape-100 transition hover:bg-white"
        >
          {c.successReset}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] bg-white p-6 ring-1 ring-grape-100/70 clay-shadow sm:p-8">
      <span className="font-display inline-flex items-center gap-2 rounded-full bg-grape-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
        <Sparkles className="h-3.5 w-3.5" /> {c.eyebrow}
      </span>
      <h2 className="mt-3 text-[24px] font-bold tracking-tight text-ink-900 sm:text-[26px]">
        {c.title}
      </h2>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">{c.sub}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        {/* Email — the one field that matters */}
        <label className="block">
          <span className="mb-1.5 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink-700">
              {c.email}
            </span>
            {errors.email && (
              <span className="text-[12px] font-medium text-rose-500">
                {errors.email}
              </span>
            )}
          </span>
          <div
            className={[
              "flex items-center gap-2.5 rounded-2xl bg-cream-100/50 px-4 py-3.5 ring-1 transition focus-within:bg-white focus-within:ring-grape-400",
              errors.email ? "ring-rose-300" : "ring-grape-100",
            ].join(" ")}
          >
            <Mail className="h-4 w-4 flex-none text-ink-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={c.emailPh}
              autoComplete="email"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-300"
            />
          </div>
        </label>

        {/* Optional fold */}
        <button
          type="button"
          onClick={() => setMore((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-grape-700 transition hover:text-grape-800"
        >
          {more ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {more ? c.moreClose : c.moreOpen}
        </button>

        {more && (
          <div className="space-y-4 rounded-2xl bg-cream-100/40 p-4 ring-1 ring-grape-100/60">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MiniField label={c.name}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={c.namePh}
                  autoComplete="name"
                  className="w-full bg-transparent text-[14.5px] outline-none placeholder:text-ink-300"
                />
              </MiniField>
              <MiniField label={c.phone}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={c.phonePh}
                  autoComplete="tel"
                  className="w-full bg-transparent text-[14.5px] outline-none placeholder:text-ink-300"
                />
              </MiniField>
              <MiniField label={c.role}>
                <div className="relative w-full">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none bg-transparent pr-7 text-[14.5px] outline-none"
                  >
                    <option value="">{c.rolePh}</option>
                    {c.roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                </div>
              </MiniField>
              <MiniField label={c.ageRange}>
                <div className="relative w-full">
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full appearance-none bg-transparent pr-7 text-[14.5px] outline-none"
                  >
                    <option value="">{c.ageRangePh}</option>
                    {c.ageRanges.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                </div>
              </MiniField>
            </div>

            <div>
              <span className="text-[13px] font-semibold text-ink-700">
                {c.interests}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.interestOptions.map((opt) => {
                  const on = interests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      aria-pressed={on}
                      className={[
                        "rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 transition",
                        on
                          ? "bg-grape-700 text-white ring-grape-700"
                          : "bg-white text-ink-700 ring-grape-100 hover:bg-grape-50",
                      ].join(" ")}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Consent */}
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 flex-none accent-[#a6694c]"
          />
          <span
            className={[
              "text-[12.5px] leading-relaxed",
              errors.consent ? "text-rose-500" : "text-ink-500",
            ].join(" ")}
          >
            {c.consent}
            {errors.consent && (
              <strong className="ml-1 font-semibold">{errors.consent}</strong>
            )}
          </span>
        </label>

        {serverError && (
          <p
            role="alert"
            className="rounded-2xl bg-rose-100/70 px-4 py-3 text-center text-[13px] font-medium text-rose-500 ring-1 ring-rose-200"
          >
            {c.errors.generic}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grape-700 px-5 py-4 text-[15px] font-semibold text-white transition hover:bg-grape-800 disabled:cursor-not-allowed disabled:opacity-60 clay-shadow"
        >
          {submitting ? c.submitting : c.submit}
          {!submitting && (
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </form>
    </div>
  );
}

function MiniField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink-700">
        {label}
      </span>
      <div className="flex items-center rounded-xl bg-white px-3.5 py-3 ring-1 ring-grape-100 transition focus-within:ring-grape-400">
        {children}
      </div>
    </label>
  );
}
