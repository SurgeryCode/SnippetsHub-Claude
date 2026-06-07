# Historia iteracji

## Iteracja: v1.0.0

### Data
2026-03-29

### Cel iteracji
Przygotowanie pierwszej iteracji MVP na podstawie bazowego PRD.

### Co zmieniono
- Przygotowano uporządkowany `STATE.json` dla pierwszej iteracji.
- Dodano uniwersalny plik z promptem do uruchamiania PRD w nowych czatach.
- Dodano plik historii iteracji dla dalszego rozwoju rozwiązania.

### Zmodyfikowane pliki
- `PRD/STATE.json`
- `PRD/ITERATIONS.md`
- `RUN_PRD_PROMPT_PL.md`

### Wynik
Folder `PRD` jest gotowy do prowadzenia dalszej pracy iteracyjnej nad snippetem.

### Otwarte tematy
- Przygotowanie pierwszej implementacji MVP.
- Ustalenie docelowego demo theme do testów.

---

## Iteracja: v1.0.1

### Data
2026-03-29

### Cel iteracji
Wdrożenie pierwszego działającego MVP sticky add to cart w obrębie bieżącego folderu rozwiązania.

### Co zmieniono
- Dodano section z pełnym schema i renderem snippetu dla product page.
- Dodano snippet z markupiem sticky bara oraz serializacją danych wariantów.
- Dodano asset CSS i JS z obsługą scrolla, synchronizacji wariantu i dodawania do koszyka.
- Przygotowano `README.md`, `LICENSE.md` i `manifest.json`.
- Zaktualizowano `PRD/STATE.json` zgodnie z aktualnym stanem prac.

### Zmodyfikowane pliki
- `sections/snh-sticky-add-to-cart-for-product-page.liquid`
- `snippets/snh-sticky-add-to-cart-for-product-page.liquid`
- `assets/snh-sticky-add-to-cart-for-product-page.css`
- `assets/snh-sticky-add-to-cart-for-product-page.js`
- `README.md`
- `LICENSE.md`
- `manifest.json`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md`

### Wynik
Powstało kompletne MVP rozwiązania Sticky Add to Cart for Product Page gotowe do osadzenia w Shopify theme i manualnych testów integracyjnych.

### Otwarte tematy
- Test na konkretnym demo theme i dopasowanie do jego zdarzeń cart drawer.
- Weryfikacja zachowania na produktach z niestandardowym pickerem wariantów.

---

## Iteracja: v1.0.2

### Data
2026-03-29

### Cel iteracji
Wzmocnienie kompatybilności sticky add to cart z różnymi implementacjami formularza produktu i logiką scrolla w demo theme.

### Co zmieniono
- Ustawiono domyślnie `Show product image` na `true` w schema sekcji.
- Zmieniono logikę JS tak, aby sticky bar preferował natywny submit głównego formularza produktu zamiast własnego `fetch`, gdy formularz motywu jest dostępny.
- Rozszerzono nasłuch wariantów o dodatkowe eventy spotykane w demo theme, w tym `variant:update` i `variant:selected`.
- Poprawiono wykrywanie obszaru, po którego opuszczeniu sticky bar ma się pojawić, oraz dodano ukrywanie przy stopce.
- Uporządkowano i naprawiono składnię `PRD/STATE.json`.

### Zmodyfikowane pliki
- `sections/snh-sticky-add-to-cart-for-product-page.liquid`
- `assets/snh-sticky-add-to-cart-for-product-page.js`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md`

### Wynik
Implementacja jest lepiej przygotowana do współpracy z motywami typu Dawn, Publisher, Taste, Savor i Horizon oraz gotowa do kolejnej rundy manualnych testów integracyjnych.

### Otwarte tematy
- Potwierdzenie na każdym demo theme, że add to cart przechodzi bez błędu.
- Sprawdzenie, czy któryś theme nadal wymaga dodatkowego hooka do otwierania lub odświeżania cart drawer.

---

## Iteracja: v1.0.3

### Data
2026-03-29

### Cel iteracji
Ujednolicenie zachowania sticky add to cart po dodaniu produktu oraz dodanie brakujących ustawień schema dla różnych motywów demo.

### Co zmieniono
- Dodano opcję schema do ukrywania sticky bara w pobliżu stopki, domyślnie włączoną.
- Dodano opcję schema określającą zachowanie po add to cart, z domyślnym pozostaniem na stronie produktu.
- Ograniczono natywny submit formularza do przypadków, w których motyw może obsłużyć add to cart bez niechcianego redirectu.
- Dodano fallback obrazu wariantu do głównego obrazu produktu, gdy wariant nie ma własnego media.
- Uporządkowano i przepisano `PRD/STATE.json` do poprawnej, czystej postaci.

