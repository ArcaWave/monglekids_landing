import { ArrowLeft, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { breadcrumbSchema, webPageSchema } from "../seo/schema";
import { SITE } from "../seo/site";

const EFFECTIVE_DATE_KO = "2026년 6월 13일";
const EFFECTIVE_DATE_EN = "June 13, 2026";
const BIZ_NO = SITE.operator.bizRegNo;
const EMAIL = SITE.contact.email;

function MailLink() {
  return (
    <a
      className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
      href={`mailto:${EMAIL}`}
    >
      {EMAIL}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="개인정보처리방침 · 몽글키즈 (MongleKids Privacy Policy)"
        description="몽글키즈(Monglekids) 개인정보처리방침. 아르카웨이브(Arcawave)가 운영하는 만 4–9세 어린이용 창의융합·AI 교육 서비스의 개인정보 수집·이용·보관·보호 정책 (한국어 + English)."
        path="/privacy"
        jsonLd={[
          webPageSchema({
            url: "/privacy",
            name: "Privacy Policy · 몽글키즈",
            description:
              "MongleKids privacy policy. Bilingual (Korean + English).",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Privacy Policy", url: "/privacy" },
          ]),
        ]}
      />
      <Header />

      <main className="container-page max-w-3xl py-14 md:py-20">
        {/* Back link */}
        <Link
          to="/"
          className="font-display mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-grape-700 transition hover:text-grape-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          홈으로 / Back to home
        </Link>

        {/* Hero */}
        <header className="mb-12">
          <span className="font-display inline-flex items-center gap-2 rounded-full bg-grape-50 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
            Privacy Policy
          </span>
          <h1 className="mt-4 text-balance text-[28px] font-bold leading-[1.28] tracking-tight text-ink-900 sm:text-[34px]">
            몽글키즈(Monglekids) 개인정보처리방침
            <br />
            <span className="text-ink-700">Monglekids Privacy Policy</span>
          </h1>

          <dl className="mt-6 space-y-1.5 text-[14px] text-ink-700">
            <Meta
              label="시행일 / Effective Date"
              value={`${EFFECTIVE_DATE_KO} / ${EFFECTIVE_DATE_EN}`}
            />
            <Meta
              label="최종 수정일 / Last Updated"
              value={`${EFFECTIVE_DATE_KO} / ${EFFECTIVE_DATE_EN}`}
            />
            <Meta label="운영자 / Operator" value="아르카웨이브 (Arcawave)" />
            <Meta label="대표 / Representative" value="두지언 (Doo Jieon)" />
            <Meta label="사업자등록번호 / Business Reg. No." value={BIZ_NO} />
            <Meta
              label="연락처 / Contact"
              value={<MailLink />}
            />
            <Meta
              label="웹사이트 / Website"
              value={
                <a
                  className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
                  href="https://www.monglekids.com"
                >
                  https://www.monglekids.com
                </a>
              }
            />
          </dl>
        </header>

        {/* Table of contents */}
        <nav
          aria-label="목차"
          className="mb-14 rounded-3xl bg-white p-5 ring-1 ring-grape-100/70 clay-shadow-sm sm:p-6"
        >
          <h2 className="font-display text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700">
            목차 / Contents
          </h2>
          <ol className="mt-3 grid grid-cols-1 gap-1 text-[14.5px] font-medium text-ink-700 sm:grid-cols-2">
            <TOCItem href="#summary">1. 상단 요약 / Summary</TOCItem>
            <TOCItem href="#kr">2. 한국어 개인정보처리방침</TOCItem>
            <TOCItem href="#en">3. English Privacy Policy</TOCItem>
            <TOCItem href="#contact">4. Contact / 연락처</TOCItem>
          </ol>
        </nav>

        {/* ---------- 1. SUMMARY ---------- */}
        <Section id="summary" title="1. 상단 요약 / Summary">
          <P>
            몽글키즈(Monglekids)는 만 4세부터 9세까지의 어린이를 위한 창의융합(STEAM) 교육
            서비스입니다. 아이들은 미션 형식으로 다리 만들기, 색 찾기, 손 동작 인식 등 창의적인
            학습 활동을 하고, AI 캐릭터와 소통하며 놀이로 배웁니다. 몽글키즈는 어린이의 개인정보를
            가능한 적게 처리하며, 카메라 영상과 음성 원본은 가능한 한 기기 내부에서만 처리하고
            저장하지 않습니다.
          </P>

          <H3>핵심 요약 / Key Summary</H3>
          <div className="my-5 overflow-hidden rounded-2xl ring-1 ring-grape-100 clay-shadow-sm">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-cream-100/60">
                <tr>
                  <th className="w-[34%] border-b border-grape-100/70 px-4 py-3 font-semibold text-ink-800">
                    항목 / Item
                  </th>
                  <th className="border-b border-grape-100/70 px-4 py-3 font-semibold text-ink-800">
                    내용 / Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUMMARY_ROWS.map((row, i) => (
                  <tr
                    key={row.k}
                    className={i % 2 === 0 ? "bg-white" : "bg-cream-50/50"}
                  >
                    <td className="border-b border-grape-100/50 px-4 py-3 font-semibold text-ink-800">
                      {row.k}
                    </td>
                    <td className="border-b border-grape-100/50 px-4 py-3 text-ink-700">
                      {row.v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H3>어린이와 부모님께 드리는 쉬운 설명</H3>
          <P>
            몽글키즈는 아이가 카메라로 색을 찾거나 손동작 미션을 할 때 카메라 영상을 저장하지
            않습니다. 카메라·마이크는 손동작 좌표나 인식된 텍스트 같은 “파생 신호”만 만드는 데
            쓰이고, 원본 영상·사진·음성은 기기 안에서만 처리되며 저장하지 않습니다.
          </P>
          <P>
            보호자 계정(이메일·소셜 로그인)과 아이 프로필(닉네임, 출생연도, 선택 시 성별),
            그리고 학습 활동 기록·보호자 리포트 데이터는 서비스 제공을 위해 서버에 저장될 수
            있습니다. 몽글키즈는 광고를 보여주지 않고, 광고 목적의 추적을 하지 않으며, 개인정보를
            판매하지 않습니다. 다만 서비스·AI 품질 개선을 위해 비식별·집계 데이터와 오류 진단
            정보(Sentry)를 이용할 수 있습니다.
          </P>

          <H3>English Summary</H3>
          <P>
            Monglekids is a creative-convergence (STEAM) education service for children aged 4 to
            9. We do not show ads, do not track users for advertising, do not use advertising
            identifiers, and do not sell personal information. Raw camera video, photos, and voice
            recordings are processed on device whenever possible and are not stored. We may use
            de-identified, aggregate data and crash-diagnostic information (Sentry) to improve our
            service and AI quality.
          </P>
        </Section>

        {/* ---------- 2. KOREAN POLICY ---------- */}
        <Section id="kr" title="2. 한국어 개인정보처리방침">
          <H3>몽글키즈(Monglekids) 개인정보처리방침</H3>
          <P>시행일 · 최종 수정일: {EFFECTIVE_DATE_KO}</P>
          <P>
            아르카웨이브(Arcawave)(이하 “회사”)는 어린이를 위한 창의융합(STEAM)·AI 교육
            서비스인 몽글키즈(Monglekids)(이하 “서비스”)를 운영합니다. 본 개인정보처리방침은
            iOS, Android, Web에서 제공되는 서비스가 어떤 정보를 처리하고, 그 정보를 어떻게
            사용하고 보호하는지 설명합니다.
          </P>
          <P>
            회사는 어린이의 개인정보 보호를 매우 중요하게 생각합니다. 회사는 대한민국 개인정보
            보호법(PIPA), 미국 아동 온라인 개인정보 보호법(COPPA), 유럽 개인정보 보호법(GDPR),
            미국 캘리포니아 소비자 개인정보 보호법(CCPA) 등 적용 가능한 개인정보 보호 법령과
            앱마켓 정책을 준수하기 위해 노력합니다.
          </P>

          <H3>1. 개요</H3>
          <P>
            몽글키즈는 만 4세부터 9세까지의 어린이를 위해 설계된 교육 서비스입니다. 서비스는 미션
            형식의 창의융합(STEAM) 학습 활동을 제공하며, 아이는 AI 캐릭터와 소통하며 놀이로
            배웁니다. 예를 들어 어린이는 다리 만들기, 색 찾기, 손 동작 인식 활동 등을 수행할 수
            있습니다.
          </P>
          <P>
            서비스는 학습 활동 안에서 문제해결력, 창의력, 자기주도성, 표현력 등 역량을 확인하고,
            미션 완료 후 보호자가 볼 수 있는 활동 리포트를 제공할 수 있습니다.
          </P>
          <P>
            회사는 어린이 개인정보를 가능한 한 적게 처리합니다. 카메라·음성의 원본은 가능한 범위
            에서 기기 내부에서만 처리되고 저장하지 않으며, 서버에는 서비스 제공에 필요한 최소한의
            정보만 저장됩니다.
          </P>

          <H3>2. 수집하는 정보</H3>
          <P>회사는 서비스 제공을 위해 아래 정보를 처리할 수 있습니다.</P>

          <H4>2.1 보호자 계정 정보</H4>
          <UL
            items={[
              "이메일 주소",
              "소셜 로그인 식별자 (Apple, Google, Kakao 등 이용 시 제공되는 계정 식별자)",
            ]}
          />

          <H4>2.2 아이 프로필 정보 (최소)</H4>
          <UL
            items={[
              "닉네임",
              "출생연도",
              "성별 (선택 입력)",
            ]}
          />
          <P>아이 프로필은 보호자가 입력하며, 서비스 제공에 필요한 최소한으로 처리됩니다.</P>

          <H4>2.3 활동 · 상호작용 기록</H4>
          <P>
            학습 활동 과정에서 진행·완료 여부, 소요 시간, 재시도, 선택, 정답 여부, 별, 뱃지 등
            학습 활동 기록이 생성·저장될 수 있습니다.
          </P>

          <H4>2.4 카메라 · 음성의 파생 신호 (원본 미저장)</H4>
          <P>
            서비스는 색 찾기, 손 동작 인식, 음성 입력 등을 위해 카메라와 마이크를 사용할 수
            있습니다. 이때 회사는 아래와 같은 <strong>파생 신호</strong>만 처리하며, 원본 영상·사진·음성은
            기기 내에서만 처리되고 저장하지 않습니다.
          </P>
          <UL
            items={[
              "카메라 파생 신호: 손동작 좌표, 제스처 라벨, 인식 성공 여부",
              "음성 파생 신호: 인식된 전사 텍스트, 응답 라벨",
            ]}
          />
          <P>
            카메라 영상·사진·음성 원본은 Apple Vision Framework 등 기기 내 처리 기술로 실시간
            처리되며, 회사 서버로 전송되거나 저장되지 않습니다.
          </P>

          <H4>2.5 AI 기능 사용 기록</H4>
          <P>
            대화형 AI 기능 사용 시, 기능 제공과 품질 개선을 위해 AI 기능 사용 기록 및 (비식별)
            입력·응답 로그가 처리될 수 있습니다.
          </P>

          <H4>2.6 기기 · 진단 정보</H4>
          <P>
            서비스 안정성과 오류 개선을 위해 기기 종류, 운영체제(OS), 앱 버전, 언어, 크래시·성능
            정보 등 진단 정보가 처리될 수 있습니다. 크래시·오류 진단에는 Sentry를 사용하며,
            개인식별정보가 포함되지 않도록 설정합니다.
          </P>

          <H4>2.7 회사가 수집하지 않는 정보</H4>
          <UL
            items={[
              "원시 카메라 영상 · 사진, 원시 음성 녹음 (기기 내에서만 처리, 서버 저장 안 함)",
              "정밀 위치 정보",
              "연락처",
              "광고 추적 식별자 (IDFA, AAID 등)",
            ]}
          />
          <P>
            서비스는 현재 무료로 제공됩니다. 향후 인앱결제가 도입되는 경우, 결제는 Apple App
            Store 또는 Google Play 등 앱마켓 결제 시스템을 통해 처리될 수 있으며, 회사는 결제
            카드 번호를 직접 저장하지 않습니다. 인앱결제 도입 시 본 방침과 앱마켓 개인정보 표시를
            업데이트합니다.
          </P>

          <H3>3. 이용 목적</H3>
          <P>회사는 정보를 다음 목적을 위해 사용합니다.</P>
          <UL
            items={[
              "서비스 제공 및 아동 맞춤 콘텐츠 제공",
              "학습 진행 상태 저장 및 별 · 뱃지 등 학습 성취 표시",
              "보호자 리포트 생성",
              "카메라 · 음성 · 손 동작 인식 등 앱 기능 및 AI 기능 제공",
              "비식별 · 집계 데이터를 통한 교육 기능 및 서비스 · AI 품질 개선 · 개발",
              "서비스 보안 유지, 부정 접근 방지, 오류 방지 및 안정성 유지",
              "법령 및 앱마켓 정책 준수",
            ]}
          />
          <P>
            회사는 어린이 정보를 광고, 맞춤형 광고, 광고 목적의 사용자 추적, 또는 판매 목적으로
            사용하지 않습니다.
          </P>

          <H3>4. AI 기능과 데이터 처리</H3>
          <P>
            몽글키즈는 상호작용형 AI 기능을 제공하며, 가능한 한 기기 내(온디바이스)에서
            처리합니다. 클라우드 AI가 필요한 경우, 입력을 가능한 한 비식별 처리하여, 데이터를
            자사 모델 학습에 사용하지 않기로 계약(데이터 처리계약, DPA)한 제3자 AI 처리자에게만
            전송합니다.
          </P>
          <P>
            아동의 개인정보가 관련될 경우 회사는 보호자(법정대리인)의 동의를 받고 콘텐츠 안전
            조치를 적용합니다. 또한 회사는 수집된 비식별 · 집계 데이터를 자사 AI · 서비스 개선에
            사용할 수 있습니다. 외부 AI 처리자를 사용하는 경우, 전송되는 정보, 제공자, 처리 목적,
            보관 여부를 본 방침 또는 별도 고지를 통해 안내합니다.
          </P>

          <H3>5. 정보 공유 및 처리위탁</H3>
          <P>
            회사는 어린이 개인정보를 판매하지 않으며, 제3자 광고 네트워크 · 데이터 브로커 ·
            맞춤형 광고 사업자에게 제공하지 않습니다. 다만 서비스 운영을 위해 다음과 같은 서비스
            제공자(수탁자)에게 필요한 범위에서 처리를 위탁할 수 있습니다.
          </P>
          <UL
            items={[
              "Supabase — 인증 · 백엔드 · 데이터 저장",
              "Vercel — 웹 호스팅",
              "Sentry — 오류 · 크래시 진단 (개인식별정보 미포함 설정)",
              "Apple / Google / Kakao — 소셜 로그인",
              "OS 제공사(Apple 등) — 음성 인식 (온디바이스 미지원 시)",
              "(향후) 제3자 AI 처리자 — 상호작용 AI 기능 (데이터 처리계약 체결, 모델 학습 미사용)",
            ]}
          />
          <P>
            이들 제공자는 서비스 제공, 보안, 인프라 운영 등 필요한 목적 범위 내에서만 정보를
            처리합니다. 회사는 법적 의무를 준수하거나 서비스와 이용자를 보호하기 위해 필요한 경우
            관계 법령에 따라 정보를 공개할 수 있습니다.
          </P>

          <H3>6. 음성 처리</H3>
          <P>
            음성 입력은 기기 운영체제의 음성 인식을 사용합니다. 기기가 온디바이스 인식을 지원하면
            음성이 기기를 벗어나지 않으며, 미지원 언어 · 기기에서는 인식을 위해 OS 제공사(Apple
            등)로 전송될 수 있습니다. 어느 경우에도 음성 원본은 자사 서버에 저장하지 않으며,
            인식된 텍스트만 앱 기능 수행에 사용합니다.
          </P>

          <H3>7. 데이터 보관 및 보안</H3>
          <P>회사는 개인정보를 필요한 기간 동안만 보관합니다.</P>
          <UL
            items={[
              "계정 · 프로필 · 학습 활동 데이터: 계정이 유지되는 동안 보관되며, 계정 삭제 시 지체 없이 파기합니다.",
              "보호자 리포트 데이터: 리포트 기능 제공을 위해 보관되며, 원칙적으로 업로드일로부터 최대 12개월 후 삭제 또는 비식별화합니다. 보호자가 요청하면 더 빨리 삭제할 수 있습니다.",
              "기술 · 진단 로그: 보안 · 오류 방지 · 서비스 운영에 필요한 기간 동안만 보관합니다.",
            ]}
          />
          <P>회사는 개인정보 보호를 위해 다음과 같은 조치를 사용합니다.</P>
          <UL
            items={[
              "HTTPS를 통한 암호화 통신",
              "Supabase Row Level Security(RLS)",
              "접근 권한 제한 및 운영자 접근 최소화",
              "최소 정보 수집",
              "삭제 요청 처리 절차 운영",
            ]}
          />
          <P>
            다만 인터넷 또는 전자적 저장 방식은 완벽하게 안전하다고 보장할 수 없습니다. 회사는
            합리적인 보호 조치를 계속 개선하겠습니다.
          </P>

          <H3>8. 국외 이전</H3>
          <P>
            회사가 사용하는 서비스 제공자의 서버는 대한민국, 미국 또는 기타 국가에 위치할 수
            있습니다(예: Supabase, Vercel, Sentry, OS 음성 인식 제공사, 향후 AI 처리자). 실제 저장
            위치는 각 제공자의 설정과 리전에 따라 달라질 수 있습니다. 회사는 관련 법령에 따라
            필요한 고지 · 동의 · 계약상 보호 조치 · 접근 제한 · 암호화 통신 등 합리적인 보호
            조치를 적용합니다.
          </P>

          <H3>9. 아동 개인정보 보호</H3>
          <P>
            계정 개설과 동의의 주체는 보호자(법정대리인)이며, 아이 프로필은 보호자가 입력합니다.
            회사는 만 14세 미만(대한민국 PIPA) 및 13세 미만(미국 COPPA) 아동의 개인정보를
            보호자(법정대리인)의 동의를 기반으로 처리합니다.
          </P>
          <P>회사는 다음 원칙을 따릅니다.</P>
          <UL
            items={[
              "어린이 개인정보를 필요한 최소한으로만 처리합니다.",
              "광고와 맞춤형 광고를 제공하지 않습니다.",
              "정밀 위치와 연락처를 수집하지 않습니다.",
              "카메라 · 음성 원본을 기기 내에서만 처리하고 서버에 저장하지 않습니다.",
              "외부 링크 · 구매 · 결제 · 설정 등에는 부모 확인(Parental Gate)을 적용하고, 데이터 수집 전 보호자 동의 절차를 둡니다.",
              "보호자가 요청하면 자녀의 개인정보를 열람 · 정정 · 삭제하거나 추가 수집을 중단할 수 있도록 지원합니다.",
            ]}
          />

          <H3>10. 이용자 권리 및 행사 방법</H3>
          <P>보호자(법정대리인)는 자녀의 개인정보에 대해 다음 권리를 행사할 수 있습니다.</P>
          <UL
            items={[
              "열람 · 정정: 앱 내 [설정 > 프로필 관리]에서 직접 확인 및 수정",
              "삭제: 앱 내 [설정 > 개인정보 및 보안 > 계정 삭제]에서 직접 영구 삭제",
              "데이터 내보내기: 앱 내 [내 데이터 다운로드]",
              "동의 철회: 계정 삭제를 통해 가능",
            ]}
          />
          <P>
            위 방법 외의 문의나 요청은 <MailLink /> 로 보내주시기 바랍니다. 회사는 요청자가
            보호자(법정대리인)인지 확인하기 위해 필요한 최소한의 정보를 요청할 수 있으며, 적용
            가능한 법령에 따라 합리적인 기간 내에 요청을 처리합니다.
          </P>

          <H3>11. 캘리포니아 주민의 권리 (CCPA)</H3>
          <P>
            캘리포니아 거주자는 개인정보 열람 · 삭제 및 “판매/공유 거부” 권리를 가집니다.
            몽글키즈는 개인정보를 판매하거나 공유하지 않습니다(미성년자 포함). 권리 행사 요청은{" "}
            <MailLink /> 로 보내주시기 바랍니다.
          </P>

          <H3>12. 정책 변경</H3>
          <P>
            회사는 서비스 기능, 법령, 앱마켓 정책 변경에 따라 본 개인정보처리방침을 수정할 수
            있습니다. 중요한 변경이 있는 경우 앱, 웹사이트 또는 기타 적절한 방법으로 안내하며,
            변경된 방침은 표시된 시행일부터 적용됩니다.
          </P>

          <H3>13. 연락처 및 사업자 정보</H3>
          <UL
            items={[
              "서비스명: 몽글키즈(Monglekids)",
              "운영자: 아르카웨이브(Arcawave)",
              "대표: 두지언",
              `사업자등록번호: ${BIZ_NO}`,
              <>이메일: <MailLink /></>,
              "웹사이트: https://www.monglekids.com",
              "주소: 준비 중 (추후 안내)",
            ]}
          />
        </Section>

        {/* ---------- 3. ENGLISH POLICY ---------- */}
        <Section id="en" title="3. English Privacy Policy">
          <H3>Monglekids Privacy Policy</H3>
          <P>Effective / Last Updated: {EFFECTIVE_DATE_EN}</P>
          <P>
            Arcawave (“we,” “us,” or “our”) operates Monglekids, also known in Korean as 몽글키즈,
            a creative-convergence (STEAM) and AI education service for children. This Privacy
            Policy explains how we process, use, share, retain, and protect information in our
            iOS, Android, and Web services.
          </P>
          <P>
            We take children’s privacy seriously. We strive to comply with applicable privacy
            laws, including the Children’s Online Privacy Protection Act (“COPPA”), the General
            Data Protection Regulation (“GDPR”), Korea’s Personal Information Protection Act
            (“PIPA”), and the California Consumer Privacy Act (“CCPA”), as well as applicable app
            marketplace policies.
          </P>

          <H3>1. Introduction</H3>
          <P>
            Monglekids is designed for children aged 4 to 9. The service provides mission-based
            STEAM learning activities, and children learn through play by communicating with AI
            characters — for example, building bridges, finding colors, and recognizing hand
            gestures.
          </P>
          <P>
            The app may measure competencies such as problem-solving, creativity, self-direction,
            and expression, and may provide an activity report a parent can view after a mission.
          </P>
          <P>
            We process children’s information in a data-minimizing way. Raw camera and voice data
            are processed on device whenever possible and are not stored; only the minimum
            information necessary to provide the service is stored on our servers.
          </P>

          <H3>2. Information We Collect</H3>

          <H4>2.1 Guardian Account Information</H4>
          <UL
            items={[
              "email address",
              "social login identifier (account identifier provided when using Apple, Google, or Kakao login)",
            ]}
          />

          <H4>2.2 Child Profile Information (Minimal)</H4>
          <UL
            items={["nickname", "year of birth", "gender (optional)"]}
          />
          <P>
            Child profiles are entered by a guardian and processed only as necessary to provide
            the service.
          </P>

          <H4>2.3 Activity & Interaction Records</H4>
          <P>
            During learning activities, we may generate and store records such as progress and
            completion, time spent, retries, choices, correctness, stars, and badges.
          </P>

          <H4>2.4 Camera & Voice Derived Signals (No Raw Media Stored)</H4>
          <P>
            The service may use the camera and microphone for color detection, hand-gesture
            recognition, and voice input. In these cases we process only <strong>derived
            signals</strong>; raw camera video, photos, and voice recordings are processed on
            device and are not stored.
          </P>
          <UL
            items={[
              "camera-derived signals: hand-gesture coordinates, gesture labels, recognition success",
              "voice-derived signals: recognized transcript text, response labels",
            ]}
          />
          <P>
            Raw camera video, photos, and voice are processed in real time using on-device
            technologies such as Apple Vision Framework and are not uploaded to or stored on our
            servers.
          </P>

          <H4>2.5 AI Feature Usage Records</H4>
          <P>
            When interactive AI features are used, we may process AI usage records and
            de-identified input/response logs to provide the feature and improve quality.
          </P>

          <H4>2.6 Device & Diagnostic Information</H4>
          <P>
            To maintain stability and fix errors, we may process device type, OS, app version,
            language, and crash/performance information. Crash and error diagnostics use Sentry,
            configured to exclude personally identifiable information.
          </P>

          <H4>2.7 Information We Do Not Collect</H4>
          <UL
            items={[
              "raw camera video and photos, and raw voice recordings (processed on device only, not stored on servers)",
              "precise location information",
              "contacts",
              "advertising tracking identifiers (IDFA, AAID, etc.)",
            ]}
          />
          <P>
            The service is currently free. If in-app purchases are introduced, payments may be
            processed through Apple App Store or Google Play. We will not directly store payment
            card numbers, and will update this policy and app marketplace disclosures accordingly.
          </P>

          <H3>3. How We Use Information</H3>
          <UL
            items={[
              "provide the service and child-appropriate content",
              "save learning progress and show achievements such as stars and badges",
              "generate parent reports",
              "provide app and AI features such as voice input, color recognition, and hand-gesture recognition",
              "improve and develop educational features, the service, and AI quality using de-identified, aggregate data",
              "maintain security, prevent unauthorized access and errors, and ensure stability",
              "comply with applicable laws and app marketplace policies",
            ]}
          />
          <P>
            We do not use children’s information for advertising, targeted advertising,
            advertising-oriented user tracking, or sale of personal information.
          </P>

          <H3>4. AI Features and Data Processing</H3>
          <P>
            Monglekids provides interactive AI features and processes them on device (on-device)
            whenever possible. Where cloud AI is required, we de-identify inputs as much as
            possible and send them only to third-party AI processors that have contractually
            agreed (via a Data Processing Agreement) not to use the data to train their own
            models.
          </P>
          <P>
            Where a child’s personal information is involved, we obtain guardian (legal
            representative) consent and apply content-safety measures. We may also use
            de-identified, aggregate data to improve our own AI and service. When an external AI
            processor is used, we disclose the data sent, the provider, the purpose, and whether
            data is retained through this policy or a separate notice.
          </P>

          <H3>5. Sharing Information & Processors</H3>
          <P>
            We do not sell children’s personal information and do not provide it to third-party
            advertising networks, data brokers, or targeted advertising providers. We may,
            however, entrust processing to the following service providers as necessary:
          </P>
          <UL
            items={[
              "Supabase — authentication, backend, and data storage",
              "Vercel — web hosting",
              "Sentry — error and crash diagnostics (configured without personally identifiable information)",
              "Apple / Google / Kakao — social login",
              "OS providers (Apple, etc.) — speech recognition (when on-device is unsupported)",
              "(Future) third-party AI processors — interactive AI features (under a DPA, no model training)",
            ]}
          />
          <P>
            These providers process information only as necessary for service operation, security,
            or infrastructure. We may disclose information if required by law or to protect the
            service or our users.
          </P>

          <H3>6. Voice Processing</H3>
          <P>
            Voice input uses the device operating system’s speech recognition. If the device
            supports on-device recognition, voice does not leave the device; for unsupported
            languages or devices, voice may be sent to the OS provider (e.g., Apple) for
            recognition. In all cases, we do not store raw voice recordings on our servers and use
            only the recognized text for app functionality.
          </P>

          <H3>7. Data Retention and Security</H3>
          <UL
            items={[
              "Account, profile, and activity data: retained while the account exists, and deleted without undue delay upon account deletion.",
              "Parent report data: retained to provide the report feature, generally deleted or de-identified within 12 months of upload, or earlier upon guardian request.",
              "Technical and diagnostic logs: retained only as long as necessary for security, error prevention, and operation.",
            ]}
          />
          <P>We use reasonable safeguards, including:</P>
          <UL
            items={[
              "HTTPS encrypted communication",
              "Supabase Row Level Security (RLS)",
              "access controls and minimized operator access",
              "data minimization",
              "deletion request procedures",
            ]}
          />
          <P>
            No internet or electronic storage method is completely secure. We will continue to
            improve our reasonable safeguards.
          </P>

          <H3>8. International Data Transfer</H3>
          <P>
            Servers used by our service providers may be located in South Korea, the United
            States, or other countries (e.g., Supabase, Vercel, Sentry, OS speech-recognition
            providers, and future AI processors). Actual storage location may vary by each
            provider’s configuration and region. We apply reasonable safeguards such as notice,
            consent where required, contractual protections, access controls, and encrypted
            communication in accordance with applicable laws.
          </P>

          <H3>9. Children’s Privacy</H3>
          <P>
            The guardian (legal representative) is the account holder and consent authority, and
            enters the child’s profile. We process the personal information of children under 14
            (Korea PIPA) and under 13 (US COPPA) based on guardian consent.
          </P>
          <UL
            items={[
              "We process only the minimum information necessary.",
              "We do not provide advertising or targeted advertising.",
              "We do not collect precise location or contacts.",
              "Raw camera and voice data are processed on device and not stored on our servers.",
              "We apply a Parental Gate before external links, purchases, payments, or settings, and obtain guardian consent before collecting data.",
              "Guardians may request access, correction, deletion, or prevention of further collection of their child’s information.",
            ]}
          />

          <H3>10. Your Rights and How to Exercise Them</H3>
          <UL
            items={[
              "Access / correction: directly in the app at [Settings > Profile Management]",
              "Deletion: permanently delete yourself in the app at [Settings > Privacy & Security > Delete Account]",
              "Data export: in the app at [Download My Data]",
              "Withdraw consent: available via account deletion",
            ]}
          />
          <P>
            For other questions or requests, contact <MailLink />. We may request the minimum
            information necessary to verify that the requester is a guardian (legal
            representative) and will respond within a reasonable period in accordance with
            applicable law.
          </P>

          <H3>11. California Privacy Rights (CCPA)</H3>
          <P>
            California residents have the right to access and delete their personal information
            and to opt out of its “sale/sharing.” Monglekids does not sell or share personal
            information (including that of minors). To exercise these rights, contact <MailLink />.
          </P>

          <H3>12. Policy Changes</H3>
          <P>
            We may update this Privacy Policy when the service, laws, or app marketplace policies
            change. If we make material changes, we will notify users through the app, website, or
            another appropriate method, and the updated policy applies from the stated effective
            date.
          </P>

          <H3>13. Contact & Business Information</H3>
          <UL
            items={[
              "Service: 몽글키즈 (Monglekids)",
              "Operator: Arcawave (아르카웨이브)",
              "Representative: Doo Jieon (두지언)",
              `Business Registration No.: ${BIZ_NO}`,
              <>Email: <MailLink /></>,
              "Website: https://www.monglekids.com",
              "Address: to be provided",
            ]}
          />
        </Section>

        {/* ---------- 4. CONTACT ---------- */}
        <Section id="contact" title="4. Contact / 연락처">
          <P>
            개인정보 보호 관련 문의, 보호자(법정대리인)의 권리 행사, 자녀 데이터 삭제 요청은
            아래 연락처로 보내주세요.
          </P>
          <P>
            For privacy questions, guardian rights requests, or child data deletion requests,
            please contact us at:
          </P>

          <div className="my-5 grid grid-cols-1 gap-3 rounded-2xl bg-white p-5 ring-1 ring-grape-100/70 clay-shadow-sm sm:p-6">
            <ContactRow label="서비스명 / Service" value="몽글키즈 (Monglekids)" />
            <ContactRow label="운영자 / Operator" value="아르카웨이브 (Arcawave)" />
            <ContactRow label="대표 / Representative" value="두지언 (Doo Jieon)" />
            <ContactRow label="사업자등록번호 / Business Reg. No." value={BIZ_NO} />
            <ContactRow
              label="이메일 / Email"
              value={
                <a
                  className="inline-flex items-center gap-1.5 text-grape-700 underline underline-offset-2 hover:text-grape-800"
                  href={`mailto:${EMAIL}`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  {EMAIL}
                </a>
              }
            />
            <ContactRow
              label="웹사이트 / Website"
              value={
                <a
                  className="inline-flex items-center gap-1.5 text-grape-700 underline underline-offset-2 hover:text-grape-800"
                  href="https://www.monglekids.com"
                >
                  <Globe className="h-3.5 w-3.5" />
                  https://www.monglekids.com
                </a>
              }
            />
            <ContactRow
              label="개인정보처리방침 / Privacy Policy URL"
              value={
                <a
                  className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
                  href="https://www.monglekids.com/privacy"
                >
                  https://www.monglekids.com/privacy
                </a>
              }
            />
            <ContactRow label="주소 / Address" value="준비 중 (추후 안내) / To be provided" />
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- typography helpers ---------------- */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-grape-100/70 pt-12 mt-14 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="text-balance text-[22px] font-bold leading-snug tracking-tight text-ink-900 sm:text-[26px]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-[18px] font-semibold leading-snug text-ink-900">
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-6 text-[15.5px] font-semibold leading-snug text-ink-800">
      {children}
    </h4>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[15px] leading-[1.78] text-ink-700">{children}</p>
  );
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.7] text-ink-700 marker:text-grape-400">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function TOCItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="block rounded-lg px-2 py-1.5 transition hover:bg-grape-50 hover:text-grape-700"
      >
        {children}
      </a>
    </li>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
      <dt className="font-display text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-400 sm:w-[170px] sm:flex-none">
        {label}
      </dt>
      <dd className="text-ink-700">{value}</dd>
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="font-display text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-400 sm:w-[200px] sm:flex-none">
        {label}
      </span>
      <span className="text-[14.5px] text-ink-800">{value}</span>
    </div>
  );
}

/* ---------------- summary table data ---------------- */

const SUMMARY_ROWS: { k: string; v: string }[] = [
  { k: "대상 연령", v: "만 4–9세 어린이를 위한 서비스입니다." },
  { k: "광고", v: "표시하지 않습니다." },
  { k: "추적", v: "광고 목적의 사용자 추적을 하지 않습니다." },
  { k: "광고 식별자", v: "IDFA, AAID 등 광고 식별자를 사용하지 않습니다." },
  {
    k: "카메라 · 음성 원본",
    v: "저장하지 않습니다. 손동작 좌표 · 인식 텍스트 등 파생 신호만 기기 내에서 처리합니다.",
  },
  { k: "정밀 위치 · 연락처", v: "수집하지 않습니다." },
  {
    k: "보호자 계정 · 아이 프로필",
    v: "이메일 · 소셜 로그인, 닉네임 · 출생연도 · 성별(선택)을 서비스 제공을 위해 처리합니다.",
  },
  {
    k: "오류 진단",
    v: "서비스 개선을 위해 Sentry로 크래시 · 오류를 진단합니다(개인식별정보 미포함).",
  },
  {
    k: "서비스 · AI 개선",
    v: "비식별 · 집계 데이터를 서비스와 AI 품질 개선에 사용할 수 있습니다.",
  },
  { k: "데이터 판매", v: "개인정보를 판매하거나 공유하지 않습니다." },
  {
    k: "삭제 · 권리",
    v: "앱 내 [설정 > 개인정보 및 보안 > 계정 삭제]로 직접 영구 삭제할 수 있습니다.",
  },
];
