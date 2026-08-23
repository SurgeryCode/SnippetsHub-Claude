# SnippetsHub — Project Status
> Ten plik to jedyne źródło prawdy o stanie projektu.
> AI czyta go zamiast analizować foldery. Aktualizuj po każdej sesji.

**Ostatnia aktualizacja:** 2026-06-07
**Aktualizował:** Claude Code

---

## Sklep (snippetshub.com)

| Produkt | Cena | Status |
|---------|------|--------|
| Countdown Bar | 108 PLN (145 reg.) | ✅ Live |
| Shopify Developer by the Hour | 186 PLN/h (260 reg.) | ✅ Live |

---

## Snippety — stan kompletny

### snippets/ready/ — gotowe technicznie (12 szt.)

| Snippet | Opis HTML | Live w Shopify | ZIP |
|---------|-----------|----------------|-----|
| snippetshub-countdown-bar | ✅ | ✅ | ❓ |
| snippetshub-sticky-add-to-cart-bar | ✅ | ❌ | ❓ |
| snippetshub-announcement-bar | ✅ | ❌ | ❓ |
| snippetshub-free-shipping-bar | ✅ | ❌ | ❓ |
| snippetshub-trust-badges | ✅ | ❌ | ❓ |
| snippetshub-recently-viewed | ✅ | ❌ | ❓ |
| snippetshub-exit-intent-popup | ✅ | ❌ | ❓ |
| snippetshub-cart-drawer | ✅ | ❌ | ❓ |
| snippetshub-cart-drawer-recommendations | ✅ | ❌ | ❓ |
| snippetshub-product-bundle-builder | ✅ | ❌ | ❓ |
| snippetshub-upsell-cross-sell | ✅ | ❌ | ❓ |
| snippetshub-back-in-stock | ✅ | ❌ | ❓ |

### Zbudowane TIER 3 (poza ready/, opis HTML gotowy)

| Snippet | Kategoria | Opis HTML | Live w Shopify |
|---------|-----------|-----------|----------------|
| snippetshub-checkout-order-bump | Checkout | ✅ | ❌ |
| snippetshub-post-purchase-upsell | Checkout | ✅ | ❌ |
| snippetshub-mega-menu | Hero Sections | ✅ | ❌ |

### snippets/todo/ — backlog (nie gotowe)

snippetshub-lite-video-embed, snippetshub-performance-lite-loader,
snippetshub-cookie-lite, snippetshub-kreator-produktu, snippetshub-critical-css,
snippetshub-checkout-plus-pack, snippetshub-counter-html-css-js,
snippetshub-locale-recommender, snippetshub-landing-page-creator,
snippetshub-3d-product-banner, snippetshub-faq-seo, snippetshub-instagram-feed,
snippetshub-predictive-search, snippetshub-one-step-checkout, snippetshub-b2b-pack

---

## Opisy produktów (descriptions/)

15 plików HTML gotowych do wklejenia w Shopify Admin:
snh-cart-drawer, snh-free-shipping-bar, snh-trust-badges, snh-exit-intent-popup,
snh-announcement-bar, snh-sticky-add-to-cart-bar, snh-product-bundle-builder,
snh-recently-viewed, snh-upsell-cross-sell, snh-cart-drawer-recommendations,
snh-back-in-stock, snh-countdown-bar, snh-checkout-order-bump,
snh-post-purchase-upsell, snh-mega-menu

---

## Aktualny sprint

**Cel:** Wystawić wszystkie 15 snippetów w Shopify Admin

**Kolejność wystawiania:**
1. ❌ snippetshub-cart-drawer
2. ❌ snippetshub-free-shipping-bar
3. ❌ snippetshub-trust-badges
4. ❌ snippetshub-exit-intent-popup
5. ❌ snippetshub-announcement-bar
6. ❌ snippetshub-sticky-add-to-cart-bar
7. ❌ snippetshub-product-bundle-builder
8. ❌ snippetshub-recently-viewed
9. ❌ snippetshub-upsell-cross-sell
10. ❌ snippetshub-cart-drawer-recommendations
11. ❌ snippetshub-back-in-stock
12. ❌ snippetshub-checkout-order-bump
13. ❌ snippetshub-post-purchase-upsell
14. ❌ snippetshub-mega-menu

**Następny sprint (po wystawieniu):**
- Zbudować: Size Chart, Product Tabs, FAQ Accordion (community research 2026-06-01)
- Złożyć bundles: Conversion Starter Pack, Cart Optimization Bundle, Product Page Pro Bundle

---

## Motywy testowe (themes/development/)

| Folder | Motyw | Snippety przetestowane |
|--------|-------|----------------------|
| *(brak)* | — | — |

---

## Log sesji

| Data | Co zrobiono |
|------|-------------|
| 2026-07-07 | Analiza zagrożeń sp. z o.o. + analiza wzoru umowy B2B Hyper Effekt — zapisano w `docs/SPOLKA_ZOO_I_UMOWA_B2B_ANALIZA.md` (wnioski: snippety sprzedawać pod JDG, spółka później; 2 punkty MUST do negocjacji w umowie: carve-out IP dla SnippetsHub i wyłączenie sklepu z zakazu konkurencji). |
| 2026-07-06 | Audyt całego projektu — utworzono `docs/AUDIT_RECOMMENDATIONS.md`: diagnoza (15 snippetów gotowych, 1 live — wąskie gardło to publikacja), rekomendacje ulepszeń, plan skalowania (bundles, All-Access, SEO, demo store) i 4-tygodniowy plan launchu. |
| 2026-06-14 | Przeniesiono wymagania z głównego CLAUDE.md do HTML-clear-ideas/CLAUDE.md (brand voice, persony, USP, cennik, dwa szablony opisów). Dodano SPEC.md, skrypt create:idea, placeholdery w _TEMPLATE. Przebudowano z zera Figma export burgerowni (hamburgery-landingpage) na czysty HTML/CSS — plik w HTML-clear-ideas/hamburger-landing/index.html. Użyto flat PNG jako CSS sprite; do dopracowania: pozycje sprite'ów, responsive, hover, JS dla slidera. |
| 2026-06-13 | Stworzono folder design/ z pełną strukturą MVC (system/tokens, system/code-connect, snippets/_TEMPLATE, gtm/_TEMPLATE). Zaktualizowano CLAUDE.md o Design Workflow i nowe sekcje. |
| 2026-06-07 | Stworzono zunifikowany workspace /SnippetsHub/ z obu starszych folderów. Dodano .gitignore, STATUS.md, zaktualizowano CLAUDE.md z nową strukturą. |
| 2026-06-01 | Zbudowano TIER 3 (checkout-order-bump, post-purchase-upsell, mega-menu). Przeniesiono 12 snippetów do ready/. Napisano 15 opisów HTML. Community research — nowe pomysły: Size Chart, Product Tabs, FAQ Accordion. |
