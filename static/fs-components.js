import { sdk } from "./fs-sdk.js";

const cardComponent = sdk.components.create("fs-card", {
  labelMode: "fixed",
  hideCardHeader: true,
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
          backgroundColor: "#f8fbff",
          borderColor: "#2a3550",
          borderRadius: "12px",
          boxShadow: "none",
          height: "50px",
          padding: "0 12px",
          color: "#1D224D",
          fontSize: "16px",
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif'
        },
        label: {
          color: "#dce8ff",
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
      },
      focus: {
        input: {
          borderColor: "#4d90fe",
          boxShadow: "0 0 0 3px rgba(47,130,255,0.18)"
        }
      },
      error: {
        input: {
          borderColor: "#e53935",
          boxShadow: "0 0 0 3px rgba(229,57,53,0.14)"
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
          border: "1px solid #1d4ed8",
          borderRadius: "14px",
          boxShadow: "0 8px 18px rgba(47, 130, 255, 0.24)",
          width: "100%",
          maxWidth: "420px",
          height: "56px",
          fontSize: "18px",
          fontWeight: "700",
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
          cursor: "pointer"
        }
      },
      hover: {
        button: {
          backgroundColor: "#1d4ed8"
        }
      },
      disabled: {
        button: {
          backgroundColor: "#24334d",
          color: "#8d8d8d",
          border: "1px solid #3a4a68",
          boxShadow: "none",
          opacity: "0.9",
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
          fontFamily: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: "12px",
          lineHeight: "1.6"
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