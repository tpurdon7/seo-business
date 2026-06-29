create schema if not exists analytics_private;

create table if not exists public.site_admin_emails (
  email text primary key,
  created_at timestamp with time zone not null default now()
);

alter table public.site_admin_emails enable row level security;

create table if not exists public.site_analytics_sessions (
  id uuid primary key,
  visitor_id text not null,
  created_at timestamp with time zone not null default now(),
  last_seen_at timestamp with time zone not null default now(),
  landing_path text,
  referrer text,
  source text,
  medium text,
  campaign text,
  term text,
  content text,
  user_agent text,
  device_type text,
  browser_language text,
  timezone text,
  screen_width integer,
  screen_height integer
);

alter table public.site_analytics_sessions enable row level security;

create index if not exists site_analytics_sessions_created_at_idx
  on public.site_analytics_sessions (created_at desc);

create index if not exists site_analytics_sessions_visitor_idx
  on public.site_analytics_sessions (visitor_id, created_at desc);

create table if not exists public.site_analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.site_analytics_sessions(id) on delete cascade,
  visitor_id text not null,
  event_type text not null check (event_type in ('page_view', 'heartbeat', 'click', 'error', 'form', 'custom')),
  event_name text,
  path text,
  title text,
  referrer text,
  duration_ms integer not null default 0 check (duration_ms >= 0),
  active_ms integer not null default 0 check (active_ms >= 0),
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone not null default now()
);

alter table public.site_analytics_events enable row level security;

create index if not exists site_analytics_events_created_at_idx
  on public.site_analytics_events (created_at desc);

create index if not exists site_analytics_events_session_idx
  on public.site_analytics_events (session_id, created_at desc);

create index if not exists site_analytics_events_type_idx
  on public.site_analytics_events (event_type, created_at desc);

