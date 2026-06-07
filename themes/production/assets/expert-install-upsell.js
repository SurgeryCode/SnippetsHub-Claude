window.ExpertInstallUpsell = (function() {
  const DEFAULT_HANDLES = ['shopify-developer-nbsp-by-the-hour', 'developer-hour', 'expert-installation', 'expert-install', 'shopify-developer-hour'];
  const candidateHandles = Array.isArray(window.SnippetsHubExpertInstallHandles) && window.SnippetsHubExpertInstallHandles.length
    ? window.SnippetsHubExpertInstallHandles
    : DEFAULT_HANDLES;
  let expertProductPromise = null;

  function parseVariantId(value) {
    if (value === null || value === undefined) return null;
    const normalized = String(value).trim();
    return /^[0-9]+$/.test(normalized) ? normalized : null;
  }

  function setExpertGlobals(product) {
    if (!product) return;
    if (product.variantId) window.SnippetsHubExpertInstallVariantId = String(product.variantId);
    if (product.handle) window.SnippetsHubExpertInstallHandle = product.handle;
    if (typeof product.price === 'number') window.ExpertInstallBasePrice = product.price;
    if (product.currency) window.ExpertCurrency = product.currency;
  }

  async function fetchProductByHandle(handle) {
    const response = await fetch(`/products/${encodeURIComponent(handle)}.js`, { credentials: 'same-origin' });
    if (!response.ok) return null;
    const product = await response.json();
    if (!product || !Array.isArray(product.variants) || !product.variants.length) return null;

    const available = product.variants.find((variant) => variant.available) || product.variants[0];
    const variantId = parseVariantId(available && available.id);
    if (!variantId) return null;

    return {
      variantId,
      handle: product.handle || handle,
      price: typeof available.price === 'number' ? available.price : null,
      currency: window.Shopify?.currency?.active || null
    };
  }

  async function resolveExpertInstallProduct() {
    if (expertProductPromise) return expertProductPromise;

    expertProductPromise = (async () => {
      const directVariant = parseVariantId(window.SnippetsHubExpertInstallVariantId);
      if (directVariant) {
        const product = {
          variantId: directVariant,
          handle: window.SnippetsHubExpertInstallHandle || null,
          price: typeof window.ExpertInstallBasePrice === 'number' ? window.ExpertInstallBasePrice : null,
          currency: window.Shopify?.currency?.active || null
        };
        setExpertGlobals(product);
        return product;
      }

      for (const handle of candidateHandles) {
        try {
          const product = await fetchProductByHandle(handle);
          if (product) {
            setExpertGlobals(product);
            return product;
          }
        } catch (error) {
          // try next handle
        }
      }

      return null;
    })();

    return expertProductPromise;
  }

  /**
   * Adds products to the cart using Shopify AJAX API
   */
  async function addToCart(items, options = {}) {
    if (window.SnippetsHubCart && typeof window.SnippetsHubCart.addItems === 'function') {
      try {
        const cartData = await window.SnippetsHubCart.addItems(items, options);
        return {
          ok: true,
          status: 200,
          cartData,
          json: async () => cartData
        };
      } catch (error) {
        return {
          ok: false,
          status: error.status || 0,
          cartData: error.data || null,
          json: async () => error.data || { message: error.message }
        };
      }
    }

    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
  }

  /**
   * Main logic for multi-product addition
   */
  async function handleAddition({
    mainVariantId,
    mainQty = 1,
    isExpertInstallChecked,
    expertQty = 1,
    properties = {},
    expertProperties = {}
  }) {
    const expertProduct = await resolveExpertInstallProduct();
    const expertVariantId = expertProduct && expertProduct.variantId ? String(expertProduct.variantId) : null;
    const items = [];
    const isMainInstallation = expertVariantId && mainVariantId.toString() === expertVariantId;

    if (isMainInstallation) {
      items.push({
        id: mainVariantId,
        quantity: isExpertInstallChecked ? Math.max(mainQty, expertQty) : mainQty,
        properties: properties
      });
    } else {
      items.push({
        id: mainVariantId,
        quantity: mainQty,
        properties: properties
      });

      if (isExpertInstallChecked && expertVariantId) {
        items.push({
          id: expertVariantId,
          quantity: expertQty,
          properties: expertProperties
        });
      }
    }

    return addToCart(items);
  }

  // Auto-init for forms tagged with [data-expert-install-form]
  document.addEventListener('submit', async (e) => {
    const form = e.target;
    if (!form.hasAttribute('data-expert-install-form')) return;

    // Find checkbox that belongs to this form (priority: inside form)
    let checkbox = form.querySelector('[data-expert-install-checkbox]');
    let quantityInput = form.querySelector('[data-expert-install-quantity]');
    
    // Fallback: search in closest card/container
    if (!checkbox || !quantityInput) {
        const card = form.closest('.product-card, .snippet-card, .upsell-box, article, .glass-card, .product-info-sticky, .shopify-sticky-cta');
        if (card) {
            if (!checkbox) checkbox = card.querySelector('[data-expert-install-checkbox]');
            if (!quantityInput) quantityInput = card.querySelector('[data-expert-install-quantity]');
        }
    }
    
    // Fallback: manual ID-based lookup if form attribute is used
    if (!checkbox && form.id) {
       checkbox = document.querySelector(`[data-expert-install-checkbox][form="${form.id}"]`);
    }
    if (!quantityInput && form.id) {
       quantityInput = document.querySelector(`[data-expert-install-quantity][form="${form.id}"]`);
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    const submitBtn = form.querySelector('[type="submit"]');
    const submitSpinner = submitBtn ? submitBtn.querySelector('.loading__spinner') : null;
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-disabled', 'true');
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.classList.add('loading');
        if (submitSpinner) submitSpinner.classList.remove('hidden');
    }

    const formData = new FormData(form);
    const mainVariantId = formData.get('id');
    const mainQty = Math.max(parseInt(formData.get('quantity'), 10) || 1, 1);
    const expertQty = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;
    const isExpertChecked = checkbox && checkbox.checked;
    const expertProduct = isExpertChecked ? await resolveExpertInstallProduct() : null;
    const expertVariantId = expertProduct && expertProduct.variantId ? String(expertProduct.variantId) : null;

    // Capture product title for Expert Install reference
    let productTitle = '';
    const card = form.closest('.product-card, .snippet-card, .upsell-box, article, .glass-card, .product-info-sticky, .shopify-sticky-cta');
    if (card) {
        const titleElement = card.querySelector('.p-title, .product-title, h3, h2, h1');
        if (titleElement) {
            productTitle = titleElement.textContent.trim();
        }
    }
    // Fallback: try to get from form data or page title
    if (!productTitle && form.dataset.productTitle) {
        productTitle = form.dataset.productTitle;
    }

    // Filter properties to remove system/internal fields
    const internalKeys = ['id', 'quantity', 'sections', 'sections_url', 'expert-install-checkbox'];
    const properties = {};
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('properties[')) {
          const match = key.match(/properties\[(.*?)\]/);
          if (match) {
            const propName = match[1];
            if (!internalKeys.includes(propName)) properties[propName] = value;
          }
      }
    }

    try {
      const itemsToAdd = [];
      const isMainInstallation = expertVariantId && mainVariantId.toString() === expertVariantId;

      if (isMainInstallation) {
        // Special case: The product itself is the installation service
        // We only add one entry with the requested main quantity / expert quantity.
        itemsToAdd.push({
          id: mainVariantId,
          quantity: isExpertChecked ? Math.max(mainQty, expertQty) : mainQty,
          properties: properties
        });
      } else {
        // Normal case: Snippet + optional Expert Install
        itemsToAdd.push({
          id: mainVariantId,
          quantity: mainQty,
          properties: properties
        });

        if (isExpertChecked && expertVariantId) {
          itemsToAdd.push({
            id: expertVariantId,
            quantity: expertQty,
            properties: {
              "_min_qty": quantityInput ? (quantityInput.getAttribute('min') || 1) : 1,
              "_for_product": productTitle || 'Unknown Product'
            }
          });
        } else if (isExpertChecked && !expertVariantId) {
          // Keep checkout flow working even if service product is not configured in this store.
          itemsToAdd[0].properties = {
            ...(itemsToAdd[0].properties || {}),
            "_Expert Install Requested": "Yes (service product not linked)"
          };
        }
      }

      if (itemsToAdd.length > 0) {
        const response = await addToCart(itemsToAdd, {
          sourceElement: submitBtn,
          source: 'expert-install-upsell'
        });
        if (response.ok) {
          if (!window.SnippetsHubCart?.addItems) {
            if (window.theme && typeof window.theme.cartDrawer?.open === 'function') {
                window.theme.cartDrawer.open();
            } else {
                window.location.href = '/cart';
            }
          }
        } else {
          const err = await response.json();
          console.warn('AJAX addition failed:', err);
          if (response.status === 422) {
            console.warn('422 /cart/add.js usually means invalid/unavailable variant id. Check expert install product mapping.');
          }
          form.submit();
        }
      } else {
        // Nothing to add (snippet already in cart and expert not checked)
        // Just open the cart to show existing items
        if (window.SnippetsHubCart && typeof window.SnippetsHubCart.openCart === 'function') {
            window.SnippetsHubCart.openCart(submitBtn);
        } else if (window.theme && typeof window.theme.cartDrawer?.open === 'function') {
            window.theme.cartDrawer.open();
        } else {
            window.location.href = '/cart';
        }
      }
    } catch (err) {
      console.error('Expert Install Upsell Error:', err);
      form.submit();
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-disabled');
            submitBtn.removeAttribute('aria-busy');
            submitBtn.classList.remove('loading');
            if (submitSpinner) submitSpinner.classList.add('hidden');
        }
    }
  }, true);

  // Layout improvement: Toggle quantity visibility
  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-expert-install-checkbox]')) {
        const card = e.target.closest('.product-card, .snippet-card, .upsell-box, article, .upsell-highlight-pdp, .upsell-highlight, .shopify-sticky-cta');
        if (card) {
            const qtyWrapper = card.querySelector('.upsell-qty-wrapper');
            if (qtyWrapper) {
                qtyWrapper.style.display = e.target.checked ? 'flex' : 'none';
            }
        }
    }
  });

  /**
   * Updates the disabled state of the minus button
   */
  function updateButtonStates(input) {
    if (!input) return;
    const qtyWrapper = input.closest('.upsell-qty-wrapper, .cart__recommendations, .quantity');
    if (!qtyWrapper) return;
    
    const minusBtn = qtyWrapper.querySelector('.qty-minus');
    if (minusBtn) {
        const min = parseInt(input.getAttribute('min'), 10) || 1;
        const val = parseInt(input.value, 10) || 1;
        minusBtn.classList.toggle('disabled', val <= min);
    }
  }

  // Quantity Buttons Logic (+/-)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;

    const input = btn.parentElement ? btn.parentElement.querySelector('input[type="number"]') : null;
    // Prevent collisions with other qty controls (e.g. snippet card quantity).
    if (!input || !input.matches('[data-expert-install-quantity]')) return;

    e.preventDefault();
    let val = parseInt(input.value, 10) || 1;
    const card = btn.closest('.product-card, .snippet-card, .upsell-box, article, .upsell-highlight-pdp, .upsell-highlight, .product-info, .shopify-sticky-cta');
    
    if (btn.classList.contains('qty-plus')) {
        val++;
        
        // Auto-check Expert Install when "+" is clicked
        if (card) {
            const checkbox = card.querySelector('[data-expert-install-checkbox]');
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                // Manually trigger change to show qty-wrapper
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    } else if (btn.classList.contains('qty-minus')) {
        const min = parseInt(input.getAttribute('min'), 10) || 1;
        val = Math.max(min, val - 1);
    }
    input.value = val;
    updateButtonStates(input);

    // Update display price
    const pricePlaceholder = card ? card.querySelector('[data-expert-price-placeholder]') : null;
    if (pricePlaceholder && typeof window.updateExpertDisplayPrice === 'function') {
        window.updateExpertDisplayPrice(pricePlaceholder, val);
    }
  });

  // Listen for manual quantity input changes
  document.addEventListener('input', (e) => {
    if (e.target.matches('[data-expert-install-quantity]')) {
        const input = e.target;
        const min = parseInt(input.getAttribute('min'), 10) || 1;
        let val = parseInt(input.value, 10);
        
        if (isNaN(val) || val < min) {
          val = min;
          input.value = val;
        }

        updateButtonStates(input);

        const card = input.closest('.product-card, .snippet-card, .upsell-box, article, .upsell-highlight-pdp, .upsell-highlight, .product-info, .shopify-sticky-cta');
        const pricePlaceholder = card ? card.querySelector('[data-expert-price-placeholder]') : null;
        
        if (pricePlaceholder && typeof window.updateExpertDisplayPrice === 'function') {
            window.updateExpertDisplayPrice(pricePlaceholder, val);
        }
    }
  });

  // Initialize states for all expert install inputs
  function initStates() {
    document.querySelectorAll('[data-expert-install-quantity]').forEach(input => {
        updateButtonStates(input);
    });
  }

  // Card quantity controls (product cards, recommendations, collections, homepage)
  function normalizeCardQty(input) {
    if (!input) return;
    const min = parseInt(input.getAttribute('min') || '1', 10);
    const value = parseInt(input.value, 10);
    const safeValue = Number.isNaN(value) || value < min ? min : value;
    input.value = safeValue;

    const wrapper = input.closest('[data-card-qty-control]');
    const minus = wrapper ? wrapper.querySelector('[data-card-qty-minus]') : null;
    if (minus) minus.disabled = safeValue <= min;
  }

  function initCardQtyControls() {
    document.querySelectorAll('[data-card-qty-input]').forEach(normalizeCardQty);
  }

  if (!window.SnippetsHubCardQtyDelegationReady && !window.SnippetsHubCardQtyCounterInitialized) {
    window.SnippetsHubCardQtyDelegationReady = true;
    window.SnippetsHubCardQtyCounterInitialized = true;

    document.addEventListener('click', (event) => {
      const minusBtn = event.target.closest('[data-card-qty-minus]');
      const plusBtn = event.target.closest('[data-card-qty-plus]');
      const btn = minusBtn || plusBtn;
      if (!btn) return;

      event.preventDefault();
      const wrapper = btn.closest('[data-card-qty-control]');
      const input = wrapper ? wrapper.querySelector('[data-card-qty-input]') : null;
      if (!input) return;

      normalizeCardQty(input);
      const current = parseInt(input.value, 10) || 1;
      const min = parseInt(input.getAttribute('min') || '1', 10);

      if (btn.hasAttribute('data-card-qty-plus')) {
        input.value = current + 1;
      } else {
        input.value = Math.max(min, current - 1);
      }
      normalizeCardQty(input);
    });

    document.addEventListener('input', (event) => {
      const input = event.target.closest('[data-card-qty-input]');
      if (!input) return;
      normalizeCardQty(input);
    });
  }

  // Run on load and after potential AJAX (e.g. cart updates)
  document.addEventListener('DOMContentLoaded', () => {
    initStates();
    initCardQtyControls();
  });
  // Optional: hook into theme events if available
  document.addEventListener('shopify:section:load', () => {
    initStates();
    initCardQtyControls();
  });
  
  // Expose initStates for external calls (like after cart drawer refreshes)
  window.initExpertQtyStates = initStates;

  return {
    VARIANT_ID: () => window.SnippetsHubExpertInstallVariantId || null,
    resolveExpertInstallProduct,
    handleAddition,
    initStates: initStates
  };
})();
