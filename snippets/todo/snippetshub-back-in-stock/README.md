# SnippetsHub Back-in-Stock

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## Co robi
Zbiera zgłoszenia e-mail „powiadom mnie” dla niedostępnych wariantów/produktów. Wysyła żądanie do wskazanego endpointu (App Proxy / serverless).

## Instalacja
W PDP, w miejscu widgetu:
```liquid
{% render 'surgerycode-back-in-stock', endpoint: '/apps/bis/subscribe', product_id: product.id, variant_id: product.selected_or_first_available_variant.id %}
```
Uwaga: Skonfiguruj `endpoint` po stronie aplikacji/proxy, który zapisze subskrypcję i wyśle e-mail po restocku.

## Pliki
- snippets/surgerycode-back-in-stock.liquid
- assets/surgerycode-back-in-stock.css
- assets/surgerycode-back-in-stock.js

---

# SnippetsHub Back-in-Stock (EN)

- Author: SnippetsHub (https://SnippetsHub.com)
- License: © 2025 SnippetsHub & SnippetsHub. Single Shopify store. No redistribution/copying.

## What it does
Collects "notify me" email subscriptions for out-of-stock variants/products. Sends a request to a provided endpoint (App Proxy / serverless).

## Installation
On the PDP where the widget should appear:
```liquid
{% render 'surgerycode-back-in-stock', endpoint: '/apps/bis/subscribe', product_id: product.id, variant_id: product.selected_or_first_available_variant.id %}
```
Note: Configure the `endpoint` on your app/proxy to store the subscription and send an email when restocked.

## Files
- snippets/surgerycode-back-in-stock.liquid
- assets/surgerycode-back-in-stock.css
- assets/surgerycode-back-in-stock.js
