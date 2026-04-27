# Architecture

## Locked Future Stack

- App: Next.js, TypeScript, Tailwind, Vercel.
- Auth/data: Supabase Auth, Supabase Postgres, RLS.
- Voice later: Vapi, GPT-4o or configured text model, Deepgram Nova-3 Multi, ElevenLabs.
- WhatsApp beta later: Unipile QR/pairing lane.
- WhatsApp official later: 360dialog or WhatsApp Cloud API.
- Workflows later: n8n on Railway.
- Booking later: Cal.com.
- Billing later: Stripe.
- Text LLM later: OpenAI API.

## Provider-Agnostic Channels

Channel integrations must sit behind `channel_bindings`, not inside tenant business data. A tenant may use Unipile today and migrate to 360dialog later without changing dashboard settings, catalog, services, or core tenant identity.

Provider migrations may require client action, but platform upgrades should not break existing tenants.

## Step 1 Runtime

Next.js server components and server actions use Supabase SSR clients. RLS protects all tenant data. Middleware protects dashboard and onboarding routes.
