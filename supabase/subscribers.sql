-- ============================================================
-- MongleKids newsletter subscribers
-- Run this once in the Supabase SQL Editor (Dashboard → SQL).
--
-- Security model (stricter than waitlist):
--   RLS is enabled with NO policies at all, so the public anon key
--   can neither read nor write this table. All access goes through
--   the Vercel serverless functions (api/subscribe.ts,
--   api/unsubscribe.ts), which use the service-role key.
-- ============================================================

create table if not exists public.subscribers (
  id                 uuid primary key default gen_random_uuid(),
  email              text not null unique,
  name               text,
  phone              text,
  role               text check (role in ('parent', 'educator', 'institution', 'other')),
  child_age_range    text,
  interests          text[],
  consent_marketing  boolean not null default false,
  lang               text not null default 'ko',
  source             text not null default 'landing_page',
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unsubscribed_at    timestamptz,
  unsubscribe_token  uuid not null default gen_random_uuid()
);

-- Emails are normalized to lowercase by the API before insert, so a
-- plain unique constraint on `email` is enough (and lets PostgREST
-- upserts use `on_conflict=email`, which expression indexes cannot).

create index if not exists subscribers_active_idx
  on public.subscribers (created_at desc)
  where unsubscribed_at is null;

create index if not exists subscribers_token_idx
  on public.subscribers (unsubscribe_token);

alter table public.subscribers enable row level security;

-- Intentionally NO policies: anon and authenticated roles are fully
-- locked out. Only the service-role key (server-side) can touch rows.

-- service_role bypasses RLS but still needs plain table privileges.
-- (Some projects don't apply default grants to tables created in the
-- SQL Editor — without this line the API gets 42501 permission denied.)
grant select, insert, update on public.subscribers to service_role;
