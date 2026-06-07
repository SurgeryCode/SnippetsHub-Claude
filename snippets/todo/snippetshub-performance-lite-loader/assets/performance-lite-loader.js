/*
  🧩 Performance Lite Loader
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
  Fingerprint: SURGERYCODE-PERF-JS-001
*/

(() => {
  function getConfig() {
    const el = document.getElementById('surgerycode-performance-lite-config');
    if (!el) return { mode: 'idle', selectors: ['script[data-lite-src]','link[data-lite-href]','iframe[data-lite-src]'] };
    try {
      return JSON.parse(el.textContent || '{}');
    } catch (e) {
      console.warn('[PerfLite] Invalid JSON config', e);
      return { mode: 'idle', selectors: ['script[data-lite-src]','link[data-lite-href]','iframe[data-lite-src]'] };
    }
  }

  function upgradeElement(el) {
    if (el.tagName === 'SCRIPT') {
      const src = el.getAttribute('data-lite-src');
      if (!src) return;
      const s = document.createElement('script');
      // Copy essential attributes
      ['type','async','defer','crossorigin','integrity','referrerpolicy','nonce'].forEach((attr)=>{
        if (el.hasAttribute(attr)) s.setAttribute(attr, el.getAttribute(attr));
      });
      // dataset copy (data-*) except data-lite-*
      ;[...el.attributes].forEach((a)=>{
        if (a.name.startsWith('data-') && !a.name.startsWith('data-lite-')) s.setAttribute(a.name, a.value);
      });
      s.src = src;
      s.setAttribute('data-surgerycode','perf-lite');
      el.replaceWith(s);
      return;
    }

    if (el.tagName === 'LINK') {
      const href = el.getAttribute('data-lite-href');
      if (!href) return;
      el.setAttribute('href', href);
      if (!el.getAttribute('rel')) el.setAttribute('rel','stylesheet');
      el.removeAttribute('data-lite-href');
      el.setAttribute('data-surgerycode','perf-lite');
      return;
    }

    if (el.tagName === 'IFRAME') {
      const src = el.getAttribute('data-lite-src');
      if (!src) return;
      el.setAttribute('src', src);
      el.removeAttribute('data-lite-src');
      el.setAttribute('data-surgerycode','perf-lite');
      return;
    }
  }

  function runUpgrade(selectors) {
    const nodes = document.querySelectorAll(selectors.join(','));
    nodes.forEach(upgradeElement);
  }

  function armInteraction(cb) {
    const run = () => { cleanup(); cb(); };
    const cleanup = () => {
      ['pointerdown','click','keydown','scroll','mousemove','touchstart'].forEach((t)=>window.removeEventListener(t, run, { passive: true }));
    };
    ['pointerdown','click','keydown','scroll','mousemove','touchstart'].forEach((t)=>window.addEventListener(t, run, { passive: true, once: true }));
  }

  function onIdle(cb) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => cb());
    } else {
      setTimeout(cb, 1200);
    }
  }

  function init() {
    const cfg = getConfig();
    const selectors = Array.isArray(cfg.selectors) && cfg.selectors.length ? cfg.selectors : ['script[data-lite-src]','link[data-lite-href]','iframe[data-lite-src]'];
    const mode = cfg.mode || 'idle';
    const perform = () => runUpgrade(selectors);

    switch (mode) {
      case 'immediate':
        perform();
        break;
      case 'interaction':
        armInteraction(perform);
        break;
      case 'afterLoad':
        if (document.readyState === 'complete') perform();
        else window.addEventListener('load', perform, { once: true });
        break;
      case 'idle':
      default:
        onIdle(perform);
        break;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

