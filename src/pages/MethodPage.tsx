import { Lightbulb, Wand2, Brain, MessageCircle, Compass, Repeat } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import Cloud from "../components/Cloud";
import { useLang } from "../i18n/LanguageContext";
import { breadcrumbSchema, educationalAppSchema, webPageSchema } from "../seo/schema";

const COPY = {
  ko: {
    eyebrow: "OUR METHOD",
    title: "정답이 아닌 질문에서 시작합니다.",
    sub: "몽글키즈는 STEAM, AI, 그리고 4대 역량을 어떻게 한 흐름으로 엮을까요?",
    intro:
      "단편적인 학습 콘텐츠는 이미 충분합니다. 우리는 ‘오늘 무엇을 했는가’가 아니라 ‘아이가 어떤 흐름으로 자라는가’를 만드는 데 집중합니다. 미션, 대화, 창작, 그리고 부모 리포트까지. 모든 요소가 하나의 성장 흐름으로 연결됩니다.",
    pillarsTitle: "4대 핵심 역량",
    pillarsBody:
      "몽글키즈의 모든 미션은 아래 4대 역량 중 하나 이상을 자극하도록 설계됩니다. 점수가 아니라 흐름으로 보여드립니다.",
    pillars: [
      {
        icon: Lightbulb,
        title: "문제해결력 (Problem-solving)",
        body: "정답이 정해지지 않은 작은 상황을 마주하고, 자기만의 방식으로 해결을 시도하는 힘.",
      },
      {
        icon: Wand2,
        title: "창의력 (Creativity)",
        body: "‘이런 건 어떨까?’ 라고 떠올리고, 기존에 없던 조합을 만들어내는 힘.",
      },
      {
        icon: Compass,
        title: "자기주도성 (Self-direction)",
        body: "다음 단계를 어른이 알려주기 전에, 스스로 골라보고 시도해보는 힘.",
      },
      {
        icon: MessageCircle,
        title: "표현력 (Expression)",
        body: "내가 만든 것을 말, 그림, 이야기로 다른 사람에게 보여주는 힘.",
      },
    ],
    blocks: [
      {
        eyebrow: "STEAM",
        title: "분리하지 않습니다.",
        body: "과학(S), 기술(T), 공학(E), 예술(A), 수학(M)을 따로 가르치지 않고 하나의 미션 안에서 자연스럽게 만나도록 설계합니다. 예를 들어 ‘다리 만들기’ 미션은 공학 + 창의 + 문제해결이 동시에 일어나는 활동입니다. 아이는 STEAM이라는 이름조차 모른 채로 STEAM을 경험합니다.",
      },
      {
        eyebrow: "AI 컴패니언",
        title: "정답이 아닌 좋은 질문.",
        body: "일반 AI 튜터는 빠르고 정확한 답을 줍니다. 몽글의 AI는 그 반대입니다. ‘왜 그렇게 생각했어?’, ‘그러면 다음엔 뭐가 일어날까?’, ‘다른 방법은 없을까?’처럼 다음 한 발자국을 묻는 질문으로 아이의 생각을 한 단계 더 펼쳐줍니다.",
      },
      {
        eyebrow: "메모리",
        title: "아이를 기억합니다.",
        body: "매번 새로 시작하지 않습니다. 아이의 관심사, 표현 방식, 이전 창작물을 기억하고, 다음 미션에 자연스럽게 반영합니다. 시간이 지날수록 ‘우리 아이만의 학습 흐름’이 만들어집니다.",
      },
      {
        eyebrow: "미션 디자인",
        title: "보상보다 표현.",
        body: "한 번의 미션은 짧고 명확합니다. 별 개수와 진도율보다, 아이가 ‘오늘 무엇을 만들어 보여줬는가’를 더 중요하게 봅니다. 진도가 아닌 흐름. 결과가 아닌 표현.",
      },
      {
        eyebrow: "능동성",
        title: "보는 시간이 아닌, 만드는 시간.",
        body: "아이가 보기만 하는 것이 아니라 말하고, 고르고, 만들고, 설명하며 참여합니다. 같은 화면 시간이 표현과 창작의 시간으로 바뀝니다.",
      },
      {
        eyebrow: "부모 리포트",
        title: "‘무엇을’ 대신 ‘어떻게’.",
        body: "부모는 아이가 무슨 미션을 끝냈는지보다 어떻게 자라고 있는지를 보고 싶어 합니다. 몽글키즈의 리포트는 4대 역량의 변화, 관심사 흐름, 몰입 패턴을 한 결로 보여드립니다.",
      },
    ],
    icons: [Brain, MessageCircle, Repeat, Wand2, Compass, Lightbulb],
  },
  en: {
    eyebrow: "OUR METHOD",
    title: "We start from a question, not the answer.",
    sub: "How MongleKids weaves STEAM, AI, and four core competencies into one growth flow.",
    intro:
      "There are already plenty of bite-sized learning apps. We focus on something else: not “what did the child do today,” but “how is this child growing over time.” Missions, conversation, creation, and the parent report — every piece connects into one continuous arc.",
    pillarsTitle: "Four core competencies",
    pillarsBody:
      "Every MongleKids mission is designed to nudge at least one of these four. We show them as a flow over time, not a score.",
    pillars: [
      {
        icon: Lightbulb,
        title: "Problem-solving",
        body: "Meeting a small situation without a fixed answer, and trying to resolve it your own way.",
      },
      {
        icon: Wand2,
        title: "Creativity",
        body: "Asking “what if…” and assembling combinations that didn't exist before.",
      },
      {
        icon: Compass,
        title: "Self-direction",
        body: "Choosing the next step yourself, before an adult tells you what comes next.",
      },
      {
        icon: MessageCircle,
        title: "Expression",
        body: "Showing what you made — through words, drawings, or stories — to someone else.",
      },
    ],
    blocks: [
      {
        eyebrow: "STEAM",
        title: "We don't separate the letters.",
        body: "Science, Technology, Engineering, Arts, and Math don't sit in different drawers here. A single mission like “build a bridge” quietly brings engineering, creativity, and problem-solving together at once. The child experiences STEAM without ever needing to hear the word.",
      },
      {
        eyebrow: "AI COMPANION",
        title: "Better questions, not faster answers.",
        body: "A typical AI tutor races to the correct answer. Our AI does the opposite — “why did you think that?”, “what happens next?”, “is there another way?” — questions that take a small idea one more step.",
      },
      {
        eyebrow: "MEMORY",
        title: "It remembers the child.",
        body: "We don't start from zero each time. Interests, ways of speaking, things they made before — all of it shapes the next mission. Over weeks, a personal arc starts to form.",
      },
      {
        eyebrow: "MISSION DESIGN",
        title: "Expression over rewards.",
        body: "Each mission is short and clear. We care less about stars or progress percentage, more about “what did the child make and show today.” Flow, not progress. Expression, not output.",
      },
      {
        eyebrow: "ACTIVE PLAY",
        title: "Making, not just watching.",
        body: "The child speaks, chooses, builds, and explains — actively, every time. The same screen minutes become expression and creation minutes.",
      },
      {
        eyebrow: "PARENT REPORT",
        title: "“How,” not “what.”",
        body: "Parents want to see how their child is growing — not a checklist of finished missions. Our report shows the four competencies over time, shifting interests, and focus patterns, all in one calm view.",
      },
    ],
    icons: [Brain, MessageCircle, Repeat, Wand2, Compass, Lightbulb],
  },
} as const;

