# Upsell & Cross-sell Section for Shopify

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A "You might also like" product grid for Shopify product pages. Hand-pick up to 6 products to recommend, add optional badges and custom descriptions, and let customers add any of them to the cart in one click — without leaving the page. Fully configured from the Theme Editor.

---

## What's included

```
snippetshub-upsell-cross-sell/
├── sections/
│   └── snh-upsell-cross-sell.liquid   ← Shopify OS 2.0 section with blocks
├── assets/
│   ├── snh-upsell-cross-sell.css
│   └── snh-upsell-cross-sell.js
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

In **Shopify Admin → Online Store → Themes → Edit code**, upload:
- `sections/snh-upsell-cross-sell.liquid` → `sections/`
- `assets/snh-upsell-cross-sell.css` → `assets/`
- `assets/snh-upsell-cross-sell.js` → `assets/`

### Step 2 — Add to product template

In **Theme Editor → Product template**, click **Add section** → select **SNH Upsell / Cross-sell**. Place it below the main product form — common positions are just below the ATC button or at the bottom of the page.

### Step 3 — Add products

1. Click **SNH Upsell / Cross-sell** in the Theme Editor sidebar
2. Click **"Add product"** (up to 6)
3. For each: pick a product, optionally add a badge (e.g. "Best seller") and a short custom description
4. Set column count, colors, and labels
5. Save

---

## Settings

### Section settings

| Setting | Default | Description |
|---------|---------|-------------|
| Section title | "You might also like" | Heading above the grid |
| Columns (desktop) | 3 | 2, 3, or 4 columns |
| Add to cart label | "Add to cart" | Button text |
| Adding… | "Adding…" | Button text while adding |
| Added! | "Added!" | Button text after successful add |

### Block settings (per product)

| Setting | Description |
|---------|-------------|
| Product | Pick any product from your catalog |
| Badge | Short label shown on the product image (e.g. "Best seller", "New") |
| Custom description | Short selling point below the product name (optional) |

### Color settings

Section background, card background, card border, text, subtext, badge background, badge text, add-to-cart button — all configurable via color pickers.

---

## How it works

- Products are displayed in a **responsive grid** (2–4 columns desktop, 2 columns tablet, 1–2 mobile)
- Each card shows: product image, name, optional custom description, price, compare-at price with savings % badge
- **Add to cart** button adds the first available variant via AJAX — no page reload
- Button shows "Adding…" then "Added!" with a brief delay before resetting
- **Sold-out products** show a disabled "Sold out" button automatically
- Savings percentage is calculated automatically from compare-at price

---

## Requirements

- Shopify Online Store 2.0 theme
- The section is enabled on `product` templates only
- No apps required
- No dependencies

---

## Notes

- Up to 6 products per section (Shopify section block limit)
- For automatic recommendations (based on Shopify's algorithm), consider pairing with the **SNH Cart Drawer Recommendations** snippet
- Highly customized themes may need minor card spacing or button style adjustments
