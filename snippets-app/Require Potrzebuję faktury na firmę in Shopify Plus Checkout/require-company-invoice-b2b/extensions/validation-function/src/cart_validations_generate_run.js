// @ts-check

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunInput} CartValidationsGenerateRunInput
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

const NO_ERRORS = { operations: [] };

/**
 * @param {CartValidationsGenerateRunInput} input
 * @returns {CartValidationsGenerateRunResult}
 */
export function cartValidationsGenerateRun(input) {
  const { buyerIdentity, invoiceCompanyName, invoiceTaxId } = input.cart;

  // `purchasingCompany` is Shopify's native signal for a B2B buyer checking
  // out as a company contact (Companies feature). It is `null`/absent for
  // retail buyers, so retail checkout is never touched by this validation.
  const isB2BBuyer = Boolean(buyerIdentity?.purchasingCompany);

  if (!isB2BBuyer) {
    return NO_ERRORS;
  }

  const companyName = invoiceCompanyName?.value ?? "";
  const taxId = invoiceTaxId?.value ?? "";

  if (companyName.trim() !== "" && taxId.trim() !== "") {
    return NO_ERRORS;
  }

  return {
    operations: [
      {
        validationAdd: {
          errors: [
            {
              message: "Please provide your company invoice details (company name and Tax ID) to continue.",
              target: "$.cart",
            },
          ],
        },
      },
    ],
  };
}
