# PRD — SnippetsHub Hero Food Hunt
**Status:** ✅ ZAIMPLEMENTOWANE (było: ❌ Brak kodu) | **Priorytet:** Krytyczny → Zamknięty

## Co robi
Responsywna sekcja Hero dla branży food/restaurant. Centralne danie główne + interaktywna orbita miniaturek dań wokół niego. Kliknięcie w miniaturkę lub strzałki zmienia główne danie z animacją fade.

## Pliki
| Plik | Status |
|---|---|
| `sections/surgerycode-hero-food-hunt.liquid` | ✅ NOWY |
| `assets/surgerycode-hero-food-hunt.css` | ✅ NOWY |
| `assets/surgerycode-hero-food-hunt.js` | ✅ NOWY |
| `PRD/PRD_Food_Hunt.md` | ✅ (istniejące wymagania) |

## Architektura implementacji

### Iteracja 1 ✅ — Struktura HTML
- `sc-food-hero__content` — lewa kolumna: eyebrow + h1 (2 linie) + opis + CTA
- `sc-food-hero__visual` — prawa kolumna: arc-bg + main-dish + orbit + nav

### Iteracja 2 ✅ — Orbita i pozycjonowanie
- Orbita przez CSS: `rotate(angle) translate(radius) rotate(-angle)` z CSS variables `--sc-angle`
- 1–5 miniaturek na orbicie (block type: `dish`, limit: 6 w schema)
- Pierwsze danie z listy = główne (center), pozostałe = orbita

### Iteracja 3 ✅ — Interaktywność JS
- Klasa `FoodHeroCarousel` — OOP, izolowana per sekcja
- `goTo(index)` zmienia główny obraz z fade transition
- Dane dań przekazywane przez `window.scFoodHeroDishes[sectionId]` (JSON w Liquid)
- Strzałki `[data-sc-prev]` i `[data-sc-next]` + kliknięcie orbit item

### Iteracja 4 ✅ — Responsywność
- Desktop (>900px): 2 kolumny grid
- Tablet (480–900px): 1 kolumna, visual na górze, mniejsza orbita
- Mobile (<480px): orbita 110px radius, main img 160px

## Konfiguracja Theme Editor
Ustawienia (wszystkie przez edytor bez dotykania kodu):
- Eyebrow text, H1 (dwie linie: accent + main)
- Opis, 2 przyciski CTA (label + URL)
- Kolory: primary, background, text, accent
- Bloki `dish`: image picker + name + description (max 6)
- Preset z 4 przykładowymi daniami

## Sposób instalacji
1. Skopiuj `sections/` i `assets/` do motywu Shopify
2. W Theme Editor → Add section → "Hero Food Hunt"
3. Dodaj bloki Dish z obrazkami
4. Dostosuj kolory i teksty

## Kryteria akceptacji (DoD) — SPEŁNIONE
- [x] Orbita z CSS transform (bez JS pozycjonowania)
- [x] Animacja fade przy zmianie dania
- [x] Strzałki nawigacji
- [x] Kliknięcie orbit item zmienia główne danie
- [x] Responsive (desktop/tablet/mobile)
- [x] `{% schema %}` z presetem
- [x] CSS variables dla kolorów (Theme Editor)
- [x] Fallback Unsplash images gdy brak uploadów
- [x] Brak inline CSS w Liquid
- [x] `loading="eager"` na głównym obrazie (LCP)

## Potencjalne rozszerzenia (v2)
- [ ] Auto-play timer (obracanie orbit co X sekund)
- [ ] Touch/swipe support na mobile
- [ ] Animacja wejścia sekcji przy scroll (IntersectionObserver)
- [ ] Centra produktu (link do collection) zamiast statycznego tekstu
