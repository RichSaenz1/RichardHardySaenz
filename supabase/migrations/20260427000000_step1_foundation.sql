create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  business_type text not null,
  city text,
  country text,
  timezone text default 'America/Panama',
  status text default 'draft',
  plan text default 'starter',
  owner_user_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tenant_memberships (
  tenant_id uuid references public.tenants(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('owner','admin','staff')),
  created_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create table if not exists public.tenant_settings (
  tenant_id uuid primary key references public.tenants(id) on delete cascade,
  languages text[] default array['es'],
  whatsapp_number text,
  vapi_phone_number_id text,
  human_fallback_number text,
  booking_url text,
  tone text default 'friendly',
  greeting text,
  hours jsonb default '{}',
  services jsonb default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.channel_bindings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  channel text check (channel in ('voice','whatsapp')),
  provider text,
  external_id text,
  status text default 'pending',
  created_at timestamptz not null default now(),
  unique(channel, provider, external_id)
);

create index if not exists tenants_owner_user_id_idx on public.tenants(owner_user_id);
create index if not exists tenant_memberships_user_id_idx on public.tenant_memberships(user_id);
create index if not exists tenant_settings_tenant_id_idx on public.tenant_settings(tenant_id);
create index if not exists channel_bindings_tenant_id_idx on public.channel_bindings(tenant_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tenants_set_updated_at on public.tenants;
create trigger tenants_set_updated_at
before update on public.tenants
for each row execute function public.set_updated_at();

drop trigger if exists tenant_settings_set_updated_at on public.tenant_settings;
create trigger tenant_settings_set_updated_at
before update on public.tenant_settings
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.profiles.full_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_tenant_member(target_tenant uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tenant_memberships tm
    where tm.tenant_id = target_tenant
      and tm.user_id = auth.uid()
  );
$$;

create or replace function public.tenant_member_role(target_tenant uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select tm.role
  from public.tenant_memberships tm
  where tm.tenant_id = target_tenant
    and tm.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.is_tenant_admin(target_tenant uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.tenant_member_role(target_tenant) in ('owner','admin'), false);
$$;

alter table public.profiles enable row level security;
alter table public.tenants enable row level security;
alter table public.tenant_memberships enable row level security;
alter table public.tenant_settings enable row level security;
alter table public.channel_bindings enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
using (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "tenants_select_member" on public.tenants;
create policy "tenants_select_member"
on public.tenants for select
using (public.is_tenant_member(id));

drop policy if exists "tenants_insert_owner" on public.tenants;
create policy "tenants_insert_owner"
on public.tenants for insert
with check (owner_user_id = auth.uid());

drop policy if exists "tenants_update_admin" on public.tenants;
create policy "tenants_update_admin"
on public.tenants for update
using (public.is_tenant_admin(id))
with check (public.is_tenant_admin(id));

drop policy if exists "tenant_memberships_select_member" on public.tenant_memberships;
create policy "tenant_memberships_select_member"
on public.tenant_memberships for select
using (public.is_tenant_member(tenant_id));

drop policy if exists "tenant_memberships_insert_owner_or_admin" on public.tenant_memberships;
create policy "tenant_memberships_insert_owner_or_admin"
on public.tenant_memberships for insert
with check (
  (
    user_id = auth.uid()
    and role = 'owner'
    and exists (
      select 1
      from public.tenants t
      where t.id = tenant_id
        and t.owner_user_id = auth.uid()
    )
  )
  or public.is_tenant_admin(tenant_id)
);

drop policy if exists "tenant_memberships_update_admin" on public.tenant_memberships;
create policy "tenant_memberships_update_admin"
on public.tenant_memberships for update
using (public.is_tenant_admin(tenant_id))
with check (public.is_tenant_admin(tenant_id));

drop policy if exists "tenant_memberships_delete_admin" on public.tenant_memberships;
create policy "tenant_memberships_delete_admin"
on public.tenant_memberships for delete
using (public.is_tenant_admin(tenant_id));

drop policy if exists "tenant_settings_select_member" on public.tenant_settings;
create policy "tenant_settings_select_member"
on public.tenant_settings for select
using (public.is_tenant_member(tenant_id));

drop policy if exists "tenant_settings_insert_admin" on public.tenant_settings;
create policy "tenant_settings_insert_admin"
on public.tenant_settings for insert
with check (public.is_tenant_admin(tenant_id));

drop policy if exists "tenant_settings_update_admin" on public.tenant_settings;
create policy "tenant_settings_update_admin"
on public.tenant_settings for update
using (public.is_tenant_admin(tenant_id))
with check (public.is_tenant_admin(tenant_id));

drop policy if exists "channel_bindings_select_member" on public.channel_bindings;
create policy "channel_bindings_select_member"
on public.channel_bindings for select
using (public.is_tenant_member(tenant_id));

drop policy if exists "channel_bindings_insert_admin" on public.channel_bindings;
create policy "channel_bindings_insert_admin"
on public.channel_bindings for insert
with check (public.is_tenant_admin(tenant_id));

drop policy if exists "channel_bindings_update_admin" on public.channel_bindings;
create policy "channel_bindings_update_admin"
on public.channel_bindings for update
using (public.is_tenant_admin(tenant_id))
with check (public.is_tenant_admin(tenant_id));

drop policy if exists "channel_bindings_delete_admin" on public.channel_bindings;
create policy "channel_bindings_delete_admin"
on public.channel_bindings for delete
using (public.is_tenant_admin(tenant_id));
