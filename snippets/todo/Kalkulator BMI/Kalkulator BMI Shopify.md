# Shopify Implementation Guide – Health Calculators (BMI, Calories, Hydration)

# Dokument Techniczny

## Wersja

1.0

---

# Cel

Celem jest przygotowanie modułu kalkulatorów zdrowotnych jako w pełni niezależnego komponentu działającego w ekosystemie Shopify.

Rozwiązanie powinno:

* działać bez aplikacji zewnętrznych,
* nie wpływać na wydajność sklepu,
* być łatwe do rozbudowy,
* być zgodne z Shopify Online Store 2.0,
* umożliwiać edycję treści z poziomu Theme Customizer.

---

# Architektura rozwiązania

```
Theme

├── sections/
│      health-calculator.liquid
│
├── snippets/
│      bmi-form.liquid
│      calories-form.liquid
│      hydration-form.liquid
│      result-card.liquid
│
├── assets/
│      health-calculator.css
│      health-calculator.js
│
├── locales/
│      en.default.json
│      pl.json
│
└── templates/
       page.health-calculator.json
```

---

# Dlaczego Section zamiast aplikacji?

## Zalety

✅ brak miesięcznych kosztów

✅ brak App Embed

✅ brak App Proxy

✅ brak zewnętrznego hostingu

✅ pełna kontrola kodu

✅ łatwa migracja

---

# Struktura komponentu

```
Health Calculator

│

├── Hero

├── Opis

├── Tabs

│      BMI

│      Kalorie

│      Nawodnienie

│

├── Formularze

├── Wyniki

├── CTA

└── FAQ
```

---

# Shopify Section

health-calculator.liquid

Odpowiada za:

* strukturę HTML
* konfigurację Theme Editor
* osadzanie snippetów
* inicjalizację JS

---

# Snippets

## bmi-form.liquid

Odpowiada wyłącznie za formularz BMI.

---

## calories-form.liquid

Formularz kalorii.

---

## hydration-form.liquid

Formularz nawodnienia.

---

## result-card.liquid

Uniwersalna karta wyników.

Przykład

```
Wartość

Opis

Interpretacja

Ikona

CTA
```

---

# Assets

## health-calculator.css

Wyłącznie style.

Podział:

```
Variables

Layout

Forms

Buttons

Cards

Animations

Responsive
```

---

## health-calculator.js

Podział modułów

```
Calculator

Validation

UI

Events

Animations
```

---

# JavaScript Architecture

```
HealthCalculator

│

├── BMI Module

├── Calories Module

├── Hydration Module

├── Validation Module

├── Animation Module

└── UI Module
```

Każdy moduł powinien być od siebie niezależny.

---

# Theme Editor

Merchant powinien mieć możliwość edycji:

Nagłówka

Podtytułu

Opisów

Kolorów

CTA

Tekstu przycisku

FAQ

Koloru kart

Koloru przycisku

Tekstu wyników

bez konieczności edycji kodu.

---

# Section Schema

Powinny znaleźć się ustawienia:

Hero title

Hero subtitle

Button label

Button URL

Background color

Text color

Card color

Accent color

FAQ

CTA

---

# Lokalizacja

Wszystkie teksty powinny korzystać z:

```
locales/pl.json

locales/en.default.json
```

Przykład

```
sections.health.title

sections.health.subtitle

sections.health.bmi

sections.health.water
```

Nie wpisujemy tekstów bezpośrednio do Liquid.

---

# Liquid

Liquid odpowiada jedynie za:

renderowanie HTML

ustawienia Theme Editor

tłumaczenia

render snippetów

Nie wykonuje obliczeń.

---

# JavaScript

Cała logika znajduje się w JS.

Obliczane są:

BMI

BMR

TDEE

Hydration

Walidacja

Interpretacja wyników

Animacje

---

# CSS

Projekt zgodny z Theme Variables.

Nie nadpisujemy globalnych klas Shopify.

Stosujemy namespace.

Przykład

```
.health-calculator

.health-card

.health-form

.health-input

.health-result

.health-button
```

---

# Responsywność

Desktop

1440

1280

1024

Tablet

768

Mobile

480

320

---

# Accessibility

Każdy input posiada

label

id

aria-label

aria-describedby

Komunikaty błędów

aria-live

Focus states

Obsługa klawiatury

WCAG AA

---

# Performance

Nie używać

jQuery

Bootstrap

Tailwind CDN

Moment.js

Dużych bibliotek

Całość Vanilla JS.

---

# Lazy Loading

Sekcja JS inicjalizowana dopiero po pojawieniu się komponentu.

Intersection Observer

---

# SEO

Sekcja powinna generować

H1

H2

FAQ

Schema FAQ

Breadcrumb

Meta Description

Przyjazny URL

```
/pages/health-calculator
```

---

# Integracja z CMS Shopify

Możliwość stworzenia nowej strony

Pages

↓

Health Calculator

↓

Template

```
page.health-calculator
```

↓

Dodanie sekcji

Health Calculator

bez pisania kodu.

---

# CTA

Na końcu wyników

Przycisk

Kup Ebook

lub

Skontaktuj się

Adres konfigurowany z Theme Editor.

---

# Możliwość rozbudowy

Architektura powinna umożliwiać dodanie nowych modułów:

Ideal Weight

Body Fat

WHR

Protein Calculator

Macro Calculator

BMI Kids

Pregnancy Weight

bez modyfikowania istniejących modułów.

---

# Bezpieczeństwo

Brak zapisu danych użytkownika.

Brak Local Storage.

Brak Cookies.

Brak komunikacji z backendem.

Obliczenia wykonywane wyłącznie po stronie klienta.

---

# Testy

Desktop

Chrome

Firefox

Safari

Edge

---

Tablet

iPad

Android Tablet

---

Mobile

iPhone

Android

---

# Definition of Done

✅ Sekcja działa w Shopify Online Store 2.0

✅ Można ją dodać z Theme Customizer

✅ Wszystkie kalkulatory działają poprawnie

✅ Merchant może edytować treści

✅ Kod jest modułowy

✅ Brak zależności od aplikacji zewnętrznych

✅ Brak błędów JavaScript

✅ Lighthouse Performance ≥ 90

✅ Lighthouse Accessibility ≥ 95

✅ Lighthouse SEO ≥ 95

✅ Gotowość do rozbudowy o kolejne kalkulatory bez zmian architektury projektu.
