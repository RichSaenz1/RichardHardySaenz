/* ============================================================
   The Future Studio - Floating UI wiring
   File: /assets/funnel/floating-ui.js
   Status: Phase B build. Not yet attached to any page.
   ------------------------------------------------------------
   Purpose
   - Binds the mobile hamburger toggle (#tfs-nav-hamburger)
     to the mobile menu (#tfs-nav-mobile).
   - Adds .tfs-scrolled to #tfs-nav after the user has scrolled
     past 12px (matches the landing page nav glass effect).
   - Shows / hides #tfs-scroll-top after the user scrolls
     past 600px, and scrolls smoothly to top on click.
   - Closes the mobile menu when a link inside it is tapped
     (so internal anchor links work cleanly).

   Stripe safety
   - Zero references to Stripe / PAYMENT_LINKS.
   - Does not modify any href.
   ============================================================ */

(function () {
  'use strict';

  function initHamburger() {
    var btn = document.getElementById('tfs-nav-hamburger') || document.getElementById('nav-hamburger');
    var menu = document.getElementById('tfs-nav-mobile') || document.getElementById('nav-mobile');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var open = !(menu.classList.contains('tfs-open') || menu.classList.contains('open'));
      menu.classList.toggle('tfs-open', open);
      menu.classList.toggle('open', open);
      btn.classList.toggle('tfs-open', open);
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    /* Close when a menu link is tapped */
    menu.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== menu) {
        if (t.nodeName === 'A') {
          menu.classList.remove('tfs-open');
          menu.classList.remove('open');
          btn.classList.remove('tfs-open');
          btn.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          return;
        }
        t = t.parentNode;
      }
    });
  }

  function initNavScroll() {
    var nav = document.getElementById('tfs-nav') || document.getElementById('nav');
    if (!nav) return;
    var lastY = window.pageYOffset || document.documentElement.scrollTop;
    var ticking = false;

    function update() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      nav.classList.toggle('tfs-scrolled', y > 12);
      nav.classList.toggle('scrolled', y > 12);
      lastY = y;
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  function initScrollTop() {
    var btn = document.getElementById('tfs-scroll-top');
    if (!btn) return;
    var ticking = false;

    function update() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      btn.classList.toggle('tfs-visible', y > 600);
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function init() {
    initHamburger();
    initNavScroll();
    initScrollTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
