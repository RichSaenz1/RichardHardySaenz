# Vapi Integration Notes

The website assistant currently runs as a safe, client-side intake and booking flow.
It uses the shared `IntakeLead` model in `src/types/intake.ts`, which should also be
used by a future Vapi voice assistant so web and voice leads have the same structure.

Future Vapi connection points:

- `createLead`: persist an intake lead in a backend, CRM, or secure database.
- `sendWhatsAppSummary`: send or prepare a WhatsApp summary for the practice team.
- `checkAvailability`: request real calendar availability from a verified backend.
- `transferToHuman`: route the patient to WhatsApp, phone, or staff follow-up.

Recommended future architecture:

1. Configure the Vapi assistant ID and public key in environment variables.
2. Add a backend webhook endpoint for Vapi tool calls and post-call summaries.
3. Validate all incoming tool payloads against the shared `IntakeLead` shape.
4. Store only the minimum needed data and follow medical privacy requirements.
5. Keep medical guardrails: no diagnosis, lab interpretation, medication advice, or treatment recommendations.

TODO: Connect Vapi assistant/webhook once assistant ID, public key, backend endpoint,
and data handling policy are available. Do not expose API keys in the frontend.
