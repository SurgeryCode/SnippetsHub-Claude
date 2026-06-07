# Uniwersalny prompt uruchomieniowy dla rozwiązania

Ten plik powinien znajdować się w folderze głównym konkretnego rozwiązania.

## Docelowy układ

```text
folder główny rozwiązania/
  RUN_PRD_PROMPT_PL.md
  PRD/
    PRD.md
    STATE.json
    ITERATIONS.md
    ...pliki pomocnicze, np. podglądy, notatki, makiety
  assets/
  sections/
  snippets/
  blocks/
  ...inne pliki rozwiązania Shopify, jeśli istnieją
```

## Idea działania

Ten plik ma być uniwersalny i niezależny od nazwy rozwiązania.

Za każdym razem:
- pracujemy tylko w bieżącym folderze głównym,
- `PRD/` jest źródłem wymagań i stanu prac,
- pliki Shopify w folderze głównym są miejscem faktycznej implementacji,
- nie skanujemy innych starych rozwiązań w repozytorium.

## Główny prompt do użycia

Skopiuj poniższy prompt do nowego czatu:

```md
Rola: Senior Shopify Expert, Senior Architect, Senior Web Developer, Expert Ecommerce.

Uruchamiamy pracę w bieżącym folderze głównym rozwiązania na podstawie zawartych w nim plików PRD.

Najpierw przeczytaj wyłącznie pliki z bieżącego folderu głównego i folderu `PRD/`:
- `RUN_PRD_PROMPT_PL.md`
- `PRD/PRD.md`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md` jeśli istnieje

Jeśli w folderze `PRD/` są dodatkowe pliki pomocnicze, na przykład podgląd wizualny, makieta, notatki albo screeny, możesz z nich skorzystać tylko wtedy, gdy są potrzebne do realizacji zadania.

Po przeczytaniu PRD przejdź do analizy i pracy tylko w obrębie bieżącego folderu głównego rozwiązania.
Jeśli istnieją już lokalne pliki implementacyjne tego rozwiązania, na przykład `assets/`, `sections/`, `snippets/`, `blocks/` albo inne pliki Shopify, możesz z nich korzystać i rozwijać je w ramach tego jednego folderu.

Zasady pracy:
- twórz nowe, czyste rozwiązanie od zera albo rozwijaj wyłącznie bieżące lokalne rozwiązanie,
- nie skanuj repozytorium w poszukiwaniu innych starych implementacji,
- pracuj tylko na kontekście tego konkretnego folderu głównego i jego plików PRD,
- zachowaj zgodność ze standardem SnippetsHub i najlepszymi praktykami Shopify,
- unikaj inline CSS i zbędnych zależności,
- stosuj scope CSS pod `.SnippetsHub`,
- jeśli tworzysz pliki produkcyjne, uwzględnij README, LICENSE, manifest i dane produktowe Shopify, jeśli zakres zadania tego wymaga,
- po zakończeniu iteracji zaktualizuj `PRD/STATE.json`,
- jeśli zmieni się zakres lub ważne założenia, zaktualizuj `PRD/PRD.md`,
- dopisz wpis do `PRD/ITERATIONS.md`, jeśli ten plik istnieje.

Cel bieżącej iteracji:
[wpisz tutaj cel iteracji]

Zakres zmian:
- [zmiana 1]
- [zmiana 2]
- [zmiana 3]

Poza zakresem:
- [poza zakresem 1]
- [poza zakresem 2]

Na końcu podaj:
- co zostało przygotowane,
- jakie pliki zostały zmienione,
- co warto przetestować,
- jakie założenia zostały przyjęte,
- co zostało zaktualizowane w `PRD/STATE.json`,
- co zostało dopisane lub zmienione w `PRD/ITERATIONS.md`.
```

## Najprostsze użycie

Jeśli chcesz uruchomić pracę bez dłuższego dopisywania kontekstu, użyj:

```md
Uruchamiamy pracę w folderze głównym na podstawie zawartych plików PRD.

Najpierw przeczytaj:
- `RUN_PRD_PROMPT_PL.md`
- `PRD/PRD.md`
- `PRD/STATE.json`
- `PRD/ITERATIONS.md` jeśli istnieje

Następnie zacznij pracę zgodnie z tym PRD i w obrębie tego folderu głównego.
Nie skanuj innych starych rozwiązań w repozytorium.
Po wykonaniu pracy zaktualizuj `PRD/STATE.json`.
Jeśli to potrzebne, zaktualizuj też `PRD/PRD.md` i `PRD/ITERATIONS.md`.
```

## Najkrótsza komenda użytkownika

Jeśli układ folderów jest poprawny, możesz użyć nawet takiego polecenia:

```md
Uruchamiamy pracę w folderze głównym na podstawie zawartych plików PRD, zacznij pracę.
```

## Ważna zasada

Przy kopiowaniu tego pliku do kolejnych rozwiązań nie zmieniasz treści promptu.
Zmieniasz tylko zawartość folderu `PRD/` oraz lokalne pliki rozwiązania w bieżącym folderze głównym.
