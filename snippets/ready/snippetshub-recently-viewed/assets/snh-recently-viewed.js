/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.0 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-recently-viewed"]';
  const MAX_STORED = 20;

  class SnhRecentlyViewed {
    constructor(root) {
      this.root = root;
      this.limit = Number(root.dataset.limit || 4);
      this.title = root.dataset.title || 'Recently viewed';
      this.moneyFormat = root.dataset.moneyFormat || '{{amount}}';
      this.excludeHandle = root.dataset.excludeHandle || '';
      this.storageKey = root.dataset.storageKey || 'snh-rv-products';

      // Save current product (product pages only)
      const currentRaw = root.dataset.currentProduct;
      if (currentRaw) {
        try {
          this.saveProduct(JSON.parse(currentRaw));
        } catch (_) {}
      }

      this.render();
    }

    saveProduct(product) {
      if (!product?.handle) return;
      const stored = this.readStorage();
      const filtered = stored.filter((p) => p.handle !== product.handle);
      filtered.unshift(product);
      this.writeStorage(filtered.slice(0, MAX_STORED));
    }

    readStorage() {
      try {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      } catch (_) {
        return [];
      }
    }

    writeStorage(products) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(products));
      } catch (_) {}
    }

    render() {
      const stored = this.readStorage();
      const products = stored
        .filter((p) => p.handle !== this.excludeHandle)
        .slice(0, this.limit);

      if (products.length === 0) return;

      const cards = products.map((p) => this.renderCard(p)).join('');

      this.root.innerHTML = `
        <div class="SNH-RecentlyViewed">
          <div class="SNH-RecentlyViewed__header">
            <h2 class="SNH-RecentlyViewed__title">${this.escHtml(this.title)}</h2>
          </div>
          <div class="SNH-RecentlyViewed__track" role="list" aria-label="${this.escHtml(this.title)}">
            ${cards}
          </div>
        </div>`;
    }

    renderCard(product) {
      const img = product.image
        ? `<img class="SNH-RecentlyViewed__image" src="${product.image}" alt="${this.escHtml(product.image_alt || product.title)}" loading="lazy" width="220" height="220">`
        : `<div class="SNH-RecentlyViewed__image" style="background:var(--snh-rv-border)"></div>`;

      const hasCompare = product.compare_at_price && product.compare_at_price > product.price;
      const compareLine = hasCompare
        ? `<span class="SNH-RecentlyViewed__compare">${this.formatMoney(product.compare_at_price)}</span>` : '';

      return `
        <div class="SNH-RecentlyViewed__card" role="listitem">
          <a class="SNH-RecentlyViewed__image-link" href="${product.url}" aria-label="${this.escHtml(product.title)}" tabindex="-1">
            ${img}
          </a>
          <div class="SNH-RecentlyViewed__info">
            <a class="SNH-RecentlyViewed__name" href="${product.url}">${this.escHtml(product.title)}</a>
            <div class="SNH-RecentlyViewed__price-row">
              <span class="SNH-RecentlyViewed__price">${this.formatMoney(product.price)}</span>
              ${compareLine}
            </div>
            <a class="SNH-RecentlyViewed__btn" href="${product.url}">View product</a>
          </div>
        </div>`;
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

    escHtml(str) {
      return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  }

  const init = () => {
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (root.dataset.snhInitialized === 'true') return;
      root.dataset.snhInitialized = 'true';
      new SnhRecentlyViewed(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
