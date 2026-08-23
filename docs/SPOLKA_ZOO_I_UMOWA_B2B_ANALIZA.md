# Analiza: sp. z o.o. dla SnippetsHub + umowa B2B (Hyper Effekt)
**Data:** 2026-07-07 | **Status:** do wznowienia — przed decyzją o spółce i podpisaniem umowy
**Źródło:** sesja Claude Code (analiza zagrożeń + analiza wzoru umowy)

> Zastrzeżenie: analiza przygotowawcza, nie porada prawna/podatkowa. Do weryfikacji z księgowym i prawnikiem.

---

## Sytuacja wyjściowa

- Piotr prowadzi JDG: **ryczałt 12%** (usługi programistyczne), **VAT czynny**.
- Kontrakt B2B ~15k PLN/mies. przychodu (~8k na rękę po daninach).
- SnippetsHub = MVP: 2 produkty live, 15 snippetów gotowych do wystawienia.
- Rozważana sp. z o.o. dla projektu SnippetsHub.
- Otrzymany wzór nowej umowy B2B z **Hyper Effekt Sp. z o.o.** (Poznań, KRS 0001118008) — przeanalizowany poniżej.

---

## CZĘŚĆ 1 — Czy zakładać sp. z o.o.?

### Wnioski główne

1. **Nie teraz.** Snippety można sprzedawać od razu pod istniejącą JDG (dopisać PKD w CEIDG). Wąskie gardło projektu to publikacja 15 snippetów, nie forma prawna.
2. **Stały dochód z B2B to argument ZA spółką — ale później.** Model docelowy: "B2B na ryczałcie na życie, sp. z o.o. na akumulację zysku ze snippetów" (9% CIT albo estoński CIT 0% do wypłaty, reinwestycja w marketing).
3. **Moment na spółkę:** gdy snippety mają stabilny przychód i realne koszty marketingu. Ryczałt opodatkowuje **przychód** (12% od każdej złotówki, koszty reklam nieodliczalne) — sp. z o.o. opodatkowuje **zysk** (9%). Przykład progu: 10k przychodu / 4k kosztów ads → ryczałt 1,2k vs CIT 540 zł (+ koszty stałe spółki).

### Zagrożenia jednoosobowej sp. z o.o.

- **Podwójne opodatkowanie:** 9% CIT + 19% od dywidendy ≈ 26,3% efektywnie.
- **Druga składka zdrowotna:** wspólnik jednoosobowej sp. z o.o. płaci zdrowotną od każdego tytułu osobno (~700–800 PLN/mies. niezależnie od zysku spółki). Społeczne przy zbiegu tytułów — raz (zostają przy JDG).
- **Wspólnik iluzoryczny:** drugi wspólnik z 1–5% udziałów bywa kwestionowany przez ZUS (orzecznictwo SN).
- **Art. 210 § 2 KSH:** umowa jedynego wspólnika-członka zarządu z własną spółką = akt notarialny (dotyczy też fakturowania własnej spółki z JDG; na estońskim CIT ryzyko "ukrytych zysków").
- **Art. 299 KSH / art. 116 Ordynacji:** odpowiedzialność zarządu majątkiem osobistym przy braku wniosku o upadłość w terminie.
- **Pełna księgowość:** ~800–1500 PLN/mies.
- **Przeniesienie IP do spółki** (aport / sprzedaż / licencja) — różne skutki podatkowe, do zaplanowania z księgowym.

### Podatki/VAT specyficzne dla SnippetsHub (stan na 2026)

