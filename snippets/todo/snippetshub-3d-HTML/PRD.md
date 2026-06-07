# PRD — Nike 3D Landing Page
### SnippetsHub Showcase · Wersja 1.4 · 2026-06-04

---

## 1. Przegląd projektu

| | |
|---|---|
| **Nazwa** | Nike 3D Landing Page |
| **Typ** | Frontend showcase — HTML / CSS / Vanilla JS |
| **Cel** | Odwzorowanie projektu graficznego Nike landing page z efektami 3D, slajderem produktów i pełną interaktywnością. Snippet do biblioteki SnippetsHub. |
| **Projekt graficzny** | `Materiały/ProjektHTML-CSS-JS.jpg` |
| **Stack** | HTML5, CSS3, Vanilla JS, Three.js (CDN), Google model-viewer (CDN) |
| **Ograniczenia** | Brak frameworków JS (React, Vue itp.), brak bundlera |

---

## 2. Pliki projektu

### Pliki źródłowe

| Plik | Rola | Zależności |
|---|---|---|
| `index.html` | Bazowa wersja — emoji jako placeholder produktów | `style.css`, `script.js` |
| `style.css` | Wszystkie style — CSS variables, layout, animacje, responsive | — |
| `script.js` | Silnik slidera — autoplay, drag/swipe, hero sync, cart feedback | — |
| `prd.json` | Dokumentacja iteracji w formacie JSON (legacy) | — |
| `PRD.md` | Ten plik — pełna dokumentacja produktu | — |

### Warianty index (kolejność powstania)

| Plik | Wersja | Obiekt 3D | Hero | Slider | Interakcja hero |
|---|---|---|---|---|---|
| `index.html` | v1 — bazowa | Emoji 👟 + CSS filter | ✅ emoji float | ✅ pełny | ❌ |
| `index-3d.html` | v2 — model-viewer slider | `model-viewer` GLB | ❌ brak hero sekcji | ✅ pełny | ❌ |
| `index-three.html` | v3 — pełny model-viewer | `model-viewer` GLB | ✅ model-viewer | ✅ pełny | ⚠️ camera-controls, brak sync slidera |
| `index-hero-rotate.html` | v4 — hero interaktywny | `model-viewer` GLB | ✅ interaktywny | ✅ pełny | ✅ drag + pause slidera |

### Assety

| Plik | Rozmiar | Opis |
|---|---|---|
| `assets/nike_10.glb` | ~9.7 MB | Model 3D buta — używany przez v2/v3/v4 |
| `assets/Logo_NIKE.svg` | 1 KB | Logo Nike (SVG, biały via CSS invert) |
| `assets/Cały-slider.jpg` | 43 KB | Zrzut referencyjny slidera |
| `assets/slider-project.jpg` | 11 KB | Zrzut projektu slidera |
| `Materiały/ProjektHTML-CSS-JS.jpg` | 38 KB | Główny projekt graficzny (design reference) |

---

## 3. Ewolucja — co zostało zrobione ✅

### v1 · `index.html` — Baza projektu

- Navbar: logo Nike SVG, linki nawigacyjne, przyciski Search (czerwony) i Cart (biały)
- Hero section: nagłówek `JUST DO IT` z animacją wejścia (slide-in per linia)
- Hero: opis produktu, cena w kolorze akcentu, przycisk `GET IT NOW` z hover
- Watermark `NIKE` w tle (transparentny tekst)
- Hero shoe wrap: dashed ring (CSS rotate animation) + solid ring
- Emoji 👟 jako obiekt testowy z animacją `float` (góra/dół, 4s)
- Centralna wyświetlarka buta: zmiana CSS `filter` przy zmianie slajdu (hue-rotate, grayscale, sepia)
- Products strip (fixed bottom): 5 kart produktów
- Każda karta: emoji but (z filtrem), nazwa, gwiazdki, liczba kolorów, cena, przycisk `+`
- Slider: strzałki prev/next, klik w kartę, klawiatura `← →`
- Drag/swipe: mouse + touch, snap threshold 55px
- Autoplay co 4 sekundy, pauza na hover nad stripem
- Zmiana aktywnej karty → aktualizacja ceny i nazwy w hero
- Przycisk `+` → feedback wizualny (`✓` przez 1 sekundę)
- Slide counter `01/05` aktualizujący się (lewy dolny róg hero + strip)
- Responsive CSS: tablet 900px, mobile 560px (ukryte nav-links)
- CSS custom properties (kolory, fonty, transitions)
- Font Orbitron (display), Segoe UI (body)

### v2 · `index-3d.html` — Model-viewer slider

