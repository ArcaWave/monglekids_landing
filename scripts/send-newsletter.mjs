#!/usr/bin/env node
/**
 * Send a newsletter issue to all active subscribers via Resend.
 *
 * Usage:
 *   RESEND_API_KEY=... SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *     node scripts/send-newsletter.mjs src/content/newsletters/2026-06-10-beta-preview-bridge.ko.md
 *
 * Flags:
 *   --dry    Print recipient count + subject and exit without sending.
 *   --yes    Skip the interactive confirmation prompt.
 *
 * Behavior:
 *   - The file's language suffix (.ko.md / .en.md) selects subscribers
 *     with the matching `lang`, so each audience gets its own issue.
 *   - Every email carries that subscriber's personal unsubscribe link.
 *   - Sends through Resend's batch endpoint in chunks of 100.
 */

import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { createInterface } from "node:readline/promises";
import { marked } from "marked";

const SITE_URL = "https://www.monglekids.com";

// ---------- args & env ----------
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const yes = args.includes("--yes");
const file = args.find((a) => !a.startsWith("--"));

if (!file) {
  console.error("Usage: node scripts/send-newsletter.mjs <issue.(ko|en).md> [--dry] [--yes]");
  process.exit(1);
}

const { RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
const RESEND_FROM = process.env.RESEND_FROM ?? "MongleKids <onboarding@resend.dev>";
if (!dry && (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY)) {
  console.error("Missing env: RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// ---------- parse the issue ----------
const langMatch = /\.(ko|en)\.md$/.exec(basename(file));
if (!langMatch) {
  console.error("File name must end with .ko.md or .en.md (it selects the audience).");
  process.exit(1);
}
const lang = langMatch[1];

const raw = readFileSync(file, "utf8");
const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
const meta = {};
if (fm) {
  for (const line of fm[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx !== -1) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
}
const body = fm ? raw.slice(fm[0].length) : raw;
const subject = meta.title ?? basename(file);
const slug = basename(file).replace(/\.(ko|en)\.md$/, "");
const bodyHtml = marked.parse(body, { async: false });

// Personal display name per language; address comes from RESEND_FROM.
const fromAddr = /<([^>]+)>/.exec(RESEND_FROM)?.[1] ?? RESEND_FROM.trim();
const FROM = lang === "ko" ? `몽글키즈 <${fromAddr}>` : `MongleKids <${fromAddr}>`;
const REPLY_TO = "help@arcawave.xyz";

// Plain letter shell — matches api/_lib/email.ts. No images, no card,
// no buttons: personal-mail signals keep issues out of the Promotions
// tab. The pretty clay version of the issue lives on the website.
function shell(unsubToken, slug) {
  const webLink = slug ? `${SITE_URL}/news/${slug}` : `${SITE_URL}/news`;
  const web =
    lang === "ko"
      ? `웹에서 보기: <a href="${webLink}" style="color:#a6694c;">${webLink.replace("https://", "")}</a>`
      : `Read on the web: <a href="${webLink}" style="color:#a6694c;">${webLink.replace("https://", "")}</a>`;
  const unsub =
    lang === "ko"
      ? `몽글키즈 소식 수신에 동의하셔서 보내드렸어요. 더 받고 싶지 않으시면 <a href="${SITE_URL}/unsubscribe?token=${unsubToken}" style="color:#8a7a68;">수신거부</a>를 눌러주세요.`
      : `You're receiving this because you subscribed to MongleKids updates. <a href="${SITE_URL}/unsubscribe?token=${unsubToken}" style="color:#8a7a68;">Unsubscribe</a> anytime.`;
  return `<!doctype html>
<html lang="${lang}"><body style="margin:0;padding:24px 16px;background:#ffffff;">
<div style="max-width:600px;margin:0 auto;font-family:'Apple SD Gothic Neo','Malgun Gothic',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#333333;">
${bodyHtml}
<p style="margin:24px 0 0;color:#8a7a68;font-size:13px;">${web}</p>
<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #eeeeee;color:#999999;font-size:12px;line-height:1.6;">
${unsub}<br/>아르카웨이브 (Arcawave) · monglekids.com
</p></div></body></html>`;
}

// ---------- fetch active subscribers ----------
async function fetchSubscribers() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/subscribers?select=email,unsubscribe_token&unsubscribed_at=is.null&lang=eq.${lang}`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (!res.ok) {
    console.error("Failed to fetch subscribers:", res.status, await res.text());
    process.exit(1);
  }
  return res.json();
}

// ---------- main ----------
const subscribers =
  dry && (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) ? [] : await fetchSubscribers();

console.log("──────────────────────────────────────");
console.log(` Issue:    ${subject}`);
console.log(` File:     ${file}`);
console.log(` Audience: lang=${lang}, active subscribers = ${subscribers.length}`);
console.log(` From:     ${FROM} (reply-to: ${REPLY_TO})`);
console.log("──────────────────────────────────────");

if (dry) {
  console.log("(dry run — nothing sent)");
  process.exit(0);
}
if (subscribers.length === 0) {
  console.log("No active subscribers for this language. Nothing to send.");
  process.exit(0);
}

if (!yes) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`Send to ${subscribers.length} subscribers? (yes/no) `);
  rl.close();
  if (answer.trim().toLowerCase() !== "yes") {
    console.log("Aborted.");
    process.exit(0);
  }
}

// Resend batch endpoint accepts up to 100 emails per call.
let sent = 0;
for (let i = 0; i < subscribers.length; i += 100) {
  const chunk = subscribers.slice(i, i + 100);
  const payload = chunk.map((s) => ({
    from: FROM,
    to: s.email,
    subject,
    html: shell(s.unsubscribe_token, slug),
    reply_to: REPLY_TO,
  }));
  const res = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error(`Batch ${i / 100 + 1} failed:`, res.status, await res.text());
    console.error(`Sent so far: ${sent}. Fix the issue and resume manually.`);
    process.exit(1);
  }
  sent += chunk.length;
  console.log(`Sent ${sent}/${subscribers.length}…`);
  if (i + 100 < subscribers.length) await new Promise((r) => setTimeout(r, 600));
}

console.log(`Done. ${sent} emails handed to Resend.`);