- VAT czynny → limit zwolnienia 240k zł nieistotny; sprzedaż PL z 23%, B2B UE reverse charge (potwierdzić VAT-UE), poza UE — NP.
- **VAT OSS:** próg 10 000 EUR B2C do konsumentów UE (łącznie, rocznie) → rejestracja VIU-R, VAT wg kraju klienta, deklaracje kwartalne. Działa niezależnie od statusu krajowego.
- **KSeF:** obowiązkowy dla ogółu firm od 1.04.2026 (odbiór od 1.02.2026). Umowa B2B z Hyper Effekt już wymaga faktur w KSeF.
- **Stawka ryczałtu dla snippetów niejednoznaczna:** 12% (usługi zw. z oprogramowaniem) vs 8,5%; fiskus bywa kapryśny wobec licencji na ryczałcie → **interpretacja indywidualna (40 zł)**.
- **Zdrowotna na ryczałcie:** próg 300k przychodu rocznie (B2B ~180k + snippety) → najwyższa stawka.
- **Kasa fiskalna** przy B2C online: zwykle zwolnienie (płatność przez bramkę + ewidencja) — potwierdzić.
- **Prawo konsumenckie:** treści cyfrowe — odstąpienie 14 dni chyba że zgoda + potwierdzenie utraty prawa przed pobraniem; Omnibus — najniższa cena z 30 dni przy przekreślonych cenach ("108 PLN / 145 reg.").

### Pytania do księgowego (wersja finalna)

1. Stawka ryczałtu dla sprzedaży licencji na własne snippety (12% czy 8,5%)? Interpretacja indywidualna?
2. Kasa fiskalna przy sprzedaży cyfrowej B2C przez Shopify — zwolnienie?
3. OSS: próg, rejestracja VIU-R, obsługa deklaracji kwartalnych i koszt.
4. Księgowanie payoutów Shopify Payments (wiele walut, prowizje) w ewidencji ryczałtowej.
5. Zdrowotna: kiedy łączny przychód przekroczy 300k i ile to kosztuje.
6. Symulacja progu opłacalności sp. z o.o. (pełna księgowość + druga zdrowotna) vs ryczałt od przychodu snippetów.

### Plan działania

1. **Teraz:** sprzedaż snippetów pod JDG (PKD, ustawienia podatkowe Shopify: 23% PL, progi OSS).
2. **Monitorować:** próg 10k EUR B2C UE (OSS) i 300k zdrowotnej.
3. **Sp. z o.o. założyć**, gdy snippety generują stabilny zysk (intuicyjnie kilka tys. zł/mies.) — wtedy też rozdzielenie odpowiedzialności produktowej od B2B.
4. B2B **zostaje na ryczałcie 12% na zawsze** — najtańsza forma dla usług.

---

## CZĘŚĆ 2 — Analiza wzoru umowy B2B z Hyper Effekt

Plik źródłowy: `/Users/PiotrNowak.info/Hypereffekt dokumenty/umowy/Umowa_b2b WZÓR .docx`
**Werdykt:** umowa NIE zabiera wprost praw do SnippetsHub (§ 8 obejmuje tylko utwory "powstałe w wyniku realizacji Umowy"), ale tworzy realne ryzyka kolizji + kilka klauzul jednostronnie niekorzystnych.

### Ryzyka krytyczne dla SnippetsHub

1. **§ 8 ust. 4–5 — IP przechodzi "z chwilą stworzenia", brak carve-outu dla projektów własnych.** Granica "w wyniku realizacji Umowy" jest dowodowa. Jeśli dla klienta Hyper Effekt powstanie feature podobny do katalogu (cart drawer, sticky bar, upsell…), prawa do tamtej wersji przejdą na nich → spór o kod + **kara 30 000 zł** (§ 4 ust. 8) + odszkodowanie uzupełniające bez limitu.
   *Ochrona:* załącznik z listą IP istniejącego przed umową (cały katalog SnippetsHub) + klauzula wyłączająca projekty własne; zachować nienaruszoną historię git (dowód pierwszeństwa).
2. **§ 8 ust. 3 "Inne utwory"** — użycie własnego snippetu w projekcie klienta = obowiązek zapewnienia Hyper Effekt korzystania bez ograniczeń czasowych/terytorialnych na wszystkich polach → de facto darmowa licencja unlimited na produkt za 108 PLN.
   *Zasada:* kod SnippetsHub NIE trafia do projektów klienckich, albo wynegocjować licencjonowanie na warunkach sklepu.
