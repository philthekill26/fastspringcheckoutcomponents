const planButtons = document.querySelectorAll(".select-plan-button");

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "/checkout";
  });
});
