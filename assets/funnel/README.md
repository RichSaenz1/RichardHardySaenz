# Funnel Shared Shell — Phase B build

This folder contains the **shared header / footer / chrome** for every
funnel page on The Future Studio. Built in Phase B. **Not yet applied
to any page** — application is Phase C.

---

## Files in this folder

| File | Size goal | Role |
|---|---:|---|
| `funnel-shell.css` | ~9 KB | All visual styles for urgency bar, nav, footer, lang toggle, hamburger, mobile nav, scroll-to-top, WhatsApp button, mobile sticky CTA. **Class names are namespaced with `tfs-`** so they cannot collide with `funnel-layout.css` or `shop.css`. |
| `header.html` | ~3 KB | The shared funnel header markup — urgency bar + sticky nav. Bilingual via `data-en` / `data-es` attributes. |
| `footer.html` | ~3 KB | The shared funnel footer markup + floating UI (`#tfs-whatsapp-btn`, `#tfs-scroll-top`). |
| `lang-toggle.js` | ~3 KB | EN / ES switcher. Walks DOM for `[data-en]` / `[data-es]` attributes. Persists to `localStorage("tfs_lang")`. Updates `[data-tfs-wa]` anchors using their `[data-wa-en]` / `[data-wa-es]` href variants. |
| `urgency-bar.js` | ~2 KB | Drives the `[data-tfs-countdown]` element. Persists deadline to `localStorage("tfs_urgency_deadline")` so the timer doesn't reset between pages. |
| `floating-ui.js` | ~2 KB | Hamburger toggle, scroll-state on nav, scroll-to-top behaviour. |
| `README.md` | — | This file. |

**Total payload added per page:** ~22 KB unminified, before any
existing CSS / JS the page already loads. Substantially smaller than
`shop.css` (53 KB) or `funnel-layout.css` (79 KB) — these new files
are designed to layer **on top** of either, not replace them.

---

## How Phase C will apply these files

### 1. In `<head>` of every funnel page

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/funnel/funnel-shell.css?v=redesign-20260506">
```

The Google Font preconnect/load is identical to what every funnel page
already does, so no new dependency is introduced — we just rely on the
fonts being present.

### 2. On the `<body>` tag

```html
<body class="tfs-shell tfs-has-shell">
```

- `tfs-shell` activates the design tokens (`--tfs-cream`, `--tfs-cyan`,
  etc.) inside this body.
- `tfs-has-shell` adds `padding-top` to clear the fixed urgency bar
  (44 px) and the sticky nav (88–112 px depending on breakpoint).

If a page also has a sticky mobile checkout bar at the bottom (only
checkout pages will), add **`tfs-has-checkout-bar`** so the floating
WhatsApp button and scroll-to-top button move up to avoid overlap.

### 3. Markup placement

Inline the contents of `header.html` as the FIRST element inside
`<body>`, then the page's existing `<main>` / sections, then inline
`footer.html` (which also includes the floating WhatsApp / scroll-top
markup) as the LAST element inside `<body>`.

If a page wants to suppress floating UI (e.g. during a focused
checkout flow), simply omit the second half of `footer.html` (the
`<a id="tfs-whatsapp-btn">` and `<button id="tfs-scroll-top">` blocks).

### 4. Before `</body>` — load shared scripts

```html
<script src="/assets/funnel/lang-toggle.js?v=redesign-20260506"></script>
<script src="/assets/funnel/urgency-bar.js?v=redesign-20260506"></script>
<script src="/assets/funnel/floating-ui.js?v=redesign-20260506"></script>
```

---

## Bilingual system

Every translatable element carries `data-en="..." data-es="..."`.
Default visible text is English (so JS-disabled users still see a
working English page). When the user clicks an EN / ES button:

1. `lang-toggle.js` walks every `[data-en]` / `[data-es]` element and
   replaces `textContent` (or `placeholder` for inputs).
2. `[data-aria-en]` / `[data-aria-es]` swap the `aria-label`.
3. `[data-tfs-wa]` anchors get their `href` swapped between
   `data-wa-en` and `data-wa-es` so WhatsApp deep-links open in
   the correct language.
4. The choice is persisted to `localStorage("tfs_lang")` so it
   sticks across page navigations within the funnel.
5. A `tfs:lang` `CustomEvent` is dispatched on `document` so other
   scripts (e.g. quiz logic, calculator copy) can react.

### Spanish convention
Spanish strings here are **ASCII-only Latin** (no accented characters)
to match the convention already used in the main landing page and
avoid mojibake risk on legacy hosting / encoding edge cases.

For example: `auditoria` not `auditoría`, `Disenado` not `Diseñado`,
`Latinoamerica` not `Latinoamérica`. This matches the canonical
landing page strings 1:1.

If we later switch to UTF-8 + accents site-wide, we can sweep both
the landing page and the funnel together.

### Translation provenance
Every translation reused here is taken **directly** from the main
landing page so funnel ↔ landing copy stays consistent. New funnel
strings (quiz questions, score result text, etc.) will be added
in Phase C+ and follow the same ASCII Spanish convention.

---

## Stripe / payment safety

This entire folder contains **zero references** to Stripe, payment
links, product IDs, query params, or `PAYMENT_LINKS`.

Verified by grep:
```
$ rg -i "stripe|PAYMENT_LINKS|buy\.stripe" assets/funnel/
(no matches)
```

The only outbound URLs in the partials are:

| URL | Where | Purpose |
|---|---|---|
| `https://calendly.com/thefuturestudio-info/30min` | header CTA, urgency bar CTA, footer Contact col, mobile menu | "Book Demo" — already present on the main landing page. NOT a Stripe URL. |
| `https://www.linkedin.com/in/richard-hardy` | header LinkedIn icon | LinkedIn profile. |
| `https://wa.me/50766753870?text=...` | mobile menu, footer Contact col, floating WhatsApp button | WhatsApp deep-link. NOT a Stripe URL. |
| `mailto:info@thefuturestudio.online` | footer Contact col | Email mailto. |
| `https://thefuturestudio.online` | footer Contact col | Root domain. |
| `/#services`, `/#academy`, `/#packages`, `/#instructor`, `/#faq` | nav, footer | Anchor links to landing page sections. |
| `/logo.png` | header, footer | Local logo asset. |

