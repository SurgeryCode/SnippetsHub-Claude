# Exit Intent Popup for Shopify

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A conversion-focused exit intent popup that triggers when a visitor moves to leave the page. Shows a discount code (copyable with one click), CTA button, and a dismiss link. On mobile, triggers after a configurable delay instead. Shown once per session.

---

## What's included

```
snippetshub-exit-intent-popup/
├── sections/
│   └── snh-exit-intent-popup.liquid
├── assets/
│   ├── snh-exit-intent-popup.css
│   └── snh-exit-intent-popup.js
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

Copy to your theme:
- `sections/snh-exit-intent-popup.liquid` → `sections/`
- `assets/snh-exit-intent-popup.css` → `assets/`
- `assets/snh-exit-intent-popup.js` → `assets/`

### Step 2 — Add to theme.liquid

Open `layout/theme.liquid` and add before `</body>`:

```liquid
{% section 'snh-exit-intent-popup' %}
```

### Step 3 — Configure in Theme Editor

Navigate to any page → find **SNH Exit Intent Popup** → fill in your offer and save.

---

## Settings

| Setting | Default | Description |
|---|---|---|
| Desktop trigger | Mouse leave | Fires when cursor exits top of viewport |
| Mobile delay | 15s | Seconds on page before popup shows on mobile |
| Show once per session | On | Suppressed after first show via `sessionStorage` |
| Badge | "Limited offer" | Small pill above headline |
| Headline | "Wait — before you go!" | Main heading |
| Subtext | — | Supporting paragraph |
| Code label | "Your discount code:" | Label above the code block |
| Discount code | SAVE10 | Leave empty to hide the code block |
| CTA label | "Shop now" | Primary button text |
| CTA URL | — | Where the button links |
| Dismiss label | "No thanks, I'll pay full price" | Secondary dismiss link |

---

## Features

| Feature | Details |
|---|---|
| Exit intent | Fires on `mouseleave` when `clientY ≤ 20` (cursor heading toward browser chrome) |
| Mobile trigger | `setTimeout` after configurable delay — resets on first user interaction |
| Discount code | Click to copy via `navigator.clipboard` with fallback |
| Session memory | `sessionStorage` prevents repeat shows per session |
| Keyboard | Escape closes modal |
| Overlay | Click outside to dismiss |
| Animation | Smooth scale + fade in with spring easing |
| ARIA | `role="dialog"`, `aria-modal`, `aria-hidden` managed properly |

---

## Requirements

- Shopify Online Store 2.0 theme
- No apps required
- No dependencies
