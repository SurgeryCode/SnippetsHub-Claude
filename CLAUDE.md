# SnippetsHub — Claude Code Context
**Wersja:** 2.0 | **Aktualizacja:** 2026-06-07

Jesteś agentem Claude Code pracującym dla sklepu **SnippetsHub** (https://snippetshub.com).

## Kolejność startu (OBOWIĄZKOWA)

1. Przeczytaj **`STATUS.md`** — aktualny stan projektu (snippety, sprint, log). Nie analizuj folderów — wszystko jest tam.
2. Przeczytaj **ten plik (CLAUDE.md)** — konwencje, brand voice, jak pracować.
3. Zacznij pracę.

## Zasady aktualizacji STATUS.md (OBOWIĄZKOWE)

Aktualizuj `STATUS.md` **po każdej sesji pracy** zanim skończysz. Nigdy nie kończ sesji bez aktualizacji jeśli coś się zmieniło.

| Zdarzenie | Co zaktualizować w STATUS.md |
|-----------|------------------------------|
| Snippet wystawiony w Shopify | Zmień `❌` → `✅` w kolumnie "Live w Shopify" |
| Nowy snippet zbudowany | Dodaj wiersz do tabeli ready/ lub todo/ |
| Opis HTML napisany | Zmień `❌` → `✅` w kolumnie "Opis HTML"; dodaj do listy descriptions/ |
| ZIP snippetu gotowy | Zmień `❓` → `✅` w kolumnie "ZIP" |
| Motyw testowy dodany | Dodaj wiersz do tabeli "Motywy testowe" |
| Koniec każdej sesji | Dodaj wiersz do "Log sesji" (data + co zrobiono, 1-2 zdania) |

**Format daty:** YYYY-MM-DD
**Log sesji:** jedna linia, konkretnie — "Wystawiono cart-drawer i free-shipping-bar w Shopify. Napisano opis HTML dla trust-badges."

---

## Kim jest SnippetsHub

SnippetsHub to Shopify marketplace sprzedający **premium snippety kodu** (HTML, CSS, Vanilla JS, Liquid) oraz **usługi dewelopera** (Senior Shopify Developer by the Hour). Snippety to gotowe "copy and paste" rozwiązania dla właścicieli sklepów Shopify — zoptymalizowane pod konwersję, wydajność i szybkie wdrożenie.

| Atrybut | Wartość |
|---|---|
| URL | https://snippetshub.com |
| Shopify store ID | snippetshubdev.myshopify.com |
| Platforma sklepu | Shopify Online Store 2.0 |
| Waluta bazowa | PLN (obsługa 30+ walut) |
| Język sklepu | Angielski (EN) |
| Rynek docelowy | Globalny (głównie Europa + USA) |
| Tagline | *"Shopify Code & Expert Hands."* |
| Etap | MVP — aktywna sprzedaż, skalowanie katalogu |
| Zespół | 1 osoba (senior Shopify developer, 10+ lat doświadczenia) |

---

## Struktura projektu (ten folder = jedno źródło prawdy)

```
SnippetsHub/                    ← ROOT — otwierasz to w Claude Code
├── CLAUDE.md                   ← Jesteś tutaj. Kontekst całego projektu.
├── SESSION.md                  ← Aktualny sprint. Co robimy dziś. Przeczytaj po CLAUDE.md.
├── .claude/
│   └── settings.local.json    ← Uprawnienia Claude Code
├── docs/                      ← Cała wiedza biznesowa i techniczna
│   ├── BRAND_VOICE.md         ← Tone of voice, słownictwo, przykłady
│   ├── PERSONAS.md            ← 3 persony klientów z obiekcjami
│   ├── PRODUCTS_CATALOG.md    ← Aktualny katalog, ceny, szablony
│   ├── PRODUCT_ROADMAP.md     ← Planowane snippety, briefingi, strategia
│   ├── PRODUCT_DESCRIPTION_TEMPLATES.md  ← Szablony A–G do opisów
│   ├── ITERATION_SUMMARY.md   ← Aktualny stan + next steps (aktualizuj po sprincie)
│   ├── RESEARCH_PROTOCOL.md   ← Protokół community research
│   ├── PRICING_STRATEGY.md    ← Strategia cenowa, kody rabatowe
│   ├── TIER_MARKETS_PRICING.md ← Ceny per rynek/tier
│   ├── SNIPPET_STANDARD.md    ← Standard techniczny każdego snippetu
│   ├── DEPLOY_SNIPPET.md      ← Komendy do buildowania i deployowania
│   └── products_export.csv    ← Live export z Shopify (ground truth)
├── HTML-clear-ideas/          ← Warsztat szablonów: HTML/CSS → JS → Shopify (3 iteracje)
│   ├── CLAUDE.md              ← Context workspace'u i flow iteracji
│   ├── STATUS.md              ← Index wszystkich projektów + etap każdego
│   └── _TEMPLATE/             ← Kopiuj dla każdego nowego projektu
│       ├── CLAUDE.md, STATUS.md, PRD.md
│       ├── index.html, style.css, script.js
│       └── description.html
├── design/                    ← Pre-produkcja: Figma → Design System → GTM
│   ├── DESIGN_SYSTEM.md       ← Index zasobów designu, linki Figma, MVC workflow
│   ├── system/
│   │   ├── tokens/            ← Tokeny z Figma Variables (colors, typography, spacing)
│   │   └── code-connect/      ← .figma.ts mappings → Liquid/CSS (Figma Code Connect)
│   ├── snippets/              ← Pre-prod workspace per snippet
│   │   └── {snh-slug}/
│   │       ├── PRD.md         ← Wymagania + tech spec + GTM decyzje
│   │       ├── figma.md       ← Linki do Figma frames + tokeny
│   │       └── exports/       ← Assets wyeksportowane z Figma
│   └── gtm/                   ← Launch checklisty przed wystawieniem w Shopify
│       └── {snh-slug}-LAUNCH.md
├── workflow/                  ← Szablony pracy projektowej
│   ├── PRD_LITE_TEMPLATE_PL.md
│   ├── DELIVERY_CHECKLIST.md
│   └── MASTER_PROMPT_PL.md
├── snippets/
│   ├── ready/                 ← 12 gotowych snippetów (produkcja)
│   │   ├── snippetshub-countdown-bar/
│   │   ├── snippetshub-sticky-add-to-cart-bar/
│   │   ├── snippetshub-announcement-bar/
│   │   ├── snippetshub-free-shipping-bar/
│   │   ├── snippetshub-trust-badges/
│   │   ├── snippetshub-recently-viewed/
│   │   ├── snippetshub-exit-intent-popup/
│   │   ├── snippetshub-cart-drawer/
│   │   ├── snippetshub-cart-drawer-recommendations/
│   │   ├── snippetshub-product-bundle-builder/
│   │   ├── snippetshub-upsell-cross-sell/
│   │   └── snippetshub-back-in-stock/
│   └── todo/                  ← Snippety w trakcie + backlog
├── descriptions/              ← 15 gotowych opisów HTML do Shopify Admin
│   └── snh-*-description.html
├── themes/
│   ├── THEMES.md              ← Index motywów (aktualizuj przy dodaniu)
│   ├── production/            ← Live theme snippetshub.com — 449 plików (REFERENCJA)
│   └── development/           ← Motywy testowe (dodawaj tu)
├── policies/                  ← Dokumenty prawne PL/EN
├── tools/                     ← Skrypty CLI Node.js
│   ├── create-snippet.js      ← Tworzy nowy snippet z szablonu
│   ├── build-snippet.js       ← Buduje ZIP jednego snippetu
│   ├── build-all.js           ← Buduje wszystkie snippety
│   └── deploy-snippet-to-themes.js ← Deploy do motywów testowych
└── materials/                 ← Materiały brandowe
```

---

## Aktywne produkty w sklepie (snippetshub.com)

| Produkt | Cena | Status |
|---|---|---|
| Countdown Bar | 108 PLN (145 PLN reg.) | ✅ Aktywny |
| Shopify Developer by the Hour | 186 PLN/h (260 PLN reg.) | ✅ Aktywny |

**15 snippetów gotowych technicznie, czekają na wystawienie w Shopify** — patrz `docs/ITERATION_SUMMARY.md`.

---

## Kategorie produktów (Shopify Collections)

| Slug | Nazwa |
|---|---|
| `hero-sections` | Hero Sections |
| `product-pages` | Product Pages |
| `carts` | Carts (Drawer) |
| `popups-bars` | Popups & Bars |
| `checkout` | Checkout |
| `bundles` | Bundles |

---

## Roadmapa Q3 2026 — priorytety

### TIER 1 (buduj najpierw)
| Snippet | Kategoria | Status |
|---|---|---|
| Sticky Add to Cart Bar | product-pages | ✅ READY |
| Free Shipping Progress Bar | carts | ✅ READY |
| Trust Badges Section | product-pages | ✅ READY |
| Announcement Bar | hero-sections | ✅ READY |
| Cart Drawer with Recommendations | carts | ✅ READY |

### TIER 2 (konwersja i AOV)
| Snippet | Kategoria | Status |
|---|---|---|
| Product Bundle Builder | bundles | ✅ READY |
| Back in Stock Email Capture | popups-bars | ✅ READY |
| Exit Intent Popup | popups-bars | ✅ READY |
| Upsell Cross-sell Section | product-pages | ✅ READY |
| Recently Viewed Products | product-pages | ✅ READY |

### TIER 3 (zbudowane)
| Snippet | Kategoria | Status |
|---|---|---|
| Checkout Order Bump | checkout | ✅ Opis HTML gotowy |
| Post-Purchase Upsell Page | checkout | ✅ Opis HTML gotowy |
| Mega Menu Section | hero-sections | ✅ Opis HTML gotowy |

---

## Tone of Voice — OBOWIĄZKOWE

SnippetsHub to **doświadczony senior developer** mówiący językiem właścicieli sklepów. Zero hype. Każde zdanie ma cel sprzedażowy.

| Cecha | TAK ✅ | NIE ❌ |
|---|---|---|
| Profesjonalny | "Built for Shopify Online Store 2.0" | "Fajny snippet do sklepu" |
| Konkretny | "108 PLN. Single site. Instant download." | "Przystępna cena" |
| Konwersja-focused | "Turn visitors into buyers" | "Może pomoże w sprzedaży" |
| Prosty technicznie | "Copy, paste, done." | Żargon bez wyjaśnienia |
| Pewny siebie | "A confident choice for your store" | "Staramy się zapewnić jakość" |
| Bez hype | "Clean, optimized, conversion-focused" | "NAJLEPSZY snippet na rynku!!!" |

**Słowa kluczowe:** `conversion-focused` `optimized` `lightweight` `Shopify Online Store 2.0` `Liquid` `Vanilla JS` `instant download` `no app bloat` `copy and paste` `turn visitors into buyers` `seamless integration` `zero dependencies`

---

## Klienci docelowi

### Persona 1 — "The Non-Technical Merchant" (Marek, 32–45 lat)
Właściciel sklepu, nie programuje. Chce "copy and paste", video tutorial, Expert Install, gwarancję.
**Komunikat:** *"No coding required. Step-by-step video tutorial included. We'll implement it in 24h."*

### Persona 2 — "The Shopify Agency Developer" (Anna, 25–35 lat)
Developer w agencji, zna Liquid/JS/CSS. Chce czystego kodu, code preview, licencji multi-site.
**Komunikat:** *"Clean Vanilla JS. Zero dependencies. Shopify 2.0 compatible. Lifetime updates."*

### Persona 3 — "The Growing Brand" (Tomasz, 28–42 lat)
E-commerce manager. Chce konkretnych rozwiązań, szybkich wyników.
**Komunikat:** *"Professional store look for a fraction of agency prices. Trusted by teams."*

---

## Kluczowe USP

- Lightweight code — zero app bloat
- Shopify Online Store 2.0 compatible
- Instant download after purchase
- Step-by-step video tutorial included
- 14-Day Satisfaction Guarantee
- Expert Install option (24h turnaround, 186 PLN/h)
- One-time payment, lifetime updates

---

## Konwencje kodu (ZAWSZE przestrzegaj)

### Struktura plików nowego snippetu
```
snippets/ready/{snh-nazwa-snippetu}/
├── README.md           ← Instalacja, use cases, wymagania
├── manifest.json       ← Metadane snippetu
├── LICENSE.md
├── sections/
│   └── snh-{nazwa}.liquid
├── snippets/
│   └── snh-{nazwa}.liquid   (jeśli potrzebne)
└── assets/
    ├── snh-{nazwa}.css
    └── snh-{nazwa}.js
```

### Konwencja nazw
- Prefix: `snh-` (wymagany)
- Format: `snh-{feature-name}.liquid`, `snh-{feature-name}.css`, `snh-{feature-name}.js`
- Kebab-case, zawsze lowercase

### manifest.json
```json
{
  "name": "Snippet Name for Shopify",
  "slug": "snh-snippet-handle",
  "category": "product-pages",
  "version": "1.0.0",
  "owner": "SnippetsHub",
  "license": "single-site",
  "supportEmail": "support@snippetshub.com",
  "technologies": ["CSS", "HTML", "JS", "Liquid"],
  "shopify_os2": true
}
```

### Liquid / CSS / JS
- Sekcje zgodne z **Shopify Online Store 2.0** (schema JSON)
- Wrapper z klasami: `.SnippetsHub` + `.SNH-{slug}`
- Custom properties CSS: `--snh-*`
- Vanilla JS only — zero zewnętrznych bibliotek
- Prefix eventów: `snh:` (np. `snh:cartUpdate`)
- CSS zawsze scoped do `.SnippetsHub`

---

## Format opisu produktu — Szablon A

```
[NAZWA SNIPPETU] for Shopify [BENEFIT STATEMENT]

SnippetsHub [NAZWA] is a [OPIS] for Shopify, designed to [GŁÓWNY CEL].
It is perfect for [USE CASE 1], [USE CASE 2], [USE CASE 3], and [USE CASE 4].

With [KLUCZOWA CECHA], you can easily customize the [ELEMENTY] to match your
store's branding. The snippet supports [MOŻLIWOŚCI], stays lightweight without
adding app bloat, and integrates smoothly with modern Shopify Online Store 2.0 themes.

This solution is built to support real ecommerce growth by [BENEFIT 1],
[BENEFIT 2], and [BENEFIT 3]. If you want a polished conversion-focused feature
that looks professional, works reliably, and gives you full control,
[NAZWA] is a confident choice for your Shopify store.

Note: Highly customized or legacy themes may require minor style/markup adjustments.
```

**Nazwa produktu:** `[Feature] for Shopify That [Action Verb] [Benefit]`

---

## Cennik

| Wariant | Cena PLN | Cena USD (premium) |
|---|---|---|
| Single Site License | 108 PLN (145 reg.) | $49 |
| 5 Sites License | — | $129 |
| Unlimited Sites License | — | $299 |
| Developer by the Hour | 186 PLN/h (260 reg.) | — |

**Kody rabatowe:** `LAUNCH20` (-20%), `AGENCY30` (-30%), `EARLY40` (-40% limit 30 klientów)

---

## Typowe komendy pracy

```bash
# Nowy snippet
npm run create-snippet -- --name "Nazwa" --slug snh-slug

# Build ZIP jednego snippetu
npm run build -- snh-slug

# Build wszystkich snippetów
npm run build:all

# Deploy do motywy testowe
npm run deploy:themes -- snippetshub-slug dawn-v10

# Push live theme
shopify theme push --store snippetshubdev.myshopify.com --theme 186465550709

# Push dev theme
shopify theme push --store snippetshubdev.myshopify.com --theme 186471678325
```

---

## Design Workflow — Figma → Snippet → GTM

### MVC z Figmy (kolejność pracy)

```
1. DESIGN (Figma)
   → Narysuj snippet w Figma, użyj komponentów SNH/* i tokenów snh/*

2. MODEL (design/system/tokens/)
   → Tokeny Figma Variables → colors.json / typography.json / spacing.json
   → Mapują się na CSS --snh-* custom properties

3. VIEW (design/snippets/{slug}/)
   → Utwórz PRD.md (kopiuj z design/snippets/_TEMPLATE/PRD.md)
   → Utwórz figma.md z linkami do frames
   → Eksportuj assets do exports/

4. CODE CONNECT (design/system/code-connect/)
   → Opcjonalnie: utwórz snh-{slug}.figma.ts dla komponentu

5. BUILD (snippets/ready/{slug}/)
   → Zbuduj snippet wg konwencji kodu (patrz sekcja poniżej)
   → Użyj tokenów z design/system/tokens/ jako --snh-* CSS vars

6. GTM (design/gtm/{slug}-LAUNCH.md)
   → Wypełnij launch checklist
   → Przygotuj ZIP, screenshots, opis HTML
   → Wystaw w Shopify Admin
```

### Tworzenie PRD dla nowego snippetu
1. Skopiuj `design/snippets/_TEMPLATE/` → `design/snippets/snh-{slug}/`
2. Wypełnij `PRD.md` — problem, use cases, tech spec, GTM
3. Wypełnij `figma.md` — linki do Figma frames
4. Po zakończeniu designu: eksportuj assets do `exports/`

### Launch checklist
1. Skopiuj `design/gtm/_TEMPLATE-LAUNCH.md` → `design/gtm/snh-{slug}-LAUNCH.md`
2. Przejdź przez checklistę punkt po punkcie
3. Po wystawieniu zaktualizuj STATUS.md

---

## Jak pracować z projektem

### Tworzenie nowego snippetu
1. Sprawdź `docs/PRODUCT_ROADMAP.md` — który snippet następny (TIER 1 → TIER 2)
2. Utwórz folder `snippets/ready/{snh-nazwa}/` (lub `todo/` jeśli WIP)
3. Zbuduj snippet zgodnie z konwencjami powyżej
4. Napisz `README.md` z instrukcją instalacji
5. Zapisz opis HTML w `descriptions/{snh-slug}-description.html`

### Pisanie opisu produktu
1. Przeczytaj brief z `docs/PRODUCTS_CATALOG.md` lub z rozmowy
2. Użyj Szablonu A z sekcji powyżej
3. Zachowaj Brand Voice (konkretny, bez hype, po angielsku)
4. Zapisz HTML w `descriptions/`

### Wystawianie snippetu w Shopify Admin
1. Shopify Admin → Products → Add product
2. Tytuł = pierwsza linia opisu HTML (h2)
3. Wklej zawartość `descriptions/{snh-slug}-description.html`
4. Cena: 108 PLN Single Site / 145 PLN regularna
5. Dodaj ZIP jako digital download
6. Przypisz do kolekcji

### Community research
Powiedz: **"zrób community research dla SnippetsHub"** — Claude przeszuka Reddit, Shopify Community, YouTube, App Store i zwróci nowe pomysły na snippety.

---

## Pliki referencyjne (docs/)

| Plik | Zawartość |
|---|---|
| `docs/BRAND_VOICE.md` | Pełny tone of voice, słownictwo, przykłady |
| `docs/PERSONAS.md` | 3 persony klientów z obiekcjami |
| `docs/PRODUCTS_CATALOG.md` | Aktualny katalog produktów, ceny |
| `docs/PRODUCT_ROADMAP.md` | Planowane snippety, briefingi |
| `docs/PRODUCT_DESCRIPTION_TEMPLATES.md` | Szablony A–G do opisów |
| `docs/ITERATION_SUMMARY.md` | Aktualny stan projektu + next steps |
| `docs/SNIPPET_STANDARD.md` | Pełny standard techniczny |
| `docs/DEPLOY_SNIPPET.md` | Komendy build/deploy |
| `docs/PRICING_STRATEGY.md` | Strategia cenowa |
| `docs/products_export.csv` | Live export z Shopify — ground truth |
| `themes/production/` | Live theme snippetshub.com — referencja |
| `themes/THEMES.md` | Index motywów testowych |

---

*Aktualizuj CLAUDE.md i docs/ITERATION_SUMMARY.md przy każdej zmianie oferty, cen lub strategii.*
*Aktualizuj SESSION.md na początku i końcu każdej sesji roboczej.*
