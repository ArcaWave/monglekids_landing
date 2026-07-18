import type { VercelRequest, VercelResponse } from "@vercel/node";
import { timingSafeEqual } from "node:crypto";

/**
 * GET /api/subscribers — read-only subscriber export for admin tools
 * (e.g. the Google Sheets sync in scripts/sheets-sync.gs).
 *
 * The `subscribers` table has RLS with no policies, so the service-role
 * key is the only way in — and it must never leave the server. This
 * endpoint is the one door out: it reads with the service-role key but
 * gates access behind a separate ADMIN_TOKEN, so callers (Apps Script,
 * curl) never see the Supabase key and the token can be rotated on its
 * own.
 *
 * Auth: send the token as `Authorization: Bearer <ADMIN_TOKEN>` (header,
 *       preferred) or `?token=<ADMIN_TOKEN>` (query, convenience).
 *
 * Env (server-only): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_TOKEN
 */

/** Constant-time string compare that never throws on length mismatch. */
function tokenMatches(provided: string, expected: string): boolean {
  const a = new TextEncoder().encode(provided);
  const b = new TextEncoder().encode(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const adminToken = process.env.ADMIN_TOKEN;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!adminToken || !supabaseUrl || !serviceKey) {
    console.error("[subscribers] ADMIN_TOKEN / SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing");
    return res.status(500).json({ ok: false, error: "server_misconfigured" });
  }

  const header = req.headers.authorization ?? "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : "";
  const queryToken = typeof req.query.token === "string" ? req.query.token : "";
  const provided = bearer || queryToken;
  if (!provided || !tokenMatches(provided, adminToken)) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  // Newest first. Explicit column list — never select the unsubscribe
  // token (it can unsubscribe anyone) into an export sheet.
  const cols =
    "email,name,phone,role,child_age_range,interests,lang,source,consent_marketing,created_at,updated_at,unsubscribed_at";
  const query = await fetch(
    `${supabaseUrl}/rest/v1/subscribers?select=${cols}&order=created_at.desc`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    },
  );

  if (!query.ok) {
    console.error("[subscribers] query failed", query.status, await query.text());
    return res.status(502).json({ ok: false, error: "storage_failed" });
  }

  const rows = (await query.json()) as Array<Record<string, unknown>>;
  const active = rows.filter((r) => !r.unsubscribed_at);

  // Don't cache PII at the edge.
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    ok: true,
    total: rows.length,
    active: active.length,
    subscribers: rows,
  });
}
