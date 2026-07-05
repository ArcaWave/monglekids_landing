import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

/**
 * POST /api/unsubscribe — mark a subscriber as unsubscribed.
 *
 * Called from the /unsubscribe page (which requires an explicit button
 * click, so email scanners that prefetch GET links can't unsubscribe
 * people by accident). Token-based: no login needed.
 */

const BodySchema = z.object({
  token: z.string().uuid(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "invalid_token" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("[unsubscribe] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing");
    return res.status(500).json({ ok: false, error: "server_misconfigured" });
  }

  const patch = await fetch(
    `${supabaseUrl}/rest/v1/subscribers?unsubscribe_token=eq.${parsed.data.token}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    },
  );

  if (!patch.ok) {
    console.error("[unsubscribe] patch failed", patch.status, await patch.text());
    return res.status(502).json({ ok: false, error: "storage_failed" });
  }

  const rows = (await patch.json()) as unknown[];
  if (rows.length === 0) {
    return res.status(404).json({ ok: false, error: "token_not_found" });
  }

  return res.status(200).json({ ok: true });
}
