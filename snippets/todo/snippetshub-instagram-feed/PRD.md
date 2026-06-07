# PRD — SnippetsHub Instagram Feed
**Status:** ✅ Gotowe | **Priorytet:** Średni

## Co robi
Renderuje siatkę postów Instagram z endpointu JSON (App Proxy / CDN). Obsługuje różne formaty danych (tablica lub `{ data: [...] }`).

## Pliki
| Plik | Status |
|---|---|
| `sections/surgerycode-instagram-feed.liquid` | ✅ |
| `assets/surgerycode-instagram-feed.css` | ✅ |
| `assets/surgerycode-instagram-feed.js` | ✅ |

## ✅ Co działa dobrze
- Elastyczny parser danych (różne formaty API)
- Ustawienia `endpoint` i `limit` przez Theme Editor
- Automatyczne ładowanie assets przez sekcję

## ❌ Do poprawy
- Brak stanu loading (spinner) podczas pobierania
- Brak stanu error — gdy endpoint nie odpowie, użytkownik widzi pustą sekcję
- Brak lazy loading siatki obrazów
- Brak `alt` text na obrazach (accessibility)

## Kryteria akceptacji
- [ ] Spinner loading podczas fetch
- [ ] Komunikat błędu gdy endpoint niedostępny
- [ ] `loading="lazy"` na obrazach siatki
- [ ] `alt` z `caption` lub fallback "Instagram post"
