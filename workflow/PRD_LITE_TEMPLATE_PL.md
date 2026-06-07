# PRD Lite dla SnippetsHub

Ten dokument jest rekomendowanym szablonem PRD dla nowych snippetów, sekcji i lekkich rozwiązań Shopify tworzonych w SnippetsHub.

Cel tego PRD:
- dać AI i developerowi pełny, ale lekki kontekst zadania,
- ograniczyć nieporozumienia i dopowiadanie wymagań,
- przyspieszyć realizację od briefu do gotowego rozwiązania,
- utrzymać spójność techniczną, biznesową i produktową.

To nie ma być ciężki dokument korporacyjny.
Ma być krótki, konkretny i praktyczny.

## Jak używać

1. Skopiuj ten szablon do nowego pliku dla konkretnego snippetu.
2. Uzupełnij tylko sekcje, które są istotne dla zadania.
3. Wklej gotowy PRD do nowego czatu razem z `MASTER_PROMPT_PL.md` albo podaj ścieżkę do pliku.
4. Jeśli czegoś nie wiesz, zostaw krótką notatkę `Do decyzji`.

## Szablon

```md
# PRD Lite: [Nazwa rozwiązania]

## 1. Podsumowanie

### Nazwa robocza
[Wpisz nazwę]

### Typ rozwiązania
[section / snippet / section + snippet / section + snippet + assets / web component]

### Status
[pomysł / MVP / do realizacji / do poprawy / gotowe]

### Priorytet
[wysoki / średni / niski]

## 2. Cel biznesowy

### Problem
[Jaki problem ecommerce rozwiązujemy?]

### Cel
[Jaki efekt biznesowy chcemy osiągnąć?]

### Główny KPI
[Np. wzrost CTR, wzrost Add to Cart Rate, wzrost CR, wzrost AOV]

## 3. Użytkownik i kontekst użycia

### Dla kogo jest to rozwiązanie
[Merchant / sklep Shopify / freelancer / agencja / klient końcowy]

### Gdzie działa
[product page / collection page / cart drawer / homepage / landing page / footer / header]

### Moment użycia
[Kiedy użytkownik widzi i używa tego rozwiązania?]

## 4. Zakres MVP

### Funkcje obowiązkowe
- [funkcja 1]
- [funkcja 2]
- [funkcja 3]

### Funkcje opcjonalne
- [funkcja opcjonalna 1]
- [funkcja opcjonalna 2]

### Poza zakresem
- [czego teraz nie robimy]
- [co odkładamy na później]

## 5. Wymagania UX/UI

### Zachowanie rozwiązania
- [jak ma się zachowywać komponent]
- [jakie są stany: default, active, loading, error, hidden]

### Responsive
- [wymagania dla mobile]
- [wymagania dla tablet]
- [wymagania dla desktop]

### Edytowalność w Shopify
- [jakie elementy merchant ma móc edytować]
- [teksty / kolory / spacing / widoczność / układ]

## 6. Wymagania techniczne

### Architektura
[Jakiego typu rozwiązanie budujemy i dlaczego]

### Wymagania techniczne
- zgodność z Shopify Online Store 2.0
- brak zbędnych zależności zewnętrznych
- brak inline CSS
- CSS w scope `.SnippetsHub`
- nazewnictwo zgodne ze standardem SnippetsHub

### Pliki, które mają powstać
- [section]
- [snippet]
- [CSS]
- [JS]
- [README]
- [manifest]
- [LICENSE]

### Integracje i zależności
- [czy rozwiązanie zależy od formularza produktu, wariantów, koszyka, metafields, app blocks itp.]

## 7. Schema i ustawienia Shopify

### Ustawienia obowiązkowe
- [setting 1]
- [setting 2]
- [setting 3]

### Bloki
- [czy są potrzebne bloki? jakie?]

### Domyślne wartości
- [domyślne ustawienia, jeśli ważne]

## 8. Treści i komunikacja

### Teksty w interfejsie
- [CTA]
- [etykiety]
- [komunikaty]

### Wersje językowe
[PL / EN / tylko EN / do decyzji]

## 9. Kryteria akceptacji

- [kryterium 1]
- [kryterium 2]
- [kryterium 3]
- [kryterium 4]

## 10. Ryzyka i ograniczenia

- [ryzyko techniczne]
- [ryzyko UX]
- [ograniczenie platformy Shopify]

## 11. Materiały sprzedażowe

### Czy przygotować dane do Shopify Product Listing Data
[tak / nie]

### Jeśli tak, przygotować:
- tytuł produktu
- krótki opis
- pełny opis produktu
- ceny wariantów licencji
- tagi produktu
- SEO title
- meta description

## 12. Wdrożenie i testy

### Docelowy theme
`themes-shopify/White_SnippetsHub-Shopify-Production`

### Co przetestować ręcznie
- [test 1]
- [test 2]
- [test 3]

### Założenia robocze
- [założenie 1]
- [założenie 2]

## 13. Definicja ukończenia

Zadanie uznajemy za ukończone, gdy:
- rozwiązanie jest gotowe technicznie,
- spełnia zakres MVP,
- jest zgodne ze standardem SnippetsHub,
- ma przygotowaną dokumentację,
- ma jasno opisane testy i założenia.
```

## Rekomendacja dla SnippetsHub

Najlepszy model pracy dla Ciebie:
- szybki brief w `INPUT_BRIEF_TEMPLATE.md`,
- jeśli zadanie jest ważniejsze lub bardziej złożone, doprecyzowany PRD,
- potem realizacja z `MASTER_PROMPT_PL.md`.

## Kiedy używać PRD

PRD warto stosować zawsze, gdy:
- snippet ma więcej niż 2-3 funkcje,
- dochodzą ustawienia schema,
- są zależności z kartą produktu, wariantami lub koszykiem,
- chcesz przygotować też README i materiały sprzedażowe,
- chcesz wrócić do zadania po czasie bez utraty kontekstu.

## Kiedy wystarczy sam brief

Sam brief wystarczy, gdy:
- zadanie jest bardzo małe,
- to szybki eksperyment,
- zakres MVP jest oczywisty,
- nie potrzebujesz rozpisanego acceptance criteria.
