# Product Spec

## Product Motions

**Reserva Viva** helps service businesses respond faster to calls and booking intent. Future modules include voice reception, WhatsApp handoff, booking links, reminders, and recovery flows.

**Venta Viva** helps businesses sell through chat. Future modules include WhatsApp product questions, recommendations, carts, payment links, and owner notifications.

## Core Principle

One SaaS platform supports both motions. Every business is a tenant. Shared platform logic reads tenant settings and connected channel bindings at runtime.

## Step 1 Scope

- Email/password signup and login.
- Protected dashboard routes.
- Tenant onboarding.
- Tenant settings management.
- Provider-agnostic channel binding schema for future providers.
- Clean dashboard shell with future modules marked as coming soon.

## Non-Goals For Step 1

Do not build WhatsApp, Unipile, 360dialog, Vapi, AI chat, OpenAI calls, Stripe, payment links, n8n workflows, Cal.com, catalog/products, orders, automations, or official API onboarding.
