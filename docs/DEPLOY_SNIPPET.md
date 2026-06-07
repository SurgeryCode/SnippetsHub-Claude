# Deploy snippetu do motywow Shopify

Poniższe komendy automatycznie kopiują pliki snippetu do motywów w folderze `shopify-themes`.
Skrypt kopiuje katalogi: `assets/`, `snippets/`, `sections/` oraz inne standardowe foldery, jeśli występują.

## Build ZIP z `snippets-list`

Budowanie paczki ZIP odbywa się przez skrypty w `tools/`.

### Jeden snippet

```bash
npm run build -- <snippet-slug>
```

Przykład:

```bash
npm run build -- snh-sticky-add-to-cart
```

Wynik:

- `dist/<snippet-slug>.zip`

### Wszystkie snippety

```bash
npm run build:all
```

### Tryb strict (ostrzeżenia blokują build)

```bash
npm run build -- <snippet-slug> --strict
```

```bash
npm run build:all -- --strict
```

## Wszystkie motywy

```bash
npm run deploy:themes -- snippetshub-countdown-bar all
```

## Jeden motyw

```bash
npm run deploy:themes -- snippetshub-countdown-bar SnippetsHubWhite
```

## Kilka motywów naraz

```bash
npm run deploy:themes -- snippetshub-countdown-bar SnippetsTestDawn,SnippetsHubWhite
```

## Uwaga

Jeśli motywy mają inne nazwy, użyj dokładnych nazw folderów w `shopify-themes/`.

##Push to the theme

```bash
Live theme = snippetshubdev - v2 Production
shopify theme push --store snippetshubdev.myshopify.com --theme 186465550709
```

```bash
Development theme = snippetshubdev - v2 Development
shopify theme push --store snippetshubdev.myshopify.com --theme 186471678325
```

```bash
shopify theme dev --store snippetshubdev.myshopify.com --theme 186471678325 --theme-editor-sync
```

```bash
npm run deploy:themes -- snippetshub-countdown-bar SnippetsTestDawn, SnippetsTestHorizon
```
