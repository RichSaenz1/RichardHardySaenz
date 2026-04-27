create or replace function public.create_tenant_with_owner(
  p_business_name text,
  p_business_type text,
  p_city text default null,
  p_country text default null,
  p_timezone text default 'America/Panama',
  p_language text default 'es',
  p_human_fallback_number text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  new_tenant_id uuid;
begin
  if current_user_id is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;

  select tm.tenant_id
  into new_tenant_id
  from public.tenant_memberships tm
  where tm.user_id = current_user_id
  order by tm.created_at asc
  limit 1;

  if new_tenant_id is not null then
    return new_tenant_id;
  end if;

  insert into public.tenants (
    business_name,
    business_type,
    city,
    country,
    timezone,
    status,
    plan,
    owner_user_id
  )
  values (
    p_business_name,
    p_business_type,
    nullif(p_city, ''),
    nullif(p_country, ''),
    coalesce(nullif(p_timezone, ''), 'America/Panama'),
    'draft',
    'starter',
    current_user_id
  )
  returning id into new_tenant_id;

  insert into public.tenant_memberships (tenant_id, user_id, role)
  values (new_tenant_id, current_user_id, 'owner');

  insert into public.tenant_settings (
    tenant_id,
    languages,
    human_fallback_number,
    tone,
    hours,
    services
  )
  values (
    new_tenant_id,
    array[coalesce(nullif(p_language, ''), 'es')],
    nullif(p_human_fallback_number, ''),
    'friendly',
    '{}',
    '[]'
  );

  return new_tenant_id;
end;
$$;

grant execute on function public.create_tenant_with_owner(
  text,
  text,
  text,
  text,
  text,
  text,
  text
) to authenticated;
