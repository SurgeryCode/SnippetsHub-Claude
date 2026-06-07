# PRD — SnippetsHub B2B Pack
**Status:** ✅ Gotowe | **Priorytet:** Niski

## Co robi
Dwa snippety pomocnicze dla sklepów B2B:
- `surgerycode-moq-hint` — wskazówka o minimalnym zamówieniu (MOQ) na PDP
- `surgerycode-price-badge` — etykieta ceny z podatkiem (netto/brutto)

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode-moq-hint.liquid` | ✅ |
| `snippets/surgerycode-price-badge.liquid` | ✅ |

## ✅ Co działa dobrze
- Lekkie snippety bez JS i CSS dependencies
- Proste w użyciu przez `{% render %}`

## ❌ Do poprawy / rozszerzenia
- Brak integracji z metafieldami produktu (MOQ powinien być per-produkt, nie hardcoded)
- `price-badge` powinien dynamicznie obliczać cenę netto/brutto z `product.price`
- Brak stylowania — klient musi dodać CSS samodzielnie (brak assets)

## Kryteria akceptacji
- [ ] MOQ-hint czyta wartość z `product.metafields.custom.moq` (z fallback na 1)
- [ ] Price-badge oblicza cenę netto dynamicznie jeśli podano `tax_rate` param
- [ ] Dodać minimalny CSS assets dla obu snippetów
