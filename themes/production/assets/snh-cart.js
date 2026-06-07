window.SnippetsHubCart = (() => {
  const getCartComponent = () =>
    document.querySelector('cart-drawer') || document.querySelector('cart-notification');

  const getCartSections = (cart) => {
    if (!cart || typeof cart.getSectionsToRender !== 'function') return [];
 
    return cart
      .getSectionsToRender()
      .map((section) => section.section || section.id)
      .filter(Boolean);
  };

  const buildResponseError = async (response) => {
    let data = null;

    try {
      data = await response.json();
    } catch (error) {
      data = null;
    }

    const message =
      data?.description || data?.message || data?.errors || `Cart request failed with status ${response.status}`;
    const error = new Error(message);

    error.status = response.status;
    error.data = data;

    return error;
  };

  const renderCart = (cart, data, sourceElement) => {
    if (!cart || !data?.sections || typeof cart.renderContents !== 'function') return false;

    if (sourceElement && typeof cart.setActiveElement === 'function') {
      cart.setActiveElement(sourceElement);
    }

    cart.renderContents(data);
    return true;
  };

  const publishCartUpdate = (cartData, source = 'snippetshub-cart') => {
    if (typeof publish !== 'function' || typeof PUB_SUB_EVENTS === 'undefined' || !PUB_SUB_EVENTS.cartUpdate) return;

    publish(PUB_SUB_EVENTS.cartUpdate, {
      source,
      cartData,
    });
  };

  const addItems = async (items, options = {}) => {
    const { sourceElement = document.activeElement, source = 'snippetshub-cart' } = options;
    const cart = getCartComponent();
    const payload = { items };
    const sections = getCartSections(cart);

    if (sections.length) {
      payload.sections = sections;
      payload.sections_url = window.location.pathname;
    }

    const response = await fetch(window.routes?.cart_add_url || '/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw await buildResponseError(response);
    }

    const data = await response.json();
    const rendered = renderCart(cart, data, sourceElement);

    if (!rendered && window.routes?.cart_url) {
      window.location.href = window.routes.cart_url;
      return data;
    }

    publishCartUpdate(data, source);
    return data;
  };

  const openCart = (sourceElement = document.activeElement) => {
    const cart = getCartComponent();
    if (!cart || typeof cart.open !== 'function') {
      if (window.routes?.cart_url) {
        window.location.href = window.routes.cart_url;
      }
      return false;
    }

    if (sourceElement && typeof cart.setActiveElement === 'function') {
      cart.setActiveElement(sourceElement);
    }

    cart.open(sourceElement);
    return true;
  };

  return {
    addItems,
    openCart,
  };
})();
