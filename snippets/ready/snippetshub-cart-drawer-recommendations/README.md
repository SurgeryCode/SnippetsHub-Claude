# Cart Drawer with Recommendations for Shopify

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A full AJAX cart drawer with product recommendations, a built-in free shipping progress bar, and live quantity controls. Opens instantly from any cart icon — no page reload. Recommendations are pulled from Shopify's native Product Recommendations API based on the last item added.

---

## What's included

```
snippetshub-cart-drawer-recommendations/
├── sections/
│   └── snh-cart-drawer-recommendations.liquid
├── assets/
│   ├── snh-cart-drawer-recommendations.css
│   └── snh-cart-drawer-recommendations.js
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

Copy to your theme:
- `sections/snh-cart-drawer-recommendations.liquid` → `sections/`
- `assets/snh-cart-drawer-recommendations.css` → `assets/`
- `assets/snh-cart-drawer-recommendations.js` → `assets/`

### Step 2 — Add to theme.liquid

Open `layout/theme.liquid` and add before `</body>`:

```liquid
{% section 'snh-cart-drawer-recommendations' %}
```

### Step 3 — Connect your cart icon

The drawer opens automatically when any element matching these selectors is clicked:

```html
[data-cart-toggle]          ← add this attribute to your cart icon button
[href="/cart"]              ← standard Shopify cart link
[href*="/cart"][data-open-cart]
```

**Simplest approach** — add `data-cart-toggle` to your theme's cart icon button:

```html
<button data-cart-toggle aria-label="Open cart">
  <!-- your cart icon SVG -->
</button>
```

The drawer can also be opened programmatically:

```js
document.dispatchEvent(new CustomEvent('snh:cart:open'));
```

### Step 4 — Configure in Theme Editor

Navigate to any page in Theme Editor → find **SNH Cart Drawer + Recommendations** → set your threshold, colors, and recommendation count.

---

## Features

| Feature | Details |
|---|---|
| AJAX cart | Items, quantities, totals update without page reload |
| Quantity controls | +/− steppers with instant cart.js update |
| Remove items | Trash icon per line item |
| Free shipping bar | Built-in progress bar with configurable threshold |
| Recommendations | Shopify Recommendations API (`intent=related`) — loads on open |
| Keyboard | Escape closes drawer, focus trapped inside |
| Overlay | Click outside to close |
| Body scroll lock | `overflow: hidden` on body when open |

## Cart events dispatched

| Event | When |
|---|---|
| `cart:updated` | After any quantity change or item removal |

## Cart events listened

| Event | Action |
|---|---|
| `snh:cart:open`, `cart:open` | Opens the drawer |
| `cart:updated`, `cart:refresh`, `cart:change`, `cart:update`, `snh:sticky-atc:added` | Refreshes cart contents |

---

## Requirements

- Shopify Online Store 2.0 theme
- Shopify Product Recommendations must be enabled (default on all stores)
- No third-party apps required
