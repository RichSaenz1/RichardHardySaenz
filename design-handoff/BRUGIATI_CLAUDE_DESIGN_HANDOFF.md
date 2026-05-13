# Brugiati Website Design Handoff for Claude

Captured from the local Vite site at `http://127.0.0.1:5174/` on May 12, 2026, Panama time.

This folder is a visual and design-system handoff for the current Dr. Carlos A. Brugiati / UroPanama website. Use it as the reference package before making design or frontend changes.

## Files

- Project design source of truth: [`../DESIGN.md`](../DESIGN.md)
- Screenshot manifest: [`screenshot-manifest.json`](screenshot-manifest.json)
- Desktop screenshots: [`screenshots/desktop`](screenshots/desktop)
- Tablet screenshots: [`screenshots/tablet`](screenshots/tablet)
- Mobile screenshots: [`screenshots/mobile`](screenshots/mobile)

## Capture Details

- Desktop viewport: `1440 x 1100`
- Tablet viewport: `820 x 1180`
- Mobile viewport: `390 x 900`
- Screenshot format: full-page `.jpg`
- Captured pages: `28`
- Captured screenshots: `84`
- Horizontal overflow during capture: `0` reported issues

## Design Direction

The site should feel premium, calm, clinical, and specialist-led. It is not a generic hospital landing page. The interface should communicate advanced urology, minimally invasive procedures, prostate care, kidney stone care, uro-oncology, HoLEP, and patient-safe appointment coordination.

Core visual traits:

- Editorial medical typography using Newsreader for large headings.
- Clear digital readability using Inter for body, labels, forms, and navigation.
- Deep navy authority, white clinical space, soft blue surfaces, cyan medical accents, and restrained gold credibility details.
- Real brand assets: Dr. Brugiati logo, doctor portrait, and medical visual assets from `public/images`.
- Mobile-first conversion paths: appointment CTA, WhatsApp CTA, assistant, and manual confirmation language.

## Important Implementation Notes for Claude

- Keep `DESIGN.md` as the design source of truth.
- Do not publish private/internal Meta credentials, passwords, staff notification details, or unverified internal contact details.
- Do not invent testimonials. Current testimonial areas are intentionally verification-safe.
- Keep appointment flow language clear: requests are reviewed manually and confirmed through HuliPractice/team workflow.
- Preserve tablet alignment fixes: desktop nav should not squeeze at 1024px, trust cards should align evenly, and proof cards should not cram into narrow columns.
- After any design change, verify desktop, tablet, and mobile.

## Current Page Inventory and Screenshots

