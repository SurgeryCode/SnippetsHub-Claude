/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.0 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-product-bundle-builder"]';

  class SnhBundleBuilder {
    constructor(root) {
      this.root = root;
      this.list = root.querySelector('[data-snh-list]');
      this.cta = root.querySelector('[data-snh-cta]');
      this.totalEl = root.querySelector('[data-snh-total]');
      this.totalCompareEl = root.querySelector('[data-snh-total-compare]');
      this.countEl = root.querySelector('[data-snh-count]');
      this.routesRoot = root.dataset.routesRoot || '/';
      this.moneyFormat = root.dataset.moneyFormat || '{{amount}}';
      this.ctaLabel = root.dataset.ctaLabel || 'Add bundle to cart';
      this.addingLabel = root.dataset.addingLabel || 'Adding to cart…';
      this.addedLabel = root.dataset.addedLabel || 'Bundle added!';

      if (!this.list || !this.cta) return;

      this.list.addEventListener('change', (e) => {
        if (e.target.matches('[data-snh-check]')) this.onCheckChange(e.target);
      });

      this.cta.addEventListener('click', () => this.addBundle());

      this.updateTotals();
    }

    onCheckChange(checkbox) {
      const item = checkbox.closest('[data-snh-item]');
      if (!item) return;
      item.classList.toggle('is-checked', checkbox.checked);
      this.updateTotals();
    }

    getCheckedItems() {
      return Array.from(this.list.querySelectorAll('[data-snh-item].is-checked'));
    }

    updateTotals() {
      const checked = this.getCheckedItems();
      let total = 0;
      let compareTotal = 0;

      checked.forEach((item) => {
        total += Number(item.dataset.price || 0);
        compareTotal += Number(item.dataset.comparePrice || 0) || Number(item.dataset.price || 0);
      });

      if (this.totalEl) this.totalEl.textContent = this.formatMoney(total);

      if (this.totalCompareEl) {
        const hasDiscount = compareTotal > total;
        this.totalCompareEl.textContent = hasDiscount ? this.formatMoney(compareTotal) : '';
      }

      if (this.countEl) {
        const n = checked.length;
        this.countEl.textContent = n === 1 ? '1 item selected' : `${n} items selected`;
      }

      this.cta.disabled = checked.length === 0;
    }

    async addBundle() {
      const items = this.getCheckedItems()
        .filter((item) => item.dataset.available !== 'false')
        .map((item) => ({ id: Number(item.dataset.variantId), quantity: 1 }));

      if (items.length === 0) return;

      this.cta.disabled = true;
      this.cta.textContent = this.addingLabel;

      try {
        const response = await fetch(`${this.routesRoot}cart/add.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ items }),
        });

        if (!response.ok) throw new Error();

        const payload = await response.json();
        this.cta.classList.add('is-added');
        this.cta.textContent = this.addedLabel;

        document.dispatchEvent(new CustomEvent('cart:updated', { detail: payload }));
        document.dispatchEvent(new CustomEvent('cart:open'));

        window.setTimeout(() => {
          this.cta.classList.remove('is-added');
          this.cta.textContent = this.ctaLabel;
          this.cta.disabled = false;
        }, 2000);

      } catch (_) {
        this.cta.textContent = this.ctaLabel;
        this.cta.disabled = false;
      }
    }

    formatMoney(cents) {
      if (window.Shopify?.formatMoney) return window.Shopify.formatMoney(cents, this.moneyFormat);
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: window.Shopify?.currency?.active || 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(cents / 100);
    }
  }

  const init = () => {
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (root.dataset.snhInitialized === 'true') return;
      root.dataset.snhInitialized = 'true';
      new SnhBundleBuilder(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
