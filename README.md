# FastSpring Checkout Components Python Demo

Standalone Python/FastAPI demo for FastSpring Checkout Components.

## Components included

- Card — `fs-card`
- Coupon — `fs-coupon`
- Pay Button — `fs-pay-button`
- Disclosures — `fs-disclosures`
- Post-purchase success screen with local GIF

## Coupon Component

The released Coupon Component identifier is:

```javascript
"fs-coupon"
```

The mount target in `static/components.html` is:

```html
<div id="coupon-element"></div>
```

The component is created and mounted in `static/fs-components.js`:

```javascript
const couponComponent = sdk.components.create("fs-coupon", {
  style: {
    state: {
      default: {
        input: {
          background: "#ffffff",
          borderColor: "#404040",
          borderRadius: "10px",
          height: "48px"
        },
        button: {
          background: "#2563EB",
          color: "#ffffff",
          borderRadius: "10px"
        },
        chip: {
          background: "#EBF6FF",
          color: "#2563EB",
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
```

The buyer enters the coupon code directly into the FastSpring component. The seller-side
demo does not manually validate or submit coupon codes.

## Disclosures Component

The mount target is:

```html
<div id="disclosures-element"></div>
```

and the demo creates and mounts `fs-disclosures` in `static/fs-components.js`.

## Local setup

Copy `.env.example` to `.env` and populate `.env` with real sandbox credentials.

Do not commit the real `.env`.

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/components
```

## Render

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Health check:

```text
/health
```

Store real FastSpring credentials and configuration in Render Environment Variables.
