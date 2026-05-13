---
version: 2.0
name: Brugiati UroPanama Website
description: Medical-luxury website design system for Dr. Carlos A. Brugiati and UroPanama.
source-of-truth: This is the working spec. Reconciled from brugiati-design-system-master.md v1.0 (May 2026). If a conflict appears between this file and the master, this file wins because it is the implementation-ready version.
last-updated: May 2026
colors:
  # Primary palette
  navy-deep: "#0D2B45"       # Primary text, nav, CTA bg, footer ink
  clinical-blue: "#1B6B9A"   # Links, eyebrows, icon accent, card border
  sky-mid: "#5B9EC9"         # Icon fills, hover states, focus outlines
  frost: "#E0EEF7"           # Hero bg, card surfaces, image bg, 0.5px borders
  off-white: "#F5F7F9"       # Page background
  white: "#FFFFFF"           # Cards, forms, nav background
  footer-navy: "#0D1F2D"     # Footer background, dark CTA blocks
  slate: "#2C4A5E"           # Secondary text, subtitles, body copy
  # Restricted-use accents
  prestige-gold: "#C9A84C"   # Credentials / memberships / prestige ONLY
  alert-red: "#D4534A"       # Medical disclaimers / urgency cues ONLY
typography:
  display:
    fontFamily: Cormorant Garamond
    fontWeight: 300
    fontSize: 52px
    lineHeight: 1.0
    letterSpacing: "-0.02em"
    mobile: 36px
  h1:
    fontFamily: Cormorant Garamond
    fontWeight: 400
    fontSize: 36px
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    mobile: 28px
  h2:
    fontFamily: Cormorant Garamond
    fontWeight: 400
    fontSize: 26px
    lineHeight: 1.2
    mobile: 22px
  h3:
    fontFamily: Cormorant Garamond
    fontWeight: 400
    fontSize: 20px
    lineHeight: 1.3
  h4:
    fontFamily: DM Sans
    fontWeight: 500
    fontSize: 16px
    lineHeight: 1.4
  eyebrow:
    fontFamily: DM Sans
    fontWeight: 500
    fontSize: 11px
    lineHeight: 1.4
    letterSpacing: "+0.14em"
    case: uppercase
  body-lg:
    fontFamily: DM Sans
    fontWeight: 300
    fontSize: 17px
    lineHeight: 1.7
  body:
    fontFamily: DM Sans
    fontWeight: 300
    fontSize: 15px
    lineHeight: 1.75
    mobile: 14px
  body-sm:
    fontFamily: DM Sans
    fontWeight: 400
    fontSize: 13px
    lineHeight: 1.65
  caption:
    fontFamily: DM Sans
    fontWeight: 400
    fontSize: 12px
    lineHeight: 1.5
  micro:
    fontFamily: DM Sans
    fontWeight: 400
    fontSize: 11px
    lineHeight: 1.4
    letterSpacing: "+0.05em"
  button:
    fontFamily: DM Sans
    fontWeight: 400
    fontSize: 13px
    lineHeight: 1
    letterSpacing: "+0.02em"
  nav:
    fontFamily: DM Sans
    fontWeight: 300
    fontSize: 14px
    lineHeight: 1
rounded:
  xs: 8px        # form inputs
  sm: 12px       # small surfaces
  card: 20px     # procedure cards
  panel: 24px    # large panels, hero images
  pill: 100px    # buttons, badges, disclaimer banner
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  "2xl": 80px
  "3xl": 120px
  "4xl": 160px
  page-x-mobile: 24px
  page-x-tablet: 40px
  page-x-desktop: 60px
  page-x-wide: 80px
  section-y-mobile: 64px
  section-y-desktop: 120px
breakpoints:
  mobile-s: "< 375px"
  mobile: "375 - 640px"
  tablet: "640 - 1024px"
  desktop: "1024 - 1280px"
  wide: "> 1280px"
grid:
  max-width: 1280px
  columns: 12
  gutter: 24px
motion:
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-in: "cubic-bezier(0.7, 0, 0.84, 0)"
  duration-micro: 200ms
  duration-component: 350ms
  duration-page: 500ms
---

# Brugiati UroPanama — Design System v2.0

## Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Colors](#2-colors)
3. [Typography](#3-typography)
4. [Layout & Grid](#4-layout--grid)
5. [Spacing Scale](#5-spacing-scale)
6. [Section Header Pattern](#6-section-header-pattern)
7. [Components](#7-components)
8. [Page Templates](#8-page-templates)
9. [Logo & Wordmark](#9-logo--wordmark)
10. [Imagery Direction](#10-imagery-direction)
11. [Motion Principles](#11-motion-principles)
12. [Voice & Content Rules](#12-voice--content-rules)
13. [Accessibility](#13-accessibility)
14. [Site Architecture](#14-site-architecture)
15. [Do's and Don'ts](#15-dos-and-donts)
16. [Implementation Notes](#16-implementation-notes)

---

## 1. Brand Foundation

### Positioning
Advanced urology with clinical precision and private, discreet care — Panama's specialist for complex cases involving prostate, kidney stones, uro-oncology, endourology, and minimally invasive surgery.

### Target Audience
- **Primary:** Educated patients (35–75) seeking specialist evaluation for prostate, kidney, or urological cancer concerns
- **Secondary:** International patients seeking second opinions or specialized procedures (HoLEP, laparoscopic, robotic)
- **Tertiary:** Referring physicians in Panama and Latin America

### Tone of Voice
Clear. Calm. Authoritative. Never alarmist. Speaks to educated patients who want to understand before deciding. Privacy and discretion are foregrounded for sensitive topics.

### Design Ethos
**Medical luxury** — the precision of a private clinic, the warmth of a trusted physician. Restrained, not cold. Spacious, not empty. Credentialed, not arrogant.

### Brand Pillars
1. **Clinical precision** — every procedure decision is evidence-led
2. **Private and discreet** — patient privacy is a deliverable, not an afterthought
3. **International caliber** — Barcelona, Cambridge, Buenos Aires training applied in Panama
4. **Informed decisions** — patients understand options before they choose

---

## 2. Colors

### Roles

- **Navy Deep (`#0D2B45`):** Primary text, hero headlines, nav, primary CTA background, footer ink.
- **Clinical Blue (`#1B6B9A`):** Links, eyebrow labels, icon accents, card border accents, inline CTAs.
- **Sky Mid (`#5B9EC9`):** Icon fills, hover states, focus outlines, dark-mode accent.
- **Frost (`#E0EEF7`):** Hero backgrounds, card surfaces, image fills, 0.5px hairline borders.
- **Off-White (`#F5F7F9`):** Page background — the default canvas.
- **White (`#FFFFFF`):** Card surfaces, form fields, nav bar background.
- **Footer Navy (`#0D1F2D`):** Footer background, dark CTA blocks.
- **Slate (`#2C4A5E`):** Secondary text, subtitles, body copy where Navy Deep is too heavy.

### Restricted-use accents

- **Prestige Gold (`#C9A84C`):** ONLY for credentials, memberships, and prestige callouts. Examples of allowed use: HoLEP / AUA / EAU / SPU chips, stat-callout numerals ("10+ años"), Sociedad Panameña de Urología references. NEVER used for general UI, card link arrows, decorative gradients, hover states, or inline CTAs.

- **Alert Red (`#D4534A`):** ONLY for medical disclaimers and urgency cues. Never decorative.

### Hard rules

- Never use pure black (`#000000`). Use Navy Deep or Slate for ink.
- Never use pure neutral gray. All greys must carry a blue undertone.
- The site is **not** monochromatically blue. Navy, Clinical Blue, Slate, Frost, and Gold each have distinct, non-overlapping jobs.
- Hairline borders are Frost at 0.5px stroke. Do not introduce a separate "border" color.

### WCAG AA contrast (verified)

| Pair | Ratio |
|---|---|
| Navy Deep on White | 14.8:1 |
| Navy Deep on Frost | 13.1:1 |
| Slate on White | 7.2:1 |
| Clinical Blue on White | 5.8:1 |
| Sky Mid on Footer Navy | 5.1:1 |
| White on Navy Deep | 14.8:1 |

---

## 3. Typography

### Fonts

- **Display / Headings:** Cormorant Garamond (Google Fonts), weights 300, 400, 500
- **Body / UI:** DM Sans (Google Fonts), weights 300, 400, 500

### Fallback stacks

- Serif: `'Cormorant Garamond', 'Georgia', 'Times New Roman', serif`
- Sans: `'DM Sans', -apple-system, 'Segoe UI', Roboto, sans-serif`

### Type scale

| Role | Font | Weight | Size | Line | Tracking | Mobile |
|---|---|---|---|---|---|---|
| Display | Cormorant | 300 | 52px | 1.0 | −0.02em | 36px |
| H1 | Cormorant | 400 | 36px | 1.15 | −0.01em | 28px |
| H2 | Cormorant | 400 | 26px | 1.2 | 0 | 22px |
| H3 | Cormorant | 400 | 20px | 1.3 | 0 | — |
| H4 | DM Sans | 500 | 16px | 1.4 | 0 | — |
| Eyebrow | DM Sans | 500 | 11px | 1.4 | +0.14em ↑ | — |
| Body L | DM Sans | 300 | 17px | 1.7 | 0 | — |
| Body | DM Sans | 300 | 15px | 1.75 | 0 | 14px |
| Body S | DM Sans | 400 | 13px | 1.65 | 0 | — |
| Caption | DM Sans | 400 | 12px | 1.5 | 0 | — |
| Micro | DM Sans | 400 | 11px | 1.4 | +0.05em | — |
| Button | DM Sans | 400 | 13px | 1 | +0.02em | — |
| Nav | DM Sans | 300 | 14px | 1 | 0 | — |

(↑ uppercase)

### Hard rules

- Never font-weight above 500 anywhere on the site.
- Display and H1 are always Cormorant. Never DM Sans at heading sizes.
- Eyebrows always uppercase, +0.14em letter-spacing, DM Sans 500 11px.
- Sentence case for headings (capitalize first word + proper nouns only).
- Italic Cormorant used sparingly for emphasis in long-form copy.
- No viewport-based font scaling. Use explicit breakpoints.

---

## 4. Layout & Grid

- Max content width: 1280px
- 12-column grid, 24px gutters
- Horizontal page padding: 24px mobile / 40px tablet / 60px desktop / 80px wide

### Common splits

- **Hero:** 6/6 (text / image) — equal weight
- **Content:** 5/7 or 7/5 (sidebar / main)
- **Three-up cards:** 4/4/4
- **Two-up:** 6/6
- **Long-form:** 8-column centered

### Breakpoints

| Name | Width | Layout |
|---|---|---|
| Mobile S | < 375px | 1 col, 16px padding |
| Mobile | 375–640px | 1 col, 24px padding |
| Tablet | 640–1024px | 8 col, 40px padding |
| Desktop | 1024–1280px | 12 col, 60px padding |
| Wide | > 1280px | Max 1280px centered |

---

## 5. Spacing Scale

Base unit: **4px**. All spacing values are multiples of 4.

| Token | Value | Use |
|---|---|---|
| `xs` | 4px | Icon gap, inline micro |
| `sm` | 8px | Label gap, button icon, badge gap |
| `md` | 16px | Card internal padding |
| `lg` | 24px | Between cards, section gap |
| `xl` | 48px | Section top/bottom padding |
| `2xl` | 80px | Hero padding, page section |
| `3xl` | 120px | Full-section vertical rhythm |
| `4xl` | 160px | Page-level dividers |

### Vertical rhythm rules

- Section to section: **120px desktop / 64px mobile**
- Eyebrow → heading: 8px
- Heading → body: 16px
- Body paragraphs: 16px between

---

## 6. Section Header Pattern

Every content section follows this structure:

```
[EYEBROW LABEL UPPERCASE]      ← DM Sans 500, 11px, Clinical Blue, +0.14em
[Heading in Cormorant]          ← Sentence case
[Body explanation]              ← DM Sans Light, 1-3 sentences
[Content: cards, list, etc.]
```

### Standardized eyebrow labels

Use ONLY these labels — do not invent new ones per page.

| Label | Page type |
|---|---|
| `ESPECIALIDAD` | Specialty pages (Próstata, Cálculos renales, etc.) |
| `PROCEDIMIENTO UROLÓGICO` | Procedure pages (HoLEP, RTUP, etc.) |
| `ORIENTACIÓN GENERAL` | Educational pages |
| `PRÁCTICA ESPECIALIZADA` | About page |
| `COORDINACIÓN PRIVADA` | Schedule page |
| `REVISIÓN MÉDICA ESPECIALIZADA` | Second opinion |
| `UROPANAMA` | Home hero, brand-level moments |

---

## 7. Components

### 7.1 Navigation Bar

- Height: 56px (desktop and mobile)
- Background: white with 0.5px Frost bottom border, sticky with subtle backdrop blur
- Left: brand mark + wordmark lockup
- Center: nav links (desktop only — tablet and mobile use menu button)
- Right: ES/EN toggle + primary CTA
- Nav links: DM Sans 300 14px Slate; active → Clinical Blue with 2px underline offset; hover → Navy Deep, 200ms.

### 7.2 Buttons

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | Navy Deep | White | none | Main CTA — schedule, consult |
| Ghost | transparent | Navy Deep | 0.5px Navy Deep | Secondary CTA |
| WhatsApp | `#25D366` | White | none | WhatsApp contact |
| Danger | Alert Red | White | none | Urgent medical actions |
| Text Link | transparent | Clinical Blue | none | Inline actions |

**Common specs:**
- Border-radius: 100px (full pill)
- Height: 44px
- Padding: 10px 20px (default), 8px 16px (small), 12px 24px (large)
- Font: DM Sans 400, 13px, +0.02em
- Icon: inline left at 14px, 6px gap
- Hover: `translateY(-1px)`, `box-shadow: 0 4px 12px rgba(13,43,69,0.12)`, 200ms ease-out

### 7.3 Cards

**Procedure card:**
- Background: white
- Border: 0.5px solid Frost
- Border-radius: 20px
- Padding: 24px
- Structure: eyebrow → title (Cormorant 400 20px) → body (DM Sans 300 13px Slate, line 1.6) → arrow link (Clinical Blue 12px)
- Hover: border → Sky Mid, `translateY(-2px)`, `box-shadow: 0 4px 16px rgba(13,43,69,0.06)`

**Info card (3-column "Antes / Durante / Después"):**
- Background: Off-White `#F5F7F9`
- Border-radius: 20px
- Padding: 16px
- Same typography rules as procedure card

**Stat / credential callout:**
- Cormorant Garamond 300, 52px numeral in Prestige Gold
- DM Sans 400, 13px Slate label
- Max 4 per page
- Example: "10+" / "Años de experiencia"

### 7.4 FAQ Accordion

- Full-width, left-aligned
- Question: DM Sans 400 14px Navy Deep
- Chevron right-aligned, rotates 180° on open
- Answer: DM Sans 300 13px Slate, line 1.7
- 0.5px bottom divider between items (Frost)
- Transition: max-height 250ms ease-out

### 7.5 Badges & Pills

| Style | Background | Text | Use |
|---|---|---|---|
| Navy | Navy Deep | White | "Procedimiento urológico" |
| Blue | `#E6F1FA` | Clinical Blue | "Orientación general" |
| Gold | `#F5EDD5` | `#8B6914` | Credentials, prestige |
| Danger | `#FDECEA` | `#8B2119` | "Atención urgente" |

**Common specs:**
- DM Sans 400, 11px
- Padding: 4px 10px
- Border-radius: 100px (pill)
- Icon: 11px, 4px gap

### 7.6 Forms

**Input fields:**
- Height: 44px
- Background: white
- Border: 0.5px Frost
- Border-radius: 8px
- Padding: 0 16px
- Font: DM Sans 400, 14px
- Focus: 2px Sky Mid outline (no shadow)

**Labels:**
- DM Sans 500, 11px, Slate, uppercase, +0.10em
- Required indicator: Clinical Blue asterisk, 4px gap
- Margin-bottom: 6px

**Textarea:**
- Min-height: 120px
- Same styling as input
- Resize vertical only

**Select:**
- Match input styling
- Custom chevron icon, Slate, right 16px

**Submit:**
- Primary button style
- Send icon (paper plane) right-aligned

### 7.7 Hero Section

- Grid: 6/6 columns (equal weight)
- Left: eyebrow → display heading → body → CTA buttons
- Right: 3D medical render or clinical portrait
- Background: Frost or white depending on page
- Padding: 80px vertical, 80px horizontal
- Display heading: 52px desktop / 36px mobile, Cormorant 300, −0.02em, line 1.0
- Eyebrow: DM Sans 500 11px Clinical Blue +0.14em
- Sub: Body L (17px DM Sans 300 Slate)
- CTAs: Primary + Ghost OR Primary + WhatsApp

### 7.8 Page Header (Internal Pages)

Smaller than hero:
- Max H1 at 36px
- Eyebrow above heading
- 2-line subtitle max
- 1 primary CTA + WhatsApp secondary
- Same 6/6 grid with render right

### 7.9 Footer

- Background: Footer Navy `#0D1F2D`
- 4-column grid: brand + description (2 cols) / Navegación / Contacto / Especialidades
- Brand name: Cormorant Garamond 400 18px white
- "UROPANAMA" sub-label: DM Sans 500 10px Sky Mid uppercase +0.12em
- Body copy: DM Sans 300 12px `#8AAEC5`
- Column headings: DM Sans 500 10px Sky Mid uppercase
- Contact blocks: `rgba(255,255,255,0.05)` bg, 8px radius, 12px 16px padding, Clinical Blue icon at 18px
- Bottom bar: 32px top padding, 0.5px top border `rgba(255,255,255,0.08)`, disclaimer 11px muted blue centered

### 7.10 Disclaimer Banner

End-of-page on every educational page:
- Background: `rgba(91,158,201,0.08)` (soft Sky Mid)
- Border-radius: pill (100px)
- Padding: 12px 24px
- Icon: alert-triangle, Sky Mid, 14px
- Text: DM Sans 400 12px Slate
- Centered in container

**Copy:** *"La información de este sitio tiene fines educativos y de orientación general. No sustituye una evaluación médica. En caso de emergencia, acuda a un servicio médico de urgencia."*

---

## 8. Page Templates

### 8.1 Home

1. Nav
2. Hero — name, specialties, portrait, primary CTA
3. About preview — 6/6 with portrait + intro + credentials chips
4. Specialties grid — 6 cards (3x2)
5. "Comprenda su condición" — interactive condition selector
6. Procedure preview grid — 6-8 procedure cards
7. Trust block — credentials, hospitals, memberships
8. Second opinion CTA — wide dark block (Footer Navy)
9. Educational disclaimer banner
10. Footer

### 8.2 Specialty Page

1. Nav
2. Page header — eyebrow + H1 + sub + CTA + 3D render
3. Breadcrumb
4. Overview card — "¿Qué es...?" + 3D render left
5. When-to-consult card — checklist with icons
6. Three-up info cards — Antes / Durante / Después
7. Related pages card
8. FAQ accordion
9. Bottom CTA
10. Educational disclaimer banner
11. Footer

### 8.3 Procedure Page

Same structure as Specialty page with procedure-specific copy.

### 8.4 About Page

1. Nav
2. Hero — portrait + name + specialty list + bio
3. Bio expanded — "Práctica especializada"
4. "Cómo se estructura la atención" — process card
5. Stats / credentials chips (10+, HoLEP, AUA, EAU)
6. Formation timeline — training, memberships, experience
7. "Qué puede esperar el paciente" — dark CTA block (Footer Navy)
8. Footer

### 8.5 Schedule Page (Agendar Cita)

1. Nav
2. Hero — eyebrow + H1 + sub + WhatsApp/Call CTAs + clinic interior image
3. Two-column layout:
   - Left: Form (Nombre, Teléfono, Email, Motivo, Mensaje + privacy checkbox)
   - Right: Contact card with WhatsApp, Phone, Email, Location + Privacy block
4. "Coordinar una cita debe sentirse simple" — 3-step process
5. "Llegar mejor preparado" — checklist + timing info
6. Educational disclaimer banner
7. Footer

### 8.6 Second Opinion Page

1. Nav
2. Hero — eyebrow + H1 + sub + CTA + editorial/medical image
3. Dark section "Una segunda opinión debe ordenar..." — explainer with documents list + 3-step process
4. "¿Cuándo pedir una segunda opinión?" — overview card
5. Three-up info cards
6. Related pages
7. FAQ
8. Educational disclaimer banner
9. Footer

### 8.7 Legal (Privacidad / Términos)

Minimal centered card layout. No 3D renders. White card on Off-White background.

### 8.8 404 Page

Centered. Eyebrow + H1 + sub + "Volver al inicio" + "Agendar cita" buttons.

---

## 9. Logo & Wordmark

The mark is **Variant A — Monogram Ring** (approved May 2026).

### Construction

- Outer circle: 1.5px stroke, Navy Deep
- Inner dashed ring: 0.75px stroke, Clinical Blue, dash pattern 2-3
- Monogram "CB" in Cormorant Garamond Light (300), centered
- Optical alignment: text baseline at 57% from top of circle

### Color treatments

- Light background: Navy mark on white/frost
- Dark background: White mark with Sky Mid inner ring on Footer Navy

### Lockup variants

1. **Horizontal full** — mark left + "Dr. Carlos A. Brugiati" / "UROPANAMA" right (default header)
2. **Mark only** — favicon, embossed material, social avatar
3. **Stacked** — mark above wordmark, for square placements
4. **Wordmark only** — print footer, signatures

### Wordmark specs

- "Dr. Carlos A. Brugiati" — Cormorant Garamond 400, kerning normal
- "UROPANAMA" — DM Sans 500, uppercase, +0.16em letter-spacing
- 4px vertical spacing between name and sub
- Navy Deep for primary, Sky Mid for sub on light; reverse on dark

### Clear space

Minimum padding around full lockup = height of the wordmark x-height (≈ 0.5x mark height).

### Minimum sizes

- Horizontal lockup: 120px wide
- Mark only: 24px
- Favicon: 16x16px (simplified — outer ring + "CB" only)

### What to avoid

- Illustrative detail that disappears at small sizes
- More than 2 colors in the mark itself
- Drop shadows, gradients, glow effects
- Stretching, skewing, or rotating
- Placing on busy photographic backgrounds without overlay

---

## 10. Imagery Direction

### 3D medical renders (primary)

- Pale blue/white translucent anatomical models
- Cool tones, soft shadows, white/frost backgrounds
- Consistent art direction across all procedure/specialty pages
- Do not mix photo-real and illustrative renders in the same viewport
- Do not over-saturate

### Portrait photography

- Clinical portrait only (dark scrubs, neutral background)
- Head/shoulders crop for About hero
- Half-body, hands clasped for About body section
- Wedding and lifestyle photography: **excluded from all clinical pages**

### Second opinion / consultation pages

Editorial/lifestyle imagery permitted: patient reviewing documents, private clinic interior with soft natural light, hands on documents/tablet. Conveys trust, privacy, thoughtful decision-making.

### Vasectomy / male health pages

Abstract or geometric backgrounds, or omit imagery entirely. No anatomical renders unless clearly clinical and discreet. Dark navy backgrounds with subtle 3D elements work well.

### Background images

- Hero backgrounds: subtle gradient mesh (Frost to white)
- Avoid stock photo of doctors with stethoscopes
- Never use medical equipment close-ups

---

## 11. Motion Principles

### Easing & duration

- Entrances: `cubic-bezier(0.16, 1, 0.3, 1)` ease-out
- Exits: `cubic-bezier(0.7, 0, 0.84, 0)` ease-in
- Default: 200ms
- Component (card, modal): 350ms
- Page transition: 500ms

### Specific animations

- **Hero entrance:** eyebrow (0ms) → heading (50ms) → body (100ms) → CTA (150ms). translateY(8px) → 0, opacity 0 → 1. 500ms each.
- **Card hover:** translateY(-2px), border-color Frost → Sky Mid, soft shadow. 200ms.
- **FAQ accordion:** max-height 0 → auto, chevron rotate 0 → 180°. 250ms.
- **Scroll reveal:** opacity 0 → 1, translateY(16px) → 0. Trigger at 80% viewport. 600ms.

### Rules

- No autoplay video
- No parallax (distracting in clinical context)
- No looping animations
- Respect `prefers-reduced-motion: reduce`

---

## 12. Voice & Content Rules

### Always include

- Educational disclaimer at the bottom of every content page
- "Páginas relacionadas" card linking 2-3 related pages on specialty/procedure pages
- FAQ section on every specialty/procedure page (minimum 4 questions)
- Primary CTA + WhatsApp option on every page

### Language rules

- Conditional language only: "puede", "según cada caso", "depende de la evaluación"
- Never: "garantiza", "cura", "elimina por completo"
- Use "el paciente" not "usted" or "tú" for general copy
- Use formal "su" / "le" Spanish throughout
- Spanish primary, English optional toggle

### Forbidden in user-facing copy

- Internal Meta credentials, staff routing details
- Booking system brand names (e.g. "HuliPractice") — replace with "Manual por el equipo"
- Unverifiable testimonials
- Outcome promises

---

## 13. Accessibility

- WCAG 2.1 AA minimum
- Color contrast: 4.5:1 body / 3:1 large text
- Interactive targets: 44x44px minimum
- Focus indicators: 2px Sky Mid outline, 2px offset
- Skip-to-content link on every page
- Semantic heading hierarchy (h1 → h2 → h3, no skips)
- Alt text on all medical illustrations (Spanish primary)
- Form labels always visible (no placeholder-only)
- Full keyboard navigation
- `aria-label` on icon-only buttons
- `prefers-reduced-motion` respected
- `lang="es"` on root, per-section `lang="en"` overrides

### Color-blind considerations

- Never rely on color alone for meaning
- Icons + text for status indicators
- Underline on links (subtle 0.5px below text)

---

## 14. Site Architecture

### Primary navigation

- Inicio
- Especialidades (dropdown): Próstata, Cálculos renales, Uro-oncología, Endourología, Cirugía laparoscópica, Salud urológica masculina, Segunda opinión urológica
- Procedimientos (dropdown): HoLEP, RTUP, Adenectomía prostática, Ureteroscopía (+ semirrígida, flexible), Biopsia de próstata, Cistoscopía, Litotricia extracorpórea, Nefrolitotomía percutánea, Láser para cálculos urinarios, Cirugía laparoscópica renal, Disfunción eréctil, Vasectomía
- Segunda opinión
- Contacto

### Utility navigation

- ES / EN language toggle
- Agendar cita CTA

### Footer navigation

- **Navegación:** Inicio, Especialidades, Procedimientos, Segunda opinión, Contacto
- **Contacto:** WhatsApp, Teléfono, Email, Instagram, Ubicación
- **Especialidades:** 6 main specialties
- **Legal:** Privacidad, Términos de uso, Aviso médico

### Total: 28 pages

Home, Especialidades overview, 6 specialty pages, About, Procedimientos overview, 12 procedure pages, Agendar cita, Segunda opinión, Privacidad, Términos de uso, 404.

---

## 15. Do's and Don'ts

### Do

- Use Cormorant Garamond for all display and headings; DM Sans for all body and UI.
- Use Navy Deep `#0D2B45` as primary ink (never `#061B33` or pure black).
- Cap font-weight at 500 site-wide.
- Reserve Gold strictly for credentials and prestige callouts.
- Use 44px button and input heights.
- Include the disclaimer banner at the bottom of every content page.
- Apply eyebrow labels from the standardized list.
- Maintain 120px desktop / 64px mobile section rhythm.
- Use 6/6 equal-weight hero grids.

### Don't

- Never use Newsreader, Inter, or any font outside the Cormorant / DM Sans pair.
- Never use display type above 52px desktop / 36px mobile.
- Never use font-weight above 500 (no `bold`, no `semibold`).
- Never use Gold for card arrows, inline links, hover states, or decorative gradients.
- Never expose booking system brand names in user-facing copy.
- Never use 48px button or input heights — spec is 44px.
- Never use eyebrow tracking above +0.14em.
- Never use pure black or saturated neutral gray.
- Never use lifestyle/wedding photography on clinical pages.
- Never use decorative gradients as the main brand signal.
- Never use cyan `#26BFE8` — replaced by Sky Mid `#5B9EC9`.

---

## 16. Implementation Notes

### Tech stack

- **Framework:** Next.js 14+ (App Router) or Astro 4+
- **Styling:** Tailwind CSS with custom theme + CSS variables matching the tokens above
- **Forms:** React Hook Form + Zod validation
- **WhatsApp:** Direct `wa.me` links with prefilled message
- **i18n:** next-intl or astro-i18n
- **Hosting:** Vercel or Netlify
- **Analytics:** Plausible (privacy-friendly)
- **CMS:** Not required for v1 — static is fine
- **Booking:** External (built separately) — site links out, does not embed
- **AI Assistant:** Embedded chat widget, accessible from every page

### Performance targets

- Lighthouse 95+ all categories
- LCP < 1.5s
- CLS < 0.05
- TBT < 200ms
- FCP < 1s

### SEO foundation

- Schema.org markup: `Physician`, `MedicalClinic`, `MedicalProcedure`
- OpenGraph + Twitter cards on every page
- Sitemap.xml + robots.txt
- hreflang tags for ES/EN
- Canonical URLs
- Meta descriptions: 150–160 chars, conversion-focused

### Out of scope (v1)

- Booking system integration
- AI assistant deep build (separate scope)
- New 3D renders or photography sourcing
- CMS integration
