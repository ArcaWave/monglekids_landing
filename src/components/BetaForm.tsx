import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Sparkles, ChevronDown, Mail, User, Baby } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Cloud from "./Cloud";
import { useLang, withBreaks } from "../i18n/LanguageContext";
import { submitWaitlist } from "../lib/waitlist";

type Errors = Partial<Record<"name" | "email" | "age", string>>;

export default function BetaForm() {
  const { t, lang } = useLang();
  const b = t.beta;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = b.errors.name;
    if (!email.trim()) e.email = b.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = b.errors.emailFormat;
    if (!age) e.age = b.errors.age;
    else if (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 14)
      e.age = b.errors.ageRange;
    return e;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    setServerError(null);
    const result = await submitWaitlist({
      parent_name: name.trim(),
      email: email.trim().toLowerCase(),
      child_age: Number(age),
      interest: interest || undefined,
      lang,
    });
    setSubmitting(false);

    if (result === "error") {
      setServerError(b.errorGeneric);
      return;
    }
    // "ok" | "duplicate" | "skipped" → they're on the list either way.
    setSubmitted(true);
  };

  return (
    <section
      id="beta"
      className="relative scroll-mt-20 py-20 md:py-28"
    >
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
                <Sparkles className="h-3.5 w-3.5" /> {b.eyebrowLeft}
              </span>
              <h3 className="mt-4 text-balance text-[24px] font-bold leading-[1.28] tracking-tight sm:text-[28px]">
                {withBreaks(b.titleLeft)}
              </h3>

              <ul className="mt-8 space-y-3 text-[14.5px]">
                {b.bullets.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-none text-grape-600" />
                    <span className="text-ink-700">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-white/90 backdrop-blur clay-shadow-sm">
                <div className="flex -space-x-2">
                  {[
                    "from-sun-100 to-peach-200",
                    "from-mint-200 to-sky-200",
                    "from-rose-200 to-grape-200",
                  ].map((g, i) => (
                    <span
                      key={i}
                      className={`inline-block h-7 w-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-white`}
                    />
                  ))}
                </div>
                <p className="text-[12.5px] text-ink-700">
                  <span className="tabular font-semibold text-ink-900">{b.waitingStrong}</span>
                  {b.waitingRest}
                </p>
              </div>
            </div>
          </aside>

          <div className="p-8 md:p-10 lg:col-span-7">
            {submitted ? (
              <SuccessState
                onReset={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setAge("");
                  setInterest("");
                  setErrors({});
                }}
              />
            ) : (
              <>
                <SectionHeader
                  align="left"
                  eyebrow={b.eyebrowRight}
                  title={<>{b.titleRight}</>}
                />

                <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
                  <Field
                    label={b.fields.name}
                    icon={<User className="h-4 w-4" />}
                    error={errors.name}
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={b.fields.namePh}
                      autoComplete="name"
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-300"
                    />
                  </Field>

                  <Field
                    label={b.fields.email}
                    icon={<Mail className="h-4 w-4" />}
                    error={errors.email}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={b.fields.emailPh}
                      autoComplete="email"
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-300"
                    />
                  </Field>

                  <Field
                    label={b.fields.age}
                    icon={<Baby className="h-4 w-4" />}
                    error={errors.age}
                  >
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder={b.fields.agePh}
                      min={1}
                      max={14}
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-300"
                    />
                  </Field>

                  <Field
                    label={b.fields.interest}
                    icon={<Sparkles className="h-4 w-4" />}
                  >
                    <div className="relative w-full">
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full appearance-none bg-transparent pr-7 text-[15px] outline-none"
                      >
                        <option value="">{b.fields.interestPh}</option>
                        {b.interests.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                        aria-hidden
                      />
                    </div>
                  </Field>

                  {serverError && (
                    <p
                      role="alert"
                      className="rounded-2xl bg-rose-100/70 px-4 py-3 text-center text-[13px] font-medium text-rose-500 ring-1 ring-rose-200"
                    >
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grape-700 px-5 py-4 text-[15px] font-semibold text-white transition hover:bg-grape-800 disabled:cursor-not-allowed disabled:opacity-60 clay-shadow"
                  >
                    {submitting ? b.submitting : b.submit}
                    {!submitting && (
                      <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>

                  <p className="text-center text-[12px] leading-relaxed text-ink-400">
                    {b.terms}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink-700">{label}</span>
        {error && (
          <span className="text-[12px] font-medium text-rose-500">{error}</span>
        )}
      </span>
      <div
        className={[
          "flex items-center gap-2.5 rounded-2xl bg-cream-100/50 px-4 py-3.5 ring-1 transition focus-within:bg-white focus-within:ring-grape-400",
          error ? "ring-rose-300" : "ring-grape-100",
        ].join(" ")}
      >
        <span className="flex-none text-ink-400">{icon}</span>
        {children}
      </div>
    </label>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  const { t } = useLang();
  const s = t.beta.success;
  return (
    <div className="flex h-full min-h-[440px] flex-col items-center justify-center text-center">
      <div className="relative">
        <span className="absolute inset-0 -z-10 rounded-full bg-grape-200/60 blur-2xl" />
        <span className="cloud-shadow relative inline-flex h-24 w-24 items-center justify-center">
          <Cloud
            fill="#FFFFFF"
            rim="#F0DCCB"
            highlight="#FFFDF7"
            className="absolute inset-0 h-full w-full"
          />
          <CheckCircle2 className="relative h-9 w-9 text-grape-600" />
        </span>
      </div>
      <h3 className="mt-6 text-[22px] font-bold text-ink-900 sm:text-[26px]">
        {s.title}
      </h3>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-600">
        {s.body}
      </p>
      <button
        onClick={onReset}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-cream-100 px-5 py-2.5 text-[13.5px] font-semibold text-ink-700 ring-1 ring-grape-100 transition hover:bg-white"
      >
        {s.reset}
      </button>
    </div>
  );
}
