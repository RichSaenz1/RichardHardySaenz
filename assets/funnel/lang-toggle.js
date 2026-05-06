/* ============================================================
   The Future Studio - Funnel Language Toggle
   File: /assets/funnel/lang-toggle.js
   Status: Phase B build. Not yet attached to any page.
   ------------------------------------------------------------
   Purpose
   - Lightweight EN / ES switcher. Walks the DOM for elements
     carrying [data-en] / [data-es] attributes and swaps text.
   - Updates [data-tfs-wa] anchors using their [data-wa-en] /
     [data-wa-es] href variants so WhatsApp deep-links open in
     the right language.
   - Persists choice to localStorage ("tfs_lang") so it sticks
     across pages. Falls back to navigator.language when no
     prior choice is found ("es" if the browser is Spanish,
     "en" otherwise).
   - Updates document.documentElement.lang for accessibility.

   Important - it does NOT
   - touch Stripe / payment URLs (PAYMENT_LINKS)
   - touch input values, form names, or hidden fields
   - re-render the page or fire React-style updates
   - ship any analytics

   Stripe safety
   - Search this file: there are zero references to "stripe",
     "buy.stripe", or PAYMENT_LINKS. The only URLs touched are
     <a data-tfs-wa> anchors, which are WhatsApp deep-links.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'tfs_lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'es'];

  /* Resolve initial language */
  function detectInitial() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) { /* private mode / SSR */ }
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.indexOf('es') === 0) return 'es';
    return DEFAULT_LANG;
  }

  /* Apply language to a single element */
  function applyToElement(el, lang) {
    var nodeName = el.nodeName;

    /* Text swap via data-en / data-es */
    var enText = el.getAttribute('data-en');
    var esText = el.getAttribute('data-es');
    if (enText !== null || esText !== null) {
      var next = lang === 'es' ? (esText || enText) : (enText || esText);
      if (next !== null && next !== undefined) {
        /* For <input> placeholders we'd use placeholder; for everything
           else we replace textContent. We deliberately don't touch
           innerHTML so we don't drop nested elements (e.g. <span> inside
           a heading). If a page needs richer bilingual content, it
           should split the text across separate elements that each carry
           data-en / data-es. */
        if ((nodeName === 'INPUT' || nodeName === 'TEXTAREA') && el.placeholder !== undefined) {
          el.placeholder = next;
        } else {
          el.textContent = next;
        }
      }
    }

    /* Aria-label bilingual support: data-aria-en / data-aria-es */
    var ariaEn = el.getAttribute('data-aria-en');
    var ariaEs = el.getAttribute('data-aria-es');
    if (ariaEn !== null || ariaEs !== null) {
      var nextAria = lang === 'es' ? (ariaEs || ariaEn) : (ariaEn || ariaEs);
      if (nextAria) el.setAttribute('aria-label', nextAria);
    }
  }

  /* WhatsApp link href swap */
  function applyWaLink(el, lang) {
    var en = el.getAttribute('data-wa-en');
    var es = el.getAttribute('data-wa-es');
    var next = lang === 'es' ? (es || en) : (en || es);
    if (next) el.setAttribute('href', next);
  }

  /* Highlight active EN / ES button */
  function syncToggleButtons(lang) {
    var btns = document.querySelectorAll('.tfs-lang-btn');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var match = b.getAttribute('data-lang') === lang;
      b.classList.toggle('tfs-active', match);
      b.setAttribute('aria-pressed', match ? 'true' : 'false');
    }
  }

  /* Apply language to elements that follow the existing
     /assets/funnel-conversion.js convention: data-funnel-en /
     data-funnel-es. funnel-conversion.js itself only re-syncs at boot,
     so without this swap the yellow urgency bar text would stay frozen
     in the language it was injected with after the user toggles. We
     use innerHTML here to match funnel-conversion.js's own behavior. */
  function applyFunnelAttribute(el, lang) {
    var en = el.getAttribute('data-funnel-en');
    var es = el.getAttribute('data-funnel-es');
    var next = lang === 'es' ? (es || en) : (en || es);
    if (next !== null && next !== undefined) {
      el.innerHTML = next;
    }
  }

  /* Mirror the language onto storage keys / attributes that other
     scripts (notably funnel-conversion.js) read. funnel-conversion.js's
     lang() reads, in order: body[data-lang], documentElement.lang,
     localStorage("tfs_shop_lang"). We set all three so any subsequent
     re-render inside that script also picks up the right language. */
  function mirrorLang(lang) {
    document.documentElement.lang = lang;
    if (document.body) document.body.setAttribute('data-lang', lang);
    try { window.localStorage.setItem('tfs_shop_lang', lang); } catch (e) { /* ignore */ }
  }

  /* Apply language to whole document */
  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;

    mirrorLang(lang);

    /* Text and aria swaps for the shared shell + page content */
    var nodes = document.querySelectorAll('[data-en], [data-es], [data-aria-en], [data-aria-es]');
    for (var i = 0; i < nodes.length; i++) {
      applyToElement(nodes[i], lang);
    }

    /* funnel-conversion.js convention (existing global yellow bar etc) */
    var funnelNodes = document.querySelectorAll('[data-funnel-en], [data-funnel-es]');
    for (var k = 0; k < funnelNodes.length; k++) {
      applyFunnelAttribute(funnelNodes[k], lang);
    }

    /* WhatsApp link swaps */
    var wa = document.querySelectorAll('[data-tfs-wa]');
    for (var j = 0; j < wa.length; j++) {
      applyWaLink(wa[j], lang);
    }

    /* Toggle buttons */
    syncToggleButtons(lang);

    /* Persist + emit event */
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }

    try {
      document.dispatchEvent(new CustomEvent('tfs:lang', { detail: { lang: lang } }));
    } catch (e) {
      /* IE11-safe fallback */
      var ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('tfs:lang', false, false, { lang: lang });
      document.dispatchEvent(ev);
    }
  }

  /* Wire up button clicks */
  function wireToggle() {
    document.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== document) {
        if (t.classList && t.classList.contains('tfs-lang-btn')) {
          var lang = t.getAttribute('data-lang');
          if (lang) {
            applyLang(lang);
          }
          return;
        }
        t = t.parentNode;
      }
    });
  }

  /* Boot */
  function init() {
    var initial = detectInitial();
    applyLang(initial);
    wireToggle();
  }

  /* Public API for other shared scripts */
  window.TFSLang = {
    get: function () {
      try { return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
      catch (e) { return DEFAULT_LANG; }
    },
    set: applyLang,
    refresh: function () { applyLang(window.TFSLang.get()); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
