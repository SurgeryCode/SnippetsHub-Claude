/*
  🧩 App Script Manager
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
  Fingerprint: SURGERYCODE-ASM-JS-001
*/

(() => {
  const STATE = { loaded: new Set(), armed: false };

  function getConfig() {
    const el = document.getElementById('surgerycode-app-script-manager');
    if (!el) return [];
    try {
      return JSON.parse(el.textContent || '[]');
    } catch (e) {
      console.warn('[ASM] Invalid JSON config', e);
      return [];
    }
  }

  function hasConsent(required) {
    if (!required || required.length === 0) return true;
    const consent = (window.Shopify && window.Shopify.customerPrivacy && typeof window.Shopify.customerPrivacy.userConsentGiven === 'function')
      ? (type) => {
          try { return window.Shopify.customerPrivacy.userConsentGiven(type); } catch { return false; }
        }
      : () => true; // fallback: assume consent granted
    return required.every(consent);
  }

  function loadScript(entry) {
    if (!entry || !entry.src) return;
    const id = entry.id || entry.src;
    if (STATE.loaded.has(id)) return;
    const s = document.createElement('script');
    s.src = entry.src;
    if (entry.async) s.async = true; else s.defer = true;
    if (entry.type) s.type = entry.type;
    if (entry.integrity) s.integrity = entry.integrity;
    if (entry.crossorigin) s.crossOrigin = entry.crossorigin;
    if (entry.dataset && typeof entry.dataset === 'object') {
      Object.entries(entry.dataset).forEach(([k, v]) => s.setAttribute(`data-${k}`, String(v)));
    }
    s.setAttribute('data-surgerycode', 'app-script');
    s.addEventListener('load', () => STATE.loaded.add(id));
    document.head.appendChild(s);
  }

  function armInteraction(callback) {
    if (STATE.armed) return;
    STATE.armed = true;
    const run = () => { cleanup(); callback(); };
    const cleanup = () => {
      ['pointerdown','click','keydown','scroll','mousemove','touchstart'].forEach((t)=>window.removeEventListener(t, run, { passive: true }));
    };
    ['pointerdown','click','keydown','scroll','mousemove','touchstart'].forEach((t)=>window.addEventListener(t, run, { passive: true, once: true }));
  }

  function onIdle(cb) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => cb());
    } else {
      setTimeout(cb, 1500);
    }
  }

  function schedule(entry) {
    const mode = entry.mode || 'afterLoad';
    const go = () => hasConsent(entry.consent) && loadScript(entry);
    switch (mode) {
      case 'immediate':
        go();
        break;
      case 'interaction':
        armInteraction(go);
        break;
      case 'idle':
        onIdle(go);
        break;
      case 'afterLoad':
      default:
        if (document.readyState === 'complete') go();
        else window.addEventListener('load', go, { once: true });
        break;
    }
  }

  function init() {
    const config = getConfig();
    if (!Array.isArray(config)) return;
    config.forEach(schedule);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

