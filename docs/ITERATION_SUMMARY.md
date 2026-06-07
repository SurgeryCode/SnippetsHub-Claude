# SnippetsHub — Iteration Summary
**Data:** 2026-06-01 | **Status:** Zamknięta

---

## Co mamy teraz (pełny stan)

### snippets-list-ready/ — 12 snippetów gotowych do sprzedaży

| # | Snippet | Kategoria | Prefix | Manifest |
|---|---------|-----------|--------|----------|
| 1 | snippetshub-countdown-bar | Popups & Bars | snh- | ✅ |
| 2 | snippetshub-sticky-add-to-cart-bar | Product Pages | snh- | ✅ |
| 3 | snippetshub-announcement-bar | Hero Sections | snh- | ✅ |
| 4 | snippetshub-free-shipping-bar | Carts | snh- | ✅ |
| 5 | snippetshub-trust-badges | Product Pages | snh- | ✅ |
| 6 | snippetshub-recently-viewed | Product Pages | snh- | ✅ |
| 7 | snippetshub-exit-intent-popup | Popups & Bars | snh- | ✅ |
| 8 | snippetshub-cart-drawer | Carts | snh- | ✅ |
| 9 | snippetshub-cart-drawer-recommendations | Carts | snh- | ✅ |
| 10 | snippetshub-product-bundle-builder | Bundles | snh- | ✅ |
| 11 | snippetshub-upsell-cross-sell | Product Pages | snh- | ✅ |
| 12 | snippetshub-back-in-stock | Popups & Bars | snh- | ✅ |

### snippets/ — 3 snippety TIER 3 (zbudowane, bez opisu w Shopify)

| Snippet | Kategoria | Opis HTML |
|---------|-----------|-----------|
| snippetshub-checkout-order-bump | Checkout | ✅ descriptions/ |
| snippetshub-post-purchase-upsell | Checkout | ✅ descriptions/ |
| snippetshub-mega-menu | Hero Sections | ✅ descriptions/ |

### Aktywne produkty w sklepie (snippetshub.com)
- ✅ **Countdown Bar** — sprzedawany, 108 PLN
- ✅ **Shopify Developer by the Hour** — sprzedawany, 186 PLN/h

---

## Co zrobiono w tej iteracji

### 1. Zbudowano TIER 3 od zera (3 snippety)
- **Checkout Order Bump** — pre-checkout upsell card na stronie koszyka, AJAX add-to-cart
- **Post-Purchase Upsell Page** — dedykowana strona po zakupie z countdown timerem, direct-to-checkout flow
- **Mega Menu** — pełny header: mega dropdown, sticky + hide-on-scroll, mobile drawer, ikony akcji

### 2. Review i przeniesienie snippets-list-todo → ready (12 snippetów)
- **7 przeniesiono bezpośrednio** — były kompletne i poprawne (prefix snh-, manifest, schema)
- **trust-badges** — audit błędnie oznaczył brak JS; sekcja jest statyczna (SVG icons) — przeniesiona bez zmian
- **cart-drawer** — przebudowany: rename `surgerycode-` → `snh-` w Liquid/CSS/JS, dodano manifest.json
- **back-in-stock** — przebudowany od zera jako sekcja OS 2.0: section wrapper, auto show/hide przy zmianie wariantu, rename prefix, manifest.json

### 3. Posprzątano
- Usunięto puste katalogi które powstały przez pomyłkę w `snippets/` (przed odkryciem snippets-list-todo)

---

## Co można zrobić dalej

### A. PRIORYTET — Wystawienie snippetów na sklep (snippetshub.com)

**12 snippetów z `ready` jest gotowych technicznie ale nie ma ich w Shopify.**
Każdy wymaga:
1. Dodania produktu w Shopify Admin (tytuł, cena, warianty licencji)
2. Wklejenia opisu produktu (HTML)
3. Uploadowania pliku ZIP z plikami snippetu jako digital download
4. Przypisania do kolekcji

