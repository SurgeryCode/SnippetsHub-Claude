# Recently Viewed Products for Shopify

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A client-side recently viewed products section that tracks which products a visitor has browsed and displays them as a product grid — on any page, without any app or server-side logic. Products are stored in `localStorage` and rendered instantly by JavaScript.

---

## What's included

```
snippetshub-recently-viewed/
├── sections/
│   └── snh-recently-viewed.liquid   ← Shopify OS 2.0 section
├── assets/
│   ├── snh-recently-viewed.css
│   └── snh-recently-viewed.js
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

In **Shopify Admin → Online Store → Themes → Edit code**, upload:
- `sections/snh-recently-viewed.liquid` → `sections/`
- `assets/snh-recently-viewed.css` → `assets/`
- `assets/snh-recently-viewed.js` → `assets/`

### Step 2 — Add to your templates

**Option A — Product page (recommended)**

In **Theme Editor → Product template**, click **Add section** → **SNH Recently Viewed**. Place it near the bottom of the page, below the main product info. The current product is automatically excluded from the list.

**Option B — Any other page**

Add the section to any page template (collection, index, cart, etc.) from the Theme Editor.

### Step 3 — Configure

Click **SNH Recently Viewed** in the sidebar:
1. Set the section **title**
2. Choose the **max number of products** to show (2–8)
3. Adjust colors
4. Save

---

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Section title | "Recently viewed" | Heading above the product grid |
| Max products to show | 4 | How many products to display (2–8) |
| Section background | `#FFFFFF` | Background behind the grid |
| Card background | `#FFFFFF` | Individual product card background |
| Card border | `#E5E5E5` | Card border color |
| Product title color | `#111111` | Product name text |
| Price / meta color | `#6B6B6B` | Price and secondary text |
| Button background | `#111111` | "View product" button |
| Button text | `#FFFFFF` | Button label color |

---

## How it works

- When a visitor lands on a product page, the product's data (handle, title, image, price, URL) is saved to `localStorage` under the key `snh-rv-products`
- On any page with the section, JavaScript reads that list and renders a product card grid
- The **current product is excluded** automatically on product pages (tracked via `data-exclude-handle`)
- The section is **hidden** until there is at least one product in the list — no empty state shown to first-time visitors
- Data persists across sessions (localStorage) until the browser storage is cleared

---

## Requirements

- Shopify Online Store 2.0 theme
- JavaScript enabled in the visitor's browser
- No apps required
- No dependencies

---

## Notes

- Products are tracked client-side only — no customer data is sent to any server
- The section is invisible on first visit (no history yet) and appears after the customer browses at least one product
- Highly customized themes may need minor card spacing adjustments
