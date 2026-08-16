import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac } from "node:crypto";
import { z } from "zod";

/**
 * POST /api/gallery-access — validate a gallery entry code and hand back
 * the room id for it.
 *
 * Each event code (e.g. "testA") maps to its own isolated room: the
 * room id is an HMAC of the code with a server-only salt, and the 3D
 * gallery (public/gallery/index.html) uses it as the MQTT topic suffix
 * and localStorage key. Because the hash never appears client-side
 * before validation, outsiders can't derive the room topic and join
 * through the public MQTT broker directly.
 *
 * Env (server-only):
 *   GALLERY_CODES     — comma-separated valid codes ("testA,testB").
 *                       Add/remove codes here to open/close events —
 *                       no redeploy of the page needed.
 *   GALLERY_ROOM_SALT — long random secret; changing it rotates every
 *                       room topic at once.
 */

const BodySchema = z.object({
  code: z.string().trim().min(1).max(40),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "invalid_input" });
  }

  const codesRaw = process.env.GALLERY_CODES;
  const salt = process.env.GALLERY_ROOM_SALT;
  if (!codesRaw || !salt) {
    console.error("[gallery-access] GALLERY_CODES / GALLERY_ROOM_SALT missing");
    return res.status(500).json({ ok: false, error: "server_misconfigured" });
  }

  const codes = codesRaw.split(",").map((c) => c.trim()).filter(Boolean);
  const code = parsed.data.code;
  if (!codes.includes(code)) {
    return res.status(401).json({ ok: false, error: "invalid_code" });
  }

  const room = createHmac("sha256", salt).update(code).digest("hex").slice(0, 20);
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ ok: true, room });
}
