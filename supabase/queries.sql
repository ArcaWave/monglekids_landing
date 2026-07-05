-- ============================================================
-- MongleKids · saved operational queries
-- Paste these into the Supabase SQL Editor and use "Save query"
-- so each becomes a one-click report. Results can be exported
-- with the "Download CSV" button under the result grid.
-- ============================================================

-- ── Subscribers: overview ────────────────────────────────────
select
  count(*)                                          as total,
  count(*) filter (where unsubscribed_at is null)   as active,
  count(*) filter (where unsubscribed_at is not null) as unsubscribed,
  count(*) filter (where lang = 'ko')               as korean,
  count(*) filter (where lang = 'en')               as english
from public.subscribers;

-- ── Subscribers: weekly signups (last 8 weeks) ───────────────
select
  date_trunc('week', created_at)::date as week,
  count(*)                             as signups
from public.subscribers
group by 1
order by 1 desc
limit 8;

-- ── Subscribers: by role / age range / interests ─────────────
select coalesce(role, '(none)') as role, count(*) from public.subscribers
where unsubscribed_at is null group by 1 order by 2 desc;

select coalesce(child_age_range, '(none)') as age_range, count(*) from public.subscribers
where unsubscribed_at is null group by 1 order by 2 desc;

select unnest(interests) as interest, count(*) from public.subscribers
where unsubscribed_at is null group by 1 order by 2 desc;

-- ── Subscribers: full CSV export (Download CSV on the result) ─
select
  email, name, phone, role, child_age_range,
  array_to_string(interests, '; ') as interests,
  lang, source, created_at, unsubscribed_at
from public.subscribers
order by created_at desc;

-- ── Waitlist: overview (existing beta list) ──────────────────
select
  count(*)                            as total,
  count(*) filter (where lang = 'ko') as korean,
  count(*) filter (where lang = 'en') as english
from public.waitlist;

-- ── Waitlist ∩ Subscribers: emails on both lists ─────────────
select w.email, w.created_at as waitlist_at, s.created_at as subscribed_at
from public.waitlist w
join public.subscribers s on s.email = lower(w.email)
order by w.created_at desc;
