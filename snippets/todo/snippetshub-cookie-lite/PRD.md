# PRD — SnippetsHub Cookie Lite
**Status:** ✅ Gotowe | **Priorytet:** Średni

## Co robi
Lekki pasek zgód cookie. Zapisuje decyzję w `localStorage`. Integruje się z `Shopify.customerPrivacy.setTrackingConsent` jeśli dostępne.

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode-cookie-lite.liquid` | ✅ |
| `assets/surgerycode-cookie-lite.css` | ✅ |
| `assets/surgerycode-cookie-lite.js` | ✅ |

## ✅ Co działa dobrze
- Lekki — zero dependencies
- `localStorage` do zapamiętania decyzji
- Integracja z `Shopify.customerPrivacy` (GDPR-ready)
- Parametry przez `{% render %}`: `text`, `accept_label`, `decline_label`

## ❌ Do poprawy
- Brak linku do Polityki Prywatności w tekście banera
- Brak opcji "Manage Preferences" (granularne zgody — analytics vs marketing)
- Brak animacji slide-up/slide-down (UX)
- Klucz localStorage hardcoded — powinien być prefixowany ID sklepu

## Kryteria akceptacji
- [ ] Param `policy_url` dla linku do Privacy Policy
- [ ] Animacja wejścia (slide-up lub fade-in) po 500ms
- [ ] Klucz localStorage: `surgerycode_cookie_{{ shop.permanent_domain | md5 }}` (unikalne per sklep)
