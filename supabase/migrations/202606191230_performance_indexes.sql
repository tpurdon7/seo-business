create index if not exists api_tokens_user_id_idx
  on public.api_tokens (user_id);

create index if not exists audit_jobs_user_id_idx
  on public.audit_jobs (user_id);

create index if not exists audits_user_id_idx
  on public.audits (user_id);

create index if not exists audits_job_id_idx
  on public.audits (job_id);

create index if not exists waitlist_requests_user_id_idx
  on public.waitlist_requests (user_id);

drop policy if exists "profiles are owner readable" on public.profiles;
create policy "profiles are owner readable"
  on public.profiles for select
  using ((select auth.uid()) = id);

drop policy if exists "usage limits are owner readable" on public.usage_limits;
create policy "usage limits are owner readable"
  on public.usage_limits for select
  using ((select auth.uid()) = user_id);

drop policy if exists "audit jobs are owner readable" on public.audit_jobs;
create policy "audit jobs are owner readable"
  on public.audit_jobs for select
  using ((select auth.uid()) = user_id);

drop policy if exists "audits are owner readable" on public.audits;
create policy "audits are owner readable"
  on public.audits for select
  using ((select auth.uid()) = user_id);

drop policy if exists "api tokens are owner readable" on public.api_tokens;
create policy "api tokens are owner readable"
  on public.api_tokens for select
  using ((select auth.uid()) = user_id);

drop policy if exists "waitlist requests are owner readable" on public.waitlist_requests;
create policy "waitlist requests are owner readable"
  on public.waitlist_requests for select
  using ((select auth.uid()) = user_id);
