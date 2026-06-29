alter table public.audits
  add column if not exists started_at timestamptz;

create index if not exists audits_queue_claim_idx
  on public.audits (created_at)
  where status = 'queued';

create or replace function public.claim_next_queued_audit()
returns table (
  id text,
  user_id uuid,
  job_id text,
  input_url text
)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_audit public.audits%rowtype;
begin
  select *
    into v_audit
  from public.audits
  where status = 'queued'
  order by created_at asc
  for update skip locked
  limit 1;

  if v_audit.id is null then
    return;
  end if;

  update public.audits
  set
    status = 'crawling',
    started_at = now(),
    error = null
  where public.audits.id = v_audit.id;

  if v_audit.job_id is not null then
    update public.audit_jobs
    set status = 'running'
    where public.audit_jobs.id = v_audit.job_id;
  end if;

  return query
  select v_audit.id, v_audit.user_id, v_audit.job_id, v_audit.input_url;
end;
$$;

revoke execute on function public.claim_next_queued_audit() from public, anon, authenticated;
grant execute on function public.claim_next_queued_audit() to service_role;

create or replace function public.recover_stale_audits(p_stale_after_minutes integer default 30)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_count integer;
begin
  with recovered as (
    update public.audits
    set
      status = 'queued',
      started_at = null,
      error = 'Recovered after the audit worker stopped before completion.'
    where status in ('crawling', 'auditing')
      and started_at is not null
      and started_at < now() - make_interval(mins => greatest(p_stale_after_minutes, 5))
    returning job_id
  )
  select count(*)::integer into v_count from recovered;

  update public.audit_jobs as jobs
  set status = 'queued'
  where exists (
    select 1
    from public.audits as audits
    where audits.job_id = jobs.id
      and audits.status = 'queued'
  )
    and jobs.status not in ('complete', 'failed');

  return v_count;
end;
$$;

revoke execute on function public.recover_stale_audits(integer) from public, anon, authenticated;
grant execute on function public.recover_stale_audits(integer) to service_role;
