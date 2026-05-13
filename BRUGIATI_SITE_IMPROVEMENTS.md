# Brugiati Website Improvement Checklist

Saved: 2026-05-12

This checklist captures the frontend/design audit priorities for the existing Brugiati website at `C:\Users\Rich\Desktop\BrugiatiWebsite`. Work through these one by one, verifying each item before moving to the next.

## 1. Real Brand And Doctor Assets

Status: Completed for first pass on 2026-05-12

- Add the approved Dr. Brugiati logo to `public/images`.
- Add the real professional portrait to `public/images`.
- Replace fallback monogram/header branding with the real logo.
- Rework the homepage hero so Dr. Brugiati is a first-viewport signal, not only an abstract clinic/medical atmosphere.
- Preserve the premium medical tone while making the site feel unmistakably like Dr. Carlos Brugiati.

Verification:

- Added `public/images/dr-brugiati-logo.png`.
- Added optimized crop `public/images/dr-brugiati-portrait.jpg`.
- Updated homepage hero with desktop portrait card and mobile doctor proof card.
- Build passed with `npm run build`.
- Screenshots:
  - `qa-screenshots/codex-item-1-brand-assets/desktop-home.png`
  - `qa-screenshots/codex-item-1-brand-assets/mobile-home.png`

## 2. Hero And Above-The-Fold Proof

Status: Completed for first pass on 2026-05-12

- Tighten the mobile hero scale so the H1 is still elegant but conversion actions appear sooner.
- Add compact credibility proof near the hero:
  - 10+ years clinical and surgical experience.
  - Uro-oncology fellowship / international training.
  - HoLEP, endourology, robotics/laparoscopy, minimally invasive surgery.
  - AUA, EAU, Sociedad Panamena de Urologia.
- Make the opening page answer "why this doctor?" faster.

Verification:

- Reduced mobile H1 scale so the first viewport shows more conversion/proof content.
- Added compact credential proof cards near the hero CTAs:
  - `10+` years of clinical and surgical experience.
  - `HoLEP` laser prostate and endourology.
  - `AUA · EAU` international urology memberships.
- Build passed with `npm run build`.
- Screenshots:
  - `qa-screenshots/codex-item-2-hero-proof/desktop-home.png`
  - `qa-screenshots/codex-item-2-hero-proof/mobile-home.png`

## 3. Encoding And Content Hygiene

Status: Completed for current implementation pass on 2026-05-12

- Fix mojibake in source files such as `Urología`, `Panamá`, `Cálculos`, `¿`.
- Verify all Spanish and English text renders correctly.
- Remove or replace placeholder/TODO-facing legal text before launch.
- Confirm contact details, public address, hours, accepted insurance, and staff notification email.

Verification:

- Repaired source encoding issues and verified with an encoding smoke test across `src` and this checklist.
- Kept private/internal Meta credentials and staff-only details out of the public site.
- Preserved the public-safe email and WhatsApp contact from the onboarding form.
- Remaining pre-launch client verification: final clinic address and public hours.

## 4. Assistant And Booking Flow UX

Status: Completed for current implementation pass on 2026-05-12

- Make the assistant feel more like guided intake and less like a long form.
- Sequence intake:
  - Concern.
  - Name/phone.
  - Urgency screen.
  - Preferred time.
  - Consent.
  - WhatsApp/staff handoff.
- Connect booking form and assistant summaries to the real operational workflow.
- Ensure urgent symptoms escalate clearly and safely.

Verification:

- Applied HuliPractice/manual confirmation copy across booking and next-step panels.
- Added 45-minute new consult and 30-minute follow-up appointment facts.
- Added exact urgent escalation language for acute pain, bleeding, recent post-op concern, urinary retention, renal colic, fever, chills, and unclassified urgency.
- Expanded booking reasons and WhatsApp handoff messages for the added procedures.

## 5. Image Strategy And Performance

Status: Completed for current implementation pass on 2026-05-12

