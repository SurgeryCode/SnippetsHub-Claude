/**
 * SnippetsHub
 * Snippet: Sticky Add To Cart
 * Version: 1.0.1
 * License: Single Store License
 * Support: support@snippetshub.com
 */

(() => {
  const roots = document.querySelectorAll(
    '.SnippetsHub.SNH-sticky-add-to-cart.snh-sticky-add-to-cart[id^="snh-sticky-add-to-cart-"]'
  );
  if (!roots.length) return;

  const resolveProductForm = (root) => {
    const sectionScope = root.closest('.shopify-section');
    if (sectionScope) {
      const scopedForm = sectionScope.querySelector('form[action*="/cart/add"]');
      if (scopedForm) return scopedForm;
    }
    return document.querySelector('form[action*="/cart/add"]');
  };

  roots.forEach((root) => {
    if (root.dataset.snhMounted === 'true') return;
    root.dataset.snhMounted = 'true';

    const button = root.querySelector('[data-snh-sticky-add-button]');
    const productForm = resolveProductForm(root);
    if (!button || !productForm) return;

    const mainAddButton = productForm.querySelector('[type="submit"]');

    const syncButtonState = () => {
      const isDisabled = Boolean(mainAddButton && mainAddButton.disabled);
      button.disabled = isDisabled;
      if (isDisabled) {
        root.classList.add('is-disabled');
      } else {
        root.classList.remove('is-disabled');
      }
    };

    syncButtonState();

    if (mainAddButton && typeof MutationObserver !== 'undefined') {
      const stateObserver = new MutationObserver(syncButtonState);
      stateObserver.observe(mainAddButton, {
        attributes: true,
        attributeFilter: ['disabled', 'class', 'aria-disabled'],
      });
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const viewportObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            root.classList.remove('is-visible');
          } else {
            root.classList.add('is-visible');
          }
        },
        { rootMargin: '0px 0px -20% 0px', threshold: 0 }
      );

      viewportObserver.observe(productForm);
    } else {
      root.classList.add('is-visible');
    }

    button.addEventListener('click', () => {
      if (button.disabled) return;
      if (typeof productForm.requestSubmit === 'function') {
        productForm.requestSubmit();
      } else {
        productForm.submit();
      }
    });
  });
})();
