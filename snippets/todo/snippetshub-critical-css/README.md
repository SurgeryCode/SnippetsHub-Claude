# SnippetsHub Critical CSS Loader

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Wstrzykuje plik `surgerycode-critical.css` możliwie wcześnie (preload + onload), fallback w `<noscript>`. Poprawa LCP.

## Instalacja
Wstaw w `<head>` layoutu `theme.liquid`:
```liquid
{% render 'surgerycode-critical-css' %}
```
Uzupełnij `assets/surgerycode-critical.css` krytycznymi stylami sekcji above‑the‑fold.

## Pliki
- snippets/surgerycode-critical-css.liquid
- assets/surgerycode-critical.css

---

# SnippetsHub Critical CSS Loader (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Injects `surgerycode-critical.css` as early as possible (preload + onload) with `<noscript>` fallback. Improves LCP.

## Installation
Place inside `<head>` of `theme.liquid`:
```liquid
{% render 'surgerycode-critical-css' %}
```
Fill `assets/surgerycode-critical.css` with above-the-fold critical styles.

## Files
- snippets/surgerycode-critical-css.liquid
- assets/surgerycode-critical.css
