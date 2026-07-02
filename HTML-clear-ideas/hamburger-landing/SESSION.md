# Session Notes — hamburgery-landingpage

**Ostatnia sesja:** 2026-06-14  
**Plik roboczy:** `index.html`  
**Obraz źródłowy:** `images/hamburgery-landingpage_1_1200x3373.png` (1200×3373 RGBA PNG)

---

## Co zostało zrobione

Figma AI Export dostarczył tylko **jeden flat PNG** całej strony (brak osobnych assetów).  
Przebudowano całą stronę jako czysty, semantyczny HTML/CSS:

| Sekcja                                                          | Status  |
| --------------------------------------------------------------- | ------- |
| Header (sticky nav, logo, phone, CTA)                           | ✅ Done |
| Hero (amber bg, tytuł, gwiazdki, cena, ORDER NOW, 4 thumbnaile) | ✅ Done |
| Promo duet (Delivery / Join Us, 2-col grid)                     | ✅ Done |
| Category grid (2 wiersze × 3 kolumny, 6 kolorów)                | ✅ Done |
| Best Quality Ingredients (5-col, circular photos, badge)        | ✅ Done |
| Family section (dark overlay, duży italic tytuł, features)      | ✅ Done |
| CTA strip + Footer                                              | ✅ Done |

### Technika: CSS Sprite z flat image

Zamiast osobnych plików graficznych (których nie ma), każdy element wizualny używa:

```css
background-image: url("images/hamburgery-landingpage_1_1200x3373.png");
background-size: 1200px 3373px;
background-position: -X px -Y px; /* crop do konkretnej sekcji */
```

Klasy sprite w CSS:

- `.hero__visual` — burger w hero (right half, ok. y:70–575)
- `.promo__art--delivery` / `.promo__art--staff` — ilustracje promo
- `.cat-photo--burgers/salads/kids/desserts` — foto w kartach kategorii
- `.ing-photo--buns/beef/fresh/turkey` — składniki (okrągłe)
- `.family__bg` — tło sekcji Family (y≈1790)

---

## Do zrobienia teraz

✅ Chili rating — 5 papryczek między .badge a tytułem, aktywne/nieaktywne, label tekstowy
✅ Product description — paragraf pod h1, zmienia się ze sliderem
✅ Slider JS — klik na thumb przełącza: bgPos burgera, tytuł, opis, cenę, chili, wartości odżywcze
✅ Nutritional flags — 5 chorągiewek (clip-path pennant) na prawej krawędzi hero: 🔥 Kcal, 💪 Protein, ⚖️ Weight, 🥑 Fat, 🌾 Carbs

## Do zrobienia jutro

### Priorytet 1 — Dopracowanie sprite'ów

Pozycje `background-position` są **szacunkowe** (brak narzędzi do pomiaru pixeli z flat image).  
Należy otworzyć `index.html` w przeglądarce i sprawdzić każdy element:

```
[ ] hero__visual          — burger image (tło hero po prawej)
[ ] promo__art--delivery  — rowerzysta dostawczy (prawa strona lewej karty)
[ ] promo__art--staff     — pracownik w mundurze (prawa strona prawej karty)
[ ] cat-photo--burgers    — burger w karcie House Burgers
[ ] cat-photo--salads     — sałatka w karcie Fresh Salads
[ ] cat-photo--kids       — jedzenie w karcie For All Kids
[ ] cat-photo--desserts   — deser w karcie Sweet Desserts
[ ] ing-photo--buns       — bułka (składniki)
[ ] ing-photo--beef       — wołowina (składniki)
[ ] ing-photo--fresh      — świeże produkty (składniki)
[ ] ing-photo--turkey     — indyk (składniki)
[ ] family__bg            — tło sekcji Family
```

Jak korygować:

```css
/* W DevTools zmień background-position aż obraz "wskoczy" w odpowiednie miejsce */
.hero__visual {
  background-position: -594px -70px;
}
/*                                    ↑X      ↑Y   */
/* X = przesunięcie w lewo (jak daleko od lewej krawędzi flat image zaczyna się region) */
/* Y = przesunięcie w górę (jak głęboko w dół strony jest dany region) */
```

### Priorytet 2 — Responsive (mobile/tablet)

Strona jest zaprojektowana na 1200px. Brakuje breakpointów:

```css
@media (max-width: 768px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }
  .promo__grid {
    grid-template-columns: 1fr;
  }
  .cat-row {
    grid-template-columns: 1fr 1fr;
  }
  .ingredients__grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .family__inner {
    grid-template-columns: 1fr;
  }
  .hero__title {
    font-size: 44px;
  }
  .family__title {
    font-size: 64px;
  }
}
@media (max-width: 480px) {
  .cat-row {
    grid-template-columns: 1fr;
  }
  .hero__title {
    font-size: 36px;
  }
}
```

### Priorytet 3 — Interaktywność (JS)

- [ ] Thumbnail slider w hero (klik na `.hero__thumb` zmienia widok)
- [ ] Hamburger menu na mobile
- [ ] Smooth scroll (już jest: `scroll-behavior: smooth` na html)

### Priorytet 4 — Drobne szlify CSS

- [ ] Hover states na category cards (lekki scale lub brightness)
- [ ] Transition na `.hero__thumb` przy zmianie
- [ ] Drop shadow na `.btn` przy hover
- [ ] Animacja wejścia sekcji przy scroll (opcjonalnie: IntersectionObserver)

---

## Struktura pliku index.html

```
<header>        .site-header
<section>       .hero
<section>       .promo
<section>       .categories (#menu)
  <div>           .cat-row × 2
<section>       ingredients
<section>       .family (#about)
<div>           .cta-strip (#contact)
<footer>        .site-footer
```

## Kolory brandowe (CSS vars w :root)

```css
--green: #4cb85b --amber: #ffa800 --pink: #e9237b --cyan: #00b0cc
  --olive: #3a3a28 --ltgreen: #89c44a;
```

---

## Jak otworzyć projekt

```bash
open "/Users/PiotrNowak.info/SnippetsHub/HTML-clear-ideas/hamburger-landing/index.html"
```
