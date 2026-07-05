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
const bodyHtml = marked.parse(body, { async: false });

function shell(unsubToken) {
  const unsub =
    lang === "ko"
      ? `이 메일은 몽글키즈 소식 수신에 동의하신 분께 발송됩니다. <a href="${SITE_URL}/unsubscribe?token=${unsubToken}" style="color:#a6694c;">수신거부</a>`
      : `You are receiving this because you subscribed to MongleKids updates. <a href="${SITE_URL}/unsubscribe?token=${unsubToken}" style="color:#a6694c;">Unsubscribe</a>`;
  return `<!doctype html>
<html lang="${lang}"><body style="margin:0;padding:0;background:#fcf7ec;font-family:'Apple SD Gothic Neo','Malgun Gothic',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fcf7ec;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;padding:36px 32px;border:1px solid #f0dccb;">
<tr><td align="center" style="padding-bottom:20px;"><img src="${SITE_URL}/brand/logo.png" alt="MongleKids" width="150" style="display:block;"/></td></tr>
<tr><td style="color:#4a3b2f;font-size:15px;line-height:1.78;">
<h1 style="font-size:22px;color:#3d2f24;margin:0 0 18px;">${subject}</h1>
${bodyHtml}
</td></tr>
<tr><td style="padding-top:28px;">
<p style="color:#b8a690;font-size:12px;line-height:1.6;text-align:center;margin:24px 0 0;border-top:1px solid #f5ead9;padding-top:20px;">
${unsub}<br/>아르카웨이브 (Arcawave) · <a href="${SITE_URL}" style="color:#b8a690;">monglekids.com</a>
</p></td></tr></table></td></tr></table></body></html>`;
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
console.log(` From:     ${RESEND_FROM}`);
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
    from: RESEND_FROM,
    to: s.email,
    subject,
    html: shell(s.unsubscribe_token),
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
