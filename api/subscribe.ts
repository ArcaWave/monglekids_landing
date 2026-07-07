import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
// NOTE: the .js extension is required — package.json has "type": "module",
// so Vercel runs this as ESM, and ESM mandates explicit extensions on
// relative imports (TS resolves .js → the .ts source at compile time).
import { welcomeEmail, sendEmail } from "./_lib/email.js";

/**
 * POST /api/subscribe — add (or reactivate) a newsletter subscriber.
 *
 * Runs on Vercel serverless so the Supabase service-role key and the
 * Resend API key never reach the client. The `subscribers` table has
 * RLS enabled with no policies, so this function is the only door in.
 *
 * Env (server-only): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 *                    RESEND_API_KEY, RESEND_FROM
 */

const BodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  name: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(40).optional(),
  role: z.enum(["parent", "educator", "institution", "other"]).optional(),
  child_age_range: z.string().trim().max(20).optional(),
  interests: z.array(z.string().trim().max(60)).max(10).optional(),
  consent_marketing: z.literal(true),
  lang: z.enum(["ko", "en"]).default("ko"),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "invalid_input",
      details: parsed.error.flatten().fieldErrors,
    });
  }
  const input = parsed.data;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("[subscribe] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing");
    return res.status(500).json({ ok: false, error: "server_misconfigured" });
  }

  // Upsert on email: a returning visitor (even one who unsubscribed)
  // is quietly reactivated with a fresh unsubscribe token.
  const upsert = await fetch(
    `${supabaseUrl}/rest/v1/subscribers?on_conflict=email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        email: input.email,
        name: input.name ?? null,
        phone: input.phone ?? null,
        role: input.role ?? null,
        child_age_range: input.child_age_range ?? null,
        interests: input.interests ?? null,
        consent_marketing: true,
        lang: input.lang,
        source: "landing_page",
        unsubscribed_at: null,
        updated_at: new Date().toISOString(),
      }),
    },
  );

  if (!upsert.ok) {
    console.error("[subscribe] upsert failed", upsert.status, await upsert.text());
    return res.status(502).json({ ok: false, error: "storage_failed" });
  }

  const rows = (await upsert.json()) as Array<{ unsubscribe_token: string }>;
  const token = rows[0]?.unsubscribe_token;

  // Welcome email — best-effort. The subscription itself already
  // succeeded, so an email failure must not fail the request.
  let emailed = false;
  if (token) {
    const mail = welcomeEmail(input.lang, token);
    emailed = await sendEmail({ to: input.email, ...mail });
  }

  return res.status(200).json({ ok: true, emailed });
}
