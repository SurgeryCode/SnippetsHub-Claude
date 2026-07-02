# PRD – Require Billing Phone Number in Shopify Plus Checkout

## 1. Goal

Require a phone number in the billing address during Shopify Plus checkout when the customer selects **Use a different billing address**.

## Business Problem

Some ERP and invoicing integrations require a billing phone number. Missing data leads to manual processing and synchronization issues.

## Scope

### In Scope

- Shopify Plus
- Checkout Extensibility
- Checkout UI Extension
- Checkout Validation Function
- JavaScript / TypeScript
- Shopify CLI

### Out of Scope

- checkout.liquid
- DOM manipulation
- ScriptTags
- Theme App Extensions
- Editing Shopify native checkout fields

## User Story

**As a customer**, when I choose a different billing address, I should be required to enter a billing phone number before completing checkout.

## Acceptance Criteria

### Scenario 1

**Given** billing address = shipping address

**When** customer proceeds

**Then** checkout succeeds.

### Scenario 2

**Given** customer uses a different billing address

**And** billing phone is empty

**When** customer continues

**Then** checkout is blocked and an error is displayed.

### Scenario 3

**Given** customer uses a different billing address

**And** billing phone is provided

**When** customer continues

**Then** checkout succeeds.

## UX

Error message:

> Please enter a billing phone number.

or

> Numer telefonu dla adresu rozliczeniowego jest wymagany.

## Proposed Architecture

```text
Checkout UI Extension
        ↓
Observe checkout state
        ↓
Read billing phone
        ↓
Persist value (metafield / attribute if required)
        ↓
Checkout Validation Function
        ↓
Validate billing phone
        ↓
Return validation error
        ↓
Block checkout
```

## Components

### Checkout UI Extension

Responsibilities:

- Observe checkout state
- Read billing address
- Read billing phone
- Persist value if required by the validation architecture

### Checkout Validation Function

Responsibilities:

- Read billing phone (or persisted value)
- Detect whether a separate billing address is used
- Return validation error when required

## Data

Namespace:

`custom`

Key:

`billing_phone`

Type:

`single_line_text_field`

## Edge Cases

- Billing address equals shipping address → no validation
- Billing phone is empty → validation error
- Billing phone is null → validation error
- Billing address not yet created → no validation until available

## Success Metric

100% of orders using a different billing address contain a billing phone number.

## Risks

Current Shopify Functions APIs may not expose all billing address fields in every API version. A technical spike should confirm available APIs before implementation.
