# PRD — SnippetsHub Performance Lite Loader
**Status:** ✅ Gotowe | **Priorytet:** Wysoki

## Co robi
Odracza ładowanie ciężkich zasobów (script/link/iframe) oznaczonych `data-lite-*` do momentu `idle`, `interaction` lub `afterLoad`. Poprawia LCP i TBT.

## Pliki
| Plik | Status |
|---|---|
| `snippets/performance-lite-loader.liquid` | ✅ |
| `assets/performance-lite-loader.js` | ✅ |

## ✅ Co działa dobrze
- 3 tryby ładowania pokrywają kluczowe scenariusze (idle=najlepszy dla analytics)
- Nie wymaga zmian w istniejących tagach — tylko dodanie `data-lite-*`
- Vanilla JS bez dependencies
- `requestIdleCallback` z fallback na `setTimeout`

## ❌ Do poprawy
- Brak obsługi trybu `afterLoad` (DOMContentLoaded vs load — różnica istotna)
- Brak `noscript` fallback dla iframe
- Brak możliwości kolejkowania — zasoby ładują się równocześnie (brak priorytetowania)

## Kryteria akceptacji
- [ ] `afterLoad` = `window.load` event (nie DOMContentLoaded)
- [ ] `noscript` fallback generowany automatycznie dla `data-lite-src` iframe
- [ ] Dokumentacja: tabela kiedy używać którego trybu
