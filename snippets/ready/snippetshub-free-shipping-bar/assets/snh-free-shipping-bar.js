/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.0 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-free-shipping-bar"]';

  class SnhFreeShippingBar {
    constructor(root) {
      this.root = root;
      this.fill = root.querySelector('[data-snh-fill]');
      this.track = root.querySelector('[data-snh-track]');
      this.message = root.querySelector('[data-snh-message]');
      this.icon = root.querySelector('[data-snh-icon]');
      this.thresholdCents = Number(root.dataset.threshold || 0);
      this.moneyFormat = root.dataset.moneyFormat || '{{amount}}';
      this.messageBefore = root.dataset.messageBefore || 'Add {amount} more for FREE shipping!';
      this.messageAfter = root.dataset.messageAfter || "You've unlocked FREE shipping!";
      this.showIcon = root.dataset.showIcon !== 'false';
      this.isFetching = false;

      if (!this.fill || !this.track || this.thresholdCents <= 0) return;

      this.bindEvents();
    }

    bindEvents() {
      const cartEvents = [
        'cart:updated',
        'cart:refresh',
        'cart:change',
        'cart:update',
        'snh:sticky-atc:added',
        'theme:cart:updated',
      ];

      cartEvents.forEach((event) => {
        document.addEventListener(event, () => this.refresh());
      });

      document.addEventListener('shopify:section:load', (event) => {
        if (this.root.closest(`#shopify-section-${event.detail?.sectionId}`)) {
          this.refresh();
        }
      });
    }

    async refresh() {
      if (this.isFetching) return;
      this.isFetching = true;

      try {
        const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`, {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        });

        if (!response.ok) return;

        const cart = await response.json();
        this.update(cart.total_price || 0);
      } catch (_) {
        // fail silently — bar just won't update
      } finally {
        this.isFetching = false;
      }
    }

    update(totalCents) {
      const progress = Math.min(Math.round((totalCents / this.thresholdCents) * 100), 100);
      const reached = totalCents >= this.thresholdCents;
      const remainingCents = Math.max(this.thresholdCents - totalCents, 0);

      this.fill.style.width = `${progress}%`;
      this.track.setAttribute('aria-valuenow', progress);
      this.fill.classList.toggle('SNH-FreeShipping__fill--complete', reached);

      if (this.message) {
        this.message.textContent = reached
          ? this.messageAfter
          : this.messageBefore.replace('{amount}', this.formatMoney(remainingCents));
      }

      if (this.icon && this.showIcon) {
        this.icon.textContent = reached ? '✓' : '🚚';
      }
    }

    formatMoney(cents) {
      if (window.Shopify?.formatMoney) {
        return window.Shopify.formatMoney(cents, this.moneyFormat);
      }

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
      new SnhFreeShippingBar(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