- Importowanie Google `model-viewer` v3.5 przez CDN
- 5 kart z pełnym `<model-viewer src="assets/nike_10.glb">`
- Każda karta: inny `camera-orbit`, `rotation-per-second`, `exposure`
- Aktywna karta: aktywuje `auto-rotate`, pozostałe zatrzymane (`syncRotate`)
- Nowy layout slidera: karty większe (aspect-ratio 4/3), viewport z `clip-path`
- Badge `3D` na każdej karcie
- Progress bar model-viewer ostylowany pod projekt
- Oddzielny plik bez sekcji hero (pełnoekranowy slider)
- Drag/swipe: rozróżnienie ruchu poziomego (slider) od pionowego (model-viewer orbit)

### v3 · `index-three.html` — Pełny model-viewer (hero + slider)

- Przywrócona sekcja hero z `index.html` (layout identyczny)
- Hero: `<model-viewer id="heroViewer">` zastępuje emoji w `.shoe-display`
- Każda karta slidera: mini `<model-viewer>` w `.card-img` (pointer-events: none)
- `go(i)` synchronizuje `camera-orbit` hero viewera z `data-orbit` wybranej karty
- Lazy loading na kartach (`loading="lazy"`)
- Autoplay slider bez zmian (identyczny jak `script.js`)

### v4 · `index-hero-rotate.html` — Hero interaktywny

- `pointer-events: auto` na `.shoe-display` — nadpisuje blokadę z `style.css`
- Cursor `grab` / `grabbing` podczas obracania
- Animacja `float` pauzuje podczas obracania (`.rotating` → `animation-play-state: paused`)
- `pointerdown` na hero → `stopAutoplay()`, flaga `heroRotating = true`
- `pointerup` / `pointercancel` na dokumencie → flaga `false`, autoplay wraca po **1.8 s**
- Obie flagi (`heroRotating`, `stripHovered`) chronią timer przed podwójnym startem
- Etykieta `DRAG TO ROTATE` — znika po pierwszej interakcji
- Refaktor `startAutoplay()` / `stopAutoplay()` — centralny punkt zarządzania timerem

---

## 4. Co powinno zostać zrobione 🔄

Wymagania konieczne do uznania projektu za production-ready snippet.

### 4.1 Ujednolicenie wariantów

| # | Zadanie | Plik docelowy | Priorytet |
|---|---|---|---|
| R-01 | Wybrać jeden wariant jako "finalny" (rekomendacja: `index-hero-rotate.html`) i posprzątać pozostałe lub opisać jako archiwalne | — | Wysoki |
| R-02 | Dodać nawigację między wariantami (np. link w navbarze lub osobny `index` strony) | nowy `index-showcase.html` | Średni |

### 4.2 Stabilność i UX

| # | Zadanie | Plik | Priorytet |
|---|---|---|---|
| R-03 | Plik GLB waży ~9.7 MB — dodać placeholder/skeleton podczas ładowania hero modelu | `index-hero-rotate.html` | Wysoki |
| R-04 | Fallback gdy GLB nie załaduje (błąd sieciowy) — pokazać emoji lub komunikat | wszystkie v3/v4 | Wysoki |
| R-05 | Touch/swipe na słiderze koliduje z model-viewer orbit na mobile — rozróżnić kierunek (jak w `index-3d.html`) | `index-three.html`, `index-hero-rotate.html` | Wysoki |
| R-06 | Etykieta `DRAG TO ROTATE` powinna pojawić się raz i zapisać stan w `localStorage` | `index-hero-rotate.html` | Niski |

### 4.3 Responsive

| # | Zadanie | Priorytet |
|---|---|---|
| R-07 | Test i poprawki na iPhone SE (375px) — model-viewer w kartach może być za mały | Wysoki |
| R-08 | Hamburger menu na mobile (nav-links jako drawer) | Średni |
| R-09 | Na mobile hero model-viewer wymaga obsługi `touch-action: none` w CSS | Wysoki |

### 4.4 Dostępność

| # | Zadanie | Priorytet |
|---|---|---|
| R-10 | Dodać `aria-live="polite"` na `#heroLabel` i `#heroPrice` (screen reader przy zmianie slajdu) | Średni |
| R-11 | Fokus klawiaturowy widoczny na kartach slidera i przyciskach | Średni |

---

## 5. Co można jeszcze zrobić 💡

Opcjonalne ulepszenia — nie blokują wydania, ale podnoszą jakość snippeta.

### 5.1 Wizualne i animacje

