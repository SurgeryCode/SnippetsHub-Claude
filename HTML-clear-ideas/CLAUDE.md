# HTML-clear-ideas — Claude Code Context
**Wersja:** 2.0 | **Aktualizacja:** 2026-06-14

Workspace do budowania szablonów HTML/CSS/JS w trzech iteracjach → dwa produkty SnippetsHub.

---

## Kolejność startu (OBOWIĄZKOWA)

### Praca na poziomie workspace (nowy projekt, przegląd stanu)

1. **`CLAUDE.md`** ← ten plik (już czytasz) — brand voice, persony, cennik, flow
2. **`STATUS.md`** ← jakie projekty istnieją i na jakim etapie każdy

### Praca na konkretnym projekcie `{slug}/`

1. **`{slug}/CLAUDE.md`** ← cel projektu, slug, iteracja aktualna, linki
2. **`{slug}/STATUS.md`** ← checklisty v1/v2/v3, todo, log sesji
3. **`{slug}/PRD.md`** ← wymagania, persony, tech spec, GTM

Pliki kodu (`index.html`, `style.css`, `script.js`, `description.html`) czytaj **tylko gdy faktycznie pracujesz nad kodem** — nie na starcie.

> Kontekst całego projektu SnippetsHub: [`../CLAUDE.md`](../CLAUDE.md)
> Specyfikacja techniczna kodu (prefiksy, tokeny, JS): [`SPEC.md`](SPEC.md)

---

## Zasady aktualizacji STATUS.md (OBOWIĄZKOWE)

Aktualizuj **główny `STATUS.md`** (ten folder) po każdej zmianie iteracji projektu.
Aktualizuj **`STATUS.md` projektu** po każdej sesji pracy.

| Zdarzenie | Co zaktualizować |
|-----------|-----------------|
| Ukończono iterację v1 | Zmień `❌` → `✅` w kolumnie "v1 HTML+CSS" |
| Ukończono iterację v2 | Zmień `❌` → `✅` w kolumnie "v2 JS+Anim" |
| ZIP HTML Template gotowy | Zmień `❌` → `✅` w kolumnie "ZIP HTML" |
| Ukończono v3 Shopify | Zmień `❌` → `✅` w kolumnie "v3 Shopify" |
| Opis HTML napisany | Zmień `❌` → `✅` w kolumnie "Opis HTML" |
| Koniec sesji | Dodaj wiersz do "Log sesji" w STATUS.md projektu |

**Format daty:** YYYY-MM-DD

---

## Czym jest ten workspace

`HTML-clear-ideas/` to pre-produkcyjny warsztat. Każdy podfolder = jeden projekt (szablon).
Każdy projekt przechodzi przez 3 iteracje → **dwa produkty do sprzedaży**:

| Produkt | Źródło | Cena |
|---------|--------|------|
| **HTML Template** (czysty HTML/CSS/JS) | ZIP z v2-animated | niższa cena (TBD) |
| **Shopify Snippet** (Liquid) | v3 → `snippets/ready/snh-{slug}/` | 108 PLN / $49 |

---

## Flow iteracji (OBOWIĄZKOWY)

```
npm run create:idea -- --slug {slug} --name "{Nazwa}"
    ↓
Iteracja 1 — HTML + CSS
  Pliki: index.html + style.css
  Cel: semantyczny HTML, layout, kolory, typografia, mobile ready
  Done gdy: wygląda poprawnie w przeglądarce, 375px+

Iteracja 2 — Animacje + JS
  Pliki: + script.js, rozbudowane index.html + style.css
  Cel: interakcje, animacje, logika JS
  Done gdy: Chrome/Firefox/Safari OK, zero console errors
  → ZIP = produkt "HTML Template" do sprzedaży

Iteracja 3 — Shopify Integration
  Cel: index.html → Liquid section, CSS/JS → assets
  Output: ../snippets/ready/snh-{slug}/
  → ZIP = produkt "Shopify Snippet" do sprzedaży
```

---

## Tone of Voice — OBOWIĄZKOWE

SnippetsHub to **doświadczony senior developer** mówiący językiem właścicieli sklepów.
Zero hype. Każde zdanie ma cel sprzedażowy. Wszystkie opisy piszemy **po angielsku**.

| Cecha | TAK ✅ | NIE ❌ |
|---|---|---|
| Profesjonalny | "Built for Shopify Online Store 2.0" | "Fajny szablon do sklepu" |
| Konkretny | "Copy, paste, done." | "Przystępna cena" |
| Konwersja-focused | "Turn visitors into buyers" | "Może pomoże w sprzedaży" |
| Prosty technicznie | "Vanilla JS. Zero dependencies." | Żargon bez wyjaśnienia |
| Pewny siebie | "A confident choice for your store" | "Staramy się zapewnić jakość" |
| Bez hype | "Clean, optimized, conversion-focused" | "NAJLEPSZY szablon na rynku!!!" |

