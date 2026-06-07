/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.6 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-sticky-add-to-cart-bar"]';

  class SnhStickyAddToCart {
    constructor(root) {
      this.root = root;
      this.bar = root.querySelector('.SNH-StickyAtc');
      this.button = root.querySelector('[data-snh-add-to-cart]');
      this.status = root.querySelector('[data-snh-status]');
      this.title = root.querySelector('[data-snh-title]');
      this.variantTitle = root.querySelector('[data-snh-variant]');
      this.price = root.querySelector('[data-snh-price]');
      this.comparePrice = root.querySelector('[data-snh-compare-price]');
      this.image = root.querySelector('.SNH-StickyAtc__media');
      this.productId = String(root.dataset.productId || '');
      this.productTitle = root.dataset.productTitle || '';
      this.fallbackImageSrc = root.dataset.fallbackImageSrc || '';
      this.fallbackImageAlt = root.dataset.fallbackImageAlt || this.productTitle || '';
      this.postAddBehavior = root.dataset.postAddBehavior || 'stay_on_page';
      this.hideOnFooterHover = root.dataset.hideOnFooterHover !== 'false';
      this.defaultLabel = root.dataset.defaultCta || 'Add to cart';
      this.addingLabel = root.dataset.addingLabel || 'Adding...';
      this.addedButtonLabel = root.dataset.addedLabel || 'Added to cart';
      this.soldOutLabel = root.dataset.soldOutLabel || 'Sold out';
      this.errorLabel = root.dataset.errorLabel || 'Failed to add product to cart';
      this.minimumScrollToShow = 24;
      this.variants = this.readVariants();
      this.variantById = new Map(this.variants.map((variant) => [String(variant.id), variant]));
      this.currentVariant = this.variantById.values().next().value || null;
      this.mainForm = null;
      this.mainFormComponent = null;
      this.productContext = null;
      this.variantIdInput = null;
      this.triggerElement = null;
      this.footerElement = null;
      this.isHiddenByFooter = false;
      this.mutationObserver = null;
      this.intersectionObserver = null;
      this.footerObserver = null;
      this.handleScroll = this.updateVisibility.bind(this);

      if (!this.bar || !this.button || this.root.dataset.enabled !== 'true') {
        return;
      }

      this.setup();
    }

    readVariants() {
      const source = this.root.querySelector('[data-snh-variants]');

      if (!source) {
        return [];
      }

      try {
        return JSON.parse(source.textContent);
      } catch (error) {
        console.warn('SnippetsHub sticky add to cart: failed to parse variants JSON.', error);
        return [];
      }
    }

    setup() {
      this.findMainForm();
      this.bindEvents();
      this.syncVariantFromForm();
      this.syncImageFromDom();
      this.updateVisibility();
    }

    findMainForm() {
      const forms = Array.from(document.querySelectorAll('form[action*="/cart/add"]'));
      const matchingForms = forms.filter((form) => {
        const idInput = form.querySelector('input[name="id"]');

        if (!idInput) {
          return false;
        }

        if (this.variantById.has(String(idInput.value))) {
          return true;
        }

        return form.dataset.productId === this.productId || String(form.id || '').includes(this.productId);
      });

      this.mainForm = this.selectBestMainForm(matchingForms) || this.selectBestMainForm(forms) || null;
      this.mainFormComponent = this.mainForm?.closest('product-form-component, product-form') || null;
      this.productContext = this.resolveProductContext(this.mainForm || this.mainFormComponent || this.root);
      this.variantIdInput = this.mainForm ? this.mainForm.querySelector('input[name="id"]') : null;

      if (!this.mainForm) {
        return;
      }

      this.triggerElement =
        this.mainForm.closest('.buy-buttons-block, .product-form, product-form, product-form-component, [data-type="add-to-cart-form"]') ||
        this.mainForm;
      this.footerElement = document.querySelector('footer, [class*="footer-group"]');
    }

    resolveProductContext(element) {
      if (!element) {
        return document;
      }

      return (
        element.closest(
          [
            'product-info',
            '[id^="MainProduct-"]',
            '[id^="ProductInfo-"]',
            '[data-testid="product-information-details"]',
            '.product',
            '.product-details',
            '.shopify-section'
          ].join(', ')
        ) || document
      );
    }

    selectBestMainForm(forms) {
      if (!forms.length) {
        return null;
      }

      const scoredForms = forms
        .map((form) => ({
          form,
          score: this.scoreForm(form)
        }))
        .filter((entry) => entry.score > Number.NEGATIVE_INFINITY)
        .sort((left, right) => right.score - left.score);

      return scoredForms[0]?.form || null;
    }

    scoreForm(form) {
      const rect = form.getBoundingClientRect();
      const formComponent = form.closest('product-form-component, product-form');
      const productContext = this.resolveProductContext(form);
      const triggerCandidate =
        form.closest('.buy-buttons-block, .product-form, product-form, product-form-component, [data-type="add-to-cart-form"]') ||
        form;
      const triggerRect = triggerCandidate.getBoundingClientRect();
      let score = 0;

      if (form.closest('quick-add-component, quick-add-modal, .quick-add, .quick-add-modal')) {
        score -= 200;
      }

      if (form.closest('product-card, .product-card, .card-product, .card, .drawer, .dialog-modal')) {
        score -= 120;
      }

      if (form.closest('#CartDrawer, cart-drawer, cart-drawer-component, cart-notification')) {
        score -= 200;
      }

      if (formComponent?.dataset?.productId === this.productId || form.dataset.productId === this.productId) {
        score += 80;
      }

      if (productContext !== document) {
        score += 25;
      }

      if (form.closest('[id^="ProductInformation-"], .product-details, product-info, [data-testid="product-information-details"]')) {
        score += 60;
      }

      if (form.getClientRects().length > 0 && rect.width > 0 && rect.height > 0) {
        score += 30;
      } else {
        score -= 40;
      }

      if (triggerRect.top >= 0) {
        score += 20;
      }

      score -= Math.min(Math.abs(triggerRect.top), 4000) / 100;

      return score;
    }

    bindEvents() {
      this.button.addEventListener('click', () => this.handleAddToCart());

      if (this.mainForm) {
        this.mainForm.addEventListener('change', () => {
          window.requestAnimationFrame(() => this.syncVariantFromForm());
        });
      }

      if (this.variantIdInput) {
        this.variantIdInput.addEventListener('change', () => this.syncVariantFromForm());

        this.mutationObserver = new MutationObserver(() => this.syncVariantFromForm());
        this.mutationObserver.observe(this.variantIdInput, {
          attributes: true,
          attributeFilter: ['value']
        });
      }

      document.addEventListener('variant:change', (event) => this.handleVariantEvent(event));
      document.addEventListener('product:variant-change', (event) => this.handleVariantEvent(event));
      document.addEventListener('variant:update', (event) => this.handleVariantEvent(event));
      document.addEventListener('variant:selected', (event) => this.handleVariantEvent(event));

      if ('IntersectionObserver' in window && this.triggerElement) {
        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            const rect = entry.boundingClientRect;
            const shouldShow =
              !entry.isIntersecting &&
              this.isTriggerScrolledPast(rect) &&
              !this.isHiddenByFooter &&
              this.hasReachedStickyThreshold();
            this.toggleBar(shouldShow);
          },
          {
            threshold: 0
          }
        );

        this.intersectionObserver.observe(this.triggerElement);

        if (this.footerElement && this.hideOnFooterHover) {
          this.footerObserver = new IntersectionObserver(
            (entries) => {
              const [entry] = entries;

              this.isHiddenByFooter = Boolean(entry?.isIntersecting);
              this.updateVisibility();
            },
            {
              rootMargin: '200px 0px 0px 0px',
              threshold: 0
            }
          );

          this.footerObserver.observe(this.footerElement);
        }
      } else {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('resize', this.handleScroll);
      }
    }

    handleVariantEvent(event) {
      const variant =
        event?.detail?.variant ||
        event?.detail?.data?.variant ||
        event?.detail?.resource ||
        null;

      if (variant && variant.product_id && String(variant.product_id) !== this.productId) {
        return;
      }

      if (variant && variant.id) {
        this.upsertVariant(variant);
        this.updateVariant(String(variant.id));
        window.requestAnimationFrame(() => this.syncImageFromDom());
        return;
      }

      window.requestAnimationFrame(() => {
        this.syncVariantFromForm();
        this.syncImageFromDom();
      });
    }

    syncVariantFromForm() {
      if (this.variantIdInput && this.variantIdInput.value) {
        this.updateVariant(String(this.variantIdInput.value));
      } else if (!this.currentVariant && this.variants.length) {
        this.currentVariant = this.variants[0];
        this.renderVariant();
      }
    }

    syncImageFromDom() {
      if (!this.image) {
        return;
      }

      const currentProductImage = this.findCurrentProductImage();

      if (!currentProductImage) {
        return;
      }

      this.image.src = currentProductImage.src || this.currentVariant?.featured_image || this.fallbackImageSrc;
      this.image.alt = currentProductImage.alt || this.currentVariant?.featured_image_alt || this.fallbackImageAlt;
    }

    findCurrentProductImage() {
      const candidates = this.getImageSearchRoots().flatMap((root) =>
        Array.from(
          root.querySelectorAll(
            [
              'media-gallery .is-active img',
              'media-gallery [aria-current="true"] img',
              'media-gallery [aria-hidden="false"] img',
              '.product__media-item.is-active img',
              '.product-media.is-active img',
              '[data-media-id].is-active img',
              '.swiper-slide-active img',
              'media-gallery img',
              '.product-media img',
              '.product__media img',
              '[data-media-id] img',
              '.media-gallery img'
            ].join(', ')
          )
        )
      );

      const bestCandidate = [...new Set(candidates)]
        .map((image) => ({
          image,
          rect: image.getBoundingClientRect(),
          score: this.scoreImageCandidate(image)
        }))
        .filter(({ rect, image }) => rect.width > 0 && rect.height > 0 && image.currentSrc)
        .sort((left, right) => right.score - left.score)[0];

      return bestCandidate?.image || null;
    }

    getImageSearchRoots() {
      const roots = [];

      if (this.productContext && this.productContext !== document) {
        roots.push(this.productContext);
      }

      if (this.mainFormComponent) {
        const componentContext = this.resolveProductContext(this.mainFormComponent);

        if (componentContext !== document) {
          roots.push(componentContext);
        }
      }

      roots.push(document);

      return [...new Set(roots)];
    }

    scoreImageCandidate(image) {
      const rect = image.getBoundingClientRect();
      let score = rect.width * rect.height - Math.abs(rect.top);

      if (
        image.closest(
          [
            'media-gallery .is-active',
            'media-gallery [aria-current="true"]',
            'media-gallery [aria-hidden="false"]',
            '.product__media-item.is-active',
            '.product-media.is-active',
            '[data-media-id].is-active',
            '.swiper-slide-active'
          ].join(', ')
        )
      ) {
        score += 500000;
      }

      if (this.productContext && this.productContext !== document && this.productContext.contains(image)) {
        score += 250000;
      }

      if (image.closest('quick-add-component, quick-add-modal, .quick-add, .quick-add-modal, .drawer, dialog')) {
        score -= 500000;
      }

      return score;
    }

    updateVariant(variantId) {
      const variant = this.variantById.get(String(variantId));

      if (!variant) {
        return;
      }

      this.currentVariant = variant;
      this.renderVariant();
    }

    upsertVariant(variant) {
      if (!variant?.id) {
        return;
      }

      const normalizedVariant = this.normalizeVariantData(variant);
      const existingVariant = this.variantById.get(String(variant.id)) || {};
      const nextVariant = {
        ...existingVariant,
        ...normalizedVariant
      };

      this.variantById.set(String(variant.id), nextVariant);
    }

    normalizeVariantData(variant) {
      const price = variant.price ?? variant.price_in_cents ?? 0;
      const compareAtPrice = variant.compare_at_price ?? variant.compareAtPrice ?? 0;
      const featuredImage =
        variant.featured_image?.src ||
        variant.featured_image ||
        variant.featured_media?.preview_image?.src ||
        variant.featured_media?.src ||
        this.fallbackImageSrc ||
        '';
      const featuredImageAlt =
        variant.featured_image?.alt ||
        variant.featured_media?.alt ||
        this.fallbackImageAlt;

      return {
        id: variant.id,
        available: Boolean(variant.available),
        title: variant.title || '',
        price,
        compare_at_price: compareAtPrice || 0,
        price_formatted: this.formatMoney(price),
        compare_at_price_formatted: this.formatMoney(compareAtPrice || 0),
        featured_image: featuredImage,
        featured_image_alt: featuredImageAlt
      };
    }

    formatMoney(cents) {
      const amount = Number(cents || 0);

      if (window.Shopify?.formatMoney) {
        return window.Shopify.formatMoney(amount, this.root.dataset.moneyFormat);
      }

      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: window.Shopify?.currency?.active || 'USD'
      }).format(amount / 100);
    }

    renderVariant() {
      if (!this.currentVariant) {
        return;
      }

      if (this.variantTitle) {
        const isDefaultVariant = !this.currentVariant.title || this.currentVariant.title === 'Default Title';
        this.variantTitle.textContent = isDefaultVariant ? '' : this.currentVariant.title;
        this.variantTitle.classList.toggle('is-hidden', isDefaultVariant);
      }

      if (this.price) {
        const currentPrice = this.price.querySelector('.SNH-StickyAtc__price-current');

        if (currentPrice) {
          currentPrice.textContent = this.currentVariant.price_formatted;
        }
      }

      if (this.comparePrice) {
        const hasComparePrice =
          Number(this.currentVariant.compare_at_price) > 0 &&
          Number(this.currentVariant.compare_at_price) > Number(this.currentVariant.price);

        this.comparePrice.textContent = hasComparePrice ? this.currentVariant.compare_at_price_formatted : '';
        this.comparePrice.classList.toggle('is-hidden', !hasComparePrice);
      }

      if (this.image) {
        this.image.src = this.currentVariant.featured_image || this.fallbackImageSrc;
        this.image.alt = this.currentVariant.featured_image_alt || this.fallbackImageAlt;
      }

      this.button.disabled = !this.currentVariant.available;
      this.button.textContent = this.currentVariant.available ? this.defaultLabel : this.soldOutLabel;
    }

    updateVisibility() {
      if (!this.triggerElement) {
        return;
      }

      const rect = this.triggerElement.getBoundingClientRect();
      this.toggleBar(this.isTriggerScrolledPast(rect) && !this.isHiddenByFooter && this.hasReachedStickyThreshold());
    }

    toggleBar(shouldShow) {
      this.bar.classList.toggle('is-active', shouldShow);
      this.bar.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    }

    hasReachedStickyThreshold() {
      return window.scrollY > this.minimumScrollToShow;
    }

    isTriggerScrolledPast(rect) {
      if (!rect || rect.height <= 0) {
        return false;
      }

      return rect.bottom < 0 || rect.top < 0;
    }

    async handleAddToCart() {
      if (!this.currentVariant || !this.currentVariant.available) {
        this.setStatus(this.errorLabel);
        return;
      }

      let usedNativeSubmit = false;
      this.button.disabled = true;
      this.button.textContent = this.addingLabel;
      this.button.classList.add('is-loading');
      this.setStatus('');

      try {
        const nativeSubmitHandled = this.submitMainForm();

        if (nativeSubmitHandled) {
          usedNativeSubmit = true;
          this.handleAddSuccess();
          return;
        }

        const body = this.buildRequestBody();
        const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => ({}));
          throw new Error(errorPayload.description || errorPayload.message || this.errorLabel);
        }

        const payload = await response.json();
        const cartState = await this.fetchCartState();
        await this.syncCartUi(payload);
        this.dispatchCartEvents(payload, cartState, Number(body.get('quantity')) || 1);
        this.handleAddSuccess();
      } catch (error) {
        this.setStatus(error.message || this.errorLabel);
      } finally {
        if (usedNativeSubmit) {
          return;
        }

        if (this.button.textContent !== this.addedButtonLabel) {
          this.button.classList.remove('is-loading');
          this.button.disabled = !this.currentVariant.available;
          this.button.textContent = this.currentVariant.available ? this.defaultLabel : this.soldOutLabel;
        }
      }
    }

    submitMainForm() {
      if (!this.mainForm) {
        return false;
      }

      if (this.postAddBehavior === 'stay_on_page') {
        return false;
      }

      if (this.variantIdInput && this.currentVariant?.id) {
        this.variantIdInput.value = this.currentVariant.id;
        this.variantIdInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      const nativeButton =
        this.mainForm.querySelector('[ref="addToCartButton"]') ||
        this.mainForm.querySelector('button[name="add"], [type="submit"][name="add"], [type="submit"]');

      if (nativeButton instanceof HTMLButtonElement && !nativeButton.disabled) {
        nativeButton.click();
        return true;
      }

      if (typeof this.mainForm.requestSubmit === 'function') {
        this.mainForm.requestSubmit();
        return true;
      }

      return false;
    }

    buildRequestBody() {
      const body = this.mainForm ? new FormData(this.mainForm) : new FormData();
      const cartUi = this.getCartUiTarget();

      body.set('id', this.currentVariant.id);

      if (!body.get('quantity')) {
        body.set('quantity', '1');
      }

      if (cartUi?.getSectionsToRender) {
        const sections = cartUi.getSectionsToRender().map((section) => section.id || section.section).filter(Boolean);

        if (sections.length) {
          body.set('sections', sections.join(','));
          body.set('sections_url', window.location.pathname);
        }
      }

      return body;
    }

    async fetchCartState() {
      try {
        const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`, {
          headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (!response.ok) {
          return null;
        }

        return response.json();
      } catch (error) {
        return null;
      }
    }

    getCartUiTarget() {
      return (
        document.querySelector('cart-notification') ||
        document.querySelector('cart-drawer') ||
        document.querySelector('cart-drawer-component')
      );
    }

    async syncCartUi(payload) {
      const cartUi = this.getCartUiTarget();

      if (cartUi?.renderContents && payload?.sections) {
        if (typeof cartUi.setActiveElement === 'function') {
          cartUi.setActiveElement(this.button);
        }

        cartUi.renderContents(payload);
        return;
      }

      if (cartUi?.classList?.contains('is-empty')) {
        cartUi.classList.remove('is-empty');
      }
    }

    dispatchCartEvents(payload, cartState, quantity) {
      const sourceId = this.mainFormComponent?.id || this.mainForm?.id || this.root.dataset.sectionId || 'snh-sticky-atc';
      const source = this.mainFormComponent ? 'product-form-component' : 'product-form';
      const eventDetail = {
        resource: cartState || payload || {},
        sourceId,
        data: {
          source,
          productId: this.productId,
          itemCount: quantity,
          variantId: String(this.currentVariant?.id || ''),
          sections: payload?.sections || {}
        }
      };

      document.dispatchEvent(new CustomEvent('snh:sticky-atc:added', { detail: payload }));
      document.dispatchEvent(new CustomEvent('cart:refresh'));
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: payload }));
      document.dispatchEvent(new CustomEvent('cart:update', { bubbles: true, detail: eventDetail }));
    }

    handleAddSuccess() {
      this.setStatus('');
      this.button.classList.remove('is-loading');
      this.button.textContent = this.addedButtonLabel;
      this.button.disabled = true;

      window.setTimeout(() => {
        this.button.disabled = !this.currentVariant?.available;
        this.button.textContent = this.currentVariant?.available ? this.defaultLabel : this.soldOutLabel;
      }, 1200);
    }

    setStatus(message) {
      if (!this.status) {
        return;
      }

      this.status.textContent = message;
    }
  }

  const init = () => {
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (root.dataset.snhInitialized === 'true') {
        return;
      }

      root.dataset.snhInitialized = 'true';
      new SnhStickyAddToCart(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
