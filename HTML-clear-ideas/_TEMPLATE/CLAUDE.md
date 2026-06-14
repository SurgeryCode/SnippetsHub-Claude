# __IDEA_NAME__ — Kontekst projektu
**Slug:** `__IDEA_SLUG__`
**Iteracja aktualna:** v1 / v2 / v3
**Aktualizacja:** __IDEA_DATE__

---

## Kolejność startu (OBOWIĄZKOWA)

Przy każdym starcie pracy nad tym projektem przeczytaj **tylko te pliki** w tej kolejności:

1. **`CLAUDE.md`** ← ten plik (już czytasz)
2. **`STATUS.md`** ← aktualna iteracja, checklisty, log sesji
3. **`PRD.md`** ← wymagania, persony, GTM, tech spec

Pliki kodu (`index.html`, `style.css`, `script.js`, `description.html`) czytasz **tylko gdy faktycznie pracujesz nad kodem** — nie na starcie.

> Kontekst workspace'u + brand voice + persony + cennik: [`../CLAUDE.md`](../CLAUDE.md)
> Specyfikacja techniczna (prefiksy, tokeny, JS patterns): [`../SPEC.md`](../SPEC.md)

---

## Cel projektu

*(Jedno zdanie — co ten template robi i dla kogo)*

---

## Linki

- **Figma:** *(link do frame'a)*
- **Referencja (inspo):** *(link do przykładu — sklep, Dribbble, CodePen)*
- **Shopify docelowy slug:** `snh-__IDEA_SLUG__`

---

## Prefiksy kodu (zgodnie z SPEC.md)

| Element | Wartość |
|---------|---------|
| Klasy CSS (v1/v2) | `.hci-__IDEA_SLUG__`, `.hci-__IDEA_SLUG____element` |
| Tokeny CSS (v1/v2) | `--hci-__IDEA_SLUG__-*` |
| Eventy JS (v2) | `hci:__IDEA_SLUG__:*` |
| Klasy CSS (v3 Shopify) | `SNH-snh-__IDEA_SLUG__` |
| Tokeny CSS (v3 Shopify) | `--snh-*` |

---

## Iteracje — plan

| Iteracja | Co buduję | Pliki |
|----------|-----------|-------|
| v1 — HTML+CSS | Struktura, layout, kolory, typografia, mobile | `index.html`, `style.css` |
| v2 — JS+Animacje | Interakcje, animacje, logika JS | + `script.js` |
| v3 — Shopify | Konwersja na Liquid + opis produktu | `description.html` → `../snippets/ready/snh-__IDEA_SLUG__/` |

---

## Notatki techniczne

*(Edge cases, decyzje designowe, rzeczy do zapamiętania)*
