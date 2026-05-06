/* ============================================================
   The Future Studio - Urgency Bar Countdown
   File: /assets/funnel/urgency-bar.js
   Status: Phase B build. Not yet attached to any page.
   ------------------------------------------------------------
   Purpose
   - Drives any element marked [data-tfs-countdown].
   - Reads minutes / seconds from data-deadline-minutes /
     data-deadline-seconds (default 11:25).
   - Persists the deadline timestamp in localStorage so the
     timer does NOT reset jarringly when the user navigates
     between funnel pages.
   - When the timer reaches 00:00, we keep it pinned at 00:00
     (we don't hide the urgency bar, we don't change copy).
     The marketing intent is "launch window" — the bar simply
     reads 00:00 once expired. A future Phase can add a
     reset / hand-off to a different message if desired.

   Stripe safety
   - Zero references to Stripe / PAYMENT_LINKS.
   - This script does not modify any pricing or any href except
     reading data-* attributes.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'tfs_urgency_deadline'; /* unix ms */
  var DEFAULT_MINUTES = 11;
  var DEFAULT_SECONDS = 25;

  function getOrCreateDeadline(minutes, seconds) {
    var now = Date.now();
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = parseInt(raw, 10);
        /* If there's a stored deadline still in the future, use it.
           If it's expired but within 24h, also use it (we keep the
           "00:00" view). If it's older than 24h, treat as stale and
           start a fresh window. */
        if (!isNaN(parsed)) {
          if (parsed > now)            return parsed; /* still ticking */
          if (now - parsed < 86400000) return parsed; /* recently expired */
        }
      }
    } catch (e) { /* private mode */ }

    var fresh = now + (minutes * 60 + seconds) * 1000;
    try { window.localStorage.setItem(STORAGE_KEY, String(fresh)); } catch (e) { /* ignore */ }
    return fresh;
  }

  function pad(n) { n = Math.max(0, n|0); return n < 10 ? '0' + n : '' + n; }

  function format(remainingMs) {
    if (remainingMs <= 0) return '00:00';
    var totalSeconds = Math.floor(remainingMs / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return pad(minutes) + ':' + pad(seconds);
  }

  function attach(el) {
    var minutes = parseInt(el.getAttribute('data-deadline-minutes'), 10);
    var seconds = parseInt(el.getAttribute('data-deadline-seconds'), 10);
    if (isNaN(minutes)) minutes = DEFAULT_MINUTES;
    if (isNaN(seconds)) seconds = DEFAULT_SECONDS;

    var deadline = getOrCreateDeadline(minutes, seconds);

    function tick() {
      var remaining = deadline - Date.now();
      el.textContent = format(remaining);
      if (remaining <= 0) {
        el.classList.add('tfs-countdown-expired');
      }
    }

    tick();
    /* 1s interval is fine; we won't burn battery and there's no
       sub-second precision to display. */
    var id = setInterval(tick, 1000);
    /* Safety: stop interval if the element is removed */
    if (typeof MutationObserver === 'function') {
      var mo = new MutationObserver(function () {
        if (!document.contains(el)) {
          clearInterval(id);
          mo.disconnect();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }

  function init() {
    var els = document.querySelectorAll('[data-tfs-countdown]');
    for (var i = 0; i < els.length; i++) attach(els[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
