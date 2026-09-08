const planButtons = document.querySelectorAll(".select-plan-button");

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product || "advanced-monthly";
    const productName = button.dataset.productName || "Advanced Monthly";

    sessionStorage.setItem(
      "selectedFastSpringProduct",
      JSON.stringify({
        product,
        productName
      })
    );

    window.location.href = `/checkout?product=${encodeURIComponent(product)}`;
  });
});
