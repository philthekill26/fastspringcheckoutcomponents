// -----------------------------------------------------------------------------
// The SDK is loaded by the <script> tag in components.html, which sets the
// global `FastSpring`. If that script is blocked or fails, the raw error is
// "FastSpring is not defined", which says nothing useful. Fail loudly instead.
// -----------------------------------------------------------------------------

if (typeof FastSpring === "undefined") {
  const message =
    "FastSpring SDK did not load. Check that " +
    "https://cdn.onfastspring.com/checkout-sdk/latest/fastspring-sdk.js " +
    "is reachable and not blocked by an ad blocker or CSP.";

  console.error(`[fs] ${message}`);
  throw new Error(message);
}

export const sdk = FastSpring.init({
  checkoutUrl: "https://snailtechsandbox.test.onfastspring.com/components-creditcardtest",

  // Set to true while testing to surface the SDK's built-in
  // success/failure dialogs. Turn off before any real demo.
  debug: false,

  onSessionLoaded: (data) => {
    console.log("FastSpring session loaded:", data);
  },

  onOrderCompleted: (data) => {
    console.log("FastSpring order completed:", data);

    const showSuccessState = () => {
      const componentsWrapper = document.getElementById("components-wrapper");
      const checkoutHeader = document.getElementById("checkout-header");
      const successMessage = document.getElementById("success-message");
      const orderReference = document.getElementById("order-reference");

      if (componentsWrapper) {
        componentsWrapper.classList.add("hidden");
        componentsWrapper.style.display = "none";
      }

      if (checkoutHeader) {
        checkoutHeader.classList.add("hidden");
        checkoutHeader.style.display = "none";
      }

      if (successMessage) {
        successMessage.classList.remove("hidden");
        successMessage.style.display = "flex";
      }

      if (orderReference) {
        const orderId = data?.id || data?.reference || data?.orderId || data?.order?.id || data?.order || "Unavailable";
        orderReference.innerText = `Reference ID: ${orderId}`;
      }

      console.log("Success state applied");
    };

    setTimeout(showSuccessState, 150);
  },

  onPaymentFailed: (error) => {
    console.error("FastSpring payment failed:", error);
  }
});
