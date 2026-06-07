# PRD — SnippetsHub App Script Manager
**Status:** ✅ Gotowe | **Priorytet:** Średni

## Co robi
Zarządza ładowaniem zewnętrznych skryptów na podstawie trybu (`immediate/afterLoad/interaction/idle`) i zgód prywatności (`Shopify.customerPrivacy`).

## Pliki
| Plik | Status |
|---|---|
| `snippets/app-script-manager.liquid` | ✅ |
| `assets/app-script-manager.js` | ✅ |
| `package.json`, `changelog.md`, `LICENSE.md` | ✅ |

## ✅ Co działa dobrze
- 4 tryby ładowania pokrywają wszystkie scenariusze UX
- Integracja z `Shopify.customerPrivacy` — GDPR-ready
- Fallback z metafields (`shop.metafields.surgerycode.app_scripts`)
- Nie blokuje renderowania (skrypt jest snippet, nie sekcja z schema)

## ❌ Do poprawy
- Brak walidacji formatu JSON przekazanego w parametrze `scripts`
- Brak dokumentacji formatu metafield w README
- Brak obsługi błędów ładowania skryptu (brak `onerror` callbacka)

## Kryteria akceptacji
- [ ] Skrypt wychwytuje błędy ładowania i loguje do console.warn
- [ ] README dokumentuje dokładny format JSON dla metafield
- [ ] Walidacja: skrypt nie dodaje duplikatów gdy renderowany kilka razy