### Zmodyfikowane pliki
- `sections/snh-sticky-add-to-cart-for-product-page.liquid`
- `snippets/snh-sticky-add-to-cart-for-product-page.liquid`
- `assets/snh-sticky-add-to-cart-for-product-page.js`
- `manifest.json`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md`

### Wynik
Snippet ma bardziej przewidywalne zachowanie między motywami, większą kontrolę w schema i bezpieczniejszą aktualizację danych wariantu w sticky barze.

### Otwarte tematy
- Manualne potwierdzenie jednolitego zachowania po add to cart na wszystkich demo theme.
- Weryfikacja, czy wszystkie edge case zmiany wariantu aktualizują sticky bar bez opóźnień.

---

## Iteracja: v1.0.4

### Data
2026-03-30

### Cel iteracji
Dopracowanie synchronizacji danych wariantu w sticky barze oraz uzupełnienie PRD o instrukcję instalacji i użycia.

### Co zmieniono
- Dodano do markupu dodatkowe dane produktu potrzebne do bezpieczniejszej synchronizacji sticky bara.
- Rozszerzono JS o normalizację danych wariantu z eventów motywu, formatowanie cen i fallback obrazu.
- Poprawiono aktualizację obrazu oraz atrybutu `alt` przy zmianie wariantu.
- Dodano do `PRD.md` sekcję instalacji, podstawowego użycia i weryfikacji po instalacji.
- Zaktualizowano wersję rozwiązania do `1.0.4`.

### Zmodyfikowane pliki
- `snippets/snh-sticky-add-to-cart-for-product-page.liquid`
- `assets/snh-sticky-add-to-cart-for-product-page.js`
- `PRD/PRD.md`
- `manifest.json`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md`

### Wynik
Sticky bar jest lepiej przygotowany do odbierania danych wariantu z różnych motywów, a dokumentacja produktu zawiera już instrukcję instalacji i podstawowe zasady użycia.

### Otwarte tematy
- Manualne potwierdzenie działania na demo theme po ostatnich poprawkach.
- Weryfikacja, czy każdy motyw poprawnie odświeża wszystkie dane sticky bara po zmianie wariantu.

---

## Iteracja: v1.0.5

### Data
2026-03-30

### Cel iteracji
Wzmocnienie dynamicznej synchronizacji obrazu wariantu w sticky barze oraz uporządkowanie stanu iteracji po kolejnej serii poprawek runtime.

### Co zmieniono
- Dodano fallback synchronizacji obrazu sticky bara z aktualnie widocznym obrazem produktu w DOM.
- Rozszerzono reakcję sticky bara na zmianę wariantu o odczyt aktualnej grafiki po stronie storefrontu.
- Uporządkowano i przepisano `PRD/STATE.json` po ręcznych dopiskach, które naruszyły strukturę JSON.
- Zaktualizowano wersję rozwiązania do `1.0.5`.

### Zmodyfikowane pliki
- `assets/snh-sticky-add-to-cart-for-product-page.js`
- `sections/snh-sticky-add-to-cart-for-product-page.liquid`
- `snippets/snh-sticky-add-to-cart-for-product-page.liquid`
- `assets/snh-sticky-add-to-cart-for-product-page.css`
- `manifest.json`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md`

### Wynik
Sticky bar jest lepiej przygotowany do podążania za zmianą obrazu wariantu nawet wtedy, gdy motyw nie przekazuje pełnych danych obrazka bezpośrednio w eventach.

### Otwarte tematy
- Manualne potwierdzenie dynamicznej aktualizacji obrazu wariantu na demo theme.
- Potwierdzenie zachowania add to cart i widoczności sticky bara na PDP po ostatnich poprawkach.

---

## Iteracja: v1.0.6

### Data
2026-03-30

### Cel iteracji
Dopasowanie logiki sticky bara do wspólnych wzorców Shopify PDP tak, aby bezpieczniej synchronizował obraz wariantu, pozostawał na stronie produktu po AJAX add to cart i nie aktywował się zbyt wcześnie.

### Co zmieniono
- Zawężono wyszukiwanie aktualnego obrazu produktu do kontekstu głównego PDP i aktywnego media, z odrzuceniem quick add, drawerów i modalnych źródeł.
- Rozszerzono ścieżkę `stay_on_page` o pobranie stanu koszyka po `cart/add.js` oraz emisję zgodnego eventu `cart:update` z detalami zbliżonymi do `product-form` i `product-form-component`.
- Dodano bezpieczny fallback usuwający stan `is-empty` z drawerów po AJAX add to cart.
- Doprecyzowano warunek widoczności sticky bara tak, aby nie pokazywał się dla pustych lub błędnie rozpoznanych triggerów.
- Zaktualizowano wersję rozwiązania do `1.0.6` i stan iteracji w `STATE.json`.

### Zmodyfikowane pliki
- `assets/snh-sticky-add-to-cart-for-product-page.js`
- `assets/snh-sticky-add-to-cart-for-product-page.css`
- `sections/snh-sticky-add-to-cart-for-product-page.liquid`
- `snippets/snh-sticky-add-to-cart-for-product-page.liquid`
- `manifest.json`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md`

### Wynik
Implementacja jest bliższa wspólnemu wzorcowi Shopify product form i cart UI, a kluczowe ścieżki runtime mają mniej zależności od przypadkowego DOM poza głównym kontekstem produktu.

### Otwarte tematy
- Manualne potwierdzenie, że obraz sticky bara aktualizuje się poprawnie bez odświeżania strony na demo theme.
- Potwierdzenie, że `stay_on_page` nie prowadzi do redirectu i prawidłowo odświeża cart UI na Publisher, Taste, Savor i Horizon.
- Potwierdzenie, że sticky bar nie pojawia się od razu po wejściu na PDP w Savor.
