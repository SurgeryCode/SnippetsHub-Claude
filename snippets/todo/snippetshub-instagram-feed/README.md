# SnippetsHub Instagram Feed

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Renderuje siatkę postów z Instagrama na podstawie endpointu JSON (np. App Proxy / CDN). Obsługuje format tablicy lub `{ data: [...] }`.

## Instalacja
1) W edytorze motywu dodaj sekcję „SnippetsHub Instagram Feed”.
2) Ustaw w sekcji:
   - `endpoint` – URL do zasobu JSON zwracającego listę postów
   - `limit` – maksymalna liczba elementów do wyświetlenia
3) Assety JS/CSS dołączane przez sekcję automatycznie.

## Struktura danych (przykładowa)
Akceptowane pola (dowolny z):
- Obraz: `media_url` | `thumbnail_url` | `images.standard_resolution.url` | `url`
- Link: `permalink` | `link`
- Alt: `caption` | `alt`

## Pliki
- sections/surgerycode-instagram-feed.liquid
- assets/surgerycode-instagram-feed.css
- assets/surgerycode-instagram-feed.js

---

# SnippetsHub Instagram Feed (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Renders a grid of Instagram posts from a JSON endpoint (e.g., App Proxy / CDN). Supports array or `{ data: [...] }` formats.

## Installation
1) In the theme editor add the section “SnippetsHub Instagram Feed”.
2) Configure in the section:
   - `endpoint` – URL to a JSON resource returning posts
   - `limit` – maximum number of items to display
3) Assets are auto-included by the section.

## Data shape (example)
Accepted fields (any of):
- Image: `media_url` | `thumbnail_url` | `images.standard_resolution.url` | `url`
- Link: `permalink` | `link`
- Alt: `caption` | `alt`

## Files
- sections/surgerycode-instagram-feed.liquid
- assets/surgerycode-instagram-feed.css
- assets/surgerycode-instagram-feed.js
