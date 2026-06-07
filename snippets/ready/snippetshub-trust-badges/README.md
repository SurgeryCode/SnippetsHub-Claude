# Trust Badges Section for Shopify

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A fully configurable trust badges section for Shopify product pages. Add up to any number of badges with preset SVG icons, custom emoji, labels and sublabels — all controlled from the Theme Editor. No JavaScript. Zero app bloat.

---

## What's included

```
snippetshub-trust-badges/
├── sections/
│   └── snh-trust-badges.liquid   ← Shopify OS 2.0 section with blocks
├── assets/
│   └── snh-trust-badges.css
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

Copy to your Shopify theme:
- `sections/snh-trust-badges.liquid` → `sections/`
- `assets/snh-trust-badges.css` → `assets/`

### Step 2 — Add to your product template

**Option A — Theme Editor (recommended)**

In Shopify Admin → Online Store → Themes → Customize → open a product page → click **"Add section"** → choose **SNH Trust Badges**.

**Option B — Directly in template**

Open `templates/product.json` and add `snh-trust-badges` to the sections order, or insert directly in a Liquid template:

```liquid
{% section 'snh-trust-badges' %}
```

### Step 3 — Configure badges

1. Click on the **SNH Trust Badges** section in the Theme Editor
2. Click **"Add badge"** to add each badge
3. For each badge: choose icon, enter label, optional sublabel
4. Adjust layout, alignment and colors in section settings
5. Save

---

## Settings

### Section settings

| Setting | Default | Description |
|---|---|---|
| Layout | Row | Row (horizontal) or Grid (equal columns) |
| Alignment | Center | Left / Center / Right |
| Icon size | Medium (24px) | Small 20px / Medium 24px / Large 32px |
| Show dividers | Off | Vertical lines between badges (row only) |
| Background | `#FFFFFF` | Section background |
| Icon color | `#111111` | SVG icon fill/stroke |
| Label color | `#111111` | Badge label text |
| Sublabel color | `#6B6B6B` | Supporting text below label |
| Divider color | `#E5E5E5` | Color of divider lines |

### Block settings (per badge)

| Setting | Description |
|---|---|
| Icon | Choose from 9 preset SVG icons |
| Custom icon | Emoji or text — overrides preset icon |
| Label | Main badge text (e.g. "Secure Checkout") |
| Sublabel | Optional supporting line (e.g. "SSL encrypted") |

### Available preset icons

| Value | Icon |
|---|---|
| `lock` | Padlock — Secure Checkout |
| `truck` | Delivery truck — Shipping |
| `refresh` | Circular arrows — Returns |
| `shield` | Shield — Guarantee |
| `star` | Star — Reviews |
| `check` | Checkmark — Verified |
| `heart` | Heart — Made with care |
| `phone` | Phone — Support |
| `tag` | Price tag — Best Price |

---

## Default preset

Includes 5 ready-to-use badges:
1. 🔒 Secure Checkout — SSL encrypted
2. 🚚 Free Shipping — On orders over 200 PLN
3. 🔄 Easy Returns — 14-day guarantee
4. 🛡️ Money-Back Guarantee — No questions asked
5. ⭐ 5-Star Reviews — Trusted by thousands

---

## Requirements

- Shopify Online Store 2.0 theme
- No JavaScript required
- No apps required
- No dependencies