**Słowa kluczowe:**
`conversion-focused` `optimized` `lightweight` `Shopify Online Store 2.0`
`Vanilla JS` `instant download` `no app bloat` `copy and paste`
`turn visitors into buyers` `seamless integration` `zero dependencies`

---

## Klienci docelowi

### Persona 1 — "The Non-Technical Merchant" (Marek, 32–45 lat)
Właściciel sklepu, nie programuje. Chce "copy and paste", video tutorial, gwarancję.
**Komunikat:** *"No coding required. Step-by-step video tutorial included."*

### Persona 2 — "The Shopify Agency Developer" (Anna, 25–35 lat)
Developer w agencji, zna Liquid/JS/CSS. Chce czystego kodu, zero zależności.
**Komunikat:** *"Clean Vanilla JS. Zero dependencies. Shopify 2.0 compatible. Lifetime updates."*

### Persona 3 — "The Growing Brand" (Tomasz, 28–42 lat)
E-commerce manager. Chce konkretnych rozwiązań, szybkich wyników.
**Komunikat:** *"Professional store look for a fraction of agency prices."*

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

## Format opisu produktu

### Szablon A — Shopify Snippet (v3)

```
[NAZWA] for Shopify That [ACTION VERB] [BENEFIT]

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

### Szablon B — HTML Template (v2)

```
[NAZWA] HTML Template — [BENEFIT STATEMENT]

A clean, lightweight HTML/CSS/JS template for [OPIS ZASTOSOWANIA].
No frameworks, no dependencies — just copy, paste, and customize.

[KLUCZOWA CECHA] lets you easily adapt the [ELEMENTY] to match any brand.
Built with semantic HTML, scoped CSS custom properties, and Vanilla JS.
Works in all modern browsers. Mobile responsive out of the box.

Perfect for [USE CASE 1], [USE CASE 2], and [USE CASE 3].
Ready to drop into any project or adapt to Shopify with minimal effort.

What's included: index.html, style.css, script.js, README with installation guide.
```

**Nazwa produktu:** `[Feature] HTML Template — [Short Benefit]`

---

## Cennik

| Produkt | Wariant | Cena PLN | Cena USD |
|---------|---------|----------|----------|
| Shopify Snippet | Single Site | 108 PLN (145 reg.) | $49 |
| Shopify Snippet | 5 Sites | — | $129 |
| Shopify Snippet | Unlimited | — | $299 |
| HTML Template | Single | TBD | TBD |
| Developer by the Hour | — | 186 PLN/h (260 reg.) | — |

**Kody rabatowe:** `LAUNCH20` (-20%) `AGENCY30` (-30%) `EARLY40` (-40%, limit 30)

---

## Konwencje kodu

Pełna specyfikacja: **[`SPEC.md`](SPEC.md)**

| Co szukasz | Gdzie w SPEC.md |
|------------|----------------|
| Prefiksy klas CSS (`hci-` → `snh-`) | "Prefiksy per iteracja" |
| Tokeny CSS (`--hci-*`) | "Tokeny CSS" |
| Wzorzec JS IIFE + eventy | "Struktura JS" / "Custom Events JS" |
| Konwersja v2 → v3 Shopify | "Konwersja cheat sheet" |

---

## Struktura projektu

```
HTML-clear-ideas/
├── CLAUDE.md              ← Ten plik — kontekst, brand, jak pisać
├── SPEC.md                ← Specyfikacja techniczna kodu
├── STATUS.md              ← Index wszystkich projektów
├── _TEMPLATE/             ← Kopiuj dla nowego projektu
└── {slug}/                ← Aktywne projekty
    ├── CLAUDE.md          ← Kontekst projektu (slug, iteracja, linki)
    ├── STATUS.md          ← Checklisty v1/v2/v3
    ├── PRD.md             ← Wymagania + GTM
    ├── index.html
    ├── style.css
    ├── script.js          ← Dodajesz w iteracji v2
    └── description.html   ← Opis produktu do Shopify Admin
```

---

## Komendy pracy

```bash
# Nowy projekt (kopiuje _TEMPLATE + ustawia slug/name automatycznie)
npm run create:idea -- --slug cart-drawer
npm run create:idea -- --slug cart-drawer --name "Cart Drawer"
```

---

## Jak pisać opis produktu (description.html)

1. Ustal czy piszesz dla **HTML Template** (Szablon B) czy **Shopify Snippet** (Szablon A)
2. Wypełnij szablon z sekcji powyżej — konkretnie, bez hype
3. Zachowaj Brand Voice: angielski, conversion-focused, zero pustych słów
4. Zapisz w `{slug}/description.html`

---

## Jak pisać PRD.md

1. Zacznij od jednego zdania — jaki **problem** rozwiązuje ten template
2. Wypełnij use cases per persona (Marek / Anna / Tomasz)
3. Zdefiniuj wymagania funkcjonalne per iteracja (v1 / v2 / v3)
4. Wypełnij sekcję GTM — tytuł produktu, cena, kolekcja
5. Użyj `_TEMPLATE/PRD.md` jako startowego szablonu