export default function MethodPage() {
  const { lang } = useLang();
  const c = COPY[lang];

  const seo =
    lang === "ko"
      ? {
          title: "Method · 몽글키즈 교육 철학 | STEAM 교육 · AI 교육 · 4대 역량",
          description:
            "몽글키즈는 STEAM, AI, 4대 역량(문제해결 · 창의 · 자기주도 · 표현)을 하나의 성장 흐름으로 엮습니다. 정답이 아닌 좋은 질문, 보는 시간이 아닌 만드는 시간.",
        }
      : {
          title: "Method · How MongleKids Teaches | STEAM, AI, Four Core Competencies",
          description:
            "MongleKids weaves STEAM, AI, and four competencies — problem-solving, creativity, self-direction, expression — into one growth flow. Better questions, active making, growth that's visible.",
        };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/method"
        jsonLd={[
          educationalAppSchema(),
          webPageSchema({
            url: "/method",
            name: seo.title,
            description: seo.description,
            inLanguage: lang === "ko" ? "ko-KR" : "en-US",
          }),
          breadcrumbSchema([
            { name: lang === "ko" ? "홈" : "Home", url: "/" },
            { name: "Method", url: "/method" },
          ]),
        ]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="blob -left-32 top-24 h-[420px] w-[420px] bg-grape-200" />
          <div className="blob right-[-120px] top-[-60px] h-[380px] w-[380px] bg-rose-200" />
          <span
            className="animate-drift cloud-shadow-sm pointer-events-none absolute -left-6 top-28 hidden w-[140px] sm:block"
            aria-hidden
          >
            <Cloud fill="#FFFFFF" highlight="#FFFDF7" className="block w-full" />
          </span>
          <span
            className="animate-drift-reverse cloud-shadow-sm pointer-events-none absolute right-8 top-10 hidden w-[110px] md:block"
            aria-hidden
          >
            <Cloud fill="#FBE8D8" highlight="#FFF6EE" className="block w-full" />
          </span>

          <div className="container-page relative">
            <div className="max-w-3xl">
              <span className="font-display inline-flex items-center gap-2 rounded-full bg-grape-50 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
                {c.eyebrow}
              </span>
              <h1 className="mt-4 text-balance text-[32px] font-bold leading-[1.22] tracking-tight text-ink-900 sm:text-[40px] md:text-[48px]">
                {c.title}
              </h1>
              <p className="mt-3 text-balance text-[16px] text-ink-600 md:text-[18px]">
                {c.sub}
              </p>
              <p className="mt-6 max-w-2xl text-balance text-[15.5px] leading-[1.78] text-ink-700 md:text-[16.5px]">
                {c.intro}
              </p>
            </div>
          </div>
        </section>

        {/* 4 Pillars */}
        <section className="relative pb-16 md:pb-24">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-balance text-[24px] font-bold tracking-tight text-ink-900 md:text-[30px]">
                {c.pillarsTitle}
              </h2>
              <p className="mt-3 text-[15.5px] leading-[1.78] text-ink-600 md:text-[16.5px]">
                {c.pillarsBody}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
              {c.pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.title}
                    className="rounded-3xl bg-white p-6 ring-1 ring-grape-100/70 clay-shadow-sm"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-grape-200 to-rose-100 text-grape-700">
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <h3 className="mt-5 text-[18px] font-semibold text-ink-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-[1.78] text-ink-600">
                      {p.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Method blocks */}
        <section className="relative pb-24 md:pb-32">
          <div className="container-page">
            <div className="mx-auto max-w-3xl space-y-10 md:space-y-14">
              {c.blocks.map((b, i) => {
                const Icon = c.icons[i % c.icons.length];
                return (
                  <article
                    key={b.title}
                    className="border-t border-grape-100/70 pt-10 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-grape-50 text-grape-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700">
                        {b.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-4 text-balance text-[22px] font-semibold leading-[1.32] text-ink-900 md:text-[26px]">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-[1.78] text-ink-700 md:text-[16.5px]">
                      {b.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
