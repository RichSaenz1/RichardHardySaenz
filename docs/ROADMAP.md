# Roadmap

1. SaaS foundation.
2. Catalog/products system.
3. Conversation/message storage.
4. Channel bindings.
5. WhatsApp beta lane.
6. Vapi voice lane.
7. AI agent tools.
8. Cart/orders/payment links.
9. n8n automations.
10. Stripe billing.
11. Cal.com booking sync.
12. Official WhatsApp API / 360dialog.
13. Monitoring/admin dashboard.

Only Step 1 is implemented now. Steps 2-13 are **NOT YET IMPLEMENTED**.

## Upgrade Principle

Build providers as replaceable modules. Existing clients should keep working when new provider lanes are added. Migrations from beta WhatsApp to official WhatsApp may require client approval, but product settings and dashboard data must remain intact.
