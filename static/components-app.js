import { sdk, componentErrors } from "./fs-components.js";

const form = document.getElementById("components-form");
const button = document.getElementById("load-components-btn");
const spinner = document.getElementById("spinner");
const statusMessage = document.getElementById("status-message");
const checkoutPlaceholder = document.getElementById("checkout-header");
const componentsWrapper = document.getElementById("components-wrapper");

let checkoutLoaded = false;

function setLoading(isLoading) {
  if (!checkoutLoaded) {
    button.disabled = isLoading;
  }

  spinner.classList.toggle("hidden", !isLoading);
}

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = "status-message";

  if (type) {
    statusMessage.classList.add(type);
  }
}

function validateForm(firstName, lastName, email) {
  if (!firstName || !lastName || !email) {
    setStatus("Please complete all fields before continuing.", "error");
    return false;
  }

  return true;
}

// If any component failed to mount at import time, say so up front rather than
// letting the buyer click Pay on a half-built checkout.
if (componentErrors.length) {
  setStatus(
    `Warning: ${componentErrors.length} component(s) failed to mount (${componentErrors
      .map((e) => e.name)
      .join(", ")}). Check the console.`,
    "error"
  );
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (checkoutLoaded) {
    return;
  }

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!validateForm(firstName, lastName, email)) {
    return;
  }

  setLoading(true);
  setStatus("Creating checkout session...");

  try {
    const response = await fetch("/api/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        typeof data.detail === "string"
          ? data.detail
          : data.detail?.message || "Failed to create FastSpring session.";

      throw new Error(message);
    }

    if (!data.id) {
      throw new Error("FastSpring session id was not returned.");
    }

    setStatus("Session created. Loading FastSpring checkout...", "success");

    if (!sdk || typeof sdk.checkout !== "function") {
      throw new Error("FastSpring SDK checkout method is not available.");
    }

    // ---------------------------------------------------------------------
    // Unlock the components BEFORE calling checkout, not inside onSuccess.
    //
    // onSuccess is a valid callback and fires when the session loads, but if
    // it never fires (session error, SDK error, blocked iframe) the wrapper
    // stays pointer-events:none and the checkout is silently dead to clicks
    // with nothing on screen to say why. The SDK already reveals the card and
    // pay button itself once the session is confirmed open, so gating the
    // wrapper on the callback buys nothing and can strand the page.
    // ---------------------------------------------------------------------
    if (componentsWrapper) {
      componentsWrapper.classList.remove("checkout-locked");
    }

    if (checkoutPlaceholder) {
      checkoutPlaceholder.style.display = "none";
    }

    sdk.checkout(data.id, {
      onSuccess: () => {
        console.log("[fs] session loaded — checkout is ready.");

        setStatus(
          "Payment form loaded. Apply a coupon if required, then complete payment on the right.",
          "success"
        );
      },

      onError: (error) => {
        console.error("[fs] session load failed:", error);

        setStatus(
          "Session created, but FastSpring could not load the checkout.",
          "error"
        );
      }
    });

    checkoutLoaded = true;
    button.style.display = "none";
  } catch (error) {
    console.error("Components session creation error:", error);
    setStatus(error.message || "Something went wrong.", "error");
  } finally {
    setLoading(false);
  }
});
