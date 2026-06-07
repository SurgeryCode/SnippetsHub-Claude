# PRD — SnippetsHub Landing Page Creator
**Status:** ✅ Gotowe | **Priorytet:** Wysoki

## Co robi
Budowniczy landing page z bloków (hero, text, image, cta, faq) w Shopify Theme Editor. Baza CSS + minimalny JS placeholder.

## Pliki
| Plik | Status |
|---|---|
| `sections/surgerycode-landing-page-creator.liquid` | ✅ |
| `assets/surgerycode-landing-page-creator.css` | ✅ |
| `assets/surgerycode-landing-page-creator.js` | ✅ |

Wariant v1 (`snippetshub-landing-page-creator-v1/`) dodaje:
- `templates/page.landing.json` — preset strony gotowy do użycia

## ✅ Co działa dobrze
- Architektura blokowa — każdy typ bloku (hero/text/image/cta/faq) to osobny `type` w schema
- Template preset w v1 — jeden klik tworzy LP
- Assety auto-ładowane przez sekcję

## ❌ Do poprawy
- Blok `faq` w LP Creator powinien używać `<details>` (tak jak `faq-seo`) a nie custom accordion
- Brak bloku `testimonial` — bardzo często używany na LP
- Brak opcji kolorów tła per-blok (wszystkie bloki mają ten sam kolor)

## Kryteria akceptacji
- [ ] Blok `testimonial` (cytat + autor + gwiazdki)
- [ ] Każdy blok ma `color_scheme` setting (light/dark/accent)
- [ ] Blok faq używa natywnych `<details>/<summary>`
- [ ] `templates/page.landing.json` w wariancie bazowym (nie tylko v1)
