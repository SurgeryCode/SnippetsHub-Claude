# SnippetsHub Locale Recommender

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Sugeruje zmianę języka/regionu na podstawie `navigator.language` i dostępnych `shop.published_locales`. Pokazuje pasek z przyciskiem przełączenia.

## Instalacja
Wstaw w layout lub header:
```liquid
{% render 'surgerycode-locale-recommender' %}
```
Stylowanie wykonaj w motywie (np. `.surgerycode-locale__bar{position:fixed;bottom:0;left:0;right:0;...}`).

## Pliki
- snippets/surgerycode-locale-recommender.liquid
- assets/surgerycode-locale-recommender.js

---

# SnippetsHub Locale Recommender (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Suggests switching language/region using `navigator.language` against `shop.published_locales`. Shows a bottom bar with a switch button.

## Installation
Place in layout or header:
```liquid
{% render 'surgerycode-locale-recommender' %}
```
Style it in your theme (e.g., `.surgerycode-locale__bar{position:fixed;bottom:0;left:0;right:0;...}`).

## Files
- snippets/surgerycode-locale-recommender.liquid
- assets/surgerycode-locale-recommender.js
