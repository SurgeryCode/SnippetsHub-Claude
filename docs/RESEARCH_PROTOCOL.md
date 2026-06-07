# SnippetsHub — Community Research Protocol
**Wersja:** 1.0 | **Aktualizacja:** 2026-06-01
**Cykl:** co 14 dni | **Wynik:** `docs/research/YYYY-MM-DD.md`

---

## Cel

Znajdź nowe pomysły na snippety na podstawie tego czego użytkownicy Shopify aktualnie szukają w społecznościach. Waliduj istniejące snippety. Identyfikuj trendy i luki rynkowe.

---

## Jak uruchomić (ręcznie)

Powiedz Claude Code:

> **"zrób community research dla SnippetsHub i zapisz wyniki"**

Agent wykona poniższy protokół i zapisze raport do `docs/research/YYYY-MM-DD.md`.

---

## Protokół — kroki agenta

### Krok 1 — Przeszukaj społeczności (WebSearch)

Uruchom te zapytania równolegle:

```
1. shopify "without app" OR "no app" [feature] liquid code 2026
2. site:community.shopify.com "how to add" product page OR cart without app
3. reddit r/shopify most requested features snippets 2026
4. shopify liquid snippet [kategoria] free alternative app
5. shopify store owners pain points conversion 2026
```

Kategorie do rotacji w zapytaniach:
- `size chart`, `product tabs`, `FAQ accordion`, `before after slider`
- `testimonials`, `video`, `quick add`, `color swatches`
- `cookie consent`, `age verification`, `social proof`
- `loyalty`, `referral`, `waitlist`, `pre-order`

### Krok 2 — Przeszukaj App Store pod kątem luk

```
Szukaj aplikacji Shopify z:
- 1000+ recenzji (= potwierdzony popyt)
- Darmowy plan lub próba (= merchant szuka też kodu)
- Kategorie: conversion, social proof, cart, product page
```

### Krok 3 — Porównaj z istniejącym katalogiem

Sprawdź `docs/PRODUCTS_CATALOG.md` i `SnippetsList/snippets-list-ready/` — co już mamy, czego brakuje.

### Krok 4 — Zapisz raport

Zapisz wyniki do `docs/research/YYYY-MM-DD.md` według poniższego szablonu.

---

## Szablon raportu (output)

```markdown
# Community Research — YYYY-MM-DD

## Nowe pomysły na snippety

| # | Snippet | Sygnał z community | Zastępuje | Priorytet |
|---|---------|-------------------|-----------|-----------|
| 1 | Nazwa | Gdzie/co znaleziono | App + cena | 🔴/🟡/🟢 |

## Walidacja istniejących snippetów

| Snippet | Popyt | Notatka |
|---------|-------|---------|
| snippetshub-free-shipping-bar | ✅ Wysoki | ... |

## Kluczowe insighty

- [bullet z najważniejszą obserwacją]
- [bullet z trendem]
- [bullet z zagrożeniem/szansą]

## Rekomendacja na następny sprint

> [1-2 zdania co zbudować lub wystawić jako pierwsze]

## Źródła

- [URL 1](...)
- [URL 2](...)
```

---

## Kontekst dla agenta (załaduj przed research)

Agent powinien przeczytać przed uruchomieniem:
- `docs/PRODUCTS_CATALOG.md` — co już jest w sprzedaży
- `docs/PRODUCT_ROADMAP.md` — co zaplanowane
- `SnippetsList/snippets-list-ready/` — lista snippetów gotowych
- Ostatni raport z `docs/research/` — żeby nie powtarzać poprzednich wyników

---

## Historia research sessions

| Data | Plik | Kluczowy wynik |
|------|------|----------------|
| 2026-06-01 | [2026-06-01.md](research/2026-06-01.md) | Size Chart, Product Tabs, FAQ Accordion jako TOP 3 nowe snippety |
