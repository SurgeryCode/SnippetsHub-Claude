/* SnippetsHub — Back in Stock v1.1.0 | support@snippetshub.com */
(() => {
  'use strict';

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function initWidget(root) {
    const wrapper  = root.closest('[data-snh-bis-wrapper]') || root;
    const endpoint = root.dataset.endpoint;
    const productId = root.dataset.productId;
    let variantId   = root.dataset.variantId;

    const input     = root.querySelector('.snh-bis__input');
    const btn       = root.querySelector('[data-snh-bis-btn]');
    const msgEl     = root.querySelector('[data-snh-bis-msg]');
    const formEl    = root.querySelector('[data-snh-bis-form]');
    const successEl = root.querySelector('[data-snh-bis-success]');

    if (!input || !btn) return;

    const btnOrigLabel = btn.textContent.trim();

    // Show/hide wrapper based on variant availability
    function syncVisibility(available) {
      if (wrapper) wrapper.style.display = available ? 'none' : '';
    }

    // Listen for variant changes (Shopify standard + common theme events)
    document.addEventListener('variant:change', e => {
      const v = e.detail?.variant || e.detail;
      if (v?.id) {
        variantId = String(v.id);
        root.dataset.variantId = variantId;
        syncVisibility(v.available);
      }
    });

    // Fallback: watch hidden input[name="id"]
    const variantInput = document.querySelector('form[action*="/cart/add"] input[name="id"]');
    if (variantInput) {
      new MutationObserver(() => {
        variantId = variantInput.value;
        root.dataset.variantId = variantId;
      }).observe(variantInput, { attributes: true, attributeFilter: ['value'] });

      variantInput.form?.addEventListener('change', e => {
        if (e.target.name === 'id') {
          variantId = e.target.value;
          root.dataset.variantId = variantId;
        }
      });
    }

    btn.addEventListener('click', handleSubmit);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSubmit(); });

    async function handleSubmit() {
      clearMsg();
      const email = input.value.trim();

      if (!email) { showMsg('Please enter your email address.', 'error'); input.focus(); return; }
      if (!EMAIL_RE.test(email)) { showMsg('Please enter a valid email address.', 'error'); input.focus(); return; }

      if (!endpoint) {
        showMsg('Notification endpoint not configured. Please contact the store owner.', 'error');
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
        console.error('[SNH Back in Stock]', err);
      } finally {
        setLoading(false);
      }
    }

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
      root.classList.add('snh-bis--done');
    }
  }

  function init() {
    document.querySelectorAll('[data-snh-bis]').forEach(initWidget);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
