# PRD: Sekcje przypisane do konkretnej kolekcji / strony (section scoping)

**Motyw:** MManiak · **Data:** 2026-07-09 · **Status:** specyfikacja (wdrożenie pilotażowe w `sections/faq.liquid`)

---

## 1. Problem

Szablony JSON w Shopify OS 2.0 są współdzielone przez wszystkie zasoby danego typu:

- `templates/collection.json` obsługuje **każdą kolekcję**, która nie ma przypisanego szablonu alternatywnego,
- `templates/page.json` obsługuje **każdą stronę** bez szablonu alternatywnego.

Sekcja (np. FAQ) dodana przez edytor motywu do `collection.json` wyświetla się więc na **wszystkich** kolekcjach — nie tylko na tej, na której merchant ją dodał. Jedyne natywne obejście to tworzenie osobnych szablonów (`collection.rashguardy.json` itd.), co przy kilkudziesięciu kolekcjach jest nieutrzymywalne: każdy nowy szablon dubluje całą strukturę sekcji i rozjeżdża się przy zmianach globalnych.

## 2. Cel

Merchant dodaje sekcję do wspólnego szablonu i w jej ustawieniach wskazuje kolekcję lub stronę, do której sekcja należy. Sekcja renderuje się **wyłącznie** na wskazanym zasobie. Wiele niezależnych instancji tej samej sekcji (każda z własną treścią i własnym przypisaniem) współistnieje w jednym szablonie JSON.

Uwaga terminologiczna: unikalne ID instancji (`section.id`) Shopify nadaje automatycznie przy każdym dodaniu sekcji — tego nie trzeba implementować. Elementem rozwiązania jest **ustawienie przypisania** (scoping), które decyduje, gdzie dana instancja się renderuje.

## 3. Rozwiązanie — wzorzec

Trzy elementy dokładane do istniejącej sekcji, bez zmian w jej dotychczasowej logice:

### 3.1. Ustawienia w `{% schema %}`

```json
{
  "type": "header",
  "content": "Widoczność sekcji",
  "info": "Domyślnie sekcja wyświetla się na każdej stronie korzystającej z tego szablonu. Wybierz kolekcję lub stronę, aby sekcja pojawiała się wyłącznie na niej."
},
{
  "type": "collection",
  "id": "limit_collection",
  "label": "Pokaż tylko na kolekcji"
},
{
  "type": "page",
  "id": "limit_page",
  "label": "Pokaż tylko na stronie"
}
```

Ustawienia typu `collection` / `page` zwracają pełne obiekty (nie handle), więc w Liquid porównujemy `*.handle`.

### 3.2. Bramka renderowania na początku pliku sekcji

```liquid
{%- liquid
  assign show_section = true
  if section.settings.limit_collection != blank or section.settings.limit_page != blank
    assign show_section = false
    if section.settings.limit_collection != blank and request.page_type == 'collection' and collection.handle == section.settings.limit_collection.handle
      assign show_section = true
    endif
    if section.settings.limit_page != blank and request.page_type == 'page' and page.handle == section.settings.limit_page.handle
      assign show_section = true
    endif
  endif
-%}

{%- if show_section -%}
  ... cała dotychczasowa zawartość sekcji ...
```

Zasady:

- **Brak przypisania = zachowanie dotychczasowe** (sekcja widoczna wszędzie). To gwarantuje pełną kompatybilność wsteczną z instancjami już istniejącymi w szablonach.
- Warunek na `request.page_type` jest konieczny: poza kontekstem kolekcji globalny obiekt `collection` jest `nil`, ale jawne sprawdzenie typu strony chroni przed fałszywymi dopasowaniami i czyni intencję czytelną.
- Gdy ustawione są oba pola, sekcja pokazuje się na kolekcji **lub** stronie (logika OR).

### 3.3. Komunikat w edytorze motywu (design mode)

Ukryta sekcja „znika" w edytorze przy podglądzie innej kolekcji — merchant nie może jej wtedy znaleźć ani edytować. Dlatego gałąź `elsif` renderuje w edytorze (i tylko tam) dyskretną ramkę informacyjną:

```liquid
{%- elsif request.design_mode -%}
  <div class="..." style="padding: 16px; border: 1px dashed #999; color: #555; font-size: 14px;">
    Sekcja ukryta na tej stronie — przypisana do:
    {%- if section.settings.limit_collection != blank %} kolekcji „{{ section.settings.limit_collection.title }}"{% endif -%}
    {%- if section.settings.limit_page != blank %} strony „{{ section.settings.limit_page.title }}"{% endif -%}.
    (Komunikat widoczny tylko w edytorze motywu.)
  </div>
{%- endif -%}
```

Na sklepie live (`request.design_mode == false`) sekcja nie renderuje żadnego HTML.

## 4. Przepływ pracy merchanta

