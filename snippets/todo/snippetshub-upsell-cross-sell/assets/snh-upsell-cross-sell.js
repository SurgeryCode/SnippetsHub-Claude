/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.0 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-upsell-cross-sell"]';

  class SnhUpsell {
    constructor(root) {
      this.root = root;
      this.routesRoot = root.dataset.routesRoot || '/';
      this.addLabel = root.dataset.addLabel || 'Add to cart';
      this.addingLabel = root.dataset.addingLabel || 'Adding…';
      this.addedLabel = root.dataset.addedLabel || 'Added!';

      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-snh-atc]');
        if (btn && !btn.disabled) this.addToCart(btn);
      });
    }

    async addToCart(btn) {
      const variantId = btn.dataset.variantId;
      if (!variantId) return;

      btn.disabled = true;
      btn.classList.add('is-loading');
      btn.textContent = this.addingLabel;

      try {
        const response = await fetch(`${this.routesRoot}cart/add.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: variantId, quantity: 1 }),
        });

        if (!response.ok) throw new Error();

        const payload = await response.json();
        btn.classList.remove('is-loading');
        btn.classList.add('is-added');
        btn.textContent = this.addedLabel;

        document.dispatchEvent(new CustomEvent('cart:updated', { detail: payload }));
        document.dispatchEvent(new CustomEvent('cart:open'));

        window.setTimeout(() => {
          btn.classList.remove('is-added');
          btn.textContent = this.addLabel;
          btn.disabled = false;
        }, 1500);

      } catch (_) {
        btn.classList.remove('is-loading');
        btn.textContent = this.addLabel;
        btn.disabled = false;
      }
    }
  }

  const init = () => {
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (root.dataset.snhInitialized === 'true') return;
      root.dataset.snhInitialized = 'true';
      new SnhUpsell(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
