/*
  🧩 Locale Recommender Script (v1.1)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

(() => {
  'use strict';

  const DISMISSED_KEY = 'surgerycode_locale_dismissed';

  function findBestLocale(locales, browserLang) {
    const b = browserLang.toLowerCase();
    const exact = locales.find(l => l.iso_code.toLowerCase() === b);
    if (exact) return exact;
    const base = b.split('-')[0];
    return locales.find(l => l.iso_code.toLowerCase().startsWith(base)) || null;
  }

  function buildUrl(rootUrl, currentPath, currentSearch) {
    const root = rootUrl ? rootUrl.replace(/\/$/, '') : '';
    return root + currentPath + currentSearch;
  }

  function init() {
    document.querySelectorAll('.surgerycode-locale').forEach((rootEl) => {
      let locales;
      try {
        locales = JSON.parse(rootEl.dataset.locales || '[]');
      } catch {
        return;
      }

      const current = (rootEl.dataset.current || '').toLowerCase();
      const browser = (navigator.language || '').toLowerCase();

      if (!locales.length || !browser) return;
      if (sessionStorage.getItem(DISMISSED_KEY)) return;

      const best = findBestLocale(locales, browser);
      if (!best || best.iso_code.toLowerCase() === current) return;

      const bar   = rootEl.querySelector('.surgerycode-locale__bar');
      const text  = rootEl.querySelector('.surgerycode-locale__text');
      const apply = rootEl.querySelector('.surgerycode-locale__apply');
      const close = rootEl.querySelector('.surgerycode-locale__close');

      if (!bar || !text || !apply || !close) return;

      const localeName = best.endonym_name || best.name || best.iso_code;
      text.textContent  = `It looks like you may prefer ${localeName}. Would you like to switch?`;
      apply.textContent = `Switch to ${localeName}`;

      apply.addEventListener('click', () => {
        const url = buildUrl(best.root_url, window.location.pathname, window.location.search);
        window.location.href = url;
      });

      close.addEventListener('click', () => {
        sessionStorage.setItem(DISMISSED_KEY, '1');
        bar.classList.remove('is-visible');
        bar.addEventListener('transitionend', () => { bar.hidden = true; }, { once: true });
      });

      // Show with slide-in animation
      bar.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('is-visible')));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
