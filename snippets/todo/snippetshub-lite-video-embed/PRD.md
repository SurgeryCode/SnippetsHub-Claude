# PRD — SnippetsHub Lite Video Embed
**Status:** ✅ Gotowe | **Priorytet:** Wysoki

## Co robi
Lazy YouTube/Vimeo embed — pokazuje plakat i ładuje player dopiero po kliknięciu. Poprawia LCP i INP eliminując ciężki iframe przy pierwszym renderowaniu.

## Pliki
| Plik | Status |
|---|---|
| `snippets/surgerycode-lite-video-embed.liquid` | ✅ |
| `assets/surgerycode-lite-video-embed.css` | ✅ |
| `assets/surgerycode-lite-video-embed.js` | ✅ |

## ✅ Co działa dobrze
- Zero iframe w initial load — istotny wzrost LCP
- Obsługa YouTube i Vimeo przez `provider` param
- Thumbnail URL jako param (nie fetchowany z API)
- Vanilla JS bez dependencies

## ❌ Do poprawy
- Brak `aria-label` na przycisk Play
- Brak auto-thumbnail dla YouTube (można wygenerować z `VIDEO_ID`)
- Brak wsparcia dla `autoplay` po kliknięciu (musi mieć `?autoplay=1` w URL)
- Brak obsługi `start` timestamp dla YouTube

## Kryteria akceptacji
- [ ] Przycisk play ma `aria-label="Play video: {{ title }}"`
- [ ] YouTube thumbnail automatyczny gdy `thumbnail` param pusty: `https://img.youtube.com/vi/{{ id }}/maxresdefault.jpg`
- [ ] Param `start` (sekundy) dla YouTube URL
- [ ] Poprawne działanie w sekcjach Shopify (nie tylko snippet standalone)
