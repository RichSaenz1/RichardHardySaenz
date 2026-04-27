# Data Model

Step 1 tables:

- `profiles`: one row per Supabase user.
- `tenants`: one row per customer business.
- `tenant_memberships`: user-to-tenant roles: owner, admin, staff.
- `tenant_settings`: runtime business settings for future assistants and workflows.
- `channel_bindings`: provider-agnostic future connection records for voice and WhatsApp.

## Tenant Model

Each business is a tenant. Users access tenants through memberships. The platform must not rely only on `owner_user_id`; membership-based access is required from the first migration.

## Future Tables

The following are **NOT YET IMPLEMENTED**: contacts, customers, catalog items, conversations, messages, carts, orders, payments, appointments, webhook events, consents, audit logs, usage metering.
