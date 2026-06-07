# Announcement Bar for Shopify (Multi-Message)

**Version:** 1.0.0 | **Author:** SnippetsHub | **Support:** support@snippetshub.com

A lightweight, multi-message announcement bar for the top of your Shopify store. Rotates between unlimited messages automatically, with optional navigation dots, arrows, and a dismiss button. Fully configured from the Theme Editor — no code required.

---

## What's included

```
snippetshub-announcement-bar/
├── sections/
│   └── snh-announcement-bar.liquid   ← Shopify OS 2.0 section with blocks
├── assets/
│   ├── snh-announcement-bar.css
│   └── snh-announcement-bar.js
├── manifest.json
└── LICENSE.md
```

---

## Installation

### Step 1 — Upload files

Copy to your Shopify theme:
- `sections/snh-announcement-bar.liquid` → `sections/`
- `assets/snh-announcement-bar.css` → `assets/`
- `assets/snh-announcement-bar.js` → `assets/`

### Step 2 — Add to theme header

Open `layout/theme.liquid` and add right after `<body>` (before the header section):

```liquid
{% section 'snh-announcement-bar' %}
```

Or add via Theme Editor: navigate to any page → **Add section** → **SNH Announcement Bar** → drag it to the top.

### Step 3 — Add messages

1. Open Theme Editor → click **SNH Announcement Bar**
2. Click **"Add message"** for each announcement
3. Each message supports: emoji icon, text, and optional click-through link
4. Toggle individual messages on/off without deleting them
5. Save

---

## Settings

### Section settings

| Setting | Default | Description |
|---|---|---|
| Auto-rotate | On | Automatically cycles through messages |
| Rotation interval | 4000ms | Time between messages (2s–8s) |
| Show dots | On | Navigation dots below text |
| Show arrows | Off | Prev/Next arrow buttons |
| Show close button | On | × button to dismiss the bar |
| Background | `#111111` | Bar background color |
| Text | `#FFFFFF` | Message text color |
| Link / hover | `#F4B400` | Color of linked messages on hover |
| Close button | `#FFFFFF` | Close icon color |

### Block settings (per message)

| Setting | Description |
|---|---|
| Enable | Toggle message on/off without deleting |
| Icon | Emoji displayed before the text (e.g. 🚚) |
| Message text | The announcement copy |
| Link | Makes the whole message a clickable link |

---

## Behaviour

- **Auto-rotate** pauses on hover and focus (keyboard accessible)
- **Close button** saves dismissed state in `sessionStorage` — bar reappears on next browser session
- **Single message** — rotation and dots are hidden automatically
- **Disabled messages** are excluded from the rotation without removing them

---

## Requirements

- Shopify Online Store 2.0 theme
- No apps required
- No dependencies
