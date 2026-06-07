# PRD — SnippetsHub FAQ + SEO
**Status:** ✅ Gotowe z drobną poprawką | **Priorytet:** Wysoki

## Co robi
Sekcja FAQ z natywnym `<details>/<summary>` i automatycznym JSON-LD `FAQPage` dla SEO.

## Pliki
| Plik | Status |
|---|---|
| `sections/surgerycode-faq-seo.liquid` | ✅ |
| `assets/surgerycode-faq-seo.css` | ✅ |
| `assets/surgerycode-faq-seo.js` | ✅ |

## ✅ Co działa dobrze
- Natywne `<details>` — zero JS potrzebne do otwarcia (progressive enhancement)
- JSON-LD FAQPage poprawnie generowany z bloków
- Użycie `| json` filtra dla bezpiecznego escape'owania w JSON-LD
- `forloop.last` do pomijania ostatniego przecinka w JSON-LD

## ❌ Problemy do naprawienia

### 1. Brak sekcji tytułu w schema i szablonie
**Problem:** Sekcja nie ma nagłówka — klient nie może ustawić tytułu FAQ w edytorze.  
**Rozwiązanie:** Dodać do `{% schema %}`:
```json
{"type":"text","id":"title","label":"Section title","default":"Frequently Asked Questions"}
```
I w Liquid przed pętlą:
```liquid
{% if section.settings.title != blank %}
  <h2 class="surgerycode-faq__title">{{ section.settings.title }}</h2>
{% endif %}
```

### 2. Brak `presets.category` i ikony w edytorze
**Problem:** Schema ma `"presets"` ale bez `"category"`, co utrudnia znalezienie sekcji.  
**Rozwiązanie:** Dodać `"category": "Information"` do presetu.

## Kryteria akceptacji (DoD)
- [ ] Sekcja ma pole tytułu edytowalne w Theme Editor
- [ ] JSON-LD generowany poprawnie (walidacja: Google Rich Results Test)
- [ ] Animacja open/close działająca przez CSS (transition na `max-height`)
- [ ] `presets.category` ustawione
