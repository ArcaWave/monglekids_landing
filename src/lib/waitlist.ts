/**
 * Waitlist submission via Supabase REST.
 *
 * We talk to PostgREST directly with fetch instead of pulling in
 * @supabase/supabase-js — a single INSERT doesn't justify ~30 kB of SDK.
 *
 * Security model:
 *  - The anon key is public by design (it ships in every Supabase web app).
 *  - The `waitlist` table has RLS enabled with an INSERT-only policy for
 *    the anon role and NO SELECT policy, so the key can add a row but can
 *    never read the list back. See supabase/waitlist.sql.
 */

export type WaitlistEntry = {
  parent_name: string;
  email: string;
  child_age: number;
  interest?: string;
  lang: string;
};

export type WaitlistResult = "ok" | "duplicate" | "error" | "skipped";

export async function submitWaitlist(
  entry: WaitlistEntry,
): Promise<WaitlistResult> {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !key) {
    // Demo mode: env vars not configured yet. Pretend success so the
    // landing page stays usable, but make the gap loud in the console.
    console.warn(
      "[waitlist] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing — submission skipped (demo mode).",
    );
    return "skipped";
  }

  try {
    const res = await fetch(`${url}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...entry, source: "landing" }),
    });

    if (res.ok) return "ok";
    // Unique-violation on lower(email) → they're already on the list.
    if (res.status === 409) return "duplicate";

    console.error("[waitlist] submit failed", res.status, await res.text());
    return "error";
  } catch (err) {
    console.error("[waitlist] network error", err);
    return "error";
  }
}
