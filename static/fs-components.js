import { sdk } from "./fs-sdk.js";

// -----------------------------------------------------------------------------
// Why this file is structured this way
// -----------------------------------------------------------------------------
//
// Previously every component was created and mounted at module top level with
// no error handling. That meant a single failing component (a bad option name,
// an unsupported component, a missing mount target) threw at import time and
// took down the whole module — so NO components mounted, and because
// components-app.js imports from this file, its submit handler never attached
// either. The visible symptom was "nothing loads and the button does nothing".
//
// Each component is now created and mounted independently. One failure is
// logged, recorded, and the rest still mount.
// -----------------------------------------------------------------------------

export const componentErrors = [];

function safeCreate(name, options, selector) {
  try {
    const component = sdk.components.create(name, options);
    component.mount(selector);
    console.log(`[fs] mounted ${name} -> ${selector}`);
    return component;
  } catch (error) {
    console.error(`[fs] FAILED to create/mount ${name} -> ${selector}`, error);
    componentErrors.push({ name, selector, error });
    return null;
  }
}

// -----------------------------------------------------------------------------
// Email Component
// -----------------------------------------------------------------------------
//
// NOTE: this demo already collects the buyer's email in the left-hand form and
// sends it to the Sessions API as customer.billToContact.email. When the
// session already carries an email, fs-email can render nothing while still
// occupying vertical space (see TNP-30496). If you see an empty box here, that
// is why — the cleanest demo is to delete this block and the #email-element
// div, since the email is already captured server-side.
// -----------------------------------------------------------------------------

const emailComponent = safeCreate(
  "fs-email",
  {
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
  },
  "#email-element"
);

// -----------------------------------------------------------------------------
// Card Component
// -----------------------------------------------------------------------------

const cardComponent = safeCreate(
  "fs-card",
  {
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
        },

        error: {
          input: {
            borderColor: "#e53935"
          }
        }
      }
    }
  },
  "#card-element"
);

// -----------------------------------------------------------------------------
// Coupon Component
// -----------------------------------------------------------------------------
//
// presentation: "expanded" | "collapsed" (collapsed is the default).
// "expanded" keeps the input visible inline instead of behind a toggle link.
// -----------------------------------------------------------------------------

const couponComponent = safeCreate(
  "fs-coupon",
  {
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
  },
  "#coupon-element"
);

// -----------------------------------------------------------------------------
// Pay Button Component
// -----------------------------------------------------------------------------

const payButtonComponent = safeCreate(
  "fs-pay-button",
  {
    style: {
      state: {
        default: {
          button: {
            backgroundColor: "#2563EB",
            color: "#ffffff",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "400px",
            height: "54px"
          }
        },

        hover: {
          button: {
            backgroundColor: "#1E4FC0"
          }
        },

        disabled: {
          button: {
            backgroundColor: "#EBF6FF",
            color: "#8d8d8d",
            cursor: "not-allowed"
          }
        }
      }
    }
  },
  "#pay-button-element"
);

// -----------------------------------------------------------------------------
// Disclosures Component  (REQUIRED on every page with any Checkout Component)
// -----------------------------------------------------------------------------
//
// Must stay mounted and legible: no display:none, visibility:hidden, zero
// height/width, reduced opacity, or off-screen positioning — on the component
// OR any parent. Do not dim this one as part of a "locked" state.
// -----------------------------------------------------------------------------

const disclosuresComponent = safeCreate(
  "fs-disclosures",
  {
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
  },
  "#disclosures-element"
);

if (componentErrors.length) {
  console.error(
    `[fs] ${componentErrors.length} component(s) failed to mount:`,
    componentErrors.map((e) => e.name)
  );
} else {
  console.log("[fs] all components created and mounted.");
}

export {
  sdk,
  emailComponent,
  cardComponent,
  couponComponent,
  payButtonComponent,
  disclosuresComponent
};
