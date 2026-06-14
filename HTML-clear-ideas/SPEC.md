# HTML-clear-ideas — Specyfikacja Techniczna
**Wersja:** 1.0 | **Aktualizacja:** 2026-06-14

Jedyne źródło prawdy dla konwencji kodu w tym workspace'ie.
Wszystkie pliki projektu (`CLAUDE.md`, `PRD.md`, `index.html`, `style.css`, `script.js`) stosują tę specyfikację.

---

## Prefiksy — per iteracja

| Iteracja | Prefix klas CSS | Prefix tokenów CSS | Prefix eventów JS | Gdzie żyje |
|----------|-----------------|--------------------|-------------------|------------|
| v1 HTML+CSS | `hci-{slug}` | `--hci-` | — | `HTML-clear-ideas/{slug}/` |
| v2 JS+Animacje | `hci-{slug}` | `--hci-` | `hci:{slug}:` | `HTML-clear-ideas/{slug}/` |
| v3 Shopify | `SNH-snh-{slug}` | `--snh-` | `snh:{slug}:` | `snippets/ready/snh-{slug}/` |

**`{slug}`** = nazwa folderu projektu (kebab-case, np. `cart-drawer`, `countdown-bar`).
Skrypt `npm run create:idea` ustawia go automatycznie.

---

## Konwencja klas CSS (BEM-inspired)

```css
/* Wrapper root — zawiera wszystkie tokeny */
.hci-{slug} { }

/* Elementy */
.hci-{slug}__inner   { }
.hci-{slug}__heading { }
.hci-{slug}__text    { }
.hci-{slug}__btn     { }
.hci-{slug}__item    { }
.hci-{slug}__icon    { }

/* Modyfikatory stanów */
.hci-{slug}--active  { }
.hci-{slug}--visible { }
.hci-{slug}--open    { }
.hci-{slug}--closed  { }
```

**Zasady:**
- Tylko jeden root wrapper `.hci-{slug}` — wszystkie style scoped wewnątrz
- BEM: blok `hci-{slug}`, element `__`, modyfikator `--`
- Żadnych globalnych klas bez prefixu `hci-`

---

## Tokeny CSS (Custom Properties)

Tokeny definiujesz na root wrapperze `.hci-{slug} { }`:

```css
/* Kolory */
--hci-color-primary:    #000000;
--hci-color-surface:    #ffffff;
--hci-color-text:       #111111;
--hci-color-text-muted: #666666;
--hci-color-border:     #e5e5e5;
--hci-color-accent:     #e63a00;   /* urgency — countdown, sale */
--hci-color-success:    #2d7a2d;   /* free shipping reached */

/* Typografia */
--hci-font-size-sm:  13px;
--hci-font-size-md:  15px;
--hci-font-size-lg:  18px;
--hci-font-size-xl:  22px;
--hci-font-weight-regular: 400;
--hci-font-weight-bold:    700;
--hci-line-height:   1.5;

/* Spacing */
--hci-space-xs:  4px;
--hci-space-sm:  8px;
--hci-space-md:  16px;
--hci-space-lg:  24px;
--hci-space-xl:  40px;

/* Border radius */
--hci-radius-sm:   4px;
--hci-radius-md:   8px;
--hci-radius-full: 9999px;

/* Transitions */
--hci-transition: 0.2s ease;
```

Tokeny specyficzne dla projektu dodajesz z prefixem `--hci-{slug}-*`:
```css
--hci-cart-drawer-width: 420px;
--hci-countdown-bar-height: 48px;
```

---

## Struktura JS

**Pattern:** IIFE (Immediately Invoked Function Expression)

```javascript
(function () {
  'use strict';

  const SELECTORS = {
    root: '.hci-{slug}',
    // ...
  };

  const CLASSES = {
    active:  'hci-{slug}--active',
    visible: 'hci-{slug}--visible',
  };

  function init() {
    const root = document.querySelector(SELECTORS.root);
    if (!root) return;
    // ...
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

**Zasady:**
- Vanilla JS only — zero zewnętrznych bibliotek
- Jeden IIFE per plik
- Sprawdzaj `if (!root) return` — graceful degradation
- Używaj `const` / `let`, nigdy `var`

---

## Custom Events JS

```javascript
/* Emitowanie */
document.dispatchEvent(new CustomEvent('hci:{slug}:open',   { detail: { ... }, bubbles: true }));
document.dispatchEvent(new CustomEvent('hci:{slug}:close',  { detail: { ... }, bubbles: true }));
document.dispatchEvent(new CustomEvent('hci:{slug}:toggle', { detail: { isActive }, bubbles: true }));

/* Nasłuchiwanie (z innego miejsca) */
document.addEventListener('hci:{slug}:open', (e) => { ... });
```

Format: `hci:{slug}:{akcja}` (lowercase, bez spacji)

---

## Struktura plików projektu

```
HTML-clear-ideas/{slug}/
├── CLAUDE.md         ← "Slug: {slug} | Link do SPEC.md"
├── STATUS.md         ← checklisty v1/v2/v3
├── PRD.md            ← wymagania + GTM
├── index.html        ← klasy hci-{slug}__*
├── style.css         ← --hci-* tokens, .hci-{slug} scoped
├── script.js         ← IIFE, hci:{slug}: events (v2)
└── description.html  ← opis produktu Shopify
```

---

## Konwersja v2 → v3 Shopify (cheat sheet)

| v2 (HTML) | v3 (Shopify Liquid) |
|-----------|---------------------|
| `hci-{slug}` klasa | `SNH-snh-{slug}` klasa |
| `--hci-*` tokeny | `--snh-*` tokeny |
| `hci:{slug}:*` eventy | `snh:{slug}:*` eventy |
| `index.html` | `sections/snh-{slug}.liquid` |
| `style.css` | `assets/snh-{slug}.css` |
| `script.js` | `assets/snh-{slug}.js` |
| hardcoded tekst | `{{ section.settings.* }}` |
| hardcoded kolory | schema `color` settings |

Output v3 → `snippets/ready/snh-{slug}/` w głównym projekcie SnippetsHub.
