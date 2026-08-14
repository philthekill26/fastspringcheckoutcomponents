import { sdk } from "./fs-sdk.js";

/*
 * Coupon Component PRD note
 * -------------------------
 * Draft v0.1 specifies the rendering model as components.create("coupon", ...).
 * The PRD also lists the proposed identifier as "fsc-coupon" with the prefix TBC.
 * Keep the type in one constant so it can be changed easily if Engineering ships
 * a different final SDK identifier.
 */
const COUPON_COMPONENT_TYPE = "coupon";

// Card Component
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
        input: { borderColor: "#4d90fe" }
      },
      error: {
        input: { borderColor: "#e53935" }
      }
    }
  }
});
cardComponent.mount("#card-element");

// Coupon Component
let couponComponent = null;

try {
  couponComponent = sdk.components.create(COUPON_COMPONENT_TYPE, {
    // Expanded intentionally makes the new component obvious in a demo.
    // The PRD also specifies "collapsed" as a supported presentation.
    presentation: "expanded",
    locale: "en",

    // The PRD names the events but does not define the final event payload shape,
    // so log the raw event rather than relying on undocumented properties.
    onEvent: (event) => {
      console.log("FastSpring Coupon Component event:", event);

      const eventType = event?.type || event?.name || event?.event;
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
          console.log("Coupon removed");
          break;
        case "component_coupon_prefilled":
          console.log("Coupon loaded from session");
          break;
        default:
          if (eventType) console.log(`Coupon event received: ${eventType}`);
      }
    }
  });

  couponComponent.mount("#coupon-element");
} catch (error) {
  console.error(`Unable to create FastSpring Coupon Component using type "${COUPON_COMPONENT_TYPE}".`, error);

  const couponElement = document.getElementById("coupon-element");
  if (couponElement) {
    couponElement.innerHTML = `
      <div class="coupon-component-unavailable" role="status">
        Coupon component is not available in this SDK environment yet.
        Check the released SDK component identifier and update
        <code>COUPON_COMPONENT_TYPE</code> in <code>fs-components.js</code>.
      </div>
    `;
  }
}

// Pay Button Component
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
        button: { backgroundColor: "#286090" }
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

// Disclosures Component
const disclosuresComponent = sdk.components.create("fs-disclosures", {
  style: {
    state: {
      default: {
        container: {
          color: "#9fb1cb",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: "12px"
        },
        link: { color: "#2f82ff" }
      }
    }
  }
});
disclosuresComponent.mount("#disclosures-element");

export { sdk, cardComponent, couponComponent, payButtonComponent, disclosuresComponent };
