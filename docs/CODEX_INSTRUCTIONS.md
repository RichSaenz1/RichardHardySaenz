# Codex Instructions

## Project Boundary

Build one multi-tenant SaaS platform named Viva. Do not split Reserva Viva and Venta Viva into separate apps or separate databases.

## Current Rule

Step 1 only means auth, tenants, onboarding, dashboard, settings, migrations, RLS, docs.

Do not add WhatsApp, Vapi, AI, Stripe, n8n, Cal.com, products, orders, conversations, automations, or outbound messaging until explicitly requested.

## Provider Rule

Keep channel integrations provider-agnostic. Store future connections in `channel_bindings` so tenants can remain connected while the platform adds or changes provider lanes.

## Design Rule

Use a clean, light, premium SaaS interface. No decorative clutter. Dashboard first, not marketing first.

## Security Rule

Never commit service-role keys, database passwords, provider API keys, or real client data. Use Supabase RLS and session-scoped clients for app reads/writes.
