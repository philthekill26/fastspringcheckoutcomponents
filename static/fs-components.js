import { sdk } from "./fs-sdk.js";


// -----------------------------------------------------------------------------
// Card Component
// -----------------------------------------------------------------------------

const cardComponent = sdk.components.create("fs-card", {
  labelMode: "fixed",
  hideCardHeader: false,

  style: {
    state: {
      default: {
        card: {
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          padding: "0"
        },
        input: {
          backgroundColor: "#ffffff",
          borderColor: "#404040",
          borderRadius: "10px",
          boxShadow: "3px 3px 0 #404040",
          height: "48px",
          padding: "0 10px",
          color: "#1D224D",
          fontSize: "16px",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
        }
      },

      focus: {
        input: {
          borderColor: "#4d90fe"
        }
      },

      error: {
        input: {
          borderColor: "#e53935"
        }
      }
    }
  }
});

cardComponent.mount("#card-element");


// -----------------------------------------------------------------------------
// Coupon Component
// -----------------------------------------------------------------------------
//
// As-built behaviour:
//
// - Component type is "coupon"
// - Coupon UI is rendered by FastSpring
// - Buyer enters the coupon code into the component
// - Component emits an applyCoupon intent
// - FastSpring SDK handles:
//
//     POST /sessions/{id}/cart/coupon
//
//   Apply:
//     { "code": "100FREE" }
//
//   Clear:
//     { "code": null }
//
// - Coupon validation remains entirely with FastSpring
// - Seller-side JavaScript does NOT manually POST the coupon
//
// Important runtime finding:
// The current SDK creates the Coupon Component successfully but still requires
// an explicit .mount("#coupon-element") call.
//

let couponComponent = null;

try {
  couponComponent = sdk.components.create("coupon", {
    selector: "#coupon-element",

    // Keep expanded for this demo so the buyer can immediately see
    // the coupon input and Apply button.
    //
    // Change to "collapsed" later if you want to demonstrate the
    // "Have a coupon code?" / "Add Coupon Code" presentation.
    presentation: "expanded",

    locale: "en",

    onEvent: (event) => {
      console.log("FastSpring Coupon Component event:", event);

      // Keep event parsing defensive because the final event payload
      // structure may differ between SDK builds.
      const eventType =
        event?.type ||
        event?.name ||
        event?.event ||
        event?.eventType;

      switch (eventType) {
        case "component_coupon_apply_clicked":
          console.log("Coupon apply clicked");
          break;

        case "component_coupon_applied":
          console.log("Coupon successfully applied");
          break;

        case "component_coupon_rejected":
          console.log("Coupon rejected");
          break;

        case "component_coupon_cleared":
          console.log("Coupon cleared");
          break;

        case "component_coupon_prefilled":
          console.log("Coupon prefilled from session");
          break;

        default:
          if (eventType) {
            console.log(`Coupon event received: ${eventType}`);
          }
      }
    }
  });

  couponComponent.mount("#coupon-element");

  console.log(
    "FastSpring Coupon Component created and mounted:",
    couponComponent
  );

} catch (error) {
  console.error(
    "Unable to create or mount FastSpring Coupon Component:",
    error
  );

  const couponElement = document.getElementById("coupon-element");

  if (couponElement) {
    couponElement.innerHTML = `
      <div class="coupon-component-unavailable" role="status">
        The FastSpring Coupon Component could not be loaded.
        Check the browser console for the SDK error.
      </div>
    `;
  }
}


// -----------------------------------------------------------------------------
// Pay Button Component
// -----------------------------------------------------------------------------

const payButtonComponent = sdk.components.create("fs-pay-button", {
  style: {
    state: {
      default: {
        button: {
          backgroundColor: "#2563EB",
          color: "#ffffff",
          border: "1px solid #404040",
          borderRadius: "10px",
          boxShadow: "4px 4px 0 #404040",
          width: "100%",
          maxWidth: "420px",
          height: "54px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer"
        }
      },

      hover: {
        button: {
          backgroundColor: "#286090"
        }
      },

      disabled: {
        button: {
          backgroundColor: "#EBF6FF",
          color: "#8d8d8d",
          border: "1px solid #8d8d8d",
          boxShadow: "4px 4px 0 #8d8d8d",
          opacity: "0.8",
          cursor: "not-allowed"
        }
      }
    }
  }
});

payButtonComponent.mount("#pay-button-element");


// -----------------------------------------------------------------------------
// Disclosures Component
// -----------------------------------------------------------------------------

const disclosuresComponent = sdk.components.create("fs-disclosures", {
  style: {
    state: {
      default: {
        container: {
          color: "#9fb1cb",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: "12px"
        },

        link: {
          color: "#2f82ff"
        }
      }
    }
  }
});

disclosuresComponent.mount("#disclosures-element");


// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export {
  sdk,
  cardComponent,
  couponComponent,
  payButtonComponent,
  disclosuresComponent
};