create or replace function analytics_private.is_site_analytics_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    auth.role() = 'authenticated'
    and (
      not exists (select 1 from public.site_admin_emails)
      or exists (
        select 1
        from public.site_admin_emails admins
        where lower(admins.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
    );
$$;

create or replace function analytics_private.record_site_analytics_event(
  p_session_id uuid,
  p_visitor_id text,
  p_event_type text,
  p_event_name text,
  p_path text,
  p_title text,
  p_referrer text,
  p_duration_ms integer,
  p_active_ms integer,
  p_event_data jsonb,
  p_landing_path text,
  p_source text,
  p_medium text,
  p_campaign text,
  p_term text,
  p_content text,
  p_user_agent text,
  p_device_type text,
  p_browser_language text,
  p_timezone text,
  p_screen_width integer,
  p_screen_height integer
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_event_type not in ('page_view', 'heartbeat', 'click', 'error', 'form', 'custom') then
    raise exception 'Unsupported analytics event type.';
  end if;

  insert into public.site_analytics_sessions (
    id,
    visitor_id,
    landing_path,
    referrer,
    source,
    medium,
    campaign,
    term,
    content,
    user_agent,
    device_type,
    browser_language,
    timezone,
    screen_width,
    screen_height
  )
  values (
    p_session_id,
    left(coalesce(p_visitor_id, ''), 120),
    left(coalesce(p_landing_path, p_path, ''), 500),
    left(coalesce(p_referrer, ''), 1000),
    left(coalesce(p_source, 'direct'), 120),
    left(coalesce(p_medium, 'none'), 120),
    left(coalesce(p_campaign, ''), 180),
    left(coalesce(p_term, ''), 180),
    left(coalesce(p_content, ''), 180),
    left(coalesce(p_user_agent, ''), 500),
    left(coalesce(p_device_type, ''), 80),
    left(coalesce(p_browser_language, ''), 80),
    left(coalesce(p_timezone, ''), 120),
    greatest(0, coalesce(p_screen_width, 0)),
    greatest(0, coalesce(p_screen_height, 0))
  )
  on conflict (id) do update set
    last_seen_at = now();

  insert into public.site_analytics_events (
    session_id,
    visitor_id,
    event_type,
    event_name,
    path,
    title,
    referrer,
    duration_ms,
    active_ms,
    event_data
  )
  values (
    p_session_id,
    left(coalesce(p_visitor_id, ''), 120),
    p_event_type,
    left(coalesce(p_event_name, ''), 160),
    left(coalesce(p_path, ''), 500),
    left(coalesce(p_title, ''), 300),
    left(coalesce(p_referrer, ''), 1000),
    least(greatest(0, coalesce(p_duration_ms, 0)), 86400000),
    least(greatest(0, coalesce(p_active_ms, 0)), 86400000),
    coalesce(p_event_data, '{}'::jsonb)
  );
end;
$$;

revoke all on function analytics_private.record_site_analytics_event(
  uuid, text, text, text, text, text, text, integer, integer, jsonb,
  text, text, text, text, text, text, text, text, text, text, integer, integer
) from public;

grant usage on schema analytics_private to anon, authenticated;
grant execute on function analytics_private.record_site_analytics_event(
  uuid, text, text, text, text, text, text, integer, integer, jsonb,
  text, text, text, text, text, text, text, text, text, text, integer, integer
) to anon, authenticated;

create or replace function public.record_site_analytics_event(
  p_session_id uuid,
  p_visitor_id text,
  p_event_type text,
  p_event_name text,
  p_path text,
  p_title text,
  p_referrer text,
  p_duration_ms integer,
  p_active_ms integer,
  p_event_data jsonb,
  p_landing_path text,
  p_source text,
  p_medium text,
  p_campaign text,
  p_term text,
  p_content text,
  p_user_agent text,
  p_device_type text,
  p_browser_language text,
  p_timezone text,
  p_screen_width integer,
  p_screen_height integer
)
returns void
language sql
security invoker
set search_path = ''
as $$
  select analytics_private.record_site_analytics_event(
    p_session_id,
    p_visitor_id,
    p_event_type,
    p_event_name,
    p_path,
    p_title,
    p_referrer,
    p_duration_ms,
    p_active_ms,
    p_event_data,
    p_landing_path,
    p_source,
    p_medium,
    p_campaign,
    p_term,
    p_content,
    p_user_agent,
    p_device_type,
    p_browser_language,
    p_timezone,
    p_screen_width,
    p_screen_height
  );
$$;

grant execute on function public.record_site_analytics_event(
  uuid, text, text, text, text, text, text, integer, integer, jsonb,
  text, text, text, text, text, text, text, text, text, text, integer, integer
) to anon, authenticated;

create or replace function analytics_private.get_site_analytics(p_days integer default 30)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_since timestamp with time zone := now() - make_interval(days => least(greatest(coalesce(p_days, 30), 1), 365));
  v_result jsonb;
begin
  if not analytics_private.is_site_analytics_admin() then
    raise exception 'Not allowed to view analytics.';
  end if;

  with
    sessions as (
      select *
      from public.site_analytics_sessions
      where created_at >= v_since
    ),
    events as (
      select *
      from public.site_analytics_events
      where created_at >= v_since
    ),
    session_times as (
      select
        s.id,
        s.visitor_id,
        coalesce(max(e.active_ms), 0) as active_ms,
        coalesce(max(e.duration_ms), 0) as duration_ms
      from sessions s
      left join events e on e.session_id = s.id
      group by s.id, s.visitor_id
    ),
    page_stats as (
      select
        e.path,
        count(*) filter (where e.event_type = 'page_view') as views,
        count(distinct e.session_id) as sessions,
        coalesce(sum(e.active_ms), 0) as active_ms,
        coalesce(avg(nullif(e.active_ms, 0))::integer, 0) as avg_active_ms
      from events e
      where e.path is not null and e.path <> ''
      group by e.path
      order by active_ms desc, views desc
      limit 20
    ),
    source_stats as (
      select
        coalesce(nullif(source, ''), 'direct') as source,
        coalesce(nullif(medium, ''), 'none') as medium,
        count(*) as sessions,
        count(distinct visitor_id) as visitors
      from sessions
      group by 1, 2
      order by sessions desc
      limit 20
    ),
    referrer_stats as (
      select
        referrer,
        count(*) as sessions
      from sessions
      where referrer is not null and referrer <> ''
      group by referrer
      order by sessions desc
      limit 20
    ),
    recent_errors as (
      select
        created_at,
        path,
        event_name,
        event_data
      from events
      where event_type = 'error'
      order by created_at desc
      limit 25
    ),
    recent_clicks as (
      select
        created_at,
        path,
        event_name,
        event_data
      from events
      where event_type = 'click'
      order by created_at desc
      limit 25
    ),
    daily as (
      select
        date_trunc('day', created_at)::date as day,
        count(*) as sessions,
        count(distinct visitor_id) as visitors
      from sessions
      group by 1
      order by 1
    )
  select jsonb_build_object(
    'rangeDays', least(greatest(coalesce(p_days, 30), 1), 365),
    'summary', jsonb_build_object(
      'sessions', (select count(*) from sessions),
      'visitors', (select count(distinct visitor_id) from sessions),
      'pageViews', (select count(*) from events where event_type = 'page_view'),
      'avgActiveSeconds', (select coalesce(round(avg(active_ms) / 1000.0)::integer, 0) from session_times),
      'errors', (select count(*) from events where event_type = 'error'),
      'outboundClicks', (
        select count(*)
        from events
        where event_type = 'click'
          and coalesce(event_data ->> 'outbound', 'false') = 'true'
      )
    ),
    'topPages', coalesce((select jsonb_agg(to_jsonb(page_stats)) from page_stats), '[]'::jsonb),
    'sources', coalesce((select jsonb_agg(to_jsonb(source_stats)) from source_stats), '[]'::jsonb),
    'referrers', coalesce((select jsonb_agg(to_jsonb(referrer_stats)) from referrer_stats), '[]'::jsonb),
    'recentErrors', coalesce((select jsonb_agg(to_jsonb(recent_errors)) from recent_errors), '[]'::jsonb),
    'recentClicks', coalesce((select jsonb_agg(to_jsonb(recent_clicks)) from recent_clicks), '[]'::jsonb),
    'daily', coalesce((select jsonb_agg(to_jsonb(daily)) from daily), '[]'::jsonb)
  )
  into v_result;

  return v_result;
end;
$$;

revoke all on function analytics_private.get_site_analytics(integer) from public;
grant execute on function analytics_private.get_site_analytics(integer) to authenticated;

create or replace function public.get_site_analytics(p_days integer default 30)
returns jsonb
language sql
security invoker
set search_path = ''
as $$
  select analytics_private.get_site_analytics(p_days);
$$;

grant execute on function public.get_site_analytics(integer) to authenticated;
