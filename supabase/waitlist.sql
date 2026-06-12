-- ============================================================
-- MongleKids landing waitlist
-- Run this once in the Supabase SQL Editor (Dashboard → SQL).
-- ============================================================

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  child_age   int,
  interest    text,
  lang        text not null default 'ko',
  source      text not null default 'landing',
  created_at  timestamptz not null default now()
);

-- One signup per email (case-insensitive). PostgREST surfaces a
-- violation as HTTP 409, which the client treats as "already on the list".
create unique index if not exists waitlist_email_unique
  on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

-- Anyone holding the anon key may sign up...
create policy "waitlist_insert_anon" on public.waitlist
  for insert to anon
  with check (true);

-- ...but there is intentionally NO select/update/delete policy for anon:
-- the public key can write a row and never read the list back.
-- Read the list via the Dashboard (Table Editor) or the service-role key.

-- ------------------------------------------------------------
-- Migration: if you already created the earlier schema that had
-- a NOT NULL parent_name column, run this once so inserts from
-- the current form (which no longer sends a name) succeed:
--
--   alter table public.waitlist drop column if exists parent_name;
-- ------------------------------------------------------------
