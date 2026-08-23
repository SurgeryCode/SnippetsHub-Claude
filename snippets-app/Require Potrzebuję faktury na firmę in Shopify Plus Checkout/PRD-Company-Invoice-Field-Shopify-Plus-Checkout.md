# PRD – Company Invoice Field Visibility & B2B Requirement in Shopify Plus Checkout

## 0. Source Request (Client Brief)

> Cześć, tak jak rozmawialiśmy ostatnio na spotkaniu, zależałoby nam na tym aby pole faktury przy finalizacji zakupu było lepiej widoczne, a najlepiej obowiązkowe dla klientów B2B. Jako, że docelowo i tak będziemy chcieli aby B2B było na oddzielnej platformie, to na ten moment dajcie znać, czy takie obowiązkowe pole z warunkiem, że ktoś jest zalogowany na firmę jest do zrobienia relatywnie łatwo, a jak nie to tak jak wspominaliśmy przynajmniej zrobienie czegoś w stylu komunikatu tekstowego przypominającego o podaniu danych do faktury. Także na razie tylko dajcie znać jak z trudnością wykonania i wtedy zadecydujemy jak działamy :)

**Requested deliverable at this stage:** a feasibility / difficulty assessment for two options, not a finished build. Client will decide direction after reading this.

---

## 1. Goal

Increase visibility of the company invoice field (company name + Tax ID / NIP) in Shopify Plus checkout, and evaluate whether it can be made **mandatory specifically for B2B (company-logged-in) customers**, with a **lower-effort fallback**: a text reminder prompting the customer to fill in invoice data (non-blocking).

## Business Problem

Customers frequently skip or overlook the invoice field at checkout, resulting in missing company billing data (name, NIP/Tax ID) needed for VAT invoicing. This creates manual follow-up work and delays order processing/accounting. The client considers this an interim fix — a dedicated B2B platform is planned longer-term, so investment here should stay lightweight.

## Context / Constraint

- B2B will eventually move to a separate platform. **Do not over-invest** in a solution that will be thrown away — prefer the smallest change that solves the immediate problem.
- Decision on which option to build is **pending this feasibility assessment**.

---

## Scope

### In Scope (assessment covers both)

- Shopify Plus
- Checkout Extensibility (Checkout UI Extension)
- Shopify B2B / Company Accounts (native "Companies" feature) — **to confirm client uses this**, see Open Questions
- Checkout Validation Function (only relevant for Option A)
- JavaScript / TypeScript, Shopify CLI

### Out of Scope

- checkout.liquid
- DOM manipulation / ScriptTags / Theme App Extensions
- Editing Shopify native checkout fields
- Building the future standalone B2B platform
- Actual invoice/PDF generation or ERP sync (data collection only)

---

## Option A — Mandatory Invoice Field, Conditional on B2B Login

**As a customer** logged in as a company (B2B buyer), I must fill in invoice data (company name + NIP) before completing checkout. Retail/non-B2B customers are unaffected.

### How B2B detection works

Shopify Plus's native B2B feature (Companies + company locations + company contacts) exposes the buyer's company identity to checkout — a logged-in company contact checking out is a **"purchasing company"** buyer. Checkout UI Extensions and Validation Functions can read this identity to know whether the current checkout belongs to a B2B buyer.

### Acceptance Criteria

**Scenario 1**
Given the buyer is a retail customer (not logged into a company account)
When they proceed through checkout
Then no invoice field is required.

**Scenario 2**
Given the buyer is logged in as a B2B/company contact
And the invoice field (company name and/or NIP) is empty
When they try to continue
Then checkout is blocked and an error is displayed.

**Scenario 3**
Given the buyer is logged in as a B2B/company contact
And invoice data is provided
When they continue
Then checkout succeeds.

### Proposed Architecture

```text
Checkout UI Extension
        ↓
Detect purchasing company (B2B buyer identity)
        ↓
Render invoice field prominently (if B2B)
        ↓
Read + persist invoice data (metafield / attribute)
        ↓
Checkout Validation Function
        ↓
If B2B buyer AND invoice data missing → return validation error
        ↓
Block checkout
```

### Data

- Namespace: `custom`
- Keys: `invoice_company_name`, `invoice_tax_id` (NIP)
- Type: `single_line_text_field`

### Difficulty: **Medium**

