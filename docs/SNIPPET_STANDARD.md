# SnippetsHub Snippet Standard (v1.0)

## Goal
Define a consistent, recognizable, and verifiable standard for SnippetsHub snippets.

## Naming
- File prefix: `snh-` (required)
- Slug: lowercase, kebab-case
- Examples: `snh-countdown-bar`, `snh-sticky-add-to-cart`

## CSS Namespace (Required)
- Root wrapper must include class `.SnippetsHub`
- Root wrapper must include snippet slug class: `.SNH-<slug>`
- All CSS selectors must be scoped under `.SnippetsHub`

## Styling Rules (Required)
- Do not use inline CSS (`style=""`) in Liquid markup.
- Put all visual styling in stylesheet files or `<style>` blocks scoped to the snippet/section.
- For footer localization/payment UI in SnippetsHubWhite:
  - country selector, language selector, and payment icons must be aligned in one row on desktop
  - keep localization controls on the left side and payment icons on the right side
  - use responsive breakpoints for mobile (stacked layout allowed on small screens)

## Required Files
- `README.md`
- `LICENSE.md`
- `manifest.json`
- At least one Liquid file in `snippets/` or `sections/`
- `README.md` must include a clear "What this snippet is" section (purpose, use case, where to install).
- `README.md` must include a "Shopify Product Listing Data" section for product publishing.

## Required Ownership Banner
Every `.liquid`, `.js`, `.css` file must include an ownership banner containing:
- `SnippetsHub`
- `Single Store License`
- version info
- support email

## DOM Fingerprint
Add data attributes to the main wrapper:
- `data-snh="<slug>"`
- `data-snh-version="<version>"`
- `data-snh-owner="SnippetsHub"`

## Manifest Fields
`manifest.json` must include:
- `name`
- `slug`
- `version`
- `owner`
- `license`
- `supportEmail`

## Recommended Structure
- `snippets/snh-<slug>.liquid`
- `sections/snh-<slug>.liquid` (optional)
- `assets/snh-<slug>.js` (optional)
- `assets/snh-<slug>.css` (optional)

## Template
See: `tools/templates/snippet/`

## License Copy (README/Docs)
- Use the line: `License: Single Store License (or purchased license variant).`
- Add clarification: `License follows the purchased product variant; check product details for allowed number of stores.`

## Shopify Product Listing Data (Required)
For every new snippet, prepare marketing-ready product data that can be pasted into Shopify product admin:
- Product title (EN, conversion-focused, clear benefit + snippet type).
- Short description (1-2 sentences, value-first).
- Product description (sections: problem, outcome, key features, compatibility, installation, support).
- Pricing for 3 license variants (default premium USD):
  - `Single Site License`: `$49`
  - `5 Sites License`: `$129`
  - `Unlimited Sites License`: `$299`
- Product tags (recommended 10-20 tags) including at minimum:
  - brand: `snippetshub`
  - type: e.g. `sticky-add-to-cart`
  - platform: `shopify`, `online-store-2.0`
  - category: e.g. `conversion`, `ux`, `cart`
  - tech: `liquid`, `javascript`, `css`
  - license tags: `license-single`, `license-5-sites`, `license-unlimited`
- Optional SEO fields:
  - SEO title (max ~60 chars)
  - SEO meta description (max ~155 chars)