Brakuje opisów HTML dla 9 z 12 snippetów z `ready`:

| Snippet | Opis HTML |
|---------|-----------|
| snippetshub-announcement-bar | ❌ brak |
| snippetshub-free-shipping-bar | ❌ brak |
| snippetshub-trust-badges | ❌ brak |
| snippetshub-recently-viewed | ❌ brak |
| snippetshub-exit-intent-popup | ❌ brak |
| snippetshub-cart-drawer | ❌ brak |
| snippetshub-cart-drawer-recommendations | ❌ brak |
| snippetshub-product-bundle-builder | ❌ brak |
| snippetshub-upsell-cross-sell | ❌ brak |

**Checkout-order-bump, post-purchase-upsell, mega-menu** mają opisy w `descriptions/` — gotowe do wklejenia.

---

### B. Napisać opisy produktów (HTML) dla 9 snippetów z ready

Format: szablon A z CLAUDE.md — tytuł, lead, use cases, bullet points, FAQ.
Zapisać w `descriptions/{snh-slug}-description.html`.

Kolejność wg potencjału sprzedażowego:
1. `snippetshub-cart-drawer` — wysoki wolumen, każdy sklep potrzebuje
2. `snippetshub-free-shipping-bar` — prosty, universalny
3. `snippetshub-trust-badges` — wysoka konwersja na PDP
4. `snippetshub-exit-intent-popup` — bardzo popularna kategoria
5. `snippetshub-announcement-bar` — replacement dla natywnego
6. `snippetshub-product-bundle-builder` — wysoki AOV
7. `snippetshub-recently-viewed` — standard e-commerce
8. `snippetshub-upsell-cross-sell` — dobry cross-sell
9. `snippetshub-cart-drawer-recommendations` — addon do cart-drawer

---

### C. Testy na motywach testowych

Każdy snippet z `ready` powinien być przetestowany na minimum:
- Dawn (najczęstszy motyw Shopify 2.0)
- Sense (drugi najpopularniejszy)

Workflow: `themes/test/` → upload plików → weryfikacja w Theme Editor.
Dokumentuj wyniki w `themes/THEMES.md`.

---

### D. Wideo tutoriale

Każdy produkt wymaga step-by-step video tutorial (USP SnippetsHub).
Priorytet: te które trafią na sklep jako pierwsze.

---

### E. Bundles (pakiety)

3 pakiety zaplanowane w roadmapie — można je teraz złożyć bo komponenty istnieją:

| Bundle | Składniki | Status składników |
|--------|-----------|-------------------|
| Conversion Starter Pack | Countdown Bar + Sticky ATC + Trust Badges | ✅ wszystkie ready |
| Cart Optimization Bundle | Cart Drawer + Free Shipping Bar + Exit Popup | ✅ wszystkie ready |
| Product Page Pro Bundle | Sticky ATC + Trust Badges + Recently Viewed + Bundle Builder | ✅ wszystkie ready |

---

### F. snippets-list-todo — pozostałe snippety (nie z roadmapy)

W `todo` zostały snippety spoza Q3 2026:
- snippetshub-3d-product-banner
- snippetshub-app-script-manager
- snippetshub-b2b-pack
- snippetshub-checkout-plus-pack (wymaga Shopify Plus)
- snippetshub-cookie-lite
- snippetshub-counter-html-css-js / counter-webcomponent
- snippetshub-critical-css
- snippetshub-faq-seo
- snippetshub-instagram-feed
- snippetshub-kreator-produktu
- snippetshub-landing-page-creator
- snippetshub-lite-video-embed
- snippetshub-locale-recommender
- snippetshub-one-step-checkout
- snippetshub-performance-lite-loader
- snippetshub-predictive-search

Wymagają osobnego review — część może być gotowa do wystawienia, część jest w trakcie lub wymaga backendu.

---

