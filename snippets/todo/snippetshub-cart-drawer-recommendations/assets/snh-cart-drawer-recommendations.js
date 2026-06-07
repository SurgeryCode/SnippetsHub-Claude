/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.0 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-cart-drawer-recommendations"]';

  class SnhCartDrawer {
    constructor(root) {
      this.root = root;
      this.drawer = root.querySelector('[data-snh-drawer]');
      this.overlay = root.querySelector('[data-snh-overlay]');
      this.closeBtn = root.querySelector('[data-snh-close]');
      this.itemsList = root.querySelector('[data-snh-items]');
      this.countEl = root.querySelector('[data-snh-count]');
      this.subtotalEl = root.querySelector('[data-snh-subtotal]');
      this.checkoutBtn = root.querySelector('[data-snh-checkout]');
      this.recsEl = root.querySelector('[data-snh-recommendations]');
      this.shippingMsg = root.querySelector('[data-snh-shipping-message]');
      this.shippingFill = root.querySelector('[data-snh-shipping-fill]');
      this.shippingTrack = root.querySelector('[data-snh-shipping-track]');

      this.routesRoot = root.dataset.routesRoot || '/';
      this.moneyFormat = root.dataset.moneyFormat || '{{amount}}';
      this.showFreeShipping = root.dataset.showFreeShipping === 'true';
      this.shippingThreshold = Number(root.dataset.shippingThreshold || 0);
      this.shippingMsgBefore = root.dataset.shippingMessageBefore || 'Add {amount} more for FREE shipping!';
      this.shippingMsgAfter = root.dataset.shippingMessageAfter || "You've unlocked FREE shipping!";
      this.showRecs = root.dataset.showRecommendations === 'true';
      this.recsLimit = Number(root.dataset.recommendationsLimit || 4);
      this.recsTitle = root.dataset.recommendationsTitle || 'You might also like';
      this.emptyMessage = root.dataset.emptyMessage || 'Your cart is empty';
      this.checkoutLabel = root.dataset.checkoutLabel || 'Checkout';
      this.isUpdating = false;
      this.lastRecProductId = null;

      if (!this.drawer) return;

      this.setup();
    }

    setup() {
      this.closeBtn?.addEventListener('click', () => this.close());
      this.overlay?.addEventListener('click', () => this.close());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.root.classList.contains('is-open')) this.close();
      });

      this.itemsList?.addEventListener('click', (e) => this.handleItemAction(e));

      // Open triggers
      document.addEventListener('snh:cart:open', () => this.open());
      document.addEventListener('cart:open', () => this.open());

      // Cart icon click — delegate to any [data-cart-toggle] or href="/cart"
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-cart-toggle], [href="/cart"], [href*="/cart"][data-open-cart]');
        if (trigger) {
          e.preventDefault();
          this.open();
        }
      });

      // Cart update events
      const updateEvents = ['cart:updated', 'cart:refresh', 'cart:update', 'cart:change', 'snh:sticky-atc:added'];
      updateEvents.forEach((ev) => document.addEventListener(ev, () => this.refreshCart()));
    }

    open() {
      this.root.classList.add('is-open');
      this.drawer.setAttribute('aria-hidden', 'false');
      this.overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('snh-cart-open');
      this.drawer.focus();
      this.refreshCart();
    }

    close() {
      this.root.classList.remove('is-open');
      this.drawer.setAttribute('aria-hidden', 'true');
      this.overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('snh-cart-open');
    }

    async refreshCart() {
      if (this.isUpdating) return;
      this.isUpdating = true;
      this.itemsList?.classList.add('is-loading');

      try {
        const response = await fetch(`${this.routesRoot}cart.js`, {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        });
        if (!response.ok) return;
        const cart = await response.json();
        this.renderCart(cart);
        if (this.showRecs && cart.items.length > 0) {
          const productId = cart.items[cart.items.length - 1].product_id;
          if (productId !== this.lastRecProductId) {
            this.lastRecProductId = productId;
            this.loadRecommendations(productId);
          }
        } else if (cart.items.length === 0 && this.recsEl) {
          this.recsEl.innerHTML = '';
        }
      } catch (_) {
        // fail silently
      } finally {
        this.isUpdating = false;
        this.itemsList?.classList.remove('is-loading');
      }
    }

    renderCart(cart) {
      if (this.countEl) this.countEl.textContent = `(${cart.item_count})`;
      if (this.subtotalEl) this.subtotalEl.textContent = this.formatMoney(cart.total_price);

      if (this.checkoutBtn) {
        cart.item_count === 0
          ? this.checkoutBtn.setAttribute('aria-disabled', 'true')
          : this.checkoutBtn.removeAttribute('aria-disabled');
      }

      if (this.showFreeShipping) this.updateShippingBar(cart.total_price);

      if (!this.itemsList) return;

      if (cart.items.length === 0) {
        this.itemsList.innerHTML = `
          <li class="SNH-CartDrawer__empty" data-snh-empty>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <p>${this.emptyMessage}</p>
          </li>`;
        return;
      }

      this.itemsList.innerHTML = cart.items.map((item) => this.renderItem(item)).join('');
    }

    renderItem(item) {
      const variantLine = item.variant_title && item.variant_title !== 'Default Title'
        ? `<p class="SNH-CartDrawer__item-variant">${this.escHtml(item.variant_title)}</p>` : '';

      const compareLine = item.original_line_price !== item.final_line_price
        ? `<s class="SNH-CartDrawer__price-compare">${this.formatMoney(item.original_line_price)}</s>` : '';

      const image = item.image
        ? `<img class="SNH-CartDrawer__item-image" src="${item.image}" alt="${this.escHtml(item.title)}" width="72" height="72" loading="lazy">`
        : '';

      return `
        <li class="SNH-CartDrawer__item" data-snh-item data-key="${item.key}">
          <a class="SNH-CartDrawer__item-image-link" href="${item.url}" tabindex="-1" aria-hidden="true">${image}</a>
          <div class="SNH-CartDrawer__item-details">
            <a class="SNH-CartDrawer__item-title" href="${item.url}">${this.escHtml(item.product_title)}</a>
            ${variantLine}
            <div class="SNH-CartDrawer__item-footer">
              <div class="SNH-CartDrawer__qty" role="group" aria-label="Quantity for ${this.escHtml(item.product_title)}">
                <button class="SNH-CartDrawer__qty-btn" data-snh-qty-change="-1" aria-label="Decrease quantity"${item.quantity <= 1 ? ' disabled' : ''}>−</button>
                <span class="SNH-CartDrawer__qty-value" data-snh-qty>${item.quantity}</span>
                <button class="SNH-CartDrawer__qty-btn" data-snh-qty-change="1" aria-label="Increase quantity">+</button>
              </div>
              <div class="SNH-CartDrawer__item-price">
                ${compareLine}
                <span class="SNH-CartDrawer__price">${this.formatMoney(item.final_line_price)}</span>
              </div>
              <button class="SNH-CartDrawer__remove" data-snh-remove aria-label="Remove ${this.escHtml(item.product_title)}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
            </div>
          </div>
        </li>`;
    }

    handleItemAction(e) {
      const item = e.target.closest('[data-snh-item]');
      if (!item) return;
      const key = item.dataset.key;

      if (e.target.closest('[data-snh-remove]')) {
        this.changeQuantity(key, 0);
        return;
      }

      const qtyChange = e.target.closest('[data-snh-qty-change]');
      if (qtyChange) {
        const delta = Number(qtyChange.dataset.snhQtyChange);
        const current = Number(item.querySelector('[data-snh-qty]')?.textContent || 1);
        this.changeQuantity(key, Math.max(0, current + delta));
      }
    }

    async changeQuantity(key, quantity) {
      try {
        const response = await fetch(`${this.routesRoot}cart/change.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: key, quantity }),
        });
        if (!response.ok) return;
        const cart = await response.json();
        this.renderCart(cart);
        document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
      } catch (_) {
        // fail silently
      }
    }

    updateShippingBar(totalCents) {
      if (!this.shippingFill || !this.shippingMsg || this.shippingThreshold <= 0) return;
      const progress = Math.min(Math.round((totalCents / this.shippingThreshold) * 100), 100);
      const reached = totalCents >= this.shippingThreshold;
      const remaining = Math.max(this.shippingThreshold - totalCents, 0);

      this.shippingFill.style.width = `${progress}%`;
      this.shippingTrack?.setAttribute('aria-valuenow', progress);
      this.shippingMsg.textContent = reached
        ? this.shippingMsgAfter
        : this.shippingMsgBefore.replace('{amount}', this.formatMoney(remaining));
    }

    async loadRecommendations(productId) {
      if (!this.recsEl) return;
      try {
        const url = `${this.routesRoot}recommendations/products.json?product_id=${productId}&limit=${this.recsLimit}&intent=related`;
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!response.ok) return;
        const data = await response.json();
        if (!data.products?.length) { this.recsEl.innerHTML = ''; return; }
        this.renderRecommendations(data.products);
      } catch (_) {
        this.recsEl.innerHTML = '';
      }
    }

    renderRecommendations(products) {
      if (!this.recsEl) return;
      const items = products.map((p) => {
        const img = p.featured_image
          ? `<img class="SNH-CartDrawer__rec-image" src="${p.featured_image}" alt="${this.escHtml(p.title)}" loading="lazy">`
          : `<div class="SNH-CartDrawer__rec-image"></div>`;
        return `
          <li class="SNH-CartDrawer__rec-item">
            <a class="SNH-CartDrawer__rec-link" href="${p.url}">
              ${img}
              <div class="SNH-CartDrawer__rec-info">
                <p class="SNH-CartDrawer__rec-name">${this.escHtml(p.title)}</p>
                <span class="SNH-CartDrawer__rec-price">${this.formatMoney(p.price_min)}</span>
              </div>
            </a>
          </li>`;
      }).join('');

      this.recsEl.innerHTML = `
        <p class="SNH-CartDrawer__rec-title">${this.escHtml(this.recsTitle)}</p>
        <ul class="SNH-CartDrawer__rec-grid" role="list">${items}</ul>`;
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
      new SnhCartDrawer(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
