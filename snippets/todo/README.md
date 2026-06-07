# SnippetsHub x SnippetsHub – Pack (OS 2.0)

- Author: SnippetsHub (https://SnippetsHub.com)
- Marketplace: https://SnippetsHub.com
- License: © 2025 SnippetsHub & SnippetsHub. Licensed for a single Shopify store only. Redistribution, resale, copying to third parties strictly prohibited.

## Zawartość pakietu

W folderze znajdują się gotowe rozwiązania (Liquid/JS/CSS) zgodne z Shopify Online Store 2.0. Każde rozwiązanie ma własną wersję bazową oraz wariant „v1” w osobnym folderze, aby umożliwić równoległe testy bez kolizji nazw assetów i elementów DOM.

- Cart Drawer / Cart Drawer v1
- App Script Manager / App Script Manager v1
- Performance Lite Loader / Performance Lite Loader v1
- Sticky Add-to-Cart / Sticky Add-to-Cart v1
- 3D Product Banner / 3D Product Banner v1
- Cookie Lite / Cookie Lite v1
- Instagram Feed / Instagram Feed v1
- Landing Page Creator / Landing Page Creator v1 (+ templates/page.landing.json preset)

## Wymagania

- Motyw oparty o Shopify OS 2.0 (sections/snippets, assets)
- Uprawnienia do edycji plików theme (layout/theme.liquid, templates, sections)
- Dla App Script Manager – (opcjonalnie) włączone zarządzanie zgodami: `Shopify.customerPrivacy`
- Dla 3D banner – dostęp do modelu `.glb`/`.gltf` oraz CDN `@google/model-viewer`

---

## Instrukcje instalacji i miejsca w theme

Poniżej skrócone instrukcje (analogicznie dla wariantów v1 – używaj nazw z „-v1” w ścieżkach i identyfikatorach).

### 1) Cart Drawer
- Umieść sekcję (np. na końcu `<body>` w `layout/theme.liquid`):
  ```liquid
  {% section 'surgerycode-cart-drawer' %}
  ```
- Wymagane: przyciski add-to-cart z atrybutem `data-add-to-cart`.
- Assety dołączane przez sekcję automatycznie.

### 2) App Script Manager
- Wstaw w `<head>` (layout/theme.liquid):
  ```liquid
  {% render 'app-script-manager', scripts: [
    {"id":"ga4","src":"https://example.com/ga4.js","mode":"afterLoad","consent":["analytics"]},
    {"id":"chat","src":"https://example.com/chat.js","mode":"interaction","consent":["marketing"]}
  ] %}
  ```
- Alternatywnie: ustaw `shop.metafields.surgerycode.app_scripts` (lista JSON) – snippet ma fallback.
- Tryby: `immediate`, `afterLoad`, `interaction`, `idle`.

### 3) Performance Lite Loader
- Wstaw w `<head>` lub na początku `<body>`:
  ```liquid
  {% render 'performance-lite-loader', config: {
    "mode": "idle",
    "selectors": ["script[data-lite-src]","link[data-lite-href]","iframe[data-lite-src]"]
  } %}
  ```
- Oznacz ciężkie zasoby do odroczenia: `data-lite-src` / `data-lite-href`.

### 4) Sticky Add-to-Cart
- Dodaj na szablonie produktu (np. `sections/main-product.liquid`):
  ```liquid
  {% render 'surgerycode-sticky-add-to-cart' %}
  ```
- Wymaga formularza `form[action*="/cart/add"]` na stronie produktu.

### 5) 3D Product Banner
- Dodaj sekcję w edytorze motywu: „SnippetsHub 3D Product Banner”.
- Ustaw: URL modelu `.glb/.gltf`, opcjonalnie poster i AR.

### 6) Cookie Lite
- Wstaw w `layout/theme.liquid` przed zamknięciem `</body>`:
  ```liquid
  {% render 'surgerycode-cookie-lite',
    text: 'We use cookies to improve your experience.',
    accept_label: 'Accept',
    decline_label: 'Decline'
  %}
  ```
- Zapis decyzji w `localStorage`; integracja z `customerPrivacy.setTrackingConsent` jeśli dostępna.

### 7) Instagram Feed
- Dodaj sekcję: „SnippetsHub Instagram Feed”.
- Ustawienia: `endpoint` (JSON z App Proxy/CDN), `limit`.

### 8) Landing Page Creator (+ preset JSON)
- Dodaj sekcję: „SnippetsHub Landing Page Creator” lub wersję v1.
- Opcjonalny preset strony: skopiuj plik `snippetshub-landing-page-creator-v1/templates/page.landing.json` do katalogu `templates/` motywu i utwórz stronę typu „landing”.

---

## Czym są poszczególne elementy (opis)

- Cart Drawer: panel wysuwany koszyka (AJAX), renderuje pozycje z `/cart.js`, wspiera upselle z metafieldu produktu.
- App Script Manager: kontroluje ładowanie zewnętrznych skryptów wg trybu i zgód użytkownika.
- Performance Lite Loader: odracza zasoby (script/link/iframe) oznaczone `data-lite-*` do momentu `idle/interaction/afterLoad`.
- Sticky Add-to-Cart: pasek CTA pojawiający się, gdy formularz ATC jest poza widokiem.
- 3D Product Banner: sekcja z `model-viewer` dla prezentacji modelu 3D z opcją AR.
- Cookie Lite: lekki pasek zgód cookie, zapisuje decyzję i propaguje do `customerPrivacy`.
- Instagram Feed: pobiera i renderuje siatkę obrazów z dostarczonego endpointu JSON.
- Landing Page Creator: budowniczy LP w oparciu o bloki (hero/text/image/cta/faq) i style bazowe.

---

## Wersje v1

Warianty v1 mają osobne foldery oraz unikalne nazwy: sekcji/snippetów i assetów (np. `-v1`), co pozwala na równoległe testy w motywie.

## Support

- Dokumentacja i wsparcie: https://SnippetsHub.com
- Błędy/feedback: zgłaszaj z nazwą folderu i pliku oraz krótkim opisem środowiska (motyw, apps, przeglądarka).
