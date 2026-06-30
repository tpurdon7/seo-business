create table if not exists private.audit_entitlements (
  email text primary key check (email = lower(email)),
  unlimited boolean not null default false,
  created_at timestamptz not null default now()
);

revoke all on table private.audit_entitlements from public, anon, authenticated;

insert into private.audit_entitlements (email, unlimited)
values
  ('tompurdon@icloud.com', true),
  ('tom@bettersearch.dev', true)
on conflict (email) do update
set unlimited = excluded.unlimited;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(coalesce(new.email, 'unknown@example.com'));
  v_unlimited boolean;
begin
  select coalesce(entitlement.unlimited, false)
    into v_unlimited
  from private.audit_entitlements as entitlement
  where entitlement.email = v_email;

  v_unlimited := coalesce(v_unlimited, false);

  insert into public.profiles (id, email)
  values (new.id, v_email)
  on conflict (id) do update set email = excluded.email;

  insert into public.usage_limits (
    user_id,
    free_audit_limit,
    reset_policy
  )
  values (
    new.id,
    case when v_unlimited then 2147483647 else 1 end,
    case when v_unlimited then 'unlimited' else 'none' end
  )
  on conflict (user_id) do update
  set
    free_audit_limit = case
      when v_unlimited then 2147483647
      else public.usage_limits.free_audit_limit
    end,
    reset_policy = case
      when v_unlimited then 'unlimited'
      else public.usage_limits.reset_policy
    end,
    updated_at = now();

  return new;
end;
$$;

revoke execute on function private.handle_new_user() from public, anon, authenticated;

update public.usage_limits as limits
set
  free_audit_limit = 2147483647,
  reset_policy = 'unlimited',
  updated_at = now()
from auth.users as users
join private.audit_entitlements as entitlement
  on entitlement.email = lower(users.email)
 and entitlement.unlimited
where limits.user_id = users.id;
