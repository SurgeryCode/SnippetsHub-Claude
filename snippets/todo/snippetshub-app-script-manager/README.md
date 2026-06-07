# SnippetsHub App Script Manager

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Zarządza ładowaniem zewnętrznych skryptów na podstawie konfiguracji (tryb: immediate/afterLoad/interaction/idle) oraz zgód prywatności (`Shopify.customerPrivacy`).

## Instalacja (layout/theme.liquid)
Wstaw w `<head>` jedną z metod:

Preferowana – przekazanie tablicy skryptów:
```liquid
{% render 'app-script-manager', scripts: [
  {"id":"ga4","src":"https://example.com/ga4.js","mode":"afterLoad","consent":["analytics"]},
  {"id":"chat","src":"https://example.com/chat.js","mode":"interaction","consent":["marketing"]}
] %}
```
Fallback – użyj `shop.metafields.surgerycode.app_scripts` (lista JSON). Snippet sam odczyta.

## Uwagi
- `consent`: jeśli dostępne `Shopify.customerPrivacy.userConsentGiven(type)` – skrypty ładują się dopiero po udzieleniu zgody.
- `mode`: `immediate`, `afterLoad`, `interaction`, `idle`.

## Pliki
- snippets/app-script-manager.liquid
- assets/app-script-manager.js

---

# SnippetsHub App Script Manager (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Manages loading of third‑party scripts based on configuration (modes: immediate/afterLoad/interaction/idle) and user privacy consents (`Shopify.customerPrivacy`).

## Installation (layout/theme.liquid)
Place in `<head>` using one of the methods:

Preferred – pass an array of scripts:
```liquid
{% render 'app-script-manager', scripts: [
  {"id":"ga4","src":"https://example.com/ga4.js","mode":"afterLoad","consent":["analytics"]},
  {"id":"chat","src":"https://example.com/chat.js","mode":"interaction","consent":["marketing"]}
] %}
```
Fallback – use `shop.metafields.surgerycode.app_scripts` (JSON list). The snippet will read it automatically.

## Notes
- `consent`: when `Shopify.customerPrivacy.userConsentGiven(type)` is available, scripts load only after consent.
- `mode`: `immediate`, `afterLoad`, `interaction`, `idle`.

## Files
- snippets/app-script-manager.liquid
- assets/app-script-manager.js
