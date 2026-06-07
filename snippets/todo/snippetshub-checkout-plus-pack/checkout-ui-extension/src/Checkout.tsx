/**
 * 🧩 Checkout UI Extension — Trust Badge Banner
 * Requires: Shopify Plus + Checkout Extensibility
 * Developed by SurgeryCode | https://SurgeryCode.com
 *
 * Renders a trust badge strip above the payment section.
 * Install point: purchase.checkout.payment-method-list.render-before
 */

import {
  reactExtension,
  Banner,
  BlockStack,
  InlineStack,
  Icon,
  Text,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.payment-method-list.render-before',
  () => <TrustBadgeBanner />,
);

interface Settings {
  message?: string;
  show_secure_badge?: boolean;
  show_returns_badge?: boolean;
  show_shipping_badge?: boolean;
}

function TrustBadgeBanner() {
  const {
    message = 'Safe & secure checkout',
    show_secure_badge = true,
    show_returns_badge = true,
    show_shipping_badge = true,
  } = useSettings<Settings>();

  const badges = [
    show_secure_badge   && { icon: 'lock',    label: 'Secure payment' },
    show_returns_badge  && { icon: 'return',  label: 'Easy returns' },
    show_shipping_badge && { icon: 'truck',   label: 'Fast shipping' },
  ].filter(Boolean) as { icon: string; label: string }[];

  if (!badges.length && !message) return null;

  return (
    <Banner status="info">
      <BlockStack spacing="tight">
        {message ? <Text>{message}</Text> : null}
        <InlineStack spacing="base">
          {badges.map(({ icon, label }) => (
            <InlineStack key={label} spacing="extraTight" blockAlignment="center">
              <Icon source={icon as any} size="small" />
              <Text size="small">{label}</Text>
            </InlineStack>
          ))}
        </InlineStack>
      </BlockStack>
    </Banner>
  );
}
