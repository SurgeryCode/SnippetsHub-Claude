# SnippetsHub Cart Drawer

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Wysuwany panel koszyka (AJAX). Po dodaniu do koszyka pobiera `/cart.js`, renderuje pozycje i pokazuje drawer. Opcjonalne upselle z metafieldu produktu.

## Instalacja
1) Dodaj sekcję do motywu (np. w `layout/theme.liquid` przed `</body>`):
```liquid
{% section 'surgerycode-cart-drawer' %}
```
2) Upewnij się, że przyciski „Add to cart” mają atrybut `data-add-to-cart`.
3) Assety JS/CSS dołączają się z sekcji automatycznie.

## Ustawienia sekcji
- `enable_upsells` – upselle z `product.metafields.custom.upsell_products`
- `drawer_title` – tytuł w nagłówku

## Pliki
- sections/surgerycode-cart-drawer.liquid
- assets/surgerycode-cart-drawer.js
- assets/surgerycode-cart-drawer.css

---

# SnippetsHub Cart Drawer (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Slide-out AJAX cart drawer. After adding to cart, fetches `/cart.js`, renders items, and opens the drawer. Optional upsells from product metafield.

## Installation
1) Add the section to the theme (e.g., in `layout/theme.liquid` before `</body>`):
```liquid
{% section 'surgerycode-cart-drawer' %}
```
2) Ensure "Add to cart" buttons have `data-add-to-cart` attribute.
3) Assets are auto-included by the section.

## Section settings
- `enable_upsells` – upsells via `product.metafields.custom.upsell_products`
- `drawer_title` – header title

## Files
- sections/surgerycode-cart-drawer.liquid
- assets/surgerycode-cart-drawer.js
- assets/surgerycode-cart-drawer.css
