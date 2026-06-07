/*
  🧩 SurgeryCode Cart Drawer Script (v1.2)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

(() => {
  'use strict';

  const MONEY_FORMAT = window.Shopify?.money_format || '{{amount}}';

  function formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    return MONEY_FORMAT.replace('{{amount}}', amount)
      .replace('{{amount_no_decimals}}', Math.round(cents / 100))
      .replace('{{amount_with_comma_separator}}', amount.replace('.', ','));
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
  }

  const SurgeryCodeCartDrawer = {
    drawer: null,
    overlay: null,
    itemsEl: null,
    subtotalEl: null,
    countEl: null,
    emptyEl: null,
    footerEl: null,
    upsellsEl: null,
    enableUpsells: false,
    upsellLimit: 3,

    init() {
      this.drawer = document.getElementById('SurgeryCodeCartDrawer');
      if (!this.drawer) return;

      const scriptTag = document.querySelector('script[data-enable-upsells]');
      this.enableUpsells = scriptTag?.dataset.enableUpsells === 'true';
      this.upsellLimit = parseInt(scriptTag?.dataset.upsellLimit || '3', 10);

      this.overlay = document.querySelector('.surgerycode-cart-drawer__overlay');
      this.itemsEl = this.drawer.querySelector('[data-surgerycode-cart-items]');
      this.subtotalEl = this.drawer.querySelector('[data-surgerycode-subtotal]');
      this.countEl = this.drawer.querySelector('[data-surgerycode-count]');
      this.emptyEl = this.drawer.querySelector('[data-surgerycode-empty]');
      this.footerEl = this.drawer.querySelector('[data-surgerycode-footer]');
      this.upsellsEl = this.drawer.querySelector('[data-surgerycode-upsells]');

      // Close triggers
      this.drawer.querySelectorAll('[data-surgerycode-close]')
        .forEach(el => el.addEventListener('click', () => this.hide()));
      this.overlay?.addEventListener('click', () => this.hide());
      document.addEventListener('keydown', e => { if (e.key === 'Escape') this.hide(); });

      // Intercept add-to-cart buttons with [data-add-to-cart]
      document.addEventListener('click', e => {
        const btn = e.target.closest('[data-add-to-cart]');
        if (!btn) return;
        const form = btn.closest('form');
        if (!form) return;
        e.preventDefault();
        this.addToCart(form);
      });

      // Also listen for Shopify cart:add custom event (Dawn / other themes fire this)
      document.addEventListener('cart:add', () => this.refresh());
    },

    async addToCart(form) {
      const btn = form.querySelector('[data-add-to-cart]');
      if (btn) btn.disabled = true;

      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body: new FormData(form),
        });
        if (!res.ok) throw new Error('Add to cart failed');
        await this.refresh();
      } catch (err) {
        console.error('[SurgeryCode Cart Drawer]', err);
      } finally {
        if (btn) btn.disabled = false;
      }
    },

    async refresh() {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      this.renderItems(cart);
      if (this.enableUpsells && cart.items.length > 0) {
        this.loadUpsells(cart.items[0].product_id);
      }
      this.show();
    },

    renderItems(cart) {
      const { items, total_price, item_count } = cart;
      const isEmpty = items.length === 0;

      if (this.countEl) {
        this.countEl.textContent = item_count > 0 ? `(${item_count})` : '';
      }

      if (isEmpty) {
        this.itemsEl.innerHTML = '';
        this.emptyEl?.removeAttribute('hidden');
        this.footerEl?.setAttribute('hidden', '');
        return;
      }

      this.emptyEl?.setAttribute('hidden', '');
      this.footerEl?.removeAttribute('hidden');

      if (this.subtotalEl) {
        this.subtotalEl.textContent = formatMoney(total_price);
      }

      this.itemsEl.innerHTML = items.map(item => `
        <div class="surgerycode-cart-item" data-key="${escapeHtml(item.key)}">
          <a href="${escapeHtml(item.url)}" class="surgerycode-cart-item__img-wrap" tabindex="-1">
            <img
              src="${escapeHtml(item.image)}"
              alt="${escapeHtml(item.title)}"
              class="surgerycode-cart-item__img"
              width="80"
              height="80"
              loading="lazy"
            >
          </a>
          <div class="surgerycode-cart-item__info">
            <a href="${escapeHtml(item.url)}" class="surgerycode-cart-item__title">
              ${escapeHtml(item.product_title)}
            </a>
            ${item.variant_title ? `<p class="surgerycode-cart-item__variant">${escapeHtml(item.variant_title)}</p>` : ''}
            <div class="surgerycode-cart-item__bottom">
              <div class="surgerycode-cart-item__qty-wrap">
                <button
                  class="surgerycode-cart-item__qty-btn"
                  data-action="decrease"
                  data-key="${escapeHtml(item.key)}"
                  data-qty="${item.quantity}"
                  aria-label="Decrease quantity"
                  type="button"
                >−</button>
                <span class="surgerycode-cart-item__qty">${item.quantity}</span>
                <button
                  class="surgerycode-cart-item__qty-btn"
                  data-action="increase"
                  data-key="${escapeHtml(item.key)}"
                  data-qty="${item.quantity}"
                  aria-label="Increase quantity"
                  type="button"
                >+</button>
              </div>
              <span class="surgerycode-cart-item__price">${formatMoney(item.final_line_price)}</span>
            </div>
          </div>
          <button
            class="surgerycode-cart-item__remove"
            data-key="${escapeHtml(item.key)}"
            aria-label="Remove ${escapeHtml(item.product_title)}"
            type="button"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      `).join('');

      // Quantity & remove handlers
      this.itemsEl.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.key;
          const current = parseInt(btn.dataset.qty, 10);
          const qty = btn.dataset.action === 'increase' ? current + 1 : current - 1;
          this.updateQty(key, qty);
        });
      });

      this.itemsEl.querySelectorAll('.surgerycode-cart-item__remove').forEach(btn => {
        btn.addEventListener('click', () => this.updateQty(btn.dataset.key, 0));
      });
    },

    async updateQty(key, qty) {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty }),
      });
      this.refresh();
    },

    async loadUpsells(productId) {
      if (!this.upsellsEl) return;
      const upsellItemsEl = this.upsellsEl.querySelector('[data-surgerycode-upsells-items]');
      if (!upsellItemsEl) return;

      try {
        const res = await fetch(
          `/recommendations/products.json?product_id=${productId}&limit=${this.upsellLimit}&intent=related`
        );
        const data = await res.json();
        const products = data.products || [];

        if (!products.length) {
          this.upsellsEl.setAttribute('hidden', '');
          return;
        }

        upsellItemsEl.innerHTML = products.map(p => `
          <div class="surgerycode-upsell-item">
            <img src="${escapeHtml(p.featured_image)}" alt="${escapeHtml(p.title)}" class="surgerycode-upsell-item__img" width="56" height="56" loading="lazy">
            <div class="surgerycode-upsell-item__info">
              <p class="surgerycode-upsell-item__title">${escapeHtml(p.title)}</p>
              <p class="surgerycode-upsell-item__price">${formatMoney(p.price)}</p>
            </div>
            <button
              class="surgerycode-upsell-item__add"
              data-variant-id="${p.variants[0].id}"
              aria-label="Add ${escapeHtml(p.title)} to cart"
              type="button"
            >+</button>
          </div>
        `).join('');

        upsellItemsEl.querySelectorAll('.surgerycode-upsell-item__add').forEach(btn => {
          btn.addEventListener('click', async () => {
            btn.disabled = true;
            await fetch('/cart/add.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: btn.dataset.variantId, quantity: 1 }),
            });
            this.refresh();
          });
        });

        this.upsellsEl.removeAttribute('hidden');
      } catch (err) {
        console.warn('[SurgeryCode Cart Drawer] Upsells failed:', err);
      }
    },

    show() {
      this.drawer.classList.add('active');
      this.drawer.setAttribute('aria-hidden', 'false');
      this.overlay?.classList.add('active');
      document.body.classList.add('surgerycode-cart-drawer--open');
      // Move focus to drawer
      this.drawer.querySelector('[data-surgerycode-close]')?.focus();
    },

    hide() {
      this.drawer.classList.remove('active');
      this.drawer.setAttribute('aria-hidden', 'true');
      this.overlay?.classList.remove('active');
      document.body.classList.remove('surgerycode-cart-drawer--open');
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SurgeryCodeCartDrawer.init());
  } else {
    SurgeryCodeCartDrawer.init();
  }
})();
