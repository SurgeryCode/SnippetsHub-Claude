# Themes — Index
**Aktualizuj ten plik przy każdym dodaniu nowego motywu testowego.**

---

## Production — live theme snippetshub.com

| Folder | Opis | Status |
|---|---|---|
| `production/` | Live theme sklepu snippetshub.com — customowy motyw na bazie Dawn | ✅ Aktywny |

Używaj `production/` jako **referencji** — żeby zrozumieć jak działa live sklep, jakie sekcje istnieją, jak skonstruowany jest header/cart/PDP. Nie testuj snippetów bezpośrednio na tym folderze.

---

## Development themes — środowisko testowe snippetów

Dodawaj nowe motywy jako podfoldery w `development/`. Konwencja nazwy: `{nazwa-motywu}-v{major}/`

```
development/
└── (dodaj tutaj motywy testowe)
```

### Jak dodać nowy motyw testowy

1. Pobierz motyw z Shopify Theme Store lub GitHub
2. Wypakuj do `themes/development/{nazwa}-v{wersja}/`
3. Dodaj wpis do tabeli poniżej
4. Zainstaluj snippet i wyślij do Shopify Preview do testu

### Rejestr motywów testowych

| Folder | Motyw | Wersja | Snippety przetestowane | Uwagi |
|---|---|---|---|---|
| *(brak)* | — | — | — | Dodaj pierwszy motyw |

---

## Popularne motywy do przetestowania (roadmapa)

Kolejność według popularności na rynku:

| Priorytet | Motyw | Typ | Źródło |
|---|---|---|---|
| 🔴 HIGH | Dawn | Free | Shopify GitHub |
| 🔴 HIGH | Sense | Free | Shopify Theme Store |
| 🔴 HIGH | Debut | Free (legacy) | Shopify GitHub |
| 🔴 HIGH | Refresh | Free | Shopify Theme Store |
| 🔴 HIGH | Craft | Free | Shopify Theme Store |
| 🟡 MED | Impulse | Paid (Archetype) | Shopify Theme Store |
| 🟡 MED | Turbo | Paid (Out of the Sandbox) | Shopify Theme Store |
| 🟡 MED | Prestige | Paid (Maestrooo) | Shopify Theme Store |
| 🟡 MED | Motion | Paid (Archetype) | Shopify Theme Store |
| 🟡 MED | Symmetry | Paid (Eight Themes) | Shopify Theme Store |

---

## Workflow testowania snippetu

```
1. Zbuduj snippet w snippets/{kategoria}/{nazwa}/
2. Skopiuj pliki snippetu do themes/development/{motyw}/
   - sections/*.liquid  → themes/development/{motyw}/sections/
   - snippets/*.liquid  → themes/development/{motyw}/snippets/
   - assets/*           → themes/development/{motyw}/assets/
3. Wgraj motyw do Shopify (jako unpublished theme)
4. Przetestuj w Theme Editor i Storefront Preview
5. Odnotuj wynik w tabeli "Rejestr motywów testowych" powyżej
6. Jeśli OK → snippet trafia do SnippetsList/snippets-list-ready/
```
