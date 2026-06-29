create table if not exists public.public_audit_rate_limits (
  key_hash text primary key,
  window_started_at timestamp with time zone not null default now(),
  request_count integer not null default 1 check (request_count >= 0),
  updated_at timestamp with time zone not null default now()
);

alter table public.public_audit_rate_limits enable row level security;

create or replace function audit_private.claim_public_audit_rate_limit(
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_allowed boolean := false;
begin
  if coalesce(p_key_hash, '') = '' or p_limit < 1 or p_window_seconds < 1 then
    return false;
  end if;

  insert into public.public_audit_rate_limits (
    key_hash,
    window_started_at,
    request_count,
    updated_at
  )
  values (p_key_hash, now(), 1, now())
  on conflict (key_hash) do update
    set
      window_started_at = case
        when public.public_audit_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
          then now()
        else public.public_audit_rate_limits.window_started_at
      end,
      request_count = case
        when public.public_audit_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
          then 1
        else public.public_audit_rate_limits.request_count + 1
      end,
      updated_at = now()
    where
      public.public_audit_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
      or public.public_audit_rate_limits.request_count < p_limit
  returning true into v_allowed;

  return coalesce(v_allowed, false);
end;
$$;

revoke all on function audit_private.claim_public_audit_rate_limit(text, integer, integer) from public;
grant usage on schema audit_private to service_role;
grant execute on function audit_private.claim_public_audit_rate_limit(text, integer, integer) to service_role;

create or replace function public.claim_public_audit_rate_limit(
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language sql
security invoker
set search_path = ''
as $$
  select audit_private.claim_public_audit_rate_limit(p_key_hash, p_limit, p_window_seconds);
$$;

revoke all on function public.claim_public_audit_rate_limit(text, integer, integer) from public;
grant execute on function public.claim_public_audit_rate_limit(text, integer, integer) to service_role;

create or replace function audit_private.consume_free_audit(p_user_id uuid)
returns table (
  allowed boolean,
  free_audits_used integer,
  free_audit_limit integer
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query
  with updated as (
    update public.usage_limits
      set
        free_audits_used = public.usage_limits.free_audits_used + 1,
        updated_at = now()
    where user_id = p_user_id
      and free_audits_used < free_audit_limit
    returning public.usage_limits.free_audits_used, public.usage_limits.free_audit_limit
  )
  select true, updated.free_audits_used, updated.free_audit_limit
  from updated;

  if not found then
    return query
    select false, u.free_audits_used, u.free_audit_limit
    from public.usage_limits u
    where u.user_id = p_user_id;
  end if;
end;
$$;

revoke all on function audit_private.consume_free_audit(uuid) from public;
grant execute on function audit_private.consume_free_audit(uuid) to service_role;

create or replace function public.consume_free_audit(p_user_id uuid)
returns table (
  allowed boolean,
  free_audits_used integer,
  free_audit_limit integer
)
language sql
security invoker
set search_path = ''
as $$
  select * from audit_private.consume_free_audit(p_user_id);
$$;

revoke all on function public.consume_free_audit(uuid) from public;
grant execute on function public.consume_free_audit(uuid) to service_role;

create or replace function analytics_private.is_site_analytics_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    auth.role() = 'authenticated'
    and exists (
      select 1
      from public.site_admin_emails admins
      where lower(admins.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

revoke execute on function public.record_site_analytics_event(
  uuid, text, text, text, text, text, text, integer, integer, jsonb,
  text, text, text, text, text, text, text, text, text, text, integer, integer
) from anon, authenticated;
grant execute on function public.record_site_analytics_event(
  uuid, text, text, text, text, text, text, integer, integer, jsonb,
  text, text, text, text, text, text, text, text, text, text, integer, integer
) to service_role;

alter table public.audit_share_links
  add column if not exists expires_at timestamp with time zone not null default (now() + interval '90 days');

alter table public.audit_share_links
  add column if not exists revoked_at timestamp with time zone;

create or replace function audit_private.get_shared_audit(p_audit_id text, p_token text)
returns table (
  id text,
  input_url text,
  final_url text,
  status text,
  score_total integer,
  report_json jsonb,
  extracted_json jsonb,
  error text,
  created_at timestamp with time zone
)
language sql
security definer
set search_path = ''
as $$
  select
    a.id,
    a.input_url,
    a.final_url,
    a.status,
    a.score_total,
    a.report_json,
    a.extracted_json,
    a.error,
    a.created_at
  from public.audits a
  join public.audit_share_links s on s.audit_id = a.id
  where a.id = p_audit_id
    and s.enabled = true
    and s.revoked_at is null
    and s.expires_at > now()
    and s.token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')
    and a.status = 'complete'
    and a.report_json is not null
  limit 1;
$$;

revoke all on function audit_private.get_shared_audit(text, text) from public;
grant usage on schema audit_private to anon, authenticated;
grant execute on function audit_private.get_shared_audit(text, text) to anon, authenticated;
