import { sdk } from "./fs-sdk.js";


// -----------------------------------------------------------------------------
// Shared component styling
// -----------------------------------------------------------------------------

const COMPONENT_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const NAVY = "#1D224D";
const BLUE = "#2563EB";
const BLUE_HOVER = "#1E4FC0";
const FOCUS_BLUE = "#4D90FE";
const INPUT_BORDER = "#cccccc";
const WHITE = "#ffffff";
const CHIP_BACKGROUND = "#EBF6FF";


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
          backgroundColor: WHITE,
          borderRadius: "8px",
          border: `2px solid ${NAVY}`
        },

        input: {
          backgroundColor: WHITE,
          color: NAVY,
          borderColor: INPUT_BORDER,
          borderRadius: "6px",
          height: "48px",
          fontSize: "16px",
          fontFamily: COMPONENT_FONT
        }
      },

      focus: {
        input: {
          borderColor: FOCUS_BLUE
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

const couponComponent = sdk.components.create("fs-coupon", {
  style: {
    state: {
      default: {
        input: {
          background: WHITE,
          color: NAVY,
          borderColor: NAVY,
          borderRadius: "6px",
          height: "48px",
          fontSize: "16px",
          fontFamily: COMPONENT_FONT
        },

        button: {
          background: BLUE,
          color: WHITE,
          borderRadius: "6px",
          fontFamily: COMPONENT_FONT,
          fontWeight: "700"
        },

        chip: {
          background: CHIP_BACKGROUND,
          color: NAVY,
          borderRadius: "12px",
          fontFamily: COMPONENT_FONT
        }
      },

      focus: {
        input: {
          borderColor: FOCUS_BLUE
        }
      }
    }
  }
});

couponComponent.mount("#coupon-element");

console.log(
  "FastSpring Coupon Component created and mounted:",
  couponComponent
);


// -----------------------------------------------------------------------------
// Pay Button Component
// -----------------------------------------------------------------------------

const payButtonComponent = sdk.components.create("fs-pay-button", {
  style: {
    state: {
      default: {
        button: {
          backgroundColor: BLUE,
          color: WHITE,
          borderRadius: "8px",
          width: "400px",
          height: "54px",
          fontSize: "18px",
          fontWeight: "700",
          fontFamily: COMPONENT_FONT
        }
      },

      hover: {
        button: {
          backgroundColor: BLUE_HOVER
        }
      },

      disabled: {
        button: {
          backgroundColor: "#EBF6FF",
          color: "#8d8d8d",
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
          fontFamily: COMPONENT_FONT,
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
