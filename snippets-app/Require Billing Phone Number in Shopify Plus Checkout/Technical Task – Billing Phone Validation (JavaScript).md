# Technical Task – Billing Phone Validation (JavaScript)

## Stack

- Shopify CLI
- JavaScript
- React
- Checkout UI Extension
- Shopify Functions
- Git

---

# Etap 1

Utworzenie aplikacji

```
shopify app init
```

---

# Etap 2

Dodanie Checkout UI Extension

```
shopify app generate extension
```

Typ:

```
Checkout UI
```

---

# Etap 3

Dodanie Validation Function

```
shopify app generate extension
```

Typ:

```
Checkout Validation Function
```

---

# Etap 4

Checkout UI Extension

Pobrać:

- useShippingAsBilling
- billingAddress
- billingAddress.phone

Nasłuchiwać zmian.

---

# Etap 5

Jeżeli telefon istnieje

Zapisać:

```
custom.billing_phone
```

---

# Etap 6

Jeżeli klient przełączy

Use different billing address

odświeżyć wartość metafield.

---

# Etap 7

Validation Function

Pobrać:

```
custom.billing_phone
```

---

# Etap 8

Jeżeli

```
billing != shipping
```

oraz

```
billing_phone == ""
```

zwrócić

```
ValidationError
```

---

# Etap 9

Komunikat

```
Please enter a billing phone number.
```

---

# Etap 10

Testy

### Test 1

Billing = Shipping

✔ Checkout działa

---

### Test 2

Different Billing

Phone pusty

✔ Checkout zablokowany

---

### Test 3

Different Billing

Phone wpisany

✔ Checkout przechodzi

---

### Test 4

Zmiana billing address

✔ metafield aktualizuje się

---

### Test 5

Zmiana telefonu

✔ metafield aktualizuje się

---

### Test 6

Powrót do

Use shipping as billing

✔ walidacja nie działa

---

# Struktura projektu

```
extensions/

checkout-ui/

src/

extension.jsx

utils.js

hooks.js

--------------------

validation-function/

src/

run.js

run.graphql

shopify.extension.toml
```

---

# Przepływ danych

Customer

↓

Billing Phone

↓

Checkout UI Extension

↓

Metafield

↓

Validation Function

↓

Validation Error

↓

Checkout Blocked

---

# Definition of Done

- Checkout nie pozwala przejść bez billing phone.
- Walidacja działa wyłącznie dla "Use different billing address".
- Komunikat błędu jest wyświetlany użytkownikowi.
- Rozwiązanie jest zgodne z Checkout Extensibility.
- Brak ingerencji w DOM checkoutu.
- Rozwiązanie jest gotowe do wdrożenia przez Shopify CLI.
