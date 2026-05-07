import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Sparkles, ChevronDown, Mail, User, Baby } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Cloud from "./Cloud";

const INTERESTS = [
  "창의성",
  "AI 시대 역량",
  "자기주도성",
  "표현력",
  "의미 있는 스크린 경험",
];

type Errors = Partial<Record<"name" | "email" | "age", string>>;

export default function BetaForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = "이름을 입력해 주세요.";
    if (!email.trim()) e.email = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "이메일 형식이 올바르지 않아요.";
    if (!age) e.age = "아이 나이를 입력해 주세요.";
    else if (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 14)
      e.age = "1~14 사이의 숫자를 입력해 주세요.";
    return e;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
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
          {/* Left intro panel — pastel clay cloud */}
          <aside
            className="relative overflow-hidden p-8 text-ink-900 md:p-10 lg:col-span-5"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ebe4ff 0%, #f7d7e3 55%, #ffe7dc 100%)",
            }}
          >
            <div className="blob -left-10 -top-10 h-56 w-56 bg-white/60" />
            <div className="blob -right-10 bottom-0 h-72 w-72 bg-sun-100/70" />

            {/* two calm drifting clouds */}
            <span
              className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-3 top-3 w-[110px] opacity-90"
              aria-hidden
            >
              <Cloud fill="#FFFFFF" highlight="#FBFAFF" className="block w-full" />
            </span>
            <span
              className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute bottom-4 right-4 w-[130px] opacity-80"
              aria-hidden
            >
              <Cloud fill="rgba(255,255,255,0.9)" highlight="#FBFAFF" className="block w-full" />
            </span>

            <div className="relative">
              <span className="font-display inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Beta Waitlist
              </span>
              <h3 className="mt-4 text-balance text-[24px] font-bold leading-[1.28] tracking-tight sm:text-[28px]">
                아이의 첫 AI 창의 경험,
                <br />
                먼저 만나보세요.
              </h3>

              <ul className="mt-8 space-y-3 text-[14.5px]">
                {[
                  "베타 가족 우선 초대",
                  "맞춤 미션 & 부모 리포트 샘플",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-none text-grape-600" />
                    <span className="text-ink-700">{t}</span>
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
                  <span className="tabular font-semibold text-ink-900">+1,200 가족</span>
                  이 먼저 기다리고 있어요
                </p>
              </div>
            </div>
          </aside>

          {/* Form panel */}
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
                  eyebrow="베타 신청"
                  title={<>30초면 충분해요.</>}
                />

                <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
                  <Field
                    label="부모 이름"
                    icon={<User className="h-4 w-4" />}
                    error={errors.name}
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="예: 김몽글"
                      autoComplete="name"
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-300"
                    />
                  </Field>

                  <Field
                    label="이메일"
                    icon={<Mail className="h-4 w-4" />}
                    error={errors.email}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      autoComplete="email"
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-300"
                    />
                  </Field>

                  <Field
                    label="아이 나이"
                    icon={<Baby className="h-4 w-4" />}
                    error={errors.age}
                  >
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="예: 6"
                      min={1}
                      max={14}
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-300"
                    />
                  </Field>

                  <Field
                    label="가장 관심 있는 영역 (선택)"
                    icon={<Sparkles className="h-4 w-4" />}
                  >
                    <div className="relative w-full">
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full appearance-none bg-transparent pr-7 text-[15px] outline-none"
                      >
                        <option value="">하나를 골라주세요</option>
                        {INTERESTS.map((opt) => (
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

                  <button
                    type="submit"
                    className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grape-700 px-5 py-4 text-[15px] font-semibold text-white transition hover:bg-grape-800 clay-shadow"
                  >
                    베타 신청하기
                    <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-[12px] leading-relaxed text-ink-400">
                    제출 시 안내 메일 수신에 동의합니다. 베타 운영 목적 외에 사용되지 않아요.
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
  return (
    <div className="flex h-full min-h-[440px] flex-col items-center justify-center text-center">
      <div className="relative">
        <span className="absolute inset-0 -z-10 rounded-full bg-grape-200/60 blur-2xl" />
        <span className="cloud-shadow relative inline-flex h-24 w-24 items-center justify-center">
          <Cloud
            fill="#FFFFFF"
            rim="#EBE4FF"
            highlight="#FBFAFF"
            className="absolute inset-0 h-full w-full"
          />
          <CheckCircle2 className="relative h-9 w-9 text-grape-600" />
        </span>
      </div>
      <h3 className="mt-6 text-[22px] font-bold text-ink-900 sm:text-[26px]">
        신청이 완료되었어요.
      </h3>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-600">
        가장 먼저 베타 소식을 보내드릴게요.
      </p>
      <button
        onClick={onReset}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-cream-100 px-5 py-2.5 text-[13.5px] font-semibold text-ink-700 ring-1 ring-grape-100 transition hover:bg-white"
      >
        다른 아이 신청하기
      </button>
    </div>
  );
}
