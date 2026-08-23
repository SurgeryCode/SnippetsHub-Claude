# SnippetsHub — Audyt projektu i plan startu
**Data:** 2026-07-06 | **Autor:** Claude Code (Fable 5)

> Odpowiedź na trzy pytania: **co zrobić lepiej**, **jak skalować i uatrakcyjnić**, **jak przygotować i uruchomić**.

---

## TL;DR — diagnoza w 3 zdaniach

1. **Produkt jest gotowy, sprzedaż nie działa.** 15 snippetów zbudowanych, 15 opisów HTML napisanych — a w sklepie żyje tylko 1 produkt. Wąskim gardłem nie jest budowanie, tylko **wystawianie i marketing**.
2. **Obietnice marki nie mają pokrycia.** USP mówi "video tutorial included", "lifetime updates", "tested on Shopify 2.0 themes" — nie ma ani jednego wideo, żadnego mechanizmu dostarczania update'ów i zero przetestowanych motywów (`themes/development/` jest pusty).
3. **Projekt dryfuje w stronę nowych rzeczy** (snippets-app, HTML-clear-ideas, design/) **zanim zmonetyzował to, co ma**. Ostatnia aktualizacja STATUS.md: miesiąc temu.

**Rekomendacja nadrzędna: STOP budowaniu nowych rzeczy na 2 tygodnie. Wystawić, przetestować, nagrać, wystartować.**

---

## 1. Co zrobiłbym lepiej

### 1.1 Krytyczne (blokują sprzedaż)

| Problem | Stan obecny | Co zrobić |
|---|---|---|
| **14/15 snippetów nie jest w sklepie** | Opisy gotowe, ZIP-y `❓` | Sprint publikacyjny: `npm run build:all` → wystawić po 3–5 produktów dziennie |
| **Brak wideo tutoriali** | 0 nagrań, a to główny USP dla Persony 1 (Marek) | Nagrać 1 uniwersalne wideo "jak zainstalować snippet SNH" (proces jest identyczny dla wszystkich) + krótkie 2–3 min per produkt później. Nie blokować launchu na 15 wideo. |
| **Sprzeczny cennik** | CLAUDE.md: 108 PLN / PRICING_STRATEGY.md: $49 ≈ 175 PLN | Wybrać jedno źródło prawdy. Rekomendacja: **ceny w USD** ($49/$129/$299) — rynek docelowy to Europa+USA, sklep jest po angielsku, PLN jako waluta bazowa wygląda niewiarygodnie dla klienta z USA. |
| **Zero testów na motywach** | `themes/development/` pusty | Minimum: Dawn + Sense przed launchem. Wystarczy smoke test (sekcja się dodaje, renderuje, JS działa). |

### 1.2 Ważne (podważają wiarygodność / utrudniają skalowanie)

