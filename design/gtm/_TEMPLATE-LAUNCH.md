# {Snippet Name} — Launch Checklist
**Slug:** `snh-{slug}`
**Data launchu:** YYYY-MM-DD
**Odpowiedzialny:** PiotrNowak.info

---

## Pre-Launch (przed wystawieniem)

### Kod snippetu
- [ ] Snippet w `snippets/ready/snh-{slug}/`
- [ ] ZIP zbudowany (`npm run build -- snh-{slug}`)
- [ ] ZIP przetestowany lokalnie (rozpakowuje się poprawnie)
- [ ] Przetestowany na Dawn, Refresh, Sense
- [ ] Zero JS errors w console
- [ ] Mobile ≥ 375px — wygląda poprawnie

### Opis i assets
- [ ] Opis HTML gotowy w `descriptions/snh-{slug}-description.html`
- [ ] Screenshot desktop (1200×800px) — export z Figma
- [ ] Screenshot mobile — export z Figma
- [ ] *(opcjonalnie)* Video tutorial nagrany

---

## Shopify Admin Setup

### Produkt
- [ ] Dodano produkt w Shopify Admin → Products → Add product
- [ ] **Tytuł:** `{Feature} for Shopify That {Action Verb} {Benefit}`
- [ ] **Opis:** wklejono zawartość `snh-{slug}-description.html`
- [ ] **Cena:** 108 PLN (Compare at: 145 PLN)
- [ ] **Typ produktu:** Digital Download
- [ ] **Tagi:** `{tag1}, {tag2}, snippet, shopify-2.0`

### Digital File
- [ ] ZIP dodany jako digital download (Shopify Digital Downloads app)
- [ ] Test pobrania pliku po zakupie

### Media
- [ ] Screenshot desktop wgrany jako główne zdjęcie
- [ ] Screenshot mobile jako drugie zdjęcie
- [ ] Alt text ustawiony

### Kolekcja
- [ ] Produkt przypisany do kolekcji `{slug-kolekcji}`

### SEO
- [ ] Meta title: `{Snippet Name} for Shopify | SnippetsHub`
- [ ] Meta description: *(pierwsze 2 zdania opisu, max 160 znaków)*
- [ ] URL handle: `snh-{slug}`

---

## Post-Launch

- [ ] Produkt widoczny na snippetshub.com
- [ ] Zakup testowy (lub Preview) — flow działa
- [ ] STATUS.md zaktualizowany (Live w Shopify ✅)
- [ ] Log sesji dodany
- [ ] *(opcjonalnie)* Post na social media / newsletter

---

## GTM Copy (gotowe do użycia)

**Shopify product title:**
```
{pełny tytuł produktu}
```

**Short description (social/email):**
```
{2-3 zdania — benefit-focused, bez hype}
```

**Hashtagi:**
```
#shopify #shopifydeveloper #ecommerce #snippetshub
```