| Page | Route | Desktop | Tablet | Mobile |
| --- | --- | --- | --- | --- |
| Home | `/` | [desktop](screenshots/desktop/home-desktop.jpg) | [tablet](screenshots/tablet/home-tablet.jpg) | [mobile](screenshots/mobile/home-mobile.jpg) |
| About Dr. Carlos Brugiati | `/dr-carlos-brugiati` | [desktop](screenshots/desktop/about-dr-carlos-brugiati-desktop.jpg) | [tablet](screenshots/tablet/about-dr-carlos-brugiati-tablet.jpg) | [mobile](screenshots/mobile/about-dr-carlos-brugiati-mobile.jpg) |
| Especialidades | `/especialidades` | [desktop](screenshots/desktop/especialidades-desktop.jpg) | [tablet](screenshots/tablet/especialidades-tablet.jpg) | [mobile](screenshots/mobile/especialidades-mobile.jpg) |
| Agendar cita | `/agendar-cita` | [desktop](screenshots/desktop/agendar-cita-desktop.jpg) | [tablet](screenshots/tablet/agendar-cita-tablet.jpg) | [mobile](screenshots/mobile/agendar-cita-mobile.jpg) |
| Calculos renales | `/calculos-renales` | [desktop](screenshots/desktop/calculos-renales-desktop.jpg) | [tablet](screenshots/tablet/calculos-renales-tablet.jpg) | [mobile](screenshots/mobile/calculos-renales-mobile.jpg) |
| Prostata | `/prostata` | [desktop](screenshots/desktop/prostata-desktop.jpg) | [tablet](screenshots/tablet/prostata-tablet.jpg) | [mobile](screenshots/mobile/prostata-mobile.jpg) |
| Uro-oncologia | `/uro-oncologia` | [desktop](screenshots/desktop/uro-oncologia-desktop.jpg) | [tablet](screenshots/tablet/uro-oncologia-tablet.jpg) | [mobile](screenshots/mobile/uro-oncologia-mobile.jpg) |
| Endourologia | `/endourologia` | [desktop](screenshots/desktop/endourologia-desktop.jpg) | [tablet](screenshots/tablet/endourologia-tablet.jpg) | [mobile](screenshots/mobile/endourologia-mobile.jpg) |
| Cirugia laparoscopica | `/cirugia-laparoscopica` | [desktop](screenshots/desktop/cirugia-laparoscopica-desktop.jpg) | [tablet](screenshots/tablet/cirugia-laparoscopica-tablet.jpg) | [mobile](screenshots/mobile/cirugia-laparoscopica-mobile.jpg) |
| Salud masculina | `/salud-masculina` | [desktop](screenshots/desktop/salud-masculina-desktop.jpg) | [tablet](screenshots/tablet/salud-masculina-tablet.jpg) | [mobile](screenshots/mobile/salud-masculina-mobile.jpg) |
| Segunda opinion | `/segunda-opinion` | [desktop](screenshots/desktop/segunda-opinion-desktop.jpg) | [tablet](screenshots/tablet/segunda-opinion-tablet.jpg) | [mobile](screenshots/mobile/segunda-opinion-mobile.jpg) |
| Ureteroscopia | `/ureteroscopia` | [desktop](screenshots/desktop/ureteroscopia-desktop.jpg) | [tablet](screenshots/tablet/ureteroscopia-tablet.jpg) | [mobile](screenshots/mobile/ureteroscopia-mobile.jpg) |
| Laser calculos renales | `/laser-calculos-renales` | [desktop](screenshots/desktop/laser-calculos-renales-desktop.jpg) | [tablet](screenshots/tablet/laser-calculos-renales-tablet.jpg) | [mobile](screenshots/mobile/laser-calculos-renales-mobile.jpg) |
| Biopsia prostata | `/biopsia-prostata` | [desktop](screenshots/desktop/biopsia-prostata-desktop.jpg) | [tablet](screenshots/tablet/biopsia-prostata-tablet.jpg) | [mobile](screenshots/mobile/biopsia-prostata-mobile.jpg) |
| Nefrolitotomia percutanea | `/nefrolitotomia-percutanea` | [desktop](screenshots/desktop/nefrolitotomia-percutanea-desktop.jpg) | [tablet](screenshots/tablet/nefrolitotomia-percutanea-tablet.jpg) | [mobile](screenshots/mobile/nefrolitotomia-percutanea-mobile.jpg) |
| Cistoscopia | `/cistoscopia` | [desktop](screenshots/desktop/cistoscopia-desktop.jpg) | [tablet](screenshots/tablet/cistoscopia-tablet.jpg) | [mobile](screenshots/mobile/cistoscopia-mobile.jpg) |
| Cirugia laparoscopica renal | `/cirugia-laparoscopica-renal` | [desktop](screenshots/desktop/cirugia-laparoscopica-renal-desktop.jpg) | [tablet](screenshots/tablet/cirugia-laparoscopica-renal-tablet.jpg) | [mobile](screenshots/mobile/cirugia-laparoscopica-renal-mobile.jpg) |
| HoLEP | `/holep` | [desktop](screenshots/desktop/holep-desktop.jpg) | [tablet](screenshots/tablet/holep-tablet.jpg) | [mobile](screenshots/mobile/holep-mobile.jpg) |
| RTUP | `/rtup` | [desktop](screenshots/desktop/rtup-desktop.jpg) | [tablet](screenshots/tablet/rtup-tablet.jpg) | [mobile](screenshots/mobile/rtup-mobile.jpg) |
| Adenectomia prostatica | `/adenectomia-prostatica` | [desktop](screenshots/desktop/adenectomia-prostatica-desktop.jpg) | [tablet](screenshots/tablet/adenectomia-prostatica-tablet.jpg) | [mobile](screenshots/mobile/adenectomia-prostatica-mobile.jpg) |
| Ureteroscopia flexible | `/ureteroscopia-flexible` | [desktop](screenshots/desktop/ureteroscopia-flexible-desktop.jpg) | [tablet](screenshots/tablet/ureteroscopia-flexible-tablet.jpg) | [mobile](screenshots/mobile/ureteroscopia-flexible-mobile.jpg) |
| Ureteroscopia semirrigida | `/ureteroscopia-semirrigida` | [desktop](screenshots/desktop/ureteroscopia-semirrigida-desktop.jpg) | [tablet](screenshots/tablet/ureteroscopia-semirrigida-tablet.jpg) | [mobile](screenshots/mobile/ureteroscopia-semirrigida-mobile.jpg) |
| Litotricia extracorporea | `/litotricia-extracorporea` | [desktop](screenshots/desktop/litotricia-extracorporea-desktop.jpg) | [tablet](screenshots/tablet/litotricia-extracorporea-tablet.jpg) | [mobile](screenshots/mobile/litotricia-extracorporea-mobile.jpg) |
| Disfuncion erectil | `/disfuncion-erectil` | [desktop](screenshots/desktop/disfuncion-erectil-desktop.jpg) | [tablet](screenshots/tablet/disfuncion-erectil-tablet.jpg) | [mobile](screenshots/mobile/disfuncion-erectil-mobile.jpg) |
| Vasectomia | `/vasectomia` | [desktop](screenshots/desktop/vasectomia-desktop.jpg) | [tablet](screenshots/tablet/vasectomia-tablet.jpg) | [mobile](screenshots/mobile/vasectomia-mobile.jpg) |
| Privacidad | `/privacidad` | [desktop](screenshots/desktop/privacidad-desktop.jpg) | [tablet](screenshots/tablet/privacidad-tablet.jpg) | [mobile](screenshots/mobile/privacidad-mobile.jpg) |
| Terminos | `/terminos` | [desktop](screenshots/desktop/terminos-desktop.jpg) | [tablet](screenshots/tablet/terminos-tablet.jpg) | [mobile](screenshots/mobile/terminos-mobile.jpg) |
| 404 / Not found | `/pagina-no-existe` | [desktop](screenshots/desktop/not-found-desktop.jpg) | [tablet](screenshots/tablet/not-found-tablet.jpg) | [mobile](screenshots/mobile/not-found-mobile.jpg) |

