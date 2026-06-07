# Back in Stock for Shopify

**Version:** 1.1.0 | **Category:** Popups & Bars | **Support:** support@snippetshub.com

Email capture form that automatically appears on product pages when a variant is out of stock, then hides when the variant becomes available. Connects to any HTTP endpoint for notification delivery.

---

## Files to upload

| File | Shopify destination |
|------|---------------------|
| `sections/snh-back-in-stock.liquid` | `sections/` |
| `assets/snh-back-in-stock.css` | `assets/` |
| `assets/snh-back-in-stock.js` | `assets/` |

---

## Installation — 3 steps

### Step 1 — Upload files
In Shopify Admin → Online Store → Themes → Edit code, upload all three files.

### Step 2 — Add to product template
In the Theme Editor, open the Product template and click "Add section" → select "SNH Back in Stock". Place it below the Add to Cart button or wherever out-of-stock messaging belongs.

### Step 3 — Configure endpoint
In the section settings, enter your notification endpoint URL. Options:

- **Klaviyo**: Use Klaviyo's Back in Stock API endpoint
- **Zapier/Make**: Create a webhook trigger, paste the URL
- **Custom App Proxy**: Build a simple Shopify App Proxy that logs emails to a sheet or sends notifications
- **Mailchimp**: Use Mailchimp's subscribe API endpoint

---

## How it works

- Section automatically hides when the current variant is **in stock**
- Section shows when the current variant is **out of stock**
- Responds to Shopify variant change events — updates visibility live when customer switches variants
- On submit: POSTs `{ email, product_id, variant_id }` as JSON to the configured endpoint
- Shows success state after successful submission

---

## FAQ

**Does it require Shopify Plus?**
No. Works on all Shopify plans.

**What backend do I need?**
Any HTTP endpoint that accepts a POST request with JSON body. See the endpoint configuration options in the README above.

**Will it automatically show/hide when a customer changes variant?**
Yes. The JS listens to `variant:change` events and updates visibility accordingly.
