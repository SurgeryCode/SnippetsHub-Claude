# PRD — SnippetsHub Critical CSS Loader
**Status:** ✅ Gotowe | **Priorytet:** Wysoki

## Co robi
Wstrzykuje `surgerycode-critical.css` jako `<link rel="preload">` z `onload` fallback. Poprawia LCP eliminując render-blocking CSS.

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode-critical-css.liquid` | ✅ |
| `assets/surgerycode-critical.css` | ✅ (placeholder) |

## ✅ Co działa dobrze
- Wzorzec preload+onload to best practice dla critical CSS
- `<noscript>` fallback dla przeglądarek bez JS
- Prosty w instalacji (jeden `{% render %}` w `<head>`)

## ❌ Do poprawy
- `assets/surgerycode-critical.css` jest pusty — klient musi wiedzieć co tam wpisać
- Brak dokumentacji jak wyodrębnić critical CSS (np. narzędzia: Penthouse, Critical)
- Brak przykładowych stylów above-the-fold dla Dawn theme

## Kryteria akceptacji
- [ ] Plik `surgerycode-critical.css` zawiera przykładowe style (hero, header, font-face)
- [ ] README opisuje jak wyodrębnić critical CSS z istniejącego motywu
- [ ] Testowane: LCP poprawa mierzalna w PageSpeed Insights
