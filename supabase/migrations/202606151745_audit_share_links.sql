create schema if not exists audit_private;

create table if not exists public.audit_share_links (
  audit_id text primary key references public.audits(id) on delete cascade,
  token_hash text not null,
  enabled boolean not null default true,
  created_at timestamp with time zone not null default now()
);

alter table public.audit_share_links enable row level security;

create index if not exists audit_share_links_enabled_idx
  on public.audit_share_links (enabled)
  where enabled = true;

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
    and s.token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')
    and a.status = 'complete'
    and a.report_json is not null
  limit 1;
$$;

revoke all on function audit_private.get_shared_audit(text, text) from public;
grant usage on schema audit_private to anon, authenticated;
grant execute on function audit_private.get_shared_audit(text, text) to anon, authenticated;

create or replace function public.get_shared_audit(p_audit_id text, p_token text)
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
security invoker
set search_path = ''
as $$
  select * from audit_private.get_shared_audit(p_audit_id, p_token);
$$;

grant execute on function public.get_shared_audit(text, text) to anon, authenticated;
