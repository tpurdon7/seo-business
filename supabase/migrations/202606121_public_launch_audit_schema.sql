create extension if not exists pgcrypto;
create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.usage_limits (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  free_audits_used integer not null default 0 check (free_audits_used >= 0),
  free_audit_limit integer not null default 1 check (free_audit_limit >= 0),
  reset_policy text not null default 'none',
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_jobs (
  id text primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('queued', 'running', 'complete', 'failed')),
  total integer not null default 1 check (total >= 0),
  completed integer not null default 0 check (completed >= 0),
  failed integer not null default 0 check (failed >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.audits (
  id text primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_id text references public.audit_jobs(id) on delete set null,
  input_url text not null,
  final_url text,
  status text not null check (status in ('queued', 'crawling', 'auditing', 'complete', 'failed')),
  score_total integer,
  report_json jsonb,
  extracted_json jsonb,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists public.api_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null default 'Mac app',
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);

create table if not exists public.waitlist_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.usage_limits enable row level security;
alter table public.audit_jobs enable row level security;
alter table public.audits enable row level security;
alter table public.api_tokens enable row level security;
alter table public.waitlist_requests enable row level security;

drop policy if exists "profiles are owner readable" on public.profiles;
create policy "profiles are owner readable"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "usage limits are owner readable" on public.usage_limits;
create policy "usage limits are owner readable"
  on public.usage_limits for select
  using (auth.uid() = user_id);

drop policy if exists "audit jobs are owner readable" on public.audit_jobs;
create policy "audit jobs are owner readable"
  on public.audit_jobs for select
  using (auth.uid() = user_id);

drop policy if exists "audits are owner readable" on public.audits;
create policy "audits are owner readable"
  on public.audits for select
  using (auth.uid() = user_id);

drop policy if exists "api tokens are owner readable" on public.api_tokens;
create policy "api tokens are owner readable"
  on public.api_tokens for select
  using (auth.uid() = user_id);

drop policy if exists "waitlist requests are owner readable" on public.waitlist_requests;
create policy "waitlist requests are owner readable"
  on public.waitlist_requests for select
  using (auth.uid() = user_id);

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, coalesce(new.email, 'unknown@example.com'))
  on conflict (id) do update set email = excluded.email;

  insert into public.usage_limits (user_id, free_audit_limit)
  values (new.id, 1)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure private.handle_new_user();
