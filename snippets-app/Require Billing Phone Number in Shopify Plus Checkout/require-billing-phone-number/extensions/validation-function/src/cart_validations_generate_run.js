// @ts-check

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunInput} CartValidationsGenerateRunInput
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

const NO_ERRORS = { operations: [] };

// Pola adresu porównywane, żeby wykryć, czy billing różni się od shipping.
// Telefon celowo pominięty — to właśnie ta wartość jest walidowana osobno.
const ADDRESS_FIELDS = ["address1", "address2", "city", "provinceCode", "zip", "countryCode"];

/**
 * @param {CartValidationsGenerateRunInput} input
 * @returns {CartValidationsGenerateRunResult}
 */
export function cartValidationsGenerateRun(input) {
  const { billingAddress, deliveryGroups } = input.cart;

  // TEMPORARY DEBUG: always block and show raw input so we can see real data on live checkout.
  return {
    operations: [
      {
        validationAdd: {
          errors: [
            {
              message: `DEBUG: ${JSON.stringify(input.cart)}`,
              target: "$.cart",
            },
          ],
        },
      },
    ],
  };

  // Brak adresu rozliczeniowego (jeszcze nieutworzony) -> nie walidujemy.
  if (!billingAddress) {
    return NO_ERRORS;
  }

  const shippingAddress = deliveryGroups[0]?.deliveryAddress;

  // Brak adresu dostawy do porównania (np. koszyk czysto cyfrowy) -> nie walidujemy.
  if (!shippingAddress) {
    return NO_ERRORS;
  }

  const isDifferentBillingAddress = ADDRESS_FIELDS.some(
    (field) => (billingAddress[field] ?? "") !== (shippingAddress[field] ?? ""),
  );

  if (!isDifferentBillingAddress) {
    return NO_ERRORS;
  }

  if (billingAddress.phone) {
    return NO_ERRORS;
  }

  return {
    operations: [
      {
        validationAdd: {
          errors: [
            {
              message: "Please enter a billing phone number.",
              target: "$.cart.billingAddress.phone",
            },
          ],
        },
      },
    ],
  };
}