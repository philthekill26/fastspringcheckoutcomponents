import { sdk } from "./fs-sdk.js";

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

export { sdk };
