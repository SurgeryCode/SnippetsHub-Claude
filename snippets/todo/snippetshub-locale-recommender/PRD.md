# PRD — SnippetsHub Locale Recommender
**Status:** ✅ Gotowe | **Priorytet:** Średni

## Co robi
Wykrywa `navigator.language` i sugeruje zmianę języka/regionu jeśli pasuje do innego opublikowanego locale sklepu. Pokazuje dolny pasek z przyciskiem przełączenia.

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode-locale-recommender.liquid` | ✅ |
| `assets/surgerycode-locale-recommender.js` | ✅ |

## ✅ Co działa dobrze
- Wykrywanie języka przez `navigator.language` — nie wymaga IP geolocation
- Porównanie z `shop.published_locales` (Liquid, server-side)
- Zero CSS dependencies — klient styluje sam

## ❌ Do poprawy
- Brak CSS assets — README mówi "styluj sam" ale brak wzorca
- Brak zapamiętania decyzji ("nie pokazuj mi tego") w localStorage
- Brak animacji — pasek pojawia się bez transition
- Snippet renderuje wszystkie locale w Liquid, JS wybiera właściwy — nieefektywne

## Kryteria akceptacji
- [ ] Dodać `assets/surgerycode-locale-recommender.css` z bazowym stylem paska
- [ ] Przycisk "Dismiss" ukrywa pasek i zapisuje decyzję w localStorage
- [ ] Animacja slide-up przy pojawieniu się (CSS transition)
