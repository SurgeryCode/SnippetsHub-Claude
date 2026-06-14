# {Snippet Name} — PRD
**Slug:** `snh-{slug}`
**Kategoria:** `{product-pages | carts | popups-bars | hero-sections | checkout | bundles}`
**Status:** `Draft | In Design | In Dev | Ready for GTM | Live`
**Data:** YYYY-MM-DD

---

## Problem

> Jedno zdanie: co merchant traci bez tego snippetu?

Przykład: "Merchants lose potential buyers who leave without completing purchase because there's no urgency trigger on the product page."

---

## Figma

- **File:** [SnippetsHub Snippets](figma.com/...) → Frame `{slug}/overview`
- **Desktop frame:** *(link)*
- **Mobile frame:** *(link)*
- **Component:** `SNH/{NazwaKomponentu}` w bibliotece

---

## Use Cases & Personas

| Persona | Potrzeba | Komunikat |
|---------|----------|-----------|
| Marek (non-tech) | Chce gotowe rozwiązanie bez kodowania | "Copy, paste, done. Video tutorial included." |
| Anna (developer) | Chce czysty kod, zero zależności | "Vanilla JS. Zero dependencies. Shopify 2.0." |
| Tomasz (brand) | Chce szybki efekt w sklepie | "Professional look, fraction of agency price." |

---

## Wymagania funkcjonalne

- [ ] *(funkcja 1)*
- [ ] *(funkcja 2)*
- [ ] *(funkcja 3)*

## Wymagania techniczne

**Pliki:**
- `sections/snh-{slug}.liquid`
- `assets/snh-{slug}.css`
- `assets/snh-{slug}.js`

**Shopify Schema settings:**
```json
[
  { "type": "text", "id": "heading", "label": "Heading", "default": "" },
  { "type": "color", "id": "bg_color", "label": "Background color", "default": "#000000" }
]
```

**CSS Variables:**
```css
--snh-{slug}-bg: var(--snh-color-primary);
--snh-{slug}-text: var(--snh-color-surface);
```

**JS Events:**
```javascript
// Emituje:
document.dispatchEvent(new CustomEvent('snh:{slug}:open'));
document.dispatchEvent(new CustomEvent('snh:{slug}:close'));
```

---

## Acceptance Criteria

**Responsywność:**
- [ ] Desktop (1440px, 1280px, 1024px)
- [ ] Tablet (768px)
- [ ] Mobile (375px, 390px)

**Motywy Shopify:**
- [ ] Dawn (latest)
- [ ] Refresh
- [ ] Sense
- [ ] Craft

**Jakość kodu:**
- [ ] Zero JS errors w console
- [ ] CSS scoped do `.SnippetsHub.SNH-{slug}`
- [ ] Lighthouse Performance ≥ 95 (bez snippetu baseline)
- [ ] Snippet nie ładuje żadnych zewnętrznych zasobów

---

## Go-to-Market

**Tytuł produktu:**
```
{Feature} for Shopify That {Action Verb} {Benefit}
```

**Cena:**
- Single Site: 108 PLN (regularna 145 PLN)
- USD: $49

**Kolekcja Shopify:** `{slug-kolekcji}`

**Tagi:** `{tag1}, {tag2}, {tag3}`

**Kod rabatowy na launch:** `LAUNCH20` (-20%)

**Opis HTML:** → `descriptions/snh-{slug}-description.html`

**Assets do produktu w Shopify:**
- [ ] ZIP snippetu (`snh-{slug}-v1.0.0.zip`)
- [ ] Screenshot produktu (1200×800px z Figma)
- [ ] Video tutorial (link Loom/YouTube)

---

## Notatki

*(Decyzje designowe, edge cases, rzeczy do zapamiętania)*
