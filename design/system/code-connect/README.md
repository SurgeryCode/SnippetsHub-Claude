# Code Connect — Figma ↔ Liquid/CSS Mappings

Pliki `.figma.ts` w tym folderze mapują komponenty Figma na snippety kodu.
Używane z Figma Code Connect plugin.

## Konwencja nazw

```
snh-{komponent-slug}.figma.ts
```

Przykłady:
- `snh-button.figma.ts`
- `snh-badge.figma.ts`
- `snh-countdown-timer.figma.ts`

## Przykładowy plik

```typescript
import figma from "@figma/code-connect";

figma.connect("FIGMA_NODE_URL", {
  props: {
    label: figma.string("Label"),
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
    }),
  },
  example: ({ label, variant }) => `
    <button class="snh-button snh-button--${variant}">
      ${label}
    </button>
  `,
});
```

## Dodawanie nowego Code Connect

1. Otwórz komponent w Figma → skopiuj Node URL
2. Utwórz `snh-{slug}.figma.ts` w tym folderze
3. Uruchom `npx figma connect publish` aby opublikować
