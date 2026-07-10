/**
 * Shared email helpers for the Vercel serverless functions.
 * Talks to the Resend HTTP API directly with fetch — no SDK needed.
 *
 * Deliverability-first design: every email is styled like a personal
 * letter, not a marketing blast — white background, no images, no
 * buttons, minimal links, real reply-to. Gmail's tab classifier reads
 * these signals; plain "human" mail lands in Primary far more often
 * than branded HTML. The pretty clay-styled version of each issue
 * lives on the website (/news) instead.
 *
 * Env (server-only, never VITE_-prefixed):
 *  - RESEND_API_KEY   required to actually send
 *  - RESEND_FROM      e.g. `MongleKids <news@monglekids.com>`
 *                     (domain must be verified in Resend first)
 */

const SITE_URL = "https://www.monglekids.com";
const REPLY_TO = "help@arcawave.xyz";

export type Lang = "ko" | "en";

export function unsubscribeUrl(token: string): string {
  return `${SITE_URL}/unsubscribe?token=${token}`;
}

/** Sender address from RESEND_FROM, with a per-language display name. */
function fromFor(lang: Lang): string {
  const raw = process.env.RESEND_FROM ?? "MongleKids <onboarding@resend.dev>";
  const addr = /<([^>]+)>/.exec(raw)?.[1] ?? raw.trim();
  return lang === "ko" ? `몽글키즈 <${addr}>` : `MongleKids <${addr}>`;
}

/**
 * Plain letter shell — looks like something a person typed.
 * No images, no background color, no buttons; just readable text and
 * the legally required unsubscribe line in the footer.
 */
export function emailShell(opts: {
  lang: Lang;
  bodyHtml: string;
  unsubscribeToken: string;
}): string {
  const { lang, bodyHtml, unsubscribeToken } = opts;
  const unsub =
    lang === "ko"
      ? `몽글키즈 소식 수신에 동의하셔서 보내드렸어요. 더 받고 싶지 않으시면 <a href="${unsubscribeUrl(unsubscribeToken)}" style="color:#8a7a68;">수신거부</a>를 눌러주세요.`
      : `You're receiving this because you subscribed to MongleKids updates. <a href="${unsubscribeUrl(unsubscribeToken)}" style="color:#8a7a68;">Unsubscribe</a> anytime.`;

  return `<!doctype html>
<html lang="${lang}">
  <body style="margin:0;padding:24px 16px;background:#ffffff;">
    <div style="max-width:600px;margin:0 auto;font-family:'Apple SD Gothic Neo','Malgun Gothic',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#333333;">
      ${bodyHtml}
      <p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #eeeeee;color:#999999;font-size:12px;line-height:1.6;">
        ${unsub}<br/>
        아르카웨이브 (Arcawave) · monglekids.com
      </p>
    </div>
  </body>
</html>`;
}

export function welcomeEmail(lang: Lang, unsubscribeToken: string): {
  subject: string;
  html: string;
  from: string;
} {
  const bodyHtml =
    lang === "ko"
      ? `
        <p style="margin:0 0 16px;">안녕하세요, 몽글키즈 팀입니다.</p>
        <p style="margin:0 0 16px;">구독해주셔서 정말 감사해요. 앞으로 제품 소식, 아이와 함께해볼 수 있는 창의 교육 아이디어, 그리고 베타·출시 소식을 가끔, 정성껏 보내드릴게요.</p>
        <p style="margin:0 0 16px;">지난 소식이 궁금하시면 <a href="${SITE_URL}/news" style="color:#a6694c;">monglekids.com/news</a> 에서 언제든 볼 수 있어요.</p>
        <p style="margin:0 0 16px;">궁금한 점이나 하고 싶은 이야기가 있으면 이 메일에 그냥 답장해 주세요. 저희가 직접 읽고 답장드립니다.</p>
        <p style="margin:0;">몽글키즈 팀 드림</p>`
      : `
        <p style="margin:0 0 16px;">Hello, this is the MongleKids team.</p>
        <p style="margin:0 0 16px;">Thank you for subscribing. We'll occasionally send you product news, creative learning ideas to try with your child, and beta &amp; launch updates — always with care.</p>
        <p style="margin:0 0 16px;">You can browse past issues anytime at <a href="${SITE_URL}/news" style="color:#a6694c;">monglekids.com/news</a>.</p>
        <p style="margin:0 0 16px;">If you have any questions or thoughts, just reply to this email — a real person reads and answers every reply.</p>
        <p style="margin:0;">— The MongleKids team</p>`;

  return {
    subject:
      lang === "ko"
        ? "몽글키즈 구독을 환영해요"
        : "Welcome to MongleKids updates",
    html: emailShell({ lang, bodyHtml, unsubscribeToken }),
    from: fromFor(lang),
  };
}

/** Send one email via Resend. Returns true on success, false otherwise. */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = opts.from ?? process.env.RESEND_FROM ?? "MongleKids <onboarding@resend.dev>";
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
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        reply_to: REPLY_TO,
      }),
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
