import { sdk } from "./fs-sdk.js";


// -----------------------------------------------------------------------------
// Email Component
// -----------------------------------------------------------------------------

const emailComponent = sdk.components.create("fs-email", {
  fields: {
    email: "auto"
  },
  labelMode: "floating",
  hideEmailHeader: false,

  style: {
    state: {
      default: {
        email: {
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "16px"
        },

        emailTitle: {
          color: "#111111",
          fontSize: "16px"
        },

        label: {
          color: "#333333"
        },

        input: {
          borderRadius: "6px",
          height: "48px"
        }
      },

      focus: {
        input: {
          borderColor: "#4d90fe"
        }
      }
    }
  }
});

emailComponent.mount("#email-element");


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
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "2px solid navy"
        },

        input: {
          borderRadius: "6px",
          height: "48px"
        }
      },

      focus: {
        input: {
          borderColor: "#4d90fe"
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
  presentation: "expanded",

  style: {
    state: {
      default: {
        input: {
          background: "#ffffff",
          borderColor: "#cccccc",
          borderRadius: "6px",
          height: "44px"
        },

        button: {
          background: "#2563EB",
          color: "#ffffff",
          borderRadius: "6px"
        },

        chip: {
          background: "#EBF6FF",
          color: "#1D224D",
          borderRadius: "12px"
        }
      },

      focus: {
        input: {
          borderColor: "#4d90fe"
        }
      }
    }
  }
});

couponComponent.mount("#coupon-element");


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
          borderRadius: "8px",
          width: "400px",
          height: "54px"
        }
      },

      hover: {
        button: {
          backgroundColor: "#1E4FC0"
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
          fontFamily: "Helvetica",
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


console.log("FastSpring components created and mounted.", {
  emailComponent,
  cardComponent,
  couponComponent,
  payButtonComponent,
  disclosuresComponent
});


export {
  sdk,
  emailComponent,
  cardComponent,
  couponComponent,
  payButtonComponent,
  disclosuresComponent
};
