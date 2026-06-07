# PRD — SnippetsHub Predictive Search
**Status:** ✅ Gotowe | **Priorytet:** Wysoki

## Co robi
Wyszukiwarka z podpowiedziami (produkty) oparta na `/search/suggest.json`. Minimalny JS, szybkie renderowanie listy wyników.

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode-predictive-search.liquid` | ✅ |
| `assets/surgerycode-predictive-search.css` | ✅ |
| `assets/surgerycode-predictive-search.js` | ✅ |

## ✅ Co działa dobrze
- Native Shopify Storefront Search API — bez zewnętrznych dependency
- Param `limit` przez `{% render %}`
- Debounce na input (niezbędne)

## ❌ Do poprawy
- Brak wyświetlania ceny i obrazka produktu w wynikach (tylko tytuł)
- Brak obsługi klawiszy (strzałki + Enter) — keyboard navigation
- Brak zamykania wyników po kliknięciu poza searchem (click outside)
- Brak stanu loading (użytkownik nie wie czy trwa fetch)

## Kryteria akceptacji
- [ ] Wyniki zawierają miniaturę + tytuł + cena
- [ ] Keyboard navigation: ↑↓ po wynikach, Enter = przejście do produktu, Esc = zamknięcie
- [ ] Click outside zamyka wyniki
- [ ] Spinner/skeleton loading podczas debounce
