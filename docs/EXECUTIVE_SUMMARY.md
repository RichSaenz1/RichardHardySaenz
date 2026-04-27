# Executive Summary

Viva is one multi-tenant SaaS platform for two commercial motions:

- **Reserva Viva:** receptionist, missed-call recovery, and booking support for service businesses.
- **Venta Viva:** WhatsApp-led sales, product guidance, carts, and checkout support for chat-based sellers.

The platform must stay one codebase, one tenant model, one dashboard, and one event model. Tenants are businesses. Tenant-specific settings are injected at runtime; assistants and workflows must not be cloned per customer.

## Current Build Order

Step 1 is the SaaS foundation only: auth, tenants, onboarding, dashboard, settings, migrations, RLS, docs.

Future phases are **NOT YET IMPLEMENTED**: catalog, conversations, channel bindings, WhatsApp, Vapi, AI tools, orders, n8n, Stripe, Cal.com, official WhatsApp, monitoring/admin.

## Brand Structure

- Parent platform: **Viva**
- Product motions: **Reserva Viva** and **Venta Viva**
- Combined offer: **Viva Platform** or **Viva Suite**