## Key Source Files

- App routes: [`../src/App.tsx`](../src/App.tsx)
- Tailwind tokens: [`../tailwind.config.js`](../tailwind.config.js)
- Global CSS and font setup: [`../src/index.css`](../src/index.css)
- Layout header: [`../src/components/layout/Header.tsx`](../src/components/layout/Header.tsx)
- Layout footer: [`../src/components/layout/Footer.tsx`](../src/components/layout/Footer.tsx)
- Homepage: [`../src/pages/HomePage.tsx`](../src/pages/HomePage.tsx)
- Booking page: [`../src/pages/BookingPage.tsx`](../src/pages/BookingPage.tsx)
- Specialty detail template: [`../src/pages/SpecialtyDetailPage.tsx`](../src/pages/SpecialtyDetailPage.tsx)
- Procedure detail template: [`../src/pages/ProcedureDetailPage.tsx`](../src/pages/ProcedureDetailPage.tsx)
- Procedure content: [`../src/i18n/procedurePages.ts`](../src/i18n/procedurePages.ts)
- Additional procedure content: [`../src/i18n/additionalProcedurePages.ts`](../src/i18n/additionalProcedurePages.ts)
- Brand and medical images: [`../public/images`](../public/images)

## Suggested Claude Workflow

1. Read `DESIGN.md`.
2. Review the desktop, tablet, and mobile screenshots for the page being changed.
3. Inspect the matching React page/template and shared components.
4. Make the smallest design-system-consistent change.
5. Run `npm run build`.
6. Re-capture or visually verify the changed pages at desktop, tablet, and mobile.
