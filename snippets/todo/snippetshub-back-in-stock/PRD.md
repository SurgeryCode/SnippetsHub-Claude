# PRD — SnippetsHub Back-in-Stock
**Status:** ✅ Gotowe | **Priorytet:** Wysoki

## Co robi
Formularz „Powiadom mnie" dla niedostępnych wariantów. Wysyła email i `variant_id` do endpointu (App Proxy / serverless). Pojawia się tylko gdy wariant niedostępny.

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode-back-in-stock.liquid` | ✅ |
| `assets/surgerycode-back-in-stock.css` | ✅ |
| `assets/surgerycode-back-in-stock.js` | ✅ |

## ✅ Co działa dobrze
- Snippet pojawia się warunkowo (tylko dla out-of-stock)
- Parametr `endpoint` — elastyczny, klient podaje własny URL
- Wysyła `product_id` + `variant_id` + email

## ❌ Do poprawy
- Brak walidacji email po stronie frontendu przed wysłaniem
- Brak stanu sukcesu/error w UI (tylko fetch, brak feedback dla użytkownika)
- Brak ukrywania formularza po wysłaniu (by nie wysyłać drugi raz)
- Brak obsługi zmiany wariantu — `variant_id` może być nieaktualny jeśli użytkownik zmienił wariant po załadowaniu

## Kryteria akceptacji
- [ ] Walidacja email (format) przed submit
- [ ] Stan "Wysłano!" po sukcesie + ukrycie formularza
- [ ] Stan błędu (network error) z komunikatem
- [ ] Aktualizacja `variant_id` przy każdej zmianie wariantu (nasłuchiwanie na `variant:change`)
