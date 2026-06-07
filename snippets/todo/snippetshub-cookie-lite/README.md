# SnippetsHub Cookie Lite

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Lekki pasek zgód cookie. Zapisuje decyzję w `localStorage` i (jeśli dostępne) wywołuje `Shopify.customerPrivacy.setTrackingConsent`.

## Instalacja (layout/theme.liquid)
Wstaw przed zamknięciem `</body>`:
```liquid
{% render 'surgerycode-cookie-lite',
  text: 'We use cookies to improve your experience.',
  accept_label: 'Accept',
  decline_label: 'Decline'
%}
```

## Uwagi
- Domyślnie ukryty dopóki nie ma decyzji. Po kliknięciu „Accept/Decline” znika i zapisuje wybór.
- Kluczem w `localStorage` zarządza skrypt (prefiks `surgerycode_cookie_consent`).

## Pliki
- snippets/surgerycode-cookie-lite.liquid
- assets/surgerycode-cookie-lite.css
- assets/surgerycode-cookie-lite.js

---

# SnippetsHub Cookie Lite (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Lightweight cookie consent bar. Stores the decision in `localStorage` and, if available, calls `Shopify.customerPrivacy.setTrackingConsent`.

## Installation (layout/theme.liquid)
Place before closing `</body>`:
```liquid
{% render 'surgerycode-cookie-lite',
  text: 'We use cookies to improve your experience.',
  accept_label: 'Accept',
  decline_label: 'Decline'
%}
```

## Notes
- Hidden until a decision is made. On "Accept/Decline" it disappears and saves the choice.
- The `localStorage` key is handled by the script (prefixed `surgerycode_cookie_consent`).

## Files
- snippets/surgerycode-cookie-lite.liquid
- assets/surgerycode-cookie-lite.css
- assets/surgerycode-cookie-lite.js