| # | Pomysł | Opis |
|---|---|---|
| E-01 | **Progress bar autoplay** | Cienka linia pod sliderem (4 s fill) — wizualizuje czas do następnego slajdu |
| E-02 | **Smooth background color** | Zmiana koloru akcentowego tła hero przy przełączeniu produktu (CSS transition na `--bg`) |
| E-03 | **Licznik roll-up** | Cyfry licznika slajdów wchodzą z góry/dołu (CSS `clip-path` + `translateY`) |
| E-04 | **Ripple na przyciskach** | Efekt kółka przy kliknięciu `GET IT NOW` i `+` |
| E-05 | **Kursor customowy** | Własny kursor (dot + ring) w obszarze hero |
| E-06 | **Hero transition** | Płynne wejście modelu 3D przy zmianie slajdu (scale + opacity) |
| E-07 | **Particle overlay** | Drobne punkty/cząsteczki w tle hero (canvas lub CSS) |

### 5.2 Personalizacja produktu

| # | Pomysł | Opis |
|---|---|---|
| E-08 | **Color picker** | Swatch kółka kolorów pod ceną, zmiana wariantu → zmiana modelu lub CSS tint na viewer |
| E-09 | **Size selector** | Wybór rozmiaru buta z wizualnym feedbackiem |
| E-10 | **360° model switcher** | Przycisk "View 360°" — powiększenie modelu hero na full-screen lightbox |

### 5.3 E-commerce flow

| # | Pomysł | Opis |
|---|---|---|
| E-11 | **Mini-koszyk** | Drawer z listą dodanych produktów, suma, badge na ikonie cart |
| E-12 | **Wishlist / serce** | Przycisk serca na kartach — zapisuje ulubione w `localStorage` |
| E-13 | **Stock indicator** | Mały wskaźnik `Only 3 left!` na wybranych kartach |

### 5.4 Performance

| # | Pomysł | Opis |
|---|---|---|
| E-14 | **GLB compression** | Skompresować `nike_10.glb` przez `gltf-transform` — potencjalnie 30–60% mniejszy plik |
| E-15 | **Draco compression** | Użyć Draco decoder w model-viewer dla mniejszego rozmiaru siatki |
| E-16 | **Intersection Observer** | Zatrzymać animacje kart poza viewport (oszczędność GPU) |
| E-17 | **Preload GLB** | `<link rel="preload" as="fetch">` dla pliku GLB żeby zacząć pobieranie wcześniej |

### 5.5 Rozbudowa snippeta

| # | Pomysł | Opis |
|---|---|---|
| E-18 | **Drugi GLB** | Dodać drugi model buta (inny produkt) — każda karta może mieć własny `src` |
| E-19 | **AR button** | Włączyć `ar` na model-viewer dla iPhone/Android — "Zobacz but na stopie" |
| E-20 | **Dark/Light toggle** | Przełącznik motywu — ciemny (obecny) vs jasny wariant |
| E-21 | **Keyboard shortcut legend** | Tooltip `← →` pokazujący skróty klawiaturowe |

---

## 6. Design tokens

```css
:root {
  /* Kolory */
  --bg:          #1B2A7A;
  --bg-dark:     #101D5E;
  --accent:      #F5A623;   /* gold — cena, gwiazdki, hover */
  --accent-red:  #E53935;   /* czerwony — przycisk search */
  --white:       #FFFFFF;
  --white-60:    rgba(255, 255, 255, 0.60);
  --white-10:    rgba(255, 255, 255, 0.08);
  --card-bg:     rgba(255, 255, 255, 0.07);
  --strip-bg:    #111D5E;

  /* Typografia */
  --font:         "Segoe UI", Arial, sans-serif;
  --font-display: "Orbitron", "Arial Black", sans-serif;  /* nagłówki, ceny, UI */

  /* Motion */
  --transition:   0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 7. Decyzje architektoniczne

| Decyzja | Uzasadnienie |
|---|---|
| Vanilla JS zamiast React/Vue | Snippet ma być samodzielny — zero zależności npm |
| `model-viewer` (Google) zamiast Three.js raw | Prostszy API dla GLB, wbudowany AR, obsługa shadow/lighting out-of-the-box |
| Three.js (CDN) jako alternatywa w `index-three.html` | Proceduralne obiekty 3D bez pliku GLB — lżejsza opcja demo |
| `pointer-events: none` na `.shoe-display` w `style.css` | Zapobiega przypadkowemu drag na emoji — nadpisane w `index-hero-rotate.html` |
| `data-orbit` na kartach | Czyste HTML-first podejście — JS czyta angle z DOM zamiast z osobnej tablicy |
| `pointerup` na `document` zamiast na model-viewer | Pewne złapanie zakończenia drag nawet gdy kursor wyjdzie poza element |
| 1.8 s delay przed wznowieniem autoplay | Daje użytkownikowi czas na obejrzenie obróconego modelu bez natychmiastowego skoku slidera |

---

_Ostatnia aktualizacja: 2026-06-04 · Projekt: SnippetsHub Nike 3D Landing Page_