This closely mirrors the already-delivered [Billing Phone Number](../Require%20Billing%20Phone%20Number%20in%20Shopify%20Plus%20Checkout) project (same UI Extension → metafield → Validation Function pattern), so the pattern is proven. The added complexity vs. that project is the **B2B/company-identity detection**, which depends on:

1. **Whether the store actually uses Shopify's native B2B (Companies) feature** for these customers, rather than e.g. a custom login/wholesale app, a customer tag, or a manual price list. If it's native B2B, detection is straightforward via the buyer identity available to checkout. If it's a third-party/custom wholesale setup, detection may require a different signal (customer tags, metafields, order source) and effort increases.
2. Confirming exact field availability for the store's current API version (Checkout UI Extension target + Validation Function input query) via a short technical spike — same caveat as the billing phone project.

**Estimate:** ~1–2 days if native B2B is confirmed and the spike passes; add ~1 extra day of investigation/adjustment if B2B identity isn't cleanly exposed (e.g. custom wholesale setup) and an alternate signal must be used instead.

---

## Option B — Non-Blocking Text Reminder (Fallback)

**As a customer**, I see a clearly visible reminder message near the invoice field prompting me to fill in invoice data if I need one — but checkout is never blocked.

### Acceptance Criteria

**Scenario 1**
Given any customer reaches the invoice step in checkout
When the checkout page renders
Then a visible reminder message is shown near/above the invoice field (e.g. *"Need a VAT invoice? Fill in your company details below."*).

**Scenario 2**
Given the customer leaves the invoice field empty
When they complete checkout
Then checkout succeeds anyway (no validation).

### Proposed Architecture

```text
Checkout UI Extension
        ↓
Render static/styled reminder text near invoice field
```

No Validation Function, no B2B detection, no metafields required — purely a UI/copy addition.

### Difficulty: **Low**

No buyer-identity logic, no conditional validation, no persistence layer beyond what may already exist for the invoice field. This is essentially a copy + placement change inside a Checkout UI Extension.

**Estimate:** ~2–4 hours, mostly copywriting/placement/QA across breakpoints.

---

## Recommendation

Start with **Option B** now — it ships almost immediately and directly addresses the "field is easy to miss" complaint regardless of customer type. Layer **Option A** on top later, but only after confirming point 1 in the Open Questions below, since it materially changes the estimate. Given the B2B platform migration is already planned, Option A's ROI should be weighed against how many months the current checkout will still be in use for B2B orders.

---

## Open Questions (need client answer before final scope/estimate)

1. **How are B2B customers currently identified at login/checkout?** Native Shopify B2B (Companies), a third-party wholesale app, or manual account tagging? This is the single biggest driver of Option A's difficulty.
2. **Where does the current invoice field live today?** It wasn't found in this repository — is it a checkout UI extension already built elsewhere, an Order/Cart note attribute, a theme customization, or a Shopify Admin native checkout field (company name / tax field under checkout settings)? This affects whether Option A extends existing code or builds fresh.
3. What exact invoice data is required — company name + NIP only, or also address/REGON/other fields?
4. Should Option A show the field at all for retail customers (hidden vs. visible-but-optional), or only surface it once B2B is detected?
5. Expected error/reminder copy in Polish and English (see UX below for draft).

## UX (draft copy, to confirm with client)

**Option A — blocking error:**
> Please provide your company invoice details (name and Tax ID) to continue.
> Podaj dane firmy do faktury (nazwa i NIP), aby kontynuować.

**Option B — reminder text:**
> Need a VAT invoice? Fill in your company details below.
> Potrzebujesz faktury na firmę? Uzupełnij dane poniżej.

---

## Edge Cases (Option A)

- Buyer identity not yet resolved when checkout loads → no validation until buyer identity is available (same pattern as billing address not yet created in the billing-phone project).
- Company contact logs in but is placing what is effectively a "guest-like" checkout with no purchasing company context → treat as retail, do not block.
- Buyer switches account context mid-checkout (if platform allows) → re-evaluate validation on state change.

## Success Metric

100% of B2B checkout orders (Option A) or a measurable reduction in missing-invoice-data support/accounting tickets (Option B) after launch.

## Risks

- Native B2B buyer-identity fields exposed to Checkout UI Extensions / Validation Functions may vary by Shopify API version — requires a short technical spike to confirm before committing to Option A's estimate (same risk noted in the billing-phone PRD).
- If B2B customers are **not** using Shopify's native Companies feature, Option A's difficulty and estimate change materially (see Open Question 1) — this PRD's "Medium" rating assumes native B2B until confirmed otherwise.
