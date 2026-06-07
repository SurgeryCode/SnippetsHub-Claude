# PRD — SnippetsHub Checkout Plus Pack
**Status:** ⚠️ Dokumentacja bez kodu | **Priorytet:** Średni

## Co robi
Wzorce i instrukcje dla **Shopify Plus Checkout Extensibility (CE)**. CE działa wyłącznie przez App Extensions — nie modyfikuje plików motywu.

## Pliki
| Plik | Status |
|---|---|
| `README.md` | ✅ |
| Kod CE (App Extensions) | ❌ BRAK |

## ✅ Co działa dobrze
- README wyjaśnia zakres: UI Extensions, Branding API, Validation API, Web Pixels
- Jasno komunikuje że CE nie dodaje kodu do motywu

## ❌ Czego brakuje

### 1. Przykładowe pliki CE Extension
**Zakres:** Shopify Plus. Wymagana własna aplikacja Shopify z rozszerzeniami.

Pliki do dodania jako wzorce:
```
checkout-ui-extension/
  src/
    Checkout.tsx      — React component dla UI Extension
  shopify.extension.toml
  package.json
```

### 2. Brak przykładu Web Pixel
Web Pixel (zdarzenia checkout) to najczęstszy przypadek użycia. Brak przykładu konfiguracji.

### 3. Branding API — brak konfiguracji JSON
Nie ma przykładowego `branding.json` z kolorami i fontami.

## Decyzja architektoniczna
Ten pakiet wymaga **Shopify Plus** i **własnej aplikacji**. Można go sprzedawać jako:
1. **Dokumentacja + snippety instruktażowe** (obecny stan) — wystarczający
2. **Gotowe CE Extension** — wymaga publikacji w Partner Dashboard

## Kryteria akceptacji
- [ ] Dodać przykładowy `Checkout.tsx` (UI Extension banner)
- [ ] Dodać przykład Web Pixel konfiguracji
- [ ] README zaktualizować z wymaganiem Shopify Plus planu
