/**
 * Newsletter subscription via our Vercel serverless function.
 *
 * Unlike the waitlist (which posts straight to Supabase with the anon
 * key), subscriptions go through POST /api/subscribe so the server can
 * send the Resend welcome email and write with the service-role key.
 * The subscribers table has no anon RLS policies at all.
 */

export type SubscribeInput = {
  email: string;
  name?: string;
  phone?: string;
  role?: "parent" | "educator" | "institution" | "other";
  child_age_range?: string;
  interests?: string[];
  consent_marketing: true;
  lang: string;
};

export type SubscribeResult = "ok" | "error" | "skipped";

export async function submitSubscription(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (res.ok) return "ok";

    // Local dev runs plain Vite with no /api functions — treat the 404
    // as demo mode so the page stays usable, but be loud about it.
    if (res.status === 404 && import.meta.env.DEV) {
      console.warn(
        "[subscribe] /api/subscribe not available under `vite dev` — demo mode. Deploy to Vercel (or run `vercel dev`) for the real flow.",
      );
      return "skipped";
    }

    console.error("[subscribe] failed", res.status, await res.text());
    return "error";
  } catch (err) {
    console.error("[subscribe] network error", err);
    return "error";
  }
}

export async function submitUnsubscribe(token: string): Promise<boolean> {
  try {
    const res = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
