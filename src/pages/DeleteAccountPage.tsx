import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { breadcrumbSchema, webPageSchema } from "../seo/schema";
import { SITE } from "../seo/site";

/**
 * /delete-account — public account-deletion instructions.
 *
 * Required by Google Play's account/data deletion policy (and useful for
 * App Store review): a URL reachable outside the app that explains how
 * to delete the account, what data is deleted, and what is retained.
 * Bilingual on one page, like /privacy.
 */

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

export default function DeleteAccountPage() {
  return (
    <>
      <SEO
        title="계정 삭제 안내 · 몽글키즈 (MongleKids Account Deletion)"
        description="몽글키즈(MongleKids) 계정 및 데이터 삭제 방법 안내. 앱 내 즉시 삭제 또는 이메일 요청으로 계정과 모든 관련 데이터를 삭제할 수 있습니다. How to delete your MongleKids account and data."
        path="/delete-account"
        jsonLd={[
          webPageSchema({
            url: "/delete-account",
            name: "계정 삭제 안내 · MongleKids Account Deletion",
            description:
              "How to delete your MongleKids account and associated data. Bilingual (Korean + English).",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Account Deletion", url: "/delete-account" },
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
            Account Deletion
          </span>
          <h1 className="mt-4 text-balance text-[28px] font-bold leading-[1.28] tracking-tight text-ink-900 sm:text-[34px]">
            몽글키즈(MongleKids) 계정 삭제 안내
            <br />
            <span className="text-ink-700">MongleKids Account Deletion</span>
          </h1>
        </header>

        {/* ---------- Korean ---------- */}
        <Section title="계정 삭제 안내 (한국어)">
          <P>
            몽글키즈 계정과 관련 데이터 삭제는 아래 두 가지 방법으로 요청할 수 있습니다.
          </P>

          <H3>방법 1 — 앱에서 직접 삭제 (즉시)</H3>
          <OL
            items={[
              "몽글키즈 앱 실행 → 마을 화면 우측 상단 ⚙️ (부모 확인 문제 풀기)",
              "설정 맨 아래 [계정 삭제] 선택 → 확인",
            ]}
          />

          <H3>방법 2 — 이메일 요청</H3>
          <P>
            가입한 이메일 주소로 <MailLink /> 에 “계정 삭제 요청”을 보내주시면 영업일 7일
            이내에 처리해 드립니다.
          </P>

          <H3>삭제되는 데이터</H3>
          <P>
            계정(이메일), 아이 프로필(닉네임 · 출생연도), 놀이 기록 · 별 · 마을 진행 상황,
            학부모 리포트 — <strong>전부 즉시 삭제되며 복구할 수 없습니다.</strong>
          </P>

          <H3>보관되는 데이터</H3>
          <P>
            없습니다. 다만 개인 식별 정보가 제거된 오류(크래시) 기록은 서비스 안정성 목적으로
            최대 90일 후 자동 삭제됩니다.
          </P>

          <P>운영사: 아르카웨이브 (Arcawave)</P>
        </Section>

        {/* ---------- English ---------- */}
        <Section title="Account Deletion (English)">
          <P>
            You can request deletion of your MongleKids account and associated data in either of
            the two ways below.
          </P>

          <H3>Method 1 — Delete directly in the app (immediate)</H3>
          <OL
            items={[
              "Open the MongleKids app → tap ⚙️ at the top right of the village screen (solve the parental-gate question)",
              "At the bottom of Settings, tap [Delete Account] → confirm",
            ]}
          />

          <H3>Method 2 — Request by email</H3>
          <P>
            Send an “account deletion request” to <MailLink /> from the email address you signed
            up with, and we will process it within 7 business days.
          </P>

          <H3>Data that is deleted</H3>
          <P>
            Account (email), child profile (nickname and birth year), play records, stars,
            village progress, and parent reports —{" "}
            <strong>all are deleted immediately and cannot be recovered.</strong>
          </P>

          <H3>Data that is retained</H3>
          <P>
            None. However, crash/error logs with all personally identifiable information removed
            are kept for service stability and are automatically deleted after up to 90 days.
          </P>

          <P>Operator: Arcawave (아르카웨이브)</P>
        </Section>

        {/* ---------- Contact ---------- */}
        <Section title="문의 / Contact">
          <P>
            삭제 관련 문의는 아래 이메일로 보내주세요. / For questions about deletion, contact:
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
            개인정보 처리에 대한 자세한 내용은{" "}
            <Link
              className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
              to="/privacy"
            >
              개인정보처리방침
            </Link>
            을 참고하세요. / See our{" "}
            <Link
              className="text-grape-700 underline underline-offset-2 hover:text-grape-800"
              to="/privacy"
            >
              Privacy Policy
            </Link>{" "}
            for details on how we handle personal information.
          </P>
        </Section>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- typography helpers ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24 border-t border-grape-100/70 pt-12 mt-14 first:mt-0 first:border-t-0 first:pt-0">
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

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[15px] leading-[1.78] text-ink-700">{children}</p>
  );
}

function OL({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-[1.7] text-ink-700 marker:font-semibold marker:text-grape-500">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}
