export const sdk = FastSpring.init({
  checkoutUrl: "https://snailtechsandbox.test.onfastspring.com/components-creditcardtest",

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
        const orderId =
          data?.id ||
          data?.reference ||
          data?.order?.id ||
          data?.order ||
          "Unavailable";

        orderReference.innerText = `Reference ID: ${orderId}`;
      }

      console.log("Success state applied");
    };

    // Give the SDK/embedded UI a tiny moment to finish its own updates first
    setTimeout(showSuccessState, 150);
  },

  onPaymentFailed: (error) => {
    console.error("FastSpring payment failed:", error);
  }
});
