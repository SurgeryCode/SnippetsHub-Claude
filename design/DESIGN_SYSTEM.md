# SnippetsHub — Design System
**Wersja:** 1.0 | **Aktualizacja:** 2026-06-13

Centralny index zasobów designu. Figma → Tokens → Code Connect → Snippet.

---

## Figma — główne pliki

| Plik | Link | Zawartość |
|------|------|-----------|
| SnippetsHub Components | *(dodaj link)* | Biblioteka komponentów, design system |
| SnippetsHub Snippets | *(dodaj link)* | Projekty snippetów — wszystkie frames |

---

## MVC Workflow

```
FIGMA (design)
    │
    ├─ Model → design/system/tokens/       ← tokeny kolorów, typografii, spacingu
    │          design/system/code-connect/ ← .figma.ts mappings do Liquid/CSS
    │
    ├─ View  → design/snippets/{slug}/figma.md   ← linki do frames
    │          design/snippets/{slug}/exports/   ← assets z Figma
    │
    └─ Controller → design/snippets/{slug}/PRD.md ← decyzje, GTM, tech spec
                    design/gtm/{slug}-LAUNCH.md   ← checklist przed Shopify Admin
```

**Output końcowy:**
- `snippets/ready/{slug}/` — kod snippetu
- `descriptions/{slug}-description.html` — opis Shopify
- Produkt wystawiony w Shopify Admin

---

## Tokeny designu (system/tokens/)

Tokeny eksportowane z Figma Variables. Każdy token mapuje się na CSS custom property `--snh-*`.

| Plik | Zawartość | CSS prefix |
|------|-----------|------------|
| `colors.json` | Paleta kolorów, semantic colors | `--snh-color-*` |
| `typography.json` | Fonty, rozmiary, line-height | `--snh-font-*` |
| `spacing.json` | Padding, margin, gap, radius | `--snh-space-*` |

---

## Code Connect (system/code-connect/)

Pliki `.figma.ts` mapują komponenty Figma → Liquid/CSS snippety.
Konwencja nazw: `snh-{komponent}.figma.ts`

---

## Konwencje Figma

- **Frame naming:** `{slug}/{wariant}` (np. `snh-cart-drawer/desktop`, `snh-cart-drawer/mobile`)
- **Component naming:** `SNH/{NazwaKomponentu}` (np. `SNH/Button`, `SNH/Badge`)
- **Color styles:** `SnippetsHub/{rola}` (np. `SnippetsHub/Primary`, `SnippetsHub/Surface`)
- **Variables:** `snh/{kategoria}/{nazwa}` (np. `snh/color/primary`, `snh/space/md`)
