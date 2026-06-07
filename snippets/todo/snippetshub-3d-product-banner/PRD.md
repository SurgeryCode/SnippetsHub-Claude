# PRD — SnippetsHub 3D Product Banner
**Status:** ✅ Gotowe | **Priorytet:** Niski

## Co robi
Sekcja Shopify prezentująca model 3D (GLB/GLTF) przy pomocy `<model-viewer>` Google. Obsługa AR (WebXR / Scene Viewer / Quick Look na iOS).

## Pliki
| Plik | Status |
|---|---|
| `sections/surgerycode-3d-product-banner.liquid` | ✅ |
| `assets/surgerycode-3d-product-banner.css` | ✅ |
| `assets/surgerycode-3d-product-banner.js` | ✅ |

## ✅ Co działa dobrze
- Integracja z `@google/model-viewer` przez CDN (lazy-loaded)
- Ustawienia: URL modelu, poster, autoplay, AR, kolor tła — wszystko przez Theme Editor
- Sekcja-based (nie wymaga edycji `theme.liquid`)

## ❌ Do poprawy / rozszerzenia
- Brak fallback dla przeglądarek bez WebGL (powinien być img z posterem)
- Brak opcji ustawienia wysokości viewera w Theme Editor
- Brak `loading="lazy"` na modelu (domyślnie blokujący)

## Kryteria akceptacji
- [ ] Fallback img gdy `model-viewer` nie obsługiwany
- [ ] Pole `height` w schema (px lub %)
- [ ] AR button schowany gdy brak wsparcia (`ar-status` event)
