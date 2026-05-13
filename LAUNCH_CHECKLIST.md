# UroPanama Launch Checklist

## Identity And Clinical Verification

- Verify final doctor portrait and logo assets.
- Verify Dr. Carlos A. Brugiati professional credentials, memberships, and biography details.
- Verify clinic address, map link, parking/access instructions, and business hours.
- Verify phone, WhatsApp routing, Instagram, and email before publication.
- Verify all public review claims, including any review counts or ratings, before showing them live.
- Confirm all medical wording with the practice before publication.

## Legal And Privacy

- Replace `/privacidad` placeholder copy with reviewed privacy language.
- Replace `/terminos` placeholder copy with reviewed terms of use.
- Confirm medical disclaimer text in Spanish and English.
- Confirm consent language for appointment forms and assistant intake.
- Confirm the site does not request sensitive documents or lab values without a secure upload system.

## Booking, Intake, And Integrations

- Connect the booking form to Netlify Forms, email API, CRM, or backend.
- Confirm form submissions never imply an appointment is confirmed automatically.
- Connect WhatsApp handoff messages to the final operational workflow.
- Connect calendar booking only after real availability rules are confirmed.
- Add secure patient document upload only after backend and privacy review.
- Connect future Vapi assistant/webhook only after assistant ID, public key, and backend endpoint are available.

## SEO And Indexing

- Confirm production domain remains `https://uropanama.com`.
- Review all page titles, meta descriptions, canonical URLs, and Open Graph image.
- Verify JSON-LD fields use only confirmed data.
- Do not add aggregateRating or review schema until reviews are verified and publishable.
- Submit `https://uropanama.com/sitemap.xml` to Google Search Console.
- Test rich result eligibility for FAQ and breadcrumb schema after deployment.

## Analytics And Conversion

- Choose analytics provider: GA4, Plausible, PostHog, Meta Pixel, or server-side analytics.
- Replace development analytics logger with production tracking.
- Track booking CTA clicks, WhatsApp clicks, assistant opens, assistant concern selections, form submissions, language toggles, sticky bar clicks, and second-opinion CTA clicks.
- Confirm cookie/privacy requirements for the chosen analytics stack.

## Performance

- Convert large PNGs to WebP/AVIF and keep original PNGs as fallback if needed.
- Verify hero image preload remains the correct first-view asset.
- Test mobile performance on a real device.
- Run Lighthouse/PageSpeed after deployment.
- Confirm no fake generated-branding text is visible in cropped imagery.

## QA

- Test Spanish and English across all routes.
- Test desktop, tablet, and mobile layouts.
- Test keyboard navigation for header dropdowns, language toggle, assistant drawer, forms, accordions, and sticky/floating actions.
- Test screen-reader labels for icon-only controls.
- Test booking form validation and success state.
- Test assistant urgent-symptom guardrails.
- Test all internal links and WhatsApp links.
- Verify 404, privacy, and terms routes work after deployment.
