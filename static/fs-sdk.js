export const sdk = FastSpring.init({
  checkoutUrl: "https://snailtechsandbox.test.onfastspring.com/components-creditcardtest",

  onSessionLoaded: (data) => {
    console.log("FastSpring session loaded:", data);
  },

  onOrderCompleted: (data) => {
    console.log("FastSpring order completed:", data);

    const componentsWrapper = document.getElementById("components-wrapper");
    const checkoutHeader = document.getElementById("checkout-header");
    const successMessage = document.getElementById("success-message");
    const orderReference = document.getElementById("order-reference");

    if (componentsWrapper) {
      componentsWrapper.classList.add("hidden");
    }

    if (checkoutHeader) {
      checkoutHeader.classList.add("hidden");
    }

    if (successMessage) {
      successMessage.classList.remove("hidden");
    }

    if (orderReference) {
      const orderId =
        data?.id ||
        data?.reference ||
        data?.order ||
        "Unavailable";

      orderReference.innerText = `Reference ID: ${orderId}`;
    }
  },

  onPaymentFailed: (error) => {
    console.error("FastSpring payment failed:", error);
  }
});
