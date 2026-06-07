# SnippetsHub Performance Lite Loader

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Odracza ładowanie ciężkich zasobów (`script`, `link stylesheet`, `iframe`) oznaczonych atrybutami `data-lite-*` do momentu `idle`, `interaction` albo `afterLoad`.

## Instalacja (layout/theme.liquid)
Wstaw w `<head>` lub na początku `<body>`:
```liquid
{% render 'performance-lite-loader', config: {
  "mode": "idle",
  "selectors": ["script[data-lite-src]","link[data-lite-href]","iframe[data-lite-src]"]
} %}
```

Następnie oznacz zasoby do odroczenia:
- Skrypt: `<script data-lite-src="https://cdn.example.com/chat.js" defer></script>`
- Stylesheet: `<link rel="preload" as="style" data-lite-href="{{ 'heavy.css' | asset_url }}">`
- Iframe: `<iframe data-lite-src="https://www.youtube.com/embed/..." loading="lazy"></iframe>`

## Uwagi
- `mode`: `immediate`, `afterLoad`, `interaction`, `idle` (domyślnie `idle`).
- Nie zmieniaj `src/href` ręcznie – loader sam podmieni atrybuty `data-lite-*` we właściwym momencie.

## Pliki
- snippets/performance-lite-loader.liquid
- assets/performance-lite-loader.js

---

# SnippetsHub Performance Lite Loader (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Defers heavy resources (`script`, `link stylesheet`, `iframe`) marked with `data-lite-*` until `idle`, `interaction` or `afterLoad`.

## Installation (layout/theme.liquid)
Place in `<head>` or at the top of `<body>`:
```liquid
{% render 'performance-lite-loader', config: {
  "mode": "idle",
  "selectors": ["script[data-lite-src]","link[data-lite-href]","iframe[data-lite-src]"]
} %}
```

Then mark resources to be deferred:
- Script: `<script data-lite-src="https://cdn.example.com/chat.js" defer></script>`
- Stylesheet: `<link rel="preload" as="style" data-lite-href="{{ 'heavy.css' | asset_url }}">`
- Iframe: `<iframe data-lite-src="https://www.youtube.com/embed/..." loading="lazy"></iframe>`

## Notes
- `mode`: `immediate`, `afterLoad`, `interaction`, `idle` (default `idle`).
- Do not manually change `src/href` – the loader will upgrade `data-lite-*` at the right time.

## Files
- snippets/performance-lite-loader.liquid
- assets/performance-lite-loader.js
