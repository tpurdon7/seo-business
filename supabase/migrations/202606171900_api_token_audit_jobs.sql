create or replace function audit_private.create_api_token_audit_job(
  p_token_hash text,
  p_job_id text,
  p_urls text[],
  p_audit_ids text[]
)
returns table (
  job_id text,
  status text,
  audits jsonb
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_email text;
  v_count integer;
begin
  select t.user_id, p.email
    into v_user_id, v_email
  from public.api_tokens t
  left join public.profiles p on p.id = t.user_id
  where t.token_hash = p_token_hash
    and t.revoked_at is null
  limit 1;

  if v_user_id is null then
    raise exception 'Invalid or revoked API token.';
  end if;

  v_count := coalesce(array_length(p_urls, 1), 0);

  if v_count = 0 then
    raise exception 'Please provide at least one URL.';
  end if;

  if v_count > 100 then
    raise exception 'Please provide 100 URLs or fewer.';
  end if;

  if coalesce(array_length(p_audit_ids, 1), 0) <> v_count then
    raise exception 'Audit IDs must match URLs.';
  end if;

  insert into public.profiles (id, email)
  values (v_user_id, coalesce(v_email, v_user_id::text || '@unknown.local'))
  on conflict (id) do update set email = excluded.email;

  insert into public.usage_limits (user_id, free_audit_limit)
  values (v_user_id, 1)
  on conflict (user_id) do nothing;

  update public.api_tokens
    set last_used_at = now()
  where token_hash = p_token_hash
    and revoked_at is null;

  insert into public.audit_jobs (id, user_id, status, total, completed, failed, created_at)
  values (p_job_id, v_user_id, 'queued', v_count, 0, 0, now());

  insert into public.audits (
    id,
    user_id,
    job_id,
    input_url,
    final_url,
    status,
    score_total,
    report_json,
    extracted_json,
    error
  )
  select
    item.audit_id,
    v_user_id,
    p_job_id,
    item.url,
    null,
    'queued',
    null,
    null,
    null,
    null
  from unnest(p_urls, p_audit_ids) as item(url, audit_id);

  return query
  select
    p_job_id,
    'queued'::text,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'url', item.url,
          'auditId', item.audit_id,
          'status', 'queued',
          'reportUrl', null,
          'error', null
        )
      ),
      '[]'::jsonb
    )
  from unnest(p_urls, p_audit_ids) as item(url, audit_id);
end;
$$;

revoke all on function audit_private.create_api_token_audit_job(text, text, text[], text[]) from public;
grant execute on function audit_private.create_api_token_audit_job(text, text, text[], text[]) to anon, authenticated;

create or replace function public.create_api_token_audit_job(
  p_token_hash text,
  p_job_id text,
  p_urls text[],
  p_audit_ids text[]
)
returns table (
  job_id text,
  status text,
  audits jsonb
)
language sql
security invoker
set search_path = ''
as $$
  select * from audit_private.create_api_token_audit_job(p_token_hash, p_job_id, p_urls, p_audit_ids);
$$;

grant execute on function public.create_api_token_audit_job(text, text, text[], text[]) to anon, authenticated;

create or replace function audit_private.get_api_token_audit_job(
  p_token_hash text,
  p_job_id text
)
returns table (
  job_id text,
  status text,
  total integer,
  completed integer,
  failed integer,
  audits jsonb
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
begin
  select user_id
    into v_user_id
  from public.api_tokens
  where token_hash = p_token_hash
    and revoked_at is null
  limit 1;

  if v_user_id is null then
    raise exception 'Invalid or revoked API token.';
  end if;

  update public.api_tokens
    set last_used_at = now()
  where token_hash = p_token_hash
    and revoked_at is null;

  return query
  select
    j.id,
    j.status,
    j.total,
    j.completed,
    j.failed,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'url', a.input_url,
          'auditId', a.id,
          'status', a.status,
          'reportUrl', case when a.status in ('complete', 'failed') then '/audit/' || a.id else null end,
          'error', a.error
        )
        order by a.created_at
      ) filter (where a.id is not null),
      '[]'::jsonb
    )
  from public.audit_jobs j
  left join public.audits a on a.job_id = j.id and a.user_id = j.user_id
  where j.id = p_job_id
    and j.user_id = v_user_id
  group by j.id, j.status, j.total, j.completed, j.failed;
end;
$$;

revoke all on function audit_private.get_api_token_audit_job(text, text) from public;
grant execute on function audit_private.get_api_token_audit_job(text, text) to anon, authenticated;

create or replace function public.get_api_token_audit_job(
  p_token_hash text,
  p_job_id text
)
returns table (
  job_id text,
  status text,
  total integer,
  completed integer,
  failed integer,
  audits jsonb
)
language sql
security invoker
set search_path = ''
as $$
  select * from audit_private.get_api_token_audit_job(p_token_hash, p_job_id);
$$;

grant execute on function public.get_api_token_audit_job(text, text) to anon, authenticated;
