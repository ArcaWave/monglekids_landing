import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLang } from "../i18n/LanguageContext";
import { breadcrumbSchema, faqSchema, webPageSchema } from "../seo/schema";

type Item = { q: string; a: string };
type Category = { title: string; items: Item[] };

const COPY = {
  ko: {
    eyebrow: "FAQ",
    title: "자주 묻는 질문",
    sub: "신청 전에 부모님들이 가장 자주 묻는 것들을 카테고리별로 모았어요.",
    categories: [
      {
        title: "서비스 소개",
        items: [
          {
            q: "몽글키즈는 어떤 서비스인가요?",
            a: "5–9세 아이를 위한 AI 창의 성장 동반자입니다. 매일 도착하는 작은 미션과 AI와의 대화 속에서 창의력 · 질문력 · 자기주도성 · 표현력을 키울 수 있도록 설계된 STEAM · AI 교육 경험을 제공합니다.",
          },
          {
            q: "AI 튜터와는 어떻게 다른가요?",
            a: "정답을 빨리 알려주는 튜터가 아닌, 좋은 질문으로 아이의 생각을 한 단계 더 펼쳐주는 창의 동반자입니다. ‘왜 그렇게 생각했어?’ 같은 질문으로 아이가 스스로 답을 만들어가는 흐름을 만듭니다.",
          },
          {
            q: "기존 학습 앱과 어떻게 다른가요?",
            a: "정해진 콘텐츠를 일방적으로 보여주는 앱이 아니라, 아이와 함께 매일의 작은 창작을 만드는 플랫폼입니다. ‘오늘 무엇을 했나’가 아니라 ‘아이가 어떻게 자라고 있나’를 중심에 둡니다.",
          },
        ],
      },
      {
        title: "교육 방식",
        items: [
          {
            q: "성장 효과는 어떻게 확인하나요?",
            a: "부모 리포트를 통해 아이의 관심사, 질문 패턴, 창작 시도, 몰입 흐름을 한눈에 보여드립니다. 점수가 아니라 시간 위에 쌓이는 흐름으로 보여드려요.",
          },
          {
            q: "스크린 타임이 더 늘어나는 것 아닌가요?",
            a: "보는 시간이 아니라 말하고, 만들고, 설명하는 시간입니다. 같은 화면 시간이 ‘만드는 시간’으로 바뀌는 것이 우리의 목표예요.",
          },
          {
            q: "부모가 함께 해야 하나요?",
            a: "혼자서도 충분히 사용할 수 있도록 설계되어 있습니다. 다만 일주일에 한 번 부모 리포트를 함께 보거나, 아이가 만든 캐릭터에 대해 함께 이야기 나누는 시간이 있으면 효과가 훨씬 깊어집니다.",
          },
        ],
      },
      {
        title: "이용 조건",
        items: [
          {
            q: "베타 기간 가격은 얼마인가요?",
            a: "베타 기간 동안은 무료로 제공됩니다. 정식 출시 시점에는 부모 리포트 등 일부 프리미엄 기능이 유료로 전환될 수 있으나, 베타 가족에게는 별도의 혜택과 가격 안내를 미리 드릴 예정입니다.",
          },
          {
            q: "어떤 기기에서 사용할 수 있나요?",
            a: "현재 iOS, Android, Web 환경을 지원합니다. 베타 단계에서는 일부 기능이 특정 플랫폼부터 순차적으로 열릴 수 있습니다.",
          },
          {
            q: "인터넷이 없어도 사용할 수 있나요?",
            a: "AI 대화와 부모 리포트 기능은 인터넷 연결이 필요합니다. 카메라 기반 미션이나 일부 창작 활동은 기기 내에서 처리되어 오프라인에서도 일부 동작합니다.",
          },
          {
            q: "한 부모 계정에서 여러 자녀를 등록할 수 있나요?",
            a: "네, 형제·자매 여러 명을 한 부모 계정에서 각각의 프로파일로 등록할 수 있도록 설계 중입니다. 각 자녀의 학습 흐름과 부모 리포트가 별도로 관리됩니다.",
          },
          {
            q: "한국어 외에 영어로도 사용할 수 있나요?",
            a: "네, 한국어와 영어 두 언어를 지원합니다. 우측 상단의 언어 토글로 바꿀 수 있어요. 추가 언어는 점진적으로 확장할 예정입니다.",
          },
        ],
      },
      {
        title: "개인정보 보호",
        items: [
          {
            q: "자녀의 개인정보는 어떻게 보호되나요?",
            a: "광고 표시 없음, 사용자 추적 없음, 광고 식별자 사용 없음, 제3자 분석 도구 없음. 카메라 영상과 사진은 저장하지 않고 기기 내에서만 처리합니다. 자세한 내용은 개인정보처리방침 페이지를 참고해주세요.",
          },
          {
            q: "데이터는 어디에 저장되나요?",
            a: "기본적으로 닉네임 · 미션 진행 · 별 · 뱃지 등은 사용자 기기에만 저장됩니다. 부모 리포트 확인이나 공유 기능을 명시적으로 사용한 경우에만 일부 정보가 Supabase 기반의 회사 서버에 안전하게 보관됩니다.",
          },
        ],
      },
      {
        title: "베타 프로그램",
        items: [
          {
            q: "베타에서는 무엇을 체험할 수 있나요?",
            a: "맞춤 창작 미션, AI 친구와의 대화, 부모 리포트 샘플을 순차적으로 제공해드립니다. 베타 가족의 피드백을 바탕으로 경험을 함께 다듬어가요.",
          },
          {
            q: "베타 종료 후에는 어떻게 되나요?",
            a: "베타 가족에게는 정식 출시 전에 별도로 안내드리며, 베타 참여에 대한 감사로 별도의 우선 혜택을 준비하고 있습니다.",
          },
          {
            q: "베타 신청은 어떻게 하나요?",
            a: "메인 페이지의 ‘베타 신청하기’ 버튼을 통해 부모 이름, 이메일, 자녀 나이를 가볍게 알려주시면 됩니다. 30초 내외면 충분해요.",
          },
        ],
      },
    ] satisfies Category[],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    sub: "The questions parents ask the most before signing up, grouped by topic.",
    categories: [
      {
        title: "About the service",
        items: [
          {
            q: "What is MongleKids?",
            a: "An AI creative growth companion for kids 5–9. Through daily missions and conversations with an AI friend, kids grow creativity, curiosity, self-direction, and expression — a STEAM and AI learning experience designed around the child.",
          },
          {
            q: "How is it different from an AI tutor?",
            a: "Not a tutor that rushes to the right answer — a creative companion that opens up the child's thinking with better questions like “why did you think that?” The child arrives at their own answer, with help.",
          },
          {
            q: "How does it differ from existing learning apps?",
            a: "It's not an app that pushes pre-made content. It's a platform where you and your child build daily creative moments together. The focus isn't “what did the child do today,” but “how is the child growing.”",
          },
        ],
      },
      {
        title: "Educational approach",
        items: [
          {
            q: "How do you measure growth?",
            a: "The parent report shows your child's interests, question patterns, creative attempts, and focus over time — as a flow rather than a score.",
          },
          {
            q: "Won't this just add to screen time?",
            a: "It turns watching time into speaking, making, and explaining time. The same minutes, made meaningful — that's the goal.",
          },
          {
            q: "Do parents need to participate?",
            a: "It's designed so kids can use it on their own. That said, looking at the weekly parent report together or chatting about the characters your child made deepens the experience considerably.",
          },
        ],
      },
      {
        title: "Practical questions",
        items: [
          {
            q: "How much does the beta cost?",
            a: "The beta is free. At full launch, some premium features (like the parent report) may become paid, but beta families will get advance notice and dedicated benefits.",
          },
          {
            q: "What devices does it run on?",
            a: "iOS, Android, and Web. During the beta, some features may roll out platform by platform.",
          },
          {
            q: "Do I need internet?",
            a: "AI conversations and the parent report require an internet connection. Camera-based missions and some creative activities run on-device and partially work offline.",
          },
          {
            q: "Can siblings share one parent account?",
            a: "Yes — multiple children can have their own profile under a single parent account. Each child's growth flow and parent report are tracked separately.",
          },
          {
            q: "Is it available in English?",
            a: "Yes, both Korean and English are supported. Use the language toggle at the top right. More languages will follow over time.",
          },
        ],
      },
      {
        title: "Privacy",
        items: [
          {
            q: "How is my child's information protected?",
            a: "No ads, no user tracking, no advertising identifiers, no third-party analytics. Camera video and photos are processed on device and not stored. See the privacy policy page for full detail.",
          },
          {
            q: "Where is data stored?",
            a: "By default, nickname, mission progress, stars, and badges are stored only on the user's device. Only when you explicitly use the parent report viewing or sharing feature does any data get securely stored on our Supabase-backed servers.",
          },
        ],
      },
      {
        title: "Beta program",
        items: [
          {
            q: "What's included in the beta?",
            a: "Tailored creative missions, AI conversations, and parent report samples — rolled out gradually. Beta family feedback shapes how we refine the experience.",
          },
          {
            q: "What happens after the beta?",
            a: "Beta families will be notified before public launch. As a thank-you, we're preparing special priority benefits for beta participants.",
          },
          {
            q: "How do I sign up for the beta?",
            a: "Use the “Join the Beta” button on the homepage and share your name, email, and your child's age. It takes about 30 seconds.",
          },
        ],
      },
    ] satisfies Category[],
  },
} as const;

