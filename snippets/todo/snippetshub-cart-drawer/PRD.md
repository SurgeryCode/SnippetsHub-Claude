# PRD — SnippetsHub Cart Drawer
**Status:** ✅ Gotowe z poprawkami | **Priorytet:** Wysoki

## Co robi
Wysuwany panel koszyka (AJAX). Po kliknięciu „Add to cart" pobiera `/cart.js`, renderuje pozycje i otwiera drawer. Opcjonalne upselle z metafieldu.

## Pliki
| Plik | Status |
|---|---|
| `sections/surgerycode-cart-drawer.liquid` | ✅ |
| `assets/surgerycode-cart-drawer.js` | ✅ |
| `assets/surgerycode-cart-drawer.css` | ✅ |

## ✅ Co działa dobrze
- Struktura `role="dialog" aria-modal="true"` — poprawna semantyka
- Schema z `enable_upsells` i `drawer_title`
- Automatyczne ładowanie JS/CSS z sekcji
- Integracja z `product.metafields.custom.upsell_products`

## ❌ Problemy do naprawienia

### 1. Brak overlay (backdrop)
**Problem:** Nie ma elementu `div.overlay` do zamknięcia drawera kliknięciem poza nim.  
**Rozwiązanie:** Dodać `<div class="surgerycode-cart-drawer__overlay" data-surgerycode-close></div>` przed drawerem.

### 2. Upselle poza kontekstem PDP
**Problem:** `product.metafields.custom.upsell_products` jest dostępny tylko na PDP. W layoucie `theme.liquid` zmienna `product` jest pusta.  
**Rozwiązanie:** Upselle ładować przez AJAX (`/recommendations/products.json?product_id=ID`) z JS na podstawie ostatniego dodanego produktu z koszyka.

### 3. Brak przycisku Checkout w footer
**Problem:** Footer zawiera tylko "View Cart", brak bezpośredniego "Checkout".  
**Rozwiązanie:** Dodać `<a href="/checkout" class="surgerycode-cart-drawer__checkout-btn">Checkout</a>`.

### 4. Brak aria-labelledby na dialog
**Problem:** Dialog nie ma `aria-labelledby` powiązanego z `<h2>`.  
**Rozwiązanie:** Dodać `id="SurgeryCodeCartDrawerTitle"` do `<h2>` i `aria-labelledby="SurgeryCodeCartDrawerTitle"` do `<div>`.

## Kryteria akceptacji (DoD)
- [ ] Overlay działa — kliknięcie poza drawerem go zamyka
- [ ] Przycisk Checkout widoczny w footer
- [ ] Upselle ładowane przez AJAX (nie przez Liquid na poziomie layout)
- [ ] `aria-labelledby` powiązany z tytułem drawera
- [ ] Drawer nie blokuje scroll body gdy zamknięty
