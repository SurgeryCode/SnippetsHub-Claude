# Testowy Landing Page — PRD
**Slug:** `cart-drawer`
**Kategoria SnippetsHub:** `product-pages | carts | popups-bars | hero-sections | checkout | bundles`
**Data:** YYYY-MM-DD

> Konwencje kodu, prefiksy, tokeny: [`SPEC.md`](../SPEC.md)

---

## Problem

> Jedno zdanie: co merchant / developer traci bez tego szablonu?

---

## Use Cases

- **Marek (non-tech merchant):** *(co chce osiągnąć)*
- **Anna (Shopify developer):** *(co chce osiągnąć)*
- **Tomasz (e-commerce manager):** *(co chce osiągnąć)*

---

## Wymagania funkcjonalne

### v1 — HTML + CSS
- [ ] *(element 1)*
- [ ] *(element 2)*

### v2 — JS + Animacje
- [ ] *(interakcja 1)*
- [ ] *(animacja 1)*

### v3 — Shopify
- [ ] *(schema setting 1)*
- [ ] *(schema setting 2)*

---

## Wymagania wizualne

- **Figma frame:** *(link)*
- **Referencja:** *(link do inspo)*
- **Tokeny:** `--hci-*` (v1/v2) → `--snh-*` (v3) — patrz SPEC.md

---

## Wymagania techniczne

Pełna specyfikacja: [`SPEC.md`](../SPEC.md)

**Pliki (v1/v2):**
- `index.html` — klasy: `.hci-cart-drawer`, `.hci-cart-drawer__element`
- `style.css` — tokeny: `--hci-cart-drawer-*`, scoped do `.hci-cart-drawer`
- `script.js` — IIFE pattern, eventy: `hci:cart-drawer:*`

**Shopify Schema settings (v3):**
```json
[
  { "type": "text",  "id": "heading",  "label": "Heading",           "default": "" },
  { "type": "color", "id": "bg_color", "label": "Background color",  "default": "#000000" }
]
```

---

## Acceptance Criteria

- [ ] Desktop (1440px, 1280px, 1024px) — OK
- [ ] Tablet (768px) — OK
- [ ] Mobile (390px, 375px) — OK
- [ ] Chrome, Firefox, Safari — zero errors
- [ ] Lighthouse Performance ≥ 95
- [ ] CSS scoped — zero wycieków poza `.hci-cart-drawer`

---

## Produkty do sprzedaży

### Produkt 1 — HTML Template (po v2)
- **Tytuł:** `Testowy Landing Page HTML Template — {Benefit}`
- **Cena:** *(do ustalenia)*
- **ZIP zawiera:** `index.html`, `style.css`, `script.js`, `README.md`

### Produkt 2 — Shopify Snippet (po v3)
- **Tytuł:** `Testowy Landing Page for Shopify That {Action Verb} {Benefit}`
- **Cena:** 108 PLN / $49
- **Kolekcja:** `{slug-kolekcji}`
- **Opis:** → `description.html`

---

## Notatki

*(Decyzje, edge cases, ograniczenia)*