## Community Research — jak szukać nowych pomysłów

### Gdzie szukają użytkownicy Shopify
| Platforma | URL / Jak szukać | Co tam znajdziesz |
|-----------|-----------------|-------------------|
| **Reddit r/shopify** | reddit.com/r/shopify → szukaj "without app" / "no app" / "how to add" | Pain points, frustracje, brakujące funkcje |
| **Shopify Community** | community.shopify.com → filtr "Design" lub "Technical Q&A" | Konkretne pytania o kod, implementacje |
| **YouTube** | "shopify [feature] without app" | Wolumen = popularność tematu, komentarze = prawdziwe potrzeby |
| **Shopify App Store** | Szukaj kategorii → patrz na liczbę recenzji + najczęstsze skargi | Co ludzie płacą za aplikacje → tu jest popyt |
| **Google Trends** | "shopify [feature] liquid" | Rosnące/malejące zainteresowanie |

### Jak uruchomić research z Claude Code
Powiedz: **"zrób community research dla SnippetsHub"** — Claude przeszuka powyższe źródła i zwróci:
- Listę tematów z najwyższym popytem
- Potwierdzenie zapotrzebowania na istniejące snippety
- Nowe pomysły uszeregowane wg potencjału

### Wyniki research z 2026-06-01 — nowe pomysły na snippety

| # | Snippet | Sygnał | Zastępuje | Priorytet |
|---|---------|--------|-----------|-----------|
| 1 | **Size Chart** (modal popup) | Najczęstsze DIY zapytania na PDP | $15–30/mies. | 🔴 HIGH |
| 2 | **Product Tabs / Description Tabs** | FAQ + size chart + opis w zakładkach | $10–25/mies. | 🔴 HIGH |
| 3 | **FAQ Accordion + SEO Schema** | Google FAQ schema = SEO bonus, top szukane | $10–20/mies. | 🔴 HIGH |
| 4 | **Before/After Image Slider** | Beauty/fashion/skincare, CSS+JS | $15–30/mies. | 🟡 MEDIUM |
| 5 | **Testimonials Section** | Natywna alternatywa Loox/Yotpo | $30–50/mies. | 🟡 MEDIUM |
| 6 | **Quick Add na Collection Page** | Częste pytania w Shopify Community | brak natywnego | 🟡 MEDIUM |
| 7 | **Shoppable Video Section** | Trend 2025–2026, TikTok-style | $30–80/mies. | 🟡 MEDIUM |

> **Kluczowy insight:** Merchantów boli koszt aplikacji — płacą $100–300/mies. za 3–5 apek które SnippetsHub może zastąpić jednorazową płatnością. To najsilniejszy argument sprzedażowy.

---

## Rekomendowany next step

```
SPRINT 1 — Monetyzacja tego co mamy (1–2 tygodnie)
─────────────────────────────────────────────────
1. Napisz opisy HTML dla 9 snippetów z ready           ← Claude Code
   Kolejność: cart-drawer → free-shipping-bar → trust-badges → exit-popup
2. Zrób ZIP każdego snippetu                           ← skrypt lub ręcznie
3. Wystaw 3–5 produktów na Shopify                     ← Shopify Admin
4. Nagraj wideo tutoriale                              ← ręcznie (Loom/OBS)

SPRINT 2 — Nowe snippety z researchu (2–4 tygodnie)
─────────────────────────────────────────────────────
5. Zbuduj: Size Chart, Product Tabs, FAQ Accordion     ← Claude Code
   (najwyższy popyt wg community research 2026-06-01)
6. Zrób review pozostałych snippets-list-todo          ← Claude Code

SPRINT 3 — Bundle i skalowanie
────────────────────────────────
7. Złóż 3 Bundle produkty w Shopify Admin              ← Shopify Admin
8. Powtórz community research                          ← Claude Code (co 2–4 tygodnie)
   Komenda: "zrób community research dla SnippetsHub"
```
