/**
 * 🧩 Web Pixel — Checkout Events Tracker
 * Requires: Shopify Plus + Web Pixels API
 * Developed by SurgeryCode | https://SurgeryCode.com
 *
 * Tracks: checkout_started, checkout_completed, payment_info_submitted
 * Configure in Partner Dashboard → App → Web pixels
 */

// Subscribe to checkout start
analytics.subscribe('checkout_started', (event) => {
  const checkout = event.data.checkout;
  const lineItems = checkout.lineItems.map((item) => ({
    id:       item.variant?.id,
    name:     item.title,
    price:    item.variant?.price?.amount,
    quantity: item.quantity,
    sku:      item.variant?.sku,
  }));

  // Example: send to GA4 / custom endpoint
  console.log('[SurgeryCode Pixel] checkout_started', {
    order_id:    checkout.token,
    currency:    checkout.currencyCode,
    value:       checkout.totalPrice?.amount,
    items:       lineItems,
    customer_id: checkout.buyerIdentity?.customer?.id,
  });
});

// Subscribe to purchase complete
analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;

  console.log('[SurgeryCode Pixel] checkout_completed', {
    order_id:       checkout.order?.id,
    transaction_id: checkout.token,
    currency:       checkout.currencyCode,
    value:          checkout.totalPrice?.amount,
    tax:            checkout.totalTax?.amount,
    shipping:       checkout.shippingLine?.price?.amount,
  });
});

// Subscribe to payment info entered
analytics.subscribe('payment_info_submitted', (event) => {
  console.log('[SurgeryCode Pixel] payment_info_submitted', {
    checkout_token: event.data.checkout.token,
  });
});
