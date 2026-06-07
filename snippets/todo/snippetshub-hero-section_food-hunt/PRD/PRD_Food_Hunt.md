# PRD: Interaktywny Hero Section "Food Hunt"

**Cel:** Stworzenie responsywnej, luksusowej sekcji typu Hero z interaktywną karuzelą dań rozmieszczonych na łuku, zgodnie z dostarczonym projektem graficznym.

---

## 1. Ogólna specyfikacja wizualna
* **Paleta kolorystyczna:**
    * `Primary`: #FF9F66 (Brzoskwiniowy/Pomarańczowy)
    * `Background`: #FFFFFF (Biały)
    * `Text Main`: #222222 (Ciemnoszary/Czarny)
    * `Text Accent`: #FF9F66 (Pomarańczowy nagłówek)
* **Typografia:** Poppins lub Montserrat (Sans-serif).
* **Efekt karty:** Cała sekcja zamknięta w kontenerze z `border-radius: 30px` i delikatnym `box-shadow`.

---

## 2. Architektura i Iteracje implementacji

### Iteracja 1: Struktura HTML & Bazowy CSS
**Cel:** Stworzenie szkieletu i asymetrycznego tła.
* **Elementy:**
    * `nav`: Logo "Food Hunt", menu linki, ikona koszyka.
    * `.hero-content`: Nagłówki (H2 "Delicious", H1 "Quench the hunger"), opis (tekst lorem ipsum), przycisk CTA.
    * `.hero-visual`: Prawa strona z pomarańczowym tłem w kształcie łuku.
* **Kluczowe wyzwanie:** Użycie `clip-path` lub dużego elementu z `border-radius: 50%` ustawionego absolutnie, aby uzyskać charakterystyczne wycięcie tła.

### Iteracja 2: System Orbity i Pozycjonowanie
**Cel:** Rozmieszczenie talerzy na łuku.
* **Główny talerz:** Centralny obraz dania (np. łosoś) pozycjonowany na styku kolorów.
* **Orbita:** Utworzenie niewidocznego (lub przerywanego) koła/łuku nad daniem głównym.
* **Małe talerze:** Rozmieszczenie 4-5 miniatur potraw wzdłuż łuku przy użyciu:
    ```css
    transform: rotate(calc(var(--angle) * 1deg)) translate(200px) rotate(calc(var(--angle) * -1deg));
    ```
* **Nawigacja:** Dodanie pomarańczowych przycisków ze strzałkami.

### Iteracja 3: Interaktywność (JavaScript)
**Cel:** Logika zmiany dań.
* **Tablica danych:** Obiekt JSON zawierający: `id`, `title`, `description`, `image_url`.
* **Zdarzenia:** Kliknięcie w mały talerz na orbicie aktualizuje:
    1. Obraz główny (z animacją fade-in).
    2. Tekst nagłówka i opis.
    3. Klasę `.active` na miniaturze.
* **Nawigacja strzałkami:** Przełączanie między potrawami w pętli.

### Iteracja 4: Detale i Responsywność
**Cel:** Dopracowanie UX.
* **Hover Effects:** Delikatne powiększenie (scale) talerzy i przycisku CTA.
* **Mobile:** Na ekranach poniżej 992px układ zmienia się w jedną kolumnę (tekst nad grafiką), a orbita zostaje przeskalowana lub zamieniona w klasyczny slider poziomy.

---

## 3. Wytyczne techniczne dla AI
Podczas generowania kodu trzymaj się następujących zasad:
1.  Używaj **czystego CSS** (Flexbox i Grid do układu).
2.  Do stworzenia łuku tła użyj `::before` na głównym kontenerze.
3.  Zastosuj zmienne CSS dla kolorów i czasu trwania animacji.
4.  Zdjęcia potraw pobieraj z `https://images.unsplash.com/` (użyj tagów: food, gourmet, plated).
5.  Kod JS powinien być w **Vanilla JS** (bez bibliotek).

---
