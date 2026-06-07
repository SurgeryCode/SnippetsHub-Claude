/*
  🧩 Back in Stock Script (v1.1)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

(() => {
  'use strict';

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function initWidget(root) {
    const endpoint  = root.dataset.endpoint;
    const productId = root.dataset.productId;
    let   variantId = root.dataset.variantId;

    if (!endpoint) {
      console.warn('[SurgeryCode BIS] Missing data-endpoint attribute.');
      return;
    }

    const input     = root.querySelector('.surgerycode-bis__input');
    const btn       = root.querySelector('[data-sc-bis-btn]');
    const msgEl     = root.querySelector('[data-sc-bis-msg]');
    const formEl    = root.querySelector('[data-sc-bis-form]');
    const successEl = root.querySelector('[data-sc-bis-success]');

    if (!input || !btn) return;

    const btnOrigLabel = btn.textContent.trim();

    // ─── Sync variantId on Shopify variant:change ───────────────────
    document.addEventListener('variant:change', (e) => {
      if (e.detail?.id) {
        variantId = String(e.detail.id);
        root.dataset.variantId = variantId;
      }
    });

    // Fallback: watch hidden input[name="id"] for value changes
    const variantInput = document.querySelector('form[action*="/cart/add"] input[name="id"]');
    if (variantInput) {
      new MutationObserver(() => {
        variantId = variantInput.value;
        root.dataset.variantId = variantId;
      }).observe(variantInput, { attributes: true, attributeFilter: ['value'] });

      variantInput.form?.addEventListener('change', (e) => {
        if (e.target.name === 'id') {
          variantId = e.target.value;
          root.dataset.variantId = variantId;
        }
      });
    }

    // ─── Event listeners ────────────────────────────────────────────
    btn.addEventListener('click', handleSubmit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSubmit(); });

    // ─── Submit handler ─────────────────────────────────────────────
    async function handleSubmit() {
      clearMsg();

      const email = input.value.trim();

      if (!email) {
        showMsg('Please enter your email address.', 'error');
        input.focus();
        return;
      }
      if (!EMAIL_RE.test(email)) {
        showMsg('Please enter a valid email address.', 'error');
        input.focus();
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, product_id: productId, variant_id: variantId }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Error ${res.status}`);
        }

        showSuccess();
      } catch (err) {
        showMsg(err.message || 'Something went wrong. Please try again.', 'error');
        console.error('[SurgeryCode BIS]', err);
      } finally {
        setLoading(false);
      }
    }

    // ─── Helpers ────────────────────────────────────────────────────
    function setLoading(on) {
      btn.disabled = on;
      btn.textContent = on ? '...' : btnOrigLabel;
    }

    function showMsg(text, type) {
      msgEl.textContent = text;
      msgEl.dataset.type = type;
    }

    function clearMsg() {
      msgEl.textContent = '';
      delete msgEl.dataset.type;
    }

    function showSuccess() {
      if (formEl) formEl.hidden = true;
      if (successEl) successEl.removeAttribute('hidden');
      root.classList.add('surgerycode-bis--done');
    }
  }

  function init() {
    document.querySelectorAll('[data-sc-bis]').forEach(initWidget);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
