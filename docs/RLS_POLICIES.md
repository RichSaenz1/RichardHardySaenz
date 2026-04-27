# RLS Policies

RLS is required for all app tables.

## Helpers

- `is_tenant_member(target_tenant uuid)`: true when the current user belongs to a tenant.
- `tenant_member_role(target_tenant uuid)`: returns the current user's tenant role.
- `is_tenant_admin(target_tenant uuid)`: true for owner or admin.

## Step 1 Rules

- Users can read and update only their own profile.
- Tenant members can read their own tenant.
- Only owners/admins can update tenant data.
- Tenant members can read tenant settings.
- Only owners/admins can write tenant settings.
- Tenant members can read channel bindings.
- Only owners/admins can write channel bindings.
- Tenant members can read memberships in their tenant.

## Cross-Tenant Rule

No client code should use service-role credentials. Cross-tenant reads and writes must fail under the browser/session role.