export default function FAQPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [open, setOpen] = useState<string | null>(`0-0`);

  // Flat list for FAQ schema
  const flat = c.categories.flatMap((cat) => cat.items);

  const seo =
    lang === "ko"
      ? {
          title: "FAQ · 몽글키즈 자주 묻는 질문 | 유아교육 · AI 교육 · STEAM",
          description:
            "몽글키즈에 대해 부모님들이 가장 자주 묻는 질문을 카테고리별로 정리했습니다. 서비스 소개, 교육 방식, 이용 조건, 개인정보 보호, 베타 프로그램.",
        }
      : {
          title: "FAQ · MongleKids Questions Parents Ask | Early Education, AI, STEAM",
          description:
            "What parents ask most about MongleKids — organized by topic: about the service, educational approach, practical questions, privacy, and the beta program.",
        };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/faq"
        jsonLd={[
          webPageSchema({
            url: "/faq",
            name: seo.title,
            description: seo.description,
            inLanguage: lang === "ko" ? "ko-KR" : "en-US",
          }),
          faqSchema(flat),
          breadcrumbSchema([
            { name: lang === "ko" ? "홈" : "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
        ]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-12 pb-12 md:pt-20 md:pb-16">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <span className="font-display inline-flex items-center gap-2 rounded-full bg-grape-50 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
                {c.eyebrow}
              </span>
              <h1 className="mt-4 text-balance text-[32px] font-bold leading-[1.22] tracking-tight text-ink-900 sm:text-[38px] md:text-[44px]">
                {c.title}
              </h1>
              <p className="mt-3 text-balance text-[15.5px] text-ink-600 md:text-[16.5px]">
                {c.sub}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ categories */}
        <section className="relative pb-24 md:pb-32">
          <div className="container-page">
            <div className="mx-auto max-w-3xl space-y-12">
              {c.categories.map((cat, ci) => (
                <div key={cat.title}>
                  <h2 className="font-display mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-grape-700">
                    {cat.title}
                  </h2>
                  <div className="divide-y divide-grape-100/70 overflow-hidden rounded-[24px] bg-white ring-1 ring-grape-100/70 clay-shadow-sm">
                    {cat.items.map((item, ii) => {
                      const id = `${ci}-${ii}`;
                      const isOpen = open === id;
                      return (
                        <div key={item.q}>
                          <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : id)}
                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-cream-100/40 sm:px-6"
                            aria-expanded={isOpen}
                          >
                            <span className="text-[15px] font-semibold text-ink-900 sm:text-[16px]">
                              {item.q}
                            </span>
                            <span
                              className={[
                                "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full transition",
                                isOpen
                                  ? "bg-grape-600 text-white"
                                  : "bg-grape-50 text-grape-700",
                              ].join(" ")}
                            >
                              {isOpen ? (
                                <Minus className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </span>
                          </button>
                          <div
                            className={[
                              "grid overflow-hidden transition-all duration-300 ease-out",
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0",
                            ].join(" ")}
                          >
                            <div className="min-h-0">
                              <p className="px-5 pb-6 text-[14.5px] leading-[1.78] text-ink-600 sm:px-6">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