- **"Lifetime updates" bez kanału dostarczania.** Klient kupuje ZIP — jak dostanie update? Rozwiązania od najprostszego: (a) Shopify Digital Downloads pozwala podmienić plik i wysłać ponownie link, (b) changelog + wersjonowanie w manifest.json już istnieje — używać go, (c) docelowo portal klienta / lista mailowa per produkt.
- **Brak demo.** Klient kupuje kod w ciemno. Najtańszy fix: **jeden sklep demo** (development theme na snippetshubdev) z wszystkimi snippetami włączonymi + link "Live demo" w każdym opisie produktu. To prawdopodobnie największa pojedyncza dźwignia konwersji.
- **Brak dowodu społecznego.** Zero recenzji, testimoniali, liczników sprzedaży. Na start: kod `EARLY40` w zamian za recenzję (jawnie: "founding customer discount").
- **Puste `lint` i `test` w package.json.** Dla produktu, którego wartością jest "clean code", brak lintera to ryzyko wizerunkowe. Minimum: `prettier` + `eslint` na assets/*.js, walidator JSON schema sekcji Liquid (prosty skrypt Node sprawdzający `{% schema %}`).
- **Higiena repo.** Branch `require-billing-phone-number` ma niezacommitowane zmiany; `backups/` i `node_modules` w root; `themes/production/` (449 plików) miesza się z kodem produktów. Rozważyć: osobne repo (lub przynajmniej wyraźny podział) na `snippets-app/` — to inny model biznesowy (aplikacja Shopify) niż snippety.
- **STATUS.md nieaktualny miesiąc.** Kolumna ZIP od początku `❓` — skoro `build-all.js` istnieje, uruchomić i uzupełnić raz na zawsze.

### 1.3 Drobne

- `package.json` nazywa się `SurgeryCode-ScriptHub` — stara nazwa marki.
- Kolejność wystawiania w STATUS.md jest dobra (cart-drawer pierwszy) — trzymać się jej, nie wystawiać alfabetycznie.
- Kurs 1 USD = 3.57 PLN w PRICING_STRATEGY — zweryfikować przed launchem, dokument ma stary kurs.

---

## 2. Jak skalować i uatrakcyjnić

### 2.1 Krótki horyzont (0–2 miesiące) — wyciśnięcie obecnego katalogu

1. **Bundles (składniki już istnieją — to darmowy AOV):**
   - Conversion Starter Pack, Cart Optimization Bundle, Product Page Pro Bundle (z ITERATION_SUMMARY).
   - Wycena: ~2× cena pojedynczego snippetu za 3–4 sztuki ($99–129) — kotwica cenowa, która czyni pojedynczy $49 tańszym psychologicznie.
2. **All-Access Pass** — jeden produkt "wszystkie obecne i przyszłe snippety, $249–299". Dla agencji (Persona 2) to no-brainer i naturalna górna półka cennika.
3. **Demo store + code preview.** Persona 2 (Anna, developerka) nie kupi bez zobaczenia kodu. Publiczny fragment (np. 30 pierwszych linii CSS/JS jako screenshot w opisie) + demo live.
4. **SEO content flywheel — każdy snippet = artykuł.** "How to add a free shipping bar in Shopify without an app" to dokładnie te frazy, których szukają klienci (research 2026-06-01 to potwierdza: "without app" jest najczęstszym sygnałem). 15 snippetów = 15 artykułów na blogu Shopify store'a, każdy kończy się CTA do produktu. To najtańszy kanał akwizycji dla tego biznesu.
5. **YouTube = marketing + USP jednocześnie.** Tutorial instalacyjny publikowany publicznie działa jako reklama ("zobacz jaki prosty proces") — nie chować wideo za paywallem.

### 2.2 Średni horyzont (2–6 miesięcy) — nowe produkty i kanały

1. **Budować z researchu, nie z intuicji:** Size Chart, Product Tabs, FAQ Accordion (+SEO schema) mają potwierdzone zapotrzebowanie (research 2026-06-01). FAQ Accordion z FAQ schema to podwójna wartość (funkcja + SEO klienta) — dobry kandydat na produkt flagowy.
2. **Kanały dystrybucji poza własnym sklepem:**
   - **Gumroad / LemonSqueezy** — dotarcie do developerów szukających poza Shopify;
   - **Shopify Theme sections marketplaces** (np. sekcje jako produkty w istniejących marketplace'ach) — walidacja popytu bez własnego trafficu;
   - **GitHub** — 1–2 snippety darmowe jako open source (np. announcement-bar) = lead magnet + wiarygodność "clean code".
3. **Program afiliacyjny dla agencji** — kod `AGENCY30` już istnieje; formalizacja: agencja dostaje 20–30% prowizji, klientom instaluje snippety SNH. Persona 2 staje się kanałem sprzedaży.
4. **Newsletter + lead magnet.** Exit-intent popup (własny produkt!) na snippetshub.com zbierający maile za darmowy snippet. Dogfooding = dowód, że produkty działają.

### 2.3 Długi horyzont (6+ miesięcy) — zmiana modelu

1. **snippets-app to właściwy kierunek, ale za wcześnie.** Aplikacja Shopify (jak walidacja billing phone w checkout) daje **recurring revenue** zamiast one-time — to naturalna ewolucja. Ale: app review, support, infrastruktura. Wejść w to dopiero, gdy snippety generują stały przychód i wiadomo, które kategorie sprzedają.
2. **Subskrypcja "SnippetsHub Pro"** — $19–29/mies.: wszystkie snippety + priorytetowy support + nowe snippety co miesiąc. Konwersja z All-Access Pass, gdy katalog urośnie do 25+.
3. **Produktyzacja usługi developerskiej** — "Expert Install" jako osobny, tańszy produkt per snippet ($29 flat zamiast 186 PLN/h) — zdejmuje ostatnią obiekcję Persony 1.

---

## 3. Jak przygotować i uruchomić — plan launchu

### Tydzień 1 — Przygotowanie techniczne
- [ ] `npm run build:all` → zweryfikować ZIP-y, uzupełnić kolumnę ZIP w STATUS.md
- [ ] Postawić motyw testowy Dawn w `themes/development/`, smoke test top 5 snippetów (cart-drawer, free-shipping-bar, trust-badges, exit-intent-popup, announcement-bar)
- [ ] Rozstrzygnąć cennik (rekomendacja: USD, $49/$129/$299) i zaktualizować CLAUDE.md + PRICING_STRATEGY.md, żeby mówiły jednym głosem
- [ ] Nagrać 1 uniwersalne wideo instalacyjne (Loom, 5–8 min)

### Tydzień 2 — Publikacja
- [ ] Wystawić w Shopify Admin wg kolejności ze STATUS.md (3–5 dziennie): tytuł z opisu HTML, opis, ZIP jako digital download, warianty licencji, kolekcja
- [ ] Postawić sklep demo (development theme z włączonymi snippetami), dodać linki "Live demo" do opisów
- [ ] Złożyć 3 bundles
- [ ] Aktualizować STATUS.md po każdej partii (❌ → ✅)

### Tydzień 3 — Launch
- [ ] Aktywować kody: `EARLY40` (limit 30, jawnie "founding customers — w zamian prosimy o recenzję"), `LAUNCH20` (publiczny, 30 dni)
- [ ] Opublikować 3 pierwsze artykuły SEO (cart drawer, free shipping bar, trust badges — "without an app")
- [ ] Opublikować wideo instalacyjne na YouTube
- [ ] Post launchowy: r/shopify (format "zbudowałem X, feedback welcome" — nie reklama), Shopify Community, X/LinkedIn
- [ ] Włączyć exit-intent popup + newsletter na snippetshub.com (dogfooding)

### Tydzień 4+ — Pomiar i iteracja
Zgodnie z PRICING_STRATEGY.md, po 2–4 tygodniach sprawdzić:
- [ ] % sprzedaży bez rabatu (próg zdrowia: ≥ 20–30%)
- [ ] Które produkty/kategorie konwertują → to one wyznaczają, co budować dalej (nie roadmapa)
- [ ] Powtórzyć community research
- [ ] Dopiero teraz: nowe snippety (Size Chart, Product Tabs, FAQ Accordion) i decyzja o kontynuacji snippets-app

### Metryki sukcesu (pierwsze 30 dni od launchu)
| Metryka | Cel minimalny |
|---|---|
| Produkty live w sklepie | 15 + 3 bundles |
| Pierwsza sprzedaż nie-Countdown-Bar | ≥ 1 (walidacja katalogu) |
| Sprzedaże łącznie | 5–10 |
| Recenzje | ≥ 3 |
| Artykuły SEO | ≥ 3 |
| Zapisy na newsletter | ≥ 20 |

---

## Zasada na koniec

> **Buduj dopiero to, co rynek potwierdzi zakupem.** Projekt ma świetną dyscyplinę dokumentacyjną i solidny standard techniczny — brakuje mu tylko kontaktu z klientem. Każdy tydzień budowania nowych snippetów przed wystawieniem obecnych 15 to tydzień opóźnienia jedynego feedbacku, który się liczy: sprzedaży.
