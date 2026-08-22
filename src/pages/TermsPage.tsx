import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { breadcrumbSchema, webPageSchema } from "../seo/schema";
import { SITE } from "../seo/site";

const EFFECTIVE_KO = "2026년 8월 22일";
const EFFECTIVE_EN = "August 22, 2026";
const ADDRESS_KO = "서울특별시 성북구 보문로29가길 48";
const ADDRESS_EN = "48 Bomun-ro 29ga-gil, Seongbuk-gu, Seoul, Republic of Korea";
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

function PrivacyLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
      to="/privacy"
    >
      {children}
    </Link>
  );
}

export default function TermsPage() {
  return (
    <>
      <SEO
        title="이용약관 · 몽글키즈 (MongleKids Terms of Service)"
        description="몽글키즈(MongleKids) 이용약관. 아르카웨이브(Arcawave)가 운영하는 어린이 창의융합·AI 교육 서비스의 이용 조건, 구독·결제·환불, 지식재산권, 책임 범위 안내 (한국어 + English)."
        path="/terms"
        jsonLd={[
          webPageSchema({
            url: "/terms",
            name: "Terms of Service · 몽글키즈",
            description: "MongleKids Terms of Service. Bilingual (Korean + English).",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Terms of Service", url: "/terms" },
          ]),
        ]}
      />
      <Header />

      <main className="container-page max-w-3xl py-14 md:py-20">
        <Link
          to="/"
          className="font-display mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-grape-700 transition hover:text-grape-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          홈으로 / Back to home
        </Link>

        <header className="mb-12">
          <span className="font-display inline-flex items-center gap-2 rounded-full bg-grape-50 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-grape-700 ring-1 ring-grape-100">
            Terms of Service
          </span>
          <h1 className="mt-4 text-balance text-[28px] font-bold leading-[1.28] tracking-tight text-ink-900 sm:text-[34px]">
            몽글키즈(MongleKids) 이용약관
            <br />
            <span className="text-ink-700">MongleKids Terms of Service</span>
          </h1>
          <dl className="mt-6 space-y-1.5 text-[14px] text-ink-700">
            <Meta label="시행일 / Effective Date" value={`${EFFECTIVE_KO} / ${EFFECTIVE_EN}`} />
            <Meta label="운영자 / Operator" value="아르카웨이브 (Arcawave)" />
            <Meta label="연락처 / Contact" value={<MailLink />} />
          </dl>
        </header>

        {/* ================= KOREAN ================= */}
        <Section id="kr" title="이용약관 (한국어)">
          <H3>제1조 (목적 및 운영자)</H3>
          <P>
            본 약관은 아르카웨이브(Arcawave)(이하 “회사”)가 운영하는 어린이 창의융합(STEAM) ·
            AI 교육 서비스 몽글키즈(MongleKids)(이하 “서비스”)의 이용 조건과 회사·이용자 간의
            권리 · 의무를 정합니다. 서비스에 가입하거나 이용하면 본 약관에 동의한 것으로
            봅니다.
          </P>
          <UL
            items={[
              "운영자: 아르카웨이브 (Arcawave) · 대표 두지언",
              `사업자등록번호: ${BIZ_NO}`,
              `주소: ${ADDRESS_KO}`,
              <>연락처: <MailLink /></>,
            ]}
          />

          <H3>제2조 (이용 자격 및 계정)</H3>
          <UL
            items={[
              <>
                <strong>계정은 보호자(성인)가 생성합니다.</strong> 아동은 보호자의 관리 · 감독
                하에 서비스를 이용하며, 계정 개설 · 동의 · 설정의 주체는 보호자(법정대리인)
                입니다.
              </>,
              "만 14세 미만 아동의 개인정보는 「개인정보 보호법」에 따라 법정대리인의 동의 하에 처리됩니다. (자세한 내용은 개인정보처리방침 참조)",
              "보호자는 계정 정보(로그인 수단 등)를 안전하게 관리할 책임이 있으며, 계정의 무단 사용을 알게 된 경우 즉시 회사에 알려야 합니다.",
              "결제 · 외부 링크 · 설정 등 보호자 영역 접근에는 보호자 확인(Parental Gate) 절차가 적용됩니다.",
              "타인의 정보 도용, 서비스의 부정 이용, 리버스 엔지니어링, 서비스 운영 방해 행위는 금지됩니다.",
            ]}
          />

          <H3>제3조 (서비스 내용 · 변경 · 중단)</H3>
          <P>
            서비스는 미션 기반 창의융합(STEAM) 학습 콘텐츠, AI 캐릭터와의 상호작용(대화 ·
            놀이), 보호자용 활동 리포트 등을 제공합니다.
          </P>
          <UL
            items={[
              "회사는 콘텐츠와 기능을 수시로 추가 · 변경 · 개편하거나 일부를 종료할 수 있습니다. 중요한 변경은 앱 또는 웹사이트를 통해 안내합니다.",
              "정기 점검, 시스템 장애, 천재지변 등 불가항력 사유로 서비스가 일시 중단될 수 있으며, 회사는 고의 또는 중대한 과실이 없는 한 이로 인한 손해에 대해 책임을 지지 않습니다.",
            ]}
          />

          <H3>제4조 (카메라 · 마이크 사용)</H3>
          <UL
            items={[
              "일부 학습 활동(색 찾기, 손 동작 인식, 음성 입력 등)은 기기의 카메라 · 마이크를 사용합니다.",
              "카메라 · 마이크 권한을 허용하지 않아도 해당 활동은 대체 방식으로 진행할 수 있으며, 서비스의 기본 이용에는 지장이 없습니다.",
              <>
                카메라 영상 · 음성 원본은 기기 내에서만 처리되고 서버에 저장되지 않습니다.
                자세한 내용은 <PrivacyLink>개인정보처리방침</PrivacyLink>을 참조하세요.
              </>,
            ]}
          />

          <H3>제5조 (구독 · 결제)</H3>
          <UL
            items={[
              "서비스의 일부 기능은 유료 구독(월간 또는 연간)으로 제공될 수 있습니다. 상품 구성과 가격은 앱 내 표시를 기준으로 합니다.",
              <>
                <strong>자동 갱신:</strong> 구독은 해지하지 않는 한 같은 기간 · 가격으로 자동
                갱신되며, 요금은 현재 구독 기간이 끝나기 24시간 이내에 결제됩니다. 갱신을
                원하지 않으면 <strong>현재 기간 종료 최소 24시간 전까지</strong> 해지해야
                합니다.
              </>,
              "해지 방법: App Store 또는 Google Play의 [구독 관리] 메뉴에서 언제든 해지할 수 있습니다. 앱 삭제만으로는 구독이 해지되지 않습니다.",
              "결제는 Apple App Store 또는 Google Play를 통해 처리되며, 회사는 결제 수단 정보를 직접 수집 · 저장하지 않습니다.",
            ]}
          />

          <H3>제6조 (환불 및 청약철회)</H3>
          <UL
            items={[
              "결제가 각 앱마켓(Apple/Google)을 통해 이루어지므로, 환불도 해당 스토어의 환불 정책과 절차를 따릅니다. (Apple: reportaproblem.apple.com, Google: Play 스토어 주문 내역)",
              "대한민국 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」에 따른 청약철회 권리를 가지며, 관련 법령이 본 약관보다 우선합니다.",
              "회사의 귀책 사유로 서비스를 정상 이용하지 못한 경우, 관련 법령에 따라 보상 또는 환불을 처리합니다.",
            ]}
          />

          <H3>제7조 (프로모션 코드 · 무료 이용권)</H3>
          <UL
            items={[
              "회사는 크라우드펀딩 보상, 이벤트 등으로 무료 이용권 · 프로모션 코드를 제공할 수 있습니다.",
              "프로모션 코드는 타인에게 양도 · 판매할 수 없고, 현금으로 환급되지 않으며, 회사가 정한 유효기간 · 조건이 적용됩니다.",
              "회사는 부정 취득 · 사용된 코드를 무효화할 수 있으며, 프로모션의 조건을 사전 고지 후 변경할 수 있습니다.",
            ]}
          />

          <H3>제8조 (지식재산권)</H3>
          <UL
            items={[
              "앱 내 캐릭터(뭉이 등) · 일러스트 · 음성 · 동화 · 미션 콘텐츠 등 서비스의 모든 콘텐츠에 대한 지식재산권은 회사(또는 정당한 권리자)에게 있습니다. 사전 서면 동의 없는 복제 · 배포 · 2차적 저작물 작성은 금지됩니다.",
              "아이가 서비스 안에서 만든 결과물(그림, 이야기, 창작물 등)의 권리는 해당 아동과 보호자에게 귀속됩니다. 다만 회사는 서비스 제공(저장 · 표시 · 리포트 생성 등)에 필요한 범위에서 이를 이용할 수 있는 허락을 받습니다.",
            ]}
          />

          <H3>제9조 (책임 제한)</H3>
          <UL
            items={[
              "서비스는 교육적 경험을 제공하기 위해 설계되었으나, 특정 학습 성과나 교육 효과를 보증하지 않습니다.",
              <>
                <strong>AI 캐릭터의 응답은 인공지능이 생성하는 것으로, 항상 정확하거나
                완전하지 않을 수 있습니다.</strong> 회사는 콘텐츠 안전 조치를 적용하지만, AI
                응답의 무오류성을 보증하지 않습니다.
              </>,
              "이용자의 기기 · 네트워크 환경으로 인한 문제(카메라 · 마이크 인식 실패, 통신 장애 등)에 대해 회사는 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.",
              "관련 법령이 허용하는 범위에서, 회사의 배상 책임은 이용자가 최근 3개월간 회사에 실제 지급한 금액을 한도로 합니다.",
            ]}
          />

          <H3>제10조 (계약 해지 및 이용 제한)</H3>
          <UL
            items={[
              <>
                이용자는 언제든 앱 내 [설정 &gt; 계정 삭제]로 계약을 해지할 수 있습니다.
                삭제되는 데이터의 범위는{" "}
                <Link
                  className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
                  to="/delete-account"
                >
                  계정 삭제 안내
                </Link>
                를 참조하세요.
              </>,
              "이용자가 본 약관을 중대하게 위반하거나 서비스 운영을 방해하는 경우, 회사는 사전 통지 후(긴급한 경우 사후 통지) 이용을 제한하거나 계약을 해지할 수 있습니다.",
            ]}
          />

          <H3>제11조 (약관 변경)</H3>
          <P>
            회사는 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다. 변경 시
            적용일과 변경 사유를 명시하여 <strong>적용일 7일 전</strong>(이용자에게 불리하거나
            중대한 변경은 <strong>30일 전</strong>)부터 앱 또는 웹사이트에 공지합니다. 공지된
            적용일까지 거부 의사를 표시하지 않고 서비스를 계속 이용하면 변경에 동의한 것으로
            봅니다.
          </P>

          <H3>제12조 (준거법 · 분쟁 해결 · 언어)</H3>
          <UL
            items={[
              "본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은 민사소송법에 따른 관할 법원에 제기합니다.",
              "회사와 이용자는 분쟁 발생 시 소 제기 전 상호 협의로 해결하도록 노력합니다.",
              <>
                본 약관은 한국어와 영어로 제공됩니다.{" "}
                <strong>두 언어판의 해석이 충돌하는 경우 한국어판이 우선합니다.</strong>
              </>,
              "Apple App Store에서 다운로드한 경우, 본 약관은 Apple 표준 EULA(Licensed Application End User License Agreement)의 최소 조건을 포함하며, 본 약관에서 정하지 않은 사항은 해당 표준 약관을 따릅니다.",
            ]}
          />
        </Section>

        {/* ================= ENGLISH ================= */}
        <Section id="en" title="Terms of Service (English)">
          <H3>1. Purpose & Operator</H3>
          <P>
            These Terms govern the use of MongleKids (the “Service”), a children’s
            creative-convergence (STEAM) and AI education service operated by Arcawave (the
            “Company”). By signing up for or using the Service, you agree to these Terms.
          </P>
          <UL
            items={[
              "Operator: Arcawave · Representative: Doo Jieon",
              `Business Registration No.: ${BIZ_NO}`,
              `Address: ${ADDRESS_EN}`,
              <>Contact: <MailLink /></>,
            ]}
          />

          <H3>2. Eligibility & Accounts</H3>
          <UL
            items={[
              <>
                <strong>Accounts are created by a guardian (an adult).</strong> Children use the
                Service under the guardian’s management and supervision; the guardian (legal
                representative) is the account holder and consent authority.
              </>,
              "Personal information of children under 14 is processed with the consent of a legal representative under Korea’s Personal Information Protection Act. (See the Privacy Policy.)",
              "Guardians are responsible for keeping account credentials secure and must notify the Company promptly of any unauthorized use.",
              "A Parental Gate applies before payments, external links, and settings.",
              "Impersonation, unauthorized use, reverse engineering, and interference with the operation of the Service are prohibited.",
            ]}
          />

          <H3>3. The Service; Changes & Interruptions</H3>
          <P>
            The Service provides mission-based STEAM learning content, interactive AI characters
            (conversation and play), and activity reports for guardians.
          </P>
          <UL
            items={[
              "The Company may add, change, reorganize, or discontinue content and features from time to time. Material changes will be announced in the app or on the website.",
              "The Service may be temporarily interrupted for maintenance, system failure, or force majeure. The Company is not liable for resulting damages absent willful misconduct or gross negligence.",
            ]}
          />

          <H3>4. Camera & Microphone</H3>
          <UL
            items={[
              "Some activities (color finding, hand-gesture recognition, voice input) use the device camera and microphone.",
              "If you do not grant camera/microphone permission, those activities can proceed by alternative means, and basic use of the Service is unaffected.",
              <>
                Raw camera video and voice are processed on device and are not stored on our
                servers. See the <PrivacyLink>Privacy Policy</PrivacyLink> for details.
              </>,
            ]}
          />

          <H3>5. Subscriptions & Payment</H3>
          <UL
            items={[
              "Some features may be offered as a paid subscription (monthly or annual). Products and prices are as displayed in the app.",
              <>
                <strong>Auto-renewal:</strong> Subscriptions automatically renew for the same
                period and price unless canceled. Your account is charged within 24 hours prior
                to the end of the current period. To avoid renewal, cancel{" "}
                <strong>at least 24 hours before the current period ends</strong>.
              </>,
              "How to cancel: manage or cancel anytime in App Store or Google Play subscription settings. Deleting the app does not cancel a subscription.",
              "Payments are processed by Apple App Store or Google Play; the Company does not directly collect or store payment card details.",
            ]}
          />

          <H3>6. Refunds & Withdrawal</H3>
          <UL
            items={[
              "Because payments are processed by the app stores, refunds follow each store’s refund policy and procedures (Apple: reportaproblem.apple.com; Google: Play Store order history).",
              "Users in the Republic of Korea have statutory withdrawal rights under the Act on Consumer Protection in Electronic Commerce; applicable law prevails over these Terms.",
              "If you were unable to use the Service due to the Company’s fault, compensation or refunds are handled in accordance with applicable law.",
            ]}
          />

          <H3>7. Promotional Codes & Free Passes</H3>
          <UL
            items={[
              "The Company may issue free passes or promotional codes (e.g., crowdfunding rewards, events).",
              "Codes are non-transferable, non-saleable, and non-redeemable for cash, and are subject to validity periods and conditions set by the Company.",
              "The Company may invalidate codes obtained or used fraudulently, and may change promotion conditions with prior notice.",
            ]}
          />

          <H3>8. Intellectual Property</H3>
          <UL
            items={[
              "All content in the Service — characters (including Moong), illustrations, voices, stories, and mission content — is the intellectual property of the Company or its rightful licensors. Reproduction, distribution, or creation of derivative works without prior written consent is prohibited.",
              "Works a child creates in the Service (drawings, stories, creations) belong to the child and their guardian. The Company receives a license to use them only as needed to provide the Service (storage, display, report generation).",
            ]}
          />

          <H3>9. Limitation of Liability</H3>
          <UL
            items={[
              "The Service is designed to provide educational experiences but does not guarantee any specific learning outcome or educational effect.",
              <>
                <strong>AI character responses are generated by artificial intelligence and may
                not always be accurate or complete.</strong> The Company applies content-safety
                measures but does not warrant that AI responses are error-free.
              </>,
              "The Company is not liable for issues caused by the user’s device or network environment (camera/microphone recognition failures, connectivity issues), absent willful misconduct or gross negligence.",
              "To the extent permitted by applicable law, the Company’s aggregate liability is limited to the amount you actually paid to the Company in the three months preceding the claim.",
            ]}
          />

          <H3>10. Termination & Restriction</H3>
          <UL
            items={[
              <>
                You may terminate at any time via [Settings &gt; Delete Account] in the app. See{" "}
                <Link
                  className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
                  to="/delete-account"
                >
                  Account Deletion
                </Link>{" "}
                for what is deleted.
              </>,
              "If a user materially breaches these Terms or interferes with the Service, the Company may restrict use or terminate the agreement after notice (or with subsequent notice in urgent cases).",
            ]}
          />

          <H3>11. Changes to These Terms</H3>
          <P>
            The Company may amend these Terms within the bounds of applicable law. Amendments
            are announced in the app or on the website at least <strong>7 days</strong> before
            the effective date (<strong>30 days</strong> for changes unfavorable or material to
            users), with the effective date and reasons stated. Continued use after the
            effective date without objection constitutes acceptance.
          </P>

          <H3>12. Governing Law, Disputes & Language</H3>
          <UL
            items={[
              "These Terms are governed by the laws of the Republic of Korea, and disputes are subject to the competent court under the Civil Procedure Act.",
              "The parties will endeavor to resolve disputes through mutual consultation before filing suit.",
              <>
                These Terms are provided in Korean and English.{" "}
                <strong>If the two versions conflict, the Korean version prevails.</strong>
              </>,
              "If you downloaded the app from the Apple App Store, these Terms incorporate the minimum terms of Apple’s standard Licensed Application End User License Agreement (EULA); matters not addressed here follow that standard agreement.",
            ]}
          />
        </Section>

        {/* ================= CONTACT ================= */}
        <Section id="contact" title="문의 / Contact">
          <P>
            약관 관련 문의는 아래 이메일로 보내주세요. / For questions about these Terms,
            contact:
          </P>
          <p className="mt-3">
            <a
              className="inline-flex items-center gap-1.5 text-[15px] text-grape-700 underline underline-offset-2 hover:text-grape-800"
              href={`mailto:${EMAIL}`}
            >
              <Mail className="h-4 w-4" />
              {EMAIL}
            </a>
          </p>
          <P>
            함께 보기: <PrivacyLink>개인정보처리방침 / Privacy Policy</PrivacyLink> ·{" "}
            <Link
              className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
              to="/delete-account"
            >
              계정 삭제 안내 / Account Deletion
            </Link>
          </P>
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
    <section
      id={id}
      className="scroll-mt-24 border-t border-grape-100/70 pt-12 mt-14 first:mt-0 first:border-t-0 first:pt-0"
    >
      <h2 className="text-balance text-[22px] font-bold leading-snug tracking-tight text-ink-900 sm:text-[26px]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-[18px] font-semibold leading-snug text-ink-900">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[15px] leading-[1.78] text-ink-700">{children}</p>;
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
