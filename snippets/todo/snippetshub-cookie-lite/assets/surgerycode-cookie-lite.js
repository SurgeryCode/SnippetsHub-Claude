/*
  🧩 Cookie Lite Script (v1.1)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

(() => {
  'use strict';

  const KEY = 'surgerycode_cookie_consent';

  function hasDecision() {
    return localStorage.getItem(KEY) !== null;
  }

  function setConsent(accepted) {
    localStorage.setItem(KEY, accepted ? 'accepted' : 'declined');
    if (window.Shopify?.customerPrivacy?.setTrackingConsent) {
      try { Shopify.customerPrivacy.setTrackingConsent(accepted, () => {}); } catch (_) {}
    }
  }

  function init() {
    const bar = document.querySelector('[data-sc-cookie]');
    if (!bar || hasDecision()) return;

    // Unhide, then trigger CSS transition on next paint
    bar.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('is-visible')));

    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      setConsent(btn.dataset.action === 'accept');
      bar.classList.remove('is-visible');
      bar.addEventListener('transitionend', () => bar.remove(), { once: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
