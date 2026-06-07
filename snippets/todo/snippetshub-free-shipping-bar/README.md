# Free Shipping Progress Bar for Shopify

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A lightweight progress bar that shows customers how close they are to earning free shipping. Updates dynamically as cart contents change — no page reload required.

---

## What's included

```
snippetshub-free-shipping-bar/
├── sections/
│   └── snh-free-shipping-bar.liquid   ← Shopify OS 2.0 section
├── assets/
│   ├── snh-free-shipping-bar.css
│   └── snh-free-shipping-bar.js
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

Copy to your Shopify theme:
- `sections/snh-free-shipping-bar.liquid` → `sections/`
- `assets/snh-free-shipping-bar.css` → `assets/`
- `assets/snh-free-shipping-bar.js` → `assets/`

### Step 2 — Add to your theme

**Option A — Cart Drawer (recommended)**

Open your cart drawer section (e.g. `sections/cart-drawer.liquid`) and add inside the drawer, above the cart items or subtotal area:

```liquid
{% section 'snh-free-shipping-bar' %}
```

**Option B — Cart Page**

Open `sections/main-cart-footer.liquid` and add at the top:

```liquid
{% section 'snh-free-shipping-bar' %}
```

**Option C — Theme Editor**

In Shopify Admin → Online Store → Themes → Customize, add the **"SNH Free Shipping Bar"** section to any page template.

### Step 3 — Configure in Theme Editor

1. Open Shopify Admin → Online Store → Themes → Customize
2. Navigate to the page where you added the section
3. Click on **SNH Free Shipping Bar**
4. Set your **free shipping threshold** (e.g. `200` for 200 PLN)
5. Customize messages and colors
6. Save

---

## Settings

| Setting | Default | Description |
|---|---|---|
| Threshold | `200` | Cart total needed for free shipping (whole currency units) |
| Message — below threshold | `Add {amount} more for FREE shipping!` | Use `{amount}` as placeholder |
| Message — threshold reached | `You've unlocked FREE shipping!` | Shown when cart total ≥ threshold |
| Show icon | `true` | Shows 🚚 below threshold, ✓ when reached |
| Background | `#FFFFFF` | Bar wrapper background |
| Text | `#111111` | Message text color |
| Progress bar fill | `#111111` | Fill color of the bar |
| Progress bar track | `#E5E5E5` | Background track color |

---

## Dynamic cart updates

The bar listens for these events and refreshes automatically:
- `cart:updated`, `cart:refresh`, `cart:change`, `cart:update`
- `snh:sticky-atc:added` (SnippetsHub Sticky ATC integration)
- `theme:cart:updated`

Works out of the box with **Dawn**, **Sense**, **Refresh**, **Craft** and most Shopify 2.0 themes.

---

## Requirements

- Shopify Online Store 2.0 theme
- No apps required
- No dependencies

---

## Notes

- Prices are stored in cents by Shopify. The threshold setting uses whole units (e.g. `200` = 200 PLN). This works correctly for all standard currencies. For zero-decimal currencies (JPY, KRW), set the threshold value accordingly.
- Highly customized themes may require minor placement adjustments.
