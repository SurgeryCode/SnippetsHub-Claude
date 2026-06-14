# Testowy Landing Page — PRD

**Slug:** `testowy-landing-page`
**Kategoria SnippetsHub:** `product-pages | carts | popups-bars | hero-sections | checkout | bundles`
**Data:** YYYY-MM-DD

> Konwencje kodu, prefiksy, tokeny: [`SPEC.md`](../SPEC.md)

---

## Problem

> Jedno zdanie: co merchant / developer traci bez tego szablonu?

Landing page, merchant nie techniczny w łatwy sposób dodaje ladning page do swpjego sklepu, marchent w łatwy sposób buduje landin gpage na różne olazje.

---

## Use Cases

- **Marek (non-tech merchant):** chce zwiększyć konwersję sprzedaż
- **Anna (Shopify developer):** w łatwy sposób wgrywa, dodaje produkty, wystawia szablon live
- **Tomasz (e-commerce manager):** z jakiejś okazji np. dzień kobiet chce zwiększyć konwersją / sprzedaż jakiegoś produktu.

---

## Wymagania funkcjonalne

### v1 — HTML + CSS

- Tworzymy czysty HTML, CSS na podstawie projektu figmy
- [ ] _(element 2)_

### v2 — JS + Animacje

- [ ] _(interakcja 1)_
- [ ] _(animacja 1)_

### v3 — Shopify

- [ ] _(schema setting 1)_
- [ ] _(schema setting 2)_

---

## Wymagania wizualne

- **Figma frame:** Implement this design from Figma. @https://www.figma.com/design/HLU0euvkDkSqUfsZLURxJa/Trafalgar-Landing-Page--Community-?node-id=1-2&m=dev
- **Referencja:** brak
- **Tokeny:** `--hci-*` (v1/v2) → `--snh-*` (v3) — patrz SPEC.md

---

## Wymagania techniczne

Pełna specyfikacja: [`SPEC.md`](../SPEC.md)

**Pliki (v1/v2):**

- `index.html` — klasy: `.hci-testowy-landing-page`, `.hci-testowy-landing-page__element`
- `style.css` — tokeny: `--hci-testowy-landing-page-*`, scoped do `.hci-testowy-landing-page`
- `script.js` — IIFE pattern, eventy: `hci:testowy-landing-page:*`

**Shopify Schema settings (v3):**

```json
[
  { "type": "text", "id": "heading", "label": "Heading", "default": "" },
  {
    "type": "color",
    "id": "bg_color",
    "label": "Background color",
    "default": "#000000"
  }
]
```

---

## Acceptance Criteria

- [ ] Desktop (1440px, 1280px, 1024px) — OK
- [ ] Tablet (768px) — OK
- [ ] Mobile (390px, 375px) — OK
- [ ] Chrome, Firefox, Safari — zero errors
- [ ] Lighthouse Performance ≥ 95
- [ ] CSS scoped — zero wycieków poza `.hci-testowy-landing-page`

---

## Produkty do sprzedaży

### Produkt 1 — HTML Template (po v2)

- **Tytuł:** `Testowy Landing Page HTML Template — {Benefit}`
- **Cena:** _(do ustalenia)_
- **ZIP zawiera:** `index.html`, `style.css`, `script.js`, `README.md`

### Produkt 2 — Shopify Snippet (po v3)

- **Tytuł:** `Testowy Landing Page for Shopify That {Action Verb} {Benefit}`
- **Cena:** 108 PLN / $49
- **Kolekcja:** `{slug-kolekcji}`
- **Opis:** → `description.html`

---

## Notatki

_(Decyzje, edge cases, ograniczenia)_