1. W edytorze motywu otworzyć konkretną kolekcję (np. przez „Podgląd" → wybór kolekcji).
2. Dodać sekcję (np. FAQ) do szablonu kolekcji i wypełnić treść.
3. W ustawieniach sekcji, w polu „Pokaż tylko na kolekcji", wybrać tę kolekcję.
4. Zapisać. Sekcja jest widoczna tylko na tej kolekcji; na pozostałych kolekcjach w edytorze pokazuje się ramka informacyjna, a na live — nic.
5. Dla kolejnej kolekcji: dodać **nową instancję** tej samej sekcji z inną treścią i innym przypisaniem.

## 5. Jak przygotować to samo dla innej sekcji — checklista

1. **Schema**: dodać blok ustawień z pkt 3.1 na końcu `settings` (header + `limit_collection` + `limit_page`). Nie zmieniać istniejących ID ustawień.
2. **Bramka**: wstawić blok `{%- liquid ... -%}` z pkt 3.2 na samym początku pliku, **po** tagach ładujących CSS/JS (`stylesheet_tag`, `<script src>` — mogą zostać poza bramką, są tanie i deduplikowane przez przeglądarkę), a **przed** pierwszym renderowanym HTML.
3. **Domknięcie**: objąć całą zawartość sekcji (łącznie z inline `<script>`/`{% style %}` zależnymi od treści) w `{%- if show_section -%} ... {%- endif -%}` i dodać gałąź `elsif request.design_mode` z pkt 3.3.
4. **Presety**: upewnić się, że schema ma `presets` (bez tego sekcji nie da się dodać z edytora) i **nie** ma `"limit"` w presecie ani blokującego `enabled_on` — inaczej wielokrotne dodanie będzie niemożliwe.
5. **Izolacja instancji** (jeśli sekcja ma CSS/JS): wszystkie ID elementów DOM i klucze storage muszą zawierać `section.id` (np. `id="toggle-{{ section.id }}"`); style per instancja przez `#shopify-section-{{ section.id }}`.
6. **Walidacja**: przepuścić plik przez theme-check (skill `shopify-liquid`, `scripts/validate.mjs --theme-path ... --files sections/<plik>.liquid`).
7. **Test ręczny**: (a) instancja bez przypisania widoczna wszędzie jak dotąd; (b) instancja przypisana widoczna tylko na celu; (c) w edytorze na innej stronie widać ramkę informacyjną; (d) na live na innej stronie sekcja nie zostawia pustego miejsca ani HTML.

## 6. Wzorce wielo-instancyjności — wnioski z analizy SnippetsHub Announcement Bar

Przeanalizowana belka (`snippetshub-announcement-bar`) potwierdza wzorce, które każda „wielokrotna" sekcja powinna spełniać:

- **CSS per instancja**: zmienne CSS definiowane w `{% style %}` pod selektorem `#shopify-section-{{ section.id }}` — dwie instancje na jednej stronie mogą mieć różne kolory/parametry bez konfliktu.
- **JS per instancja**: inicjalizacja przez `querySelectorAll('[data-...]').forEach(root => new Component(root))`, guard `data-initialized` przeciw podwójnemu bindowaniu, nasłuch `shopify:section:load` dla edytora, stan (np. dismiss) w storage pod kluczem zawierającym `section.id`.
- **Skrypt w IIFE** — wielokrotne wstawienie tego samego `<script src>` (po jednym na instancję) jest wtedy nieszkodliwe.
- **Placeholder w `request.design_mode`**, gdy sekcja nie ma treści — merchant widzi, co dodać.
- Przydatny dodatek: checkbox `enabled` na blokach treści (wyłączanie elementu bez kasowania).

Czego belce **brakuje** i co niniejszy wzorzec uzupełnia: nie ma przypisania do kolekcji/strony, więc na wspólnym `collection.json` pokazuje się na wszystkich kolekcjach. Sekcje statyczne w `layout/theme.liquid` (`{% section '...' %}`) to zawsze **jedna globalna instancja** — scoping per strona wymaga sekcji dodawanej przez szablony JSON.

## 7. Ograniczenia i decyzje projektowe

- Jedno pole wyboru = jedna kolekcja/strona na instancję. Ta sama treść na kilku kolekcjach → kilka instancji (świadomie: prostota > lista multi-select, którą Shopify i tak słabo wspiera w ustawieniach sekcji).
- Ukryta instancja nadal „istnieje" w szablonie (waga JSON, limit ~25 sekcji na szablon) — przy bardzo dużej liczbie kolekcji z osobnym FAQ rozważyć metaobjects/metafields jako źródło treści zamiast bloków sekcji.
- Bramka działa na poziomie renderowania Liquid — Shopify i tak wyrenderuje pusty wrapper `<div id="shopify-section-...">` wokół sekcji; jest pusty i bezstylowy, więc nie wpływa na layout.
- Scoping obejmuje typy `collection` i `page`; w razie potrzeby wzorzec rozszerza się analogicznie o `product` (`request.page_type == 'product'`, ustawienie typu `product`) lub `blog`/`article`.

## 8. Status wdrożenia

- `sections/faq.liquid` — wdrożenie pilotażowe zostało przygotowane i zwalidowane theme-checkiem, następnie plik przywrócono do wersji wyjściowej; niniejszy dokument jest specyfikacją do ponownego wdrożenia.
- Istniejące instancje FAQ (`page.faqs.json`, `collection.json`, `collection.rashguardy.json`) działają bez zmian do czasu ustawienia przypisania — wzorzec jest w pełni kompatybilny wstecznie.
