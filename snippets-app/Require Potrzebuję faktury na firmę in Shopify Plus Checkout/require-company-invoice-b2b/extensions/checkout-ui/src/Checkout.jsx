import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useEffect, useState} from 'preact/hooks';

const NAMESPACE = 'custom';
const COMPANY_NAME_KEY = 'invoice_company_name';
const TAX_ID_KEY = 'invoice_tax_id';
const DEBOUNCE_MS = 400;

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  // `purchasingCompany` is Shopify's native B2B signal: present only when
  // the buyer is checking out as a company contact (Companies feature).
  // Retail buyers never see this field. Confirm the exact signal shape
  // against `shopify.d.ts` / `shopify app dev` for this API version before
  // shipping - this mirrors the same field the validation function reads
  // directly off `cart.buyerIdentity.purchasingCompany` in schema.graphql.
  const purchasingCompanySignal = shopify.buyerIdentity?.purchasingCompany;
  const [isB2BBuyer, setIsB2BBuyer] = useState(
    Boolean(purchasingCompanySignal?.value),
  );

  useEffect(() => {
    if (!purchasingCompanySignal) return;
    const handleChange = (value) => setIsB2BBuyer(Boolean(value));
    handleChange(purchasingCompanySignal.value);
    return purchasingCompanySignal.subscribe(handleChange);
  }, [purchasingCompanySignal]);

  if (!isB2BBuyer) {
    return null;
  }

  if (!shopify.instructions.value.metafields.canSetCartMetafields) {
    return null;
  }

  return <InvoiceFields />;
}

function InvoiceFields() {
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      syncInvoiceMetafields(companyName, taxId);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [companyName, taxId]);

  return (
    <s-block-stack spacing="base">
      <s-banner status="info">
        {shopify.i18n.translate('banner')}
      </s-banner>
      <s-text-field
        label={shopify.i18n.translate('companyNameLabel')}
        value={companyName}
        required
        onInput={(event) => setCompanyName(event.currentTarget.value)}
      />
      <s-text-field
        label={shopify.i18n.translate('taxIdLabel')}
        value={taxId}
        required
        onInput={(event) => setTaxId(event.currentTarget.value)}
      />
    </s-block-stack>
  );
}

async function syncInvoiceMetafields(companyName, taxId) {
  await shopify.applyMetafieldChange({
    type: 'updateCartMetafield',
    metafield: {
      namespace: NAMESPACE,
      key: COMPANY_NAME_KEY,
      value: companyName,
      type: 'single_line_text_field',
    },
  });

  await shopify.applyMetafieldChange({
    type: 'updateCartMetafield',
    metafield: {
      namespace: NAMESPACE,
      key: TAX_ID_KEY,
      value: taxId,
      type: 'single_line_text_field',
    },
  });
}
