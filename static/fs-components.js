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
// Coupon Component - AS BUILT
// -----------------------------------------------------------------------------
//
// The shipped implementation is an iframe component.
//
// IMPORTANT:
// - The mount selector is supplied directly to components.create().
// - Do NOT call couponComponent.mount().
// - The coupon component emits an applyCoupon intent.
// - The FastSpring SDK owns the backend request:
//
//     POST /sessions/{id}/cart/coupon
//     { "code": "COUPON_CODE" }
//
// - Clearing is handled by the SDK with:
//
//     { "code": null }
//
// - The seller page must not independently validate coupons or manually update
//   the full session/cart.
//
// The as-built technical contract specifies:
//
//   fastspring.components.create("coupon", {
//     selector,
//     onEvent,
//     appearance,
//     locale,
//     presentation
//   })
//
// The buyer-facing component is referred to as fs-coupon, while the SDK create
// type in the shipped contract is "coupon".
//

let couponComponent = null;

try {
  couponComponent = sdk.components.create("coupon", {
    selector: "#coupon-element",

    // Expanded is intentional for this technical demo so the coupon input is
    // immediately visible. Change this to "collapsed" to demonstrate the
    // "Add Coupon Code" / "Have a coupon code?" presentation.
    presentation: "expanded",

    locale: "en",

    onEvent: (event) => {
      console.log("FastSpring Coupon Component event:", event);

      // Keep this defensive because the final event payload shape may vary.
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

  console.log("FastSpring Coupon Component created:", couponComponent);
} catch (error) {
  console.error("Unable to create FastSpring Coupon Component.", error);

  const couponElement = document.getElementById("coupon-element");

  if (couponElement) {
    couponElement.innerHTML = `
      <div class="coupon-component-unavailable" role="status">
        The FastSpring Coupon Component could not be created.
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


export {
  sdk,
  cardComponent,
  couponComponent,
  payButtonComponent,
  disclosuresComponent
};
