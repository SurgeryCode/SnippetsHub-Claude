import '@shopify/ui-extensions/preact';
import {render} from 'preact';

const NAMESPACE = 'custom';
const IS_DIFFERENT_KEY = 'billing_is_different';
const PHONE_KEY = 'billing_phone';

export default async () => {
  render(<Extension />, document.body);

  if (!shopify.instructions.value.metafields.canSetCartMetafields) {
    return;
  }

  const billingAddressSignal = shopify.billingAddress;
  if (!billingAddressSignal) {
    // No access to the Addresses API (missing protected customer data
    // access). Nothing to sync.
    return;
  }

  // `billingAddress` is `undefined` while the buyer keeps "Use shipping
  // address as billing address" checked, and becomes a MailingAddress the
  // moment they switch to "Use a different billing address" - even if the
  // form is pre-filled with values identical to the shipping address. That
  // transition is the only reliable signal for "different billing was
  // chosen"; comparing address fields is not (a customer can pick "different"
  // and leave every field matching shipping except phone).
  //
  // `billingAddressSignal` is Shopify's own SubscribableSignalLike, not a
  // real @preact/signals Signal, so it must be watched via its own
  // `.subscribe()` - reading `.value` inside a preact-signals `effect()`
  // only captures the value once and never reacts to later updates.
  let lastSyncedKey;

  const handleChange = (billingAddress) => {
    const isDifferent = Boolean(billingAddress);
    const phone = billingAddress?.phone ?? '';
    const syncKey = `${isDifferent}|${phone}`;

    if (syncKey === lastSyncedKey) return;
    lastSyncedKey = syncKey;

    syncBillingValidationMetafields(isDifferent, phone);
  };

  handleChange(billingAddressSignal.value);
  billingAddressSignal.subscribe(handleChange);
};

async function syncBillingValidationMetafields(isDifferent, phone) {
  await shopify.applyMetafieldChange({
    type: 'updateCartMetafield',
    metafield: {
      namespace: NAMESPACE,
      key: IS_DIFFERENT_KEY,
      value: isDifferent ? 'true' : 'false',
      type: 'boolean',
    },
  });

  await shopify.applyMetafieldChange({
    type: 'updateCartMetafield',
    metafield: {
      namespace: NAMESPACE,
      key: PHONE_KEY,
      value: phone,
      type: 'single_line_text_field',
    },
  });
}

function Extension() {
  // No visible UI - this extension only syncs billing state to cart
  // metafields for the validation function to read.
  return null;
}
