export const sdk = FastSpring.init({
  checkoutUrl: "https://snailtechsandbox.test.onfastspring.com/components-creditcardtest",

  onSessionLoaded: (data) => {
    console.log("FastSpring session loaded:", data);
  },

  onOrderCompleted: (data) => {
    console.log("FastSpring order completed:", data);
  },

  onPaymentFailed: (error) => {
    console.error("FastSpring payment failed:", error);
  }
});