- Reduce dependency on generic generated medical/clinic imagery.
- Use real portrait, real logo, kidney symbol, and selected procedure visuals intentionally.
- Convert large PNG assets to WebP/AVIF with fallbacks.
- Audit crops across desktop and mobile after image replacement.
- Remove unused duplicate generated image bundles if no longer needed.

Verification:

- Converted large generated medical visuals in `public/images` to WebP and updated source references.
- Updated remaining medical background texture references to WebP.
- Preserved original PNG files for future recrops/source asset revisions.
- Re-cropped the about-page hero portrait so Dr. Brugiati is properly visible above the fold.

## 6. Design System Hardening

Status: Completed for current implementation pass on 2026-05-12

- Formalize component rules:
  - Primary CTA: navy filled, appointment/action only.
  - Secondary CTA: white/frosted, assistant/info only.
  - Medical info cards: low shadow, white, borderblue.
  - Authority/proof cards: navy or softblue, less decorative.
  - Urgent/safety cards: amber/red semantic colors, never gold/cyan.
- Normalize radii, card shadows, heading scales, and section spacing.
- Reduce one-off Tailwind class drift where repeated components should share variants.

Verification:

- Added premium, calm medical sections using the existing navy/cyan/gold design language.
- Kept procedure cards, hospital/insurance cards, booking panels, and blog roadmap aligned with existing component patterns.
- Added a reusable PageHero image crop override instead of hardcoding the about-page fix in a one-off layout.

## 7. Frontend Quality And Launch Readiness

Status: Completed for current implementation pass on 2026-05-12

- Fix React `fetchPriority` warnings on image components.
- Run build and route QA after each major visual change.
- Check desktop and mobile screenshots for home, specialties, booking, and doctor pages.
- Verify no horizontal overflow.
- Verify keyboard focus, dialog focus trap, and mobile menu behavior.
- Confirm sitemap, metadata, schema, robots, and redirects before deployment.

Verification:

- Fixed React image priority warnings and enabled React Router future flags to remove router warnings.
- `npm run build` passed after implementation.
- Restarted the local Vite server on `http://127.0.0.1:5174/` after stale transform cache was detected.
- Playwright QA passed on desktop and mobile for `/`, `/dr-carlos-brugiati`, `/agendar-cita`, `/holep`, `/rtup`, `/adenectomia-prostatica`, `/ureteroscopia-flexible`, `/ureteroscopia-semirrigida`, `/litotricia-extracorporea`, `/vasectomia`, and `/disfuncion-erectil`.
- Visual screenshots saved in `qa-screenshots/codex-goal-completion/`.

## 8. Onboarding Form Applications

Status: Completed for current implementation pass on 2026-05-12

- [x] Add homepage trust section for hospitals and accepted insurance.
- [x] Add missing procedure/service entries:
  - HoLEP / Enucleacion prostatica con laser de Holmio.
  - RTUP.
  - Adenectomia prostatica laparoscopica / robotica.
  - Ureteroscopia flexible and semirrigida.
  - Litotricia extracorporea con ondas de choque.
  - Disfuncion erectil.
  - Vasectomia.
- [x] Deepen professional bio with international training and memberships.
- [x] Apply appointment details: HuliPractice workflow, 45-minute new consults, 30-minute follow-ups, manual team confirmation.
- [x] Add exact urgent escalation language from intake.
- [x] Add SEO blog roadmap from intake topics.

Verification:

- Added `src/components/home/AccessNetwork.tsx`.
- Added `AccessNetwork` to the homepage after the authority section.
- Added `src/components/home/BlogRoadmap.tsx`.
- Added `src/i18n/additionalProcedurePages.ts` and wired all new procedure routes, cards, metadata, and WhatsApp intent mapping.
- Updated doctor bio, appointment workflow, urgent guidance, and procedure-specific booking copy from the onboarding source.
- Build passed with `npm run build`.
- Final Playwright desktop/mobile route QA passed.
- Screenshots:
  - `qa-screenshots/codex-access-network/desktop-access-section.png`
  - `qa-screenshots/codex-access-network/mobile-access-section.png`
  - `qa-screenshots/codex-goal-completion/`
