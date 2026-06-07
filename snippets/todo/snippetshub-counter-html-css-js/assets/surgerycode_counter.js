/*
  🧩 Counter Script (v1.1)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

(() => {
  'use strict';

  function pad(n) { return String(n).padStart(2, '0'); }

  function diffToSegments(ms, showDays) {
    if (ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    if (showDays) {
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const days  = Math.floor(totalSeconds / 86400);
      return { days, hours, minutes, seconds };
    }
    return { hours: Math.floor(totalSeconds / 3600), minutes, seconds };
  }

  function updateDisplay(root, segments) {
    for (const [key, val] of Object.entries(segments)) {
      const el = root.querySelector(`[data-key="${key}"]`);
      if (el) el.textContent = pad(val);
    }
  }

  function initCounter(el) {
    const target    = el.dataset.target;
    const type      = (el.dataset.type || 'until').toLowerCase();
    const showDays  = el.dataset.showDays !== 'false';
    const targetDate = new Date(target);

    if (!target || isNaN(targetDate.getTime())) {
      console.warn('[SurgeryCode Counter] Invalid data-target:', target);
      return;
    }

    function tick() {
      const now    = new Date();
      const diffMs = type === 'since' ? now - targetDate : targetDate - now;
      updateDisplay(el, diffToSegments(diffMs, showDays));
    }

    tick();
    const iv = setInterval(tick, 1000);

    // Clean up when element leaves DOM
    new MutationObserver(() => {
      if (!document.body.contains(el)) {
        clearInterval(iv);
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    document.querySelectorAll('[data-sc-counter]').forEach(initCounter);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
