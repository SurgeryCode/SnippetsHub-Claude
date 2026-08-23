# Require Company Invoice Data (B2B) — Shopify Plus Checkout

Extension-only Shopify app implementing **Option A** from
[`../PRD-Company-Invoice-Field-Shopify-Plus-Checkout.md`](../PRD-Company-Invoice-Field-Shopify-Plus-Checkout.md):
a company invoice field (company name + Tax ID / NIP) that is shown
prominently and required **only when the buyer is checking out as a B2B
company account** (Shopify Plus native "Companies" feature). Retail buyers
never see this field and are never blocked by it.

## How it works

- `extensions/checkout-ui` — Checkout UI Extension. Detects whether the
  current buyer is a B2B purchasing company via `shopify.buyerIdentity.purchasingCompany`.
  If so, renders two required fields (company name, Tax ID / NIP) and syncs
  their values to cart metafields as the buyer types.
- `extensions/validation-function` — Checkout Validation Function. Reads
  `cart.buyerIdentity.purchasingCompany` directly (no metafield needed for
  detection — it's a native cart field) plus the two invoice metafields.
  Blocks checkout with an error if the buyer is a B2B company and either
  field is empty.

```text
Checkout UI Extension                         Validation Function
        ↓                                              ↓
Detect purchasingCompany (native)      Read purchasingCompany (native, direct query)
        ↓                                              ↓
Render invoice fields (if B2B)         Read invoice_company_name / invoice_tax_id metafields
        ↓                                              ↓
Persist to cart metafields  ─────────▶ If B2B and either field empty → validationAdd error
                                                        ↓
                                                Block checkout
```

## Data

- Namespace: `custom`
- Keys: `invoice_company_name`, `invoice_tax_id`
- Type: `single_line_text_field`

## Requirements

- Shopify Plus store with the native **B2B (Companies)** feature enabled —
  this project assumes B2B buyers are native company contacts (confirmed
  with the client; see PRD Open Question 1). If the store instead uses a
  third-party wholesale app or customer tags for B2B, `purchasingCompany`
  will be empty and this logic needs to be adapted to that signal instead.

## Getting started

1. `npm install`
2. Link this project to a real app in your Partners / Dev Dashboard:
   `shopify app config link` (or run `npm run dev` and follow the prompt —
   this is not yet linked, see `shopify.app.toml`).
3. `npm run dev` to preview in a development/Plus sandbox store with B2B
   enabled.
4. `npm run deploy` when ready to release.

## Testing

```shell
cd extensions/validation-function
npm test
```

Fixtures in `extensions/validation-function/tests/fixtures/` cover: retail
buyer (no purchasing company), B2B buyer with both fields filled, B2B buyer
with one/both fields empty, and B2B buyer before metafields exist yet.

## Definition of Done

- Checkout does not let a B2B (purchasing company) buyer complete an order
  without company name and Tax ID / NIP.
- Retail buyers are never shown the field as required and are never blocked.
- Error message is shown to the buyer.
- Solution uses Checkout Extensibility only — no checkout.liquid, no DOM
  manipulation, no ScriptTags, no Theme App Extensions.
- Ready for deployment via Shopify CLI.
