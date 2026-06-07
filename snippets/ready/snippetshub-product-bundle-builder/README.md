# Product Bundle Builder for Shopify

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A "Frequently bought together" bundle section for Shopify product pages. Customers pick which products to include using checkboxes, see a live bundle total with savings, and add everything to the cart in one click. Up to 5 products per bundle. Fully configured from the Theme Editor — no code required.

---

## What's included

```
snippetshub-product-bundle-builder/
├── sections/
│   └── snh-product-bundle-builder.liquid   ← Shopify OS 2.0 section with blocks
├── assets/
│   ├── snh-product-bundle-builder.css
│   └── snh-product-bundle-builder.js
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

In **Shopify Admin → Online Store → Themes → Edit code**, upload:
- `sections/snh-product-bundle-builder.liquid` → `sections/`
- `assets/snh-product-bundle-builder.css` → `assets/`
- `assets/snh-product-bundle-builder.js` → `assets/`

### Step 2 — Add to product template

In **Theme Editor → Product template**, click **Add section** → select **SNH Bundle Builder**. Place it below the main product form or wherever you want the bundle to appear.

### Step 3 — Add bundle products

1. Click **SNH Bundle Builder** in the Theme Editor sidebar
2. Click **"Add bundle product"** (up to 5 products)
3. For each product: pick a product, toggle pre-selected on/off, optionally add a short note (e.g. "Most popular add-on")
4. Customize colors and labels
5. Save

---

## Settings

### Section settings

| Setting | Default | Description |
|---------|---------|-------------|
| Title | "Frequently bought together" | Section heading |
| Subtitle | "Save when you buy together" | Supporting line below title |
| Show item count | On | Displays "X items selected" in footer |
| Add bundle label | "Add bundle to cart" | CTA button text |
| Adding… | "Adding to cart…" | Button text while adding |
| Added! | "Bundle added!" | Button text after successful add |
| Guarantee note | "14-day money-back guarantee." | Small note below CTA |

### Block settings (per product)

| Setting | Description |
|---------|-------------|
| Product | Pick any product from your catalog |
| Pre-selected | Whether this product is checked by default |
| Short note | Optional label shown below the product name (e.g. "Bestseller") |

### Color settings

Background, border, text, subtext, accent/checkbox, CTA button, savings badge — all configurable via color pickers.

---

## How it works

- Each product appears as a **checkbox row** with image, title, variant, and price
- The **first product block is always pre-selected** (cannot be unchecked — it's the anchor product)
- The footer shows a **live bundle total** that updates as customers check/uncheck items
- If any product has a compare-at price, the total shows **original vs. bundle price** with a savings badge
- Clicking **Add bundle to cart** adds all checked, available items via a single AJAX request sequence
- **Sold-out variants** are automatically disabled with a "Sold out" label

---

## Requirements

- Shopify Online Store 2.0 theme
- No apps required
- No dependencies

---

## Notes

- Up to 5 products per bundle (Shopify section block limit)
- The section works on `product` and `page` templates
- Highly customized themes may need minor spacing adjustments
