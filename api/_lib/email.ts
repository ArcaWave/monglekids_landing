/**
 * Shared email helpers for the Vercel serverless functions.
 * Talks to the Resend HTTP API directly with fetch — no SDK needed.
 *
 * Env (server-only, never VITE_-prefixed):
 *  - RESEND_API_KEY   required to actually send
 *  - RESEND_FROM      e.g. `MongleKids <news@monglekids.com>`
 *                     (domain must be verified in Resend first)
 */

const SITE_URL = "https://www.monglekids.com";

export type Lang = "ko" | "en";

export function unsubscribeUrl(token: string): string {
  return `${SITE_URL}/unsubscribe?token=${token}`;
}

/** Warm clay-styled HTML shell shared by all MongleKids emails. */
export function emailShell(opts: {
  lang: Lang;
  bodyHtml: string;
  unsubscribeToken: string;
}): string {
  const { lang, bodyHtml, unsubscribeToken } = opts;
  const unsub =
    lang === "ko"
      ? `이 메일은 몽글키즈 소식 수신에 동의하신 분께 발송됩니다. <a href="${unsubscribeUrl(unsubscribeToken)}" style="color:#a6694c;">수신거부</a>`
      : `You are receiving this because you subscribed to MongleKids updates. <a href="${unsubscribeUrl(unsubscribeToken)}" style="color:#a6694c;">Unsubscribe</a>`;

  return `<!doctype html>
<html lang="${lang}">
  <body style="margin:0;padding:0;background:#fcf7ec;font-family:'Apple SD Gothic Neo','Malgun Gothic',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fcf7ec;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;padding:36px 32px;border:1px solid #f0dccb;">
          <tr><td align="center" style="padding-bottom:20px;">
            <img src="${SITE_URL}/brand/logo.png" alt="MongleKids" width="150" style="display:block;" />
          </td></tr>
          <tr><td style="color:#4a3b2f;font-size:15px;line-height:1.75;">
            ${bodyHtml}
          </td></tr>
          <tr><td style="padding-top:28px;border-top:1px solid #f5ead9;margin-top:24px;">
            <p style="color:#b8a690;font-size:12px;line-height:1.6;text-align:center;margin:24px 0 0;">
              ${unsub}<br/>
              아르카웨이브 (Arcawave) · <a href="${SITE_URL}" style="color:#b8a690;">monglekids.com</a>
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function welcomeEmail(lang: Lang, unsubscribeToken: string): {
  subject: string;
  html: string;
} {
  const bodyHtml =
    lang === "ko"
      ? `
        <h1 style="font-size:21px;color:#3d2f24;margin:0 0 14px;">구독해주셔서 감사해요! 🎈</h1>
        <p style="margin:0 0 12px;">안녕하세요, 몽글키즈입니다.</p>
        <p style="margin:0 0 12px;">앞으로 이런 소식을 가끔, 정성껏 보내드릴게요.</p>
        <ul style="margin:0 0 16px;padding-left:20px;">
          <li>제품 소식과 새로운 기능</li>
          <li>아이와 함께하는 창의 교육 아이디어</li>
          <li>출시 · 베타 얼리 액세스 소식</li>
        </ul>
        <p style="margin:0 0 20px;">지난 소식이 궁금하시면 아카이브에서 언제든 볼 수 있어요.</p>
        <p style="text-align:center;margin:0;">
          <a href="${SITE_URL}/news" style="display:inline-block;background:#a6694c;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 24px;border-radius:999px;">몽글 소식 보러가기</a>
        </p>`
      : `
        <h1 style="font-size:21px;color:#3d2f24;margin:0 0 14px;">Thanks for subscribing! 🎈</h1>
        <p style="margin:0 0 12px;">Hello from MongleKids.</p>
        <p style="margin:0 0 12px;">Here's what we'll send you — occasionally, and with care:</p>
        <ul style="margin:0 0 16px;padding-left:20px;">
          <li>Product news and new features</li>
          <li>Creative learning ideas to try with your child</li>
          <li>Launch and beta early-access news</li>
        </ul>
        <p style="margin:0 0 20px;">You can browse past issues in our archive anytime.</p>
        <p style="text-align:center;margin:0;">
          <a href="${SITE_URL}/news" style="display:inline-block;background:#a6694c;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 24px;border-radius:999px;">Read MongleKids News</a>
        </p>`;

  return {
    subject:
      lang === "ko"
        ? "몽글키즈 소식, 이제 받아보실 수 있어요 🎈"
        : "You're in — MongleKids updates are coming 🎈",
    html: emailShell({ lang, bodyHtml, unsubscribeToken }),
  };
}

/** Send one email via Resend. Returns true on success, false otherwise. */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "MongleKids <onboarding@resend.dev>";
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY missing — email skipped");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html }),
    });
    if (!res.ok) {
      console.error("[email] resend failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] network error", err);
    return false;
  }
}
