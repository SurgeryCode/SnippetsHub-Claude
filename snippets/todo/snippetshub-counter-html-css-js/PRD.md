# PRD — SnippetsHub Counter (HTML/CSS/JS)
**Status:** ✅ Gotowe | **Priorytet:** Niski

## Co robi
Animowany licznik (np. "500+ klientów", "10 000 zamówień"). Animacja CSS `@keyframes` + JS do uruchomienia przy scroll (IntersectionObserver).

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode_counter.liquid` | ✅ |
| `blocks/_surgerycode-counter.liquid` | ✅ (blok dla sekcji) |
| `assets/surgerycode_counter.css` | ✅ |
| `assets/surgerycode_counter.js` | ✅ |
| `package.json`, `changelog.md`, `LICENSE.md` | ✅ |

## ✅ Co działa dobrze
- Dwa warianty użycia: snippet standalone + blok do sekcji
- IntersectionObserver — animacja odpala się przy scroll (nie przy load)
- `package.json` i `changelog.md` — dojrzała struktura projektu

## ❌ Do poprawy
- Brak parametru `suffix` (np. "+", "k", "%") — hardcoded w snippet
- Brak opcji `start_value` (animacja zawsze od 0)
- Brak easing dla animacji licznika (liniowa — mało efektowna)

## Kryteria akceptacji
- [ ] Param `suffix` (domyślnie puste)
- [ ] Param `prefix` (np. "$")  
- [ ] Easing: ease-out (wolniejsze pod koniec)
- [ ] Param `duration` (czas animacji, domyślnie 2000ms)