3. **§ 4 ust. 1b — zakaz "nawiązywania współpracy" z klientami przez 12 mies. po umowie.** Definicja klienta bardzo szeroka (jedno NDA / list intencyjny wystarczy, obejmuje podmioty zależne). Literalnie zakup snippetu w sklepie przez klienta Hyper Effekt = "stosunek umowny" → ryzyko kary 30k.
   *Ochrona:* wyłączenie sprzedaży standardowych produktów przez publiczny sklep z zakazu.

### Klauzule niekorzystne ogólnie

- § 4 ust. 5 — zakaz konkurencji po ustaniu umowy **bez odrębnego ekwiwalentu** ("skalkulowany w Wynagrodzeniu"), 12 mies.
- § 6 — asymetria: oni natychmiastowo za mgliste "rażące zaniedbanie"; Ty natychmiastowo dopiero przy zaległości za **3 okresy płatności** (3 mies. bez pieniędzy). Negocjować do 1.
- § 2 ust. 4 — akceptacja faktury warunkowana poprawkami → zakładnik płatności przy godzinówce.
- § 2 ust. 3 — limit dni wolnych [X] przy stawce godzinowej: wewnętrznie sprzeczne (relikt ryczałtu miesięcznego); + "wewnętrzne regulacje Zleceniodawcy" (§ 3 ust. 1) — elementy etatopodobne, nie pomagają bezpieczeństwu ryczałtu 12%.
- § 5 ust. 6 — odpowiedzialność za poufność **niezależnie od winy**, bez limitu. Negocjować zasadę winy i/lub cap.
- § 3 ust. 4d, 5b — ryczałty za sprzęt/biuro potrącane z wynagrodzenia, kwoty ustalane później mailem.
- § 8 ust. 11 — nielimitowana indemnifikacja, w tym koszty prawników Zleceniodawcy.
- § 8 ust. 8 — obowiązek zawierania umów uzupełniających na nowe pola eksploatacji, nie wygasa po ustaniu umowy.

### Błędy formalne

- **NIP = numer KRS (0001118008)** — błędny NIP, poprawić przed podpisaniem.
- § 7 powołuje **ustawę o ochronie danych z 1997 r.** (nieobowiązująca od 2018) — powinno być RODO + umowa powierzenia art. 28.
- Żądanie **PESEL** przy B2B — zbędne.
- § 9 ust. 3 — sąd właściwy dla siedziby Zleceniodawcy (Poznań).

### Lista negocjacyjna (do odesłania)

1. **[MUST]** Załącznik: lista IP sprzed umowy (katalog SnippetsHub) + klauzula, że projekty własne poza zleconymi czynnościami nie są "Utworami" z § 8.
2. **[MUST]** Wyłączenie z zakazu konkurencji sprzedaży standardowych produktów przez publiczny sklep internetowy.
3. Wypowiedzenie natychmiastowe przy zaległości za 1 okres płatności (nie 3).
4. Kara umowna: obniżenie + ograniczenie do winy umyślnej/rażącego niedbalstwa; poufność na zasadzie winy.
5. Doprecyzowanie § 2 ust. 3 (dni wolne przy godzinówce) i § 2 ust. 4 (akceptacja faktury nie wstrzymuje zapłaty za przepracowane godziny).
6. Poprawa NIP i § 7 (RODO).

---

## Otwarte kroki (do wznowienia)

- [ ] Odesłać listę negocjacyjną do Hyper Effekt / skonsultować z prawnikiem punkty MUST.
- [ ] Wizyta u księgowego z listą 6 pytań (Część 1).
- [ ] Dopisać PKD do CEIDG, skonfigurować podatki w Shopify.
- [ ] Snapshot/dowód pierwszeństwa katalogu SnippetsHub przed podpisaniem umowy (repo git — nie squashować historii).
- [ ] Decyzja o sp. z o.o. odroczona do momentu stabilnego zysku ze snippetów.
