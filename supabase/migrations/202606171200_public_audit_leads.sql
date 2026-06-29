alter table public.waitlist_requests
  add column if not exists niche text,
  add column if not exists website_url text,
  add column if not exists marketing_opt_in boolean not null default false,
  add column if not exists source text not null default 'waitlist';

create index if not exists waitlist_requests_source_created_at_idx
  on public.waitlist_requests (source, created_at desc);
