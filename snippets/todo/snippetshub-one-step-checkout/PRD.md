# PRD — SnippetsHub One Step Checkout
**Status:** ⚠️ Node.js App (inne środowisko) | **Priorytet:** Niski

## Co robi
Node.js backend — środowisko serwerowe (nie Shopify theme). Zawiera: routing, controllers, services (session, mailer, database, templating), middleware, utils.

## Pliki
| Plik | Status |
|---|---|
| `src/index.js` | ✅ |
| `src/app.js` | ✅ |
| `src/routes/`, `controllers/`, `services/` | ✅ |
| `package.json`, `.env.example` | ✅ |
| `tests/app.test.js` | ✅ |

## ✅ Co działa dobrze
- Dobrze zorganizowana struktura MVC
- Testy jednostkowe
- `.env.example` dla konfiguracji środowiska

## Kontekst biznesowy
Ten folder to backend do obsługi checkout (prawdopodobnie App Proxy lub Custom App dla Shopify). **Nie jest to Shopify theme snippet** — to Node.js serwer.

## ❌ Czego brakuje
- Brak dokumentacji integracji z Shopify (jak to łączy się ze sklepem?)
- Brak `docker-compose.yml` dla łatwego dewelopmentu
- Brak Shopify Webhook handlers (np. `orders/create`)
- Niejasne — czy to One-Page Checkout przez iframe/embed czy redirect flow?

## Decyzja architektoniczna
Jeśli celem jest **one-step checkout dla Shopify**, rekomendowane podejście 2025:
1. **Checkout Extensibility** (Plus) — UI Extensions React
2. **Custom storefront** (Hydrogen) — pełna kontrola
3. **App Proxy + custom JS** — obecne podejście (Node.js backend)

## Kryteria akceptacji
- [ ] README opisuje flow integracji z Shopify
- [ ] Endpoint `/checkout/create` obsługuje Shopify Cart API
- [ ] `docker-compose.yml` dla lokalnego uruchomienia
