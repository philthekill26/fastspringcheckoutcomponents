import { sdk } from "./fs-sdk.js";

// Minimal FastSpring Checkout Components baseline test.
// This deliberately removes Coupon and all custom component styling so
// Card / Pay Button / Disclosures can be tested against the documented
// FastSpring integration pattern.

const cardComponent = sdk.components.create("fs-card", {});
cardComponent.mount("#card-element");

const payButtonComponent = sdk.components.create("fs-pay-button", {});
payButtonComponent.mount("#pay-button-element");

const disclosuresComponent = sdk.components.create("fs-disclosures", {});
disclosuresComponent.mount("#disclosures-element");

console.log("FastSpring minimal components mounted:", {
  cardComponent,
  payButtonComponent,
  disclosuresComponent
});

export {
  sdk,
  cardComponent,
  payButtonComponent,
  disclosuresComponent
};
