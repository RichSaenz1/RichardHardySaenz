---
version: alpha
name: Brugiati UroPanama Website
description: Premium medical website design system for Dr. Carlos A. Brugiati and UroPanama.
colors:
  navy: "#061B33"
  navy-2: "#0A2745"
  medical: "#0B66C3"
  cyan: "#26BFE8"
  softblue: "#EFF8FC"
  ice: "#EFF8FC"
  mist: "#F7FBFD"
  muted: "#64748B"
  borderblue: "#D9EAF5"
  gold: "#C9A76A"
  white: "#FFFFFF"
typography:
  display-hero:
    fontFamily: Newsreader
    fontSize: 82px
    fontWeight: 430
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  display-page:
    fontFamily: Newsreader
    fontSize: 72px
    fontWeight: 430
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline-section:
    fontFamily: Newsreader
    fontSize: 64px
    fontWeight: 430
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline-card:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: 430
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label-uppercase:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.22em"
rounded:
  xs: 0.75rem
  sm: 1rem
  card: 1.25rem
  panel: 1.55rem
  hero-image: 1.75rem
  pill: 9999px
spacing:
  unit: 8px
  page-x-mobile: 16px
  page-x-tablet: 24px
  page-x-desktop: 32px
  section-y-mobile: 56px
  section-y-desktop: 88px
  grid-gap: 24px
  card-padding: 24px
components:
  primary-button:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    typography: "{typography.label-uppercase}"
    height: 48px
    padding: "0 24px"
  secondary-button:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    borderColor: "{colors.borderblue}"
    rounded: "{rounded.pill}"
    height: 48px
  premium-card:
    backgroundColor: "rgba(255, 255, 255, 0.82)"
    borderColor: "rgba(217, 234, 245, 0.92)"
    rounded: "{rounded.panel}"
    shadow: "0 28px 90px rgba(6, 27, 51, 0.11)"
  trust-card:
    backgroundColor: "{colors.white}"
    borderColor: "{colors.borderblue}"
    rounded: "{rounded.card}"
    accent: "linear-gradient(to bottom, {colors.medical}, {colors.cyan}, {colors.gold})"
  form-input:
    backgroundColor: "rgba(255, 255, 255, 0.82)"
    borderColor: "{colors.borderblue}"
    textColor: "{colors.navy}"
    rounded: "{rounded.xs}"
    height: 48px
---

## Overview

This site should feel like a calm, premium specialist practice rather than a generic clinic template. The visual voice is precise, discreet, and patient-centered: white space, soft clinical blues, deep navy typography, real Brugiati brand assets, and restrained gold accents for credibility.

The intended audience includes patients in Panama seeking urology care, prostate treatment, kidney stone care, uro-oncology guidance, HoLEP, minimally invasive surgery, vasectomy, erectile dysfunction support, and second opinions. The experience must make the patient feel oriented before they contact the office.

## Colors

- **Navy (#061B33):** Primary text, hero headlines, important actions, and specialist authority.
- **Navy 2 (#0A2745):** Secondary deep surface for dark panels and gradients.
- **Medical Blue (#0B66C3):** Links, active states, labels, and conversion accents.
- **Cyan (#26BFE8):** Light medical energy, icon surfaces, gradients, and hover support.
- **Soft Blue / Ice (#EFF8FC):** Calm card fills, focus rings, and gentle section backgrounds.
- **Mist (#F7FBFD):** Primary page background for clinical softness.
- **Muted Slate (#64748B):** Body copy and secondary explanatory text.
- **Border Blue (#D9EAF5):** Hairline borders, card edges, separators, and inputs.
- **Gold (#C9A76A):** Small prestige detail only. Use sparingly for dividers, quotes, and trust highlights.

Avoid turning the interface into a one-note blue palette. The design works because navy, white, cyan, soft blue, slate, and gold each have clear jobs.

## Typography

The brand uses **Newsreader** for editorial medical authority and **Inter** for digital clarity.

- **Headlines:** Newsreader, light-to-regular optical weight, tight but readable line-height. Use large type for true page and section heroes only.
- **Body:** Inter, 16-18px, generous 1.75 line-height for Spanish medical copy.
- **Labels:** Inter uppercase with wide tracking for section eyebrows, badges, proof points, and metadata.
- **Buttons:** Inter semibold/bold, compact and clear. Button labels must never wrap awkwardly.

Do not use viewport-based font scaling. Use responsive Tailwind breakpoints and explicit text sizes.

## Layout

The site is mobile-first with wide, calm sections. Most content should live in a centered max-width container with responsive horizontal padding.

- Mobile: single-column priority, clear CTA placement, no text overlap with floating booking UI.
- Tablet: two-column layouts only when content has enough width; otherwise stack cards or use balanced three-card grids with equal heights.
- Desktop: generous two-column hero sections, wide cards, and strong vertical rhythm.
- Header: full desktop navigation should only appear when there is enough width for nav and CTA; tablet should use the menu button.

Sections should feel like full-width bands or clean contained layouts, not nested cards inside cards.

## Elevation & Depth

Depth is soft and clinical, built with white glass surfaces, subtle borders, and wide shadows.

- Premium cards use translucent white, border blue, and large low-opacity navy shadows.
- Frosted panels use blur only when it improves readability over image or gradient backgrounds.
- Dark navy sections can use subtle radial cyan/gold highlights, but never decorative orb clutter.
- Dividers should be hairline and quiet, with gold only for small credibility accents.

## Shapes

The shape language is refined and soft, but not childish.

- Repeated content cards: 1.25rem to 1.35rem radius.
- Larger panels and legal/booking containers: 1.55rem radius.
- Hero images: 1.75rem radius with substantial white framing when needed.
- Buttons: pill radius for primary conversion actions.
- Inputs: 0.75rem to 1rem radius for form clarity.

## Components

### Header

The header uses the real Dr. Brugiati logo and a calm translucent surface. Desktop nav belongs at extra-large widths; tablet and mobile use the menu button to protect alignment.

### Hero

The homepage hero must immediately communicate advanced urology, minimally invasive surgery, Panama, and Dr. Carlos A. Brugiati. Use the doctor portrait and medical environment imagery as first-viewport signals.

### Cards

Cards should have consistent padding, equal heights inside grids, and stable icon containers. Avoid cramped icon/text combinations on tablet; stack content when the card is narrow.

### Buttons

Primary actions are navy pills. Secondary actions are white or frosted with navy text. WhatsApp and appointment CTAs should be obvious but not loud.

### Forms

Forms should feel private, calm, and guided. Use clear labels, large tap targets, and reassuring microcopy about manual confirmation and medical safety.

### Floating Booking UI

Floating CTAs are allowed but must not obscure essential content. Keep them compact and responsive, especially on mobile.

## Do's and Don'ts

**Do**

- Preserve the calm specialist-led aesthetic.
- Use real Brugiati logo and portrait assets from `public/images`.
- Keep Spanish medical copy readable and patient-safe.
- Prioritize appointment conversion, WhatsApp contact, and trust signals.
- Test desktop, tablet, and mobile after layout changes.

**Don't**

- Publish internal Meta credentials, passwords, staff-only routing, or unverified private details.
- Use decorative gradients or generic stock-style imagery as the main brand signal.
- Add dense nested cards or oversized marketing layouts that compete with medical clarity.
- Let tablet layouts squeeze desktop navigation, proof cards, or stat cards.
- Use testimonials unless they are approved and verifiable.