`shop/assets/payment-links.js` is untouched. No file in this Phase B
build imports, edits, or references it.

---

## Conflict avoidance

**All shared classes are prefixed with `tfs-`** (e.g. `.tfs-nav-inner`,
`.tfs-footer-col`). The only un-prefixed selectors used at the page
level are:

- **`body.tfs-shell`** — the wrapper class itself
- **`body.tfs-has-shell`** — opt-in to nav/urgency padding
- **`body.tfs-has-checkout-bar`** — opt-in to lifted floating UI

These are **page-level state classes**, not visual classes — they
exist on `<body>` only, and don't collide with anything in
`funnel-layout.css` or `shop.css`.

I checked both existing CSS files for conflicts:

- `assets/funnel-layout.css` — no `.tfs-*` selectors. Safe.
- `shop/assets/shop.css` — defines `.nav-inner`, `.nav-links`,
  `.lang-toggle`, etc. (un-prefixed). The new `tfs-` namespace
  avoids all of them.
- The audit / learn / build entry pages have inline `<style>` blocks
  that re-define `.site-header` / `.nav-inner` / `.nav-links` inline.
  These will be **removed when Phase C swaps in the new header**, so
  the old inline rules go with them.

---

## Risks identified during Phase B

| # | Risk | Severity | Notes |
|---|---|---|---|
| 1 | Logo height (130px desktop) is taller than the existing funnel headers (62–104px). The shared header will be visually larger. | 🟢 Low | This matches the landing page exactly, which is the requested visual target. |
| 2 | Urgency bar is `position:fixed; top:0`. Pages that don't add `tfs-has-shell` to `<body>` will see content under the urgency bar. | 🟢 Low | The README is explicit; Phase C will set the body class on every page during application. |
| 3 | `[data-tfs-countdown]` shares localStorage state across all funnel pages. If a user lands on page A at minute 11, browses to page B at minute 8, then back to A, A will read 8m. This is intentional ("countdown doesn't reset jarringly"), per the prompt pack §10. | 🟢 Low | Documented behaviour, matches prompt pack. |
| 4 | The mobile menu's "Ask about your first AI system" CTA uses an `outline-dark` button on cream — works on light pages but may need an alt variant on a dark page. | 🟢 Low | Phase C will spot-test on each page; adding a dark-bg variant is a single CSS rule if needed. |
| 5 | We currently anchor nav links to `/#services`, `/#academy`, etc — i.e. the LANDING page sections. The funnel pages don't have these sections. Click = leaves funnel. | 🟡 Medium | This matches the prompt pack §5 ("Keep link targets consistent with the existing main landing page where practical"). For checkout pages we may want a reduced nav (logo + lang toggle + CTA only). Decision to be made in Phase C. |
| 6 | `lang-toggle.js` uses `textContent` replacement. This means a translatable element that contains nested HTML (e.g. `<h1>Find <span class="grad">your</span> leak</h1>`) will lose the nested span when toggled. | 🟡 Medium | Documented in the JS file. Pages with mixed-content headlines will need to split the string into separate `data-en/es` spans. Phase C will do this when authoring page content. |
| 7 | If a page already loads `shop.js` (it has its own lang toggle), having both the new `lang-toggle.js` AND `shop.js` swap text could fight. | 🟠 High-watch | Phase C must remove or disable the old `shop.js` lang toggle on any page that adopts the new shared system. Tracked. |

---

## What is intentionally NOT built in Phase B

- **No reduced-nav variant for checkout pages** yet. We may add one in Phase C — a single `.tfs-nav-minimal` modifier on the nav.
- **No language detection from URL** (e.g. `/es/...`). Detection is purely localStorage + browser language. If marketing wants `/es/` URL routing, that's a separate Phase D task.
- **No A/B test scaffolding.** Per scope: clean, direct conversion design.
- **No Vapi widget.** It only lives on the landing page and may overlap with checkout sticky CTAs.
- **No analytics events.** Existing `funnel-conversion.js` continues to handle that on entry/quiz pages; adding analytics here would duplicate.

---

## End of Phase B. Awaiting approval to proceed to Phase C application.
