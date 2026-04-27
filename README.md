# Viva Platform

Viva is the shared multi-tenant SaaS foundation for **Reserva Viva** and **Venta Viva**.

- **Reserva Viva:** future voice receptionist, missed-call recovery, and booking support.
- **Venta Viva:** future WhatsApp sales, catalog, cart, and checkout support.

Step 1 builds only the SaaS foundation: auth, tenants, onboarding, dashboard, settings, Supabase migrations, RLS, and project memory docs.

## Current Scope

Implemented in Step 1:

- Next.js, TypeScript, Tailwind
- Supabase Auth email/password flow
- Tenant onboarding
- Protected dashboard routes
- Settings updates for tenant profile and tenant settings
- Membership-based RLS migrations
- Provider-agnostic channel binding table for future WhatsApp/voice providers

Not implemented yet:

- WhatsApp, Unipile, Meta Cloud API, 360dialog
- Vapi voice
- AI agent tools or OpenAI calls
- Stripe billing or payment links
- n8n automations
- Cal.com booking sync
- catalog/products, orders, conversations, customers

## Local Setup

1. Install dependencies.

   ```bash
   pnpm install
   ```

2. Copy environment variables.

   ```bash
   cp .env.example .env.local
   ```

3. Add Supabase values.

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://spukghkxnpyvgzstpejz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Apply Supabase migration.

   If you have the Supabase CLI:

   ```bash
   supabase login
   supabase init
   supabase link --project-ref spukghkxnpyvgzstpejz
   supabase db push
   ```

   The CLI will ask for the database password. Do not commit that password.

5. For easiest local testing, disable email confirmation in Supabase Auth while developing:

   `Supabase Dashboard -> Authentication -> Providers -> Email -> Confirm email = off`

6. Run the app.

   ```bash
   pnpm dev
   ```

## Acceptance Checks

- User can sign up and log in.
- User without a tenant is redirected to onboarding.
- Onboarding creates tenant, owner membership, and tenant settings.
- Dashboard displays tenant data.
- Settings page updates tenant and tenant settings.
- RLS blocks cross-tenant access.
- Docs in `/docs` describe the product memory and build order.

## Deployment Notes

Vercel is connected to the team `Richard Hardy's projects`. The GitHub remote should be:

```bash
git remote add origin https://github.com/RichSaenz1/RichardHardySaenz
```

Deploy only after the Supabase migration is live and Vercel has the same environment variables.
