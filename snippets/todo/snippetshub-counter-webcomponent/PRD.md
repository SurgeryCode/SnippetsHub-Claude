# PRD — SnippetsHub Counter (Web Component)
**Status:** ✅ Gotowe | **Priorytet:** Niski

## Co robi
Animowany licznik jako Custom Element (`<surgerycode-counter>`). Enkapsulacja logiki w Web Component — zero konfliktu z innymi skryptami.

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode_counter.liquid` | ✅ |
| `assets/surgerycode_counter.js` | ✅ (definiuje `<surgerycode-counter>`) |
| `package.json`, `changelog.md`, `LICENSE.md` | ✅ |

## ✅ Co działa dobrze
- Web Component = enkapsulacja, zero globalnych CSS/JS konfliktów
- `customElements.define` z lazy-load — rejestruje się tylko gdy element na stronie
- Atrybuty HTML jako API (`target`, `duration`, `suffix`)

## Różnica vs `counter-html-css-js`
| Cecha | HTML/CSS/JS | Web Component |
|---|---|---|
| Enkapsulacja | Brak | ✅ Shadow DOM opcjonalny |
| Wielokrotność na stronie | Wymaga uniq ID | ✅ Automatyczne |
| Złożoność | Prosta | Większa |
| Browser support | Wszystkie | ES2015+ |

## ❌ Do poprawy
- Brak Shadow DOM (style mogą być nadpisane przez motyw)
- Brak atrybutu `start` (animacja zawsze od 0)

## Kryteria akceptacji
- [ ] Atrybut `start` dla wartości startowej
- [ ] Dokumentacja różnicy między tym a `counter-html-css-js` w README
